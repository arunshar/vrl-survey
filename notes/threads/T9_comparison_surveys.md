# T9. Comparison-survey shelf (feeds S13 comparison table + related-work positioning)

Verification session: 2026-07-11. Every entry below was verified against its arxiv.org/abs page this session (canonical title, authors, date, abstract). Comparison-table fields are extracted from each paper's own abstract; where the abstract is silent on a field, the cell says "not claimed in abstract" rather than a guess. Venue notes come from the arXiv comments field where present.

Legend for the table: Y = yes, P = partial, N = not claimed in abstract. Feedback types: Sc = scalar reward/score, Pr = preference, Vb = verbal/natural-language. Stages: PD = problem definition/grounding, Inf = inference-time, Tr = training-time.

## Master comparison table (draft rows for S13)

| # | Survey (key) | arXiv | Organizing axis | Sc | Pr | Vb | Stages | Formal fw | Practitioner | Feedback safety |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Agentic RL Landscape (zhang2025landscape) | 2509.02547 | agent capability x task domain | Y | P | N | Tr | Y (MDP vs POMDP) | P (env/benchmark compendium) | N |
| 2 | Automatically Correcting LLMs (pan2023automatically) | 2308.03188 | correction timing (training/generation/post-hoc) | P | N | Y | Inf+Tr | N | P | N |
| 3 | Self-correction critical survey (kamoi2024can) [ALREADY-CITED] | 2406.01297 | research question x feedback source | N | N | Y | Inf+Tr | N (checklist) | Y (experiment checklist) | N |
| 4 | Bridging the Gap feedback survey (fernandes2023bridging) | 2305.00955 | feedback format x objective x use | Y | Y | Y | Inf(decoding)+Tr | Y (feedback formalization) | P (datasets, collection) | P (collection concerns) |
| 5 | Agent memory survey (zhang2025survey) [ALREADY-CITED] | 2404.13501 | memory design/eval/application | N | N | P | Inf+cross-episode | P (what/why memory) | P (design patterns) | N |
| 6 | Test-time scaling survey (zhang2025testtime) | 2503.24235 | what/how/where/how-well to scale | P | N | P | Inf | P (4-dim taxonomy) | Y (hands-on deployment guidelines) | N |
| 7 | Verification design for TTS (venktesh2025trust) | 2508.16665 | verifier type x training mechanism | Y | N | P (generative verifiers) | Inf+verifier Tr | P (unified verifier view) | P | N |
| 8 | Test-time compute via search (li2025survey) | 2501.10069 | task/profiling/search components | P | N | N | Inf | Y (MDP unification) | P (applicability/efficiency) | N |
| 9 | DPO survey (xiao2024comprehensive) | 2410.15595 | DPO research questions | N | Y | N | Tr | P (theory coverage) | P (datasets, applications) | N |
| 10 | RL-enhanced LLMs (wang2024reinforcement) | 2412.10400 | training technique (RLHF/RLAIF/DPO) | Y | Y | N | Tr | N | P (challenges) | N |
| 11 | Technical RL survey (srivastava2025technical) | 2507.04136 | reward modeling x feedback x optimization | Y | Y | P | Tr | Y (algorithmic failure-mode analysis) | Y (roadmap) | P (reward hacking) |
| 12 | RLHF statistical perspective (liu2026reinforcement) | 2604.02507 | statistical estimation problem | Y | Y | N | Tr+Inf | Y (statistical) | P (benchmarks, demo) | P (noise/heterogeneity, UQ) |
| 13 | Self-evolving agents (gao2025survey) | 2507.21046 | what/when/how to evolve | Y | N | Y (textual feedback) | Inf+Tr | P (3-dim framework) | P | Y (safety chapter) |
| 14 | Self-evolving AI agents (fang2025comprehensive) | 2508.07407 | component under optimization | P | N | P | Tr+deployment loop | Y (unified feedback-loop framework) | P (domain strategies) | Y (dedicated safety/ethics) |
| 15 | LLM self-improvement overview (yang2026selfimprovement) | 2603.25681 | closed-loop lifecycle stage | P | N | P | Tr+Inf | P (system-level framework) | P | N |
| 16 | LLM-agent optimization (du2025survey) | 2503.12434 | parameter-driven vs parameter-free | Y | P | P (prompt-level) | Tr+Inf | N | P (datasets/benchmarks) | N |
| 17 | LLM-as-a-Judge survey (gu2024survey) | 2411.15594 | judge reliability strategies | P | P | Y | Inf/eval | N | Y (applications, methodology) | P (bias, reliability) |
| 18 | Generation to Judgment (li2024generation) | 2411.16594 | what/how/benchmark of judging | Y | Y | Y | Inf/eval | N | P | P (challenges) |
| 19 | LLM reasoning frontiers (ke2025survey) | 2504.09037 | regime x architecture | P | N | P (debate, evaluator) | Inf+Tr | N | P | N |
| 20 | Lifelong LLM agents (zheng2025lifelong) | 2501.07278 | agent module (perception/memory/action) | N | N | P | cross-episode | N | P (roadmap, metrics) | N |
| 21 | Rollout strategies (surana2026generate) | 2605.02913 | rollout stage (GFCR) | Y | N | P (judges/critics) | Tr | Y (unified notation) | Y (diagnostic index) | P (reliability criterion) |
| 22 | Reward design survey (ji2025survey) | 2505.02666 | reward mechanism dimensions | Y | Y | N | Tr | Y (mathematical formulation) | Y (practical guidance) | N |
| 23 | CoALA (sumers2023cognitive) | 2309.02427 | cognitive-architecture component | N | N | P | agent design | Y (conceptual framework) | P (actionable directions) | N |
| 24 | RL informed by NL (luketina2019survey) [ALREADY-CITED] | 1906.03926 | task setting (instructions, text games, domain knowledge) | Y | N | N | Tr | N | N | N |
| 25 | NLRL framework (feng2024natural) | 2411.14251 | RL-component analogues in language | N | N | Y | Tr+Inf | Y (language value function, Bellman analogue) | N | N |
| 26 | Sailing by the Stars (wu2025sailing) | 2505.02686 | reward model x learning strategy x stage | Y | Y | P | Tr+Inf+post-inference | N | P (benchmarks, applications) | N |
| 27 | RMs for reasoning (liu2025enhancing) | 2510.01925 | RM application role | Y | Y | P | Inf+Tr | N | Y (actionable insights) | P (open questions) |
| 28 | Tree search + reward design (wei2025unifying) | 2510.09988 | search mechanism x reward formulation x transition | Y | N | N | Inf+Tr | Y (formal transient-vs-durable distinction) | P (roadmap) | N |
| 29 | LLM self-evolution (tao2024survey) | 2404.14387 | evolution-cycle phase | N | N | P (self-generated experience) | Tr loop | P (conceptual framework) | P | N |
| 30 | Internal consistency + self-feedback (liang2024internal) | 2407.14507 | consistency layer x module | N | N | Y (self-evaluation) | Inf+model update | Y (internal-consistency theory) | P (benchmarks) | N |
| 31 | LLMs-as-Judges (li2024judges) | 2412.05579 | why/how/where/how-evaluate | Y | P | Y | Inf/eval | N | P | P (limitations analysis) |
| 32 | RL for LRMs (zhang2025reinforcement) | 2509.08827 | RL component + open problems | Y | N | P | Tr | N | P (resources, infrastructure) | N |
| 33 | Reinforced reasoning (xu2025towards) | 2501.09686 | technical component (data/learning/TTS) | Y | N | P (thought sequences) | Tr+Inf | N | P (open-source analysis) | N |
| 34 | Agent-as-a-Judge (you2026agent) | 2601.05111 | judge capability dimension | P | N | Y | Inf/eval | P (developmental taxonomy) | P (roadmap) | P (bias motivation) |

