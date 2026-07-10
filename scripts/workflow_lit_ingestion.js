export const meta = {
  name: 'vrl-lit-ingestion',
  description: 'Phase C: verify + summarize expansion literature across 9 threads, write notes and bib fragments',
  phases: [{ title: 'Ingest', detail: '8 thread agents + survey shelf + CSUR guidelines' }],
}

const COMMON = `
CONTEXT: We are expanding "The Rise of Verbal Reinforcement Learning: A Survey" (8-page ACL ARR draft, 229 refs) into a 50-60 page ACM Computing Surveys manuscript. Repo: /Users/arunsharma/code/vrl-survey. Read these first:
- /Users/arunsharma/code/vrl-survey/notes/expansion_thread_map.md (your thread's seed papers)
- /Users/arunsharma/code/vrl-survey/notes/arr_reviews_2026_may.md (reviewer weaknesses the expansion must fix)

TOOLS: WebSearch's backend is BROKEN in this environment; do not rely on it. Use ToolSearch to load the Hugging Face MCP tools (query "paper search hf") and use paper_search / hf_doc_fetch, plus WebFetch on https://arxiv.org/abs/<id> pages (works). The existing bib is at /Users/arunsharma/code/vrl-survey/paper-acl/references.bib; Grep it to mark papers the survey already cites.

HONESTY RAIL (hard): a paper may be included ONLY if you verified its canonical title on its arxiv.org/abs page or HF papers page this session. Never invent venues, authors, or results. If a seed id cannot be verified, list it under EXCLUDED with the reason. Key results must come from the paper's own abstract; if the abstract gives no number, describe the claim without numbers.

OUTPUT FILES (Write them):
1. Notes: one markdown file, one subsection per paper: canonical title, arXiv id, year, [ALREADY-CITED] tag if in references.bib, 3-5 sentence method summary, signal type (critique / rubric / preference-with-rationale / reward-code / instruction / memory / debate ...), lifecycle stage (problem-definition / inference / training), pillar or new-section mapping (target section given below), and the key claim.
2. Bib fragment: a .bib file with one @article/@inproceedings entry per NEW paper (skip [ALREADY-CITED] ones), fields: title, author (from the abs page), year, eprint (arXiv id), archivePrefix={arXiv}. Bib keys: firstauthorYEARfirstword, lowercase.

Also DISCOVER 5-15 additional on-thread papers beyond the seeds (2024-2026, prioritize 2025-2026) via HF paper_search; same verification bar.

TARGET SECTIONS of the expanded paper: S2 formal framework; S3 taxonomy; S4 grounding; S5 deliberative; S6 learning signal; S7 verbal reward stack; S8 credit assignment; S9 language-space optimizers; S10 embodied; S11 evaluation/benchmarks; S12 safety; S13 practitioner guide + agenda.

Return JSON: {verified_count, discovered_count, excluded: [{id, reason}], notes_file, bib_file, keys: [{key, arxiv_id, title, section}]}.
`

const SCHEMA = {
  type: 'object',
  properties: {
    verified_count: { type: 'number' },
    discovered_count: { type: 'number' },
    excluded: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, reason: { type: 'string' } }, required: ['id', 'reason'] } },
    notes_file: { type: 'string' },
    bib_file: { type: 'string' },
    keys: { type: 'array', items: { type: 'object', properties: { key: { type: 'string' }, arxiv_id: { type: 'string' }, title: { type: 'string' }, section: { type: 'string' } }, required: ['key', 'arxiv_id', 'title', 'section'] } },
  },
  required: ['verified_count', 'discovered_count', 'excluded', 'notes_file', 'bib_file', 'keys'],
}

