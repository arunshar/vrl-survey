# Verbal Reinforcement Learning: A Taxonomic Survey of Language as Feedback, Signal, and Grounding

**Abstract**

Reinforcement learning (RL) has long relied on scalar rewards—simple numerical signals that tell an agent whether its behavior was good or bad. Yet natural language offers something far richer: compositional, graded, explanatory feedback that encodes human intent, domain knowledge, and causal structure in a form both humans and modern language models can interpret. This survey introduces the term *Verbal Reinforcement Learning* (Verbal RL) to describe the broad and rapidly expanding family of methods that deploy language as a functional component of the RL loop. We organize this landscape into three pillars based on the *role* language plays: (1) **Language as Deliberative Feedback**, where natural language guides test-time reasoning and iterative refinement without weight updates; (2) **Language as Learning Signal**, where language feedback shapes model parameters through training—serving as critiques, preferences, or reward specifications; and (3) **Language as Grounding Signal**, where language defines the RL problem itself by specifying goals, describing states, or constraining actions. For each pillar we identify subcategories, survey representative work, and offer comparative analysis. We then examine cross-cutting themes, critically assess the limitations and overlaps within the proposed taxonomy, and identify open research challenges. Our goal is to provide a unified conceptual framework for a body of work that has grown across disparate research communities—NLP, robotics, multi-agent systems, and classical RL—often without a shared vocabulary.

---

## 1. Introduction

The canonical reinforcement learning problem is defined by an agent that perceives states, takes actions, and receives scalar reward signals. This formalism has powered landmark achievements from Atari game-playing [Mnih et al., 2015] to protein structure prediction [Senior et al., 2020]. Yet the scalar reward signal is simultaneously the formalism's greatest simplification and its deepest limitation. A robot that drops a cup receives \(r = -1\). A human supervisor might say: "You gripped it too firmly near the rim—try a broader, softer grasp." The latter encodes causal structure, corrective direction, and domain knowledge that the scalar never could.

The emergence of capable large language models (LLMs) has made this gap actionable. Language models can generate, interpret, and condition on natural language feedback at scale, transforming what was once an expensive modality—requiring human time and annotation—into one that can be automated, iterated, and composed. The result is a new class of techniques that deploy natural language throughout the reinforcement learning pipeline: as a medium for iterative refinement at inference time, as a training signal that shapes model weights, and as a specification language for entire RL problem instances.

We call this family of approaches **Verbal Reinforcement Learning** (Verbal RL), following the terminology introduced by Shinn et al. [2023] and formalized in the broader context of LLM-agent feedback by Carta et al. [2024]. The field encompasses diverse work—self-refining LLM agents, preference learning from human language ratings, reward functions expressed as code, text-based games, and natural-language-commanded robots—that has largely been developed in parallel by separate communities without a unifying framework.

This survey makes three contributions. First, we propose a **three-pillar taxonomy** organized by the functional role of language in the RL loop: deliberative feedback (test-time), learning signal (train-time), and grounding signal (problem definition). Second, we systematically survey representative papers under each pillar and its subcategories, identifying both their methods and their conceptual contributions. Third, we provide a **critical assessment** of the taxonomy itself, identifying overlaps, missing categories, and proposed improvements.

### 1.1 Scope and Relation to Prior Surveys

Our work complements Luketina et al. [2019], who surveyed RL informed by natural language with a focus on language-conditioned policies and text-based environments. Since then, the emergence of powerful LLMs has fundamentally changed the problem: language is no longer merely a conditioning input but an active computational substrate. Carta et al. [2024] provide a taxonomy tree of RL/LLM intersections, offering breadth; we provide depth on the specific role of *language as feedback* and introduce the deliberative/learning/grounding trichotomy as the primary organizational axis.

---

## 2. Background

### 2.1 Reinforcement Learning Basics

A standard RL problem is formalized as a Markov Decision Process (MDP) \((S, A, P, R, \gamma)\), where \(S\) is the state space, \(A\) is the action space, \(P: S \times A \to \Delta(S)\) is the transition function, \(R: S \times A \to \mathbb{R}\) is the reward function, and \(\gamma \in [0,1)\) is the discount factor. The goal is to find a policy \(\pi: S \to \Delta(A)\) that maximizes expected cumulative reward \(\mathbb{E}_\pi[\sum_t \gamma^t r_t]\). Classical RL assumes \(R\) is given, dense enough to learn from, and scalar-valued. Each of these assumptions is relaxed in Verbal RL.

### 2.2 Language Models Basics

Modern LLMs are autoregressive models trained to predict the next token over large text corpora, parameterized typically as transformer networks [Vaswani et al., 2017]. After pre-training, instruction tuning and alignment procedures (e.g., RLHF [Ouyang et al., 2022]) adapt them to follow human intent. Key properties that make LLMs useful in the RL setting include: (a) *emergent instruction-following*, (b) *in-context learning* from demonstrations and feedback provided in the prompt, (c) *code generation*, enabling translation from natural language to executable programs, and (d) *chain-of-thought reasoning*, enabling multi-step deliberation.

### 2.3 The Convergence of RL and LLMs

Three trends have driven the convergence. First, *alignment*: as LLMs are deployed in consequential settings, the need to shape their long-horizon behavior resembles the RL objective—optimize for some notion of "good" behavior over a sequence of decisions. Second, *agency*: LLMs are increasingly deployed as agents that act in environments (code executors, web browsers, robotic controllers), making the RL framework natural. Third, *feedback abundance*: LLMs can generate natural language critiques, comparisons, and corrections at scale, creating a new source of training signal that was previously scarce. The result is a bidirectional relationship: RL techniques help align and improve LLMs, while LLM capabilities enable richer RL problem specifications and feedback mechanisms.

---

## 3. Taxonomy Overview

We organize Verbal RL into three pillars, distinguished by *when* language acts and *what* it modifies:

| **Dimension** | **Pillar 1: Deliberative Feedback** | **Pillar 2: Learning Signal** | **Pillar 3: Grounding Signal** |
|---|---|---|---|
| **When language acts** | Inference time (test-time) | Training time (parameter updates) | Problem definition time |
| **What it modifies** | Outputs / reasoning traces | Model weights / training data | MDP definition (S, A, R, goal) |
| **Weight updates?** | No | Yes | Not necessarily |
| **Typical method type** | Prompting, in-context critique | Fine-tuning, RLHF, DPO | Environment design, reward specification |
| **Example papers** | Self-Refine [Madaan et al., 2023]; Reflexion [Shinn et al., 2023] | InstructGPT [Ouyang et al., 2022]; STaR [Zelikman et al., 2022] | SayCan [Ahn et al., 2022]; ALFWorld [Shridhar et al., 2021] |
| **Key challenge** | Faithfulness of self-critique; compute at inference | Credit assignment; feedback quality; scalability | Grounding gap; compositionality |

**Table 1.** Summary comparison of the three Verbal RL pillars.

The three pillars differ fundamentally along the axis of *temporal scope*. Deliberative feedback is ephemeral: it improves the current output without lasting effect on future model behavior. Learning signal is persistent: it shapes what the model "knows" and can do across all future interactions. Grounding signal is constitutive: it defines the space in which the agent operates, independent of which learning algorithm is used.

### 3.1 Subcategory Summary Tables

**Table 2: Pillar 1 — Language as Deliberative Feedback**

| Subcategory | Description | Representative Papers |
|---|---|---|
| Self-Refinement / Self-Critique | Model iteratively revises its output using its own feedback | Madaan et al. [2023]; Shinn et al. [2023]; Welleck et al. [2025] |
| Externally Grounded Critique | Critique grounded in tools, execution, retrieval, or environment | Gou et al. [2024]; Yao et al. [2022] (ReAct) |
| Multi-Agent Critique / Debate | Multiple agents challenge each other's outputs | Du et al. [2023]; Bai et al. [2022] |
| Reflective Memory | Feedback from prior attempts stored as verbal lessons | Shinn et al. [2023]; Park et al. [2023] |
| Search-Guided Deliberation | Explore multiple reasoning paths with language-guided search | Yao et al. [2023] (ToT); Hao et al. [2023] (RAP) |

**Table 3: Pillar 2 — Language as Learning Signal**

| Subcategory | Description | Representative Papers |
|---|---|---|
| Self-Improvement | Model bootstraps better training data from own critiques | Zelikman et al. [2022]; Huang et al. [2023] |
| Preference Shaping | NL feedback → preferences → reward model signals | Ouyang et al. [2022]; Rafailov et al. [2023]; Lee et al. [2023] |
| Feedback-Conditioned Modeling | Model trained to condition on feedback/corrections directly | Scheurer et al. [2023]; arxiv [2025] (FCP) |
| Reward Code Generation | LLM writes executable reward function from NL specification | Ma et al. [2023]; Xie et al. [2023]; Yu et al. [2023] |

**Table 4: Pillar 3 — Language as Grounding Signal**

| Subcategory | Description | Representative Papers |
|---|---|---|
| Goal Grounding | Language specifies what the agent should optimize | Ahn et al. [2022]; Chevalier-Boisvert et al. [2019]; Andreas et al. [2017] |
| State Grounding | Language describes agent's current situation | Yao et al. [2020]; Shridhar et al. [2021]; Hausknecht et al. [2020] |
| Action Grounding | Language constrains or guides the action space | Huang et al. [2022]; Sharma et al. [2022]; Lynch & Sermanet [2021] |

---

## 4. Pillar 1: Language as Deliberative Feedback

Pillar 1 encompasses methods where language functions as a *thinking tool* at inference time. The distinguishing characteristic is that no gradient flows through the system; instead, language mediates a process of iterative evaluation and revision that improves a specific output. This pillar is most closely aligned with the concept of *test-time compute scaling*—the idea that more compute spent reasoning at inference can substitute for more training.

### 4.1 Self-Refinement / Self-Critique

**Description.** In self-refinement, a model generates an output, evaluates it using its own language understanding, and then produces an improved version conditioned on that evaluation. The critique and the revision can be performed by the same model or by specialized sub-models playing feedback and refine roles.

**Self-Refine [Madaan et al., 2023].** The eponymous paper demonstrates this idea across a range of NLP tasks. A single LLM produces an initial draft, generates feedback on that draft, and iteratively refines until a stopping criterion is met. The key empirical finding is that this procedure improves outputs across diverse tasks—code optimization, essay writing, sentiment transfer—without any additional training, suggesting that LLMs already possess latent self-evaluation capabilities that prompting can unlock. The work raises fundamental questions about *when* self-critique is reliable: models that are wrong in their initial outputs may also be wrong in their critiques.

**Reflexion [Shinn et al., 2023].** Reflexion extends self-refinement to *multi-episode* agent settings. After each episode ends (potentially in failure), the agent reflects on what went wrong and stores a verbal summary of lessons learned. These lessons persist in a memory buffer and are prepended to future prompts. On the HotPotQA question-answering and AlfWorld embodied agent benchmarks, Reflexion achieves substantial gains over non-reflective baselines. Crucially, Reflexion sits at the intersection of Pillars 1 and 2: while no gradient updates occur, the persistent memory creates a form of "soft" learning across episodes that mimics training-time improvement.

**SCoRe [Welleck et al., 2025].** Self-Correction via Reinforcement Learning directly trains models to self-correct using RL, using the improvement in output quality after a correction step as the reward signal. This work sits on the boundary between Pillar 1 (the correction happens at inference time) and Pillar 2 (the capability is trained in). It represents a growing trend of *training for inference-time behaviors*—optimizing the parameters so that deliberative feedback processes are more reliable when deployed.

**Analysis.** A central limitation of pure self-refinement is the *closed-loop hallucination* problem: if a model cannot correctly evaluate its own outputs, iterating critique and revision may drift from ground truth rather than converging to it. This motivates the next subcategory.

### 4.2 Externally Grounded Critique

**Description.** To address the faithfulness limitations of pure self-critique, externally grounded critique augments the feedback signal with information from outside the model itself—code execution results, retrieved documents, calculator outputs, or environment observations.

**CRITIC [Gou et al., 2024].** CRITIC (ICLR 2024) proposes a framework where LLMs verify and correct their own outputs by interacting with external tools. For mathematical claims, a Python interpreter checks computation; for factual claims, a search engine provides grounding; for code, an executor reveals runtime errors. This hybrid approach—LLM generates critique *framing*, tools provide *ground truth*—substantially outperforms pure self-refinement on arithmetic reasoning and fact verification. The insight is that language is best deployed not as the sole evaluator but as an *interface* between the model's reasoning and external verifiable signals.

