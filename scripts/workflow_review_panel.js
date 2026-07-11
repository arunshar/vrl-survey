export const meta = {
  name: 'vrl-csur-review-panel',
  description: 'Phase F: adversarial review panel over the assembled CSUR draft; loop until no new blockers',
  phases: [
    { title: 'Panel', detail: '4 ARR-replay + 2 CSUR reviewers + citation auditor + style auditor' },
    { title: 'Fix', detail: 'apply confirmed findings per section' },
  ],
}

const ROOT = '/Users/arunsharma/code/vrl-survey'
const DRAFT = `${ROOT}/paper-csur`

const FINDINGS_SCHEMA = {
  type: 'object',
  properties: {
    findings: { type: 'array', items: { type: 'object', properties: {
      severity: { type: 'string', enum: ['blocker', 'should-fix', 'nit'] },
      section_file: { type: 'string' },
      what: { type: 'string' },
      evidence: { type: 'string' },
    }, required: ['severity', 'what'] } },
    summary: { type: 'string' },
  },
  required: ['findings', 'summary'],
}

const FIX_SCHEMA = {
  type: 'object',
  properties: {
    fixed: { type: 'number' },
    skipped: { type: 'array', items: { type: 'object', properties: {
      what: { type: 'string' }, why: { type: 'string' } }, required: ['what', 'why'] } },
  },
  required: ['fixed', 'skipped'],
}

const COMMON = `The manuscript under review: ${DRAFT}/main.pdf (compiled) with LaTeX sources in ${DRAFT}/sections/*.tex, bibliography ${DRAFT}/references.bib, legal citation keys ${DRAFT}/citation_keys.txt. Read the PDF via pdftotext or read the section sources directly. Original ARR reviews + weakness index: ${ROOT}/notes/arr_reviews_2026_may.md. Ingestion notes (ground truth for claims): ${ROOT}/notes/threads/*.md.
Report ONLY genuine findings with evidence (quote the offending passage or state what is absent where the brief demanded it). No praise, no filler findings.`

const PANEL = [
  { id: 'arr-pqAY', prompt: `You are ARR reviewer pqAY re-reviewing the EXPANDED version of the paper you reviewed. Your original complaints: VRL definition too broad and unfalsifiable; inconsistent terminology (grounding signal); Limitations section thin (poorly grounded feedback, robotics transfer). Re-review the expanded manuscript strictly against YOUR points: is the definitional fence now precise and testable (S2)? Terminology consistent everywhere? Limitations honest and specific? Find every place your concerns are still unaddressed.` },
  { id: 'arr-Q27s', prompt: `You are ARR reviewer Q27s re-reviewing the EXPANDED version. Your original complaints: term collision with Reflexion's narrower coinage (genealogy needed); taxonomy lacks assignment rules for cross-pillar methods; lifecycle-loop framing overclaimed; MDP framing needs POMDP/non-Markovian caveats; search cell mislabeled; evaluation synthesis missing. Check each against the expansion (S2 genealogy, S3 decision rules, S2 formal caveats, S5 search reframing, S11).` },
  { id: 'arr-3gqM', prompt: `You are ARR reviewer 3gqM re-reviewing the EXPANDED version. Your original complaints: no comparison with the many existing adjacent surveys; no practitioner guidance; shallow RL-algorithm treatment (which algorithm families, how language interacts with them, credit assignment). Check: S13 comparison table (is every named survey really positioned, honestly?), S13 practitioner guidance (actionable, keyed to real constraints?), S8 credit assignment depth (does it synthesize or just enumerate?).` },
  { id: 'arr-bnae', prompt: `You are ARR reviewer bnae re-reviewing the EXPANDED version. Your original complaints: differentiation from prior surveys unclear; no synthesis/benchmark discussion/research agenda; RL-theory treatment thin; embodied/multimodal language feedback missing ("verbal" promises more than text). Check: the four claimed contributions are real and delivered; S11 benchmark synthesis; S13 agenda items are specific and grounded; S10 embodied coverage is first-class, not token.` },
  { id: 'csur-comprehensiveness', prompt: `You are a fresh CSUR reviewer (survey methodology). CSUR requires: integrates existing literature, develops a framework/perspective, emphasizes classification and trends, answers "what is known and what does it mean". Assess: coverage balance across subareas (any thread over/under-represented vs the notes?), whether the taxonomy earns its keep (do S7-S12 actually use the S2/S3 vocabulary?), internal consistency of the signal-centric claim, and whether sections read as synthesis or annotated bibliography. Also check the abstract (<=100 words, no citations/math, doesn't start with "This paper").` },
  { id: 'csur-tutorial-rigor', prompt: `You are a fresh CSUR reviewer (technical rigor). Check the formal framework S2: is the language-augmented POMDP well-defined, are the two fence criteria applied consistently in later sections, are formal-guarantee claims honest? Check every table for self-consistency (row claims vs what the cited papers do per the ingestion notes). Check cross-references resolve (\\ref labels exist) and that no section contradicts another (e.g., on where RLHF sits).` },
  { id: 'citation-auditor', prompt: `You are a citation-integrity auditor. Deterministic checks: (1) extract every \\cite key from ${DRAFT}/sections/*.tex, verify each appears in ${DRAFT}/citation_keys.txt (grep -x); (2) run cd ${ROOT} && python3 scripts/verify_bib.py paper-csur/references.bib and report any non-OK/non-WHITELISTED rows; (3) sample 15 claim-citation pairs across sections and check each claim against the paper's entry in the ingestion notes (${ROOT}/notes/threads/) - a claim not supported by the note's key-claim/method fields is a BLOCKER; (4) flag any bib entry cited in text whose year/venue in prose contradicts the bib.` },
  { id: 'style-auditor', prompt: `You are a style auditor. Deterministic checks over ${DRAFT}/sections/*.tex and main.tex: (1) em dashes: grep for the U+2014 character and "---"; every hit is a should-fix (en dashes -- allowed ONLY for numeric ranges); (2) banned vocabulary hits: delve, tapestry, realm, landscape, seamless, leverage as a verb, unlock, elevate, game-changer, "it is worth noting", "in today's world"; (3) "grounded signal" must not appear (must be "grounding signal"); (4) LaTeX hygiene: \\todonote occurrences (list them all; each is a should-fix to resolve or consciously keep), double spaces before \\cite, tables without booktabs; (5) heading-case consistency across sections; (6) first-use expansion of acronyms (PRM, RLVR, RLHF, DPO, MDP, POMDP).` },
]

