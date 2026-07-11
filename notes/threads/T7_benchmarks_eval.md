# T7. Benchmarks and evaluation of feedback quality and utilization (feeds S11)

Thread notes for the CSUR expansion. 33 papers total: 21 seeds from `expansion_thread_map.md` plus 12 discovered via HF paper_search. Every canonical title, author list, and abstract below was verified on the paper's arxiv.org/abs page on 2026-07-11; key claims come from the papers' own abstracts (no numbers are reported that the abstract does not state). Only CriticBench (2402.14809) is already in `paper-acl/references.bib` (as `lin2024criticbench`); all other entries are new and appear in `T7_benchmarks_eval.bib`.

Reviewer weaknesses this thread feeds: (g) "no synthesis/benchmark" (Q27s-7, bnae-2), since S11 can now synthesize what feedback-quality benchmarks agree on; (e) practitioner guidance (3gqM-3), since several papers directly test which feedback signals help downstream; (k) limitations of language feedback, since Feedback Friction, JETTS, and the verifier-robustness studies document where verbal feedback fails to be absorbed or measured.

Organization: A. reward-model benchmarks (outcome preference); B. judge meta-evaluation and reliability; C. critique-quality benchmarks; D. process-level and verifier benchmarks; E. interactive feedback-utilization environments.

---

## A. Reward-model benchmarks (outcome preference signal)

### RewardBench: Evaluating Reward Models for Language Modeling
- arXiv: 2403.13787 (2024). NEW (not in references.bib). Bib key: `lambert2024rewardbench`.
- Method: first broad benchmark dataset and codebase for evaluating reward models. Collects prompt-chosen-rejected trios spanning chat, reasoning, and safety, with comparison sets built around subtle but verifiable reasons (bugs, incorrect facts) why one answer beats another. A public leaderboard scores RMs trained via direct classifier MLE and via implicit DPO reward modeling.
- Signal type: scalar preference (pairwise chosen/rejected).
- Lifecycle stage: training (RLHF reward) and inference (response selection); the benchmark itself is evaluation infrastructure.
- Section: S11 (anchor for the reward-benchmark subsection); cross-ref S7 verbal reward stack.
- Key claim: reports findings on refusal propensity, reasoning limitations, and instruction-following shortcomings across reward models, framing RM evaluation as a window into which values RLHF embeds.

### RewardBench 2: Advancing Reward Model Evaluation
- arXiv: 2506.01937 (2025). NEW. Bib key: `malik2025rewardbench`.
- Method: successor multi-skill RM benchmark built from new human prompts rather than prompts recycled from downstream evals, targeting accuracy-based evaluation that is harder and better correlated with downstream use. Quantifies how benchmark performance correlates with RM utility in best-of-N sampling and in PPO-based RLHF training.
- Signal type: scalar preference.
- Lifecycle stage: training and inference-time selection.
- Section: S11; cross-ref S7.
- Key claim: models score about 20 points lower on average than on the first RewardBench while the benchmark remains highly correlated with downstream performance.

### RM-Bench: Benchmarking Reward Models of Language Models with Subtlety and Style
- arXiv: 2410.16184 (2024). NEW. Bib key: `liu2024rmbench`.
- Method: evaluates RMs on sensitivity to subtle content differences and resistance to style biases, instead of distinguishing responses from models of different strength. Evaluates nearly 40 reward models and correlates benchmark scores with policy-model performance.
- Signal type: scalar preference (with style/content controls).
- Lifecycle stage: training (RM selection for alignment).
- Section: S11; feeds the S11 discussion of what current RM benchmarks fail to measure.
- Key claim: even state-of-the-art RMs average only 46.6% under style-bias interference, below the 50% random level; RM-Bench scores correlate strongly with policy performance.

### Evaluating Robustness of Reward Models for Mathematical Reasoning (RewardMATH)
- arXiv: 2410.01729 (2024). NEW. Bib key: `kim2024evaluating`.
- Method: shows the math subset of RewardBench relies on a single chosen/rejected comparison with representation mismatches, then proposes a one-to-many benchmark design (RewardMATH) that better represents RM robustness in mathematical reasoning.
- Signal type: scalar preference over math solutions.
- Lifecycle stage: training (reward for reasoning RL) and inference (solution reranking).
- Section: S11; pairs with ProcessBench/PRMBench for the math-feedback reliability story.
- Key claim: RewardMATH scores strongly correlate with optimized-policy results and estimate reward overoptimization, whereas the existing benchmark shows almost no correlation.

