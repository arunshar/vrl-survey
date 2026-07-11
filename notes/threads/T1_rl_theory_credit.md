# T1. RL-theoretic treatment of language feedback + credit assignment

Thread target: feeds S2 (formal framework) and S8 (credit assignment); a few entries route to S6, S11, S13 where they fit better.
Reviewer weaknesses addressed: (d) shallow RL-theoretic treatment (3gqM-4, bnae-3, Q27s-5), plus material for (g) research agenda and (k) limitations of language feedback.
Verification: every canonical title below was read off its arxiv.org/abs page on 2026-07-11. Key claims come from each paper's own abstract; no numbers are reported that the abstract does not state.

Seed count: 16 papers (17 ids; 2402.07157 is the earlier same-titled NLRL version, merged into one entry). Discovered: 11 papers, of which 2 were already cited.

---

## Seed papers

### Natural Language Reinforcement Learning (NLRL)
- arXiv: 2411.14251 (earlier version 2402.07157, same title, Feb 2024); year: 2024
- Authors: Xidong Feng, Bo Liu, Yan Song, Haotian Fu, Ziyu Wan, Girish A. Koushik, Zhiyuan Hu, Mengyue Yang, Ying Wen, Jun Wang
- Method: Extends the core objects of RL into natural-language counterparts. The central construct is the Language Value Function (LVF), which replaces scalar value with an interpretable linguistic narrative articulating the rationale behind an evaluation; the framework analogously redefines policy, the Bellman equation, and policy iteration in language space. LLMs implement these operators, enabling RL-like policy and value training from unsupervised environment interaction. The earlier v1 (2402.07157) demonstrated the framework on tabular MDPs; the 2411.14251 version evaluates on 4 multi-step agentic tasks.
- Signal type: language value function (critique-as-value)
- Lifecycle stage: training (language-space policy iteration)
- Section: S2 (formal framework); the survey's S2 can build its "language Bellman equation" subsection directly on this
- Key claim: scalar value restricts an agent's understanding of environments; language-space analogues of value, Bellman backup, and policy iteration are effective, efficient, and more interpretable on multi-step agentic tasks.

### Language Models Can Learn from Verbal Feedback Without Scalar Rewards (FCP) [ALREADY-CITED]
- arXiv: 2509.22638; year: 2025
- Authors: Renjie Luo, Zichen Liu, Xiangyan Liu, Chao Du, Min Lin, Wenhu Chen, Wei Lu, Tianyu Pang
- Method: Treats verbal feedback as a conditioning signal rather than compressing it into a scalar reward. The feedback-conditional policy (FCP) is trained by maximum likelihood on offline response-feedback pairs, approximating the feedback-conditional posterior; an online bootstrapping stage then generates under positive conditions and refines on fresh feedback. Reframes feedback-driven learning as conditional generation instead of reward optimization.
- Signal type: free-form verbal feedback as conditioning (critique-conditioned generation)
- Lifecycle stage: training
- Section: S2 (formal framework: the conditional-posterior alternative to the reward-maximization view); also cited in S6
- Key claim: compressing nuanced feedback into scalar rewards discards richness and induces scale imbalance; conditioning on feedback is a more expressive way to learn from it.

### Memento: Fine-tuning LLM Agents without Fine-tuning LLMs (was AgentFly)
- arXiv: 2508.16153; year: 2025
- Authors: Huichi Zhou, Yihang Chen, Siyuan Guo, Xue Yan, Kin Hei Lee, Zihan Wang, Ka Yiu Lee, Guchun Zhang, Kun Shao, Linyi Yang, Jun Wang
- Method: Formalizes continual agent adaptation as a Memory-augmented Markov Decision Process (M-MDP) with a neural case-selection policy. Past experiences live in an episodic memory (differentiable or non-parametric); the policy updates through memory rewriting on environmental feedback, and policy improvement happens through memory retrieval, so the underlying LLM is never fine-tuned. Instantiated as the deep-research agent Memento.
- Signal type: memory (episodic cases as the learned object)
- Lifecycle stage: training (memory-based online RL; no gradient updates to the LLM)
- Section: S2 (M-MDP as a formal object; the decision-rule answer to reviewer pqAY-2 on where memory sits); cross-reference from S8
- Key claim: attains top-1 on GAIA validation (87.88% Pass@3) and 79.40% on the test set; case-based memory adds 4.7 to 9.6 absolute points on out-of-distribution tasks.

