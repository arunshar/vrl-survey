# T4: Experience/memory-driven agents, skill libraries, reflective memory (feeds S5)

Thread notes for the CSUR expansion. All 32 papers verified this session (2026-07-11) against their arxiv.org/abs pages (title, authors, abstract pulled from citation meta tags); discovery ran through HF paper_search. 20 seeds verified, 0 excluded; 12 additional papers discovered (2025-2026). Already-cited papers carry [ALREADY-CITED] and keep their existing bib keys; the 27 new entries live in `T4_memory_experience.bib`.

Reviewer hooks this thread must serve:
- pqAY-2 (cross-pillar decision rules): experiential memory sits exactly on the inference-vs-training boundary the reviewer flagged. This thread now has clean exemplars of every rung: pure inference-time memory (Reflexion, Dynamic Cheatsheet, A-MEM), deployment-time non-parametric adaptation formalized as its own lifecycle stage (CASCADE), memory policies trained with parametric RL (Memory-R1, SkillRL, AutoMem), and meta-evolution of the memory system itself (MemEvolve, MemPro, MemSkill). Use this gradient as the explicit decision rule: what persists (text vs code vs weights) and what gets optimized (content vs policy vs architecture).
- 3gqM-3 / bnae-2 (practitioner guidance): AFTER (belikova2026managing) and Useful Memories (zhang2026useful) give concrete when-to-consolidate and skill-transfer guidance; MemoryAgentBench and Evo-Memory give the evaluation axes. Feed S13.
- Q27s-7 (synthesis/benchmarks): three benchmarks in-thread (MemoryAgentBench, Evo-Memory, AFTER) map to S11.

Sub-cluster map: A foundations (2023-2024), B agentic memory architectures, C procedural memory + skill libraries, D trained memory policies (RL), E meta-evolution of memory systems, F benchmarks + critical analyses.

---

## A. Foundations: reflective memory and experiential learning

### Reflexion [ALREADY-CITED: shinn2023reflexion]
- Title: Reflexion: Language Agents with Verbal Reinforcement Learning. arXiv 2303.11366, 2023.
- Method: reinforces language agents through linguistic feedback instead of weight updates. The agent verbally reflects on task feedback signals and maintains its own reflective text in an episodic memory buffer; the stored reflections condition subsequent trials. Flexible in feedback type (scalar or free-form), source (external or internally simulated), and incorporation method. This is the paper that coined "verbal reinforcement learning" in the narrow self-reflective sense (reviewer Q27s-2 term-collision point; cite as the origin and state our broader usage against it).
- Signal type: critique (self-generated reflection) stored as memory.
- Lifecycle stage: inference (episodic memory across trials, no weight updates).
- Section mapping: S5 deliberative (anchor work); also S2/S3 for the VRL term genealogy.
- Key claim: 91% pass@1 on HumanEval, surpassing the previous state-of-the-art GPT-4 at 80%; gains across sequential decision-making, coding, and language reasoning.

### Voyager [ALREADY-CITED: wang2023voyager]
- Title: Voyager: An Open-Ended Embodied Agent with Large Language Models. arXiv 2305.16291, 2023.
- Method: first LLM-powered embodied lifelong learning agent in Minecraft. Three components: an automatic curriculum maximizing exploration, an ever-growing skill library of executable code that stores and retrieves complex behaviors, and an iterative prompting mechanism that folds in environment feedback, execution errors, and self-verification to improve programs. Works through black-box GPT-4 queries, no fine-tuning. The skill library is the canonical "skills as executable code" design that C-cluster papers industrialize.
- Signal type: memory (skill library of code) + execution feedback as critique.
- Lifecycle stage: inference (in-context lifelong learning).
- Section mapping: S5 deliberative (skill-library lineage); cross-ref S10 embodied.
- Key claim: 3.3x more unique items, 2.3x longer travel distances, and up to 15.3x faster tech-tree milestones than prior SOTA; the learned skill library transfers to a new Minecraft world.