### RMB: Comprehensively Benchmarking Reward Models in LLM Alignment
- arXiv: 2410.09893 (2024). NEW (discovered). Bib key: `zhou2024rmb`.
- Method: RM benchmark covering more than 49 real-world scenarios with both pairwise and best-of-N evaluation, designed so benchmark scores track alignment outcomes. Analyzes state-of-the-art RMs, majority-voting evaluation, and the factors that drive generative RMs (evaluation criteria, instructing methods).
- Signal type: scalar preference plus generative-RM verdicts.
- Lifecycle stage: training and inference-time best-of-N.
- Section: S11; cross-ref S7 (generative RMs).
- Key claim: demonstrates a positive correlation between the benchmark and downstream alignment performance, exposes generalization defects earlier benchmarks missed, and highlights the potential of generative RMs.

### How to Evaluate Reward Models for RLHF (PPE)
- arXiv: 2410.14872 (2024). NEW (discovered). Bib key: `frick2024how`.
- Method: builds a predictive model of downstream post-RLHF performance from proxy tasks: a large-scale human-preference dataset and a verifiable-correctness preference dataset with 12 metrics across 12 domains. Validates against a gold standard by running an end-to-end RLHF experiment on a large crowdsourced human-preference platform.
- Signal type: scalar preference (human and correctness-verifiable).
- Lifecycle stage: training.
- Section: S11; the methodological anchor for "does the benchmark predict downstream utility", which is the synthesis question S11 should pose.
- Key claim: compiles Preference Proxy Evaluations (PPE), the first RM benchmark explicitly linked to real post-RLHF human-preference performance.

### Personalized RewardBench: Evaluating Reward Models with Human Aligned Personalization
- arXiv: 2604.07343 (2026). NEW (discovered). Bib key: `ma2026personalized`.
- Method: benchmark for pluralistic alignment that constructs chosen/rejected pairs by strict adherence to (or violation of) user-specific rubrics, with human evaluation confirming that personal preference, not general quality, is the discriminative factor.
- Signal type: preference conditioned on user-specific rubrics.
- Lifecycle stage: training and inference-time selection.
- Section: S11; also feeds the S13 agenda item on personalized feedback.
- Key claim: state-of-the-art RMs struggle with personalization, peaking at 75.94% accuracy, while the benchmark correlates with downstream best-of-N (and policy-optimization) performance more strongly than existing benchmarks.

### IF-RewardBench: Benchmarking Judge Models for Instruction-Following Evaluation
- arXiv: 2603.04738 (2026). NEW. Bib key: `wen2026ifrewardbench`.
- Method: meta-evaluation benchmark for instruction-following judges that builds, for each instruction, a preference graph containing all pairwise preferences among multiple responses, enabling listwise evaluation of a judge's ability to rank many responses rather than only pick between two.
- Signal type: judge verdict / listwise preference.
- Lifecycle stage: training (alignment feedback) and inference-time ranking.
- Section: S11; bridges to S7 (judges as reward sources).
- Key claim: reveals significant deficiencies in current judge models and achieves stronger positive correlation with downstream task performance than existing benchmarks.

---

## B. Judge meta-evaluation and reliability

### Evaluating Large Language Models at Evaluating Instruction Following (LLMBar)
- arXiv: 2310.07641 (2023). NEW. Bib key: `zeng2023evaluating`.
- Method: meta-evaluation benchmark of 419 manually curated output pairs where one output follows the instruction and the other deviates but has deceptive surface qualities (e.g., a more engaging tone). Tests evaluator combinations of LLMs and prompts, plus a suite of prompting strategies that narrow the gap to human evaluators.
- Signal type: judge verdict (instruction-following preference).
- Lifecycle stage: inference (evaluation of outputs); meta-level.
- Section: S11.
- Key claim: contrary to prior meta-evaluations, different evaluators show distinct performance on LLMBar and even the best leave substantial room for improvement.

