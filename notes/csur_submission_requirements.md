# ACM Computing Surveys (CSUR): submission requirements

Compiled 2026-07-11. dl.acm.org and www.acm.org return 403 to direct fetches, so every VERIFIED item below comes from a Wayback Machine snapshot of the official page or from the acmart documentation PDF on CTAN. Snapshot dates are given per source. Items marked UNVERIFIED are general knowledge or inference and must be confirmed on the live pages or in ScholarOne before submission.

## Sources actually fetched (verification basis)

1. CSUR Author Guidelines: Wayback snapshot 2025-04-27 of https://dl.acm.org/journal/csur/author-guidelines
2. ACM master template / submissions page: Wayback snapshot 2025-12-25 of https://www.acm.org/publications/authors/submissions
3. CSUR Editorial Charter: Wayback snapshot 2025-02-25 of https://dl.acm.org/journal/csur/editorial-charter
4. CSUR Associate Editor Guidelines: Wayback snapshot 2025-02-25 of https://dl.acm.org/journal/csur/associate-editor-guidelines
5. acmart class documentation (acmart.pdf), current production version from CTAN: https://mirrors.ctan.org/macros/latex/contrib/acmart/acmart.pdf

No snapshot of a CSUR reviewer-guidelines page exists in the Wayback Machine; the ScholarOne submission form itself is behind login and could not be inspected.

## VERIFIED: paper types and length

- CSUR accepts three submission types: Long Survey Paper, Short Survey Paper (perspective pieces/essays by a leader in the field), and Tutorial Paper. [Source 1]
- Long survey papers "must not exceed 35 pages, including references, when formatted using the Surveys style." [Source 1]
- Additional material beyond 35 pages may be considered as an electronic supplement; the author must indicate which pages form the 35 publication pages and which go to the supplement, and both publish simultaneously on acceptance. [Source 1]
- "Manuscripts of excessive length may be rejected without review." [Source 1]
- Short survey papers should be self-contained and not exceed 15 pages including references in the Surveys style. [Source 1]
- The AE guidelines list desk-reject grounds including: topic out of scope/irrelevant/outdated; clearly insufficient novelty or presentation quality; plagiarism, self-plagiarism, or simultaneous submission; manuscript incomplete, over the page limit, or incorrectly formatted. [Source 4]

## VERIFIED: scope (what CSUR wants)

- CSUR "does not publish 'new' research"; it publishes surveys and tutorials that integrate the existing literature and put results in context. [Source 3]
- A survey "assumes a general knowledge of the area; it emphasizes the classification of the existing literature, developing a perspective on the area, and evaluating trends." A tutorial assumes an inexpert audience. [Sources 1, 3]
- Both surveys and tutorials "must develop a framework or overall view of an area that integrates the existing literature." A CSUR article should answer "What is currently known about this area, and what does it mean to researchers and practitioners?" [Source 3]
- The Editor-in-Chief "welcomes suggestions for topics and questions about contemplated submissions" (pre-submission queries are an accepted route). [Source 3]
- Journal publishes 9 times per year. [Source 3]

## VERIFIED: template and format at submission

- Submissions for editorial review are accepted in LaTeX or MS Word. "Use of the ACM Journals/Transactions LaTeX style is encouraged to ensure proper formatting. It includes explicit support for ACM Computing Surveys." [Source 1]
- The same page also states: "Manuscripts accepted for publication in any ACM publication must be formatted using the ACM authoring template. Submissions must also use the ACM authoring templates." [Source 1]
- ACM-wide rule: "All authors should submit manuscripts for review in a single column format." [Source 2]
- LaTeX authors: use the ACM Primary Article Template (v2.16, published 2025-08-28 as of the snapshot) with the option `manuscript`, i.e. `\documentclass[manuscript]{acmart}`, to produce the single-column submission format. [Source 2]
- Word authors: use the Submission Template (Review Submission Format), single column. [Source 2]
- acmart documentation confirms: `manuscript` is the default format option ("A manuscript. This is the default."); `acmsmall` is the "Small single-column format" and CSUR is explicitly listed among the journals that use acmsmall. [Source 5]
- The boolean `review` option (default false) produces "A review version: lines are numbered and hyperlinks are colored" and "is useful when combined with the manuscript format option. It provides a version suitable for reviewers and copy editors." So a sensible submission preamble is `\documentclass[manuscript,review]{acmart}`. [Source 5]
- TAPS compatibility: restrict LaTeX packages to ACM's approved-packages list; the template uses the libertine font set; "Fonts used in the template cannot be substituted; margin adjustments are not allowed." [Source 2]
- CCS Concepts and user-defined keywords are required for all articles over two pages; the ACM Reference Format text is required for all articles over one page. [Source 2]
- Content indicators must be assigned from the 2012 ACM Computing Classification System (general terms + subject descriptors) plus free keywords. [Source 1]
- Abstract: at most 100 words, short direct sentences, no first person, no displayed math, no citation reference numbers, avoid starting with "This paper ...". [Source 1]
- Title page: funding sources and any prior presentations at technical meetings acknowledged in a first-page footnote. [Source 1]