### ExpeL [ALREADY-CITED: zhao2024expel]
- Title: ExpeL: LLM Agents Are Experiential Learners. arXiv 2308.10144, 2023 (AAAI 2024).
- Method: agent autonomously gathers experiences from a collection of training tasks, then extracts cross-task insights in natural language without any parameter updates. At inference it recalls both extracted insights and concrete past experiences to inform decisions. Positioned for API-only settings where fine-tuning is impossible; an early bridge from per-episode reflection (Reflexion) to persistent cross-task knowledge.
- Signal type: memory (distilled natural-language insights + retrieved episodes).
- Lifecycle stage: inference (gathering phase is offline but gradient-free).
- Section mapping: S5 deliberative.
- Key claim: performance consistently improves as experience accumulates; shows transfer-learning potential of extracted insights.

### MetaReflection (NEW: gupta2024metareflection)
- Title: MetaReflection: Learning Instructions for Language Agents using Past Reflections. arXiv 2405.13009, 2024.
- Method: offline reinforcement technique that turns self-reflections from past failed trials into a semantic memory of general instructions for the agent prompt. Where Reflexion needs an online trial loop per task instance, MetaReflection learns portable instructions once from experiential learnings and applies them to unseen instances. Evaluated across logical reasoning, biomedical semantic similarity, open-world QA, and vulnerability threat detection in Infrastructure-as-Code, over different agent designs.
- Signal type: instruction (learned from critique/reflections).
- Lifecycle stage: inference (offline distillation, no weight updates).
- Section mapping: S5 deliberative; cross-ref S9 language-space optimizers (it competes with prompt optimization).
- Key claim: boosts language-agent performance by 4% to 16.82% over a raw GPT-4 baseline and matches state-of-the-art prompt optimization at fewer LLM calls.

### Agent Workflow Memory (NEW: wang2024agent)
- Title: Agent Workflow Memory. arXiv 2409.07429, 2024.
- Method: induces reusable routines ("workflows") from agent trajectories and selectively provides them to guide subsequent generations, imitating how humans abstract common task flows from past experience. Applies offline (induce from training examples) and online (induce from test queries on the fly). The workflow is an intermediate abstraction level between raw trajectories and executable skills.
- Signal type: memory (induced workflow abstractions).
- Lifecycle stage: inference.
- Section mapping: S5 deliberative.
- Key claim: improves relative success rate by 24.6% on Mind2Web and 51.1% on WebArena while reducing steps; online AWM surpasses baselines by 8.9 to 14.0 absolute points as train-test distribution gaps widen.

### Memory-mechanism survey [ALREADY-CITED: zhang2025survey]
- Title: A Survey on the Memory Mechanism of Large Language Model based Agents. arXiv 2404.13501, 2024 (ACM TOIS 2025).
- Method: systematic review of what agent memory is and why it is needed, how to design and evaluate memory modules, and memory-centric agent applications; maintains a living repository. This is the closest prior survey to our S5 memory subsection; the comparison table (reviewer weakness f) should state that it covers memory as a component while we cover memory as one role of verbal feedback inside a larger loop.
- Signal type: n/a (survey).
- Lifecycle stage: n/a.
- Section mapping: S3 taxonomy / related-surveys comparison table; background for S5.
- Key claim: first systematic review of LLM-agent memory; identifies design, evaluation, and application gaps.

---

## B. Agentic memory architectures (2025)

### MUSE, Learning on the Job (NEW: yang2025learning)
- Title: Learning on the Job: An Experience-Driven Self-Evolving Agent for Long-Horizon Tasks. arXiv 2510.08002, 2025.
- Method: agent framework centered on a hierarchical Memory Module that organizes experience at multiple levels for planning and executing long-horizon cross-application tasks. After each sub-task the agent reflects on its trajectory, converts the raw trajectory into structured experience, and integrates it back into memory, so the agent evolves beyond static pretrained parameters. Reflection is the write operation; the memory hierarchy is the store.
- Signal type: memory (structured experience distilled by self-reflection).
- Lifecycle stage: inference (deployment-time self-evolution, no weight updates).
- Section mapping: S5 deliberative.
- Key claim: new SOTA on the TAC long-horizon productivity benchmark with only a lightweight Gemini-2.5 Flash model; accumulated experience generalizes, giving zero-shot improvement on new tasks.