### CAPO: Towards Enhancing LLM Reasoning through Generative Credit Assignment
- arXiv: 2508.02298; year: 2025
- Authors: Guofu Xie, Yunsheng Shi, Hongtao Tian, Ting Yao, Xiao Zhang
- Method: RLVR assigns one rule-based reward to every token; CAPO instead uses an off-the-shelf LLM as a Generative Process Reward Model (LLM-as-GenPRM) that emits all step-wise critiques in a single pass, converting them into deterministic token-level credits that refine the uniform rule-based reward. Voting over multiple generated critiques scales accuracy and robustness. No auxiliary value model or PRM training is needed.
- Signal type: critique (generative step-wise critique converted to token credit)
- Lifecycle stage: training
- Section: S8 (credit assignment); bridge to S7 (generative RMs)
- Key claim: consistently outperforms supervised and RL fine-tuning baselines across four mathematical benchmarks and three out-of-domain benchmarks on Llama and Qwen backbones.

### MA-RLHF: Reinforcement Learning from Human Feedback with Macro Actions
- arXiv: 2410.02743; year: 2024
- Authors: Yekun Chai, Haoran Sun, Huang Fang, Shuohuan Wang, Yu Sun, Hua Wu
- Method: Attacks the credit assignment problem in token-level RLHF by operating over macro actions, sequences of tokens or higher-level language constructs, thereby shrinking the temporal distance between actions and rewards. This yields more stable policy-gradient estimates without extra train or inference compute. Evaluated on summarization, dialogue, QA, and program synthesis.
- Signal type: scalar preference reward with temporal abstraction (non-verbal baseline for the S8 comparison)
- Lifecycle stage: training
- Section: S8 (credit assignment: temporal-abstraction family)
- Key claim: gains up to 30% in summarization and code generation, 18% in dialogue, 8% in QA; reaches parity with vanilla RLHF 1.7 to 2 times faster in training time.

### Assessing the Zero-Shot Capabilities of LLMs for Action Evaluation in RL (CALM)
- arXiv: 2409.12798; year: 2024
- Authors: Eduardo Pignatelli, Johan Ferret, Tim Rockäschel, Edward Grefenstette, Davide Paglieri, Samuel Coward, Laura Toni
- Method: Credit Assignment with Language Models (CALM) uses LLMs to automate credit assignment via reward shaping and options discovery: the LLM decomposes a task into elementary subgoals and assesses subgoal achievement in state-action transitions; each option termination that achieves a subgoal triggers an auxiliary reward. Evaluated zero-shot on human-annotated MiniHack demonstrations, without examples or fine-tuning.
- Signal type: instruction/subgoal decomposition + LLM assessment (language-mediated reward shaping)
- Lifecycle stage: training
- Section: S8 (credit assignment: LLM-as-credit-annotator family)
- Key claim: preliminary results indicate LLM knowledge is a promising prior for zero-shot credit assignment, transferring human knowledge into value functions without human-designed rewards.

### Speaking the Language of Teamwork: LLM-Guided Credit Assignment in Multi-Agent Reinforcement Learning
- arXiv: 2502.03723; year: 2025
- Authors: Muhan Lin, Shuyang Shi, Yue Guo, Vaishnav Tadiparthi, Behdad Chalaki, Ehsan Moradi Pari, Simon Stepputtis, Woojun Kim, Joseph Campbell, Katia Sycara
- Method: An LLM generates dense, agent-specific rewards from a natural-language description of the task and team goal, addressing MARL credit assignment under sparse rewards. Learning a potential-based reward function over multiple LLM queries reduces the impact of ranking errors while the LLM evaluates each agent's contribution.
- Signal type: preference-with-rationale distilled into potential-based dense rewards
- Lifecycle stage: training
- Section: S8 (credit assignment: multi-agent cell)
- Key claim: faster convergence and higher policy returns than state-of-the-art MARL baselines.

### RED: Unleashing Token-Level Rewards from Holistic Feedback via Reward Redistribution
- arXiv: 2411.08302; year: 2024
- Authors: Jiahui Li, Lin Li, Tai-wei Chang, Kun Kuang, Long Chen, Jun Zhou, Cheng Yang
- Method: Sequence-to-one reward models give a single sparse, delayed reward per output; RED redistributes that holistic reward to individual tokens using an off-the-shelf reward model, assigning per-token credit without modifying the reward model or adding training steps.
- Signal type: scalar holistic reward redistributed token-wise (non-verbal redistribution family)
- Lifecycle stage: training
- Section: S8 (credit assignment: reward-redistribution family)
- Key claim: fine-grained token rewards improve performance across diverse datasets and tasks at minimal computational cost.