### JudgeBench: A Benchmark for Evaluating LLM-based Judges
- arXiv: 2410.12784 (2024). NEW. Bib key: `tan2024judgebench`.
- Method: converts existing difficult datasets into challenging response pairs whose preference labels reflect objective correctness (knowledge, reasoning, math, coding), decoupling judge evaluation from crowd preference. Evaluates prompted judges, fine-tuned judges, multi-agent judges, and reward models.
- Signal type: judge verdict / preference-with-rationale.
- Lifecycle stage: inference; meta-level.
- Section: S11 (core meta-eval anchor); cross-ref S12 (judge reliability as an attack surface).
- Key claim: JudgeBench is significantly harder than prior benchmarks, with strong models such as GPT-4o performing only slightly better than random guessing.

### Justice or Prejudice? Quantifying Biases in LLM-as-a-Judge (CALM)
- arXiv: 2410.02736 (2024). NEW (discovered). Bib key: `ye2024justice`.
- Method: identifies 12 key potential biases in LLM-as-a-judge and proposes CALM, an automated bias-quantification framework that applies principle-guided modifications to inputs and measures verdict shifts across popular models.
- Signal type: judge verdict (bias analysis of the signal).
- Lifecycle stage: inference; meta-level.
- Section: S11; cross-ref S12 (biased feedback as a safety issue).
- Key claim: advanced judges achieve commendable overall performance but significant biases persist in specific tasks, so judge reliability still has room for improvement.

### MM-Eval: A Multilingual Meta-Evaluation Benchmark for LLM-as-a-Judge and Reward Models
- arXiv: 2410.17578 (2024). NEW (discovered). Bib key: `son2024mmeval`.
- Method: multilingual meta-evaluation benchmark with five core subsets covering 18 languages plus a Language Consistency subset spanning 122 languages, designed around multilingual-specific challenges rather than translated English benchmarks. Also evaluates consistency and fairness of absolute score values, not just pairwise ranking accuracy.
- Signal type: judge verdict and scalar reward across languages.
- Lifecycle stage: inference; meta-level.
- Section: S11; directly answers the reviewers' "verbal promises more than text-only/English" breadth concern (weakness h) inside the evaluation section.
- Key claim: evaluator LLMs that excel in English contexts have considerable room for improvement when assessing non-English text.

### Are We on the Right Way to Assessing LLM-as-a-Judge? (Sage)
- arXiv: 2512.16041 (2025). NEW (discovered). Bib key: `feng2025are`.
- Method: Sage is a human-annotation-free evaluation suite for LLM judges based on rational choice theory: it measures local self-consistency (pairwise preference stability) and global logical consistency (transitivity across a full preference set) over 650 questions mixing benchmark problems and real user queries.
- Signal type: judge verdict (consistency audit).
- Lifecycle stage: inference; meta-level.
- Section: S11; gives S11 a second axis (consistency) beyond accuracy-against-labels.
- Key claim: metrics are stable and correlate highly with supervised benchmarks like LLMBar and RewardBench 2, yet top models (Gemini-2.5-Pro, GPT-5) fail to maintain consistent preferences in nearly a quarter of difficult cases.

### When Judgment Becomes Noise: How Design Failures in LLM Judge Benchmarks Silently Undermine Validity
- arXiv: 2509.20293 (2025). NEW (discovered). Bib key: `feuer2025when`.
- Method: introduces two diagnostics for LLM-judged benchmarks: schematic adherence (how much of a verdict the explicit evaluation schema explains) and psychometric validity (internal consistency plus discriminant validity), then applies them to Arena-Hard Auto.
- Signal type: judge verdict (benchmark-design audit).
- Lifecycle stage: meta-level (evaluation of evaluation).
- Section: S11; the cautionary methodological piece for how S11 itself should read leaderboards.
- Key claim: finds severe schema incoherence and factor collapse (unexplained variance above 90% for DeepSeek-R1-32B as judge; factor correlations above 0.93 for most criteria) and shows ELO-style aggregation masks genuine ranking uncertainty.

### BiasScope: Towards Automated Detection of Bias in LLM-as-a-Judge Evaluation
- arXiv: 2602.09383 (2026). NEW (discovered). Bib key: `lai2026biasscope`.
- Method: an LLM-driven framework that automatically discovers unknown judge biases at scale, replacing manual, predefined bias lists with active exploration; validated across model families and scales on JudgeBench, and used to build JudgeBench-Pro, a harder robustness benchmark.
- Signal type: judge verdict (automated bias discovery).
- Lifecycle stage: inference; meta-level.
- Section: S11; cross-ref S12 (systematically discoverable judge weaknesses are also attack surfaces).
- Key claim: even powerful LLM evaluators show error rates above 50% on JudgeBench-Pro.