### A-MEM (NEW: xu2025amem)
- Title: A-MEM: Agentic Memory for LLM Agents. arXiv 2502.12110, 2025.
- Method: agentic memory system that organizes memories dynamically following Zettelkasten principles: each stored episode becomes an atomic note with contextual descriptions, keywords, and tags; the agent generates links among notes and evolves existing notes as new memories arrive. Replaces fixed storage-and-retrieval operations with agent-driven memory organization decisions.
- Signal type: memory (self-organizing interlinked notes).
- Lifecycle stage: inference.
- Section mapping: S5 deliberative.
- Key claim: superior improvement over SOTA memory baselines across six foundation models.

### Mem0 (NEW: chhikara2025mem0)
- Title: Mem0: Building Production-Ready AI Agents with Scalable Long-Term Memory. arXiv 2504.19413, 2025.
- Method: scalable memory-centric architecture that dynamically extracts, consolidates, and retrieves salient information from ongoing conversations, plus a graph-based variant capturing relational structure among conversational elements. Benchmarked on LOCOMO against memory-augmented systems, RAG variants, full-context, an open-source memory solution, a proprietary model system, and a memory-management platform. The production-constraints framing (latency, token cost) is the practitioner angle.
- Signal type: memory (extracted and consolidated dialogue facts; graph variant).
- Lifecycle stage: inference.
- Section mapping: S5 deliberative; feeds S13 practitioner guide (cost/latency trade-offs).
- Key claim: 26% relative improvement in LLM-as-a-Judge metric over OpenAI's memory on LOCOMO; graph variant adds about 2%; 91% lower p95 latency and more than 90% token-cost savings versus full-context.

### ReasoningBank (NEW: ouyang2025reasoningbank)
- Title: ReasoningBank: Scaling Agent Self-Evolving with Reasoning Memory. arXiv 2509.25140, 2025.
- Method: distills generalizable reasoning strategies from an agent's self-judged successful and failed experiences (failures included, unlike success-only routines); retrieved memories inform new interactions and new learnings are integrated back. Adds memory-aware test-time scaling (MaTTS): extra compute per task generates diverse experiences that yield contrastive signal for higher-quality memory, and better memory guides more effective scaling. Directly connects the memory pillar to test-time scaling, useful for the S5/S8 bridge.
- Signal type: memory (distilled reasoning strategies; self-judgment as critique).
- Lifecycle stage: inference.
- Section mapping: S5 deliberative; cross-ref S8 credit assignment (contrastive experience synthesis).
- Key claim: consistently outperforms raw-trajectory and success-only memory on web browsing and software engineering benchmarks; MaTTS amplifies gains; frames memory-driven experience scaling as a new scaling dimension.

### Dynamic Cheatsheet [ALREADY-CITED: suzgun2026dynamic]
- Title: Dynamic Cheatsheet: Test-Time Learning with Adaptive Memory. arXiv 2504.07952, 2025.
- Method: endows a black-box LM with a persistent, evolving memory of strategies, code snippets, and general problem-solving insights, curated by the model itself at inference time; no ground-truth labels, human feedback, or parameter updates. Memory is deliberately concise and transferable rather than transcript dumps, avoiding context ballooning.
- Signal type: memory (self-curated solution strategies).
- Lifecycle stage: inference.
- Section mapping: S5 deliberative.
- Key claim: Claude 3.5 Sonnet's AIME accuracy more than doubled once algebraic insights persisted across questions; GPT-4o's Game of 24 success rose from about 10% to 99% after discovering and reusing a Python solution.

