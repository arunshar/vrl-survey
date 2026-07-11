# T6. Embodied/robotics language corrections, language-to-reward, VLM reward models (feeds S10)

Verification session: 2026-07-11. Every paper below was verified on its arxiv.org/abs page this session (titles, authors, abstracts). Key claims come from each paper's own abstract; where the abstract gives no number, the claim is stated without numbers. Seeds: 13/13 verified, 0 excluded. Discovered: 11 additional papers (2024-2026).

Internal structure of the thread (suggested S10 subsection order):
1. Language corrections and interventions on real robots (LILAC, DROC, YAY Robot, RT-H, RACER)
2. Verbalized environment feedback for embodied planning (Inner Monologue)
3. Language-to-reward: reward code and reward parameters (Language to Rewards, Text2Reward, Eureka, DrEureka)
4. VLM/video reward models and process rewards for robot RL (RL-VLM-F, VLM-RL, VLA-RL, RoboReward, Robo-Dopamine, Large Reward Models, SOLE-R1)
5. Failure detection and failure reasoning as verbal feedback (AHA, FailSafe, Guardian/FailCoT, MotIF)
6. What language feedback teaches embodied learners + evaluation (Teaching Embodied RL Agents, ViSTa, Schoepp et al. survey)

---

## Seed papers

### Yell At Your Robot: Improving On-the-Fly from Language Corrections
- arXiv: 2403.12910 (2024). Authors: Shi, Hu, Zhao, Sharma, Pertsch, Luo, Levine, Finn.
- Method: hierarchical robot policies where a high-level policy indexes into rich language-conditioned low-level skills. Humans watching the robot give occasional language corrections, including fine-grained ones such as "move a bit to the left," which the high-level policy incorporates in real time. The same corrections are then folded into an iterative training scheme so the high-level policy learns to correct errors in both low-level execution and high-level decisions purely from verbal feedback.
- Signal type: correction (instruction-level, human-in-the-loop).
- Lifecycle stage: inference (on-the-fly adaptation) feeding training (iterative improvement from logged corrections).
- Section: S10 (embodied); also an S6 example of a verbal signal being converted into a learning signal.
- Key claim: on real hardware, language corrections yield significant improvement on long-horizon dexterous manipulation without any additional teleoperation.

### Distilling and Retrieving Generalizable Knowledge for Robot Manipulation via Language Corrections (DROC)
- arXiv: 2311.10678 (2023). Authors: Zha, Cui, Lin, Kwon, Gonzalez Arenas, Zeng, Xia, Sadigh.
- Method: an LLM-based system that responds to arbitrary online language corrections spanning high-level task-plan failures and low-level skill-parameter adjustments. DROC distills generalizable knowledge out of correction sequences into a knowledge base and retrieves relevant past corrections by textual and visual similarity when the robot faces novel objects or tasks.
- Signal type: correction plus memory (distilled correction knowledge, retrieval-augmented reuse).
- Lifecycle stage: inference; persistence across episodes makes it a bridge case to training-free long-term adaptation (relevant to the pqAY-2 hybrid-case discussion).
- Section: S10; cross-reference S4 (grounding via corrections) and the T4 memory thread.
- Key claim: DROC needs only half the corrections of direct LLM code-generation baselines in the first round and little to no corrections after two iterations.

### "No, to the Right": Online Language Corrections for Robotic Manipulation via Shared Autonomy (LILAC)
- arXiv: 2301.02555 (2023). Authors: Cui, Karamcheti, Palleti, Shivakumar, Liang, Sadigh.
- Method: Language-Informed Latent Actions with Corrections. Instead of discrete turn-taking, LILAC splits agency between human and robot: language maps to a learned low-dimensional control space that the human drives, and each real-time correction ("to the right," "no, towards the book") refines that control space during execution. Learns from a handful of demonstrations.
- Signal type: correction (online, shared-autonomy control-space refinement).
- Lifecycle stage: inference.
- Section: S10.
- Key claim: in a user study on a Franka Emika Panda, the corrections-aware approach obtains higher task completion than open-loop instruction following and single-turn shared autonomy, and users subjectively prefer it.