phase('Panel')
const reviews = await parallel(PANEL.map(p => () =>
  agent(`${COMMON}\n\nYOUR ROLE: ${p.prompt}\n\nReturn JSON: {findings:[{severity, section_file, what, evidence}], summary}.`,
    { label: p.id, phase: 'Panel', schema: FINDINGS_SCHEMA })))

const all = reviews.filter(Boolean).flatMap((r, i) =>
  r.findings.map(f => ({ ...f, reviewer: PANEL[i].id })))
const blockers = all.filter(f => f.severity === 'blocker')
const shouldfix = all.filter(f => f.severity === 'should-fix')
log(`panel: ${blockers.length} blockers, ${shouldfix.length} should-fixes, ${all.length - blockers.length - shouldfix.length} nits`)

phase('Fix')
// group actionable findings by section file so fixers don't collide
const bySection = {}
for (const f of [...blockers, ...shouldfix]) {
  const k = f.section_file || 'GLOBAL'
  ;(bySection[k] = bySection[k] || []).push(f)
}
const fixResults = await parallel(Object.entries(bySection).map(([file, findings]) => () =>
  agent(`You are fixing review findings in the CSUR manuscript at ${DRAFT}.
TARGET: ${file === 'GLOBAL' ? 'findings that span files; locate and fix each' : file}.
Ground truth for claims: ${ROOT}/notes/threads/*.md. Legal citation keys: ${DRAFT}/citation_keys.txt (grep -x before citing; never invent keys).
Style rails: no em dashes ever (en dash -- only for numeric ranges); "grounding signal"; no banned filler vocabulary; booktabs tables; honest claims only.
FINDINGS TO FIX (apply every blocker; should-fixes unless factually impossible, then record in skipped with why):
${JSON.stringify(findings, null, 1)}
Edit the files in place. Return JSON: {fixed, skipped:[{what, why}]}.`,
    { label: `fix:${file.replace(/.*\//, '')}`, phase: 'Fix', schema: FIX_SCHEMA })))

const fixed = fixResults.filter(Boolean).reduce((a, r) => a + r.fixed, 0)
const skipped = fixResults.filter(Boolean).flatMap(r => r.skipped)
return {
  round_findings: all.length,
  blockers: blockers.length,
  should_fixes: shouldfix.length,
  fixed,
  skipped,
  nits: all.filter(f => f.severity === 'nit'),
}