### G-Memory (NEW: zhang2025gmemory)
- Title: G-Memory: Tracing Hierarchical Memory for Multi-Agent Systems. arXiv 2506.07398, 2025.
- Method: hierarchical memory for LLM multi-agent systems inspired by organizational memory theory, managing a three-tier graph hierarchy (insight, query, and interaction graphs). On a new query it retrieves both generalizable insights and condensed inter-agent collaboration trajectories; after execution the whole hierarchy evolves by assimilating new collaborative traces, giving agent teams cross-trial and agent-specific memory.
- Signal type: memory (hierarchical multi-agent collaboration graphs).
- Lifecycle stage: inference.
- Section mapping: S5 deliberative; cross-ref the multi-agent thread (T5) where teams exchange verbal feedback.
- Key claim: improves embodied-action success by up to 20.89% and knowledge-QA accuracy by up to 10.12% across five benchmarks, three backbones, and three MAS frameworks, without modifying the host frameworks.

### MRAgent (NEW: ji2026memory)
- Title: Memory is Reconstructed, Not Retrieved: Graph Memory for LLM Agents. arXiv 2606.06036, 2026.
- Method: replaces the static retrieve-then-reason pipeline with an associative Cue-Tag-Content memory graph plus an active reconstruction mechanism: the agent iteratively explores and prunes retrieval paths as intermediate evidence accumulates during inference, so memory access adapts to the reasoning context. Constrained expansion avoids combinatorial blowup.
- Signal type: memory (associative graph, reconstruction-time reasoning).
- Lifecycle stage: inference.
- Section mapping: S5 deliberative.
- Key claim: up to 23% improvement over strong baselines on LoCoMo and LongMemEval while substantially reducing token and runtime cost.

---

## C. Procedural memory and skill libraries (2025-2026)

### Memp (NEW: fang2025memp)
- Title: Memp: Exploring Agent Procedural Memory. arXiv 2508.06433, 2025.
- Method: gives agents a learnable, updatable, lifelong procedural memory by distilling past trajectories into two granularities: fine-grained step-by-step instructions and higher-level script-like abstractions. Systematically studies Build, Retrieval, and Update strategies, with a dynamic regimen that continuously updates, corrects, and deprecates entries so the repository evolves with new experience.
- Signal type: memory (procedural: instructions + scripts).
- Lifecycle stage: inference.
- Section mapping: S5 deliberative.
- Key claim: steadily higher success and efficiency on TravelPlanner and ALFWorld as memory refines; procedural memory built by a stronger model transfers to a weaker model with substantial gains.

### ReMe (NEW: cao2025remember)
- Title: Remember Me, Refine Me: A Dynamic Procedural Memory Framework for Experience-Driven Agent Evolution. arXiv 2512.10696, 2025.
- Method: attacks the "passive accumulation" pathology of append-only memory archives with three mechanisms: multi-faceted distillation of experience, context-adaptive reuse, and utility-based refinement that adds valid memories and prunes outdated ones, keeping the experience pool compact and high quality. Releases the reme.library dataset.
- Signal type: memory (procedural, utility-scored).
- Lifecycle stage: inference.
- Section mapping: S5 deliberative.
- Key claim: new SOTA among agent memory systems on BFCL-V3 and AppWorld; a memory-scaling effect where Qwen3-8B with ReMe outperforms the larger memoryless Qwen3-14B.

### CASCADE (NEW: guo2026cascade)
- Title: CASCADE: Case-Based Continual Adaptation for Large Language Models During Deployment. arXiv 2605.06702, 2026.
- Method: formalizes deployment-time learning (DTL) as a third stage of the LLM lifecycle after pre-training and post-training: agents improve from experience during deployment without touching parameters. The case-based design accumulates, selects, and refines task-relevant cases, turning past experience into actionable knowledge at query time. The DTL formalization is directly usable as the S2/S3 decision rule the reviewers asked for (inference-time persistence as its own lifecycle stage).
- Signal type: memory (case base).
- Lifecycle stage: inference (formalized as deployment-time learning).
- Section mapping: S5 deliberative; cite in S2 formal framework for the lifecycle-stage boundary.
- Key claim: +20.9% macro-averaged success over zero-shot prompting across 16 tasks (medical diagnosis, legal analysis, code generation, web search, tool use, embodied interaction), beating gradient-based and memory-based baselines.