### Inner Monologue: Embodied Reasoning through Planning with Language Models [ALREADY-CITED: huang2022inner]
- arXiv: 2207.05608 (2022). Authors: Huang, Xia, Xiao, Chan, Liang, Florence, Zeng, Tompson, Mordatch, Chebotar, et al.
- Method: LLM planners in embodied settings consume verbalized feedback sources (success detection, scene description, human interaction) without additional training, forming an "inner monologue" that closes the loop between plan, action, and observed outcome.
- Signal type: verbalized environment feedback (success/scene/human) consumed as text.
- Lifecycle stage: inference.
- Section: S10; canonical example for S4 grounding of feedback in embodied state.
- Key claim: closed-loop language feedback significantly improves high-level instruction completion across three domains, including real-world tabletop rearrangement and long-horizon kitchen mobile manipulation.

### Eureka: Human-Level Reward Design via Coding Large Language Models [ALREADY-CITED: ma2024eureka]
- arXiv: 2310.12931 (2023). Authors: Ma, Liang, Wang, Huang, Bastani, Jayaraman, Zhu, Fan, Anandkumar.
- Method: evolutionary optimization over reward code written by GPT-4-class LLMs: sample reward programs, train RL policies against them, feed back training statistics as textual reflection, and mutate the reward code. No task-specific prompts or reward templates.
- Signal type: reward-code (with verbal reflection over training outcomes driving the code search).
- Lifecycle stage: problem-definition (reward design) feeding training.
- Section: S10; also a load-bearing S7 example (verbal reward stack) and S9 (language-space search over programs).
- Key claim: outperforms expert human rewards on 83% of 29 RL environments spanning 10 robot morphologies, with 52% average normalized improvement, and enables a simulated Shadow Hand to perform pen-spinning tricks.

### Language to Rewards for Robotic Skill Synthesis [ALREADY-CITED: yu2023language]
- arXiv: 2306.08647 (2023). Authors: Yu, Gileadi, Fu, Kirmani, Lee, Gonzalez Arenas, Chiang, Erez, Hasenclever, Humplik, et al.
- Method: LLMs translate high-level instructions or corrections into reward parameters, which a real-time optimizer (MuJoCo MPC) then optimizes, making reward the intermediate interface between language and low-level action. Interactive: users watch behavior and immediately give feedback.
- Signal type: instruction-to-reward-parameters (reward as interface).
- Lifecycle stage: problem-definition (reward specification), consumed online at inference.
- Section: S10; also S7.
- Key claim: reliably tackles 90% of 17 designed tasks on simulated quadruped and dexterous manipulator, versus 50% for a Code-as-Policies primitive-skill baseline; validated on a real robot arm.

### Teaching Embodied Reinforcement Learning Agents: Informativeness and Diversity of Language Use
- arXiv: 2410.24218 (2024). Authors: Xi, He, Yang, Dai, Chai.
- Method: a controlled study of what kind of language actually helps embodied RL agents learn: varies informativeness (feedback on past behavior versus future guidance) and diversity (variation in expressions) of language inputs across four RL benchmarks, measuring learning, generalization, and adaptation.
- Signal type: instruction and feedback (hindsight and foresight language) as a studied variable.
- Lifecycle stage: training.
- Section: S10; results also inform S6 (which properties make a verbal learning signal useful).
- Key claim: agents trained with diverse and informative language feedback achieve better generalization and faster adaptation to new tasks.

### RoboReward: General-Purpose Vision-Language Reward Models for Robotics
- arXiv: 2601.00675 (2026). Authors: Lee, Wagenmaker, Pertsch, Liang, Levine, Finn.
- Method: builds a robotics reward dataset and benchmark from Open X-Embodiment and RoboArena; because those corpora are success-heavy, a negative-example augmentation pipeline creates calibrated failures and near-misses via counterfactual relabeling and temporal clipping. Trains 4B/8B vision-language reward models on the result and deploys them in real-robot RL.
- Signal type: VLM-judged reward (success/progress judgment over video plus language task description).
- Lifecycle stage: training (reward provision for RL); the benchmark half serves evaluation.
- Section: S10; benchmark component cross-references S11.
- Key claim: no existing open or proprietary VLM excels across tasks; their 4B/8B models outperform much larger VLMs at assigning rewards for short-horizon tasks, and the 8B model improves real-robot policy learning over Gemini Robotics-ER 1.5 while narrowing the gap to human-provided rewards.

