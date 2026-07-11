# T5: Multi-agent verbal feedback: debate, trained critics, self-play with language (feeds S5 and S6)

Thread notes for the CSUR expansion. All 28 papers verified this session (2026-07-11) against arxiv.org: the 17 seeds via the official arXiv metadata API (export.arxiv.org, canonical abs-page record) and the 11 discovered papers via their arxiv.org/abs pages (citation meta tags). Discovery ran through HF paper_search. 17 seeds verified, 0 excluded; 11 additional papers discovered (7 from 2025-2026). None of the 28 appears in paper-acl/references.bib, so all 28 get new entries in `T5_multiagent_feedback.bib`.

Two discovery hits were dropped because the survey already cites them: SDRL / Learning from Self-Debate 2601.22297 (liu2026learningselfdebatepreparingreasoning) and Debate-or-Vote 2508.17536 (choi2026debate). Both belong in the S5 debate discussion; reuse the existing keys.

Reviewer hooks this thread must serve:
- pqAY-2 / Q27s-3 (cross-pillar decision rules): this thread supplies the cleanest inference-vs-training contrast in the whole survey. The same mechanism (debate) appears purely at inference (MAD test-time scaling, ConfMAD, DAR), as a training-data generator (Multiagent Finetuning, MALT, Agent-R), and as a reward channel (debate-based RM, MAPoRL, self-play game outcomes). Use "where the debate transcript ends up" (context window vs dataset vs reward) as the explicit decision rule.
- Q27s-7 / bnae-2 (synthesis, when does it work): the thread contains its own corrective literature. Stop Overvaluing MAD and Revisiting MAD as Test-Time Scaling give conditions under which debate helps (hard problems, weak models, heterogeneous agents) and when it does not; Kenton et al. give protocol-level conditions (information asymmetry). This is exactly the conditional-effectiveness analysis reviewers asked for; feed S13 practitioner guide.
- 3gqM-4 / bnae-3 (RL-algorithm depth): MAPoRL (multi-agent PPO-style co-training), MALT (value-iteration credit propagation through role-conditioned models), Critique-RL (two-stage on-policy RL), SPC/SPAG/LSP (adversarial self-play RL) name the concrete algorithm families; feed S6 and S8.
- (k) societal impact: Prover-Verifier Games, Khan et al., Kenton et al., and Debate Helps Weak-to-Strong ground the scalable-oversight motivation; MAD-as-test-time-scaling documents that collaborative refinement can increase safety vulnerability. Cross-ref S12.

Sub-cluster map: A debate at inference (S5), B critical/conditional analyses of debate (S5, S13), C trained critic models (S6), D multi-agent and self-play training (S6), E debate as reward and scalable oversight (S6, S12).

---

## A. Debate as inference-time deliberation (S5)

### Revisiting Multi-Agent Debate as Test-Time Scaling (NEW: yang2025revisiting)
- Title: Revisiting Multi-Agent Debate as Test-Time Scaling: A Systematic Study of Conditional Effectiveness. arXiv 2505.22960, 2025.
- Method: conceptualizes multi-agent debate (MAD) as a test-time computational scaling technique characterized by two capabilities, collaborative refinement and diverse exploration, and runs a systematic empirical comparison against strong self-agent test-time scaling baselines on mathematical reasoning and safety tasks. Varies task difficulty, model scale, and agent diversity to isolate when debate pays off.
- Signal type: debate (inter-agent critique and refinement in language).
- Lifecycle stage: inference.
- Section mapping: S5 deliberative (framing device for the whole debate subsection); conditional-effectiveness findings feed S13.
- Key claim: for math reasoning MAD offers limited advantage over self-agent scaling but becomes more effective as problem difficulty rises and model capability falls; for safety tasks collaborative refinement can increase vulnerability, while diverse agent configurations gradually reduce attack success.