**ReAct [Yao et al., 2022].** ReAct interleaves reasoning traces ("thoughts") with environment actions in a single language model forward pass. Rather than a separate critique-revise loop, reasoning and acting are unified: the model generates a thought, takes an action (e.g., Wikipedia search), observes the result, and continues its trace. This paradigm has become foundational for LLM agents operating in tool-augmented environments, demonstrating that language-mediated deliberation is most effective when tightly coupled with external feedback loops.

**Analysis.** Externally grounded critique is strictly stronger than pure self-refinement in terms of signal reliability, but introduces new challenges: tool availability, latency, error propagation from tool failures, and the challenge of composing heterogeneous feedback signals from multiple tools into a coherent revision.

### 4.3 Multi-Agent Critique / Debate

**Description.** Rather than a single model critiquing itself, multi-agent critique distributes the evaluation function across multiple agents that challenge, verify, or argue against each other's outputs. This paradigm draws on the adversarial tradition in formal argument and courtroom debate.

**Multiagent Debate [Du et al., 2023].** Multiple LLM instances independently generate answers to a question, then read each other's outputs and update their responses over several rounds of debate. Du et al. demonstrate that this procedure improves mathematical and strategic reasoning even when individual agents are wrong: the debate process functions as a decentralized truth-seeking mechanism. A key insight is that *diversity* among agents (seeded via temperature or prompt variation) is essential—debating clones of the same opinion does not help.

**Constitutional AI [Bai et al., 2022].** Anthropic's Constitutional AI (CAI) uses a set of principles (a "constitution") to generate critique-revision pairs for model outputs. A model critiques its own responses according to constitutional principles, revises them, and the resulting (critique, revision) pairs are used as training data for a subsequent fine-tuning stage. CAI occupies both Pillar 1 (critique-revise loop) and Pillar 2 (the critiques generate training data), and was one of the first demonstrations that AI-generated critique could substitute for human feedback in alignment.

**Analysis.** Multi-agent critique scales the critique process without adding human annotation but introduces coordination challenges: achieving genuine diversity in a debate of models from the same pretrained base, preventing collusion-like convergence to a confident wrong answer, and managing the computational cost of multi-round debate.

### 4.4 Reflective Memory

**Description.** Reflective memory is a mechanism by which verbal feedback from past episodes is stored and retrieved to inform future behavior. Unlike standard in-context learning (which uses demonstrations in the prompt), reflective memory specifically stores *lessons learned from failure*—retrospective analyses that identify what went wrong and how to avoid it.

**Reflexion [Shinn et al., 2023].** As described above, Reflexion's core contribution is showing that this verbal memory enables genuine performance improvement across episodes in agentic tasks. The mechanism is conceptually analogous to episodic memory in human cognition and to experience replay in RL—but the "replay" operates over language summaries rather than (state, action, reward) tuples.

**Generative Agents [Park et al., 2023].** Park et al. build interactive agent simulacra that maintain a natural language "memory stream" of past experiences. A retrieval mechanism surfaces relevant memories for current decisions, and a periodic "reflection" step synthesizes higher-level observations (e.g., "Isabella is kind to strangers") from specific episodic memories. This architecture demonstrates that verbal memory can support coherent long-horizon behavior and emergent social dynamics without any specialized RL training.

**Analysis.** A key open question for reflective memory is *memory quality*: inaccurate or over-generalized verbal lessons can introduce systematic biases. Unlike gradient-based learning where errors are distributed across many parameters, verbal lessons are explicit and directly actionable, making the cost of incorrect lessons potentially higher.

### 4.5 Search-Guided Deliberation

**Description.** Search-guided deliberation structures inference-time reasoning as an explicit search over a space of possible reasoning paths or partial solutions, guided by a language-based evaluation function.

**Tree of Thoughts [Yao et al., 2023].** ToT generalizes chain-of-thought prompting by treating reasoning as a tree search. At each step, the model generates multiple possible next thoughts, evaluates each (using the model itself as evaluator), and selects the most promising branch to expand. This enables systematic exploration and backtracking on complex combinatorial problems such as creative writing and mathematical puzzles. The evaluator is itself a language model, making the entire search process verbal throughout.

**RAP [Hao et al., 2023].** Reasoning via Planning (RAP) frames language model reasoning as planning in a world model. The LLM serves dual roles: as an agent proposing actions and as a world model predicting next states. Monte Carlo Tree Search (MCTS) over this verbal world model enables more principled exploration than greedy chain-of-thought. This bridges classical planning algorithms with language-mediated deliberation in a principled way.

**Analysis.** Search-guided deliberation is computationally expensive at inference time—a limitation that scales with tree depth and branching factor. The quality of the verbal evaluation function becomes a bottleneck: a model that cannot reliably score reasoning paths will explore poorly regardless of the search algorithm.

---

## 5. Pillar 2: Language as Learning Signal

Pillar 2 encompasses methods where natural language *shapes model weights*, either by generating training data, encoding preferences, conditioning model behavior, or specifying reward functions. The defining feature is persistence: language feedback here creates lasting changes to the model's capabilities or dispositions.

### 5.1 Self-Improvement

**Description.** Self-improvement methods use a model's own language outputs—reasoning traces, critiques, revised answers—as training data to bootstrap a better model. The key challenge is a chicken-and-egg problem: if the model cannot solve a problem, how can it generate training data for solving it?

**STaR [Zelikman et al., 2022].** Self-Taught Reasoner (STaR) addresses this by using a rationalization trick: for problems the model cannot solve with chain-of-thought, it is given the correct answer and asked to generate a rationale post hoc. Only rationale-answer pairs where the answer is correct are used as training data. This bootstrap procedure iteratively improves few-shot chain-of-thought reasoning across arithmetic and symbolic tasks. STaR is a foundational paper demonstrating that language-mediated reasoning can be self-sustaining—the model's own language generation drives its improvement.