### SCAN: Structured Capability Assessment and Navigation for LLMs
- arXiv: 2505.06698 (2025). NEW. Bib key: `wang2025scan`.
- Alias note: listed in the thread map as "Feedbacker"; the v1 arXiv title was "From Rankings to Insights: Evaluation Should Shift Focus from Leaderboard to Feedback" (verified on the abs v1 page). Cite under the current canonical title SCAN.
- Method: a framework for fine-grained capability characterization rather than leaderboard ranking: TaxBuilder extracts capability tags into a hierarchical taxonomy, RealMix synthesizes and filters queries per tag, visualization tools support navigation, and a PC^2 (pre-comparison-derived criteria) LLM-as-a-judge scores responses.
- Signal type: rubric/criteria-based judge verdict producing fine-grained feedback reports.
- Lifecycle stage: inference; meta-level (model diagnosis).
- Section: S11; supports the S11 argument that evaluation should return verbal, actionable feedback rather than a scalar rank.
- Key claim: the PC^2 judge achieves significantly higher accuracy than the classic LLM-as-a-judge approach, and evaluation of 21 mainstream LLMs reveals substantial variation even within sub-capabilities of the same category.

### Evaluating Judges as Evaluators: The JETTS Benchmark of LLM-as-Judges as Test-Time Scaling Evaluators
- arXiv: 2504.15253 (2025). NEW. Bib key: `zhou2025evaluating`.
- Method: benchmarks judges specifically in test-time scaling roles across math, code, and instruction following, in three settings: response reranking, step-level beam search, and critique-based response refinement. Evaluates 10 judges (7B-70B) paired with 8 generators (6.7B-72B).
- Signal type: judge verdict plus natural-language critique, used operationally at inference.
- Lifecycle stage: inference (test-time scaling).
- Section: S11; the key bridge between S11 and S5 (deliberative pillar), because it measures whether judge feedback actually helps deliberation.
- Key claim: judges are competitive with outcome reward models for reranking but consistently worse than process reward models in beam search, and their natural-language critiques are currently ineffective at guiding generators to better responses.

---

## C. Critique-quality benchmarks

### CriticBench: Benchmarking LLMs for Critique-Correct Reasoning [ALREADY-CITED]
- arXiv: 2402.14809 (2024). In references.bib as `lin2024criticbench`. No new bib entry.
- Method: assesses generation, critique, and correction (GQC) across five reasoning domains (math, commonsense, symbolic, coding, algorithmic), compiling 15 datasets and responses from three LLM families, with 17 LLMs evaluated.
- Signal type: critique (and correction it induces).
- Lifecycle stage: inference (self- and cross-correction).
- Section: S11; already the survey's critique-benchmark citation, now situated among successors.
- Key claim: GQC capabilities are linearly related and critique-focused training helps; logic-oriented tasks are more correctable; stronger models critique weaker ones better, while weaker models can surpass stronger ones at self-critique.

### CriticEval: Evaluating Large Language Model as Critic
- arXiv: 2402.13764 (2024). NEW. Bib key: `lan2024criticeval`.
- Method: evaluates critique ability along four dimensions across nine task scenarios, covering both scalar-valued and textual critiques of responses of varying quality. Reliability comes from a large set of human-annotated reference critiques that let GPT-4 grade textual critiques dependably.
- Signal type: critique (scalar and textual).
- Lifecycle stage: inference.
- Section: S11.
- Key claim: validates the reliability of its evaluation protocol and finds promising open-source critique ability plus relationships between critique quality and task type, response quality, and critique dimension.