### ConfMAD (NEW: lin2025enhancing)
- Title: Enhancing Multi-Agent Debate System Performance via Confidence Expression. arXiv 2509.14034, 2025.
- Method: argues that LLMs with task-specific knowledge advantages fail to communicate that advantage during debate because they lack confidence expression, causing stubborn wrong beliefs or premature convergence. Integrates explicit confidence expression throughout the debate process so agents communicate how sure they are alongside their arguments; analyzes how confidence shapes debate dynamics.
- Signal type: debate augmented with verbalized confidence.
- Lifecycle stage: inference.
- Section mapping: S5 deliberative.
- Key claim: confidence expression improves MAD effectiveness (abstract gives no numbers); offers design insights for confidence-aware MAD systems.

### Hear Both Sides / DAR (NEW: nguyen2026hear)
- Title: Hear Both Sides: Efficient Multi-Agent Debate via Diversity-Aware Message Retention. arXiv 2603.20640, 2026.
- Method: broadcasting every agent message each round injects noise and redundancy into debate. Diversity-Aware Retention (DAR) selects, per round, the subset of agent responses that maximally disagree with each other and with the majority vote, and broadcasts only those; an index-based retention mechanism keeps the selected messages verbatim so retained disagreements stay authentic. Contrast with confidence-threshold filtering, which suffers from miscalibration.
- Signal type: debate (with selective message propagation).
- Lifecycle stage: inference.
- Section mapping: S5 deliberative; efficiency angle feeds S13.
- Key claim: selective propagation consistently improves debate performance, especially as agent count scales and noise accumulation worsens; "what agents hear is as important as what agents say."

## B. Critical and conditional analyses of debate (S5, S13)

### Stop Overvaluing Multi-Agent Debate (NEW: zhang2025stop)
- Title: Stop Overvaluing Multi-Agent Debate -- We Must Rethink Evaluation and Embrace Model Heterogeneity. arXiv 2502.08788, 2025.
- Method: systematic evaluation of 5 representative MAD methods across 9 benchmarks and 4 foundation models, addressing the field's limited benchmark coverage, weak baselines, and inconsistent setups. Tests model heterogeneity (mixing different base models across debater roles) as a remedy.
- Signal type: debate (evaluated, not proposed).
- Lifecycle stage: inference.
- Section mapping: S5 deliberative (the skeptical counterweight); evaluation-practice critique cross-refs S11; heterogeneity guidance feeds S13.
- Key claim: MAD often fails to outperform single-agent Chain-of-Thought and Self-Consistency even at much higher inference cost; model heterogeneity acts as a universal antidote that consistently improves current MAD frameworks.

## C. Trained critic models (S6)

### MultiCritique (NEW: lan2024training)
- Title: Training Language Models to Critique With Multi-agent Feedback. arXiv 2410.15287, 2024.
- Method: a data-generation pipeline that improves critique ability in both SFT and RL stages using multi-agent feedback instead of single-model (GPT-4) critiques. For SFT it aggregates and simplifies high-quality critiques from multiple agents; for RL it uses multi-agent feedback to raise the preference accuracy of critique-quality judgments, yielding the MultiCritiqueDataset for both stages.
- Signal type: critique (multi-agent aggregated), then preference-with-rationale for the RL stage.
- Lifecycle stage: training.
- Section mapping: S6 learning signal (critic training subsection).
- Key claim: the fine-tuned 7B model significantly surpasses other 7B-13B open-source models and approaches advanced 70B LLMs and GPT-4 on two critique benchmarks.

