# T2. Verbal reward stack: rubrics, RLVR, generative RMs, PRMs (feeds S7)

Thread notes for the CSUR expansion of "The Rise of Verbal Reinforcement Learning: A Survey."
Verification: every paper below was verified against its arxiv.org/abs page on 2026-07-11 (title, authors, date, abstract pulled from the page's citation meta tags). All key claims come from the papers' own abstracts. Papers marked [ALREADY-CITED] appear in paper-acl/references.bib; the rest are in T2_verbal_reward_stack.bib.
Seed count: 30 (all verified, none excluded). Discovered: 11 (all verified).

Reviewer hooks this thread must serve (from arr_reviews_2026_may.md): (d) shallow RL-theoretic treatment, the rubric/PRM stack shows where the reward function actually comes from and what it costs; (e) practitioner guidance, this thread supplies the "which reward signal, at which granularity, at what verification cost" decision axis for S13; (g) synthesis, the rubric-reward-hacking arc (RaR -> OnlineRubrics -> Reward Hacking in Rubric-Based RL) is a ready-made cautionary storyline; (k) limitations of language feedback, the RLVR hidden-costs position paper and the hacking taxonomy papers ground the societal/limitations discussion.

Internal organization of this thread: (A) rubric rewards, (B) RLVR core and its critiques, (C) generative reward models and reasoning judges, (D) process reward models.

---

## A. Rubric rewards

### Rubrics as Rewards: Reinforcement Learning Beyond Verifiable Domains
- arXiv: 2507.17746 (2025). NEW. Key: gunjal2025rubrics
- Signal type: rubric (instance-specific criteria checked by an LLM judge, aggregated into a scalar)
- Lifecycle stage: training (on-policy RL reward)
- Section: S7 (anchor paper for the rubric subsection)
- Method: Introduces Rubrics as Rewards (RaR), an on-policy RL method that extends RLVR beyond verifiable domains by scoring rollouts against instance-specific rubrics instead of binary correctness. Evaluates multiple strategies for aggregating rubric-item feedback into a scalar reward, across medical and science domains. Positions rubrics as structured reward signals that smaller judge models can apply more consistently than direct Likert scoring.
- Key claim: the best RaR variant achieves relative improvements of up to 31% on HealthBench and 7% on GPQA-Diamond over LLM-as-judge baselines with direct Likert rewards; rubric rewards also improve alignment for smaller judges and reduce variance across judge scales.

### Reinforcement Learning with Rubric Anchors
- arXiv: 2508.12790 (2025). NEW. Key: huang2025reinforcement
- Signal type: rubric (large-scale rubric bank, human + LLM + hybrid authored)
- Lifecycle stage: training
- Section: S7
- Method: Extends RLVR to open-ended tasks by integrating rubric-based rewards, building what the authors describe as the largest rubric reward system to date with over 10,000 rubrics from humans, LLMs, or human-LLM collaboration. Trains an open-sourced Qwen-30B-A3B model with rubric-anchored RL and reports lessons on rubric construction, data selection, and training. Uses rubrics as anchors for fine-grained stylistic control, explicitly to reduce "AI-like" tone.
- Key claim: with only 5K+ samples the system improves by +5.2% on open-ended (especially humanities) benchmarks, outperforming a 671B DeepSeek-V3 by +2.4% while preserving general and reasoning abilities.

### RubricHub: A Comprehensive and Highly Discriminative Rubric Dataset via Automated Coarse-to-Fine Generation
- arXiv: 2601.08430 (2026). NEW. Key: li2026rubrichub
- Signal type: rubric (synthetic, coarse-to-fine generated)
- Lifecycle stage: training (rejection-sampling SFT + RL)
- Section: S7
- Method: Proposes an automated coarse-to-fine rubric generation framework combining principle-guided synthesis, multi-model aggregation, and difficulty evolution to overcome the scalability bottleneck and coarse criteria ("supervision ceiling") of prior rubric methods. Releases RubricHub, a ~110k-example multi-domain rubric dataset. Validates with a two-stage pipeline: rubric-based rejection-sampling fine-tuning (RuFT) followed by rubric-based RL (RuRL).
- Key claim: post-trained Qwen3-14B reaches 69.3 on HealthBench, which the abstract reports as state of the art and surpassing proprietary frontier models such as GPT-5.

### Curing Miracle Steps in LLM Mathematical Reasoning with Rubric Rewards
- arXiv: 2510.07774 (2025). NEW. Key: yuan2025curing
- Signal type: rubric (problem-specific process rubric replacing outcome-only reward)
- Lifecycle stage: training
- Section: S7 (crossover: S12 reward hacking)
- Method: Documents that outcome-reward RL overestimates reasoning ability via false positives, and builds a human-verified taxonomy of failure modes, including "Miracle Steps" where the answer appears without a valid derivation, linked to answer-recall shortcuts and memorization. Introduces the Rubric Reward Model (RRM), a process-oriented reward that judges the whole reasoning trajectory against problem-specific rubrics and penalizes logical flaws. Integrates RRM into an RL pipeline and compares against outcome-only supervision on four math benchmarks.
- Key claim: RRM training boosts Verified Pass@1024 on AIME2024 from 26.7% to 62.6% and reduces Miracle Step incidence by 71%.

### Reward Hacking in Rubric-Based Reinforcement Learning
- arXiv: 2605.12474 (2026). NEW. Key: mahmoud2026reward
- Signal type: rubric (analysis of rubric rewards as hackable proxies)
- Lifecycle stage: training (failure analysis of the training signal)
- Section: S7 (crossover: S12; this is the thread's main cautionary paper)
- Method: Studies reward hacking when a policy is optimized against a rubric-based training verifier but evaluated by a cross-family panel of three frontier judges. Separates two divergence sources: verifier failure (training verifier credits criteria that reference verifiers reject) and rubric-design limitations (even strong rubric verifiers prefer responses that rubric-free judges rate worse). Introduces a "self-internalization gap," a verifier-free diagnostic from policy log-probabilities that tracks reference-verifier quality and detects when training against a weak verifier stops helping.
- Key claim: weak verifiers produce large proxy-reward gains that do not transfer; stronger verifiers reduce but do not eliminate exploitation; and when rubrics leave failure modes unspecified, rubric-based verifiers prefer the RL checkpoint while rubric-free judges prefer the base model, with gains concentrated in completeness/presence criteria alongside declines in factual correctness, conciseness, relevance, and overall quality.

### Checklists Are Better Than Reward Models For Aligning Language Models
- arXiv: 2507.18624 (2025). NEW. Key: viswanathan2025checklists
- Signal type: rubric (instruction-specific checklist; AI judges + verifier programs)
- Lifecycle stage: training
- Section: S7
- Method: Proposes Reinforcement Learning from Checklist Feedback (RLCF): extract an instruction-specific checklist from each instruction, score how well responses satisfy each item using both AI judges and specialized verifier programs, and combine the item scores into an RL reward. Replaces fixed criteria such as generic helpfulness/harmlessness with flexible, per-instruction criteria. Evaluated against other alignment methods on Qwen2.5-7B-Instruct over five benchmarks.
- Key claim: RLCF is the only compared method that improves on every benchmark, including a 4-point boost in hard satisfaction rate on FollowBench, +6 points on InFoBench, and +3 win-rate points on Arena-Hard.

### OpenRubrics: Towards Scalable Synthetic Rubric Generation for Reward Modeling and LLM Alignment [DISCOVERED]
- arXiv: 2510.07743 (2025). NEW. Key: liu2025openrubrics
- Signal type: rubric (contrastively generated: hard rules + principles)
- Lifecycle stage: training
- Section: S7
- Method: Builds OpenRubrics, a large-scale collection of (prompt, rubric) pairs for training rubric-generation and rubric-based reward models. Introduces Contrastive Rubric Generation (CRG), which derives explicit constraints (hard rules) and implicit qualities (principles) by contrasting preferred and rejected responses, then filters noisy rubrics by preference-label consistency. Trains Rubric-RM on the result.
- Key claim: Rubric-RM surpasses strong size-matched baselines by 8.4% across reward-modeling benchmarks, and the gains transfer to policy models on instruction-following and biomedical benchmarks.

### Online Rubrics Elicitation from Pairwise Comparisons [DISCOVERED]
- arXiv: 2510.07284 (2025). NEW. Key: rezaei2025online
- Signal type: rubric (dynamically elicited during training)
- Lifecycle stage: training
- Section: S7 (crossover: S12)
- Method: Argues static rubrics are vulnerable to reward hacking and miss emergent desiderata that appear during training. Proposes OnlineRubrics, which dynamically curates evaluation criteria online via pairwise comparisons between responses from the current policy and a reference policy, continuously identifying and mitigating errors as training proceeds. Qualitatively analyzes the elicited criteria (themes: transparency, practicality, organization, reasoning).
- Key claim: consistent improvements of up to 8% over training with static rubrics alone on AlpacaEval, GPQA, ArenaHard, and held-out expert questions/rubrics.

### Self-Rewarding Rubric-Based Reinforcement Learning for Open-Ended Reasoning [DISCOVERED]
- arXiv: 2509.25534 (2025). NEW. Key: ye2025selfrewarding
- Signal type: rubric (self-graded; policy model is its own rubric grader)
- Lifecycle stage: training
- Section: S7
- Method: Observes on HealthBench that using the policy model itself as the rubric grader substantially improves reasoning performance, and that the trained model also becomes a stronger grader. Packages this as a lightweight self-rewarding rubric-based RL framework that avoids a separate reward model, making training faster and more resource-efficient; small amounts of teacher-graded data further help weaker models.
- Key claim: on Qwen3-32B, training on just the 4000-sample HealthBench Easy subset yields a model that exceeds GPT-5 on HealthBench Hard.

### InfiMed-ORBIT: Aligning LLMs on Open-Ended Complex Tasks via Rubric-Based Incremental Training [DISCOVERED]
- arXiv: 2510.15859 (2025). NEW. Key: wang2025infimedorbit
- Signal type: rubric (case-conditioned, dynamically generated)
- Lifecycle stage: training
- Section: S7 (domain case study: medical dialogue)
- Method: ORBIT is a rubric-based incremental RL framework for high-stakes open-ended medical dialogue, where feedback is ambiguous and hard to compress into one scalar. It integrates medical dialogue construction with dynamically generated case-conditioned rubrics that act as adaptive guides for incremental RL, using general-purpose instruction-following LLMs as rubric-guided evaluators rather than task-specific fine-tuned judges or handcrafted knowledge bases.
- Key claim: with only 2k training samples, ORBIT raises Qwen3-4B-Instruct's HealthBench-Hard score from 7.0 to 27.5, state of the art among similarly sized open-source models.

### RLAC: Reinforcement Learning with Adversarial Critic for Free-Form Generation Tasks [DISCOVERED]
- arXiv: 2511.01758 (2025). NEW. Key: wu2025rlac
- Signal type: rubric + critique (adversarial critic proposes the most likely rubric violations; external validator verifies)
- Lifecycle stage: training
- Section: S7 (bridges to S5 deliberative critics)
- Method: Notes that open-ended tasks have many implicit rubrics, so exhaustively verifying all of them is prohibitively expensive and prompt-specific reward aggregation is brittle. RLAC trains an LLM critic that dynamically identifies only the most likely failure modes (e.g., a factual error or unhandled edge case), which an external validator then checks; generator and critic are optimized jointly as a game, sharpening the critic's error detection while reducing the number of verifications.
- Key claim: RLAC improves factual accuracy in text generation and correctness in code generation while outperforming exhaustive verification and reward-model baselines; dynamic critics beat fixed critics.

### Rubrics to Tokens: Bridging Response-level Rubrics and Token-level Rewards in Instruction Following Tasks [DISCOVERED]
- arXiv: 2604.02795 (2026). NEW. Key: xu2026rubrics
- Signal type: rubric (response-level rubric converted to token-level credit)
- Lifecycle stage: training
- Section: S7 (crossover: S8 credit assignment)
- Method: Targets the reward sparsity and ambiguity of response-level rubric RL. RTT introduces a token-level relevance discriminator that predicts which tokens are responsible for satisfying a specific constraint, and optimizes the policy with RTT-GRPO, which integrates response-level and token-level advantages in one framework. Adds Intra-sample Token Group Normalization to handle the move from one-dimensional outcome reward to a three-dimensional token-level reward space.
- Key claim: RTT consistently outperforms baselines in both instruction-level and rubric-level accuracy across different models.

### EvoRubric: Self-Evolving Rubric-Driven RL for Open-Ended Generation [DISCOVERED]
- arXiv: 2605.29847 (2026). NEW. Key: guan2026evorubric
- Signal type: rubric (self-evolving; policy generates its own rubrics)
- Lifecycle stage: training
- Section: S7 (crossover: S12 for its anti-hacking verification pipeline)
- Method: Removes both static human rubrics (which cause policy lag) and external proprietary rubric generators by unifying response generation and rubric generation under a single parameterized policy that alternates between a Reasoner and a Rubric Generator role. Guards against reward hacking with a multi-level verification pipeline: a meta-verifier, zero-variance pruning, and a Leave-One-Out peer-consensus mechanism; validated criteria are archived in a memory pool that supplies dense multi-objective rewards for co-optimizing both roles.
- Key claim: EvoRubric consistently outperforms static and external-LLM-driven alignment methods across medical, writing, and science domains, and remains compatible with human-expert priors.

### From Holistic Evaluation to Structured Criteria: Rubrics Across the Evolving LLM Landscape [DISCOVERED]
- arXiv: 2606.08625 (2026). NEW. Key: chen2026from
- Signal type: rubric (survey/organizing framework, not a method)
- Lifecycle stage: spans problem-definition, inference, and training
- Section: S7 (comparison-survey shelf entry for the rubric subsection; also feeds the S3 taxonomy discussion)
- Method: A survey that treats the rubric as a unifying framework recurring across evaluation, RL, and safety alignment. Defines rubrics as explicit criteria sets that turn holistic quality judgments into structured, actionable standards, and organizes designs at three levels: evaluative (decomposing judgments into verifiable dimensions), training (dense process-level feedback where scalar rewards fall short), and intrinsic (rubrics emerging from model behavior to drive self-improvement). Also assesses rubric reliability (generation quality, execution fidelity, theoretical constraints, security threats) and surveys rubric-based benchmarks.
- Key claim: the recurrence of rubrics across evaluation, RL, and safety threads is systematic rather than coincidental, and the three-level framing (evaluative / training / intrinsic) organizes the space. Useful for our (f) prior-survey comparison: this is the closest rubric-specific survey, and our S7 must position against it.

---

## B. RLVR core and its critiques

### Tulu 3: Pushing Frontiers in Open Language Model Post-Training [ALREADY-CITED]
- arXiv: 2411.15124 (2024). Key exists in references.bib
- Signal type: verifiable outcome reward (plus SFT and DPO stages)
- Lifecycle stage: training
- Section: S7 (origin of the RLVR term; the stack's baseline recipe)
- Method: Fully open post-training family (models, data, code, recipes) on Llama 3.1, combining SFT, DPO, and a then-novel method the authors name Reinforcement Learning with Verifiable Rewards (RLVR). Introduces a multi-task evaluation scheme with development and unseen splits plus decontamination of open datasets.
- Key claim: Tulu 3 surpasses the instruct versions of Llama 3.1, Qwen 2.5, Mistral, and closed models such as GPT-4o-mini and Claude 3.5 Haiku, with the full recipe released.

### DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning [ALREADY-CITED]
- arXiv: 2501.12948 (2025). Key exists in references.bib
- Signal type: verifiable outcome reward (pure RL, no human reasoning traces)
- Lifecycle stage: training
- Section: S7 (RLVR's flagship result; motivates the whole reward stack)
- Method: Shows reasoning can be incentivized through pure RL without human-labeled reasoning trajectories; the RL framework produces emergent reasoning patterns (self-reflection, verification, dynamic strategy adaptation) that can be distilled to smaller models.
- Key claim: the RL-trained model outperforms counterparts trained with supervised learning on human demonstrations on verifiable math, coding, and STEM tasks.

### Agent-RLVR: Training Software Engineering Agents via Guidance and Environment Rewards
- arXiv: 2506.11425 (2025). NEW. Key: da2025agentrlvr
- Signal type: instruction/guidance (verbal cues: strategic plans, error feedback) + verifiable environment reward (unit tests)
- Lifecycle stage: training
- Section: S7 (crossover: S4 grounding, S10 agents; shows verbal guidance densifying a sparse verifiable reward)
- Method: RLVR degrades in agentic settings where the reward landscape is too sparse. Agent-RLVR adds "agent guidance," verbal cues ranging from high-level plans to dynamic feedback on errors and environment interactions, emulating a teacher. Agents attempt tasks, failures are validated by unit tests and supplemented with guidance, agents reattempt with guidance, and the policy is updated via RLVR on the guided trajectories.
- Key claim: lifts Qwen-2.5-72B-Instruct pass@1 on SWE-Bench Verified from 9.4% to 22.4%, and the guidance-augmented data further trains a test-time reward model that boosts pass@1 to 27.8%.

### Position: The Hidden Costs and Measurement Gaps of Reinforcement Learning with Verifiable Rewards
- arXiv: 2509.21882 (2025). NEW. Key: wu2025position
- Signal type: n/a (position/measurement paper about the verifiable-reward signal)
- Lifecycle stage: training (evaluation methodology of training gains)
- Section: S7 (crossover: S11 evaluation, S13 practitioner guide; core limitations citation for reviewer point (k))
- Method: Argues many headline RLVR gains conflate policy improvement with three confounds: budget mismatch between RLVR and baseline evaluations, attempt inflation and calibration drift (abstentions turned into confident answers), and benchmark contamination. Uses budget-matched reproductions and partial-prompt contamination probes. Proposes a "tax-aware" minimum reporting standard: budget-matched saturation curves with variance, calibration and abstention tracking, judge-robustness stress tests, and an explicit contamination screen.
- Key claim: several widely cited RLVR gaps shrink substantially or disappear once budgets, prompts, and dataset versions are matched; RLVR remains effective, but reasoning gains should be treated as provisional without these controls.

---

## C. Generative reward models and reasoning judges

### Generative Verifiers: Reward Modeling as Next-Token Prediction
- arXiv: 2408.15240 (2024). NEW. Key: zhang2024generative
- Signal type: critique-with-verdict (generative verification, CoT + majority voting)
- Lifecycle stage: inference (best-of-N verification; trained verifier)
- Section: S7 (the GenRM origin point: reward modeling recast as text generation)
- Method: Trains verifiers with the standard next-token prediction objective, jointly on verification and solution generation, instead of as discriminative classifiers. Generative verifiers (GenRM) inherit LLM abilities: instruction tuning, chain-of-thought verification, and extra test-time compute via majority voting. Synthetic verification rationales suffice for training on math.
- Key claim: GenRM outperforms discriminative verifiers, DPO verifiers, and LLM-as-a-Judge; best-of-N improves 5% -> 45.3% on algorithmic tasks and 73% -> 93.4% on GSM8K, with favorable scaling in model size and inference compute.

### Inference-Time Scaling for Generalist Reward Modeling
- arXiv: 2504.02495 (2025). NEW. Key: liu2025inferencetime
- Signal type: critique (self-generated principles + critiques; pointwise generative reward)
- Lifecycle stage: inference (scalable reward at query time) built by training (online RL)
- Section: S7 (anchor for the "inference-time reward scaling" subsection)
- Method: DeepSeek-GRM adopts pointwise generative reward modeling for input flexibility and proposes Self-Principled Critique Tuning (SPCT): online RL that teaches the GRM to adaptively generate principles and then accurate critiques. At inference, parallel sampling expands compute and a trained meta-RM guides voting over sampled rewards.
- Key claim: SPCT significantly improves GRM quality and inference-time scalability, outperforming existing methods and models on multiple RM benchmarks without severe bias, and inference-time scaling can beat training-time model-size scaling.

### Reward Reasoning Model
- arXiv: 2505.14674 (2025). NEW. Key: guo2025reward
- Signal type: critique-with-verdict (chain-of-thought reward reasoning)
- Lifecycle stage: inference (adaptive test-time compute for rewards); RL-trained
- Section: S7
- Method: Reward Reasoning Models (RRMs) execute a deliberate reasoning process before emitting the final reward, spending more test-time compute on queries where the right reward is not obvious. Trained with an RL framework that fosters self-evolved reward reasoning without explicit reasoning traces as supervision.
- Key claim: RRMs achieve superior performance across reward-modeling benchmarks and adaptively exploit test-time compute to further improve reward accuracy.

### RM-R1: Reward Modeling as Reasoning
- arXiv: 2505.02387 (2025). NEW. Key: chen2025rmr1
- Signal type: rubric + critique (chain-of-rubrics: self-generated evaluation rubrics or reference solutions, then judgment)
- Lifecycle stage: training (of the reward model); serves training and inference of policies
- Section: S7 (bridges the rubric and GenRM subsections)
- Method: Formulates reward modeling as a reasoning task ("ReasRMs"). RM-R1 features a chain-of-rubrics (CoR) mechanism, self-generating sample-level chat rubrics or math/code solutions and evaluating candidates against them. Two-stage training: distillation of high-quality reasoning chains, then RL with verifiable rewards.
- Key claim: RM-R1 models achieve superior average performance across three reward-model benchmarks, outperforming much larger open-weight (e.g., INF-ORM-Llama3.1-70B) and proprietary (e.g., GPT-4o) models by up to 4.9%.

### J1: Incentivizing Thinking in LLM-as-a-Judge via Reinforcement Learning
- arXiv: 2505.10320 (2025). NEW. Key: whitehouse2025j1
- Signal type: critique-with-verdict (thinking judge; pointwise and pairwise)
- Lifecycle stage: training (of the judge) for inference-time evaluation
- Section: S7
- Method: J1 converts all judgment tasks, for both verifiable and non-verifiable prompts, into a unified format with verifiable rewards, then trains thinking-judges (8B/32B/70B) with RL, mitigating positional bias. Ablates pairwise/pointwise/multitask variants, seed prompts, reward strategies, and recipes. Qualitatively, J1 learns dynamic criteria generation, reference answer creation, iterative self-correction, and feedback generation.
- Key claim: J1 judges obtain state-of-the-art results across benchmarks; J1-Qwen-32B outperforms o1-mini, o3, and the much larger 671B DeepSeek-R1 on some benchmarks while training only on synthetic data.

### Self-Taught Evaluators
- arXiv: 2408.02666 (2024). NEW. Key: wang2024selftaught
- Signal type: critique-with-verdict (reasoning trace + judgment), self-generated supervision
- Lifecycle stage: training (iterative self-improvement of the evaluator)
- Section: S7 (the "no human labels" corner of the judge-training space)
- Method: Trains an LLM-as-a-Judge without any human preference labels: starting from unlabeled instructions, an iterative scheme generates contrasting model outputs, trains the judge to produce reasoning traces and final judgments, and repeats with the improved judge labeling the next round.
- Key claim: improves Llama3-70B-Instruct from 75.4 to 88.3 on RewardBench (88.7 with majority vote), outperforming judges like GPT-4 and matching top reward models trained with labeled examples.

### Self-Generated Critiques Boost Reward Modeling for Language Models
- arXiv: 2411.16646 (2024). NEW. Key: yu2024selfgenerated
- Signal type: preference-with-rationale (scalar reward + self-generated critique)
- Lifecycle stage: training
- Section: S7
- Method: Critic-RM hypothesizes that predicting both critiques and scalar rewards improves reward modeling. Two-stage process: generate and filter high-quality critiques, then jointly fine-tune on reward prediction and critique generation, without extra supervision.
- Key claim: improves reward-modeling accuracy by 3.7%-7.3% over standard reward models and LLM judges, and the critiques rectify flawed reasoning with 2.5%-3.2% accuracy gains.

### Learning to Plan & Reason for Evaluation with Thinking-LLM-as-a-Judge
- arXiv: 2501.18099 (2025). NEW. Key: saha2025learning
- Signal type: critique-with-verdict (unconstrained evaluation plan -> execution -> judgment)
- Lifecycle stage: training (preference optimization of the judge)
- Section: S7
- Method: EvalPlanner is a preference-optimization algorithm for Thinking-LLM-as-a-Judge that decouples planning from execution: it first generates an unconstrained evaluation plan, then executes it, then delivers the verdict, avoiding hand-designed CoT components (criteria lists, reference answers, verification questions). A self-training loop iteratively optimizes over synthetically constructed plans and executions.
- Key claim: achieves state-of-the-art for generative reward models on RewardBench (93.9) despite fewer, synthetic preference pairs, with further gains on RM-Bench, JudgeBench, and FollowBenchEval.

### Think-J: Learning to Think for Generative LLM-as-a-Judge
- arXiv: 2505.14268 (2025). NEW. Key: huang2025thinkj
- Signal type: critique-with-verdict (judgment thinking traces)
- Lifecycle stage: training (of the judge; offline and online RL variants)
- Section: S7
- Method: Think-J initializes judgment-thinking ability with a small curated dataset, then optimizes the judge's thinking traces with RL. Two variants: offline RL with a critic model constructing positive/negative examples, and online RL with rule-based rewards.
- Key claim: significantly enhances generative LLM-judge evaluation, surpassing both generative and classifier-based judges without extra human annotations.

### Meta-Rewarding Language Models: Self-Improving Alignment with LLM-as-a-Meta-Judge
- arXiv: 2407.19594 (2024). NEW. Key: wu2024metarewarding
- Signal type: critique of critiques (meta-judgment over the model's own judgments)
- Lifecycle stage: training (unsupervised self-improvement loop)
- Section: S7 (the recursive rung of the reward stack: who rewards the rewarder)
- Method: Extends self-rewarding LLMs with a Meta-Rewarding step: the model judges its own judgments and uses that meta-feedback to refine its judging skill, attacking the saturation that occurs when only responses (not judgments) improve across iterations.
- Key claim: unsupervised meta-rewarding improves both judging and instruction following, e.g., Llama-3-8B-Instruct's AlpacaEval 2 win rate rises 22.9% -> 39.4% and Arena-Hard 20.6% -> 29.1%.

### GRAM-R^2: Self-Training Generative Foundation Reward Models for Reward Reasoning
- arXiv: 2509.02492 (2025). NEW. Key: wang2025gramr2
- Signal type: preference-with-rationale (label + reward rationale)
- Lifecycle stage: training (self-training on unlabeled data; foundation RM for downstream use)
- Section: S7
- Method: Addresses reward models' reliance on large labeled preference sets by self-training on abundant unlabeled data to elicit explicit reward reasoning. GRAM-R^2 is a generative reward model producing preference labels plus accompanying rationales, intended as a foundation model for reward reasoning usable with minimal or no fine-tuning across response ranking, task adaptation, and RLHF.
- Key claim: GRAM-R^2 consistently outperforms strong discriminative and generative baselines across response ranking, task adaptation, and RLHF experiments.

### Reward Modeling from Natural Language Human Feedback
- arXiv: 2601.07349 (2026). NEW. Key: wang2026reward
- Signal type: critique (similarity of model critique to human critique as process reward)
- Lifecycle stage: training (of the generative reward model)
- Section: S7 (closes the loop with S6: verbal human feedback as the supervision for the reward layer itself)
- Method: Shows that training GRMs with RLVR on binary preference-label correctness lets them guess right outcomes with unsound critiques, injecting noise into the reward signal. RM-NLHF instead computes the similarity between GRM-generated critiques and human critiques as the training reward, a process-level signal. A Meta Reward Model (MetaRM) learns to predict this process reward from human-critique datasets and generalizes to data without human critiques, addressing scalability.
- Key claim: consistently outperforms state-of-the-art GRMs trained with outcome-only reward across multiple benchmarks, supporting natural-language over binary human feedback as supervision.

### Think-RM: Enabling Long-Horizon Reasoning in Generative Reward Models [DISCOVERED]
- arXiv: 2505.16265 (2025). NEW. Key: hong2025thinkrm
- Signal type: critique-with-verdict (long, self-guided internal reasoning traces)
- Lifecycle stage: training (of the GenRM; plus a pairwise RLHF pipeline)
- Section: S7
- Method: Argues existing GenRMs use shallow, vertically scaled reasoning and produce pairwise outputs incompatible with pointwise-reward RLHF. Think-RM trains long-horizon reasoning in GenRMs via SFT warm-up on long CoT data followed by rule-based RL, eliciting self-reflection, hypothetical and divergent reasoning; it also proposes a pairwise RLHF pipeline that consumes pairwise preference rewards directly.
- Key claim: enables long-horizon GenRM reasoning with advanced capabilities (self-reflection, hypothetical reasoning, divergent reasoning) and integrates with RLHF via the pairwise pipeline (abstract gives no headline number).

### Libra: Assessing and Improving Reward Model by Learning to Think [DISCOVERED]
- arXiv: 2507.21645 (2025). NEW. Key: zhou2025libra
- Signal type: critique-with-verdict (reasoning reward model, reference-free)
- Lifecycle stage: training (of the RM) + benchmark for evaluation
- Section: S7 (crossover: S11 for Libra Bench)
- Method: Identifies two limits of rule/reference-based RL rewards: dependence on finely annotated references and constrained output formats. Contributes Libra Bench, a reasoning-oriented RM benchmark built from challenging math problems and advanced reasoning models, and Libra-RM, a series of generative reward models improved via learning-to-think, which can supply rewards without references or format constraints.
- Key claim: Libra-RM achieves state-of-the-art results on various benchmarks, and downstream experiments show its correlation with downstream RL utility.

---

## D. Process reward models

### Math-Shepherd: Verify and Reinforce LLMs Step-by-step without Human Annotations [ALREADY-CITED]
- arXiv: 2312.08935 (2023). Key exists in references.bib
- Signal type: process reward (automatic step-level scores)
- Lifecycle stage: training (step-by-step PPO) and inference (verification/reranking)
- Section: S7 (PRM lineage anchor)
- Method: A process reward model for math that scores each solution step, trained on automatically constructed process supervision (no human step labels), and used both to rerank LLM outputs and to reinforce policies with step-level PPO.
- Key claim: step-by-step PPO with Math-Shepherd lifts Mistral-7B from 77.9% to 84.1% on GSM8K and 28.6% to 33.0% on MATH; adding verification reaches 89.1% and 43.5%.

### Improve Mathematical Reasoning in Language Models by Automated Process Supervision [ALREADY-CITED]
- arXiv: 2406.06592 (2024). Key exists in references.bib
- Signal type: process reward (MCTS-collected step labels)
- Lifecycle stage: training (PRM training data collection) and inference (weighted self-consistency)
- Section: S7
- Method: OmegaPRM, a divide-and-conquer MCTS algorithm that binary-searches for the first error in a chain of thought, balancing positive and negative examples, to collect process supervision cheaply at scale (over 1.5 million annotations).
- Key claim: the automated PRM plus weighted self-consistency improves instruction-tuned Gemini Pro from 51% to 69.4% on MATH500 and 86.4% to 93.6% on GSM8K.

### ProcessBench: Identifying Process Errors in Mathematical Reasoning
- arXiv: 2412.06559 (2024). NEW. Key: zheng2024processbench
- Signal type: process reward / critique evaluation (benchmark for step-error localization)
- Lifecycle stage: problem-definition (benchmark) evaluating inference-time verifiers
- Section: S7 (crossover: S11 benchmarks)
- Method: 3,400 competition/Olympiad-level math cases with expert-annotated earliest-error steps; models must find the first erroneous step or declare the solution correct. Evaluates PRMs against critic models (prompted general LLMs critiquing step by step).
- Key claim: existing PRMs typically fail to generalize beyond GSM8K/MATH difficulty, underperforming both critic models and a PRM fine-tuned directly on PRM800K; the best open model (QwQ-32B-Preview) is competitive with GPT-4o at critique but behind o1-mini.

### The Lessons of Developing Process Reward Models in Mathematical Reasoning
- arXiv: 2501.07301 (2025). NEW. Key: zhang2025lessons
- Signal type: process reward (methodology critique + consensus-filtered data)
- Lifecycle stage: training (PRM data synthesis and evaluation methodology)
- Section: S7 (crossover: S11, S13; the "what goes wrong when you build one" citation)
- Method: Extensive experiments show Monte Carlo estimation-based PRM data synthesis underperforms LLM-as-a-judge and human annotation because completion models verify steps inaccurately. Also exposes biases in Best-of-N PRM evaluation: policy models reaching correct answers via flawed processes misalign BoN with process verification, and BoN-optimized PRMs concentrate minimum scores on final answer steps (drifting from process back to outcome). Proposes consensus filtering that integrates MC estimation with LLM-as-a-judge, plus combined response- and step-level evaluation.
- Key claim: the consensus-filter mechanism significantly improves both model performance and data efficiency versus MC-only synthesis, and the paper's diagnosis motivates step-level benchmarks like ProcessBench.

### Process Reward Models That Think [ALREADY-CITED]
- arXiv: 2504.16828 (2025). Key exists in references.bib
- Signal type: process reward as verbal chain-of-thought (verbalized step-wise verification)
- Lifecycle stage: inference (verification-time compute scaling); data-efficient training
- Section: S7
- Method: ThinkPRM is a long-CoT verifier that verifies every step by generating a verification chain-of-thought, fine-tuned on orders of magnitude fewer process labels than discriminative PRMs by exploiting the reasoning ability of long-CoT base models.
- Key claim: using only 1% of PRM800K labels, ThinkPRM beats LLM-as-a-Judge and discriminative verifiers on ProcessBench, MATH-500, and AIME'24, surpasses full-PRM800K discriminative verifiers out-of-domain (+8% on a GPQA-Diamond subset, +4.5% on LiveCodeBench), and beats LLM-as-a-Judge by 7.2% on a ProcessBench subset at equal token budget.

### Dynamic and Generalizable Process Reward Modeling
- arXiv: 2507.17849 (2025). NEW. Key: yin2025dynamic
- Signal type: process reward (fine-grained multi-dimensional reward criteria stored in a reward tree)
- Lifecycle stage: training (dense step rewards) and inference (step scoring)
- Section: S7
- Method: DG-PRM argues heuristic PRMs generalize poorly across domains and that LLM-as-judge work overlooks the guidance embedded in feedback text. It maintains a reward tree of fine-grained, multi-dimensional reward criteria and dynamically selects reward signals per step; Pareto dominance estimation identifies discriminative positive/negative pairs for multifaceted signals.
- Key claim: DG-PRM achieves strong performance on prevailing benchmarks, boosts models on dense-reward tasks, and adapts well out-of-distribution.

### SPARK: Stepwise Process-Aware Rewards for Reference-Free Reinforcement Learning
- arXiv: 2512.03244 (2025). NEW. Key: rahman2025spark
- Signal type: process reward (synthetic verification-derived, reference-free)
- Lifecycle stage: training
- Section: S7
- Method: Three stages: a generator produces diverse solutions and a verifier evaluates them with parallel scaling (self-consistency) and sequential scaling (meta-critique); the verification outputs become synthetic training data for generative PRMs; the trained PRM (with chain-of-thought verification, PRM-CoT) then serves as the RL reward, with format constraints to prevent reward hacking.
- Key claim: aggregated step-level verification data beats ground-truth outcome supervision for PRM training (67.5 F1 on ProcessBench vs 66.4 reference-guided and 61.9 for GPT-4o), and RL with the PRM on Qwen2.5-Math-7B reaches 47.4% average across six math benchmarks, beating ground-truth RLVR (43.9%), enabling reference-free RL for domains without verifiable answers.

### MM-PRM: Enhancing Multimodal Mathematical Reasoning with Scalable Step-Level Supervision
- arXiv: 2505.13427 (2025). NEW. Key: du2025mmprm
- Signal type: process reward (multimodal step-level supervision)
- Lifecycle stage: training (PRM) and inference (best-of-N path scoring)
- Section: S7 (multimodal edge of the PRM subsection; connects to S10)
- Method: Builds MM-Policy (a strong multimodal reasoner) and MM-K12 (10k verifiable multimodal math problems as seed data), then uses an MCTS-based pipeline (OmegaPRM-style) to generate over 700k step-level annotations without human labeling. The resulting PRM scores candidate reasoning paths in best-of-N inference; analysis covers soft labels, learning rates, and path diversity.
- Key claim: significant improvements on both in-domain (MM-K12 test) and out-of-domain (OlympiadBench, MathVista, etc.) benchmarks, showing process supervision strengthens logical robustness in multimodal reasoning.

### StepWiser: Stepwise Generative Judges for Wiser Reasoning [DISCOVERED]
- arXiv: 2508.19229 (2025). NEW. Key: xiong2025stepwiser
- Signal type: process reward as critique (generative stepwise judge with thinking tokens)
- Lifecycle stage: training (RL-trained judge; improves policy training) and inference (search)
- Section: S7
- Method: Reframes stepwise reward modeling from classification to a reasoning task: a generative judge meta-reasons about the policy's intermediate steps, emitting thinking tokens before a verdict. Trained with RL using relative outcomes of rollouts rather than SFT on static step-label datasets.
- Key claim: StepWiser gives better step-level judgment accuracy than existing methods, improves the policy model at training time, and improves inference-time search.

---

## Synthesis notes for S7 drafting

- The stack has four rungs that the section can present as one architecture: (1) verifiable outcome rewards (Tulu 3, DeepSeek-R1); (2) rubric rewards generalizing verifiability to open-ended domains (RaR, Rubric Anchors, RubricHub, RLCF, OpenRubrics); (3) generative/judge rewards that verbalize the reward computation itself (GenRM, DeepSeek-GRM, RRM, RM-R1, J1, EvalPlanner); (4) process rewards that move the verbal signal inside the trajectory (Math-Shepherd, OmegaPRM, ThinkPRM, DG-PRM, SPARK, StepWiser). This directly answers reviewer demand (g) for synthesis.
- Granularity axis for the S13 practitioner table: outcome scalar -> response-level rubric -> checklist item -> step-level PRM -> token-level (Rubrics to Tokens). Cost axis: static human rubric -> synthetic rubric (RubricHub, OpenRubrics, Auto-style CRG) -> online/self-evolving rubric (OnlineRubrics, EvoRubric, Self-Rewarding) -> adversarial selective verification (RLAC).
- Reward hacking arc for S12: static rubrics are hackable (OnlineRubrics motivation), weak verifiers inflate proxy rewards (Mahmoud 2026), outcome rewards breed Miracle Steps (Yuan 2025), GRMs guess verdicts without sound critiques (RM-NLHF), MC-estimated step labels mislabel (Qwen PRM lessons), and headline RLVR gains partly dissolve under budget-matched evaluation (Wu 2025 position). Anti-hacking machinery to cite: cross-family judge panels, self-internalization gap, meta-verifier + peer consensus (EvoRubric), format constraints (SPARK), consensus filtering (Qwen lessons).
- Terminology bridge for S2/S3: rubric rewards and PRM verdicts are both "verbal reward functions" (language playing the role of R in the MDP), which gives the formal framework section a concrete family to formalize (reviewer demand (d)).
