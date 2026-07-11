export const meta = {
  name: 'vrl-csur-section-writing',
  description: 'Phase D: write the 14 CSUR sections from thread notes + revision base, with per-section critic and revision passes',
  phases: [
    { title: 'Write', detail: '14 section writers in parallel' },
    { title: 'Critique', detail: 'per-section critic as each draft lands' },
    { title: 'Revise', detail: 'writer applies critic findings' },
  ],
}

const ROOT = '/Users/arunsharma/code/vrl-survey'

const RAILS = `
STYLE RAILS (hard requirements, checked by a critic):
- Academic survey register for ACM Computing Surveys: assumes general ML knowledge, emphasizes classification of literature, perspective, and trends. Write flowing scholarly prose, not bullet lists (lists only where the brief asks for a decision rule, table, or enumeration).
- NEVER use an em dash (the character "\\u2014" or ---). Use a comma, colon, semicolon, parentheses, or a new sentence. En dashes (--) ONLY for numeric ranges (pages, years).
- Terminology: "grounding signal" (never "grounded signal"); "verbal reinforcement learning (VRL)" per the definitional fence; "process reward models (PRMs)" at first use.
- Banned filler vocabulary: delve, tapestry, realm, landscape, seamless, leverage (verb), unlock, elevate, game-changer, "it is worth noting", "in today's world".
- CITATIONS: natbib \\citep/\\citet. You may ONLY cite keys that appear in ${ROOT}/paper-csur/citation_keys.txt. Before using any key, verify it with Grep against that file. If a paper you need is not in the manifest, do NOT invent a key: add it to the missing_refs list in your return JSON and cite nothing.
- HONESTY: every quantitative claim must come verbatim-compatibly from the thread notes' "Key claim" fields or from the original paper text. If a note gives no number, describe the finding without numbers. Never attribute a result to a paper the notes do not support.
- Do not create figure files. If the brief calls for a figure that does not exist yet, insert \\todonote{FIGURE: <one-line spec>} where it belongs (Phase E builds it).
- Tables: booktabs style, fit \\textwidth in the manuscript format, \\small or \\footnotesize allowed.
- Keep the existing \\section{...} title and \\label from the stub file unless the brief says otherwise. Subsections get \\label{subsec:...} labels.
- Cross-references to other sections by \\S\\ref{sec:...} using these labels: intro sec:intro, framework sec:framework, taxonomy sec:taxonomy, grounding sec:grounding, deliberative sec:deliberative, learning sec:learning, reward stack sec:rewardstack, credit sec:credit, optimizers sec:optimizers, embodied sec:embodied, evaluation sec:evaluation, safety sec:safety, practitioner sec:practitioner, conclusion sec:conclusion. Make sure YOUR section file defines its own label from this list.
`

const COMMON = `
CONTEXT: We are expanding "The Rise of Verbal Reinforcement Learning: A Survey" (8-page ACL ARR submission, avg review 2.25 with convergent fixable criticisms) into an ACM Computing Surveys manuscript. The four ARR reviews and their weakness index live at ${ROOT}/notes/arr_reviews_2026_may.md; the expansion must visibly fix them. The revised short version (the best current text, with the definitional fence, genealogy, decision rules, and new tables already written) lives in ${ROOT}/revision/new_section/*.tex; when reading those files, treat \\added{X} as plain text X and \\removed{X} as deleted.

Target length note: the assembled paper must fit CSUR's 35-page Surveys-style limit including references, so respect your word budget; depth comes from synthesis and positioning, not exhaustive enumeration. Every paper mentioned gets at most 1-3 sentences unless the brief marks it load-bearing.
${RAILS}`

const SCHEMA = {
  type: 'object',
  properties: {
    file: { type: 'string' },
    words: { type: 'number' },
    cited_keys: { type: 'array', items: { type: 'string' } },
    missing_refs: { type: 'array', items: { type: 'string' } },
    notes: { type: 'string' },
  },
  required: ['file', 'words', 'cited_keys', 'missing_refs'],
}

const CRITIC_SCHEMA = {
  type: 'object',
  properties: {
    verdict: { type: 'string', enum: ['pass', 'revise'] },
    findings: { type: 'array', items: { type: 'object', properties: {
      severity: { type: 'string', enum: ['blocker', 'should-fix', 'nit'] },
      what: { type: 'string' },
      where: { type: 'string' },
    }, required: ['severity', 'what'] } },
  },
  required: ['verdict', 'findings'],
}