### MUSE-Autoskill (NEW: lin2026museautoskill)
- Title: MUSE-Autoskill: Self-Evolving Agents via Skill Creation, Memory, Management, and Evaluation. arXiv 2605.27366, 2026.
- Method: skill-centric agent framework that treats skills as long-lived, experience-aware, testable assets under a unified lifecycle: creation on demand, cross-task storage, retrieval through a skill catalog, per-skill experience accumulation, and evaluation-driven refinement. Counters the isolated-static-artifact treatment of skills in earlier work.
- Signal type: memory (skill library with per-skill experience).
- Lifecycle stage: inference.
- Section mapping: S5 deliberative.
- Key claim: outperforms Hermes, Codex, and Claude Code on SkillsBench; self-created skills beat human-authored skills on the covered subset (85.24% vs 81.17%) and transfer to Hermes at 51.90% accuracy, better than Codex- or Claude-created skills.

### AgentFactory (NEW: zhang2026agentfactory)
- Title: AgentFactory: A Self-Evolving Framework Through Executable Subagent Accumulation and Reuse. arXiv 2603.18000, 2026.
- Method: self-evolution paradigm that preserves successful task solutions as executable subagent code rather than textual reflections, arguing text cannot reliably guarantee efficient re-execution in complex scenarios. Subagents are pure Python with standardized documentation, portable across Python-capable systems, and are continuously refined from execution feedback. The direct heir of Voyager's code-skill library at the agent-architecture level.
- Signal type: memory (executable subagent code; execution feedback as critique).
- Lifecycle stage: inference.
- Section mapping: S5 deliberative.
- Key claim: the subagent library grows and improves over time, progressively reducing effort on similar tasks without manual intervention.

### AutoSkill (NEW: yang2026autoskill)
- Title: AutoSkill: Experience-Driven Lifelong Learning via Skill Self-Evolution. arXiv 2603.01145, 2026.
- Method: lifelong-learning framework where LLM agents automatically derive, maintain, and reuse skills from repeated user interactions (stable preferences, institutional conventions), implemented as a model-agnostic plugin layer with a standardized skill representation for sharing across agents, users, and tasks. Positioning/architecture paper: turns ephemeral interaction experience into explicit, reusable, composable capabilities for personalized agents.
- Signal type: memory (personalized skills derived from interaction experience).
- Lifecycle stage: inference.
- Section mapping: S5 deliberative.
- Key claim: a practical, scalable path toward lifelong personalized agents and personal digital surrogates (no headline benchmark number in the abstract).

### Memento-Skills (NEW: zhou2026mementoskills)
- Title: Memento-Skills: Let Agents Design Agents. arXiv 2603.18743, 2026.
- Method: generalist, continually-learnable agent system acting as an agent-designing agent: it constructs, adapts, and improves task-specific agents through experience. Built on memory-based reinforcement learning with stateful prompts; reusable skills stored as structured markdown files serve as persistent, evolving memory encoding both behavior and context, refined iteratively.
- Signal type: memory (markdown skill files) + instruction (stateful prompts).
- Lifecycle stage: inference (memory-based RL without weight updates).
- Section mapping: S5 deliberative.
- Key claim: 26.2% relative accuracy improvement on the General AI Assistants benchmark and 116.2% on Humanity's Last Exam through iterative skill generation and refinement.

### SkillsVote (NEW: liu2026skillsvote)
- Title: SkillsVote: Lifecycle Governance of Agent Skills from Collection, Recommendation to Evolution. arXiv 2605.18401, 2026.
- Method: governance framework for open skill ecosystems, where artifacts are redundant, uneven, and environment-sensitive, and indiscriminate updates pollute future context. Manages skills across collection, recommendation, and evolution: decomposes trajectories into skill-linked subtasks, attributes outcomes to skill-guided execution vs agent exploration vs environment vs result signals, and admits only successful reusable discoveries through evidence-gated updates. The outcome-attribution step is a credit-assignment mechanism over skills.
- Signal type: memory (governed skill library; evidence-gated updates).
- Lifecycle stage: inference.
- Section mapping: S5 deliberative; cross-ref S8 credit assignment (outcome attribution) and S13 (governance guidance).
- Key claim: improves agent performance on Terminal-Bench 2.0 and SWE-Bench Pro via two pathways: online evolution over task streams and offline transfer via frozen libraries.

