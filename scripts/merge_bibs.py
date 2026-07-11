#!/usr/bin/env python3
"""Merge the Phase C thread bib fragments into the CSUR bibliography.

Base: paper-acl/references.bib (the ARR submission bib, post citation-audit).
Fragments: notes/threads/T*.bib.
Output: paper-csur/references.bib + paper-csur/citation_keys.txt (one key per
line, for section writers to grep) + a merge report on stdout.

Dedup rules, in order:
  1. arXiv id already present in the merged set  -> drop fragment entry.
  2. normalized title already present            -> drop fragment entry.
  3. bib key collision with different title      -> rename fragment key with a
     thread suffix (t1, t2, ...) and report it.
Existing (base) entries always win so keys already cited in the paper stay valid.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ARXIV_RE = re.compile(r"(\d{4}\.\d{4,5})")


def parse_entries(text):
    entries = []
    for m in re.finditer(r"@\w+\{([^,]+),", text):
        # brace-count from the entry's opening brace to its balanced close, so
        # entries whose final "}" shares a line with the last field still parse
        start = m.start()
        i = text.index("{", start)
        depth = 0
        for j in range(i, len(text)):
            if text[j] == "{":
                depth += 1
            elif text[j] == "}":
                depth -= 1
                if depth == 0:
                    break
        else:
            continue
        body = text[start:j + 1]
        key = m.group(1).strip()
        tm = re.search(r"title\s*=\s*[{\"](.*?)[}\"],?\s*\n", body, re.S)
        title = re.sub(r"[{}]", "", tm.group(1)) if tm else ""
        am = ARXIV_RE.search(body)
        entries.append({
            "key": key,
            "title": re.sub(r"\s+", " ", title).strip(),
            "arxiv": am.group(1) if am else None,
            "body": body,
        })
    return entries


def norm_title(t):
    return re.sub(r"[^a-z0-9]", "", t.lower())


def main():
    base_path = ROOT / "paper-acl" / "references.bib"
    frag_paths = sorted((ROOT / "notes" / "threads").glob("T*.bib"))
    out_bib = ROOT / "paper-csur" / "references.bib"
    out_keys = ROOT / "paper-csur" / "citation_keys.txt"

    base = parse_entries(base_path.read_text())
    seen_keys = {e["key"] for e in base}
    seen_titles = {norm_title(e["title"]): e["key"] for e in base if e["title"]}
    seen_ids = {e["arxiv"]: e["key"] for e in base if e["arxiv"]}

    merged = list(base)
    stats = {"base": len(base), "added": 0, "dup_id": 0, "dup_title": 0, "renamed": 0}
    dup_map = []  # (fragment_key, kept_key, reason)

    for fp in frag_paths:
        tag = fp.stem.split("_")[0].lower()  # t1..t9
        for e in parse_entries(fp.read_text()):
            if e["arxiv"] and e["arxiv"] in seen_ids:
                stats["dup_id"] += 1
                dup_map.append((e["key"], seen_ids[e["arxiv"]], f"arxiv:{e['arxiv']}"))
                continue
            nt = norm_title(e["title"])
            if nt and nt in seen_titles:
                stats["dup_title"] += 1
                dup_map.append((e["key"], seen_titles[nt], "title"))
                continue
            if e["key"] in seen_keys:
                new_key = f"{e['key']}{tag}"
                e["body"] = e["body"].replace(e["key"], new_key, 1)
                dup_map.append((e["key"], new_key, "key-renamed"))
                e["key"] = new_key
                stats["renamed"] += 1
            merged.append(e)
            seen_keys.add(e["key"])
            if nt:
                seen_titles[nt] = e["key"]
            if e["arxiv"]:
                seen_ids[e["arxiv"]] = e["key"]
            stats["added"] += 1

    out_bib.write_text("\n\n".join(e["body"] for e in merged) + "\n")
    out_keys.write_text("\n".join(sorted(e["key"] for e in merged)) + "\n")

    print(f"base={stats['base']} added={stats['added']} total={len(merged)}")
    print(f"dropped: {stats['dup_id']} arXiv-id dups, {stats['dup_title']} title dups; "
          f"{stats['renamed']} keys renamed")
    print(f"wrote {out_bib} and {out_keys}")
    report = ROOT / "notes" / "merge_dup_map.tsv"
    report.write_text("\n".join("\t".join(r) for r in dup_map) + "\n")
    print(f"dup map: {report}")


if __name__ == "__main__":
    main()