### Robo-Dopamine: General Process Reward Modeling for High-Precision Robotic Manipulation
- arXiv: 2512.23703 (2025). Authors: Tan, Chen, Xu, Wang, Ji, Chi, Lyu, Zhao, Chen, Co, Xie, Yao, Wang, Wang, Zhang.
- Method: Dopamine-Reward learns a general step-aware process reward model (GRM) from multi-view inputs on a 3,400+ hour dataset, using step-wise reward discretization and multi-perspective reward fusion. Dopamine-RL then uses policy-invariant reward shaping so dense process rewards accelerate learning without changing the optimal policy, avoiding what the authors call the semantic trap.
- Signal type: process reward (step-level, multi-view; learned generative reward model).
- Lifecycle stage: training.
- Section: S10; strong cross-reference to S7 (PRMs) and S8 (dense shaping as credit assignment).
- Key claim: after one-shot adaptation from a single expert trajectory, the GRM lets Dopamine-RL improve a policy from near-zero to 95% success with only 150 online rollouts (about 1 hour of real-robot interaction).

### RT-H: Action Hierarchies Using Language
- arXiv: 2403.01823 (2024). Authors: Belkhale, Ding, Xiao, Sermanet, Vuong, Tompson, Chebotar, Dwibedi, Sadigh.
- Method: teaches the robot a "language of actions": fine-grained language motions like "move arm forward" sit between the high-level task and low-level actions. The policy first predicts the language motion, then the action conditioned on it, with visual context throughout. Because the intermediate layer is language, humans can correct execution by specifying language motions, and the policy can learn from those interventions.
- Signal type: instruction hierarchy plus correction (language motions as intervention interface).
- Lifecycle stage: inference (respond to interventions) and training (learn from them).
- Section: S10.
- Key claim: the language-action hierarchy yields more robust and flexible policies on multi-task data, and learning from language interventions outperforms learning from teleoperated interventions.

### AHA: A Vision-Language-Model for Detecting and Reasoning Over Failures in Robotic Manipulation
- arXiv: 2410.00371 (2024). Authors: Duan, Pumacay, Kumar, Wang, Tian, Yuan, Krishna, Fox, Mandlekar, Guo.
- Method: an open-source VLM that frames robot failure detection as free-form language reasoning. Fine-tuned on the AHA dataset generated by FailGen, which procedurally perturbs successful simulation demonstrations into failure trajectories. The failure explanations are then plugged into downstream frameworks: refining dense reward functions (Eureka-style), task planning, and sub-task verification.
- Signal type: critique (free-form failure explanation from a VLM).
- Lifecycle stage: inference (failure feedback consumed by RL reward refinement, TAMP, and trajectory generation).
- Section: S10; failure critique also instantiates S6 signal taxonomy.
- Key claim: surpasses GPT-4o in-context learning by 10.3% and the average of six compared models by 35.3% across metrics/datasets, and its feedback boosts downstream task success by an average of 21.4% across three frameworks versus GPT-4 models.

### Text2Reward: Reward Shaping with Language Models for Reinforcement Learning [ALREADY-CITED: xie2024text2reward]
- arXiv: 2309.11489 (2023). Authors: Xie, Zhao, Wu, Liu, Luo, Zhong, Yang, Yu.
- Method: data-free generation of shaped dense reward functions as executable programs grounded in a compact environment representation, given a natural-language goal. Unlike sparse reward-code generation, produces interpretable free-form dense reward code that can call existing packages and is iteratively refined with human feedback.
- Signal type: reward-code (dense, human-refinable).
- Lifecycle stage: problem-definition feeding training.
- Section: S10; also S7.
- Key claim: on 13 of 17 manipulation tasks (ManiSkill2, MetaWorld) generated rewards match or beat expert-written ones in success rate and convergence; learns six novel locomotion behaviors with over 94% success, and sim-trained policies deploy to the real world.

