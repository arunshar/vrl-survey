# ACL ARR 2026 May reviews, Submission 12040 (transcribed from OpenReview, 2026-07-09)

Paper: The Rise of Verbal Reinforcement Learning: A Survey
Authors: Kshitij Tayal, Arun Sharma, Genta Indra Winata, Anirban Das, Sambit Sahu
Preferred venue: EMNLP 2026. Submission May 25, 2026. Reviews released Jul 2-8, 2026.

## Reviewer pqAY (Jul 7; OA 3.0, Soundness 3, Excitement 3, Confidence 3)

Summary: surveys VRL, a broad paradigm where agents use natural-language feedback to define tasks, refine inference-time behavior, or improve future decisions through training. Main contribution is the three-pillar taxonomy (grounding signal / deliberative feedback / learning signal). Shows how roles interact in practical agents; highlights feedback quality, tool design, adversarial feedback, limited theoretical guarantees.

Strengths: timely topic for ACL; unified framework for directions usually discussed separately (LLM agents, RLHF, self-correction, tool feedback, process supervision, agent memory); temporal framing intuitive; broad coverage (robotics grounding, coding agents, self-critique, tool feedback, debate, memory, search reasoning, RLHF, DPO, process supervision); goes beyond listing prior work, identifies cross-cutting challenges (feedback quality, tool-interface design, adversarial verbal feedback, lack of theoretical guarantees).

Weaknesses:
1. Scope of VRL could be more clearly delineated. Broad definition makes boundary with adjacent paradigms unclear: includes RLHF/DPO, self-refinement, language-conditioned control, reward-code generation, feedback-conditioned modeling under one umbrella though they differ in interaction, explicit rewards, policy optimization. Wants concrete discussion of what does NOT count as VRL and how VRL differs from RLHF, instruction following, language-conditioned RL, general LLM-agent feedback loops.
2. Taxonomy needs clearer rules for methods spanning pillars. Examples: Section 3.4 places reward-code generation under grounding because language defines the reward function, but the generated reward often trains/optimizes an agent (close to learning signal). Section 4.4 treats experiential memory as inference-time deliberative feedback, but memory persists across episodes and influences future behavior beyond a single episode (boundary with long-term adaptation unclear). Wants explicit decision rules for hybrid cases or systematic acknowledgment of overlaps.

Comments/typos: terminology consistency; paper uses both "grounded signal" and "grounding signal"; pick one.

Limitations note: societal impact could be more explicit: who is harmed when feedback is incorrect, biased, adversarial, or poorly grounded; impacts on high-stakes applications (coding assistants, robotics, clinical decision support, education).

Other fields: Reproducibility 3; Datasets 1; Software 1; no ethics concerns.

## Reviewer Q27s (Jul 7; OA 2.5, Soundness 3, Excitement 4, Confidence 4)

Summary: surveys VRL, defined broadly as methods where natural-language feedback shapes agent behavior; three-part taxonomy (goal signal, deliberative feedback, learning signal); representative methods per category; challenges.

Strengths: timely and useful topic; collects strands across self-critique, memory, search, preference optimization, reward generation; likes the motivation, especially understanding different roles of verbal feedback in agent development.

Weaknesses:
1. Definition of VRL too broad: many standard training paradigms fit (SFT, RLHF, DPO, preference optimization); hard to distinguish from general LLM training/alignment.
2. Term VRL already known in a narrower sense: introduced for self-reflective agents; paper adopts it much more broadly; may confuse readers unless better justified and distinguished.
3. Taxonomy feels forced: the three-pillar loop of grounding, feedback, learning is intuitive as a conceptual picture, but no real method operates in this clean lifecycle; presenting such a loop can misrepresent how verbal feedback actually works.
4. Survey should be more scoped: definition includes grounding, test-time scaling, and parameter updates, so the paper effectively covers most of modern LLM agent training and alignment; breadth causes omissions and makes the taxonomy less useful; narrower focus (e.g., verbal feedback without model training) would tighten the contribution.
5. MDP framing is limiting: frames grounding through MDP components (states, actions, rewards); works for some agentic/RL settings but not all language-agent or feedback-based methods fit an MDP formulation, especially given the need for transition and reward functions.
6. Search-guided deliberation does not clearly correspond to a feedback category the way self-critique does; seems more a decoding/search procedure than a distinct verbal-feedback mechanism.
7. Would benefit from more synthesis or benchmarking: mostly describes methods; a benchmark, comparison framework, or concrete analysis of when different verbal-feedback methods work would make it more valuable.

Comments: reconsider whether "VRL" should be used this broadly; narrow the scope or clearly state what is excluded.

Other fields: Reproducibility 3; Datasets 1; Software 1; no ethics concerns.

## Reviewer 3gqM (Jul 2; OA 2.0, Soundness 2.5, Excitement 2.5, Confidence 4)