**Self-Improve [Huang et al., 2023].** Huang et al. show that LLMs can self-improve on reasoning tasks without any labeled data by generating diverse solutions via sampling, using majority voting to select likely-correct ones, and fine-tuning on the selected solutions. The verbal reasoning traces are central to both the generation and filtering process, making this a case where language enables training data creation at scale without human supervision.

**Analysis.** Self-improvement raises the concern of *self-reinforcing errors*: if the model's initial outputs are systematically biased, the training data inherits those biases. Diversification strategies (temperature sampling, diverse prompts) and external verification (execution, ground truth labels for a subset) are common mitigations.

### 5.2 Preference Shaping

**Description.** Preference shaping converts natural language feedback—whether from humans or AI models—into the preference signals used by RL alignment pipelines. This is the dominant paradigm for aligning large language models and encompasses RLHF, RLAIF, and direct preference optimization methods.

**InstructGPT / RLHF [Ouyang et al., 2022].** InstructGPT demonstrates that human language feedback on model outputs can be used to train a reward model, which in turn trains the LLM via proximal policy optimization (PPO). The feedback is collected as pairwise preferences ("which of these two outputs is better?"), but the *rationale* for preferences is often natural language, and the instructions themselves are verbal specifications of desired behavior. InstructGPT remains the landmark demonstration that RLHF dramatically improves instruction-following and safety compared to pure pretraining.

**DPO [Rafailov et al., 2023].** Direct Preference Optimization bypasses the explicit reward model by deriving a loss function that directly optimizes the LLM on (preferred, dispreferred) output pairs. DPO is simpler to train than RLHF (no reward model, no RL loop) while achieving competitive performance. Its success has stimulated a cottage industry of preference-based alignment methods, all of which use language feedback as the foundational signal.

**RLAIF [Lee et al., 2023].** Reinforcement Learning from AI Feedback replaces human raters with a separate LLM that evaluates and ranks outputs. This dramatically scales the feedback collection process, enabling preference shaping at scales and speeds unachievable with human annotation alone. RLAIF's competitive performance relative to RLHF on helpfulness and harmlessness benchmarks validates the use of AI-generated language feedback as a substitute for human preferences.

**Analysis.** Preference shaping methods face the challenge that language feedback is ultimately translated into scalar values (reward scores, logit differences) before being used for training—potentially discarding rich information in the natural language rationales. Methods that use the full text of human rationales, rather than just binary preferences, represent an important research frontier.

### 5.3 Feedback-Conditioned Modeling

**Description.** Rather than extracting a scalar signal from language feedback and training via RL, feedback-conditioned modeling trains a model to directly condition on language feedback in its input, learning to incorporate corrections and suggestions from its context.

**Training with Language Feedback [Scheurer et al., 2023].** Scheurer et al. collect a dataset of (model output, human language feedback, improved output) triples and fine-tune a language model to generate the improved output given the feedback. This supervised approach teaches the model to be *correctable* rather than relying on the model discovering corrections through trial and error. The trained model shows improved responsiveness to novel feedback at test time, demonstrating generalization of the feedback-conditioning capability.

**Language Models Can Learn from Verbal Feedback [FCP, 2025].** This recent work demonstrates that language models can be trained to internalize verbal corrections through a feedback-conditioned pretraining objective, enabling persistent improvement from conversational corrections without explicit fine-tuning at deployment time. The approach bridges inference-time feedback (Pillar 1) and training-time learning (Pillar 2) by training the model to behave as if it had been updated by verbal feedback it receives in context.

**Analysis.** Feedback-conditioned modeling is conceptually elegant—it treats language feedback as a first-class input modality rather than a signal to be extracted and discarded—but requires careful data collection to avoid training models that are *sycophantic* (agreeing with any feedback regardless of its accuracy) rather than genuinely correctable.

### 5.4 Reward Code Generation

**Description.** Rather than specifying a reward function as a scalar value or a learned neural network, reward code generation uses language models to translate natural language task descriptions into executable reward functions. This is particularly powerful in continuous control and robotics, where reward engineering is notoriously difficult.

**Eureka [Ma et al., 2023].** Eureka (ICLR 2024) prompts GPT-4 to write reward function code for dexterous manipulation tasks (including pen spinning and opening drawers) given a description of the task and the robot environment API. Critically, it uses language as feedback in a loop: the RL training outcomes (reward curves, success rates) are summarized and fed back to the LLM, which revises its reward code. This creates an outer language-feedback loop around an inner RL training loop, achieving human-level reward design performance on 83% of benchmark tasks.

**Text2Reward [Xie et al., 2023].** Text2Reward converts natural language instructions into dense reward functions expressed as Python code. The generated rewards are used directly in model-predictive control and reinforcement learning without manual reward engineering. The key insight is that LLMs' knowledge of physics, task semantics, and programming enables them to express reward functions that would take human engineers hours to craft.

**Language to Rewards [Yu et al., 2023].** Yu et al. demonstrate that language commands to a robot can be translated not to a fixed policy but to a reward function, which is then optimized in real time to produce behavior. This enables compositional generalization: novel command combinations produce appropriate reward functions even when the resulting behavior has never been explicitly trained. The language-to-reward interface acts as a semantic abstraction layer above the RL system.

**Analysis.** Reward code generation is powerful but brittle: LLMs may generate code that compiles but optimizes the wrong objective, exploits environment bugs, or fails on edge cases. Iterative refinement loops (as in Eureka) mitigate this, but the quality of the feedback signal determining when to revise remains a challenge.

---

## 6. Pillar 3: Language as Grounding Signal

Pillar 3 covers methods where language defines the RL problem itself: what the agent should do, what situation it is in, and what actions are available. Language here is constitutive rather than corrective—it shapes the MDP structure rather than improving performance within a given MDP.

### 6.1 Goal Grounding

**Description.** Goal grounding uses natural language to specify what an agent should optimize. This ranges from simple task instructions ("pick up the red block") to abstract goal specifications requiring compositional interpretation, multi-step planning, and grounding in physical affordances.

**SayCan [Ahn et al., 2022].** SayCan addresses the problem of grounding high-level language instructions in robotic affordances. Given a high-level command (e.g., "I spilled my drink, can you help?"), the system uses an LLM to propose candidate low-level actions and a value function trained on robot experience to score their feasibility. The intersection of language plausibility and physical feasibility selects executable actions. SayCan demonstrates that language goal specification is only useful when tightly coupled with grounding in what the agent can actually do.