### DrEureka: Language Model Guided Sim-To-Real Transfer
- arXiv: 2406.01967 (2024). Authors: Ma, Liang, Wang, Wang, Zhu, Fan, Bastani, Jayaraman.
- Method: extends Eureka-style LLM reward design to the full sim-to-real recipe: given only the target-task physics simulation, the LLM constructs both the reward function and the domain-randomization distributions needed for real-world transfer, removing the manual design/tuning loop.
- Signal type: reward-code plus configuration generation (language-guided sim-to-real design).
- Lifecycle stage: problem-definition feeding training.
- Section: S10.
- Key claim: discovers sim-to-real configurations competitive with human-designed ones on quadruped locomotion and dexterous manipulation, and solves novel tasks such as a quadruped balancing and walking on a yoga ball without iterative manual design.

---

## Discovered papers (2024-2026)

### RL-VLM-F: Reinforcement Learning from Vision Language Foundation Model Feedback
- arXiv: 2402.03681 (2024). Authors: Wang, Sun, Zhang, Xian, Biyik, Held, Erickson.
- Method: automatically generates reward functions from only a text description of the goal plus the agent's visual observations. The key move: query the VLM for preferences over pairs of image observations rather than raw reward scores (which are noisy and inconsistent), then learn a reward function from those preference labels.
- Signal type: preference-with-rationale (VLM pairwise preference grounded in the goal text).
- Lifecycle stage: training.
- Section: S10; the preference-versus-score design point is directly relevant to S7.
- Key claim: produces effective rewards and policies across classic control and rigid/articulated/deformable-object manipulation without human supervision, outperforming prior large-pretrained-model reward generation under the same assumptions.

### MotIF: Motion Instruction Fine-tuning
- arXiv: 2409.10683 (2024). Authors: Hwang, Hejna, Sadigh, Bisk.
- Method: off-the-shelf VLM success detectors fail when success depends on the full motion, not the final state. MotIF fine-tunes VLMs on abstract trajectory representations (keypoint trajectories overlaid on the final image) to ground robot motion semantically, and contributes MotIF-1K: 653 human and 369 robot demonstrations across 13 task categories.
- Signal type: VLM success/failure judgment (trajectory-grounded verbal verification).
- Lifecycle stage: inference (success detection feeding downstream feedback loops); dataset serves evaluation.
- Section: S10; dataset cross-references S11.
- Key claim: fine-tuning with trajectory-level abstract representations yields superior success detection across diverse tasks and environments compared to single-frame or frame-aggregate VLM baselines.

### RACER: Rich Language-Guided Failure Recovery Policies for Imitation Learning
- arXiv: 2409.14674 (2024). Authors: Dai, Lee, Fazeli, Chai.
- Method: a scalable pipeline augments expert demonstrations with failure-recovery trajectories and fine-grained language annotations; a supervisor-actor framework then pairs a VLM online supervisor, which produces detailed language guidance for error correction, with a language-conditioned visuomotor policy that executes.
- Signal type: critique/instruction (machine-generated rich language supervision during execution).
- Lifecycle stage: training (failure-recovery data augmentation) plus inference (online supervision).
- Section: S10.
- Key claim: outperforms Robotic View Transformer on RLBench across standard long-horizon, dynamic goal-change, and zero-shot unseen-task settings, in simulation and the real world.

### ViSTa Dataset: Do vision-language models understand sequential tasks?
- arXiv: 2411.13211 (2024). Authors: Wybitul, Gunter, Seleznyov, Lindner.
- Method: a dataset of over 4,000 videos with step-by-step descriptions in virtual home, Minecraft, and real-world environments, hierarchically composed from single-step tasks into increasingly complex sequential tasks, to test whether VLMs can supervise tasks that cannot be scored from the final state alone. Evaluates CLIP, ViCLIP, and GPT-4o.
- Signal type: evaluation of VLM reward/supervision quality (not a new signal itself).
- Lifecycle stage: evaluation.
- Section: S11 (feedback-quality benchmarks); motivates S10's caution on VLM reward models.
- Key claim: evaluated VLMs are good at object recognition but fail to understand sequential tasks, with only GPT-4o achieving non-trivial performance.

