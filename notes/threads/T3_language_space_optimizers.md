# T3. Language-space optimizers: textual gradients, prompt evolution, verbalized ML, training-free RL, context engineering (feeds S9)

Verification: every arXiv id below was resolved to its arxiv.org/abs page on 2026-07-11 and the canonical title, authors, and abstract were taken from that page. No seed failed verification; the EXCLUDED list is empty. Key claims are drawn from each paper's own abstract; where the abstract gives no number, the claim is stated without numbers.

Coverage: 21 seeds (5 already cited in paper-acl/references.bib) plus 15 discovered papers (2024-2026), 36 total. New bib entries (31) are in T3_language_space_optimizers.bib.

Reviewer hooks this thread serves:
- Weakness (d) shallow RL treatment: Trace's OPTO gives S2 a formal optimization setup; GEPA vs GRPO, Training-Free GRPO, P2O, E-SPL, and LSE give S9 a concrete language-space-vs-policy-gradient comparison axis (sample efficiency, where the learned knowledge lives, generalization).
- Weakness (e) practitioner guidance: rollout/cost numbers (GEPA 35x fewer rollouts; SPO at 1.1%-5.6% of baseline cost; AFlow at 4.55% of GPT-4o inference cost) support a when-to-use-what table in S13.
- Weakness (f)/(g) added value and agenda: four survey-shelf papers below delimit what S9 covers that they do not (the learning-signal view of textual gradients inside a VRL lifecycle); the failure-mode papers (Ma et al., VISTA, When Gradients Collide, MAS-PromptBench) seed the S13 agenda.
- Weaknesses (a)/(c) boundaries: GReaTer and PromptQuine are non-verbal contrast methods that sharpen the "what is NOT VRL" line; ACE/Training-Free GRPO sit on the S9-vs-memory (T4) boundary and need an explicit decision rule.

---

## A. Foundational language-space optimizers