const SECTIONS = [
  { id: 's01', file: 's01_introduction.tex', budget: 1400, label: 'sec:intro',
    sources: ['revision/new_section/introduction.tex', 'revision/new_section/abstract.tex', 'notes/threads/T9_comparison_surveys.md'],
    extra: 'Rewrite the introduction for the long survey: motivation, the term genealogy (Shinn et al. coined VRL for self-reflection; we generalize), the definitional fence in brief (full version lives in S2), why now (field crowding, no signal-centric survey), explicit contribution list (4 items: signal-centric formalism, decision rules + practitioner guidance, credit-assignment synthesis, comparison with 15 surveys), and a roadmap paragraph. You may read all 14 section briefs (paper-csur/sections/*.tex stubs are already replaced for some sections; their \\section headers and briefs tell you the shape) to write the roadmap. Do NOT duplicate S2 formal content.' },
  { id: 's02', file: 's02_formal_framework.tex', budget: 1700, label: 'sec:framework',
    sources: ['notes/threads/T1_rl_theory_credit.md', 'revision/new_section/taxonomy.tex', 'revision/new_section/introduction.tex'],
    extra: 'Follow the 5-point brief in the stub exactly: language-augmented POMDP; where language enters (state, action prior, reward at specification vs runtime, transition prior, improvement operator); the two-criteria definitional fence with RLHF/DPO exclusion and the specification-time clause; genealogy incl. NLRL (feng2024natural), FCP (2509.22638), Memento M-MDP (2508.16153), formal guarantees that exist (xu2025formalizing, he2024words) and honest statement of what is missing. This is the section reviewers demanded most; make the formalism precise but readable. Define notation used later (ell for linguistic artifact, the improvement operator I).' },
  { id: 's03', file: 's03_taxonomy.tex', budget: 1400, label: 'sec:taxonomy',
    sources: ['revision/new_section/taxonomy.tex', 'paper-acl/sections/problemFormulation_taxonomy.tex'],
    extra: 'Upgrade the existing three-pillar taxonomy: keep the pillars (grounding / deliberative / learning signal), port the explicit cross-pillar assignment rule and the hybrid-cases table from the revision text, drop any lifecycle-loop implication, reframe the coding-agent example as the revision does. Add forward pointers to S7-S12 as the "deep dives". The taxonomy figure exists (paper_images/); reference it with \\todonote{FIGURE: port taxonomy figure} placeholder.' },
  { id: 's04', file: 's04_pillar_grounding.tex', budget: 1600, label: 'sec:grounding',
    sources: ['revision/new_section/pillar_1.tex', 'notes/threads/T6_embodied_vlm.md', 'notes/threads/T2_verbal_reward_stack.md'],
    extra: 'Deepen Pillar 1 (language as grounding signal): expand the original text with the language-to-reward line of work (from T2/T6 notes where they map to S4), keep the strongest original examples, add 2024-2026 work. The embodied deep dive lives in S10; here cover the mechanism, not robotics specifics.' },
  { id: 's05', file: 's05_pillar_deliberative.tex', budget: 1600, label: 'sec:deliberative',
    sources: ['revision/new_section/pillar_2.tex', 'notes/threads/T4_memory_experience.md', 'notes/threads/T5_multiagent_feedback.md'],
    extra: 'Deepen Pillar 2 (language in deliberation): memory/experience agents (T4) and multi-agent verbal feedback (T5) are the two big expansions. Position the memory cell against the dedicated memory surveys (already in bib), keep the "evaluator feedback in search" reframing from the revision. 2-4 subsections.' },
  { id: 's06', file: 's06_pillar_learning.tex', budget: 1600, label: 'sec:learning',
    sources: ['revision/new_section/pillar_3.tex', 'notes/threads/T5_multiagent_feedback.md', 'notes/threads/T1_rl_theory_credit.md'],
    extra: 'Deepen Pillar 3 (language as learning signal): keep the compression-spectrum organizing principle and the RLHF/DPO boundary + online/offline distinction from the revision. Fold in FCP-style feedback-conditioning, RLVF, critique-based fine-tuning families. The reward-model stack itself lives in S7; credit assignment in S8; do not duplicate, point forward.' },
  { id: 's07', file: 's07_verbal_reward_stack.tex', budget: 1700, label: 'sec:rewardstack',
    sources: ['notes/threads/T2_verbal_reward_stack.md'],
    extra: 'New section: the verbal reward stack as a progression: verifiers -> rubrics (gunjal2025rubrics, huang2025reinforcement etc.) -> generative RMs with critiques (zhang2024generative, chen2025rmr1, guo2025reward) -> PRMs (zheng2024processbench family). Name the scalarization boundary explicitly (where language collapses to scalar and what is lost). End with the reward-hacking bridge to S12.' },
  { id: 's08', file: 's08_credit_assignment.tex', budget: 1700, label: 'sec:credit',
    sources: ['notes/threads/T1_rl_theory_credit.md', 'revision/new_section/Discussion.tex'],
    extra: 'New section, the #1 reviewer demand: credit assignment and optimization with verbal signals. Organize: outcome vs process vs reflective credit; token/step-level redistribution (CAPO, RED, T-REG, MA-RLHF, latent reward); multi-turn/hierarchical (ArCHer, turn-level); LLM-as-credit-annotator (CALM); interaction with the RL algorithm families (port the Sec 6.1 "algorithmic interactions" content from the revision Discussion). Be honest about absent theory (only xu2025formalizing offers guarantees).' },
  { id: 's09', file: 's09_language_space_optimizers.tex', budget: 1400, label: 'sec:optimizers',
    sources: ['notes/threads/T3_language_space_optimizers.md'],
    extra: 'New section: optimization in language space. TextGrad, GEPA, DSPy, OPRO, APE, EvoPrompt, verbalized ML, training-free GRPO. Include the analogy table (critique=gradient, memory=parameters, edit=update rule) as a real LaTeX table. State when language-space optimization wins vs parameter updates (cost, no gradient access, interpretability) and its failure modes.' },
  { id: 's10', file: 's10_embodied.tex', budget: 1300, label: 'sec:embodied',
    sources: ['notes/threads/T6_embodied_vlm.md'],
    extra: 'New section fixing reviewer weakness (h): embodied and multimodal VRL. Robot corrections (language feedback on trajectories), language-to-reward for control, VLM reward models and critics. Make the modality-scope statement: "verbal" = linguistic structure, carrier can be text/speech/multimodal.' },
  { id: 's11', file: 's11_evaluation.tex', budget: 1400, label: 'sec:evaluation',
    sources: ['notes/threads/T7_benchmarks_eval.md', 'revision/new_section/Discussion.tex'],
    extra: 'New section: evaluation and benchmarks. Synthesis table over the benchmark families (RewardBench family, CriticBench/RealCritic, ProcessBench, MINT, Feedback Friction, LLF-Bench, LMRL Gym) with columns: what is measured (feedback quality vs utilization), signal type, lifecycle stage. Keep the quality-vs-utilization distinction from the revision. End with measurement gaps (feeds agenda).' },
  { id: 's12', file: 's12_safety.tex', budget: 1100, label: 'sec:safety',
    sources: ['notes/threads/T8_safety_adversarial.md'],
    extra: 'New section, scholarly synthesis of the published safety literature on feedback channels: LLM-as-judge robustness, rubric/critique reward hacking, sycophancy, feedback poisoning in optimization loops, and the published defenses/mitigations. Academic register: characterize failure modes and cite; no operational attack detail. This is a survey differentiator; every claim cited.' },
  { id: 's13', file: 's13_practitioner_guide_agenda.tex', budget: 1700, label: 'sec:practitioner',
    sources: ['notes/threads/T9_comparison_surveys.md', 'revision/new_section/appendix_revision.tex', 'revision/new_section/Discussion.tex'],
    extra: 'New section fixing weaknesses (e), (f), (g). Three parts: (1) practitioner decision guidance: port and extend the practitioner table from the revision appendix (language as reward vs state vs action vs deliberation keyed to verifiability, latency, cost, reward-hacking risk) + a short decision-tree description (\\todonote{FIGURE: decision tree}); (2) comparison with prior surveys: port the 12-survey table from the revision appendix and extend toward ~15 using T9 notes (columns: scope, organizing axis, feedback types, lifecycle stages, formal framework?, practitioner guidance?, safety?); one sentence per row on what we add; (3) research agenda: 10 numbered items grounded in the gaps named in S2-S12.' },
  { id: 's14', file: 's14_conclusion.tex', budget: 600, label: 'sec:conclusion',
    sources: ['revision/new_section/conclusion.tex', 'revision/new_section/limitations.tex'],
    extra: 'Conclusion + a Limitations paragraph (port the expanded limitations from the revision: reviewer-named failure modes, who-is-harmed societal impact, honest statement of what the survey does not cover).' },
]

