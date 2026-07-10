# Co-author decision memo (paste-ready)

Red-teamed 2026-07-09; provenance hedges and consistency fixes applied.

```text
VRL survey: where we stand after the ARR May reviews, and the plan

Scores. Overall Assessment 3 / 2.5 / 2 / 1.5, average 2.25. On the ARR scale: one Findings vote, one borderline Findings, two resubmit votes. For reference, community-reported samples suggest accepted-paper averages around 3.1 to 3.3 at recent EMNLPs (ARR publishes no official figure), and papers averaging below roughly 2.5 are reported to rarely survive commitment. With two explicit resubmit votes, committing this version to EMNLP on August 2 is very likely a reject.

The reviews are good news in one respect: they cluster on a small set of fixable issues (definition too broad: pqAY and Q27s; unclear added value versus prior surveys: 3gqM and bnae; no decision rules for hybrid methods; shallow RL treatment; no practitioner guidance; no research agenda). Nobody disputes the topic, and the pillar categorization is accepted as an organizing picture; Q27s rejects the lifecycle framing specifically, which we concede and fix by reframing the pillars as classifying where a signal acts. None of these fixes fit in 8 ACL pages, which points to a long-form version.

Recommended actions and dates.

By July 13 AoE: post the author responses. Drafts for all four reviewers are ready (concede the scope and terminology points with a concrete fix plan, push back politely where reviewers misread). This costs little and shapes the July 30 meta-review.

August 2: do NOT commit to EMNLP.

Do NOT withdraw the submission. Per the ARR CFP, once the meta-review is released on July 30 the paper is automatically free to be submitted anywhere; withdrawing gains nothing.

After July 30: submit an expanded 50 to 60 page version to ACM Computing Surveys (CSUR), one of the highest-impact venues in computing. Recent LLM-agent surveys there went from submission to publication in 6 to 10 months, though the older cohort took 12 to 26+ months; the fallback chain below hedges this variance. We keep the VRL term but open with a genealogy note generalizing Shinn et al.'s coinage, add a formal definitional fence that excludes vanilla RLHF/DPO and plain instruction following, and absorb language feedback in embodied and multimodal settings as first-class content. Roughly 8 new sections: formal framework, verbal reward stack (rubrics, generative reward models, process reward models (PRMs)), credit assignment with verbal signals, language-space optimizers (TextGrad, GEPA, DSPy), embodied settings, evaluation and benchmarks, safety of feedback channels, practitioner guide plus research agenda. References grow from 229 to roughly 400, all machine-verified.

arXiv the expanded version right after July 30 for visibility and priority (a competing survey in this space within 6 to 12 months is a real risk; the field moved fast in the first half of 2026). One check needed: whoever submitted in May, please confirm in the OpenReview form that we did not select the binding no-preprint option, and if we did, check the ARR policy for the earliest permitted preprint date (likely the meta-review release).

Fallbacks if CSUR drags or desk-rejects: TMLR with Survey Certification (median decision 104 days, then a journal-to-conference track onto partner ML conferences), then JAIR's survey track. TACL is blocked for 9 months after an ARR submission. The October ARR cycle stays open as a conference-route backup for an 8-page version, but the depth the reviewers demand does not fit that format.

Division of labor: I am producing the expansion draft, literature ingestion, and citation verification now (heavily automated) and will send each section for review. The immediate human tasks are posting the responses by July 13 and the preprint-option check.

Target: expanded draft ready for internal review by mid August, CSUR submission by end of August.
```