### VLM-RL: A Unified Vision Language Models and Reinforcement Learning Framework for Safe Autonomous Driving
- arXiv: 2412.15544 (2024). Authors: Huang, Sheng, Qu, You, Chen.
- Method: contrasting-language-goal (CLG)-as-reward: positive and negative language goals generate semantic rewards from image observations, combined hierarchically with vehicle-state information for stability, with batch processing for efficiency; integrates with standard RL algorithms in CARLA.
- Signal type: instruction (contrastive language goals) converted to dense semantic reward.
- Lifecycle stage: training.
- Section: S10 (embodied beyond manipulation: driving).
- Key claim: 10.5% reduction in collision rate and 104.6% increase in route completion over state-of-the-art baselines in CARLA, with generalization to unseen scenarios.

### VLA-RL: Towards Masterful and General Robotic Manipulation with Scalable Reinforcement Learning
- arXiv: 2505.18719 (2025). Authors: Lu, Guo, Zhang, Zhou, Jiang, Gao, Tang, Wang.
- Method: online RL for pretrained autoregressive VLA models, modeling manipulation trajectories as multi-modal multi-turn conversation. To fight sparse rewards, fine-tunes a pretrained VLM into a robotic process reward model trained on pseudo reward labels over automatically extracted task segments; adds systems-level tricks (curriculum selection, vectorized environments, batch decoding, critic warmup).
- Signal type: process reward (VLM-derived pseudo-labels over task segments).
- Lifecycle stage: training.
- Section: S10; PRM design cross-references S7/S8.
- Key claim: lifts OpenVLA-7B by 4.5% over the strongest fine-tuned baseline on 40 LIBERO manipulation tasks, matching commercial pi0-FAST-level performance.

### FailSafe: Reasoning and Recovery from Failures in Vision-Language-Action Models
- arXiv: 2510.01642 (2025). Authors: Lin, Duan, Fang, Fox, Krishna, Tan, Wen.
- Method: a failure generation and recovery system that automatically produces diverse failure cases paired with executable recovery actions in any simulator with motion-planning support, addressing datasets that offer only text explanations of failure. Fine-tunes LLaVA-OneVision-7B into FailSafe-VLM, which watches execution and proposes recovery.
- Signal type: critique plus executable recovery action (failure reasoning grounded into action).
- Lifecycle stage: training (failure-action data generation) plus inference (online detection/recovery).
- Section: S10.
- Key claim: FailSafe-VLM improves three state-of-the-art VLA models (Pi-0-FAST, OpenVLA, OpenVLA-OFT) by up to 22.6% on average across ManiSkill tasks and generalizes across viewpoints, objects, and embodiments.

### Scaling Cross-Environment Failure Reasoning Data for Vision-Language Robotic Manipulation (Guardian/FailCoT)
- arXiv: 2512.01946 (2025). Authors: Pacaud, Garcia, Chen, Schmid.
- Method: automatic framework perturbing successful manipulation trajectories in simulation (RLBench) and real-robot data (BridgeDataV2) to synthesize realistic failures, with VLM-produced structured step-by-step reasoning traces, yielding the FailCoT dataset. Trains Guardian, a multi-view reasoning VLM for unified planning and execution verification.
- Signal type: critique (structured failure-reasoning traces; verification verdicts).
- Lifecycle stage: training (data scaling for the verifier) plus inference (verification in the loop).
- Section: S10; verification-in-the-loop connects to S7.
- Key claim: Guardian achieves state-of-the-art on RoboFail, RoboVQA, and the new UR5-Fail benchmark, and consistently boosts task success when integrated with a state-of-the-art LLM-based manipulation policy in simulation and real deployment.

