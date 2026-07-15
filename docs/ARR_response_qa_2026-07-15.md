# ARR response QA (Submission 12040, updated 2026-07-15)

Round 1 (evening of 07-14) caught that Reviewer bnae had no individual reply. Round 2 (early 07-15) confirmed Kshitij posted that reply and flagged one open issue: the RLHF/DPO row in Table 2. This round: Kshitij posted one more comment since then, a closing summary to Reviewers and the Area Chair (00:44 UTC), bringing the thread to 8 posted comments total. That closing note doesn't change the open issue, if anything it raises the stakes on it.

Below is the current message for Kshitij, in markdown so it's easier to scan than one prose block. Send however's convenient (email, Slack, whatever renders it).

---

## What's new

One more comment came in since I last checked: a **closing note to Reviewers and the AC**, posted around 00:44 UTC. Thread is now **8 comments** total:

- 2 general responses
- individual replies to all four reviewers (pqAY, Q27s, 3gqM, bnae)
- the bnae reference follow-up
- this closing summary

The closing note itself is clean. It restates the four contributions (three-pillar taxonomy, Table 2/Table 3 boundary and guidance, the deepened RL-theoretic grounding, the coding-agent example plus four cross-cutting challenges) and doesn't introduce anything new that needs checking against the reviews.

## Why it raises the stakes

The closing note says outright:

> "Table 2 states exactly what does and does not fall under VRL."

That's only true if the **RLHF/DPO row actually got fixed**. I can't tell from the notification emails whether that edit happened, comment edits don't send a new notification, only new comments do, so from my side there's no way to see whether Table 2 still says RLHF/DPO are in scope ("Yes, only as Learning Signal (5.4)") or whether it's been corrected.

**Worth a 30-second check on the live OpenReview page before anything else.** This closing note is now the last thing a reviewer reads on their way to checking that table, and if the row is still unfixed it hands pqAY and Q27s their own W1 objection back right after we told them we'd resolved it.

## The fix (if still unfixed)

Unchanged from last round. Both edits go in the **first general response** (note `G8UKNuxQvx`):

**Replace the RLHF / DPO row in Table 2 with:**

```
RLHF / DPO | Comparative judgment compressed to a preference bit before learning | Weights (Training) | No, contrastive endpoint only (5.4): once the judgment is reduced to a preference bit, no linguistic structure is consumed by the learner, so vanilla RLHF and DPO sit at the scalar endpoint of the compression spectrum and are shown for contrast. The in-scope Pillar 3 members are the language-preserving training methods, feedback-conditioned modeling (5.1) and generative process reward models that reason in language before scoring (5.3).
```

**Replace the sentence right above the table** ("RLHF and DPO fall under Pillar 3 specifically because they compress language based judgments into parameter updates...") **with:**

```
Vanilla RLHF and DPO sit at the scalar endpoint of Pillar 3's compression spectrum and fall just outside the VRL fence: they compress a verbal judgment to a preference bit before any learning occurs, so no linguistic structure is consumed by the learner, and we retain them only for contrast. The in-scope training-time methods are those that preserve linguistic structure into the update, such as feedback-conditioned modeling and generative reward models. Instruction following alone, without a feedback or correction signal, does not qualify either, since it lacks the corrective component central to the paradigm.
```

If it's already fixed, ignore the above, that part is done.

## Smaller items, not urgent tonight

Carried over from last round. Neither came up again in the closing note, so no reason to think they changed.

- **Pternea et al. 2024** (the RL/LLM Taxonomy Tree, JAIR 80) is cited in two posted replies (3gqM's and bnae's Table 4) but wasn't in `references.bib` as of last check. Needs verifying and adding, then run through `verify_bib.py`.
- **Zhang year mismatch:** the Zhang agent-memory row in both copies of Table 4 says "Zhang et al. (2025c)" while the full reference at the bottom of both comments gives 2024 (arXiv 2404.13501). Worth checking which Zhang entry the citation key should point to and making the year consistent in both places.

## Bottom line

Everything else across all eight comments still checks out clean against the four reviews.