---

## D. Trained memory policies: RL over what to store, retrieve, and forget

### Memory-R1 (NEW: yan2025memoryr1)
- Title: Memory-R1: Enhancing Large Language Model Agents to Manage and Utilize Memories via Reinforcement Learning. arXiv 2508.19828, 2025.
- Method: replaces static heuristic memory pipelines with a learned mechanism: a Memory Manager agent learns structured operations (ADD, UPDATE, DELETE, NOOP) and an Answer Agent pre-selects and reasons over relevant entries; both are fine-tuned with outcome-driven RL (PPO and GRPO). The cleanest exemplar of memory management crossing from inference-time heuristics into the training pillar; use it in the pqAY-2 decision-rule discussion.
- Signal type: memory (learned management policy; outcome reward).
- Lifecycle stage: training (RL fine-tuning of memory-management and answer policies).
- Section mapping: S5 deliberative with explicit S6 learning-signal cross-listing.
- Key claim: with only 152 training QA pairs it outperforms strong baselines and generalizes across LoCoMo, MSC, and LongMemEval and across 3B-14B model scales.

### SkillRL (NEW: xia2026skillrl)
- Title: SkillRL: Evolving Agents via Recursive Skill-Augmented Reinforcement Learning. arXiv 2602.08234, 2026.
- Method: bridges raw experience and policy improvement: distills trajectories into a hierarchical skill library (SkillBank) instead of storing noisy raw traces, retrieves skills adaptively, and lets the library co-evolve recursively with the agent's policy during RL training. Skills compress experience, cutting token footprint while raising reasoning utility.
- Signal type: memory (hierarchical skill library) feeding RL policy optimization.
- Lifecycle stage: training (skill library co-evolves with RL policy).
- Section mapping: S5 deliberative + S6 learning signal (boundary exemplar).
- Key claim: state-of-the-art on ALFWorld, WebShop, and seven search-augmented tasks, outperforming strong baselines by over 15.3% and staying robust as task complexity grows.

### AutoMem (NEW: wu2026automem)
- Title: AutoMem: Automated Learning of Memory as a Cognitive Skill. arXiv 2607.01224, 2026.
- Method: treats memory management as a trainable skill (metamemory in cognitive-science terms). Promotes file-system operations to first-class memory actions alongside task actions, letting the model decide how to manage memory; improves along two axes, the structure supporting memory (prompts, file schemas, action space) and the model's memory proficiency, sharpened directly with a training signal. Optimizes memory alone without touching task-action behavior.
- Signal type: memory (learned metamemory policy).
- Lifecycle stage: training (memory proficiency is trained; structure axis is system-level).
- Section mapping: S5 deliberative + S6 learning signal.
- Key claim: on Crafter, MiniHack, and NetHack, optimizing memory alone improved the base agent roughly 2x-4x, making a 32B open-weight model competitive with frontier systems such as Claude Opus 4.5 and Gemini 3.1 Pro Thinking.

### Live-Evo (NEW: zhang2026liveevo)
- Title: Live-Evo: Online Evolution of Agentic Memory from Continuous Feedback. arXiv 2602.02369, 2026.
- Method: online self-evolving memory for true continuous feedback rather than folded static benchmarks: maintains experience and meta-guideline banks and updates them from outcomes, reinforcing experiences that consistently help and down-weighting or forgetting misleading or stale ones, an explicit analog of reinforcement and decay in human memory. Built for distribution shift over live task streams.
- Signal type: memory (utility-weighted experiences and meta-guidelines; outcome feedback).
- Lifecycle stage: inference (online, non-parametric).
- Section mapping: S5 deliberative.
- Key claim: on the live Prophet Arena benchmark over a 10-week horizon it improves Brier score by 20.8% and market returns by 12.9%, and transfers to deep-research benchmarks.

---

## E. Meta-evolution: optimizing the memory system itself