### Large Reward Models: Generalizable Online Robot Reward Generation with Vision-Language Models
- arXiv: 2603.16065 (2026). Authors: Wu, Yuan, Qi, Guizilini, Mao, Wang.
- Method: adapts foundation VLMs into online reward generators for policy refinement: a reward model trained on a large multi-source dataset (real robot trajectories, human-object interactions, simulation) emits a multifaceted signal of process, completion, and temporal-contrastive rewards from current visual observations, guiding closed-loop correction of an imitation-learned base policy. Zero-shot in test environments.
- Signal type: VLM reward (process + completion + temporal contrastive).
- Lifecycle stage: training (online RL refinement).
- Section: S10.
- Key claim: significantly improves the initial imitation policy's success rate on long-horizon manipulation within just 30 RL iterations, with the reward model operating purely zero-shot.

### SOLE-R1: Video-Language Reasoning as the Sole Reward for On-Robot Reinforcement Learning
- arXiv: 2603.28730 (2026). Authors: Schroeder, Weng, Schmeckpeper, Rosen, Hart, Biza.
- Method: a video-language reasoning model designed to be the only reward signal for online robot RL. Given raw video and a natural-language goal, it performs per-timestep spatiotemporal chain-of-thought reasoning and outputs dense task-progress estimates used directly as rewards. Trained via a synthesis pipeline for temporally grounded CoT traces aligned with continuous progress supervision, combining SFT with RL from verifiable rewards.
- Signal type: rubric-like dense progress reward produced through explicit verbal (CoT) reasoning over video.
- Lifecycle stage: training.
- Section: S10; reward-hacking robustness result cross-references S12.
- Key claim: enables zero-shot online RL from random initialization, succeeding on 24 unseen manipulation tasks with no ground-truth rewards, success indicators, or demonstrations, and substantially outperforms strong vision-language rewarders (Robometer, RoboReward, ReWiND, GPT-5, Gemini-3-Pro) while being markedly more robust to reward hacking.

### The Evolving Landscape of LLM- and VLM-Integrated Reinforcement Learning
- arXiv: 2502.15214 (2025). Authors: Schoepp, Jafaripour, Cao, Yang, Abdollahi, Golestan, Sufiyan, Zaiane, Taylor.
- Method: survey of LLM/VLM-assisted RL organized by the role the foundation model plays: agent, planner, or reward. Reviews how these models address lack of prior knowledge, long-horizon planning, and reward design, and discusses grounding, bias mitigation, representations, and action advice as open problems.
- Signal type: n/a (survey; taxonomy of where language/vision-language models inject into RL).
- Lifecycle stage: n/a (covers all stages).
- Section: S10 framing; also belongs on the T9 comparison-survey shelf for the prior-surveys table (reviewer weakness (f)).
- Key claim: a three-role taxonomy (agent, planner, reward) organizes LLM/VLM-integrated RL and exposes grounding and bias mitigation as the field's open problems.

---

## Reviewer-weakness hooks this thread serves

- (d) shallow RL treatment: language-to-reward (reward code vs reward parameters vs learned VLM reward) gives concrete MDP consequences to discuss: reward specified in language changes the optimization target (Eureka/Text2Reward), while VLM reward models replace R(s,a) with a learned judge subject to partial observability and hacking (SOLE-R1's robustness claim; ViSTa's negative result).
- (e) practitioner guidance: this thread yields a clean decision axis for S13: hand corrections (LILAC/DROC/YAY) when a human is in the loop; reward code (Eureka/Text2Reward/DrEureka) when a simulator exposes state; VLM rewards (RoboReward/LRM/SOLE-R1) when only pixels are available; failure-reasoning VLMs (AHA/FailSafe/Guardian) when policies must recover autonomously.
- (h) "verbal" scope: VLM reward models are exactly the multimodal boundary reviewers flagged; S10 should state explicitly that the verbal signal is the language half (goal text, critique text, CoT reasoning) even when grounding is visual.
- (c) hybrid cases: DROC (correction + memory) and YAY Robot (inference-time correction that becomes training data) are worked examples for the cross-pillar decision rules.