const THREADS = [
  { id: 'T1', slug: 'rl_theory_credit', desc: 'RL-theoretic treatment of language feedback + credit assignment (feeds S2 and S8)' },
  { id: 'T2', slug: 'verbal_reward_stack', desc: 'Rubric rewards, RLVR, generative reward models, process reward models (feeds S7)' },
  { id: 'T3', slug: 'language_space_optimizers', desc: 'Textual gradients, prompt evolution, verbalized ML, training-free RL, context engineering (feeds S9)' },
  { id: 'T4', slug: 'memory_experience', desc: 'Experience/memory-driven agents, skill libraries, reflective memory (feeds S5)' },
  { id: 'T5', slug: 'multiagent_feedback', desc: 'Multi-agent verbal feedback: debate, trained critics, self-play with language (feeds S5 and S6)' },
  { id: 'T6', slug: 'embodied_vlm', desc: 'Embodied/robotics language corrections, language-to-reward, VLM reward models (feeds S10)' },
  { id: 'T7', slug: 'benchmarks_eval', desc: 'Benchmarks and evaluation of feedback quality and utilization (feeds S11)' },
  { id: 'T8', slug: 'safety_adversarial', desc: 'Attacks on feedback channels: judge injection, poisoning, rubric hacking, sycophancy (feeds S12)' },
]

phase('Ingest')
const jobs = THREADS.map(t => () => agent(COMMON + `
YOUR THREAD: ${t.id} (${t.desc}). Process the ${t.id} seed list in expansion_thread_map.md.
Write notes to /Users/arunsharma/code/vrl-survey/notes/threads/${t.id}_${t.slug}.md and bib to /Users/arunsharma/code/vrl-survey/notes/threads/${t.id}_${t.slug}.bib.`,
  { label: `ingest:${t.id}`, phase: 'Ingest', schema: SCHEMA }))

jobs.push(() => agent(COMMON + `
YOUR THREAD: T9, the comparison-survey shelf (feeds S13's comparison table and the related-work positioning). For EACH survey in the T9 list: verify it, then extract from its abstract (and intro if fetchable): scope (what it covers), organizing axis (mechanism / agent / signal / other), feedback types covered (scalar / preference / verbal), lifecycle stages covered, whether it offers a formal framework, whether it offers practitioner guidance, whether it covers safety of feedback. These become rows of our comparison table; also state in one sentence per survey what OUR signal-centric survey adds beyond it.
Write notes to /Users/arunsharma/code/vrl-survey/notes/threads/T9_comparison_surveys.md and bib fragment (new entries only) to /Users/arunsharma/code/vrl-survey/notes/threads/T9_comparison_surveys.bib.`,
  { label: 'ingest:T9-surveys', phase: 'Ingest', schema: SCHEMA }))

jobs.push(() => agent(`
TASK: Obtain ACM Computing Surveys (CSUR) submission requirements. dl.acm.org returns 403 to WebFetch and web.archive.org is blocked for WebFetch; WebSearch's backend is broken. Try instead, in order: (1) WebFetch on https://www.acm.org pages about journal author guidelines (acm.org sometimes allows fetch where dl.acm.org does not); (2) WebFetch on https://dl.acm.org/journal/csur via different paths anyway (cheap to try); (3) the acmart documentation on CTAN (https://ctan.org/pkg/acmart and its PDF mirrors) for template/format specifics; (4) Overleaf's official ACM template pages; (5) university library or lab-website guides describing CSUR submission. Extract and report: required template/format for CSUR submissions (acmart manuscript/review option, single vs double column at submission), length norms for surveys, required accompanying materials (cover letter, statement of why the survey is needed / comparison with prior surveys), the submission system (ManuscriptCentral URL), review process expectations, and any policy on arXiv preprints and on expanding a previously reviewed conference submission. Distinguish clearly what you VERIFIED from a fetched page vs what is general knowledge (mark the latter 'unverified').
Write findings to /Users/arunsharma/code/vrl-survey/notes/csur_submission_requirements.md.
Return JSON: {verified_count: <number of facts verified from fetched pages>, discovered_count: 0, excluded: [], notes_file: '/Users/arunsharma/code/vrl-survey/notes/csur_submission_requirements.md', bib_file: '', keys: []}.`,
  { label: 'csur-guidelines', phase: 'Ingest', schema: SCHEMA }))

const results = await parallel(jobs)
const ok = results.filter(Boolean)
log(`${ok.length}/${jobs.length} ingestion agents returned`)
return {
  summary: ok.map(r => ({ notes: r.notes_file, verified: r.verified_count, discovered: r.discovered_count, excluded: r.excluded.length })),
  all_keys: ok.flatMap(r => r.keys || []),
  excluded: ok.flatMap(r => r.excluded || []),
}