### Critique-RL (NEW: xi2025critiquerl)
- Title: Critique-RL: Training Language Models for Critiquing through Two-Stage Reinforcement Learning. arXiv 2510.24320, 2025.
- Method: online RL for developing critic models without stronger supervisors, on an actor-critic-refine two-player loop. Key diagnosis: optimizing the critic only on indirect reward (did the actor's refinement improve?) raises helpfulness but leaves discriminability poor. Stage I reinforces discriminability with direct rule-based rewards; stage II adds indirect refinement-based rewards for helpfulness while regularizing to preserve discriminability.
- Signal type: critique (trained; two-attribute reward decomposition).
- Lifecycle stage: training.
- Section mapping: S6 learning signal; the discriminability-vs-helpfulness decomposition is a synthesis point for S13 and the RL-depth answer to bnae-3.
- Key claim: 9.02% gain on in-domain and 5.70% on out-of-domain tasks for Qwen2.5-7B.

### DeepCritic (NEW: yang2025deepcritic)
- Title: DeepCritic: Deliberate Critique with Large Language Models. arXiv 2505.00662, 2025.
- Method: two-stage framework for step-level math critique. Stage 1: SFT on 4.5K long-form seed critiques generated by Qwen2.5-72B-Instruct, each containing multi-perspective step verifications plus meta-critiques of the initial critiques. Stage 2: RL on either human-labeled PRM800K data or automatically annotated data from Monte Carlo correctness estimation.
- Signal type: critique (deliberate, step-wise, with self-critique of critiques).
- Lifecycle stage: training.
- Section mapping: S6 learning signal; step-level supervision cross-refs S7/S8.
- Key claim: the Qwen2.5-7B-based critic significantly outperforms existing LLM critics including same-sized DeepSeek-R1-distill models and GPT-4o on error-identification benchmarks, and its feedback more effectively helps generators refine erroneous steps.

### AutoMathCritique (NEW: xi2024enhancing)
- Title: Enhancing LLM Reasoning via Critique Models with Test-Time and Training-Time Supervision. arXiv 2411.16579, 2024.
- Method: two-player paradigm separating reasoning (actor) and critique models; the critic supervises the actor at both test time and train time. AutoMathCritique is an automated, scalable pipeline that collected 76,321 responses paired with step-level feedback; fine-tuning on it yields critics whose feedback improves the actor on hard queries, and a critique-in-the-loop self-improvement method folds critic supervision into the actor's self-training. Preliminary exploration of self-talk critique training.
- Signal type: critique (step-level, trained).
- Lifecycle stage: training (with explicit inference-time supervision role; a clean dual-stage exemplar for the pqAY-2 decision-rule discussion).
- Section mapping: S6 learning signal; test-time-supervision half cross-refs S5.
- Key claim: critique models consistently improve the actor on difficult queries at test time, especially under inference-compute scaling, and critique-in-the-loop self-training improves exploration efficiency and solution diversity.

### CTRL (NEW: xie2025teaching)
- Title: Teaching Language Models to Critique via Reinforcement Learning. arXiv 2502.03492, 2025.
- Method: CTRL (Critic Training via Reinforcement Learning) trains a critic model to generate feedback that maximizes the correction performance of a fixed generator model, with no human supervision, in code generation. Decouples critic from generator so the trained critic transfers across generators and doubles as a generative reward model for iterative critique-revision at test time.
- Signal type: critique (trained against downstream refinement reward).
- Lifecycle stage: training.
- Section mapping: S6 learning signal; generative-RM role cross-refs S7.
- Key claim: CTRL critics enhance pass rates and mitigate compounding errors across base and stronger generators, with up to 106.1% relative improvement on challenging code-generation benchmarks via iterative critique-revision.

### SPC (NEW: chen2025spc)
- Title: SPC: Evolving Self-Play Critic via Adversarial Games for LLM Reasoning. arXiv 2504.19162, 2025.
- Method: eliminates manual step-level annotation by evolving a critic through adversarial self-play: a "sneaky generator" is fine-tuned to produce hard-to-detect erroneous reasoning steps while a "critic" copy learns to detect them; game outcomes give +/- rewards and RL drives continuous co-evolution of both roles.
- Signal type: critique (trained via adversarial self-play game outcomes).
- Lifecycle stage: training.
- Section mapping: S6 learning signal (bridges clusters C and D); process-supervision role cross-refs S7.
- Key claim: error-detection accuracy on ProcessBench rises from 70.8% to 77.7%, surpassing strong baselines including distilled R1, and SPC-guided test-time search improves MATH500/AIME2024 performance beyond state-of-the-art PRMs.

### Critique-Guided Improvement / CGI (NEW: yang2025lighthouse)
- Title: The Lighthouse of Language: Enhancing LLM Agents via Critique-Guided Improvement. arXiv 2503.16024, 2025.
- Method: two-player framework for interactive agent environments: an actor explores while a trained critic generates detailed natural-language feedback (fine-grained assessments plus actionable revisions); the actor is then trained to exploit these critiques. Positions natural-language feedback as richer than scalar verifier rankings for guiding exploration away from local optima.
- Signal type: critique (trained critic; actor trained to consume critiques).
- Lifecycle stage: training (both players are optimized; feedback consumed in-context during exploration).
- Section mapping: S6 learning signal; the "actor must learn to parse feedback" point feeds S13.
- Key claim: outperforms baselines by a substantial margin in three interactive environments; a small critic exceeds GPT-4 in feedback quality and the actor reaches state-of-the-art performance.

### Agent-R (NEW: yuan2025agentr)
- Title: Agent-R: Training Language Model Agents to Reflect via Iterative Self-Training. arXiv 2501.11425, 2025.
- Method: iterative self-training that teaches agents to recover from errors on the fly rather than reward/penalize whole trajectories. Uses MCTS to construct revision trajectories that splice a failed path onto an adjacent correct path; a model-guided critique-construction step has the actor identify its first error step (within current capability) so reflection data matches the current policy. Iterates both error-correction capability and dataset construction.
- Signal type: critique (self-generated, spliced into revision trajectories).
- Lifecycle stage: training.
- Section mapping: S6 learning signal; timely-revision construction cross-refs S8 (where in the trajectory credit lands).
- Key claim: continuously improves error recovery and enables timely correction, beating baselines by +5.59% across three interactive environments.

## D. Multi-agent and self-play training (S6)

### Multiagent Finetuning (NEW: subramaniam2025multiagent)
- Title: Multiagent Finetuning: Self Improvement with Diverse Reasoning Chains. arXiv 2501.05707, 2025 (ICLR 2025 per arXiv comment).
- Method: applies self-improvement finetuning to a society of models all initialized from the same base. Each model is updated on independent data generated through multiagent interactions among the models, driving specialization and diversification across the set; the diversity preserves distinct reasoning chains and delays the diminishing returns that stall single-agent self-improvement.
- Signal type: multiagent interaction data (generation + critique among models) as finetuning signal.
- Lifecycle stage: training.
- Section mapping: S6 learning signal.
- Key claim: sustains autonomous improvement over many more finetuning rounds than single-agent self-improvement across a wide suite of reasoning tasks (abstract gives no numbers).

### MALT (NEW: motwani2024malt)
- Title: MALT: Improving Reasoning with Multi-Agent LLM Training. arXiv 2412.01928, 2024.
- Method: post-training over a sequential generator-verifier-refiner pipeline of heterogeneous agents. Repeatedly samples each role to build a multi-agent search tree, grades final outputs against ground truth, then applies value iteration to propagate reward back to each role-conditioned model, producing multi-agent post-training data with no human or teacher supervision; off-policy learning from both correct and incorrect trajectories specializes each role.
- Signal type: critique/verification roles trained jointly; propagated outcome reward.
- Lifecycle stage: training.
- Section mapping: S6 learning signal; the value-iteration credit propagation is a primary S8 exemplar (reviewer demand d).
- Key claim: relative improvements of 15.66% on MATH, 7.42% on GSM8K, and 9.40% on CSQA over the same baseline LLM.

### MAPoRL (NEW: park2025maporl)
- Title: MAPoRL: Multi-Agent Post-Co-Training for Collaborative Large Language Models with Reinforcement Learning. arXiv 2502.18439, 2025.
- Method: post-co-training paradigm in which multiple LLMs answer independently, hold a multi-turn discussion, and produce a final answer; a MAPoRL verifier scores answer correctness plus incentives for corrective and persuasive discussion, and the score is maximized with multi-agent RL. Co-trains all participants rather than prompting frozen models, with accompanying analytical insights.
- Signal type: debate/discussion with verifier-scored reward (incentivized persuasion and correction).
- Lifecycle stage: training.
- Section mapping: S6 learning signal; multi-agent RL algorithm family answers bnae-3; cross-ref S5 for the discussion protocol.
- Key claim: training individual LLMs alone is insufficient to induce collaboration; multi-agent co-training boosts collaboration across benchmarks and generalizes to unseen domains.

### Persuasion-Balanced Training / PBT (NEW: stengeleskin2024teaching)
- Title: Teaching Models to Balance Resisting and Accepting Persuasion. arXiv 2410.14596, 2024.
- Method: optimizing only against adversarial (negative) persuasion degrades acceptance of beneficial (positive) persuasion and vice versa. PBT builds multi-agent recursive dialogue trees to create data and trains via preference optimization to accept persuasion exactly when appropriate; dialogue data from 7-8B models trains much larger 70B models.
- Signal type: preference-with-rationale over persuasion dialogues.
- Lifecycle stage: training.
- Section mapping: S6 learning signal; team-stability finding feeds S5 debate and S13; resistance-to-misinformation angle cross-refs S12.
- Key claim: PBT improves resistance to misinformation and resilience to challenge, and in multi-agent debate stabilizes mixed-strength teams: without PBT, answer order determines whether the team gets the stronger or weaker model's performance; with PBT the stronger model consistently pulls the weaker one up.

### Playpen (NEW: horst2025playpen)
- Title: Playpen: An Environment for Exploring Learning Through Conversational Interaction. arXiv 2504.08590, 2025.
- Method: environment for off- and online learning through Dialogue Game self-play, where goal-directed, rule-governed games driven by verbal actions supply the feedback signal. Benchmarks post-training methods (SFT, DPO, GRPO) on Llama-3.1-8B-Instruct, evaluating on unseen game instances, unseen games, and standard benchmarks.
- Signal type: instruction/game-rule feedback from dialogue-game self-play.
- Lifecycle stage: training (environment supports inference-time play too).
- Section mapping: S6 learning signal; as infrastructure it cross-refs S11.
- Key claim: SFT improves unseen instances but degrades other skills; interactive GRPO learning shows balanced improvements without skill loss.

### SPAG (NEW: cheng2024selfplaying)
- Title: Self-playing Adversarial Language Game Enhances LLM Reasoning. arXiv 2404.10642, 2024.
- Method: self-play in Adversarial Taboo: an attacker must induce a defender to utter a hidden target word while the defender infers it; both roles are played by copies of the same LLM across a large target-word range, and RL on game outcomes updates the model (SPAG). Winning demands knowledge plus inference under information reservation, making game outcome a language-native reward.
- Signal type: self-play game outcome (adversarial dialogue).
- Lifecycle stage: training.
- Section mapping: S6 learning signal.
- Key claim: LLM performance improves uniformly across a broad range of reasoning benchmarks, and iterating the self-play process continues to improve reasoning.

### Language Self-Play (NEW: kuba2025language)
- Title: Language Self-Play For Data-Free Training. arXiv 2509.07414, 2025.
- Method: removes the data bottleneck by casting model capability as performance in a competitive game the model plays against itself (Language Self-Play, LSP): a game-theoretic self-play framework in which stronger policies emerge with no additional training data, optimized by RL.
- Signal type: self-play game outcome (single model, adversarial framing).
- Lifecycle stage: training.
- Section mapping: S6 learning signal.
- Key claim: Llama-3.2-3B-Instruct improves on instruction-following, mathematics, and coding benchmarks through self-play alone, without additional data.

### Multi-Agent Evolve (NEW: chen2025multiagent)
- Title: Multi-Agent Evolve: LLM Self-Improve through Co-evolution. arXiv 2510.23595, 2025.
- Method: instantiates a Proposer-Solver-Judge triplet from a single LLM: the Proposer generates questions, the Solver answers, the Judge evaluates both; RL optimizes all three roles as they co-evolve. Extends self-play RL beyond domains with grounded verifiers (interpreters, game engines) to general reasoning and knowledge QA with minimal human-curated supervision.
- Signal type: self-play co-evolution with judge-generated evaluation as reward.
- Lifecycle stage: training.
- Section mapping: S6 learning signal; judge-role reward cross-refs S7.
- Key claim: average improvement of 4.54% across benchmarks on Qwen2.5-3B-Instruct.

### Social Deduction MARL (NEW: sarkar2025training)
- Title: Training Language Models for Social Deduction with Multi-Agent Reinforcement Learning. arXiv 2502.06060, 2025.
- Method: trains LLMs to hold productive natural-language discussions in an embodied Among-Us-style social deduction game without human demonstrations. Decomposes communication into listening (train the model to predict environment information from discussions) and speaking (multi-agent RL rewarding messages by their influence on other agents), using the agent's own goal prediction as a dense reward for communication.
- Signal type: dialogue messages rewarded by influence (message-level dense reward).
- Lifecycle stage: training.
- Section mapping: S6 learning signal; message-influence reward is an S8 credit-assignment exemplar; emergent accusation/evidence behaviors cross-ref S10 embodied.
- Key claim: doubles win rates compared to standard RL; emergent behaviors include accusing suspects and providing evidence.

### Latent Agents (NEW: yi2026latent)
- Title: Latent Agents: A Post-Training Procedure for Internalized Multi-Agent Debate. arXiv 2604.24881, 2026.
- Method: distills multi-agent debate into a single LLM via a two-stage fine-tuning pipeline: debate-structure learning, then internalization with dynamic reward scheduling and length clipping. Mechanistic analysis with activation steering finds internalization creates agent-specific subspaces (interpretable directions corresponding to agent perspectives); instilled malicious agents can be suppressed by negative steering.
- Signal type: debate (distilled from transcripts into weights).
- Lifecycle stage: training.
- Section mapping: S6 learning signal; closes the S5-to-S6 loop for debate (the pqAY-2 decision rule in action: same signal, different destination); steering-based control cross-refs S12.
- Key claim: internalized models match or exceed explicit multi-agent debate with up to 93% fewer tokens; internalized harmful behaviors are easier to localize and control than in base models.

## E. Debate as reward and scalable oversight (S6, S12)

### Prover-Verifier Games (NEW: kirchner2024prover)
- Title: Prover-Verifier Games improve legibility of LLM outputs. arXiv 2407.13692, 2024.
- Method: optimizing chain-of-thought only for answer correctness can reduce legibility (checkability by weaker parties). Training algorithm inspired by Prover-Verifier Games: iteratively train small verifiers to predict solution correctness, "helpful" provers producing correct solutions the verifier accepts, and "sneaky" provers producing wrong solutions that fool it, on grade-school math.
- Signal type: verifier acceptance in an adversarial prover-verifier game (checkability as reward).
- Lifecycle stage: training.
- Section mapping: S6 learning signal; legibility-for-oversight motivation is a primary S12 anchor.
- Key claim: helpful-prover accuracy and verifier adversarial robustness rise over training, and legibility transfers to humans: time-constrained human accuracy increases when checking helpful-prover solutions and decreases on sneaky-prover solutions.

### Debate-based reward model (NEW: sukovic2024reward)
- Title: Reward Design for Justifiable Sequential Decision-Making. arXiv 2402.15826, 2024.
- Method: proposes a debate-based reward model for RL agents: two argumentative agents take turns providing supporting evidence for competing decisions in a zero-sum debate game, and a proxy human judge decides which decision is better justified; the game outcome quantifies justifiability and augments the environment reward to train justifiable policies. Demonstrated on treatment decisions for septic patients.
- Signal type: debate outcome as reward (justifiability signal).
- Lifecycle stage: training (reward construction).
- Section mapping: S6 learning signal; as reward machinery it cross-refs S7; the classic-RL setting (not an LLM policy) makes it a boundary exemplar for S2's scope discussion.
- Key claim: debate-augmented rewards yield policies strongly favored by the judge with little performance sacrifice, and debate-based feedback matches an ideal judge proxy that sees full state information.

### Debating with More Persuasive LLMs (NEW: khan2024debating)
- Title: Debating with More Persuasive LLMs Leads to More Truthful Answers. arXiv 2402.06782, 2024.
- Method: studies whether weaker models can assess stronger ones via debate: two expert LLMs (with access to source information) argue for different answers and a non-expert judge (model or human) picks one. Optimizes expert debaters for persuasiveness unsupervised and measures whether stronger persuasion helps or hurts judge accuracy.
- Signal type: debate (inference-time protocol; persuasion-optimized).
- Lifecycle stage: inference (with unsupervised debater optimization).
- Section mapping: S5 deliberative; scalable-oversight framing cross-refs S12.
- Key claim: debate helps non-expert models reach 76% and humans 88% accuracy (naive baselines: 48% and 60%), and optimizing debaters for persuasiveness improves the judge's ability to identify truth.

### On scalable oversight with weak LLMs judging strong LLMs (NEW: kenton2024scalable)
- Title: On scalable oversight with weak LLMs judging strong LLMs. arXiv 2407.04622, 2024.
- Method: large empirical comparison of oversight protocols (debate, consultancy, direct QA) with weaker LLM judges and stronger LLM agents across extractive QA with information asymmetry plus mathematics, coding, logic, and multimodal reasoning. Also varies whether debaters/consultants are assigned or choose their answers.
- Signal type: debate vs consultancy protocols (judge-mediated).
- Lifecycle stage: inference (protocol evaluation).
- Section mapping: S5 deliberative; the protocol-conditions result feeds S13 and the oversight motivation S12.
- Key claim: debate beats consultancy across all tasks; against direct QA, debate wins under information asymmetry but results are mixed without it; stronger debaters raise judge accuracy, more modestly than earlier studies.

### Training LMs to Win Debates with Self-Play (NEW: arnesen2024training)
- Title: Training Language Models to Win Debates with Self-Play Improves Judge Accuracy. arXiv 2409.16636, 2024.
- Method: tests the robustness of debate as scalable oversight by actually training debaters with self-play-generated data on a long-context reading-comprehension task, then measuring judge accuracy when evaluating the optimized debaters; compares against novel consultancy baselines trained to persuade without an opposing debater.
- Signal type: debate (self-play trained); judge verdict as the training signal.
- Lifecycle stage: training.
- Section mapping: S6 learning signal; oversight result cross-refs S12; complements khan2024debating (prompted persuasion) with trained persuasion.
- Key claim: judges answer more accurately when judging models optimized to win debates, with no such relationship for consultancy models; debate training encourages stronger, more informative arguments.

### Debate Helps Weak-to-Strong Generalization (NEW: lang2025debate)
- Title: Debate Helps Weak-to-Strong Generalization. arXiv 2501.13124, 2025.
- Method: combines scalable oversight and weak-to-strong generalization: a strong pretrained model debates to help a weak model extract trustworthy information from an untrustworthy strong model; the debate-enhanced weak supervision (plus an ensemble of weak models exploiting long debater arguments) then finetunes the strong model.
- Signal type: debate (arguments as context for weak supervisors).
- Lifecycle stage: training (supervision construction).
- Section mapping: S6 learning signal; alignment framing cross-refs S12.
- Key claim: the combined approach improves alignment on the OpenAI weak-to-strong NLP benchmarks; debate helps weak models extract trustworthy information and weak ensembles make the supervision estimate more robust.