The pattern the table shows, and the sentence S13 should open with: every shelf neighbor organizes by mechanism (correction timing, evolution phase, rollout stage), by agent component (memory, module, capability), or by algorithm family (DPO, RLHF, RL); none takes the feedback signal itself (critique vs rubric vs preference-with-rationale vs reward-code) as the primary axis, and none combines a formal treatment of language-as-signal with lifecycle coverage from problem definition through inference to training plus safety of the feedback channel. That fourfold combination (signal-centric axis + formal framework + full lifecycle + feedback safety) is the whitespace our survey fills, and it directly answers ARR weakness (f) (no comparison with prior surveys) and (e) (no practitioner guidance).

---

## Seed surveys

### 1. The Landscape of Agentic Reinforcement Learning for LLMs: A Survey
- arXiv: 2509.02547, 2025. Venue note: published in TMLR (arXiv comments field). NEW (not in references.bib).
- Method summary: Formalizes the shift from LLM RL (degenerate single-step MDPs) to agentic RL (temporally extended POMDPs). Proposes a twofold taxonomy: one around core agentic capabilities (planning, tool use, memory, reasoning, self-improvement, perception) and one around task domains. Argues RL is the mechanism that turns static heuristic modules into adaptive agentic behavior. Consolidates open-source environments, benchmarks, and frameworks into a practical compendium; synthesizes over five hundred works.
- Signal type: scalar RL reward (verbal signals not an organizing category).
- Lifecycle stage: training.
- Section mapping: S13 comparison table; also related-work anchor for S2 (their MDP/POMDP contrast is the RL-theoretic register reviewers want us to match).
- Key claim: RL is the critical mechanism transforming agentic capabilities from static modules into adaptive, robust behavior; survey synthesizes 500+ works.
- Comparison row: axis = capability x domain; feedback = scalar; stages = training; formal = yes (MDP/POMDP); practitioner = partial (compendium); feedback safety = not claimed in abstract.
- What ours adds: a signal-centric axis for the verbal channel their capability taxonomy leaves implicit, plus problem-definition and inference-time stages their training-centric frame underplays.

### 2. Automatically Correcting Large Language Models: Surveying the landscape of diverse self-correction strategies
- arXiv: 2308.03188, 2023 (Pan, Saxon, Xu, Nathani, Wang, Wang). NEW.
- Method summary: Reviews self-correction techniques where the LLM is prompted or guided to fix its own output using automated feedback produced by the model itself or an external system. Taxonomizes by when correction happens: training-time, generation-time, and post-hoc. Motivates automated feedback as the path to deployable correction with minimal human involvement. Summarizes applications and open challenges.
- Signal type: critique (automated feedback, self or external).
- Lifecycle stage: inference and training (their timing axis spans both).
- Section mapping: S13; also related-work for S5 (deliberative feedback).
- Key claim: automated feedback (self-generated or external) makes LLM correction practical and deployable with minimal human feedback.
- Comparison row: axis = correction timing; feedback = verbal critique (+ scores); stages = Inf+Tr; formal = no; practitioner = partial; feedback safety = not claimed.
- What ours adds: correction is one consumption pattern; we type the signals (critique vs rubric vs rationale) and follow them into grounding and the trained reward stack.

### 3. When Can LLMs Actually Correct Their Own Mistakes? A Critical Survey of Self-Correction of LLMs [ALREADY-CITED as kamoi2024can / kamoi2024whencan (duplicate entries in references.bib; deduplicate during merge)]
- arXiv: 2406.01297, 2024. Venue note: TACL 2024 (arXiv comments field).
- Method summary: Critically surveys self-correction, asking under what conditions it actually works. Finds prior work often under-defines research questions and uses impractical frameworks or unfair evaluations that over-credit self-correction. Categorizes research questions and provides a checklist for designing appropriate experiments. Concludes: no prior work shows successful self-correction from prompted-LLM feedback except in tasks exceptionally suited to it; reliable external feedback and large-scale fine-tuning are what make self-correction work.
- Signal type: critique (self-evaluation vs external feedback).
- Lifecycle stage: inference (self-correction), plus fine-tuning.
- Section mapping: S13; evidence anchor for S5 and S11 (feedback-quality evaluation).
- Key claim: self-correction succeeds only with reliable external feedback, large-scale fine-tuning, or exceptionally suited tasks; prompted self-feedback alone does not work.
- Comparison row: axis = research question x feedback source; feedback = verbal; stages = Inf+Tr; formal = no (methodological checklist); practitioner = yes (checklist); feedback safety = not claimed.
- What ours adds: their negative result about self-generated feedback becomes, in our frame, a statement about signal provenance; we generalize it across the grounding/deliberation/learning stages and add the adversarial case.

### 4. Bridging the Gap: A Survey on Integrating (Human) Feedback for Natural Language Generation
- arXiv: 2305.00955, 2023 (Fernandes et al., 11 authors). NEW.
- Method summary: Surveys the use of human feedback to improve NLG. Introduces an encompassing formalization of feedback and taxonomizes existing work under it: feedback described by format and objective, and used either directly or via trained feedback models, for training or for decoding. Covers datasets and concerns around feedback collection. Closes with an overview of nascent AI feedback that uses LLM judgments based on principles to minimize human intervention.
- Signal type: the whole format spectrum (numeric, ranking, natural language); the closest prior signal typing.
- Lifecycle stage: training and decoding (inference); no problem-definition stage.
- Section mapping: S13; the single most important related-work contrast for S2 and S6 (our formal framework must be positioned as the agentic-era successor of their formalization).
- Key claim: a unified formalization of feedback (format, objective, use, modeling) organizes the human-feedback-for-NLG literature.
- Comparison row: axis = feedback format x objective x use; feedback = scalar, preference, verbal; stages = Inf(decoding)+Tr; formal = yes; practitioner = partial (datasets, collection concerns); feedback safety = partial (collection concerns).
- What ours adds: their 2023 formalization predates agents, RLVR, rubric rewards, and experiential memory; we extend signal typing to the agentic lifecycle (grounding, deliberation, credit assignment) and to adversarial feedback channels.