### MemEvolve (NEW: zhang2025memevolve)
- Title: MemEvolve: Meta-Evolution of Agent Memory Systems. arXiv 2512.18746, 2025.
- Method: argues agent-level evolution is capped by the staticity of hand-engineered memory architectures, so it jointly evolves the agent's experiential knowledge and the memory architecture itself, refining how the agent learns from experience. Introduces EvolveLab, a unified codebase distilling twelve representative memory systems into a modular design space (encode, store, retrieve, manage) as a standardized substrate and fair arena. The encode/store/retrieve/manage decomposition is a ready-made organizing axis for the S5 memory subsection.
- Signal type: memory (meta-level: architecture search over memory systems).
- Lifecycle stage: inference (system-level evolution, no weight updates).
- Section mapping: S5 deliberative; the design space also informs S3 taxonomy.
- Key claim: improves frameworks such as SmolAgent and Flash-Searcher by up to 17.06% on four agentic benchmarks, with evolved memory architectures transferring across benchmarks and backbones.

### MemPro (NEW: liu2026mempro)
- Title: MemPro: Agentic Memory Systems as Evolvable Programs. arXiv 2606.00619, 2026.
- Method: treats the whole memory construction-retrieval pipeline as an evolvable program population: an Evolving Agent iteratively selects promising runnable memory-system versions, diagnoses recurring failures, and creates improved child versions through failure-mode-guided edit-debug refinement. Addresses fixed-pipeline misalignment with memory banks that grow and restructure over time.
- Signal type: memory (meta-level: program evolution guided by failure diagnosis).
- Lifecycle stage: inference (system-level evolution).
- Section mapping: S5 deliberative; cross-ref S9 (program-space optimization of a system component).
- Key claim: consistently outperforms strong static and prompt-level evolving baselines on LongMemEval, LoCoMo, HotpotQA, and NarrativeQA within a few iterations at a favorable performance-cost trade-off.

### MemSkill (NEW: zhang2026memskill)
- Title: MemSkill: Learning and Evolving Memory Skills for Self-Evolving Agents. arXiv 2602.02474, 2026.
- Method: reframes static hand-designed memory operations as learnable, evolvable memory skills: structured reusable routines for extracting, consolidating, and pruning memory. A controller selects skills, an executor applies them, and a designer analyzes failures where selected skills produce incorrect or incomplete memories, proposing refinements and new skills; a closed loop improves both the skill-selection policy and the skill set.
- Signal type: memory (learned memory-operation skills; failure analysis as critique).
- Lifecycle stage: inference (skill set and policy evolve without weight updates).
- Section mapping: S5 deliberative.
- Key claim: improves task performance over strong baselines on LoCoMo, LongMemEval, HotpotQA, and ALFWorld and generalizes across settings.

---

## F. Benchmarks and critical analyses (feed S11 and S13)

### MemoryAgentBench (NEW: hu2025evaluating)
- Title: Evaluating Memory in LLM Agents via Incremental Multi-Turn Interactions. arXiv 2507.05257, 2025.
- Method: benchmark built on memory-science and cognitive-science theory identifying four core competencies for memory agents: accurate retrieval, test-time learning, long-range understanding, and selective forgetting. Combines reformulated existing datasets with new ones and evaluates memory agents from simple context/RAG systems to agents with external memory modules and tool integration. The four competencies are a ready evaluation rubric for S11.
- Signal type: n/a (benchmark for memory).
- Lifecycle stage: n/a (evaluates inference-time memory).
- Section mapping: S11 evaluation/benchmarks; motivates S5.
- Key claim: current methods fall short of mastering all four competencies, underscoring the need for comprehensive memory mechanisms.

