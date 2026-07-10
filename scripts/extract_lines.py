#!/usr/bin/env python3
"""Map revision changes to (page, line-range) in the marked, line-numbered PDF.

Reads revision/main.pdf (ACL [review] build). Two passes per anchor:
column-aware ordered-substring match, then plain-text page + word-overlap fallback.
Writes revision/changes_lines.json.
"""
import subprocess, re, json, sys, pathlib

REV = pathlib.Path(__file__).resolve().parent.parent / "revision"
GUT = 58

CHANGES = [
 ("C1","Abstract","Inclusion-criteria clause added to the abstract","explicit inclusion criteria that separate"),
 ("C2a","Section 1","Old broad definition struck; two-criteria definition added","define it by two inclusion criteria"),
 ("C2b","Section 1","Explicit exclusions: instruction following, vanilla RLHF/DPO, language-conditioned RL","plain instruction following satisfies neither"),
 ("C2c","Section 1","Specification-time boundary case (reward-code generation)","boundary case the criteria settle"),
 ("C2d","Section 1","Modality scope: feedback is natural-language text; observations may be non-textual","criteria also fix the modality scope"),
 ("C3","Section 1","Terminology genealogy: explicit generalization of Shinn et al. (2023)","generalize it to any method meeting"),
 ("C4","Section 1","Positioning against prior surveys and NLRL; pointer to comparison table","automatic correction strategies"),
 ("C5a","Section 1","New contribution bullet: decision rules and hybrid-cases table","applicable rather than merely descriptive"),
 ("C5b","Section 1","New contribution bullet: practitioner guidance and survey comparison","practitioner guidance for choosing"),
 ("C6a","Section 2","Explicit assignment rule for multi-pillar methods","moment the signal takes effect"),
 ("C6b","Section 2","MDP-as-lens caveat: partially observable, non-Markovian settings","organizing lens rather than a claim"),
 ("C6c","Section 2","New hybrid-cases table","assignment rule applied to hybrid"),
 ("C7","Section 2","Pillars classify signals, not pipeline stages; working example reframed","claimed to traverse"),
 ("C8","Section 3.4","Specification-time clarification; hybrid-table pointer for reward code","compiled function later emits"),
 ("C9","Section 4.4","Memory classified by moment of consumption; boundary recorded","lesson acts as deliberative"),
 ("C10","Section 4.5","Renamed to Evaluator Feedback in Search; inclusion criterion stated","evaluator signal consumed during"),
 ("C11a","Section 5.4","Online vs offline preference optimization distinction","online and offline variants"),
 ("C11b","Section 5.4","Vanilla RLHF/DPO placed outside VRL as compression-spectrum endpoint","because they clarify by contrast"),
 ("C12","Section 6.1 (new)","New subsection: Algorithmic Interactions and Practitioner Guidance","different optimization families"),
 ("C13","Section 6.2","Evaluation practice: report quality and utilization separately","utilization separately"),
 ("C14","Section 6.5","Research agenda with five named open problems","research agenda includes"),
 ("C15","Limitations","Failure modes and societal-impact expansion","survey can name but not yet"),
 ("C16","Appendix A","New comparison-with-surveys table","positioning against prior surveys"),
 ("C17","Appendix B","New practitioner guidance table","use language in each role"),
]


def norm(s):
    return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9 ]+", " ", s.lower()))


def margin_nums(lines):
    nums = []
    for l in lines:
        m1 = re.match(r"\s*(\d{3,4})\s", l)
        m2 = re.search(r"\s(\d{3,4})\s*$", l)
        if m1:
            nums.append(int(m1.group(1)))
        if m2:
            nums.append(int(m2.group(1)))
    return nums


def main():
    pdf = str(REV / "main.pdf")
    raw = subprocess.run(["pdftotext", "-layout", pdf, "-"], capture_output=True, text=True).stdout.split("\f")
    plain = subprocess.run(["pdftotext", pdf, "-"], capture_output=True, text=True).stdout.split("\f")

    streams = {}
    for pi, page in enumerate(raw):
        entries = []
        for l in page.splitlines():
            left, right = l[:GUT], l[GUT:]
            ml = re.match(r"\s*(\d{3,4})\s+(.*)", left)
            entries.append(("L", ml.group(2) if ml else left.strip(), int(ml.group(1)) if ml else None))
            mr = re.match(r"(.*?)\s+(\d{3,4})\s*$", right)
            entries.append(("R", mr.group(1).strip() if mr else right.strip(), int(mr.group(2)) if mr else None))
        streams[pi + 1] = [e for e in entries if e[0] == "L"] + [e for e in entries if e[0] == "R"]

    results = []
    for cid, sec, desc, anchor in CHANGES:
        an = norm(anchor)
        hit = None
        for pno in sorted(streams):
            seq = streams[pno]
            for i in range(len(seq)):
                if an in norm(" ".join(t for _, t, _ in seq[i:i + 4])):
                    nums = [n for _, _, n in seq[max(0, i - 1):i + 5] if n]
                    hit = (pno, min(nums) if nums else None, max(nums) if nums else None)
                    break
            if hit:
                break
        if not hit:  # fallback: page from plain text, numbers by word overlap
            aw = set(an.split())
            for pi, p in enumerate(plain):
                if an in norm(p):
                    lines = raw[pi].splitlines()
                    best = max(range(len(lines)), key=lambda i: sum(1 for w in aw if w in norm(" ".join(lines[i:i + 3]))), default=None)
                    nums = margin_nums(lines[max(0, best - 1):best + 4]) if best is not None else []
                    hit = (pi + 1, min(nums) if nums else None, max(nums) if nums else None)
                    break
        results.append({"id": cid, "section": sec, "desc": desc,
                        "page": hit[0] if hit else None,
                        "line_lo": hit[1] if hit else None,
                        "line_hi": hit[2] if hit else None})
        r = results[-1]
        print(f"{cid:5s} p.{r['page']} lines {r['line_lo']}-{r['line_hi']}  {sec}")
    json.dump(results, open(REV / "changes_lines.json", "w"), indent=1)
    missing = [r["id"] for r in results if not r["page"]]
    print("MISSING:", missing)
    sys.exit(1 if missing else 0)


if __name__ == "__main__":
    main()