### 5. A Survey on the Memory Mechanism of Large Language Model based Agents [ALREADY-CITED as zhang2025survey (journal version, ACM TOIS 2025)]
- arXiv: 2404.13501, 2024 (Zhang, Zeyu et al.).
- Method summary: Surveys memory in LLM agents: what memory is, why agents need it, how to design and evaluate memory modules, and where memory matters in applications. Frames memory as the key component supporting agent-environment interaction and self-evolution. Analyzes limitations and future directions; maintains a companion repository.
- Signal type: memory (stored verbal experience), not typed by feedback signal.
- Lifecycle stage: inference plus cross-episode persistence.
- Section mapping: S13; related work for the memory row of S6/T4 and the pqAY-2 boundary discussion (memory as inference-time vs learning-signal).
- Key claim: memory is the key component enabling long-term agent-environment interaction, and existing memory designs lack a holistic comparative treatment.
- Comparison row: axis = memory design/eval/application; feedback = verbal implicitly (stored experience); stages = Inf+cross-episode; formal = partial; practitioner = partial; feedback safety = not claimed.
- What ours adds: we treat persisted verbal experience as a learning signal with an explicit decision rule for the inference/training boundary, which is exactly the hybrid-case ambiguity reviewer pqAY flagged.

### 6. A Survey on Test-Time Scaling in Large Language Models: What, How, Where, and How Well?
- arXiv: 2503.24235, 2025 (Zhang, Qiyuan et al.). NEW.
- Method summary: Proposes a unified four-dimension framework for test-time scaling: what to scale, how to scale, where to scale, how well to scale. Reviews methods, application scenarios, and assessment aspects under this taxonomy, decomposing the functional roles of individual techniques. Distills developmental trajectories and offers hands-on guidelines for practical deployment. Identifies open challenges including clarifying the functional essence of techniques and generalization to more tasks.
- Signal type: not signal-typed; verifiers and reward-guided methods appear as "how" techniques.
- Lifecycle stage: inference only.
- Section mapping: S13; related work for S5 (deliberation) and the Q27s-6 search-cell defense.
- Key claim: a what/how/where/how-well framework unifies the fragmented TTS literature and yields practical deployment guidelines.
- Comparison row: axis = four TTS dimensions; feedback = partial scalar/verbal inside techniques; stages = Inf; formal = partial (taxonomy); practitioner = yes; feedback safety = not claimed.
- What ours adds: TTS treats feedback as an implementation detail of scaling; we make the signal the object of study and connect the same signal to training-time consumption.

### 7. Trust but Verify! A Survey on Verification Design for Test-time Scaling
- arXiv: 2508.16665, 2025 (Venktesh, Rathee, Anand). NEW.
- Method summary: Surveys verifiers used in test-time scaling: prompt-based, discriminative fine-tuned, and generative, verifying process paths, outcomes, or both. Presents a unified view of verifier training, verifier types, and their utility in TTS. Motivated by the absence of a clear categorization of verification approaches and their training mechanisms.
- Signal type: reward/score from verifiers, including generative (verbal) verification.
- Lifecycle stage: inference (verification during search/decoding) plus verifier training.
- Section mapping: S13; direct neighbor of S7 (verbal reward stack).
- Key claim: verifier design (prompt-based vs discriminative vs generative; process vs outcome) is the load-bearing choice in test-time scaling, and the literature lacked a unified categorization.
- Comparison row: axis = verifier type x training; feedback = scalar + generative-verbal; stages = Inf + verifier Tr; formal = partial (unified view); practitioner = partial; feedback safety = not claimed.
- What ours adds: verifiers are producers on one shelf of our verbal reward stack; we add the consumer side (credit assignment, optimization) and the adversarial robustness of the channel.

### 8. A Survey on LLM Test-Time Compute via Search: Tasks, LLM Profiling, Search Algorithms, and Relevant Frameworks
- arXiv: 2501.10069, 2025 (Li, Xinzhe). Venue note: TMLR camera-ready (arXiv comments field). NEW.
- Method summary: Reviews LLM inference-via-search frameworks by unifying task definitions under an MDP and giving modular definitions of LLM profiling (how the LLM serves as policy/value/transition) and search procedures. Enables precise comparison of frameworks and highlights their departures from conventional search algorithms. Discusses applicability, performance, and efficiency.
- Signal type: value/guidance signals inside search; not signal-typed.
- Lifecycle stage: inference.
- Section mapping: S13; supports the S5 search-guided deliberation cell (answers Q27s-6: search is a control procedure; the interesting question is what signal guides it).
- Key claim: unifying search-based test-time compute under MDP task definitions plus modular LLM profiling makes heterogeneous frameworks directly comparable.
- Comparison row: axis = task/profiling/search components; feedback = guidance values; stages = Inf; formal = yes (MDP unification); practitioner = partial; feedback safety = not claimed.
- What ours adds: we type the feedback that guides the search (verbal critique vs scalar value) rather than the search procedure itself.

### 9. A Comprehensive Survey of Direct Preference Optimization: Datasets, Theories, Variants, and Applications
- arXiv: 2410.15595, 2024 (Xiao et al.). Venue note: accepted by TPAMI 2026 (arXiv comments field). NEW.
- Method summary: Reviews DPO as an RL-free alternative to RLHF, categorizing studies by research questions across theoretical analyses, variants, preference datasets, and applications. Provides an in-depth account of DPO's advancements and inherent limitations, and proposes future directions for model alignment.
- Signal type: preference (pairwise), without rationale.
- Lifecycle stage: training.
- Section mapping: S13; contrast row for S6 (learning signal) where preference-with-rationale extends what DPO consumes.
- Key claim: a research-question-driven categorization of DPO (datasets, theory, variants, applications) organizes the current landscape of RL-free alignment.
- Comparison row: axis = DPO research questions; feedback = preference; stages = Tr; formal = partial (theory coverage); practitioner = partial; feedback safety = not claimed.
- What ours adds: our S6 covers what preference-only optimization discards, namely the verbal rationale attached to a preference, and when it pays to keep it.