### T-REG: Preference Optimization with Token-Level Reward Regularization
- arXiv: 2412.02685; year: 2024
- Authors: Wenxuan Zhou, Shujian Zhang, Lingxiao Zhao, Tao Meng
- Method: Combines sequence-level and token-level rewards for preference optimization: contrastive prompting lets the LLM self-generate token-level rewards, which act as regularization that guides how the sequence-level reward is distributed over tokens. Avoids reliance on a trained credit-assignment model or external AI annotators.
- Signal type: self-generated token-level rewards via contrastive prompting
- Lifecycle stage: training
- Section: S8 (credit assignment: self-attribution family)
- Key claim: outperforms baselines by up to 3.8% on Alpaca Eval 2 and 4.4% on Arena-Hard.

### Learning Explainable Dense Reward Shapes via Bayesian Optimization
- arXiv: 2504.16272; year: 2025
- Authors: Ryan Koo, Ian Yang, Vipul Raheja, Mingyi Hong, Kwang-Sung Jun, Dongyeop Kang
- Method: Frames reward shaping as an optimization problem for token-level credit assignment: SHAP and LIME explainability attributions over the reward model estimate per-token rewards, and a bilevel framework couples Bayesian optimization of the shaping function with policy training to handle noisy token-reward estimates.
- Signal type: explainability attributions over a scalar RM (non-verbal, interpretable credit)
- Lifecycle stage: training
- Section: S8 (credit assignment: attribution family); the optimality-preservation result also feeds the S2 theory box
- Key claim: better token-level reward balance improves downstream performance and finds an optimal policy faster; theoretically, feature-additive attribution functions maintain the optimal policy of the original reward.

### Text2Grad: Reinforcement Learning from Natural Language Feedback [ALREADY-CITED]
- arXiv: 2505.22338; year: 2025
- Authors: Hanyang Wang, Lu Wang, Chaoyun Zhang, Tianjun Mao, Si Qin, Qingwei Lin, Saravan Rajmohan, Dongmei Zhang
- Method: Turns free-form textual critiques into span-level gradients: a feedback-annotation pipeline pairs critiques with token spans, a fine-grained reward model predicts span-level rewards while generating explanatory critiques, and a span-level policy optimizer backpropagates these natural-language gradients so updates target the offending portions of the policy.
- Signal type: critique aligned to token spans (verbal feedback as differentiable credit)
- Lifecycle stage: training
- Section: S8 (credit assignment: the canonical verbal-credit method); also cited in S6
- Key claim: surpasses scalar-reward RL and prompt-only baselines across summarization, code generation, and QA, with higher task metrics and richer interpretability.

### Bootstrapping Exploration with Group-Level Natural Language Feedback in Reinforcement Learning (GOLF)
- arXiv: 2603.04597; year: 2026
- Authors: Lei Huang, Xiang Cheng, Chenxiao Zhao, Guobin Shen, Junjie Yang, Xiaocheng Feng, Yuxuan Gu, Xing Yu, Bing Qin
- Method: GOLF exploits group-level language feedback to guide targeted exploration: it aggregates external critiques that pinpoint errors with intra-group attempts that supply alternative partial ideas, producing high-quality refinements that are adaptively injected into training as off-policy scaffolds in sparse-reward regions. Generation and refinement are jointly optimized in one RL loop.
- Signal type: critique (group-aggregated) driving exploration
- Lifecycle stage: training
- Section: S6 (learning signal: feedback-guided exploration); cross-reference from S8 (sample-efficiency argument)
- Key claim: 2.2x improvement in sample efficiency over RL trained solely on scalar rewards, on verifiable and non-verifiable benchmarks.