### Evo-Memory (NEW: wei2025evomemory)
- Title: Evo-Memory: Benchmarking LLM Agent Test-time Learning with Self-Evolving Memory. arXiv 2511.20857, 2025.
- Method: streaming benchmark for self-evolving memory: models must search, adapt, and evolve memory after each interaction across sequential task streams, rather than passively retrieving from static dialogue. Unifies and implements more than ten representative memory modules and evaluates them on 10 multi-turn goal-oriented and single-turn reasoning/QA datasets; provides ExpRAG, an experience-reuse baseline, and ReMem, an action-think-memory-refine pipeline.
- Signal type: n/a (benchmark; memory as evaluated capability).
- Lifecycle stage: n/a (evaluates inference-time/test-time learning).
- Section mapping: S11 evaluation/benchmarks.
- Key claim: establishes a unified testbed for experience reuse and continual test-time improvement across task streams.

### AFTER: managing procedural memory (NEW: belikova2026managing)
- Title: Managing Procedural Memory in LLM Agents: Control, Adaptation, and Evaluation. arXiv 2606.23127, 2026.
- Method: introduces AFTER, a benchmark of 382 realistic enterprise tasks spanning six professional roles and 22 procedural skills, with controlled settings for local improvement, cross-task transfer, cross-role transfer, and cross-model generalization. Studies when procedural skills actually produce reusable value in production-like agent platforms.
- Signal type: n/a (benchmark for procedural memory/skills).
- Lifecycle stage: n/a.
- Section mapping: S11 evaluation/benchmarks; findings feed S13 practitioner guide.
- Key claim: one refinement round improves aggregate performance by 3.7 to 6.7 points; skills evolved from diverse multi-model traces reach 73.1% cross-model test accuracy, beating all single-model trace sources; some skills generalize broadly while others overspecialize and lose value under transfer.

### Useful Memories Become Faulty (NEW: zhang2026useful)
- Title: Useful Memories Become Faulty When Continuously Updated by LLMs. arXiv 2605.12978, 2026.
- Method: critical analysis of consolidation-style agentic memory (LLM rewrites trajectories into a continuously updated textual memory bank). Contrasts episodic traces (raw trajectories) with consolidated abstractions and shows continuous LLM consolidation corrupts useful memories. In an environment exposing Retain, Delete, and Consolidate actions, agents preserve raw episodes by default. The strongest counterweight in this thread: it argues against the distill-and-overwrite designs most C/D-cluster papers assume; cite it in S5 as the failure mode and in S13 as guidance.
- Signal type: memory (negative result on consolidated memory; episodic vs semantic distinction).
- Lifecycle stage: inference.
- Section mapping: S5 deliberative (failure modes); S13 practitioner guide; relevant to S12 reliability of feedback channels.
- Key claim: agents that preserve raw episodes double the accuracy of forced-consolidation counterparts (ARC-AGI setting); episodic-only management matches the auto regime; consolidation should be explicitly gated, not fired after every interaction.

---

## Cross-cutting synthesis notes for the S5 writer

1. Persistence-medium axis: reflective text (Reflexion, MUSE) -> distilled insights/instructions (ExpeL, MetaReflection, ReasoningBank) -> workflows (AWM) -> structured notes/graphs (A-MEM, Mem0, G-Memory, MRAgent) -> executable code/skills (Voyager, AgentFactory, MUSE-Autoskill, Memento-Skills, SkillsVote) -> learned policies/weights (Memory-R1, SkillRL, AutoMem). This axis doubles as the pqAY-2 decision rule: classify by what persists and what is optimized.
2. Write-operation axis: append-only accumulation (early work) -> utility-based pruning/decay (ReMe, Live-Evo) -> learned write policies (Memory-R1, MemSkill, AutoMem) -> meta-evolution of the writer itself (MemEvolve, MemPro). Useful Memories (zhang2026useful) is the caution across all rungs.
3. The 2023 -> 2026 arc: memory content evolves, then memory policies are learned, then memory architectures are meta-evolved; benchmarks lag (MemoryAgentBench, Evo-Memory, AFTER all note unmet competencies).
4. Numbers usable in a comparison table (all from abstracts, verified this session): Reflexion 91% HumanEval; AWM +51.1% rel. WebArena; Mem0 91% lower p95 latency; Memory-R1 152 training pairs; CASCADE +20.9% macro over zero-shot; AutoMem ~2x-4x from memory-only optimization; zhang2026useful 2x accuracy for episodic vs forced consolidation.