### 10. Reinforcement Learning Enhanced LLMs: A Survey
- arXiv: 2412.10400, 2024 (Wang, Shuhe et al.). NEW.
- Method summary: Systematic review of RL-enhanced LLMs: RL basics, popular RL-enhanced models, the two reward-model-based techniques (RLHF, RLAIF), and DPO-style methods that bypass reward models. Points out challenges and deficiencies and suggests avenues for improvement. Positions itself as consolidating a fast-growing field for researchers and practitioners.
- Signal type: scalar reward and preference; verbal appears only as the source of AI feedback.
- Lifecycle stage: training.
- Section mapping: S13; background contrast for S6/S7.
- Key claim: RLHF, RLAIF, and DPO form the three-branch backbone of RL-enhanced LLM training.
- Comparison row: axis = training technique; feedback = scalar + preference; stages = Tr; formal = no; practitioner = partial; feedback safety = not claimed.
- What ours adds: the verbal channel as a first-class signal across the lifecycle, not a data source for reward models.

### 11. A Technical Survey of Reinforcement Learning Techniques for Large Language Models
- arXiv: 2507.04136, 2025 (Srivastava, Aggarwal). Venue note: accepted to ACM TIST, June 2026 (arXiv comments field). NEW.
- Method summary: Technical overview of RL for LLMs from PPO/Q-learning/actor-critic through RLHF, RLAIF, DPO, and GRPO, with applications from code generation to tool-augmented reasoning. Goes beyond descriptive categorization to a rigorous algorithmic analysis of failure modes, mathematically framing structural bottlenecks and stability trade-offs. Presents a comparative taxonomy by reward modeling, feedback mechanism, and optimization strategy. Highlights RLVR for stepwise reasoning and names reward hacking, computational cost, and scalable feedback collection as persistent challenges.
- Signal type: scalar/verifiable rewards and preferences; feedback mechanisms as a taxonomy dimension.
- Lifecycle stage: training.
- Section mapping: S13; the RL-theoretic depth benchmark for our S2/S8 (reviewer weakness (d)).
- Key claim: algorithmic analysis of failure modes (structural bottlenecks, stability trade-offs) distinguishes gains from architectural scaling versus optimization objectives; reward hacking and scalable feedback collection remain the binding constraints.
- Comparison row: axis = reward x feedback x optimization; feedback = scalar + preference (+verbal partially); stages = Tr; formal = yes; practitioner = yes (roadmap); feedback safety = partial (reward hacking).
- What ours adds: their taxonomy scalarizes feedback before analyzing it; we keep the language structure of the signal and analyze credit assignment on it directly.

### 12. Reinforcement Learning from Human Feedback: A Statistical Perspective
- arXiv: 2604.02507, 2026 (Liu, Shi, Sun). NEW.
- Method summary: Surveys RLHF as a statistics problem: SFT, reward modeling, and policy optimization related to Bradley-Terry-Luce modeling, latent utility estimation, active learning, experimental design, and uncertainty quantification. Reviews reward learning from pairwise preferences and both two-stage and one-stage (DPO-style) optimization. Extends to RLAIF, inference-time algorithms, and RLVR, plus benchmarks, evaluation protocols, and open-source frameworks. Emphasizes that feedback is noisy, subjective, and heterogeneous.
- Signal type: preference (pairwise), treated as noisy statistical data.
- Lifecycle stage: training, with inference-time extensions.
- Section mapping: S13; complements our S2 formal framework and the S11 feedback-quality discussion.
- Key claim: RLHF's components map onto classical statistical problems (BTL estimation, active learning, experimental design, UQ), and its central difficulty is learning from noisy, subjective, heterogeneous feedback.
- Comparison row: axis = statistical estimation problem; feedback = preference + scalar RM; stages = Tr+Inf; formal = yes (statistical); practitioner = partial (benchmarks, frameworks, demo); feedback safety = partial (noise and heterogeneity, UQ; not adversarial).
- What ours adds: their statistics stops at preference labels; we formalize richer verbal signals whose information content a BTL scalarization destroys, and we cover the adversarial (not just noisy) channel.

### 13. A Survey of Self-Evolving Agents: What, When, How, and Where to Evolve on the Path to Artificial Super Intelligence
- arXiv: 2507.21046, 2025 (Gao, Huan-ang et al., 27 authors). Venue note: TMLR 01/2026 (arXiv comments field). NEW.
- Method summary: First systematic review of self-evolving agents around three dimensions: what to evolve (models, memory, tools, architecture), when to evolve (intra-test-time vs inter-test-time), and how (algorithmic and architectural designs including scalar rewards, textual feedback, single- and multi-agent). Adds evaluation metrics and benchmarks tailored to self-evolution, applications (coding, education, healthcare), and challenges in safety, scalability, and co-evolutionary dynamics.
- Signal type: explicitly distinguishes scalar rewards vs textual feedback as evolution drivers.
- Lifecycle stage: inference and training (intra/inter-test-time).
- Section mapping: S13; nearest large-scope competitor for our T4/S6 experiential-learning material.
- Key claim: organizing self-evolution by what/when/how, with textual feedback recognized alongside scalar rewards, gives a design space and roadmap toward adaptive agentic systems.
- Comparison row: axis = what/when/how to evolve; feedback = scalar + textual; stages = Inf+Tr; formal = partial; practitioner = partial; feedback safety = yes (safety challenges treated).
- What ours adds: they classify by which component evolves; we classify by the signal that drives evolution and give decision rules for signal choice, which their axis leaves unaddressed.

### 14. A Comprehensive Survey of Self-Evolving AI Agents: A New Paradigm Bridging Foundation Models and Lifelong Agentic Systems
- arXiv: 2508.07407, 2025 (Fang, Jinyuan et al., 15 authors). NEW.
- Method summary: Reviews agent-evolution techniques via a unified conceptual framework with four components: System Inputs, Agent System, Environment, and Optimisers, abstracting the feedback loop under all self-evolving designs. Systematically reviews techniques by which component they target, plus domain-specific evolution in biomedicine, programming, and finance. Includes a dedicated discussion of evaluation, safety, and ethics for self-evolving systems.
- Signal type: interaction data and environmental feedback; not typed at signal granularity.
- Lifecycle stage: training/deployment loop.
- Section mapping: S13.
- Key claim: a four-component feedback-loop abstraction (Inputs, Agent System, Environment, Optimisers) is sufficient to compare all self-evolving agent designs.
- Comparison row: axis = component under optimization; feedback = mixed, untyped; stages = Tr+deployment; formal = yes (unified framework); practitioner = partial; feedback safety = yes (dedicated discussion).
- What ours adds: inside their Optimiser box, everything hinges on what the feedback says; our taxonomy opens that box and types the verbal signal and its credit assignment.

