# CSUR length-compliance plan

Measured 2026-07-11 with `\documentclass[acmsmall,screen,review]{acmart}`.

## Current footprint and target

- Current total: 70 pages.
- Main text, figures, and tables: pages 1–49.
- References: pages 50–70.
- CSUR limit: 35 pages including references.
- Working target: 24 pages for the article and 11 pages for roughly 200–230 main-paper references. Reserve one page inside that budget for float movement and final metadata.
- Current section text: roughly 27,100 words and 558 section-level unique citation occurrences before cross-section deduplication.
- Target main text: 12,000–14,000 words. The supplement retains the extended method catalog, detailed evidence, and citations moved out of the main article.

The electronic supplement is not an overflow copy of the main paper. It should contain the evidence catalog that supports the main synthesis: representative-system details, secondary benchmark results, expanded taxonomies, and extended threat and evaluation inventories. Citations move with the claims they support. A citation removed from the main article remains in the supplement bibliography if the corresponding claim moves there; it is removed from the main bibliography and main citation manifest.

## Protected differentiators

The following material stays in the main article even if other content moves:

1. Signal-centric formalism and the two-criterion definitional fence.
2. Credit-assignment synthesis and optimizer-pairing rules.
3. Practitioner decision rules, including the decision tree.
4. The comparison table against prior surveys.

## Section budget and split

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

Apply the split in four bounded passes. Recompile after every pass.

1. Move catalogs from Sections 4, 5, 9, 10, and 12. Target: main body at or below 39 pages before references.
2. Compress Sections 6, 7, and 11 around their organizing claims. Target: main body at or below 32 pages before references.
3. Tighten Sections 1–3 and 14 without weakening definitions. Target: main body at or below 25 pages before references.
4. Curate the main reference set by retaining anchors, surveys, and evidence directly used by surviving claims. Move all other still-used entries to the supplement bibliography. Target: at most 35 total pages, zero undefined references, and synchronized manifests.

The final gate is `latexmk -pdf main.tex`, followed by checks for zero LaTeX errors, zero undefined citations or references, no em dashes in prose, and no citation key absent from its document's manifest.