**BabyAI [Chevalier-Boisvert et al., 2019].** BabyAI provides a gridworld platform with a formal language of task instructions, enabling systematic study of sample efficiency in grounded language learning. The platform's ability to generate arbitrarily many (instruction, demonstration) pairs makes it a benchmark for testing how well agents generalize to novel language-goal combinations.

**Policy Sketches [Andreas et al., 2017].** Andreas et al. use natural language "sketches" as high-level policy specifications in a modular multi-task RL framework. Each sketch decomposes a task into named subtask modules, and RL is used to learn reusable sub-policies for each module. This shows that language can ground not just the goal but the *structure* of the solution—a compositional advantage over monolithic reward specification.

**Analysis.** Goal grounding research increasingly focuses on the *generalization* question: do agents that learn to follow language instructions generalize to novel instructions, or do they overfit to training-time language patterns? This question connects to the broader challenge of systematic compositionality in neural networks.

### 6.2 State Grounding

**Description.** State grounding uses natural language to describe the agent's current situation. Text-based games are the canonical example, but state grounding also appears in systems where rich visual or embodied environments are summarized as language descriptions for downstream reasoning.

**CALM [Yao et al., 2020].** CALM (Keep CALM and Explore) addresses text-based game environments where the state is already a natural language description. The key contribution is using a pretrained language model to generate admissible action candidates, dramatically reducing the exploration space compared to exhaustive action enumeration. This demonstrates that language state representations are not just input formats but active scaffolding for efficient RL exploration.

**ALFWorld [Shridhar et al., 2021].** ALFWorld aligns text-based game environments with 3D embodied environments, enabling agents trained on text descriptions to transfer to visual scenes. The text descriptions serve as state grounding signals that bridge the gap between symbolic and visual representations—a key step toward language-conditioned embodied AI.

**Interactive Fiction [Hausknecht et al., 2020].** Hausknecht et al. characterize the challenges of RL in interactive fiction games (e.g., Zork): exponential action spaces, sparse rewards, and long horizons. This work established interactive fiction as a canonical benchmark for language-grounded RL, motivating a decade of subsequent research on language-mediated state representations.

**Analysis.** A fundamental challenge for state grounding is *information fidelity*: natural language descriptions of states necessarily lose information compared to raw perceptual input. The choice of what to include in a language state description is itself a form of knowledge engineering that can advantage or disadvantage downstream learning.

### 6.3 Action Grounding

**Description.** Action grounding uses natural language to constrain or guide the agent's action selection. This ranges from high-level subgoal specifications to low-level skill names, and from hard constraints (only execute these actions) to soft guidance (here are suggested next steps).

**Inner Monologue [Huang et al., 2022].** Inner Monologue embeds language feedback from the environment (perception outputs, execution feedback) into the agent's ongoing reasoning trace. An embodied agent receives language descriptions of what it perceives and what happened after its last action, and uses this grounded "inner monologue" to revise its plans. This tight coupling of perception, language, and action grounding demonstrates that the most effective action grounding is bidirectional—language informs action selection, and action outcomes update the language state.

**Correcting Robot Plans [Sharma et al., 2022].** Sharma et al. address the case where a robot's plan is partially wrong and a human provides natural language corrections ("go left instead of right"). The system must interpret the correction, identify the plan step to modify, and generate a revised plan. This is a practical instance of action grounding where language is used not to specify the entire action sequence but to incrementally correct it.

**Language Conditioned Imitation [Lynch & Sermanet, 2021].** Lynch and Sermanet train policies conditioned on language instructions from unstructured robot play data, without explicit task labeling. Language annotations are added post hoc to segments of play, and the resulting (language, behavior) pairs train a language-conditioned policy. This shows that language can ground action grounding for the full low-level action space, not just high-level subtask selection.

**Analysis.** A key distinction within action grounding is the *granularity* of the language signal: high-level subgoal specifications (e.g., "go to the kitchen first") operate at the level of task decomposition, while low-level skill grounding (e.g., "open gripper now") operates at the level of primitive actions. These require fundamentally different interfaces between language and motor control and arguably should be treated as separate subcategories (see Section 8).

---

## 7. Cross-Cutting Themes

### 7.1 Papers That Span Multiple Pillars

Several landmark papers resist clean taxonomic classification, demonstrating that the three pillars are better understood as dimensions than exclusive categories.

**Reflexion [Shinn et al., 2023]** is the clearest example. Its in-episode reasoning is Pillar 1 (deliberative feedback). Its cross-episode verbal memory operates like a training signal without gradient updates—a form of soft Pillar 2 learning. Its deployment in embodied environments with language-described states is Pillar 3. Reflexion is arguably the paper most fully integrated across all three pillars.

**Constitutional AI [Bai et al., 2022]** spans Pillars 1 and 2: the critique-revision loop is inference-time deliberation (Pillar 1), but the resulting data drives fine-tuning (Pillar 2). The constitutional principles function as goal grounding (Pillar 3 flavor) for the critique process.

**Eureka [Ma et al., 2023]** spans Pillars 2 and 3: it generates reward functions (Pillar 3—defining the RL problem) using a language feedback loop around RL training outcomes (Pillar 2).

### 7.2 The Inference-Training Spectrum

A recurring theme is that the inference/training distinction (Pillar 1 vs. Pillar 2) is not binary but a spectrum. SCoRe [Welleck et al., 2025] trains a model to self-correct at inference time. Constitutional AI uses inference-time critique to generate training data. This spectrum suggests that the most powerful Verbal RL systems will be those that blur the boundary—using inference-time deliberation to generate training signals, and training to improve inference-time deliberation in a mutually reinforcing cycle.

### 7.3 Language as Abstraction Hierarchy

Across all three pillars, language consistently functions as an *abstraction layer*: it operates at the level of human-interpretable concepts (goals, plans, corrections, lessons) rather than low-level numeric signals. This abstraction provides compositionality and transferability—a lesson learned verbally ("always check edge cases") can transfer across tasks in a way that a gradient update cannot. But abstraction also introduces a *grounding gap*: verbal concepts must ultimately be cashed out in concrete actions, and the machinery for doing so is complex and fragile.

