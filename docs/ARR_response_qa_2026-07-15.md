# ARR response QA, round 2 (Submission 12040, 2026-07-15)

Kshitij posted two more comments overnight: the individual reply to Reviewer bnae (`sRniDiGH3t`, 2026-07-15T00:18 UTC) plus a follow-up comment carrying its reference list (`...w9OVV75k`, 00:19 UTC). That brings the thread to 7 posted comments total: 2 general responses, and individual replies to all four reviewers (pqAY, Q27s, 3gqM, bnae).

Re-QA'd all 7 against `notes/arr_reviews_2026_may.md` and the manuscript fence (`paper-csur/sections/s01_introduction.tex`, `s06_pillar_learning.tex`). Bottom line: the bnae reply closes the gap flagged in the last round, and it's a good one, specific section pointers throughout, a real itemized research agenda (§6.1 to §6.4), not just a restated "future work" line. One issue from last round is still open and now appears across every reply since they all reference the same table: the RLHF/DPO scope entry in Table 2. Below is the copy-paste-ready feedback for Kshitij.

---

```text
Went through both new comments against the reviews and the manuscript. Two things.

First, the good news: the bnae reply is thorough and directly answers what he asked for. The four contributions in W2, the itemized research agenda tied to specific sections (error localization models in 6.1, tool API metadata in 6.2, feedback provenance and adversarial benchmarks in 6.3, the three theory directions in 6.4), and the limitations paragraph with section pointers all land well. That was the one reviewer without an individual reply last I checked, so this closes it out.

Second, one real issue, and it is worth fixing tonight if the comment is still editable. The RLHF and DPO row in Table 2 (in the first general response) still says RLHF and DPO are in scope, "Yes, only as Learning Signal (5.4)." That is backwards from what the manuscript actually says. Both s01 (intro, the definitional fence) and s06 (the compression spectrum) put vanilla RLHF and DPO outside VRL: they are the scalar endpoint, kept only for contrast, once the judgment is compressed to a preference bit no linguistic structure is left for the learner to consume. This is not a small wording thing, it is the exact question pqAY's W1 and Q27s's W1 are asking, whether the definition draws a real line around RLHF and DPO or swallows them. Right now Table 2 answers "swallows them," which hands the reviewers their own objection back.

The fix is small because every other reply just points back to "Table 2 in our general response" rather than repeating the row, so editing that one comment fixes it everywhere at once. Two edits, both in the first general response (note G8UKNuxQvx):

Replace the RLHF / DPO row in Table 2 with:

RLHF / DPO | Comparative judgment compressed to a preference bit before learning | Weights (Training) | No, contrastive endpoint only (5.4): once the judgment is reduced to a preference bit, no linguistic structure is consumed by the learner, so vanilla RLHF and DPO sit at the scalar endpoint of the compression spectrum and are shown for contrast. The in-scope Pillar 3 members are the language-preserving training methods, feedback-conditioned modeling (5.1) and generative process reward models that reason in language before scoring (5.3).

And replace the sentence right above the table ("RLHF and DPO fall under Pillar 3 specifically because they compress language based judgments into parameter updates...") with:

Vanilla RLHF and DPO sit at the scalar endpoint of Pillar 3's compression spectrum and fall just outside the VRL fence: they compress a verbal judgment to a preference bit before any learning occurs, so no linguistic structure is consumed by the learner, and we retain them only for contrast. The in-scope training-time methods are those that preserve linguistic structure into the update, such as feedback-conditioned modeling and generative reward models. Instruction following alone, without a feedback or correction signal, does not qualify either, since it lacks the corrective component central to the paradigm.

Two smaller things for when this gets folded into the actual revision, not urgent for OpenReview tonight. Pternea et al. 2024 (the RL slash LLM Taxonomy Tree, JAIR 80) is now cited in two posted replies (3gqM's and bnae's Table 4) but is not yet in references.bib, needs verifying and adding, then run through verify_bib.py. And the Zhang agent-memory row in both copies of Table 4 says "Zhang et al. (2025c)" while the full reference at the bottom of both comments gives 2024 (arXiv 2404.13501), worth checking which Zhang entry in the bib that citation key is supposed to point to and making the year consistent in both places.

One cosmetic nit, skip it if you are out of time: the Pternea row in Table 4 is worded slightly differently between the 3gqM posting ("RL/LLM terminology") and the bnae posting ("Which technology, RL or LLM"). Doesn't matter for the reviewers, just noting it in case you want the two copies to match.

Everything else across all seven comments checks out clean against the four reviews, point by point coverage is complete and the tone is right throughout.
```
