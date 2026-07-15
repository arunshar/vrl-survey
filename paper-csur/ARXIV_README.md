# arXiv source entrypoint

Use `main-arxiv.tex` for a future arXiv release. It combines the CSUR-length main article with the extended evidence supplement as appendices and emits one union bibliography.

Compile from this directory:

```text
latexmk -pdf -interaction=nonstopmode -halt-on-error main-arxiv.tex
```

Before public release, complete the author metadata marked in `frontmatter.tex`. Affiliations, emails, and valid ORCIDs must come from author-confirmed records. Do not add ACM volume, issue, article number, DOI, received date, or rights metadata to the arXiv version.

An arXiv source package should include:

- `main-arxiv.tex`
- `preamble.tex`
- `authors.tex`
- `frontmatter.tex`
- `sections/`
- `supplement/`
- the image files referenced by those sources
- `references.bib`
- the generated `main-arxiv.bbl`

The repository ignores `.bbl` files. Generate `main-arxiv.bbl` immediately before packaging and add it to the source archive manually; it does not need to be committed. Exclude generated PDFs, other auxiliary files, review materials, unused images, and the generic ACM sample files. Preserve all relative paths because arXiv compiles from the archive root.
