# CSUR length-compliance record

Measured 2026-07-11 with the `acmart` CSUR `acmsmall` layout.

## Completed outcome

- Compliance main paper: 27 pages total.
- Main text, figures, and tables: pages 1–21.
- References: pages 22–27.
- Main section prose: roughly 8,306 words.
- Main-paper citation set: 123 unique keys.
- Standalone electronic supplement: 33 pages.
- Anonymous single-column review build: 26 pages.
- Combined arXiv build: 55 pages.
- Main paper plus supplement bibliography: 378 synchronized, verified entries.
- CSUR limit: 35 pages including references.

The original 70-page build consisted of article pages 1–49, references around pages 50–67, and three stranded float pages at the end. The earlier description of all pages 50–70 as references was therefore too coarse. The completed split reduced the main paper below the 35-page limit while preserving the detailed method catalog and supporting evidence in the electronic supplement.

The electronic supplement is not an overflow copy of the main paper. It should contain the evidence catalog that supports the main synthesis: representative-system details, secondary benchmark results, expanded taxonomies, and extended threat and evaluation inventories. Citations move with the claims they support. A citation removed from the main article remains in the supplement bibliography if the corresponding claim moves there; it is removed from the main bibliography and main citation manifest.

## Protected differentiators

The following material stays in the main article even if other content moves:

1. Signal-centric formalism and the two-criterion definitional fence.
2. Credit-assignment synthesis and optimizer-pairing rules.
3. Practitioner decision rules, including the decision tree.
4. The comparison table against prior surveys.

## Baseline section budget and completed split

The following table records the planning baseline used to execute the split. It is retained for provenance and should not be read as the current word count.

| Section | Current words | Main target | Keep in main | Move to supplement |
|---|---:|---:|---|---|
| Introduction | 1,695 | 900 | Motivation, genealogy, fence preview, four contributions | Extended examples and repeated roadmap prose |
| Formal framework | 2,603 | 1,600 | Formal model, two criteria, boundary cases needed later | Long notation walkthroughs and secondary examples |
| Taxonomy | 2,046 | 1,100 | Three pillars, assignment rule, hybrid-case table | Full cell-by-cell examples and extended edge-case discussion |
| Grounding | 1,989 | 700 | Four grounding roles and conditions for choosing them | System catalog and secondary benchmark details |
| Deliberative feedback | 1,682 | 900 | Four mechanisms and synthesis by quality, circularity, and compute | Detailed debate, memory, and search system inventory |
| Learning signals | 2,495 | 1,200 | Compression spectrum, online/offline distinction, main algorithmic interactions | Per-method training catalog and secondary variants |
| Verbal reward stack | 1,911 | 900 | Four-rung stack, scalarization boundary, one anchor result per rung | Extended rubric, generative-reward, and PRM inventories |
| Credit assignment | 2,248 | 1,500 | Full synthesis table, temporal and structural assignment, optimizer pairing | Secondary method examples and implementation variants |
| Language-space optimizers | 1,817 | 700 | Optimizer families and selection rule | System-by-system descriptions and benchmark results |
| Embodied and multimodal | 1,640 | 600 | Modality-specific constraints and bridge to the framework | Robot and environment catalog |
| Evaluation | 2,173 | 900 | Feedback quality versus utilization, core protocol, minimum reporting standard | Benchmark inventory and secondary metrics |
| Safety | 1,595 | 700 | Threat model, boundary-level failure modes, core defenses | Attack and defense catalog |
| Practitioner guide and agenda | 2,478 | 1,500 | Decision tree, prior-survey comparison, decision rules, focused agenda | Extended open-problem evidence and secondary survey descriptions |
| Conclusion | 749 | 400 | Scope, core synthesis, limitations | Repeated recap |

Total target: about 13,600 words. This is a ceiling, not a quota.

## Proposed supplement structure

1. Extended taxonomy examples and boundary cases.
2. Catalog of grounding and deliberative-feedback systems.
3. Catalog of learning-signal pipelines and verbal reward models.
4. Extended credit-assignment and language-space-optimizer examples.
5. Embodied and multimodal system catalog.
6. Evaluation benchmarks and metrics inventory.
7. Feedback-channel attacks and defenses.
8. Extended research agenda and prior-survey notes.
9. Supplement references.

## Execution gates

The four bounded passes are complete. The manuscript was recompiled after each pass.

1. Completed: moved catalogs from Sections 4, 5, 9, 10, and 12.
2. Completed: compressed Sections 6, 7, and 11 around their organizing claims.
3. Completed: tightened Sections 1–3 and 14 without weakening the definitions or four protected differentiators.
4. Completed: curated main-paper citations and synchronized the union bibliography and manifest across the main paper and supplement.

The final validation gate covers `main.tex`, `main-submission.tex`, `supplement.tex`, and `main-arxiv.tex`. Each build must have zero LaTeX errors, zero undefined citations or references, no em dashes in prose, and no cited key absent from the synchronized manifest.