### 15. Self-Improvement of Large Language Models: A Technical Overview and Future Outlook
- arXiv: 2603.25681, 2026 (Yang, Haoyan et al.). NEW.
- Method summary: System-level perspective on self-improving LLMs as a closed-loop lifecycle of four coupled processes: data acquisition, data selection, model optimization, and inference refinement, monitored by an autonomous evaluation layer. Reviews representative methods per component and discusses limitations and a vision toward fully self-improving LLMs. Motivation: human supervision is increasingly costly and, near human-level capability, insufficiently informative.
- Signal type: model-generated data and autonomous evaluation; not signal-typed.
- Lifecycle stage: training and inference (lifecycle loop).
- Section mapping: S13.
- Key claim: self-improvement is best understood as a closed-loop lifecycle (acquisition, selection, optimization, refinement) with an autonomous evaluation layer steering all stages.
- Comparison row: axis = lifecycle stage; feedback = untyped self-generated; stages = Tr+Inf; formal = partial (system framework); practitioner = partial; feedback safety = not claimed.
- What ours adds: their evaluation layer is our signal-producer stack; we specify what flows between their stages and when verbal beats scalar in that loop.

### 16. A Survey on the Optimization of Large Language Model-based Agents
- arXiv: 2503.12434, 2025 (Du, Shangheng et al.). Venue note: published in ACM Computing Surveys Vol. 58 No. 9, July 2026 (arXiv comments field); same venue we target. NEW.
- Method summary: Comprehensive review of LLM-agent optimization split into parameter-driven methods (fine-tuning-based, RL-based, hybrid; covering trajectory data construction, reward function design, optimization algorithms) and parameter-free methods (prompt engineering, external knowledge retrieval). Summarizes datasets, benchmarks, applications, and challenges.
- Signal type: mixed (rewards for RL branch, prompts/knowledge for parameter-free branch); not signal-typed.
- Lifecycle stage: training and inference.
- Section mapping: S13; important precedent as a CSUR agent survey (format/venue benchmark for our expansion).
- Key claim: the agent-optimization literature divides into parameter-driven and parameter-free families, each with distinct data, reward, and algorithm design choices.
- Comparison row: axis = parameter-driven vs parameter-free; feedback = mixed; stages = Tr+Inf; formal = no; practitioner = partial (datasets/benchmarks); feedback safety = not claimed.
- What ours adds: their top-level split is about where the update lands (weights vs context); ours is about what the signal is, which unifies their branches since the same critique can drive either.

### 17. A Survey on LLM-as-a-Judge
- arXiv: 2411.15594, 2024 (Gu, Jiawei et al., 16 authors). NEW.
- Method summary: Surveys LLM-as-a-Judge around the core question of how to build reliable judge systems: strategies for consistency, bias mitigation, and adaptation to diverse assessment scenarios. Proposes methodologies for evaluating judge reliability, supported by a purpose-built benchmark. Discusses practical applications, challenges, and future directions.
- Signal type: judge outputs (scores, verdicts, natural-language assessments).
- Lifecycle stage: inference/evaluation (cross-cutting).
- Section mapping: S13; producer-side related work for S7 and S11.
- Key claim: reliability (consistency, bias mitigation, scenario adaptation) is the central engineering problem of LLM-as-a-Judge, and it can be measured with dedicated meta-evaluation.
- Comparison row: axis = reliability strategies; feedback = scalar + verbal judgments; stages = Inf/eval; formal = no; practitioner = yes; feedback safety = partial (bias and reliability, not adversarial channel).
- What ours adds: judges are one producer in our stack; we follow the judgment downstream into optimization, credit assignment, and adversarial failure of the channel.

### 18. From Generation to Judgment: Opportunities and Challenges of LLM-as-a-judge
- arXiv: 2411.16594, 2024 (Li, Dawei et al., 13 authors). Venue note: EMNLP 2025 (arXiv comments field). NEW.
- Method summary: Comprehensive survey of LLM-based judgment defined from input and output perspectives, with a taxonomy along three dimensions: what to judge, how to judge, and how to benchmark. Covers scoring, ranking, and selection uses across ML evaluation scenarios and lays out key challenges and future directions.
- Signal type: judgments (score, ranking, selection; with rationales).
- Lifecycle stage: inference/evaluation.
- Section mapping: S13; producer-side related work for S7 and S11.
- Key claim: a what/how/benchmark taxonomy organizes LLM-as-a-judge across attributes, methods, and meta-evaluation.
- Comparison row: axis = what/how/benchmark; feedback = scalar + preference + verbal; stages = Inf/eval; formal = no; practitioner = partial; feedback safety = partial (challenges).
- What ours adds: same producer/consumer asymmetry as row 17: they stop at producing reliable judgments; we study consuming them as grounding, deliberation, or learning signals.

### 19. A Survey of Frontiers in LLM Reasoning: Inference Scaling, Learning to Reason, and Agentic Systems
- arXiv: 2504.09037, 2025 (Ke, Zixuan et al., Salesforce). Venue note: TMLR with Survey Certification (arXiv comments field). NEW.
- Method summary: Categorizes reasoning methods along two orthogonal dimensions: regimes (inference-time vs training-based) and architectures (standalone LLM vs agentic compound systems, incl. multi-agent), analyzed at input and output levels. Tracks trends from inference scaling to learning-to-reason (DeepSeek-R1) and agentic workflows; covers SFT through PPO/GRPO, reasoner and verifier training, and agentic patterns like generator-evaluator and LLM debate.
- Signal type: not signal-typed; evaluators/verifiers/debate appear as architecture choices.
- Lifecycle stage: inference and training (their regime axis).
- Section mapping: S13; also background for S5 (deliberation patterns).
- Key claim: a regime x architecture matrix cleanly organizes LLM reasoning research and exposes the field's two shifts: inference scaling to learning-to-reason, and standalone to agentic.
- Comparison row: axis = regime x architecture; feedback = partial; stages = Inf+Tr; formal = no; practitioner = partial; feedback safety = not claimed.
- What ours adds: their matrix and ours are orthogonal: they slice by when/where computation happens; we slice by what the feedback says. Our S3 taxonomy composes with theirs.