### Policy Improvement using Language Feedback Models (LFM)
- arXiv: 2402.07876; year: 2024
- Authors: Victor Zhong, Dipendra Misra, Xingdi Yuan, Marc-Alexandre Côté
- Method: Language Feedback Models (LFMs) identify desirable behavior, actions that help achieve the instructed task, for imitation learning in instruction following. LFMs are trained on LLM feedback over verbalized visual trajectories; imitating the LFM-identified desirable actions improves task completion on Touchdown, ScienceWorld, and ALFWorld.
- Signal type: critique (per-action desirability labels)
- Lifecycle stage: training (imitation learning)
- Section: S8 (credit assignment: action-level desirability labeling)
- Key claim: beats strong behavioral cloning baselines and beats LLM-as-expert action prediction at matched token budgets; generalizes to unseen environments with 3.5 to 12.0% task-completion gains after one adaptation round.

### The End of Reward Engineering: How LLMs Are Redefining Multi-Agent Coordination
- arXiv: 2601.08237; year: 2026
- Authors: Haoran Su, Yandong Sun, Congjia Yu
- Method: Position paper arguing that LLMs shift multi-agent RL from hand-crafted numerical rewards to language-based objective specification. Conceptualizes the transition along three dimensions: semantic reward specification, dynamic reward adaptation, and improved alignment with human intent, citing reward synthesis (EUREKA), online reward adaptation (CARD), and RLVR as evidence, while flagging computational overhead, hallucination robustness, and scalability as open problems.
- Signal type: instruction / reward-code (language-based objective specification)
- Lifecycle stage: problem-definition
- Section: S13 (agenda); supporting citation in S7 and the S8 multi-agent cell
- Key claim: coordination can arise from shared semantic representations rather than explicitly engineered numerical signals; language-mediated supervision is a viable alternative to reward engineering.

### LLF-Bench: Benchmark for Interactive Learning from Language Feedback
- arXiv: 2312.06853; year: 2023
- Authors: Ching-An Cheng, Andrey Kolobov, Dipendra Misra, Allen Nie, Adith Swaminathan
- Method: A benchmark of sequential decision-making tasks (recommendation, poem writing, navigation, robot control) where agents learn interactively from natural-language instructions and feedback rather than numeric reward. Randomization (paraphrasing, environment randomization) enforces that agents actually learn from feedback; a unified Gym interface lets users configure whether feedback conveys suggestion, explanation, or instantaneous performance.
- Signal type: instruction + critique (configurable feedback channels)
- Lifecycle stage: problem-definition / inference (evaluation harness)
- Section: S11 (benchmarks); definitional anchor for S2's LLF problem statement
- Key claim: existing interactive benchmarks use numeric rewards or require no learning; LLF-Bench fills this gap and stress-tests robustness to feedback verbalization.

### RLVF: Learning from Verbal Feedback without Overgeneralization (C3PO)
- arXiv: 2402.10893; year: 2024
- Authors: Moritz Stephan, Alexander Khazatsky, Eric Mitchell, Annie S. Chen, Sheryl Hsu, Archit Sharma, Chelsea Finn
- Method: Studies incorporating high-level verbal feedback (e.g., style constraints for a class of contexts) without overgeneralizing to irrelevant contexts. C3PO uses the feedback to generate a small synthetic preference dataset specifying where the feedback should and should not apply, then fine-tunes under that preference data while constraining divergence from the original model on out-of-scope prompts.
- Signal type: instruction (high-level verbal feedback) compiled into synthetic preferences
- Lifecycle stage: training
- Section: S6 (learning signal); the overgeneralization failure mode also feeds S12/S13 limitations
- Key claim: adheres to verbal feedback comparably to in-context baselines while reducing overgeneralization by 30%.

### LMRL Gym: Benchmarks for Multi-Turn Reinforcement Learning with Language Models
- arXiv: 2311.18232; year: 2023
- Authors: Marwa Abdulhai, Isadora White, Charlie Snell, Charles Sun, Joey Hong, Yuexiang Zhai, Kelvin Xu, Sergey Levine
- Method: A benchmark of 8 multi-turn language-interaction tasks (open-ended dialogue and text games) for evaluating multi-turn RL algorithms on LLMs, plus an open-source research framework with offline value-based and policy-based RL baselines. Motivated by the failure of prompting to produce goal-directed, temporally extended behavior (clarifying questions, information gathering, actions now for better decisions later).
- Signal type: environment reward over multi-turn language interaction (RL-algorithm testbed)
- Lifecycle stage: training (benchmark for training algorithms)
- Section: S11 (benchmarks); supports S2's multi-turn MDP framing and S8's algorithm-family discussion
- Key claim: progress on stable multi-turn RL for LLMs requires tasks that gauge algorithm design; LMRL-Gym provides 8 such tasks spanning dialogue and text games.