### 7.4 Feedback Quality as the Central Bottleneck

Across all subcategories, the quality of the language feedback signal is the dominant factor in performance. This is true whether the feedback comes from the model itself (self-critique quality), from humans (annotation quality and specificity), from AI models (LLM-as-judge accuracy), or from the environment (richness of language observation). Improving feedback quality—through better models, better prompting, better external grounding, or better human interfaces—is the central research lever across all of Verbal RL.

---

## 8. Taxonomy Critique and Proposed Improvements

The three-pillar taxonomy provides useful organizing structure, but it has significant limitations. We offer a detailed critical assessment.

### 8.1 The Temporal Dimension Should Be More Explicit

The primary organizing principle of the taxonomy is implicitly *temporal*: when does language act relative to learning? Pillar 1 is inference-time, Pillar 2 is training-time, Pillar 3 is problem-definition time. However, this temporal dimension is more fundamental than the taxonomy makes explicit—it determines everything from computational cost to what the feedback modifies to how errors propagate. We recommend that any revision of this taxonomy make temporality its *primary* axis, with functional role (feedback, signal, grounding) as a secondary dimension.

### 8.2 Pillar 1 and Pillar 2 Are Not Cleanly Separable

The inference/training distinction is blurry in practice. Reflexion accumulates verbal memories across episodes—this is effectively "soft training" without gradient updates. Constitutional AI's inference-time critique directly generates training data. SCoRe trains inference-time behavior. We argue that Pillars 1 and 2 should be reorganized under a unified **"Language as Feedback"** umbrella, with inference-time vs. training-time as an internal distinction rather than a pillar boundary. This reorganization would better reflect the continuous nature of the learning-inference spectrum and prevent artificial separation of papers like Reflexion that operate across the full spectrum.

### 8.3 Pillar Overlap in Self-Refinement vs. Self-Improvement

The Self-Refinement subcategory (Pillar 1) and Self-Improvement subcategory (Pillar 2) share significant conceptual and empirical overlap. STaR [Zelikman et al., 2022] generates rationales (self-refinement flavor) and trains on them (self-improvement flavor). Reflexion refines outputs (Pillar 1) and updates memory (Pillar 2 flavor). The boundary between "iterating on a specific output" and "generating training data" is often determined by implementation detail (does the revised output get added to a fine-tuning dataset or just used immediately?) rather than conceptual distinction. A more principled taxonomy would distinguish these based on *durability* of the effect rather than the mechanism.

### 8.4 Missing Category: Language as Evaluation / Judgment

The taxonomy lacks an explicit category for **Language as Evaluation**—the use of LLMs as judges, assessors, or process reward models that provide language-grounded quality assessments. LLM-as-judge [Zheng et al., 2023] and process reward models with natural language explanations [Lightman et al., 2023] are increasingly important components of both training pipelines and evaluation infrastructure. These methods differ from self-critique (Pillar 1.1) because they are specialized for *evaluation* rather than iterative *improvement*, and from preference shaping (Pillar 2.2) because the language explanation is the primary output, not just a signal extracted for downstream use. This missing category spans both inference-time (using an LLM judge to select among candidates) and training-time (using LLM scores as reward signals) applications.

### 8.5 Missing Category: Language for Exploration

The taxonomy has no explicit category for **Language-Guided Exploration**—using natural language to direct curiosity-driven exploration in RL. CALM [Yao et al., 2020] touches on this (language models generate action candidates, reducing exploration space), but a dedicated exploration category would encompass: (a) using language descriptions of unseen states to define intrinsic curiosity rewards, (b) using language hints or advice to guide initial exploration in sparse-reward environments, and (c) using language model priors over action sequences to structure exploration in combinatorial action spaces. This category is distinct from action grounding (Pillar 3.3) because exploration guidance is specifically about *how the agent searches* rather than *what actions are available*.

### 8.6 Missing Category: Language for Multi-Agent Communication

The taxonomy treats multi-agent settings only in the context of debate (Pillar 1.3), focusing on critique of language outputs. It lacks a category for **Emergent Language Communication in Multi-Agent RL**—the study of agents that develop communication protocols (potentially natural language or language-grounded protocols) to coordinate on cooperative tasks. This research program [Mordatch & Abbeel, 2018; Lazaridou & Baroni, 2020] is distinct from multi-agent critique (which assumes a fixed natural language and evaluates outputs) and represents an important dimension of how language and RL interact in social settings.

### 8.7 Action Grounding Should Be Split

As noted in Section 6.3, Action Grounding (Pillar 3.3) conflates two fundamentally different mechanisms:
- **High-level action grounding**: language specifies subgoals, task decompositions, or plan steps (e.g., "go to kitchen, then pick up cup"), operating at the level of temporal abstraction;
- **Low-level skill grounding**: language specifies primitive actions or fine motor commands (e.g., Lynch & Sermanet [2021]), operating at the level of motor control.

These differ in their interface with the RL system, the granularity of credit assignment, and the compositional structure of the language used. Splitting them into distinct subcategories would improve taxonomic precision.

### 8.8 Proposed Revised Framework

Based on the above critique, we propose a revised framework with three dimensions:

1. **Temporal Role** (primary axis): *Problem-definition time* → *Training time* → *Inference time*
2. **Functional Role** (secondary): *Grounding* (defines MDP) | *Feedback* (evaluates/improves outputs) | *Signal* (shapes parameters/memory)
3. **Agent Structure** (tertiary): *Single-agent* | *Multi-agent*

Within this framework, the original three pillars map to: Pillar 3 = problem-definition time; Pillar 2 = training time; Pillar 1 = inference time. The new missing categories (Evaluation, Exploration, Emergent Communication) fit naturally into slots in the 3D framework. The Pillar 1/2 boundary issue is resolved by placing both on the same temporal axis and distinguishing them by *durability* of effect.

---

## 9. Open Challenges and Future Directions

### 9.1 Faithful Self-Evaluation

The reliability of language-based self-critique is an open problem. Models that lack factual knowledge cannot reliably detect their own factual errors; models that are inconsistent cannot critique inconsistency. Faithful self-evaluation likely requires either (a) external grounding (CRITIC-style), (b) training specifically for self-evaluation accuracy, or (c) multi-agent redundancy. The conditions under which models can reliably evaluate their own outputs—and the taxonomy of failure modes—remain under-studied.

