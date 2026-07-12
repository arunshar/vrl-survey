# The Rise of Verbal Reinforcement Learning: A Survey

Working manuscript for a survey paper by Kshitij Tayal, Arun Sharma, Genta Indra Winata, Anirban Das, and Sambit Sahu, in development for **ACM Computing Surveys (CSUR)**.

Verbal reinforcement learning (VRL) is the practice of using natural language, critiques, rubrics, reflections, debates, rather than scalar rewards, as the signal that steers an agent's behavior. This survey organizes that fast-growing literature by the signal itself: what linguistic artifact is consumed, which decision-problem component it modifies, and when it takes effect. It gives the space a formal framework with an explicit definitional fence separating VRL from scalarized preference learning, synthesizes credit assignment for verbal signals, and distills practitioner decision rules.

An earlier, shorter version of this paper went through an external review round. The feedback from that round (formalize the framework, add credit-assignment depth, add practitioner guidance, position against prior surveys) shaped the structure below directly; this repo carries that revision history forward as working reference material, not as a record of any particular venue process.

## What's in this repo

### The manuscript ([paper-csur/](paper-csur/))
A 14-section manuscript in the `acmart` class, organized in the CSUR `acmsmall` publication style. The compliance build is **27 pages**: 21 pages of article content and 6 pages of references. It contains about 8,300 words of section prose, 4 main-paper figures, and 123 main-paper citation keys. The standalone supplement preserves the detailed evidence catalogs in 33 pages. The combined arXiv build is 55 pages. Across the main paper and supplement, the synchronized bibliography contains 378 verified entries. [paper-csur/main.pdf](paper-csur/main.pdf) is the current compliance draft.

LaTeX entry points:

| File | Purpose |
|---|---|
| [main.tex](paper-csur/main.tex) | Named-author CSUR `acmsmall` compliance build |
| [main-submission.tex](paper-csur/main-submission.tex) | Anonymous single-column review build for ScholarOne checks |
| [supplement.tex](paper-csur/supplement.tex) | Standalone electronic supplement |
| [main-arxiv.tex](paper-csur/main-arxiv.tex) | Full arXiv build with the supplement as appendices and one bibliography |

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

### Revision history ([revision/](revision/))
A LaTeX source that compiles to two PDFs from one `\ifmarkup` toggle: a **marked** build ([main.tex](revision/main.tex), red text for every change, margin line numbers) and a **clean** build ([main_clean.tex](revision/main_clean.tex)). Alongside it, a comment-by-comment **Responses to Reviewers** table and a **Summary of Differences** documenting how the shorter draft was revised into this expanded version, carried forward here as reference material for how the current structure came about.

### Supporting material
- [notes/threads/](notes/threads/) (T1-T9): literature notes from a 9-thread ingestion pass (~290 verified papers, ~100 more discovered and verified), one file per thread, each entry with a canonical title, verified arXiv id, method summary, and abstract-grounded key claim.
- [notes/csur_submission_requirements.md](notes/csur_submission_requirements.md): ACM Computing Surveys' submission rules (format, length limit, submission system), recovered via Wayback Machine snapshots and the acmart CTAN documentation.
- [notes/acm_format_exemplar_audit.md](notes/acm_format_exemplar_audit.md): a format-only audit of the supplied ACM source archive, including what was reused and what was deliberately excluded.
- [paper-csur/ARXIV_README.md](paper-csur/ARXIV_README.md): the future arXiv source-package entry point, compilation command, and packaging checklist.
- [paper-csur/supplement/](paper-csur/supplement/): extended foundations, method catalogs, credit-assignment examples, evaluation evidence, and safety material moved out of the length-limited main paper without deleting it.
- [notes/bib_whitelist.tsv](notes/bib_whitelist.tsv): a short list of hand-verified bibliography entries (books, pre-arXiv classics) that automated verification cannot resolve, with the verification method recorded for each.
- [scripts/verify_bib.py](scripts/verify_bib.py): the citation-integrity gate. Checks every bib entry's title against the arXiv API, falls back to an arXiv title search, then Crossref, and finally the whitelist. Run it with `python3 scripts/verify_bib.py <path-to-bib>`.
- [sessions/](sessions/): a running log of what happened in each work session, in case the thread is picked up later.

## Rules this repo enforces

- **No unverified citations.** Every entry in `paper-csur/references.bib` has to pass `verify_bib.py` or be explicitly whitelisted with a stated reason. `paper-csur/citation_keys.txt` is the manifest: nothing gets cited in the manuscript unless its key is in that file.
- **No em dashes.** En dashes only for numeric ranges.
- **Nothing auto-submitted.** No automation posts to OpenReview, arXiv, or ACM Manuscript Central. The authors do that by hand.

## Progress (as of 2026-07-11)

**7 of 8 phases done. Only author-confirmed metadata and disclosures, final proofing, and submission remain.**

| # | Phase | Status | Notes |
|---|---|---|---|
| 1 | Literature review | ✅ Done | 9 topical threads; ~290 seed papers verified + ~100 more discovered and verified |
| 2 | Citation verification | ✅ Done | All 378 final bibliography entries checked against a primary source or hand-whitelisted; 0 unresolved |
| 3 | Manuscript drafting | ✅ Done | All 14 sections written against the taxonomy and outline |
| 4 | Figures and tables | ✅ Done | 6 figures retained across the main paper and supplement; 5 were rebuilt as editable vector sources and TAPS-safe PDFs, and the supplied raster figure already contains the corrected panel (e) label |
| 5 | Adversarial review, round 1 | ✅ Done | Multi-reviewer pass (comprehensiveness, technical rigor, citation accuracy, style); every blocking and should-fix finding resolved |
| 6 | Editorial polish | ✅ Done | Synthesis edits are complete, and all six figures have accessible descriptions. The current panel (e) raster already reads "Evaluator feedback in search." |
| 7 | Length compliance | ✅ Done | The `acmsmall` main build is 27 pages including references; the anonymous review build is 26 pages, the standalone supplement is 33 pages, and the combined arXiv build is 55 pages. All four protected differentiators remain in the main paper. |
| 8 | Submission | ⬜ Human action | Confirm the four coauthors' affiliations and emails plus valid ORCIDs for all authors; add author-confirmed funding and prior-appearance disclosures; conduct the final proofread; prepare the cover letter; and submit through ScholarOne. Nothing has been submitted automatically. |

Update this table whenever a phase's status changes so the repo stays an accurate snapshot for anyone picking the thread back up.