phase('Write')

const results = await pipeline(
  SECTIONS,
  s => agent(`${COMMON}
YOUR SECTION: ${s.file} (label ${s.label}, word budget ~${s.budget} words of body text, +-20%).
The stub with your writing brief: ${ROOT}/paper-csur/sections/${s.file} (READ IT FIRST; the brief comments are your requirements; delete them in your draft).
Your source material (read all):
${s.sources.map(x => '- ' + ROOT + '/' + x).join('\n')}
- ${ROOT}/notes/arr_reviews_2026_may.md (fix what applies to your section)
- ${ROOT}/paper-csur/citation_keys.txt (the ONLY legal citation keys)

TASK: ${s.extra}

Write the complete LaTeX section, replacing the stub at ${ROOT}/paper-csur/sections/${s.file} (keep a \\section{...} heading and the label ${s.label}). Then count body words (excluding LaTeX markup) and list every \\cite key you used.
Return JSON: {file, words, cited_keys, missing_refs, notes}.`,
    { label: `write:${s.id}`, phase: 'Write', schema: SCHEMA }),

  (draft, s) => agent(`You are a skeptical section critic for an ACM Computing Surveys manuscript.
SECTION FILE: ${ROOT}/paper-csur/sections/${s.file} (read it).
THE BRIEF it must satisfy: the writing-brief comments in the git version of the stub; recover them with: cd ${ROOT} && git show HEAD:paper-csur/sections/${s.file}
Also read ${ROOT}/notes/arr_reviews_2026_may.md and check the section against the reviewer weaknesses it claims to fix.
${RAILS}

CHECK, in order:
1. Brief coverage: every numbered point of the brief present.
2. Citation validity (deterministic): extract every \\cite/\\citep/\\citet key from the file, then verify EACH exists in ${ROOT}/paper-csur/citation_keys.txt (grep -x). Any unknown key is a BLOCKER.
3. Honesty: spot-check 5 quantitative claims against the thread notes in ${ROOT}/notes/threads/ (the writer's sources were: ${s.sources.join(', ')}). A number not present in notes/original text is a BLOCKER.
4. Banned punctuation/vocab: em dashes (U+2014 or ---), the banned filler words, "grounded signal". Occurrences are should-fix.
5. Length: body word count vs budget ${s.budget} (+-25%). Outside range is should-fix.
6. LaTeX sanity: balanced environments, no undefined-looking commands beyond \\todonote, tables have booktabs rules.
7. Duplication: does it restate content that belongs to a neighboring section per its brief (check the section files that exist so far in ${ROOT}/paper-csur/sections/)? Should-fix with the sentence range.
Return JSON: {verdict, findings:[{severity, what, where}]}. verdict="pass" only with zero blockers AND zero should-fixes.`,
    { label: `critic:${s.id}`, phase: 'Critique', schema: CRITIC_SCHEMA })
    .then(review => ({ draft, review })),

  (r, s) => {
    if (!r || !r.review) return r && r.draft
    if (r.review.verdict === 'pass') return r.draft
    return agent(`${COMMON}
You are revising ${ROOT}/paper-csur/sections/${s.file} (word budget ~${s.budget}). A critic reviewed it. Apply EVERY finding below (blockers are mandatory; should-fixes mandatory unless factually impossible, then explain in notes; nits at your judgment). Edit the file in place.
FINDINGS:
${JSON.stringify(r.review.findings, null, 1)}
Sources if you need them:
${s.sources.map(x => '- ' + ROOT + '/' + x).join('\n')}
Legal citation keys: ${ROOT}/paper-csur/citation_keys.txt (grep before citing).
Return JSON: {file, words, cited_keys, missing_refs, notes}.`,
      { label: `revise:${s.id}`, phase: 'Revise', schema: SCHEMA })
  }
)

const ok = results.filter(Boolean)
log(`${ok.length}/${SECTIONS.length} sections completed the write-critique-revise pipeline`)
return {
  sections: ok,
  missing_refs: [...new Set(ok.flatMap(r => r.missing_refs || []))],
  total_words: ok.reduce((a, r) => a + (r.words || 0), 0),
}