Summary: surveys how natural-language signals are used in RL: language for user intent, preferences, structured information; organizes prior work by where signals enter the RL process (task grounding, agent-side reasoning, reward construction). Contribution is literature synthesis, not a new algorithm, benchmark, or empirical study.

Strengths: relevant area; brings together strands often discussed separately; the specification/reasoning/reward-learning distinction is a useful organizing principle; may help readers see where language inserts into an RL pipeline.

Weaknesses:
1. Needs clearer comparison with prior surveys or related overview papers.
2. Taxonomy remains mostly high-level and descriptive.
3. Limited guidance on how practitioners should select among language-feedback mechanisms.
4. Treatment of RL-specific issues is relatively shallow, especially algorithm choice, credit assignment, MDP assumptions.

Comments: had difficulty identifying the specific added value; a survey's organization should make the area actionable, explain what insight is gained. Should provide practical guidance: when to use language as reward signal, as state information, for action-level guidance or reasoning. RL side needs more depth: language-based reward design, language-based state abstraction, language-guided policy generation may require different assumptions and work with different RL families. Discuss consequences of language within the MDP formulation: reward via language and the learning objective; state via language and information preservation for optimal control; actions generated/constrained by LLMs and effects on exploration and policy learning. Scope should be more precise: "verbal" may suggest spoken/visual/multimodal feedback; either narrow framing to language-centered feedback or expand discussion to other modalities.

Overall: 2 = resubmit next cycle. Limitations: should more directly discuss limitations of language-based feedback in RL (reward specification failures, unreliable language interpretation, weak grounding, transfer of language-guided policies to real-world settings). Reproducibility 3; Datasets 1; Software 1; no AI tools used.

## Reviewer bnae (Jul 2; OA 1.5, Soundness 1.5, Excitement 2, Confidence 4)

Summary: surveys language-based feedback in RL; organizes prior work around roles language plays in the RL loop (environment grounding, agent reasoning, reward/learning signal design); aims to synthesize how language expresses intent, preferences, structure in RL systems.

Strengths: timely and relevant; grounding/deliberation/learning categorization is a useful starting point; brings together directions often discussed separately.

Weaknesses:
1. Contribution beyond existing literature not sufficiently clear; reads primarily as synthesis; does not establish what new conceptual framework, technical insight, or research agenda it contributes.
2. Lacks a clear call to action; not obvious how the categorization helps researchers or practitioners define better problems, design better RL systems, or identify concrete future directions.
3. Would benefit from deeper discussion of how different RL algorithms interact with language-based feedback; should clarify which algorithmic settings suit different types of language feedback.
4. Terminology appears too broad: "verbal" may suggest wider multimodal scope (audio, video) while the paper is mainly language-based feedback.

Comments: would be substantially stronger if it explained how it differs from existing surveys and related literature; main value currently is literature organization; unclear whether the taxonomy leads to new research questions, design principles, or new understanding of language-based RL systems. Encourages a more rigorous framework for analyzing language in RL: when language replaces or augments reward signals, discuss effects on the underlying MDP formulation, policy optimality, temporal credit assignment; when language is state information, examine whether representations preserve assumptions needed for RL. Should include a stronger algorithmic perspective: different RL algorithms may benefit from language feedback in different ways; which methods are appropriate under which conditions.

Overall: 1.5 = resubmit after next cycle (substantial revisions that cannot be completed by the next ARR cycle). Limitations: should more directly discuss limitations of language-based feedback in RL, theoretical and practical: reward-specification failures, unreliable language interpretation, weak grounding, transfer challenges of language-guided policies to real-world settings. Soundness 1.5; Reproducibility 3; Datasets 1; Software 1; no AI tools used.

## Cross-review weakness index (rubric for revision and Phase F panel)

(a) VRL definition too broad / boundary unclear: pqAY-1, Q27s-1, Q27s-4
(b) Term collision with Reflexion's narrower coinage: Q27s-2
(c) No decision rules for cross-pillar/hybrid methods: pqAY-2, Q27s-3
(d) Shallow RL-theoretic treatment (MDP consequences, credit assignment, algorithm families, optimality): 3gqM-4, bnae-3, Q27s-5 (as a caveat demand)
(e) No practitioner guidance: 3gqM-3, bnae-2
(f) No comparison with prior surveys / unclear added value: 3gqM-1, bnae-1
(g) No synthesis/benchmark/research agenda: Q27s-7, bnae-2
(h) "Verbal" promises more than text-only: 3gqM (comments), bnae-4
(i) Search-guided deliberation cell questioned: Q27s-6
(j) Terminology consistency ("grounding signal"): pqAY (comments)
(k) Societal impact / limitations of language feedback: pqAY, 3gqM, bnae (limitations sections)