### 9.2 Scaling Laws for Verbal Feedback

An outstanding question is whether verbal feedback methods scale predictably with model size, context length, and feedback iterations. Preliminary evidence suggests that self-refinement improves more with model scale [Madaan et al., 2023], but rigorous scaling analyses analogous to those in pretraining are lacking. Understanding these scaling laws would clarify whether Verbal RL is a "free lunch" that improves arbitrarily with scale or whether it hits fundamental ceilings.

### 9.3 Long-Horizon Credit Assignment

A persistent challenge for Verbal RL in sequential decision settings is long-horizon credit assignment: when a verbal feedback signal arrives after many steps, attributing the feedback to specific earlier decisions is difficult. While language provides rich information *about* what went wrong, specifying *when* it went wrong is harder. Process reward models that provide step-level verbal feedback [Lightman et al., 2023] represent a promising direction but require expensive annotation or strong models to generate.

### 9.4 Grounding Language Feedback in Action Space

Verbal feedback is typically expressed at the level of human-interpretable concepts ("be more concise", "avoid hallucination", "grip the object more gently"), but executing these instructions requires grounding them in specific changes to model parameters, policy distributions, or motor commands. The grounding gap between verbal specification and executable action remains a fundamental challenge, particularly for embodied robotics applications.

### 9.5 Robustness to Adversarial or Incorrect Feedback

Current Verbal RL systems generally assume that feedback is well-intentioned and accurate. But feedback can be wrong (an LLM judge that is itself biased), malicious (adversarial feedback designed to misalign the model), or internally inconsistent (contradictory instructions from different sources). Building systems that are robust to feedback noise and adversarial manipulation is critical for real-world deployment.

### 9.6 Unified Evaluation Infrastructure

A significant obstacle to progress is the lack of unified evaluation infrastructure for comparing Verbal RL methods. Methods are evaluated on different benchmarks, using different baselines, with different definitions of "improvement." The field would benefit from standardized benchmarks that test the same underlying capabilities (feedback quality, correction responsiveness, memory utilization) across methods in all three pillars.

### 9.7 Theoretical Foundations

The theoretical foundations of Verbal RL are underdeveloped relative to its empirical successes. Formal analyses of when self-refinement converges, what class of reward functions LLMs can express as code, or how verbal memory interacts with standard RL convergence guarantees would provide principled guidance for method design. Connecting Verbal RL to formal frameworks such as POMDP-based instruction following [Luketina et al., 2019] or Bayesian optimal agent frameworks remains an open theoretical direction.

---

## 10. Conclusion

Verbal Reinforcement Learning represents a fundamental reconceptualization of the relationship between language and sequential decision-making. Where classical RL treats language as an input modality at best, Verbal RL treats language as a *functional substrate*—the medium through which evaluation, correction, learning, and problem specification occur. The three-pillar taxonomy introduced in this survey—Language as Deliberative Feedback, Language as Learning Signal, and Language as Grounding Signal—provides a principled framework for organizing a rapidly growing body of work that has historically been scattered across NLP, robotics, and RL communities.

The most important insight to emerge from our analysis is that the three pillars are not independent: the most powerful Verbal RL systems couple all three. An agent with language-specified goals (Pillar 3) that receives verbal critique of its actions (Pillar 1) and uses that critique to generate training data (Pillar 2) is more capable than any system operating within a single pillar alone. Systems like Reflexion, Constitutional AI, and Eureka demonstrate this coupling in different domains, suggesting that the future of Verbal RL lies in tightly integrated architectures where language permeates every stage of the learning loop.

The taxonomy's limitations—blurry Pillar 1/2 boundary, missing categories for evaluation, exploration, and emergent communication—point toward a richer successor framework organized along temporal, functional, and structural dimensions. As language models become more capable and more deeply integrated into RL systems, the field will require increasingly precise conceptual vocabulary to describe what role language is playing and when. We hope this survey provides a useful starting point for that vocabulary.

---

## References

Ahn, M., Brohan, A., Brown, N., Chebotar, Y., Cortes, O., David, B., ... & Zeng, A. (2022). Do As I Can, Not As I Say: Grounding Language in Robotic Affordances. *arXiv:2204.01691*.

Andreas, J., Klein, D., & Levine, S. (2017). Modular Multitask Reinforcement Learning with Policy Sketches. *ICML 2017*.

Bai, Y., Jones, A., Ndousse, K., Askell, A., Chen, A., DasSarma, N., ... & Kaplan, J. (2022). Constitutional AI: Harmlessness from AI Feedback. *Anthropic Technical Report. arXiv:2212.08073*.

Carta, T., Romac, C., Wolf, T., Lamprier, S., Sigaud, O., & Oudeyer, P.-Y. (2024). The RL/LLM Taxonomy Tree: Reviewing Synergies Between Reinforcement Learning and Large Language Models. *arXiv:2402.01874*.

Chevalier-Boisvert, M., Bahdanau, D., Lahlou, S., Willems, L., Saharia, C., Nguyen, T. H., & Bengio, Y. (2019). BabyAI: A Platform to Study the Sample Efficiency of Grounded Language Learning. *ICLR 2019*.

Du, Y., Li, S., Torralba, A., Tenenbaum, J. B., & Mordatch, I. (2023). Improving Factuality and Reasoning in Language Models through Multiagent Debate. *arXiv:2305.14325*.

Gou, Z., Shao, Z., Gong, Y., Shen, Y., Yang, Y., Duan, N., & Chen, W. (2024). CRITIC: Large Language Models Can Self-Correct with Tool-Interactive Critiquing. *ICLR 2024*.

Hao, S., Gu, Y., Ma, H., Hong, J. J., Wang, Z., Wang, D. Z., & Hu, Z. (2023). Reasoning with Language Model is Planning with World Model. *arXiv:2305.14992*.

Hausknecht, M., Ammanabrolu, P., Côté, M.-A., & Yuan, X. (2020). Interactive Fiction Games: A Colossal Cave. *AAAI 2020*.

Huang, J., Gu, S. S., Hou, L., Wu, Y., Wang, X., Yu, H., & Han, J. (2022). Large Language Models Can Self-Improve. *arXiv:2210.11610*.