---

## Discovered papers (beyond seeds)

### Formalizing Learning from Language Feedback with Provable Guarantees (HELiX)
- arXiv: 2506.10341; year: 2025
- Authors: Wanqiao Xu, Allen Nie, Ruijie Zheng, Aditya Modi, Adith Swaminathan, Ching-An Cheng
- Method: First principled formalization of the Learning from Language Feedback (LLF) problem: states sufficient assumptions for learning despite latent rewards and introduces the transfer eluder dimension as a complexity measure for LLF. Develops HELiX, a no-regret algorithm that provably solves LLF through sequential interaction, with guarantees scaling in the transfer eluder dimension.
- Signal type: generic language feedback (theory over the whole channel)
- Lifecycle stage: problem-definition (formal framework + algorithm)
- Section: S2 (formal framework: the regret-theory anchor the reviewers asked for)
- Key claim: information in language feedback governs learning complexity; learning from rich language feedback can be exponentially faster than learning from reward, and HELiX performs well empirically where repeated LLM prompting is unreliable.

### From Words to Actions: Unveiling the Theoretical Underpinnings of LLM-Driven Autonomous Systems
- arXiv: 2405.19883; year: 2024
- Authors: Jianliang He, Siyu Chen, Fengzhuo Zhang, Zhuoran Yang
- Method: Analyzes a hierarchical RL model where an LLM Planner emits language subgoals for an Actor in a POMDP. Proves that under pretraining-data assumptions the LLM Planner performs Bayesian aggregated imitation learning (BAIL) through in-context learning; shows naive execution of LLM subgoals incurs linear regret, and that epsilon-greedy exploration on top of BAIL restores sublinear regret when pretraining error is small. Extends to LLM-as-world-model and multi-agent coordination.
- Signal type: instruction (language subgoals as the planner-actor interface)
- Lifecycle stage: problem-definition (theory of inference-time hierarchy)
- Section: S2 (formal framework: regret analysis of language-mediated hierarchies)
- Key claim: pretrained planners are BAIL imitators; exploration beyond imitated subgoals is provably necessary (linear regret without it, sublinear with epsilon-greedy).

### From Reasoning to Agentic: Credit Assignment in Reinforcement Learning for Large Language Models
- arXiv: 2604.09459; year: 2026
- Authors: Chenchen Zhang
- Method: Surveys 47 credit-assignment methods (2024 to early 2026) in a two-dimensional taxonomy: granularity (token, segment, step, turn, multi-agent) by methodology (Monte Carlo, temporal difference, model-based, game-theoretic, information-theoretic). Contributes a machine-readable paper inventory, a reporting checklist validated against the literature, and a benchmark protocol with a method-selection decision tree.
- Signal type: n/a (survey of credit-assignment signals)
- Lifecycle stage: n/a (survey)
- Section: S8 (credit assignment: the comparison-shelf survey; also S13 practitioner decision tree); add to the S9-adjacent prior-survey comparison table for reviewer weakness (f)
- Key claim: reasoning-RL credit assignment is maturing around PRMs and critic-free group comparison, while agentic RL drives genuinely new approaches (hindsight counterfactual analysis, privileged asymmetric critics, turn-level MDP reformulations) with no precedent in reasoning RL.

### Reinforcing Multi-Turn Reasoning in LLM Agents via Turn-Level Reward Design
- arXiv: 2505.11821; year: 2025
- Authors: Quan Wei, Siliang Zeng, Chenliang Li, William Brown, Oana Frunza, Wei Deng, Anderson Schneider, Yuriy Nevmyvaka, Yang Katie Zhao, Alfredo Garcia, Mingyi Hong
- Method: First systematic study of turn-level reward design for multi-turn RL: extends GRPO and PPO to multi-turn variants with turn-level rewards for fine-grained credit assignment, and case-studies two reward types on reasoning-augmented search agents: verifiable and LLM-as-judge.
- Signal type: verifiable + LLM-as-judge turn-level rewards
- Lifecycle stage: training
- Section: S8 (credit assignment: turn-level design space)
- Key claim: well-designed turn-level rewards significantly outperform trajectory-level rewards, with greater stability, faster convergence, higher accuracy, and 100% format correctness across QA datasets.

