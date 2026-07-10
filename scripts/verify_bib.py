#!/usr/bin/env python3
"""Citation-integrity gate for the VRL survey.

Every bib entry must resolve against a canonical source before it may be cited:
  - entries with an arXiv id -> arXiv API (title + first-author match)
  - other entries            -> Crossref by title (title + year match)

Usage:
  python3 verify_bib.py references.bib                 # verify whole bib, write report
  python3 verify_bib.py --ids ids.tsv                  # verify (arxiv_id, expected title) pairs
  python3 verify_bib.py --selftest                     # parser + matcher unit checks (no network)

Report: verify_bib_report.tsv next to the input (status: OK / MISMATCH / NOT_FOUND / SKIPPED).
Exit code 1 if any MISMATCH or NOT_FOUND.
"""

import argparse
import difflib
import json
import re
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

ARXIV_API = "https://export.arxiv.org/api/query"
CROSSREF_API = "https://api.crossref.org/works"
UA = {"User-Agent": "vrl-survey-bib-verifier/1.0 (mailto:arun08sharma@gmail.com)"}
ATOM = "{http://www.w3.org/2005/Atom}"

ARXIV_ID_RE = re.compile(r"(?:arxiv[:./]\s*|abs/)(\d{4}\.\d{4,5})(v\d+)?", re.I)
NEW_ID_RE = re.compile(r"^\d{4}\.\d{4,5}$")


def parse_bib(text):
    """Minimal .bib parser: returns list of dicts with key, type, fields."""
    entries = []
    for m in re.finditer(r"@(\w+)\s*\{\s*([^,\s]+)\s*,", text):
        etype, key = m.group(1).lower(), m.group(2)
        if etype in ("comment", "string", "preamble"):
            continue
        # walk braces to find the entry body
        depth, i = 1, m.end()
        while i < len(text) and depth > 0:
            if text[i] == "{":
                depth += 1
            elif text[i] == "}":
                depth -= 1
            i += 1
        body = text[m.end():i - 1]
        fields = {}
        for fm in re.finditer(r"(\w+)\s*=\s*(\{|\")", body):
            fname = fm.group(1).lower()
            open_ch = fm.group(2)
            j = fm.end()
            if open_ch == "{":
                d = 1
                while j < len(body) and d > 0:
                    if body[j] == "{":
                        d += 1
                    elif body[j] == "}":
                        d -= 1
                    j += 1
                val = body[fm.end():j - 1]
            else:
                k = body.find('"', j)
                val = body[j:k] if k != -1 else body[j:]
                j = k + 1 if k != -1 else len(body)
            fields[fname] = re.sub(r"\s+", " ", val).strip()
        entries.append({"key": key, "type": etype, "fields": fields})
    return entries


def norm_title(t):
    t = re.sub(r"[{}\\$^_]", "", t or "")
    t = re.sub(r"[^a-z0-9 ]", " ", t.lower())
    return re.sub(r"\s+", " ", t).strip()


def title_sim(a, b):
    return difflib.SequenceMatcher(None, norm_title(a), norm_title(b)).ratio()


def arxiv_id_of(entry):
    f = entry["fields"]
    for field in ("eprint", "journal", "note", "url", "volume", "doi", "howpublished"):
        v = f.get(field, "")
        m = ARXIV_ID_RE.search(v)
        if m:
            return m.group(1)
        if field == "eprint" and NEW_ID_RE.match(v):
            return v
    return None


def http_get(url, retries=3, backoff=5):
    last = None
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.read()
        except Exception as e:  # noqa: BLE001 - report the last failure kind
            last = e
            time.sleep(backoff * (attempt + 1))
    raise RuntimeError(f"GET failed after {retries} tries: {url} ({last})")


def query_arxiv(ids):
    """ids -> {id: {title, first_author}}; batches of up to 100."""
    out = {}
    for start in range(0, len(ids), 100):
        batch = ids[start:start + 100]
        url = f"{ARXIV_API}?id_list={','.join(batch)}&max_results={len(batch)}"
        root = ET.fromstring(http_get(url))
        for e in root.findall(f"{ATOM}entry"):
            eid = (e.findtext(f"{ATOM}id") or "")
            m = ARXIV_ID_RE.search(eid)
            title = re.sub(r"\s+", " ", e.findtext(f"{ATOM}title") or "").strip()
            author = e.find(f"{ATOM}author/{ATOM}name")
            if m and title:
                out[m.group(1)] = {
                    "title": title,
                    "first_author": author.text if author is not None else "",
                }
        time.sleep(3)  # arXiv API etiquette
    return out


def query_arxiv_by_title(title):
    """Search arXiv by title; return (sim, canonical_title, arxiv_id) of best hit or None."""
    q = urllib.parse.quote(f'ti:"{norm_title(title)}"')
    url = f"{ARXIV_API}?search_query={q}&max_results=5"
    try:
        root = ET.fromstring(http_get(url, retries=2, backoff=3))
    except RuntimeError:
        return None
    best = None
    for e in root.findall(f"{ATOM}entry"):
        cand = re.sub(r"\s+", " ", e.findtext(f"{ATOM}title") or "").strip()
        eid = e.findtext(f"{ATOM}id") or ""
        m = ARXIV_ID_RE.search(eid)
        sim = title_sim(title, cand)
        if best is None or sim > best[0]:
            best = (sim, cand, m.group(1) if m else "")
    time.sleep(3)
    return best


