# The Rise of Verbal Reinforcement Learning: A Survey

Working repo for a survey paper by Kshitij Tayal, Arun Sharma, Genta Indra Winata, Anirban Das, and Sambit Sahu, tracking two connected efforts: the ARR revision of the original 8-page submission, and its expansion into a full survey targeting **ACM Computing Surveys (CSUR)**.

This repo is private. It exists as a working reference, not a publication artifact; nothing here has been submitted anywhere by automation. Every submission action (OpenReview, arXiv, ACM Manuscript Central) is taken by the authors.

## The two threads

**1. ARR revision (ACL Rolling Review, May 2026 cycle, Submission 12040).** The original paper received four reviews averaging 2.25/5. All four reviews converged on fixable issues: an overly broad VRL definition, a term collision with Reflexion's narrower coinage, no decision rule for cross-pillar methods, thin RL-theoretic treatment, no practitioner guidance, no comparison with prior surveys, no research agenda. The paper was revised against every point, in the style of a journal major revision (tracked changes, a comment-by-comment response table, a summary of differences), so the ARR author response could say the fixes were already implemented rather than promised. Deadline: post the response by **July 13 AoE**; do not commit to EMNLP by Aug 2; do not withdraw (the paper is free for any venue after the July 30 meta-review).

**2. CSUR expansion.** The ARR review depth (formal framework, credit-assignment theory, a practitioner playbook, positioning against a dozen adjacent surveys) does not fit in 8 conference pages. The fixes were expanded into a full-length survey aimed at ACM Computing Surveys, whose long-survey format allows up to 35 pages including references. Plan: read the July 30 meta-review, then arXiv the expanded draft and submit to CSUR via ACM Manuscript Central (target ~end of August 2026).

## What's built

### ARR revision package ([revision/](revision/))
A LaTeX source that compiles to two PDFs from one `\ifmarkup` toggle: a **marked** build ([main.tex](revision/main.tex), ACL `[review]` mode, red text for every change, margin line numbers) and a **clean** build ([main_clean.tex](revision/main_clean.tex), `[preprint]` mode). Alongside it: a comment-by-comment **Responses to Reviewers** table (every reviewer point, including strengths, answered with "addressed as follows, see Section X, page Y, lines A-B", cross-checked against the real compiled line numbers), and a **Summary of Differences** in the 2024 major-revision format the authors have used before.

**Current deliverable:** [revision/VRL_ARR_Revision_2026-07-11.zip](revision/VRL_ARR_Revision_2026-07-11.zip) (marked PDF, clean PDF, Summary of Differences PDF, Responses in .md/.docx/.pdf, full LaTeX source). Two earlier zips (`-10.zip`, `-10b.zip`) are superseded: a citation audit found five bibliography entries with fabricated author names or wrong titles inherited from the first-author's working draft, and the `-11` zip is the corrected rebuild. **Use `-11`, not the earlier zips.**

### CSUR draft ([paper-csur/](paper-csur/))
A 14-section manuscript in the `acmart` class (`manuscript,screen,review` options), compiling clean to **67 pages**, ~28,500 words of body prose, 6 figures, and a 472-entry bibliography where every single citation has been checked against a primary source (arXiv, DBLP, OpenAlex, Crossref, or the publisher page). [paper-csur/main.pdf](paper-csur/main.pdf) is the current draft.

Section map:

| File | Content |
|---|---|
| [s01_introduction.tex](paper-csur/sections/s01_introduction.tex) | Motivation, term genealogy, definitional fence, contributions |
| [s02_formal_framework.tex](paper-csur/sections/s02_formal_framework.tex) | VRL as a language-augmented POMDP; the two-criteria fence formalized |
| [s03_taxonomy.tex](paper-csur/sections/s03_taxonomy.tex) | Three-pillar taxonomy + cross-pillar assignment rule + hybrid-case table |
| [s04_pillar_grounding.tex](paper-csur/sections/s04_pillar_grounding.tex) | Language as grounding signal (goal/state/action/reward) |
| [s05_pillar_deliberative.tex](paper-csur/sections/s05_pillar_deliberative.tex) | Language as deliberative feedback (critique, debate, memory, search) |
| [s06_pillar_learning.tex](paper-csur/sections/s06_pillar_learning.tex) | Language as learning signal; the compression spectrum down to RLHF/DPO |
| [s07_verbal_reward_stack.tex](paper-csur/sections/s07_verbal_reward_stack.tex) | Verifiers to rubrics to generative reward models to PRMs |
| [s08_credit_assignment.tex](paper-csur/sections/s08_credit_assignment.tex) | Credit assignment and optimizer pairing for verbal signals |
| [s09_language_space_optimizers.tex](paper-csur/sections/s09_language_space_optimizers.tex) | TextGrad, GEPA, DSPy, OPRO, and language-space optimization |
| [s10_embodied.tex](paper-csur/sections/s10_embodied.tex) | Embodied and multimodal VRL |
| [s11_evaluation.tex](paper-csur/sections/s11_evaluation.tex) | Benchmarks, the feedback-quality-vs-utilization split |
| [s12_safety.tex](paper-csur/sections/s12_safety.tex) | Robustness of feedback channels: judge injection, reward hacking, sycophancy |
| [s13_practitioner_guide_agenda.tex](paper-csur/sections/s13_practitioner_guide_agenda.tex) | Decision tree, comparison table vs. ~15 prior surveys, research agenda |
| [s14_conclusion.tex](paper-csur/sections/s14_conclusion.tex) | Conclusion and limitations |

### Supporting material
- [notes/arr_reviews_2026_may.md](notes/arr_reviews_2026_may.md): the four reviews transcribed in full, plus a lettered weakness index used to track that every point got a section-level fix.
- [notes/threads/](notes/threads/) (T1-T9): literature notes from a 9-thread ingestion pass (~290 verified papers, ~100 more discovered and verified), one file per thread, each entry with a canonical title, verified arXiv id, method summary, and abstract-grounded key claim.
- [notes/csur_submission_requirements.md](notes/csur_submission_requirements.md): CSUR's actual submission rules, recovered via Wayback Machine snapshots and the acmart CTAN documentation (dl.acm.org blocks live fetches). This is the source for the 35-page rule and the ScholarOne submission process.
- [notes/bib_whitelist.tsv](notes/bib_whitelist.tsv): a short list of hand-verified bibliography entries (books, pre-arXiv classics) that automated verification cannot resolve, with the verification method recorded for each.
- [scripts/verify_bib.py](scripts/verify_bib.py): the citation-integrity gate. Checks every bib entry's title against the arXiv API, falls back to an arXiv title search, then Crossref, and finally the whitelist. Run it with `python3 scripts/verify_bib.py <path-to-bib>`.
- [docs/ARR_author_responses.md](docs/ARR_author_responses.md), [docs/coauthor_decision_memo.md](docs/coauthor_decision_memo.md): paste-ready text for the ARR OpenReview form and the co-author thread.
- [sessions/](sessions/): a running log of what happened in each work session, in case the thread is picked up later.

## Rules this repo enforces

- **No unverified citations.** Every entry in `paper-csur/references.bib` has to pass `verify_bib.py` or be explicitly whitelisted with a stated reason. `paper-csur/citation_keys.txt` is the manifest: nothing gets cited in the manuscript unless its key is in that file.
- **No em dashes.** En dashes only for numeric ranges.
- **Nothing auto-submitted.** No automation posts to OpenReview, arXiv, or ACM Manuscript Central. The authors do that by hand.

## Current status (as of 2026-07-11)

Both threads have a complete first pass. The ARR revision package is ready for the co-authors to send. The CSUR draft has been through one full adversarial review round (four agents replaying the actual ARR reviewers' complaints against the new draft, two fresh reviewers checking comprehensiveness and rigor, a citation auditor, and a style auditor); every blocking and should-fix finding from that round has been resolved. What's left before a CSUR submission is ready: a couple of source figures need re-exporting with updated labels, two sections could use a tighter editorial pass, and the 67-page draft needs to be brought in line with CSUR's 35-page limit (including references) by trimming or moving material to an electronic supplement.