### ArCHer: Training Language Model Agents via Hierarchical Multi-Turn RL
- arXiv: 2402.19446; year: 2024
- Authors: Yifei Zhou, Andrea Zanette, Jiayi Pan, Sergey Levine, Aviral Kumar
- Method: A hierarchical framework running two RL algorithms in parallel: a high-level off-policy value-based learner aggregates reward across utterances, and a low-level (e.g., PPO-style) learner uses that value function to train the token policy within each turn. Preserves single-turn RL machinery while handling long horizons and delayed rewards.
- Signal type: scalar environment reward, hierarchically decomposed (utterance-level vs token-level credit)
- Lifecycle stage: training
- Section: S8 (credit assignment: hierarchical family); supports S2's two-level MDP formalization of multi-turn language interaction
- Key claim: about 100x sample efficiency over existing methods on agent tasks, improving with model scale up to 7B.

### Information Gain-based Policy Optimization: A Simple and Effective Approach for Multi-Turn Search Agents (IGPO)
- arXiv: 2510.14967; year: 2025
- Authors: Guoqing Wang, Sunhao Dai, Guangze Ye, Zeyu Gan, Wei Yao, Yong Deng, Xiaofeng Wu, Zhenzhe Ying
- Method: Models each interaction turn as incremental information acquisition about the ground truth and defines the turn-level reward as the marginal increase in the policy's probability of producing the correct answer. These intrinsic, belief-update rewards need no external reward model or Monte Carlo estimation and are combined with outcome supervision into dense signals; targets advantage collapse, missing turn-level credit, and poor sample efficiency in outcome-only multi-turn RL.
- Signal type: intrinsic information-gain turn rewards (model-internal, non-verbal)
- Lifecycle stage: training
- Section: S8 (credit assignment: information-theoretic family)
- Key claim: consistently outperforms strong baselines on in-domain and out-of-domain multi-turn benchmarks with higher accuracy and better data efficiency.

### Latent Reward: LLM-Empowered Credit Assignment in Episodic Reinforcement Learning (LaRe)
- arXiv: 2412.11120; year: 2024
- Authors: Yun Qu, Yuhang Jiang, Boyuan Wang, Yixiu Mao, Cheems Wang, Chang Liu, Xiangyang Ji
- Method: LaRe tackles reward redistribution for episodic (delayed, sparse) rewards via the Latent Reward, a multi-dimensional performance evaluation. LLM-generated executable code bridges linguistic knowledge and symbolic latent rewards; latent-reward self-verification stabilizes LLM inference. Theoretically, eliminating reward-irrelevant redundancy in the latent reward improves reward estimation and RL performance.
- Signal type: reward-code (LLM-generated symbolic evaluators)
- Lifecycle stage: training
- Section: S8 (credit assignment: reward-redistribution family); links to S4's reward-code grounding cell
- Key claim: superior temporal credit assignment versus state-of-the-art redistribution methods, better multi-agent contribution allocation, and on some tasks outperforms policies trained with ground-truth rewards.

### Memory-R2: Fair Credit Assignment for Long-Horizon Memory-Augmented LLM Agents
- arXiv: 2605.21768; year: 2026
- Authors: Sikuan Yan, Ahmed Bahloul, Ercong Nie, Susanna Schwarzmann, Riccardo Trivisonno, Volker Tresp, Yunpu Ma
- Method: Observes that memory writes make rollouts diverge in their effective environment, violating the shared-environment assumption behind group-relative methods like GRPO and biasing trajectory-level credit. LoGo-GRPO combines a global objective over long-horizon trajectory rewards with local rerollouts that compare memory-operation outcomes from the same intermediate memory state; a shared-backbone fact extractor and memory manager are co-trained, with a progressive 8-to-16-to-32-session curriculum.
- Signal type: memory (memory operations as the credited actions)
- Lifecycle stage: training
- Section: S8 (credit assignment: memory-augmented cell); pairs with Memento's M-MDP in S2 to give the reviewers' hybrid-case decision rule (memory = persistent state, so credit must condition on it)
- Key claim: trajectory-level rewards give noisy or biased credit for memory operations; local same-state comparisons yield fairer group comparisons and more precise supervision for memory construction.