### Large Language Models as Optimizers (OPRO)
- arXiv: 2309.03409 (2023). [ALREADY-CITED] as yang2024opro.
- Authors: Yang, Wang, Lu, Liu, Le, Zhou, Chen.
- Method: Optimization by PROmpting (OPRO) describes an optimization task in natural language and asks an LLM to propose new solutions given a prompt containing previously generated solutions with their scores. New solutions are evaluated and appended to the prompt for the next step, forming a verbalized optimization trajectory. Demonstrated on linear regression and traveling salesman before the main application, prompt optimization.
- Signal type: score-history-in-prompt (verbalized numeric feedback); no gradients.
- Lifecycle stage: training (language-space outer loop, no weight updates).
- Section: S9 (opening exemplar of language as the optimizer's working memory).
- Key claim: OPRO-optimized prompts outperform human-designed prompts by up to 8% on GSM8K and up to 50% on Big-Bench Hard tasks.

### Promptbreeder: Self-Referential Self-Improvement Via Prompt Evolution
- arXiv: 2309.16797 (2023). [ALREADY-CITED] as fernando2023promptbreeder.
- Authors: Fernando, Banarse, Michalewski, Osindero, Rocktäschel.
- Method: an LLM-driven evolutionary loop mutates a population of task-prompts and evaluates fitness on a training set. The mutation operators are themselves prompts (mutation-prompts) that the LLM improves during evolution, making the process self-referential: it improves the prompts and the prompts that improve the prompts.
- Signal type: instruction (evolutionary mutation of prompts, fitness scores as selection signal).
- Lifecycle stage: training (language-space outer loop, no weight updates).
- Section: S9 (evolutionary branch; ancestor of GEPA-style reflective evolution).
- Key claim: outperforms Chain-of-Thought and Plan-and-Solve prompting on arithmetic and commonsense reasoning benchmarks, and evolves prompts for hate-speech classification.

### DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines
- arXiv: 2310.03714 (2023). NEW: khattab2023dspy.
- Authors: Khattab, Singhvi, Maheshwari, Zhang, Santhanam, Vardhamanan, Haq, Sharma, Joshi, Moazam, Miller, Zaharia, Potts.
- Method: abstracts LM pipelines as text-transformation graphs in which LMs are invoked through declarative, parameterized modules. A compiler optimizes any pipeline toward a metric by creating and collecting demonstrations and composing prompting, finetuning, augmentation, and reasoning strategies, replacing hand-tuned prompt template strings.
- Signal type: instruction + demonstrations (compiler-selected), driven by a task metric.
- Lifecycle stage: training (program-level language-space optimization).
- Section: S9 (the programming-model substrate that MIPROv2 and GEPA optimize inside).
- Key claim: within minutes of compiling, short DSPy programs let GPT-3.5 and llama2-13b-chat outperform standard few-shot prompting (generally by over 25% and 65% respectively) and expert-crafted demonstrations (by up to 5-46% and 16-40%).

### Optimizing Instructions and Demonstrations for Multi-Stage Language Model Programs (MIPRO)
- arXiv: 2406.11695 (2024). [ALREADY-CITED] as opsahlong2024mipro.
- Authors: Opsahl-Ong, Ryan, Purtell, Broman, Potts, Zaharia, Khattab.
- Method: prompt optimization for multi-module LM programs without module-level labels or gradients. Factorizes the problem into per-module instructions and few-shot demonstrations, proposes instructions with program- and data-aware techniques, learns a surrogate objective via stochastic mini-batch evaluation, and meta-optimizes how proposals are constructed over time.
- Signal type: instruction + demonstrations; surrogate-model credit assignment across modules.
- Lifecycle stage: training (language-space outer loop, no weight updates).
- Section: S9 (also S8: its module-level credit assignment problem is the language-space analogue of temporal credit assignment).
- Key claim: MIPRO outperforms baseline optimizers on five of seven multi-stage LM programs with Llama-3-8B, by up to 13% accuracy.

## B. Textual-gradient frameworks

### TextGrad: Automatic "Differentiation" via Text
- arXiv: 2406.07496 (2024). [ALREADY-CITED] as yuksekgonul2024textgrad.
- Authors: Yuksekgonul, Bianchi, Boen, Liu, Huang, Guestrin, Zou.
- Method: backpropagates natural-language feedback from LLMs through computation graphs of compound AI systems, treating critiques as "gradients" attached to variables ranging from code to molecular structures. Follows PyTorch syntax and abstractions; users specify only the objective. Note: the thread map records a 2025 Nature journal version; the abs page does not list a journal reference, so cite the journal version only after separate verification.
- Signal type: critique (textual gradients).
- Lifecycle stage: training (language-space outer loop, no weight updates).
- Section: S9 (anchor method; S2 can borrow its computation-graph formalism).
- Key claim: without framework modification, improves GPT-4o zero-shot GPQA accuracy from 51% to 55% and yields 20% relative gains on LeetCode-Hard code optimization.

### metaTextGrad: Automatically optimizing language model optimizers
- arXiv: 2505.18524 (2025). NEW: xu2025metatextgrad.
- Authors: Xu, Yuksekgonul, Guestrin, Zou.
- Method: observes that LLM-based optimizers (DSPy, TextGrad) are themselves hand-designed and task-agnostic, then meta-optimizes them: a meta prompt optimizer tunes the optimizer's own prompts and a meta structure optimizer tunes its structure, aligning a general-purpose optimizer to a given task.
- Signal type: critique (meta-level textual gradients over the optimizer itself).
- Lifecycle stage: training (meta-optimization of the language-space optimizer).
- Section: S9 (optimizer-of-optimizers subsection; natural S13 agenda item on meta-learning the feedback channel).
- Key claim: the combination of the two meta-optimizers yields an average absolute improvement of up to 6% over the best baseline across benchmarks.

### Trace is the Next AutoDiff: Generative Optimization with Rich Feedback, Execution Traces, and LLMs
- arXiv: 2406.16218 (2024). NEW: cheng2024trace.
- Authors: Cheng, Nie, Swaminathan.
- Method: frames automatic update of general computational workflows as Optimization with Trace Oracle (OPTO): the optimizer receives an execution trace plus output feedback and updates heterogeneous parameters (prompts, code). The Trace library converts workflow optimization into OPTO instances with PyTorch-like syntax; OptoPrime is the LLM-based optimizer built on it.
- Signal type: critique over execution traces (rich feedback beyond scalar scores).
- Lifecycle stage: training (language-space outer loop over workflows).
- Section: S9; the OPTO setup is the strongest available formal object for S2's treatment of language-space optimization (reviewer weakness (d)).
- Key claim: execution traces play the role backpropagated gradients play in AutoDiff; OptoPrime handles first-order numerical optimization, prompt optimization, hyperparameter tuning, robot controller design, and code debugging, often competitive with per-domain specialized optimizers.

### The Importance of Directional Feedback for LLM-based Optimizers
- arXiv: 2405.16434 (2024). NEW: nie2024importance.
- Authors: Nie, Cheng, Kolobov, Swaminathan.
- Method: classifies natural-language feedback into directional and non-directional, with directional feedback generalizing first-order gradient information to text space. Finds LLMs optimize markedly better under directional feedback and builds an optimizer that synthesizes directional feedback from the historical optimization trace.
- Signal type: critique (directional natural-language feedback).
- Lifecycle stage: training (language-space outer loop).
- Section: S9 (also S2: gives the survey a vocabulary for typing verbal feedback by information content, which answers the reviewers' call for sharper formal structure).
- Key claim: an optimizer that synthesizes directional feedback from history is more stable and efficient than existing techniques, from maximizing mathematical functions to optimizing poem-writing prompts.

### LLM-AutoDiff: Auto-Differentiate Any LLM Workflow
- arXiv: 2501.16673 (2025). NEW: yin2025llmautodiff.
- Authors: Yin, Wang.
- Method: extends textual-gradient methods to multi-component, potentially cyclic LLM architectures inside the AdalFlow library. Treats each textual input as a trainable parameter, uses a frozen backward-engine LLM to generate feedback, accommodates functional (non-LLM) nodes, preserves time-sequential behavior in repeated calls such as multi-hop loops, isolates sub-prompts to fight lost-in-the-middle effects, and computes gradients selectively on error-prone samples.
- Signal type: critique (textual gradients through cyclic graphs).
- Lifecycle stage: training (language-space outer loop, no weight updates).
- Section: S9.
- Key claim: consistently outperforms existing textual-gradient baselines in both accuracy and training cost across classification, multi-hop RAG QA, and agent pipelines.

### REVOLVE: Optimizing AI Systems by Tracking Response Evolution in Textual Optimization
- arXiv: 2412.03092 (2024). NEW: zhang2024revolve.
- Authors: Zhang, Jin, Hu, Li, Kang, Luo, Song, Wang.
- Method: argues immediate textual feedback is analogous to using only first derivatives and can stall. REVOLVE tracks how system responses evolve across iterations and makes progressive, evolution-aware adjustments, a second-order-flavored correction to TextGrad-style optimization.
- Signal type: critique (history-aware textual gradients).
- Lifecycle stage: training (language-space outer loop).
- Section: S9 (optimizer-dynamics subsection alongside TEP and Directional Feedback).
- Key claim: outperforms competitive baselines with 7.8% improvement in prompt optimization, 20.72% in solution refinement, and 29.17% in code optimization.

### How to Correctly do Semantic Backpropagation on Language-based Agentic Systems
- arXiv: 2412.03624 (2024). NEW: wang2024how.
- Authors: Wang, Alyahya, Ashley, Serikov, Khizbullin, Faccio, Schmidhuber.
- Method: formalizes semantic backpropagation with semantic gradients for Graph-based Agentic System Optimization (GASO), generalizing reverse-mode autodiff and TextGrad by exploiting relationships among nodes that share a successor, then applies semantic gradient descent to assign output feedback to components correctly.
- Signal type: critique (semantic gradients with principled node-level credit assignment).
- Lifecycle stage: training (language-space outer loop).
- Section: S9 (also S8: this is the cleanest statement of structural credit assignment in language space, directly serving reviewer weakness (d)).
- Key claim: outperforms existing state-of-the-art GASO methods on BIG-Bench Hard and GSM8K, with an ablation on LIAR showing the method's parsimony.

### Textual Equilibrium Propagation for Deep Compound AI Systems (TEP)
- arXiv: 2601.21064 (2026). NEW: chen2026textual.
- Authors: Chen, Deng, Zou, Yu, Li.
- Method: identifies two depth-scaling failure modes of global textual backpropagation: exploding textual gradients (feedback grows exponentially with depth) and vanishing textual gradients (compression loses specificity across hops). TEP, inspired by equilibrium propagation in energy-based models, runs a free phase where local LLM critics refine prompts to equilibrium and a nudged phase applying proximal, bounded prompt edits with task-level objectives propagated by forward signaling.
- Signal type: critique (local, equilibrium-based textual feedback instead of global backprop).
- Lifecycle stage: training (language-space outer loop).
- Section: S9 (depth-scaling limits of textual gradients; feeds S13 agenda on optimizer stability).
- Key claim: consistently improves accuracy and efficiency over global propagation methods such as TextGrad on long-horizon QA and multi-agent tool use, with gains growing with system depth.

## C. Reflective prompt evolution

### GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning
- arXiv: 2507.19457 (2025). [ALREADY-CITED] as agrawal2026gepa.
- Authors: Agrawal, Tan, Soylu, Ziems, Khare, Opsahl-Ong, Singhvi, Shandilya, Ryan, Jiang, Potts, Sen, Dimakis, Stoica, Klein, Zaharia, Khattab.
- Method: GEPA (Genetic-Pareto) samples system trajectories (reasoning, tool calls, outputs), reflects on them in natural language to diagnose problems, proposes and tests prompt updates, and combines complementary lessons from the Pareto frontier of its own attempts. Argues language is a richer learning medium than policy gradients from sparse scalar rewards.
- Signal type: critique (reflective diagnosis) driving instruction mutation; Pareto selection.
- Lifecycle stage: training (language-space outer loop); also usable as inference-time search.
- Section: S9 (centerpiece of the language-space-vs-RL comparison the reviewers asked for in weakness (d)).
- Key claim: outperforms GRPO by 6% on average and up to 20% while using up to 35x fewer rollouts, and beats MIPROv2 by over 10% (e.g., +12% accuracy on AIME 2025).

### Reflection in the Dark: Exposing and Escaping the Black Box in Reflective Prompt Optimization (VISTA)
- arXiv: 2603.18388 (2026). NEW: liu2026reflection. (Thread map listed this id as "VISTA failure modes"; the canonical abs-page title is as above, and VISTA is the proposed framework.)
- Authors: Liu, Xia, Xia, Liu, Yu, Qu.
- Method: shows reflective APO such as GEPA is black-box and label-free, producing uninterpretable trajectories and systematic failures (four limitations demonstrated empirically). VISTA is a multi-agent APO framework that decouples hypothesis generation from prompt rewriting, adds semantically labeled hypotheses, parallel minibatch verification, interpretable traces, and a two-layer explore-exploit scheme (random restart plus epsilon-greedy) to escape local optima.
- Signal type: critique (labeled hypotheses with verification), multi-agent.
- Lifecycle stage: training (language-space outer loop); doubles as failure-mode analysis.
- Section: S9 (limits-of-reflection subsection; feeds S12/S13 on trusting the optimizer's own diagnosis).
- Key claim: with a defective seed prompt, GEPA degrades GSM8K accuracy from 23.81% to 13.50%; VISTA recovers it to 87.57% and outperforms baselines across all conditions on GSM8K and AIME 2025.

## D. Verbalized ML, training-free RL, and context engineering

### Verbalized Machine Learning: Revisiting Machine Learning with Language Models (VML)
- arXiv: 2406.04344 (2024). NEW: xiao2024verbalized.
- Authors: Xiao, Bamler, Schölkopf, Liu.
- Method: constrains the parameter space of machine learning to human-interpretable natural language: an LLM with a text prompt is a function parameterized by that prompt, and classical problems (regression, classification) are solved by an LLM-parameterized learner plus an LLM-parameterized optimizer that verbally updates the learner. Inductive bias is injected as verbalized priors; the optimizer can switch model classes during training and explains each update.
- Signal type: instruction (prompts as parameters; verbalized update rules with rationales).
- Lifecycle stage: training (fully language-space learning loop).
- Section: S9 (conceptual core: gives S2 the "prompt = parameter vector, optimizer = LLM" abstraction; strong for reviewer weakness (a), since it makes the language-space hypothesis class explicit).
- Key claim: classical ML problems can be solved with language-space parameters, giving easy inductive-bias encoding, automatic model-class selection, and interpretable updates.

### Training-Free Group Relative Policy Optimization
- arXiv: 2510.08191 (2025). NEW: cai2025trainingfree.
- Authors: Cai, Cai, Shi, Xu, Chen, Qin, Tan, Li, Li, Lin, Mao, Li, Sun.
- Method: replaces GRPO's parameter updates with learning an experiential-knowledge token prior. Within each group of rollouts it extracts a group relative semantic advantage (natural-language comparison of rollouts) instead of numerical advantages, iteratively distilling high-quality experience over multiple epochs on minimal ground-truth data; the distilled knowledge is injected at API-call time to steer the frozen model.
- Signal type: memory (semantic advantage distilled into a reusable token prior).
- Lifecycle stage: training (experience accumulation in language space, frozen weights).
- Section: S9 (training-free RL subsection; boundary case with T4 memory, so S3 needs a decision rule: optimizer-managed context vs agent-managed episodic memory).
- Key claim: applied to DeepSeek-V3.1-Terminus with a few dozen training samples, it improves out-of-domain math and web-search performance and outperforms fine-tuned small LLMs at marginal cost.

### Agentic Context Engineering: Evolving Contexts for Self-Improving Language Models (ACE)
- arXiv: 2510.04618 (2025). NEW: zhang2025agentic.
- Authors: Zhang, Hu, Upasani, Ma, Hong, Kamanuru, Rainton, Wu, Ji, Li, Thakker, Zou, Olukotun.
- Method: treats contexts as evolving playbooks maintained by a modular generation-reflection-curation process. Diagnoses two failure modes of iterative context rewriting, brevity bias and context collapse, and prevents them with structured incremental updates that preserve detail and scale with long-context models; works offline (system prompts) and online (agent memory), with or without labels, using natural execution feedback.
- Signal type: memory/instruction (curated playbook contexts; reflective curation).
- Lifecycle stage: training (context evolution across episodes, no weight updates).
- Section: S9 (context engineering as the optimization target; shares the T4 boundary discussion with Training-Free GRPO).
- Key claim: +10.6% on agent benchmarks and +8.6% on finance tasks over strong baselines with lower adaptation latency and rollout cost; matches the top-ranked production agent on the AppWorld leaderboard average and surpasses it on the harder test-challenge split with a smaller open-source model.

### Learning to Self-Evolve (LSE)
- arXiv: 2603.18620 (2026). NEW: chen2026learning.
- Authors: Chen, Xu, Wang, Liu, Yao, He.
- Method: instead of relying on a model's innate reflection ability, LSE trains an LLM with RL to edit its own context at test time: the multi-step evolution problem is reduced to a single-step RL objective where each context edit is rewarded by the improvement in downstream performance, paired with a tree-guided evolution loop.
- Signal type: memory (learned context edits; scalar reward on edit quality).
- Lifecycle stage: training (RL-trained editor) enabling inference-time self-evolution.
- Section: S9 (closes the loop between S9 and S6: the language-space optimizer itself becomes the trained policy; directly serves reviewer weakness (d)).
- Key claim: a 4B model trained with LSE outperforms self-evolving policies powered by GPT-5 and Claude Sonnet 4.5 as well as GEPA and TextGrad on BIRD text-to-SQL and MMLU-Redux, and transfers to guide other models without additional training.

### Self-Adapting Language Models (SEAL)
- arXiv: 2506.10943 (2025). NEW: zweiger2025selfadapting.
- Authors: Zweiger, Pari, Guo, Akyürek, Kim, Agrawal.
- Method: the model generates its own finetuning data and update directives ("self-edits"): restructured information, optimization hyperparameters, or tool invocations for data augmentation, which are applied through SFT for persistent weight updates. An RL loop trains the self-edit generator, rewarding edits by the downstream performance of the updated model.
- Signal type: self-edit (generated training data plus update directives).
- Lifecycle stage: training (language-space proposals realized as weight updates).
- Section: S9 (boundary with S6: language is the medium of the update proposal even though the effect lands in parameters; a named hybrid case for the S3 decision rules the reviewers demanded).
- Key claim: on knowledge incorporation and few-shot generalization, SEAL improves adaptation using the model's own generations to control the update process, without separate adaptation modules or auxiliary networks.

## E. Joint prompt and weight optimization

### P^2O: Joint Policy and Prompt Optimization
- arXiv: 2603.21877 (2026). NEW: lu2026p2o.
- Authors: Lu, Zhang, Yang, Cao, Lu, Lin, He, Han, Sun.
- Method: targets advantage collapse in RLVR on hard samples where all rollouts fail and no learning signal exists. Alternates continuous policy updates with discrete prompt evolution: GEPA discovers prompts that make intractable instances solvable, then context distillation internalizes the prompt-induced gains into the weights, removing inference-time prompting.
- Signal type: instruction (evolved prompts) distilled into parameters; scalar RLVR reward.
- Lifecycle stage: training (alternating language-space and parameter-space updates).
- Section: S9 (also S8: prompt evolution as a rescue mechanism for credit starvation in sparse-reward RL, a direct answer to reviewer weakness (d)).
- Key claim: restores advantage signals, outperforms standard GRPO and doubled-rollout baselines, and yields up to 9.5% improvement with strong out-of-distribution generalization.

### Evolutionary System Prompt Learning for Reinforcement Learning in LLMs (E-SPL)
- arXiv: 2602.14697 (2026). NEW: zhang2026evolutionary.
- Authors: Zhang, Chen, Stadie.
- Method: each RL iteration samples trajectories under multiple system prompts in parallel, then jointly applies RL updates to weights and evolutionary updates to system prompts. Mutation and crossover are genetic operators driven by LLM self-reflection; selection uses relative performance ratings maintained across iterations. Encourages declarative knowledge to live in prompts and procedural knowledge in weights.
- Signal type: instruction (system prompt evolution via reflective mutation/crossover) + scalar RL.
- Lifecycle stage: training (joint language-space and parameter-space updates).
- Section: S9 (joint-optimization subsection with P2O and SIA).
- Key claim: in an easy-to-hard AIME to BeyondAIME setting, E-SPL lifts RL success from 38.8% to 45.1% and outperforms reflective prompt evolution alone (40.0%), with consistent sample-efficiency and generalization gains.

### SIA: Self Improving AI with Harness & Weight Updates
- arXiv: 2605.27276 (2026). NEW: hebbar2026sia. [DISCOVERED]
- Authors: Hebbar, Manawat, Verboomen, Ivanova, Palanimalai, Bhatia, Baskaran.
- Method: unifies the harness-update school (a meta-agent rewrites a task agent's scaffold: tools, prompts, retry logic, search procedure) with the test-time-training school (RL updates to weights). A Feedback-Agent LLM updates both the harness and the weights of a task-specific agent in one self-improving loop, evaluated on legal charge classification, GPU kernel optimization, and single-cell RNA denoising.
- Signal type: critique (Feedback-Agent) acting on harness code/prompts and on weights.
- Lifecycle stage: training (joint harness and parameter updates).
- Section: S9 (joint-optimization subsection; its harness-vs-weights division of labor is a practitioner-guidance datapoint for S13).
- Key claim: combining both levers beats scaffold iteration alone on all three benchmarks: 25.1% over prior SOTA on LawBench, 12.4% faster GPU kernels (1,017 vs 1,161 microseconds), and 20.4% over prior SOTA on denoising.

## F. Agent- and workflow-level language-space optimization

### Symbolic Learning Enables Self-Evolving Agents
- arXiv: 2406.18532 (2024). NEW: zhou2024symbolic. [DISCOVERED]
- Authors: Zhou, Ou, Ding, Li, Wu, Wang, Chen, Wang, Xu, Zhang, Chen, Jiang.
- Method: treats a language agent as a symbolic network whose learnable weights are its prompts, tools, and pipeline structure. Agent symbolic learning optimizes this network with natural-language simulacrums of backpropagation and gradient descent (language loss, language gradients, language weight updates), moving agent development from engineering-centric to data-centric.
- Signal type: critique (language loss and language gradients over prompts, tools, and pipeline).
- Lifecycle stage: training (language-space outer loop over the whole agent).
- Section: S9 (agent-level generalization of textual gradients; bridge to S10 agent stacks).
- Key claim: proof-of-concept experiments on standard benchmarks and complex real-world tasks show agents that update themselves after deployment, yielding self-evolving agents.

### Automated Design of Agentic Systems (ADAS)
- arXiv: 2408.08435 (2024). NEW: hu2024automated. [DISCOVERED]
- Authors: Hu, Lu, Clune.
- Method: defines the research area of automatically designing agentic systems and instantiates it with Meta Agent Search: agents are defined in code, and a meta agent iteratively programs new agents, drawing on an ever-growing archive of prior discoveries. Because code is Turing-complete, the search space covers prompts, tool use, workflows, and their combinations.
- Signal type: code (agent designs) selected by performance; archive as verbal memory of designs.
- Lifecycle stage: training (outer search loop over agent programs).
- Section: S9 (design-space search branch, with AFlow and MASS; boundary note for S2: the feedback here is scores over programs, with language as the medium of the search operator).
- Key claim: Meta Agent Search progressively invents agents with novel designs that outperform state-of-the-art hand-designed agents across coding, science, and math domains.

### AFlow: Automating Agentic Workflow Generation
- arXiv: 2410.10762 (2024). NEW: zhang2024aflow. [DISCOVERED]
- Authors: Zhang, Xiang, Yu, Teng, Chen, Chen, Zhuge, Cheng, Hong, Wang, Zheng, Liu, Luo, Wu.
- Method: reformulates workflow optimization as search over code-represented workflows where LLM-invoking nodes are connected by edges. Uses Monte Carlo Tree Search with code modification, tree-structured experience, and execution feedback to refine workflows iteratively.
- Signal type: execution feedback over code-represented workflows (MCTS).
- Lifecycle stage: training (outer search loop over workflows).
- Section: S9 (design-space search branch).
- Key claim: 5.7% average improvement over state-of-the-art baselines across six benchmarks, and AFlow lets smaller models outperform GPT-4o on specific tasks at 4.55% of its dollar inference cost.

### Multi-Agent Design: Optimizing Agents with Better Prompts and Topologies (MASS)
- arXiv: 2502.02533 (2025). NEW: zhou2025multiagent. [DISCOVERED]
- Authors: Zhou, Wan, Sun, Palangi, Iqbal, Vulić, Korhonen, Arık.
- Method: analyzes the multi-agent design space and finds prompts and topologies are the critical factors. MASS optimizes in three interleaved stages, each conditioned on the previous: block-level (local) prompt optimization, workflow topology optimization, and workflow-level (global) prompt optimization, and distills design principles from the discovered systems.
- Signal type: instruction + topology (staged search with performance feedback).
- Lifecycle stage: training (outer search loop over multi-agent systems).
- Section: S9 (design-space search branch; pairs with MAS-PromptBench for evaluation).
- Key claim: MASS-optimized multi-agent systems outperform a spectrum of existing alternatives by a substantial margin.

### Self-Supervised Prompt Optimization (SPO)
- arXiv: 2502.06855 (2025). NEW: xiang2025selfsupervised. [DISCOVERED]
- Authors: Xiang, Zhang, Yu, Liang, Teng, Tu, Ren, Tang, Hong, Wu, Luo.
- Method: removes the need for ground truth or human references in prompt optimization: evaluation and optimization signals come purely from comparing model outputs. An LLM evaluator picks superior prompts through pairwise output comparisons and an LLM optimizer aligns outputs with task requirements, covering closed- and open-ended tasks.
- Signal type: preference-with-rationale (self-generated pairwise output judgments).
- Lifecycle stage: training (language-space outer loop, reference-free).
- Section: S9 (cost/supervision axis; strong S13 practitioner datapoint for label-scarce settings).
- Key claim: matches or beats state-of-the-art prompt optimization at 1.1% to 5.6% of the cost of existing methods and with as few as three samples.

### Evolving Prompts In-Context: An Open-ended, Self-replicating Perspective (PromptQuine)
- arXiv: 2506.17930 (2025). NEW: wang2025evolving. [DISCOVERED]
- Authors: Wang, Hu, Bing.
- Method: shows that pruning random in-context demonstrations into seemingly incoherent "gibberish" can improve performance, then builds PromptQuine, an evolutionary search framework that discovers pruning strategies by itself in low-data regimes, evolving unconventional prompts using only tokens already present in context.
- Signal type: contrast method: evolutionary token pruning with score selection, no verbal feedback content.
- Lifecycle stage: training (language-space outer loop, but sub-verbal).
- Section: S9 (boundary exhibit: with GReaTer, it marks the edge of "verbal" for the S2/S3 scope discussion demanded by reviewer weaknesses (a) and (h): the optimized object is text, but the improving signal carries no linguistic meaning).
- Key claim: pruned "gibberish" prompts always match or surpass state-of-the-art automatic prompt optimization techniques across classification, multi-choice QA, generation, and math reasoning, regardless of LLM alignment.

### GReaTer: Gradients over Reasoning Makes Smaller Language Models Strong Prompt Optimizers
- arXiv: 2412.09722 (2024). NEW: das2024greater. [DISCOVERED]
- Authors: Das, Kamoi, Pang, Zhang, Xiong, Zhang.
- Method: notes textual-feedback APO depends on large, expensive judge LLMs because small models generate poor feedback. GReaTer instead uses actual numeric gradients of the task loss computed over the model's reasoning, letting lightweight open-source models self-optimize prompts without a closed-source critic.
- Signal type: contrast method: numeric task-loss gradients (explicitly non-verbal feedback).
- Lifecycle stage: training (gradient-based prompt optimization).
- Section: S9 (boundary exhibit with PromptQuine: defines what falls outside VRL and quantifies the cost of the verbal channel; also relevant to S13 guidance on small-model regimes).
- Key claim: consistently outperforms prior state-of-the-art prompt optimization on BBH, GSM8K, and FOLIO, including methods that rely on powerful closed LLMs, and its prompts often transfer better.

## G. Analyses, failure modes, and benchmarks

### Are Large Language Models Good Prompt Optimizers?
- arXiv: 2402.02101 (2024). NEW: ma2024are. [DISCOVERED]
- Authors: Ma, Wang, Zhou, Li, Du, Gui, Zhang, Huang.
- Method: a controlled study of the mechanism behind reflection-based prompt optimization. Finds LLM optimizers struggle to identify the true causes of errors during reflection, defaulting to their own prior knowledge rather than genuinely analyzing failures, and that even valid reflections often fail to produce a working prompt in a single refinement step because target-model behavior is unpredictable. Proposes Automatic Behavior Optimization, which optimizes the target model's behavior directly and more controllably.
- Signal type: critique (analysis of reflection as a feedback channel).
- Lifecycle stage: analysis of training-stage language-space optimizers.
- Section: S9 (limits-of-reflection subsection with VISTA; feeds S12 on unfaithful self-diagnosis and the S13 agenda).
- Key claim: reflection-based LLM optimizers are biased by priors and frequently miss true error causes, motivating behavior-level rather than prompt-level optimization.

### When Gradients Collide: Failure Modes of Multi-Objective Prompt Optimization for LLM Judges
- arXiv: 2605.26046 (2026). NEW: darshan2026when.
- Authors: Darshan, Divekar.
- Method: extends TextGrad to multi-objective judge optimization, where numeric conflict-resolution tools from multi-task learning (PCGrad, MGDA) do not apply because gradients are natural-language critiques. Tests four decomposition modes varying how much cross-objective information the loss, gradient, and optimizer LLMs share, and isolates two separable failure modes: optimization-time gradient dilution and inference-time instruction interference.
- Signal type: critique (multi-objective textual gradients).
- Lifecycle stage: analysis of training-stage language-space optimizers.
- Section: S9 (multi-objective limits; also touches S7, since the optimized artifact is an LLM judge).
- Key claim: gradient task-focus drops by 59% (9.0 to 3.7 out of 10) when one gradient LLM must critique multiple criteria jointly, and naively merging single-objective optimized instructions degrades Spearman rho from 0.305 to 0.220.

### MAS-PromptBench: When Does Prompt Optimization Improve Multi-Agent LLM Systems?
- arXiv: 2606.23664 (2026). NEW: bai2026maspromptbench. [DISCOVERED]
- Authors: Bai, Shi.
- Method: a systematic study of system-prompt optimization across multi-agent setups varying task, workflow, communication protocol, and team size, benchmarking two prompt optimizers that extend state-of-the-art single-agent methods to the exponentially larger MAS search space.
- Signal type: benchmark (evaluation of instruction-optimization methods in MAS).
- Lifecycle stage: evaluation of training-stage optimizers.
- Section: S9 primary, cross-listed to S11 (benchmarks): it measures when language-space optimization pays off, a direct input to the S13 practitioner table.
- Key claim: prompt optimization can unlock significant MAS gains, but the gains are sensitive to system configuration, and open challenges remain in characterizing when and by how much it helps.

## H. Survey shelf for the S9 comparison table

### Compound AI Systems Optimization: A Survey of Methods, Challenges, and Future Directions
- arXiv: 2506.08234 (2025). NEW: lee2025compound.
- Authors: Lee, Yi, Liu, Lu, Yang, Chen.
- Method: formalizes compound AI system optimization and systematically reviews both numerical (SFT, RL) and language-based techniques, classifying methods along several dimensions and cataloging open challenges; maintains a public paper list.
- Signal type: survey (numerical + natural-language feedback optimization).
- Lifecycle stage: n/a (survey).
- Section: S9 related-surveys paragraph (reviewer weakness (f)): our added value over it is the VRL lifecycle placement of these optimizers and the link to credit assignment and safety, not the catalog itself.
- Key claim: natural-language feedback opens optimization routes for non-differentiable compound systems that numerical methods do not cover.

### Scaffolded Language Models with Language Supervision for Mixed-Autonomy: A Survey
- arXiv: 2410.16392 (2024). NEW: lin2024scaffolded. (Thread map listed this id under the earlier working title "LLM-based Optimization of Compound AI Systems"; the canonical abs-page title is as above.)
- Authors: Lin, Sheng, Zhao, Wang, Yue, Huang, Liu, Liu, Huang, Liu.
- Method: views scaffolded LMs (post-trained LMs embedded in multi-step tool-using processes) as semi-parametric models whose non-parametric variables (prompt, tools, scaffold code) are trained by an LM optimizer interpreting language supervision. Argues language-based optimization gives rich interpretable objectives, avoids catastrophic forgetting, and works with closed-source models; introduces streaming learning from real-time language supervision in mixed-autonomy deployments.
- Signal type: survey (training of non-parametric variables with language supervision).
- Lifecycle stage: n/a (survey).
- Section: S9 related-surveys paragraph; its semi-parametric vocabulary is worth adopting in S2 (it sharpens the reviewers' weakness (a) boundary question: VRL as training the non-parametric part).
- Key claim: non-parametric training's key feature is the ability to learn from language, complementing parametric learning from demonstration, exploration, or observation.

### A Survey of Context Engineering for Large Language Models
- arXiv: 2507.13334 (2025). NEW: mei2025survey.
- Authors: Mei, Yao, Ge, Wang, Bi, Cai, Liu, Li, Li, Zhang, Zhou, Mao, Xia, Guo, Liu.
- Method: defines context engineering as a formal discipline of optimizing the information payload supplied to LLMs, with a taxonomy of foundational components (retrieval/generation, processing, management) and their integrations (RAG, memory systems, tool-integrated reasoning, multi-agent systems), based on analysis of over 1400 papers.
- Signal type: survey (context as the engineered object).
- Lifecycle stage: n/a (survey).
- Section: S9 related-surveys paragraph (positions ACE/Training-Free GRPO within a larger context-optimization discipline); also background for S4 grounding.
- Key claim: a fundamental asymmetry exists between model capabilities: context-augmented models understand complex contexts well but remain weak at generating equally sophisticated long-form outputs.

### A Systematic Survey of Automatic Prompt Optimization Techniques
- arXiv: 2502.16923 (2025). NEW: ramnath2025systematic. [DISCOVERED]
- Authors: Ramnath, Zhou, Guan, Mishra, Qi, Shen, Wang, Woo, Jeoung, Wang, Wang, Ding, Lu, Xu, Zhou, Srinivasan, Yan, Chen, Ding, Xu, Cheong.
- Method: formally defines automatic prompt optimization (APO) and organizes the field with a 5-part unifying framework, rigorously categorizing existing works by their salient features and listing remaining challenges.
- Signal type: survey (APO).
- Lifecycle stage: n/a (survey).
- Section: S9 related-surveys paragraph (reviewer weakness (f)): S9 differs by treating prompt optimization as one instance of verbal learning signals inside the VRL lifecycle, alongside training-free RL and joint prompt-weight methods that APO surveys do not integrate.
- Key claim: provides a formal APO definition and a 5-part unifying framework intended to guide further research.

---

## EXCLUDED

None. All 21 T3 seed ids and all 15 discovered ids resolved to arxiv.org/abs pages with matching content this session. Two seeds carried outdated names in the thread map and were kept under their canonical abs-page titles: 2410.16392 (now "Scaffolded Language Models with Language Supervision for Mixed-Autonomy: A Survey") and 2603.18388 (now "Reflection in the Dark: ...", the paper that proposes VISTA). The Nature 2025 version of TextGrad is not confirmed by the abs page and must be verified separately before citing.