def query_crossref(title, year=None):
    q = urllib.parse.quote(norm_title(title))
    url = f"{CROSSREF_API}?query.bibliographic={q}&rows=3&select=title,issued,DOI"
    data = json.loads(http_get(url))
    best = None
    for item in data.get("message", {}).get("items", []):
        cand = (item.get("title") or [""])[0]
        sim = title_sim(title, cand)
        iy = None
        parts = item.get("issued", {}).get("date-parts", [[None]])
        if parts and parts[0]:
            iy = parts[0][0]
        score = sim - (0.05 if (year and iy and abs(int(year) - int(iy)) > 1) else 0)
        if best is None or score > best[0]:
            best = (score, cand, iy, item.get("DOI", ""))
    time.sleep(1)
    return best


def verify_entries(entries, sim_threshold=0.85):
    rows = []
    arxiv_entries = [(e, arxiv_id_of(e)) for e in entries]
    ids = sorted({i for _, i in arxiv_entries if i})
    print(f"{len(entries)} entries; {len(ids)} unique arXiv ids; querying arXiv...", flush=True)
    meta = query_arxiv(ids) if ids else {}
    for e, aid in arxiv_entries:
        title = e["fields"].get("title", "")
        year = re.sub(r"\D", "", e["fields"].get("year", ""))[:4] or None
        if not title:
            rows.append((e["key"], "SKIPPED", "no title field", ""))
            continue
        if aid:
            m = meta.get(aid)
            if not m:
                rows.append((e["key"], "NOT_FOUND", f"arXiv:{aid} not returned by API", ""))
            else:
                sim = title_sim(title, m["title"])
                status = "OK" if sim >= sim_threshold else "MISMATCH"
                rows.append((e["key"], status, f"arXiv:{aid} sim={sim:.2f}", m["title"]))
        else:
            # stage 1: arXiv title search (most ML papers live there even when
            # the bib entry cites the conference version without an id)
            ax = query_arxiv_by_title(title)
            if ax and ax[0] >= sim_threshold:
                rows.append((e["key"], "OK", f"arxiv-title sim={ax[0]:.2f} id={ax[2]}", ax[1]))
                continue
            # stage 2: Crossref bibliographic query
            try:
                best = query_crossref(title, year)
            except RuntimeError as err:
                rows.append((e["key"], "NOT_FOUND", f"crossref error: {err}", ""))
                continue
            if not best:
                rows.append((e["key"], "NOT_FOUND", "no crossref candidates", ""))
            else:
                score, cand, iy, doi = best
                status = "OK" if score >= sim_threshold else "MISMATCH"
                extra = f"; arxiv-title best sim={ax[0]:.2f}" if ax else ""
                rows.append((e["key"], status, f"crossref sim={score:.2f} year={iy} doi={doi}{extra}", cand))
    return rows


def verify_id_list(path):
    """TSV lines: arxiv_id <TAB> expected title."""
    pairs = []
    for line in Path(path).read_text().splitlines():
        if not line.strip() or line.startswith("#"):
            continue
        aid, _, title = line.partition("\t")
        pairs.append((aid.strip(), title.strip()))
    meta = query_arxiv([a for a, _ in pairs])
    rows = []
    for aid, title in pairs:
        m = meta.get(aid)
        if not m:
            rows.append((aid, "NOT_FOUND", "id not returned by arXiv API", title))
        else:
            sim = title_sim(title, m["title"])
            status = "OK" if sim >= 0.75 else "MISMATCH"
            rows.append((aid, status, f"sim={sim:.2f} api_title={m['title']}", title))
    return rows


def selftest():
    bib = """
@article{good2023, title={A Very {Good} Paper on Agents}, author={Doe, Jane}, year={2023},
         journal={arXiv preprint arXiv:2303.11366}}
@inproceedings{conf2020, title = "Another Paper", booktitle = {Proc. of X}, year = {2020}}
@misc{noid, title={Untraceable}, year={2021}}
"""
    es = parse_bib(bib)
    assert len(es) == 3, f"expected 3 entries, got {len(es)}"
    assert es[0]["key"] == "good2023" and arxiv_id_of(es[0]) == "2303.11366"
    assert es[1]["fields"]["title"] == "Another Paper" and arxiv_id_of(es[1]) is None
    assert title_sim("A Very Good Paper on Agents", "A very good paper on agents!") > 0.95
    assert title_sim("A Very Good Paper on Agents", "Completely Different Work") < 0.5
    m = ARXIV_ID_RE.search("https://arxiv.org/abs/2411.14251v2")
    assert m and m.group(1) == "2411.14251"
    print("selftest OK")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("bibfile", nargs="?")
    ap.add_argument("--ids", help="TSV of arxiv_id<TAB>expected_title to verify")
    ap.add_argument("--selftest", action="store_true")
    args = ap.parse_args()
    if args.selftest:
        selftest()
        return
    if args.ids:
        rows = verify_id_list(args.ids)
        out = Path(args.ids).with_suffix(".report.tsv")
    elif args.bibfile:
        entries = parse_bib(Path(args.bibfile).read_text())
        rows = verify_entries(entries)
        out = Path(args.bibfile).parent / "verify_bib_report.tsv"
    else:
        ap.error("give a bibfile, --ids, or --selftest")
        return
    with open(out, "w") as f:
        f.write("key\tstatus\tdetail\tcanonical_title\n")
        for r in rows:
            f.write("\t".join(str(x) for x in r) + "\n")
    bad = [r for r in rows if r[1] in ("MISMATCH", "NOT_FOUND")]
    ok = sum(1 for r in rows if r[1] == "OK")
    print(f"OK={ok} MISMATCH/NOT_FOUND={len(bad)} SKIPPED={sum(1 for r in rows if r[1]=='SKIPPED')}")
    print(f"report: {out}")
    for r in bad[:40]:
        print("  ", "\t".join(str(x) for x in r[:3]))
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
