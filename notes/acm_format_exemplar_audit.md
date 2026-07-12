# ACM format exemplar audit

Source supplied by the author: `arXiv-2411.06078v1.tar.gz`.

SHA-256: `96eeee75e0e7bc9f863b2ce04109165bbb4d29a86f17d444d63b58505baca821`

## Reused layout conventions

The archive is organized around ACM's generic `sample-acmsmall.tex`. The manuscript reuses its publication-style organization:

1. `\documentclass[acmsmall]{acmart}` for the page-compliance build.
2. Title and author block.
3. Abstract.
4. CCS XML and matching `\ccsdesc` entries.
5. Keywords.
6. `\maketitle`.
7. Numbered article sections.
8. References.
9. Appendices for the full arXiv build.

The repository now provides four entrypoints:

- `main.tex`: CSUR `acmsmall` compliance build.
- `main-submission.tex`: single-column review build.
- `supplement.tex`: standalone electronic supplement.
- `main-arxiv.tex`: full arXiv build with the supplement appended.

## Exemplar-specific material not copied

The archive is an arXiv preprint based on a generic ACM sample, not publisher-issued CSUR production source. The following items are specific to that paper or obsolete for this project and were not copied:

- KAN-specific title, authors, affiliations, abstract, CCS concepts, and keywords.
- Its 2024 received date, placeholder DOI, and copyright fields.
- `\bibliographystyle{unsrt}` and its expanded inline bibliography. This manuscript retains `ACM-Reference-Format`.
- Its bundled `acmart` v2.08. The local build uses the current installed `acmart` v2.16.
- Its empty appendix and paper-specific images.

Volume, issue, article number, DOI, received date, and rights metadata remain omitted until ACM supplies them. Coauthor affiliations, emails, and ORCIDs remain author-confirmation items rather than inferred metadata.