### 20. Lifelong Learning of Large Language Model based Agents: A Roadmap
- arXiv: 2501.07278, 2025 (Zheng, Junhao et al.). Venue note: accepted to IEEE TPAMI (arXiv comments field). NEW.
- Method summary: First systematic summary of lifelong (continual) learning for LLM agents, organized by three agent modules: perception (multimodal input), memory (evolving knowledge), and action (grounded interaction). Shows how the modules jointly enable continual adaptation and mitigate catastrophic forgetting; provides evaluation metrics, application scenarios, and a resource repository.
- Signal type: not signal-typed; memory contents implicitly verbal.
- Lifecycle stage: cross-episode/continual.
- Section mapping: S13; adjacent to T4/S6 experiential memory.
- Key claim: lifelong learning in LLM agents decomposes into perception, memory, and action modules whose co-design mitigates catastrophic forgetting.
- Comparison row: axis = agent module; feedback = untyped; stages = continual; formal = no; practitioner = partial (roadmap, metrics); feedback safety = not claimed.
- What ours adds: we give the signal-level account of what gets written into lifelong memory (critiques, distilled lessons) and when replaying it constitutes training.

### 21. Generate, Filter, Control, Replay: A Comprehensive Survey of Rollout Strategies for LLM Reinforcement Learning
- arXiv: 2605.02913, 2026 (Surana, Rohan et al., 22 authors). NEW.
- Method summary: Optimizer-agnostic survey of rollout design for RL post-training. Formalizes rollout pipelines with unified notation and introduces GFCR, a lifecycle taxonomy with four stages: Generate (candidate trajectories), Filter (intermediate signals via verifiers, judges, critics), Control (compute allocation and branching/stopping), and Replay (artifact reuse without weight updates, incl. self-evolving curricula). Adds a criterion taxonomy (reliability, coverage, cost sensitivity), case studies (math, code/SQL, multimodal, tool agents), and a diagnostic index mapping rollout pathologies to GFCR modules and mitigation levers.
- Signal type: verifier/judge/critic signals as Filter-stage constructs (scalar and verbal producers).
- Lifecycle stage: training (rollout pipeline), with replay across rollouts.
- Section mapping: S13; strong methodological neighbor for S7/S8 (where signals enter the training pipeline).
- Key claim: rollout design, usually underreported, is a first-class determinant of what RL post-training learns, and GFCR plus a pathology-to-mitigation diagnostic index makes it engineerable.
- Comparison row: axis = rollout stage (GFCR); feedback = scalar + verbal producers in Filter; stages = Tr; formal = yes (unified notation); practitioner = yes (diagnostic index); feedback safety = partial (reliability criterion).
- What ours adds: GFCR locates where signals enter the pipeline; our taxonomy specifies the semantics of those signals, and covers the problem-definition and inference stages outside the training pipeline.

### 22. A Survey on Progress in LLM Alignment from the Perspective of Reward Design
- arXiv: 2505.02666, 2025 (Ji, Miaomiao et al.). NEW.
- Method summary: Organizes LLM alignment around reward design as the bridge between feedback signals and model optimization. Addresses mathematical formulation, construction practices, and interaction with optimization paradigms; builds a macro-level taxonomy of reward mechanisms along complementary dimensions. Reads alignment progress as a refinement of reward design, with paradigm shifts from RL-based to RL-free optimization and from single-task to multi-objective settings.
- Signal type: reward (scalar and preference-derived); explicitly the bridge from feedback to optimization.
- Lifecycle stage: training.
- Section mapping: S13; closest single-axis competitor to our S7 verbal reward stack.
- Key claim: alignment progress is a continuous refinement of reward design, trending RL-based to RL-free and single-task to multi-objective.
- Comparison row: axis = reward mechanism dimensions; feedback = scalar + preference; stages = Tr; formal = yes (mathematical formulation); practitioner = yes (practical guidance claimed); feedback safety = not claimed.
- What ours adds: reward design assumes the signal must become a reward; we survey when language should stay language (instructions, critiques, memory) and never pass through a scalar bottleneck.

### 23. Cognitive Architectures for Language Agents
- arXiv: 2309.02427, 2023 (Sumers, Yao, Narasimhan, Griffiths). Venue note: TMLR (arXiv comments field). NEW.
- Method summary: Proposes CoALA, a framework describing language agents through modular memory components, a structured action space (internal memory actions plus external environment actions), and a generalized decision-making process. Uses it to retrospectively organize recent agent work and prospectively identify directions, drawing on cognitive science and symbolic AI.
- Signal type: not signal-typed; a structural framework for agent internals.
- Lifecycle stage: agent design (cross-cutting).
- Section mapping: S13; framework-level related work for S2/S3.
- Key claim: memory + structured action space + decision procedure is a sufficient organizing frame for language agents, connecting them to the history of cognitive architectures.
- Comparison row: axis = architecture component; feedback = untyped; stages = design-level; formal = yes (conceptual); practitioner = partial; feedback safety = not claimed.
- What ours adds: CoALA describes the machine; we describe the signals flowing through it and how they become training pressure. The two frames compose rather than compete.

### 24. A Survey of Reinforcement Learning Informed by Natural Language [ALREADY-CITED as luketina2019survey]
- arXiv: 1906.03926, 2019 (Luketina et al.). Venue note: published at IJCAI'19 (arXiv comments field).
- Method summary: Pre-LLM survey arguing RL should exploit natural language for structure and transfer. Surveys instruction following, text games, and learning from textual domain knowledge, building on representation learning for language. Calls for new environments and further NLP-RL integration.
- Signal type: instruction/task specification and textual domain knowledge (language as input, not feedback).
- Lifecycle stage: training (classical RL).
- Section mapping: S13; historical anchor: the field's original "language + RL" framing that our VRL framing inverts.
- Key claim: it is time (2019) to tightly integrate natural language understanding into RL for compositional structure and transfer.
- Comparison row: axis = task setting; feedback = language-as-input, rewards scalar; stages = Tr; formal = no; practitioner = no; feedback safety = not claimed.
- What ours adds: the historical inversion sentence for related work: in 2019 language informed a scalar-reward learner; in the VRL era language is simultaneously the policy medium, the feedback, and increasingly the optimizer trace.

