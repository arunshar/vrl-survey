# CSUR submission TODO and continuation handoff

Updated 2026-07-12. This file is the resume point for Claude Code, Codex, or any other AI tool continuing the VRL survey work.

Repository: `arunshar/vrl-survey`

Working branch: `codex/csur-editorial-length-compliance`

Draft pull request: https://github.com/arunshar/vrl-survey/pull/1

## Read before acting

Read these files in order:

1. `README.md`
2. `TODO.md`
3. `notes/csur_submission_requirements.md`
4. `notes/acm_format_exemplar_audit.md`
5. `paper-csur/ARXIV_README.md` when preparing an arXiv package

Do not redo Phases 1 through 7. They are complete. Continue from the unchecked items below.

## Verified baseline

- CSUR `acmsmall` compliance build: 27 pages, with article content on pages 1 through 21 and references on pages 22 through 27.
- Anonymous review build: 26 pages.
- Standalone electronic supplement: 33 pages.
- Combined arXiv build: 55 pages.
- Main article: about 8,306 section words, 4 figures, and 123 unique citation keys.
- Union bibliography: 378 used citation keys, 378 BibTeX entries, and 378 manifest keys.
- Bibliography verification: 370 `OK`, 8 `WHITELISTED`, and 0 unresolved.
- All four LaTeX builds previously completed with zero errors, undefined citations, undefined references, overfull boxes, or float-size warnings.
- Five figures are embedded-font vector PDFs. The remaining raster figure contains the corrected panel (e) label, `Evaluator feedback in search`.
- Pull request 1 is open, draft, mergeable, and currently has no reviews or CI checks.

## Hard rules

- Never fabricate an affiliation, email, ORCID, funding source, prior appearance, citation, author, title, or result.
- Never use an em dash in prose, comments, documentation, or commit messages.
- Before adding a citation, confirm its key exists in `paper-csur/citation_keys.txt`.
- Before adding or changing a bibliography entry, run `python3 scripts/verify_bib.py paper-csur/references.bib`. Every retained entry must finish as `OK` or `WHITELISTED`.
- Keep `paper-csur/references.bib`, `paper-csur/citation_keys.txt`, and the actually cited key set synchronized.
- Recompile every affected entrypoint after meaningful LaTeX changes.
- Do not commit directly to `main`. Continue through a branch and pull request.
- Do not add an AI coauthor, `Co-Authored-By` trailer, or generated-by footer to commits or pull requests.
- Do not submit or upload to ScholarOne, arXiv, OpenReview, or another venue. Human authors perform all external submissions.
- Do not add ACM DOI, volume, issue, article number, received date, price, or rights metadata. ACM supplies production metadata after acceptance.

## Remaining checklist

### A. AI-safe repository work

- [ ] Correct `paper-csur/ARXIV_README.md`: author metadata is now stored in `paper-csur/authors.tex`, not `paper-csur/frontmatter.tex`.
- [ ] After receiving author-confirmed metadata, update `paper-csur/authors.tex` and keep the standalone supplement author block in `paper-csur/supplement.tex` consistent.
- [ ] After any final proofread edits, rebuild all affected PDFs and rerun the validation gates below.
- [ ] Update this checklist and the Phase 8 row in `README.md` as items are completed.

### B. Required author input

- [ ] Obtain affiliation and email for Kshitij Tayal.
- [ ] Obtain affiliation and email for Genta Indra Winata.
- [ ] Obtain affiliation and email for Anirban Das.
- [ ] Obtain affiliation and email for Sambit Sahu.
- [ ] Obtain a valid ORCID for every author, including Arun Sharma.
- [ ] Confirm all funding acknowledgments that belong on the title page.
- [ ] Confirm whether a prior-presentation or prior-appearance disclosure is required. Record the exact venue, version, date, and wording supplied by the authors.
- [ ] Check the live ScholarOne instructions to determine whether CSUR currently requires named or anonymous review files. The repository has both builds; do not guess which one to upload.
- [ ] Obtain final coauthor approval of the main paper, supplement, figures, author order, and disclosures.

Current confirmed metadata:

| Author | Affiliation | Email | ORCID |
|---|---|---|---|
| Kshitij Tayal | Awaiting author confirmation | Awaiting author confirmation | Awaiting author confirmation |
| Arun Sharma | University of Minnesota, Twin Cities | `sharm485@umn.edu` | Awaiting author confirmation |
| Genta Indra Winata | Awaiting author confirmation | Awaiting author confirmation | Awaiting author confirmation |
| Anirban Das | Awaiting author confirmation | Awaiting author confirmation | Awaiting author confirmation |
| Sambit Sahu | Awaiting author confirmation | Awaiting author confirmation | Awaiting author confirmation |

### C. Submission preparation

- [ ] Conduct the final author proofread. Check claims, citations, author names, figures, table placement, cross-references, and supplement references.
- [ ] Prepare a concise needs-and-novelty statement against prior surveys. Reuse the comparison in Section 13.2, but confirm in ScholarOne whether a formal cover letter is required.
- [ ] Confirm the final upload set in ScholarOne, including the main manuscript, electronic supplement, figures or source files requested by the portal, and any cover letter.
- [ ] Mark pull request 1 ready for review, request coauthor review, resolve comments, and merge only after approval.
- [ ] Submit manually through ScholarOne at `https://mc.manuscriptcentral.com/csur`.
- [ ] Record the submission identifier and date in `README.md` or a new session note after the human confirms submission.

### D. Optional future arXiv release

- [ ] Confirm all public author metadata and disclosures before packaging.
- [ ] Compile `paper-csur/main-arxiv.tex` and generate `paper-csur/main-arxiv.bbl` immediately before packaging.
- [ ] Assemble the source archive using the file list in `paper-csur/ARXIV_README.md`. The `.bbl` file is git-ignored and must be added to the archive manually.
- [ ] Exclude review files, generated PDFs, unused images, auxiliary files, and ACM production metadata from the source archive.
- [ ] Have an author inspect the packaged source and resulting PDF.
- [ ] Upload to arXiv manually only after author approval.

## Validation gates

Run from the repository root unless noted otherwise.

Bibliography integrity, required before and after any bibliography change:

```text
python3 scripts/verify_bib.py paper-csur/references.bib
```

Expected current result:

```text
OK=370 WHITELISTED=8 MISMATCH/NOT_FOUND=0 SKIPPED=0
```

Compile all deliverables:

```text
cd paper-csur
latexmk -silent -pdf -interaction=nonstopmode -halt-on-error main.tex
latexmk -silent -pdf -interaction=nonstopmode -halt-on-error main-submission.tex
latexmk -silent -pdf -interaction=nonstopmode -halt-on-error supplement.tex
latexmk -silent -pdf -interaction=nonstopmode -halt-on-error main-arxiv.tex
cd ..
```

Repository hygiene:

```text
git diff --check
! rg -n $'\u2014' README.md TODO.md notes paper-csur
git status --short
```

Expected page counts before later author edits:

```text
main.pdf: 27
main-submission.pdf: 26
supplement.pdf: 33
main-arxiv.pdf: 55
```

If proofread edits alter pagination, the main `acmsmall` build must remain at or below 35 pages including references.

## Definition of done

Phase 8 is complete only when all required author metadata and disclosures are confirmed, final author approval is recorded, all required builds and validation gates pass, pull request 1 is reviewed and merged, and a human author completes the ScholarOne submission. The optional arXiv checklist is independent and does not block CSUR submission unless the authors choose to release the preprint first.