### RealCritic: Towards Effectiveness-Driven Evaluation of Language Model Critiques
- arXiv: 2501.14492 (2025). NEW. Bib key: `tang2025realcritic`.
- Method: closed-loop critique benchmark: critique quality is measured by the quality of corrections generated from the critique, rather than by rating critique text in an open loop. Implements self-critique, cross-critique, and iterative critique over eight challenging reasoning tasks.
- Signal type: critique (utility-grounded).
- Lifecycle stage: inference.
- Section: S11; methodologically important for S11's synthesis, since it operationalizes "feedback utilization" as the metric.
- Key claim: classical LLMs with comparable direct chain-of-thought performance lag the reasoning model o1-mini across all critique scenarios, and in self-critique and iterative settings classical LLMs can fall below their own baselines.

### CodeCriticBench: A Holistic Code Critique Benchmark for Large Language Models
- arXiv: 2502.16614 (2025). NEW. Bib key: `zhang2025codecriticbench`.
- Method: code-domain critique benchmark spanning code generation and code QA at multiple difficulty levels, with basic critique evaluation plus advanced evaluation scored against fine-grained checklists.
- Signal type: critique (code), rubric/checklist-scored.
- Lifecycle stage: inference.
- Section: S11; pairs with ConvCodeWorld for the coding-feedback sub-story.
- Key claim: existing critique benchmarks under-test code tasks and use relatively easy queries; extensive experiments across LLMs show the benchmark's effectiveness at separating critique capability.

### Feedback Friction: LLMs Struggle to Fully Incorporate External Feedback
- arXiv: 2506.11930 (2025). NEW. Bib key: `jiang2025feedback`.
- Method: controlled solver-feedback loop where a feedback generator with access to near-complete ground-truth answers produces targeted feedback and the solver retries, across math, knowledge, scientific reasoning, and multi-domain tasks, including Claude 3.7 with extended thinking. Tests mitigation via progressive temperature increases and explicit rejection of previously attempted wrong answers.
- Signal type: critique/instruction (near-oracle external feedback).
- Lifecycle stage: inference (feedback incorporation).
- Section: S11; also feeds S13's limitations discussion (reviewer weakness k) as the cleanest evidence that feedback utilization, not feedback quality, can be the bottleneck.
- Key claim: even under near-ideal feedback conditions solver models consistently resist feedback ("feedback friction"); sampling-based mitigations improve but do not reach target performance, and the abstract ties friction to model confidence measured by semantic entropy.

---

## D. Process-level and verifier benchmarks

### ProcessBench: Identifying Process Errors in Mathematical Reasoning
- arXiv: 2412.06559 (2024). NEW. Bib key: `zheng2024processbench`.
- Method: 3,400 test cases of competition- and Olympiad-level math with expert-annotated step-level error locations; models must identify the earliest erroneous step or declare the solution correct. Compares process reward models against prompted critic models.
- Signal type: process/step-level reward and critique.
- Lifecycle stage: training (PRM supervision) and inference (step verification).
- Section: S11; anchor for process-supervision evaluation, cross-ref S7/S8.
- Key claim: existing PRMs fail to generalize beyond GSM8K/MATH-style problems and underperform both prompted critic models and a PRM fine-tuned on PRM800K; QwQ-32B-Preview critiques competitively with GPT-4o but lags o1-mini.

### PRMBench: A Fine-grained and Challenging Benchmark for Process-Level Reward Models
- arXiv: 2501.03124 (2025). NEW. Bib key: `song2025prmbench`.
- Method: 6,216 problems with 83,456 step-level labels evaluating PRMs along fine-grained error dimensions (simplicity, soundness, sensitivity), covering implicit error types beyond binary step correctness. Evaluates 15 models, both open-source PRMs and closed-source LLMs prompted as critics.
- Signal type: process/step-level reward.
- Lifecycle stage: training and inference.
- Section: S11; cross-ref S7.
- Key claim: uncovers significant weaknesses in current PRMs on fine-grained error detection, underscoring the challenge of process-level evaluation.

### ToolComp: A Multi-Tool Reasoning & Process Supervision Benchmark
- arXiv: 2501.01290 (2025). NEW. Bib key: `nath2025toolcomp`.
- Method: benchmark for multi-step, multi-tool reasoning built via model-human collaboration, with human-edited/verified prompts, final answers, and process-supervision labels so both outcomes and intermediate steps can be scored. Also compares outcome-supervised vs process-supervised reward models trained on synthetic data.
- Signal type: process supervision labels over tool-use trajectories.
- Lifecycle stage: training (ORM/PRM training) and inference (trajectory ranking).
- Section: S11; cross-ref S8 (credit assignment along trajectories) and S10 grounding via tools.
- Key claim: most models score below 50% accuracy; PRMs generalize better than ORMs, with 19% and 11% rank@1 gains for ranking base and fine-tuned model trajectories respectively.