### 25. Natural Language Reinforcement Learning
- arXiv: 2411.14251, 2024 (Feng, Xidong et al.). NEW. (Framework paper, not a survey; on the T9 shelf as the closest formal-framework competitor.)
- Method summary: Proposes NLRL, extending RL principles into natural-language counterparts. Centers on the Language Value Function: value as an interpretable linguistic narrative articulating the rationale behind an evaluation; extends policy, the Bellman equation, and policy iteration into language space. Implements RL-like policy and value training through unsupervised environment interactions with LLMs; validated on 4 multi-step agentic tasks.
- Signal type: verbal value estimates (evaluation narratives).
- Lifecycle stage: training (language-space policy iteration) and inference.
- Section mapping: S13 + S2 (our formal framework must position against NLRL explicitly; also answers reviewer Q27s-2 term-collision worry, since NLRL is the other established coinage adjacent to Reflexion's "verbal RL").
- Key claim: RL components (value, policy, Bellman, policy iteration) admit language-space analogues, and language value functions enable RL-like training from unsupervised interaction.
- Comparison row: axis = RL-component analogues; feedback = verbal value; stages = Tr+Inf; formal = yes; practitioner = no; feedback safety = not claimed.
- What ours adds: NLRL is one formal instantiation (value-centric); our S2 framework covers the full signal taxonomy (critiques, rubrics, rationales, memory) and our survey maps the empirical field NLRL does not attempt to cover.

---

## Discovered surveys (beyond seeds; all verified this session; all NEW to references.bib)

### 26. Sailing by the Stars: A Survey on Reward Models and Learning Strategies for Learning from Rewards
- arXiv: 2505.02686, 2025 (Wu, Xiaobao). NEW. (HF listing shows an earlier title variant "Sailing AI by the Stars"; the abs page title above is canonical.)
- Method summary: Frames post-training and test-time scaling under one paradigm, learning from rewards, where reward signals steer LLM behavior across RLHF/RLAIF/DPO/GRPO, reward-guided decoding, and post-hoc correction. Surveys reward-model designs and learning strategies across three stages: training, inference, and post-inference. Covers reward-model benchmarks and applications; argues the paradigm moves LLMs from passive learning on static data to active learning from dynamic feedback.
- Signal type: reward-code/score-centric (reward models); verbal only where RMs are generative.
- Lifecycle stage: training + inference + post-inference.
- Section mapping: S13; the closest stage-spanning competitor to our lifecycle claim, but reward-centric rather than signal-centric.
- Key claim: learning from rewards unifies post-training and test-time scaling, spanning training, inference, and post-inference stages.
- Comparison row: axis = RM design x learning strategy x stage; feedback = scalar + preference (+ generative-verbal partially); stages = Tr+Inf+post-inference; formal = no; practitioner = partial; feedback safety = not claimed.
- What ours adds: replace "reward" with "verbal signal" and the lifecycle widens: problem-definition grounding and non-scalarized signals (rubrics-as-text, memory, instructions) fall outside the learning-from-rewards frame.

### 27. Enhancing Large Language Model Reasoning with Reward Models: An Analytical Survey
- arXiv: 2510.01925, 2025 (Liu, Qiyuan; Xu; Chen; Chen; Teh; Miao). NEW.
- Method summary: Systematic introduction to reward models (architectures, training methodologies, evaluation) plus a survey of their applications to reasoning: guiding generation/selecting outputs at inference, enabling data synthesis and iterative self-improvement, and providing RL training signals. Discusses open questions on RM selection, generalization, evaluation, and enhancement, based on existing research and the authors' own empirical findings.
- Signal type: reward-model outputs (scalar; generative RMs in scope).
- Lifecycle stage: inference and training.
- Section mapping: S13; neighbor of S7.
- Key claim: reward models serve three distinct roles (inference guidance, data synthesis/self-improvement, RL training signal), and their selection/generalization remain open problems.
- Comparison row: axis = RM application role; feedback = scalar + preference; stages = Inf+Tr; formal = no; practitioner = yes (actionable insights claimed); feedback safety = partial (open questions on generalization/evaluation).
- What ours adds: an RM is one producer type in our stack; we add non-RM verbal producers (judges with rationales, rubric authors, debate) and the consumer-side credit assignment.

### 28. Unifying Tree Search Algorithm and Reward Design for LLM Reasoning: A Survey
- arXiv: 2510.09988, 2025 (Wei, Jiaqi et al., 13 authors). NEW.
- Method summary: Unifies deliberative tree search for LLMs, covering both test-time scaling and self-improvement, by deconstructing search into three components: search mechanism, reward formulation, and transition function. Establishes a formal distinction between transient search guidance (for TTS) and durable parametric reward modeling (for self-improvement), then builds a component-centric taxonomy and a research roadmap.
- Signal type: reward signals in search (transient heuristic vs durable learning target).
- Lifecycle stage: inference (TTS) and training (self-improvement).
- Section mapping: S13; its transient-vs-durable distinction is a ready-made citation for our inference-vs-training pillar boundary (reviewer weakness (c): decision rules for hybrid methods).
- Key claim: the ambiguity of the reward signal's role (transient guidance vs durable learning target) is the field's core confusion, resolved by a three-component formalism.
- Comparison row: axis = search x reward x transition; feedback = scalar reward; stages = Inf+Tr; formal = yes; practitioner = partial (roadmap); feedback safety = not claimed.
- What ours adds: we generalize their transient-vs-durable reward distinction to every verbal signal type, giving the cross-pillar decision rule reviewers asked us for.

### 29. A Survey on Self-Evolution of Large Language Models
- arXiv: 2404.14387, 2024 (Tao, Zhengwei et al.). NEW.
- Method summary: Presents a conceptual framework for LLM self-evolution as iterative cycles of four phases: experience acquisition, experience refinement, updating, and evaluation. Categorizes evolution objectives for LLMs and LLM agents and taxonomizes literature per module. Motivated by the cost ceiling of human/external-model supervision; frames self-evolution as the path to scaling beyond it.
- Signal type: self-generated experience (untyped).
- Lifecycle stage: training loop with evaluation.
- Section mapping: S13.
- Key claim: self-evolution decomposes into acquire-refine-update-evaluate cycles inspired by human experiential learning.
- Comparison row: axis = evolution-cycle phase; feedback = self-generated experience; stages = Tr loop; formal = partial (conceptual); practitioner = partial; feedback safety = not claimed.
- What ours adds: signal typing inside "experience refinement" (what exactly is kept: critique, distilled rule, preference) plus the adversarial channel and a formal framework.

### 30. Internal Consistency and Self-Feedback in Large Language Models: A Survey
- arXiv: 2407.14507, 2024 (Liang, Xun et al., 11 authors). NEW.
- Method summary: Unifies Self- methods (Self-Consistency, Self-Improve, Self-Refine) under an internal-consistency perspective: consistency among latent, decoding, and response layers under sampling. Introduces the Self-Feedback theoretical framework with two modules, Self-Evaluation (captures consistency signals) and Self-Update (uses them to improve responses or the model). Classifies studies by task and line of work, summarizes evaluation benchmarks, and interrogates "Does Self-Feedback Really Work?", proposing hypotheses such as "Consistency Is (Almost) Correctness".
- Signal type: self-evaluation signals (internal consistency; verbal self-critique).
- Lifecycle stage: inference and model update.
- Section mapping: S13; complements S5 and the kamoi2024can skepticism thread.
- Key claim: internal consistency is the unifying quantity behind Self- methods, and Self-Evaluation + Self-Update is the general schema for exploiting it.
- Comparison row: axis = consistency layer x module; feedback = self-evaluation (verbal/internal); stages = Inf+update; formal = yes (theoretical framework); practitioner = partial (benchmarks); feedback safety = not claimed.
- What ours adds: their signals are all self-generated and internal; we cover externally grounded and adversarially supplied verbal feedback and the trained reward stack.

### 31. LLMs-as-Judges: A Comprehensive Survey on LLM-based Evaluation Methods
- arXiv: 2412.05579, 2024 (Li, Haitao et al.). NEW.
- Method summary: Surveys the LLMs-as-judges paradigm from five perspectives: functionality (why), methodology (how to build), applications (where), meta-evaluation (how to evaluate judges), and limitations. Emphasizes effectiveness, task generality, and interpretability of natural-language judgments; maintains a living resource list.
- Signal type: judge evaluations (scores + natural-language justification).
- Lifecycle stage: inference/evaluation.
- Section mapping: S13; producer-side related work for S7/S11 (third judge survey on the shelf; the trio shows how crowded the producer side is versus the consumer side).
- Key claim: a five-perspective decomposition (why/how/where/meta-evaluation/limitations) organizes LLM-judge research end to end.
- Comparison row: axis = five perspectives; feedback = scalar + verbal judgments; stages = Inf/eval; formal = no; practitioner = partial; feedback safety = partial (limitations analysis).
- What ours adds: as with rows 17-18: we take the judgment as input to grounding/deliberation/learning rather than as the end product.

### 32. A Survey of Reinforcement Learning for Large Reasoning Models
- arXiv: 2509.08827, 2025 (Zhang, Kaiyan et al., 39 authors; Tsinghua C3I). NEW.
- Method summary: Surveys RL for reasoning LLMs, especially since DeepSeek-R1: foundational components (reward design, policy optimization, sampling/training data), core contested problems, training resources, infrastructure, and downstream applications. Frames further scaling of RL for LRMs as facing foundational challenges in compute, algorithm design, data, and infrastructure, and asks how to scale toward ASI.
- Signal type: verifiable/scalar rewards; process rewards within reward-design component.
- Lifecycle stage: training.
- Section mapping: S13; scale benchmark for S6/S7 related work (the "big RL" survey our verbal-signal story must be positioned against).
- Key claim: RL is now the foundational methodology for turning LLMs into reasoning models, and its next bottlenecks are compute, algorithms, data, and infrastructure rather than proof of concept.
- Comparison row: axis = RL component + open problems; feedback = verifiable/scalar; stages = Tr; formal = no; practitioner = partial (resources/infrastructure); feedback safety = not claimed.
- What ours adds: their reward-design chapter treats language feedback as an implementation of reward; we treat scalarization itself as the design decision to interrogate.

### 33. Towards Large Reasoning Models: A Survey of Reinforced Reasoning with Large Language Models
- arXiv: 2501.09686, 2025 (Xu, Fengli et al., 20 authors). NEW.
- Method summary: Reviews the path to large reasoning models via the "thought" concept (token sequences of intermediate steps): automated data construction, learning-to-reason techniques (RL with trial-and-error search generating training trajectories), and test-time scaling. Analyzes open-source LRM projects; frames o1-style train-time plus test-time scaling as a new frontier.
- Signal type: RL rewards over thought trajectories; not signal-typed.
- Lifecycle stage: training and inference.
- Section mapping: S13.
- Key claim: automated trajectory construction + learning-to-reason + test-time thinking jointly define the road to large reasoning models.
- Comparison row: axis = technical component; feedback = scalar RL; stages = Tr+Inf; formal = no; practitioner = partial (open-source project analysis); feedback safety = not claimed.
- What ours adds: thoughts are verbal but their supervision in this literature is scalar; our survey covers verbal supervision of verbal thought, the quadrant this survey leaves empty.

### 34. Agent-as-a-Judge
- arXiv: 2601.05111, 2026 (You, Runyang et al.). NEW.
- Method summary: First comprehensive survey of the shift from LLM-as-a-Judge to Agent-as-a-Judge, where judges gain planning, tool-augmented verification, multi-agent collaboration, and persistent memory to overcome bias, shallow single-pass reasoning, and lack of real-world verification. Identifies dimensions characterizing the paradigm shift, builds a developmental taxonomy, organizes methodologies and applications across general and professional domains, and charts frontier challenges.
- Signal type: agentic evaluation outputs (verbal, tool-verified).
- Lifecycle stage: inference/evaluation.
- Section mapping: S13; forward-looking producer-side row (S7/S11); pairs with our S12 concern that stronger judges are also richer attack surfaces.
- Key claim: agentic judges (planning, tools, collaboration, memory) are the successor paradigm to single-pass LLM judges for complex, multi-step evaluands.
- Comparison row: axis = judge capability dimension; feedback = verbal/verifiable judgments; stages = Inf/eval; formal = partial (developmental taxonomy); practitioner = partial (roadmap); feedback safety = partial (bias motivation; frontier challenges).
- What ours adds: judge agency raises the stakes of our feedback-safety pillar: a tool-using judge is a feedback channel with an attack surface, which none of the judge surveys treats as a first-class problem.

---

## How this thread answers the ARR weaknesses

- (f) no comparison with prior surveys: the 34-row table above is the direct fix; the one-line contrast per row gives the "what we add" column.
- (e) no practitioner guidance: rows show only a handful of shelf neighbors offer real guidance (zhang2025testtime, srivastava2025technical, surana2026generate diagnostic index, ji2025survey); S13 should match surana2026generate's diagnostic-index pattern but keyed by signal type, not rollout stage.
- (c) cross-pillar decision rules: wei2025unifying's formal transient-vs-durable reward distinction is the citable precedent for our inference-vs-training boundary rule; extend it from rewards to all verbal signals.
- (d) RL-theoretic shallowness: match the register of zhang2025landscape (MDP/POMDP), li2025survey (MDP unification), liu2026reinforcement (statistical), srivastava2025technical (failure-mode analysis) in S2/S8.
- (a)/(b) scope and term collision: position VRL against feng2024natural (NLRL) and luketina2019survey explicitly; state that Reflexion's coinage (verbal RL for self-reflective agents) is the inference-stage cell of our taxonomy, NLRL is a training-stage formal instantiation, and our survey is the signal-centric umbrella over both.

## Bib fragment

31 new entries (25 seeds minus 3 already cited, plus 9 discovered) in `T9_comparison_surveys.bib` next to this file. Already-cited, no new entry: kamoi2024can (2406.01297; note duplicate kamoi2024whencan in references.bib should be merged), zhang2025survey (2404.13501), luketina2019survey (1906.03926).