Huang, W., Xia, F., Xiao, T., Chan, H., Liang, J., Florence, P., ... & Zeng, A. (2022). Inner Monologue: Embodied Reasoning through Planning with Language Models. *arXiv:2207.05608*.

Lazaridou, A. & Baroni, M. (2020). Emergent Multi-Agent Communication in the Deep Learning Era. *arXiv:2006.02419*.

Lee, H., Phatale, S., Mansoor, H., Lu, K., Mesnard, T., Bishop, C., ... & Rastogi, A. (2023). RLAIF: Scaling Reinforcement Learning from Human Feedback with AI Feedback. *arXiv:2309.00267*.

Lightman, H., Kosaraju, V., Burda, Y., Edwards, H., Baker, B., Lee, T., ... & Cobbe, K. (2023). Let's Verify Step by Step. *arXiv:2305.20050*.

Luketina, J., Nardelli, N., Farquhar, G., Foerster, J., Andreas, J., Grefenstette, E., ... & Rocktäschel, T. (2019). A Survey of Reinforcement Learning Informed by Natural Language. *IJCAI 2019. arXiv:1906.03926*.

Lynch, C. & Sermanet, P. (2021). Language Conditioned Imitation Learning over Unstructured Data. *RSS 2021*.

Ma, Y. J., Liang, W., Wang, G., Huang, D.-A., Bastani, O., Jayaraman, D., ... & Anandkumar, A. (2023). Eureka: Human-Level Reward Design via Coding Large Language Models. *ICLR 2024. arXiv:2310.12931*.

Madaan, A., Tandon, N., Gupta, P., Hallinan, S., Gao, L., Wiegreffe, S., ... & Clark, P. (2023). Self-Refine: Iterative Refinement with Self-Feedback. *NeurIPS 2023. arXiv:2303.17651*.

Mnih, V., Kavukcuoglu, K., Silver, D., Rusu, A. A., Veness, J., Bellemare, M. G., ... & Hassabis, D. (2015). Human-level control through deep reinforcement learning. *Nature, 518(7540), 529–533*.

Mordatch, I. & Abbeel, P. (2018). Emergence of Grounded Compositional Language in Multi-Agent Populations. *AAAI 2018*.

Ouyang, L., Wu, J., Jiang, X., Almeida, D., Wainwright, C. L., Mishkin, P., ... & Lowe, R. (2022). Training Language Models to Follow Instructions with Human Feedback. *NeurIPS 2022*.

Park, J. S., O'Brien, J. C., Cai, C. J., Morris, M. R., Liang, P., & Bernstein, M. S. (2023). Generative Agents: Interactive Simulacra of Human Behavior. *UIST 2023. arXiv:2304.03442*.

Rafailov, R., Sharma, A., Mitchell, E., Manning, C. D., Ermon, S., & Finn, C. (2023). Direct Preference Optimization: Your Language Model is Secretly a Reward Model. *NeurIPS 2023. arXiv:2305.18290*.

Scheurer, J., Campos, J. A., Korbak, T., Chan, J. S., Chen, A., Cho, K., & Perez, E. (2023). Training Language Models with Language Feedback at Scale. *arXiv:2303.16755*.

Senior, A. W., Evans, R., Jumper, J., Kirkpatrick, J., Sifre, L., Green, T., ... & Hassabis, D. (2020). Improved protein structure prediction using potentials from deep learning. *Nature, 577(7792), 706–710*.

Sharma, P., Sundaralingam, B., Blukis, V., Paxton, C., Hermans, T., Torralba, A., ... & Fox, D. (2022). Correcting Robot Plans with Natural Language Feedback. *arXiv:2204.05186*.

Shi, F., Chen, X., Misra, K., Scales, N., Dohan, D., Chi, E. H., ... & Zhou, D. (2022). Natural Language Descriptions of Deep Visual Features. *ICLR 2023*.

Shinn, N., Cassano, F., Labash, B., Gopinath, A., Narasimhan, K., & Yao, S. (2023). Reflexion: Language Agents with Verbal Reinforcement Learning. *NeurIPS 2023. arXiv:2303.11366*.

Shridhar, M., Yuan, X., Côté, M.-A., Bisk, Y., Trischler, A., & Hausknecht, M. (2021). ALFWorld: Aligning Text and Embodied Environments for Interactive Learning. *ICLR 2021*.

Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., ... & Polosukhin, I. (2017). Attention is All You Need. *NeurIPS 2017*.

Welleck, S., Lu, X., West, P., Brahman, F., Shen, T., Khashabi, D., & Choi, Y. (2025). Generating Sequences by Learning to Self-Correct. *arXiv:2211.00053*. (SCoRe: Training Language Models to Self-Correct via Reinforcement Learning.)

Xie, T., Zhao, S., Wu, C. H., Liu, Y., Luo, Y., Zhong, V., ... & Yu, T. (2023). Text2Reward: Reward Shaping with Language Models for Reinforcement Learning. *arXiv:2309.11489*.

Yao, S., Chen, H., Yang, J., & Narasimhan, K. (2020). Keep CALM and Explore: Language Models for Action Generation in Text-based Games. *EMNLP 2020. arXiv:2010.02903*.

Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K., & Cao, Y. (2022). ReAct: Synergizing Reasoning and Acting in Language Models. *ICLR 2023. arXiv:2210.03629*.

Yao, S., Yu, D., Zhao, J., Shafran, I., Griffiths, T. L., Cao, Y., & Narasimhan, K. (2023). Tree of Thoughts: Deliberate Problem Solving with Large Language Models. *NeurIPS 2023. arXiv:2305.10601*.

Yu, W., Gileadi, N., Fu, C., Kirmani, S., Lee, K.-H., Arenas, M. G., ... & Hausman, K. (2023). Language to Rewards for Robotic Skill Synthesis. *arXiv:2306.08647*.

Zelikman, E., Wu, Y., Mu, J., & Goodman, N. D. (2022). STaR: Bootstrapping Reasoning With Reasoning. *NeurIPS 2022. arXiv:2203.14465*.

Zheng, L., Chiang, W.-L., Sheng, Y., Zhuang, S., Wu, Z., Zhuang, Y., ... & Stoica, I. (2023). Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena. *NeurIPS 2023*.