### VerifyBench: Benchmarking Reference-based Reward Systems for Large Language Models
- arXiv: 2505.15801 (2025). NEW (discovered). Bib key: `yan2025verifybench`.
- Method: two human-annotated benchmarks (VerifyBench and the harder VerifyBench-Hard) that evaluate reference-based reward systems, i.e., the verifiers that compare model outputs against ground-truth references in RLVR-style reasoning training, filling the gap left by preference-comparison benchmarks.
- Signal type: verifier verdict (reference-based reward).
- Lifecycle stage: training (RLVR reward) and inference (answer checking).
- Section: S11; cross-ref S7 (RLVR row of the verbal reward stack).
- Key claim: larger model-based verifiers show promise on standard cases, but all current systems leave substantial room for improvement on challenging instances.

### From Accuracy to Robustness: A Study of Rule- and Model-based Verifiers in Mathematical Reasoning
- arXiv: 2505.22203 (2025). NEW (discovered). Bib key: `huang2025from`.
- Alias note: HF/earlier listings title it "Pitfalls of Rule- and Model-based Verifiers"; the current abs page title is as above.
- Method: case study of verifier reliability in math RLVR, analyzing rule-based and model-based verifiers in both static evaluation and live RL training.
- Signal type: verifier verdict.
- Lifecycle stage: training (reward reliability during RL).
- Section: S11; also feeds S12 (verifier hacking) and S13 practitioner guidance (which verifier to use when).
- Key claim: open-source rule-based verifiers miss equivalent answers in different formats, producing non-negligible false negatives that hurt RL more as the policy strengthens; model-based verifiers are more accurate statically but highly susceptible to hacking, especially after fine-tuning.

---

## E. Interactive feedback-utilization environments

### MINT: Evaluating LLMs in Multi-turn Interaction with Tools and Language Feedback
- arXiv: 2309.10691 (2023). NEW. Bib key: `wang2023mint`.
- Method: benchmark where LLMs solve reasoning, coding, and decision-making tasks over multiple turns, using tools via Python code execution and receiving GPT-4-simulated natural-language user feedback; 20 open- and closed-source LLMs analyzed.
- Signal type: instruction plus turn-level natural-language feedback (with tool/execution feedback).
- Lifecycle stage: inference (multi-turn interaction).
- Section: S11; an early quantification of the marginal value of verbal feedback, useful as the S11 baseline row.
- Key claim: tools add 1-8% absolute per turn and natural-language feedback adds 2-17%, while better single-turn performance does not guarantee better multi-turn performance.

### ConvCodeWorld: Benchmarking Conversational Code Generation in Reproducible Feedback Environments
- arXiv: 2502.19852 (2025). NEW. Bib key: `han2025convcodeworld`.
- Method: reproducible interactive code-generation environment simulating nine scenarios that systematically combine compilation feedback, execution feedback with varying test coverage, and verbal feedback generated by GPT-4o at different expertise levels; ConvCodeBench is a static variant using pre-generated feedback logs.
- Signal type: mixed compiler/execution/verbal feedback (controlled feedback-quality axes).
- Lifecycle stage: inference (multi-turn code repair).
- Section: S11; the cleanest controlled design for the S11 claim that feedback quality is a first-class experimental variable.
- Key claim: LLM performance varies significantly with feedback type; weaker LLMs with sufficient feedback can outperform single-turn results of state-of-the-art LLMs; the static benchmark preserves Spearman rank correlations of 0.82-0.99 with the live environment.

### LLF-Bench: Benchmark for Interactive Learning from Language Feedback
- arXiv: 2312.06853 (2023). NEW. Bib key: `cheng2023llfbench`.
- Method: a diverse suite of sequential decision-making tasks (user recommendation, poem writing, navigation, robot control) where the agent must solve tasks from natural-language instructions and post-action language feedback, never numeric reward. Applies paraphrasing and environment randomization so agents cannot rely on task familiarity and must be robust to different verbalizations.
- Signal type: instruction plus language feedback replacing reward.
- Lifecycle stage: inference-time interactive learning (no weight updates).
- Section: S11; also motivates S2's formal framework, since it operationalizes "learning from language feedback" as a benchmarkable protocol.
- Key claim: existing interactive benchmarks either use numeric rewards or require no learning; LLF-Bench fills this omission for verbal-feedback learning.

