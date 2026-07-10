# Session 2026-07-09: ARR reviews -> response drafts + CSUR expansion kickoff

## What happened

ARR May 2026 reviews arrived for the VRL survey (Submission 12040): Overall 3 / 2.5 / 2 / 1.5 (avg 2.25; one Findings vote, two resubmit votes). Ran a 4-agent research fan-out (ARR logistics, venue intelligence, competing surveys, expansion literature) + verification pass; Arun decided: expand to 50-60 pages for ACM Computing Surveys, keep the VRL term with genealogy + definitional fence, absorb embodied/multimodal language feedback, draft the author response now.

## Key verified facts

- Author response window closes Jul 13 AoE (EMNLP page; ARR page says Jul 14). Meta-review Jul 30; EMNLP commitment Aug 2 (recommendation: do NOT commit, do NOT withdraw; after Jul 30 the paper is free for any venue per ARR CFP).
- CSUR recent LLM-agent surveys: 6-10 months received-to-published (older cohort 12-26+). Fallbacks: TMLR Survey Certification, JAIR. TACL blocked 9 months post-ARR.
- Field is crowding fast (agentic-RL landscape 2509.02547, self-evolving-agent surveys 2507.21046/2508.07407, NLRL 2411.14251); differentiation whitespace = signal-centric formalism + decision rules + credit-assignment synthesis + comparison table.

## Produced this session

- `docs/ARR_author_responses.md`: 4 paste-ready responses, red-teamed (4-agent panel) and fixed.
- `docs/coauthor_decision_memo.md`: paste-ready memo, red-teamed and fixed.
- `notes/arr_reviews_2026_may.md`: full review transcription + weakness index (a)-(k).
- `notes/expansion_thread_map.md`: 9 ingestion threads with seed papers (ids verified).
- `paper-csur/`: acmart skeleton, 14 section stubs each with a writing brief.
- `scripts/verify_bib.py`: citation gate; selftest green; 42 flagged ids verified (2 retitles); full 229-entry run: 177 OK, 52 flagged (mostly Crossref false positives on entries lacking arXiv ids; script since extended with arXiv title-search fallback; re-run pending).
- `scripts/workflow_lit_ingestion.js`: Phase C workflow (8 thread agents + survey shelf + CSUR guidelines).

## REFRAME (same evening): TIST-style revision of the VRL paper

Arun clarified: the attached TIST zips (Abnormal Trajectory Gap Detection, Sharma & Shekhar 2024, + Summary of Differences + decision letter) are the EXEMPLAR of how to do a journal revision; no TIST deadline exists. The active job is revising the VRL paper itself against the four ARR reviews, in that exemplar's style, before the Jul 13 response so the response can say "already implemented". Usage-limit guard active: no big workflows until Arun signals; bounded steps with hard checkpoints.

R1 DONE: `revision/` workspace built from the ARR source; `preamble.tex` carries `\added{}` (red) / `\removed{}` (red strikethrough) behind an `\ifmarkup` toggle; `main.tex` = marked build with `[review]` line numbers, `main_clean.tex` = clean `[preprint]` build; new `new_section/limitations.tex` + `new_section/appendix_revision.tex` stubs; BOTH BUILDS COMPILE (main.pdf, main_clean.pdf). Committed (fa7bcfe).

NEXT (R2, on Arun's go): write the reviewer-driven edits into the sections with \added/\removed per the approved content list in the plan file; then R3 (line-numbered marked PDF -> Responses table .docx/.md + Summary of Differences in the 2024 ltexpprt format), R4 (consistency red-team, budget-capped), R5 (upgrade docs/ARR_author_responses.md to already-implemented phrasing + emit VRL_ARR_Revision zip). Exemplar materials extracted at scratchpad tist/ (majrev manuscript = red-markup reference; summary/ltexpprt.tex = Summary of Differences template); copy ltexpprt.tex into revision/ before R3 (scratchpad is session-scoped).

## Open / next

1. LAUNCH BLOCKED at session end? The Bash/Workflow safety classifier (glm-5.2) had an outage; if `workflow_lit_ingestion.js` did not launch, run it first (Workflow tool, scriptPath above).
2. Re-run `python3 scripts/verify_bib.py paper-acl/references.bib` after the arXiv-fallback extension; hand-audit residue (esp. 2025/2026-keyed entries: wang2026memento2, cai2025flex, hu2026multi, chen2026does, choi2026debate, kapusuzoglu2025cgd, strehl2009reinforcement).
3. git initial commit (no Claude co-author line).
4. ARUN: post the 4 responses to OpenReview before Jul 13 AoE; send the memo to co-authors; check the preprint option in the OpenReview form.
5. Then Phase D (section writing workflow), E (figures/tables), F (adversarial panel).

Full plan: ~/.claude/plans/users-arunsharma-downloads-verbalreinfo-hidden-lovelace.md