### How Does Reasoning Flow? Tracing Attention-Induced Information Flow for Targeted RL in LLMs (FlowTracer)
- arXiv: 2606.10646; year: 2026
- Authors: Zhichen Dong, Yang Li, Yuhan Sun, Weixun Wang, Yijia Luo, Zinian Peng, Taiheng Ye, Chao Yang, Wenbo Su, Yu Cheng, Bo Zheng, Junchi Yan
- Method: Builds an attention-induced DAG over tokens with edge capacities from aggregated attention weights, reweighted to keep only influence that reaches the answer region and constrained by local flow conservation. Extracts the question-to-answer information-flow backbone and scores tokens by flow throughput, exposing high-impact hubs; these importances shape token-level rewards for RL.
- Signal type: model-internal attention-flow attribution (non-verbal structural credit)
- Lifecycle stage: training
- Section: S8 (credit assignment: model-internal attribution family)
- Key claim: global flow structure beats point-wise internal-signal heuristics, focusing learning on tokens that route information toward or away from correct answers, with consistent gains across reasoning tasks.

### Agentic Reinforcement Learning with Implicit Step Rewards (iStar) [ALREADY-CITED]
- arXiv: 2509.19199; year: 2025 (references.bib entry uses the earlier title "Online Process Reward Learning for Agentic Reinforcement Learning"; the abs page now reads "Agentic Reinforcement Learning with Implicit Step Rewards", update the entry during bib consolidation)
- Authors: Xiaoqian Liu, Ke Wang, Yuchuan Wu, Fei Huang, Yongbin Li, Junge Zhang, Jianbin Jiao
- Method: Alternately optimizes an implicit process reward model with the policy via a trajectory-based DPO objective, deriving implicit step rewards without extra rollouts or step labels. Step-level advantages combine with trajectory-level advantages in a self-reinforcing loop; theoretical analysis shows the objective yields a step-wise reward function.
- Signal type: implicit step rewards (preference-derived, no explicit labels)
- Lifecycle stage: training
- Section: S8 (credit assignment: implicit-PRM family)
- Key claim: state-of-the-art results over frontier LLMs and strong RL baselines on WebShop, VisualSokoban, and SOTOPIA (unverifiable rewards), with higher sample efficiency and training stability.

### Improving Interactive In-Context Learning from Natural Language Feedback [ALREADY-CITED]
- arXiv: 2602.16066; year: 2026
- Authors: Martin Klissarov, Jonathan Cook, Diego Antognini, Hao Sun, Jingling Li, Natasha Jaques, Claudiu Musat, Edward Grefenstette
- Method: Treats interactive in-context learning from corrective feedback as a distinct trainable skill rather than an emergent property: single-turn verifiable tasks are transformed into multi-turn didactic interactions driven by information asymmetry, and models are trained to integrate teacher feedback. Training the model to predict the teacher's critiques (modeling the feedback environment) converts the external signal into an internal self-correction capability.
- Signal type: critique (corrective teacher feedback; predicted critiques as internalized signal)
- Lifecycle stage: training (of an inference-time skill)
- Section: S6 (learning signal: feedback-integration as a trainable skill); cross-reference from S2 (in-context plasticity) and S11 (Feedback Friction complement)
- Key claim: flagship models struggle to integrate corrective feedback on hard reasoning tasks; interactive training lifts a smaller model's multi-turn performance to near that of a model an order of magnitude larger, with out-of-distribution transfer from math to coding, puzzles, and maze navigation.

---

## Synthesis hooks for S2/S8 drafting

- Formal ladder for S2: LLF problem + transfer eluder dimension (HELiX) -> language value functions and language Bellman equations (NLRL) -> feedback-conditional posterior as the non-reward alternative (FCP) -> memory-augmented MDPs (Memento, Memory-R2) -> hierarchy/POMDP regret analyses (From Words to Actions, ArCHer).
- S8 family structure the notes support: temporal abstraction (MA-RLHF, ArCHer, turn-level design 2505.11821), redistribution (RED, LaRe), attribution (SHAP/LIME shapes, FlowTracer), generative/implicit process critique (CAPO, iStar, Text2Grad, T-REG), LLM-as-credit-annotator (CALM, LFM, MARL 2502.03723), information-theoretic (IGPO), memory-conditioned (Memory-R2), plus the Zhang 2026 survey as the decision-tree comparison anchor.
- Reviewer (d) answer in one line: language feedback changes the MDP object itself (latent rewards with informative observations: HELiX; language-valued critics: NLRL; memory as state: M-MDP), and credit assignment is where the field has concrete, testable algorithmic answers.