### AgentRewardBench: Evaluating Automatic Evaluations of Web Agent Trajectories
- arXiv: 2504.08942 (2025). NEW (discovered). Bib key: `lu2025agentrewardbench`.
- Method: first benchmark assessing LLM judges of web-agent trajectories: 1,302 trajectories across 5 web benchmarks and 4 LLM agents, each expert-annotated for success, side effects, and repetitiveness; 12 LLM judges evaluated against expert labels.
- Signal type: judge verdict over agent trajectories.
- Lifecycle stage: inference (trajectory evaluation) with training implications (judges as reward for agent RL).
- Section: S11; cross-ref S10 (embodied/web agents) and S8 (trajectory-level credit).
- Key claim: no single LLM judge excels across all benchmarks, and the rule-based evaluation used by common benchmarks underreports web-agent success rates.

### Aligning Agents via Planning: A Benchmark for Trajectory-Level Reward Modeling (Plan-RewardBench)
- arXiv: 2604.08178 (2026). NEW (discovered). Bib key: `wang2026aligning`.
- Method: trajectory-level preference benchmark for tool-integrated agents covering four task families (safety refusal, tool-irrelevance/unavailability, complex planning, robust error recovery), with validated positive trajectories and confusable hard negatives built from multi-model rollouts, rule-based perturbations, and minimal-edit LLM perturbations. Benchmarks generative RMs, discriminative RMs, and LLM-as-judge under one pairwise protocol.
- Signal type: trajectory-level preference.
- Lifecycle stage: training (agent alignment reward) and inference (trajectory selection).
- Section: S11; cross-ref S8.
- Key claim: all three evaluator families face substantial challenges on long-horizon, tool-integrated trajectory judgment, with diagnostic analyses of prevalent failure modes.

### Evaluating Memory in LLM Agents via Incremental Multi-Turn Interactions (MemoryAgentBench)
- arXiv: 2507.05257 (2025). NEW. Bib key: `hu2025evaluating`.
- Method: defines four core memory-agent competencies from memory/cognitive science (accurate retrieval, test-time learning, long-range understanding, selective forgetting) and converts long-context datasets plus new datasets into an incremental multi-turn format that simulates how memory agents actually accumulate information.
- Signal type: memory (persistence and utilization of accumulated verbal experience).
- Lifecycle stage: inference across episodes (cross-episode memory), evaluated behaviorally.
- Section: S11; the evaluation counterpart to T4's memory-agent methods; cross-ref the memory subsection of S5/S6 and the pqAY-2 boundary discussion (memory as within- vs across-episode feedback).
- Key claim: no prior benchmark covers all four competencies; MemoryAgentBench provides a systematic, challenging testbed for memory quality in agents.

---

## Synthesis hooks for S11 (what this thread lets the expanded survey argue)

1. Benchmark validity is itself contested: RewardMATH, RM-Bench, PPE, RMB, and Personalized RewardBench all argue accuracy-style RM benchmarks can decorrelate from downstream alignment utility, and When Judgment Becomes Noise plus Sage show judge benchmarks and judges can be internally inconsistent. S11 should organize benchmarks by whether they validate against downstream utility.
2. Utilization is a separate axis from quality: RealCritic, JETTS, MINT, ConvCodeWorld, and Feedback Friction measure whether feedback helps the receiver, not whether it looks right; Feedback Friction shows even near-oracle feedback is under-absorbed. This directly answers reviewer demand (g) for synthesis and (k) for limitations.
3. Signal-type coverage maps onto the survey taxonomy: outcome preference (A), judge verdict (B), critique (C), process/verifier (D), interactive/memory (E) mirror the S6/S7 signal families, so S11 can present one benchmark table indexed by signal type and lifecycle stage.
4. 2026 frontier: personalization (Personalized RewardBench), listwise judging (IF-RewardBench), automated bias discovery (BiasScope), and trajectory-level reward (Plan-RewardBench) mark where evaluation is heading; good closing paragraph for S11 and agenda fodder for S13.