## VERIFIED: submission system

- Submit electronically to ACM Manuscript Central (ScholarOne) at https://mc.manuscriptcentral.com/csur; the same site tracks paper status. [Source 1]
- ACM-wide, all journals except TEAC/TOCT/TOPC (Editorial Manager) use ScholarOne's Manuscript Central. [Source 2]
- For journals on ScholarOne, the submitting author must provide their own ORCID at submission; all authors of accepted papers must have valid ORCIDs before publication. [Source 1]
- "Per journal policy, papers that have been rejected by ACM Computing Surveys are not eligible for resubmission to the journal for 12 months following the rejection date." [Source 1]

## VERIFIED: review process

- Papers are assigned to an associate editor who selects referees and oversees refereeing; the AE then rejects or recommends acceptance to the Editor-in-Chief, who makes the final decision. [Source 1]
- Authors may identify non-preferred reviewers. [Source 1]
- AEs are anonymous to authors. [Source 4]
- Accepted refereed articles need three qualified reviews; fewer is acceptable only for clear rejects. Desk rejects and "assisted" desk rejects (optionally corroborated by one outside review) are permitted; authors may appeal. [Source 4]
- Decision options: Accept; Minor Revision (verified by the AE, not sent back to reviewers); Major Revision (revised manuscript re-reviewed, original reviewers auto-selected); Reject. [Source 4]

## VERIFIED: prior publication / conference-expansion policy

- ACM Prior Publication Policy as stated on the CSUR guidelines page: papers are normally original contributions not published elsewhere. "Publication, or republication, of a (perhaps revised) paper that has been widely disseminated is permitted only if the editor judges that (a) the revision contains significant amplification or clarification of the original material or (b) there is a significant additional benefit to be gained from journal publication. In either case, prior appearance should be noted on the title page of the paper." [Source 1]
- Simultaneous submission is a desk-reject ground. [Source 4]

## VERIFIED: arXiv / preprint rights

- "ACM authors may post all versions of their work, with the exception of the final published 'Version of Record', to non-commercial repositories such as ArXiv." [Source 1]

## UNVERIFIED (general knowledge or inference; confirm before relying)

- Cover letter / justification statement: the ScholarOne CSUR submission form is widely reported to ask why the survey is needed and how it differs from existing surveys of the topic, and to accept a cover letter. This could not be verified (form is behind login); nothing on the public author-guidelines page mandates a cover letter. Plan to prepare a short statement covering: why the area needs a survey now, what prior surveys exist, and what this survey adds beyond them.
- Comparison with prior surveys inside the paper: reviewers conventionally expect an explicit related-surveys subsection; not stated on any fetched page.
- Anonymization: nothing fetched requires author anonymization for CSUR; review appears single-anonymous (AEs anonymous to authors per Source 4, authors visible to reviewers). The acmart `anonymous` option exists but no fetched CSUR page requires it. Confirm in the ScholarOne instructions.
- Posting a preprint to arXiv before submission is generally not treated by ACM as prior publication that bars submission; the verified text above covers posting rights, not eligibility. Check the current ACM Prior Publication and Simultaneous Submissions policy page.
- Review timelines at CSUR commonly run many months (often 6-12+ for surveys); no timeline is stated on the fetched pages (the AE guidelines even leave the reviewer deadline as a "[no. here] weeks" placeholder).
- Published CSUR articles frequently exceed 35 pages in the final acmsmall layout; the 35-page cap is the stated submission-time rule and over-length submissions risk desk rejection, so treat 35 pages (Surveys style, including references) as the hard planning target and move overflow to the electronic supplement.
- Snapshots are from Feb-Dec 2025; ACM refreshed templates periodically (template v2.16 as of Aug 2025). Re-check the live pages once dl.acm.org access is available.

## Practical checklist for the VRL survey submission

1. Format with `\documentclass[manuscript,review]{acmart}`, approved packages only, libertine fonts, no margin tweaks.
2. Fit the main paper in 35 pages including references in Surveys style; mark supplement pages explicitly if using one.
3. Abstract at most 100 words, no citations or math in it.
4. Add 2012 CCS concepts, keywords, and ACM Reference Format block.
5. Funding + prior-presentation footnote on page 1; note any prior appearance (e.g., ARR/EMNLP versions) on the title page per the Prior Publication Policy.
6. Prepare a needs-and-novelty statement vs prior surveys (for the cover letter / submission form).
7. Register ORCID for the submitting author; collect co-author ORCIDs.
8. Submit at https://mc.manuscriptcentral.com/csur; optionally email the EiC first with the topic (charter invites pre-submission queries).
9. Remember the 12-month resubmission ban after a CSUR rejection; avoid simultaneous submission anywhere else.
