# ARR May 2026 author responses (Submission 12040)

Paste each block into OpenReview as an Official Comment on the corresponding review. Text only, no links, per ARR rules. Post before July 13, 2026 AoE (EMNLP lists Jul 7 to 13; the ARR dates page says Jul 8 to 14; the console date governs).

Red-teamed 2026-07-09 by a 4-agent panel (coverage, ARR rules/tone, consistency, style); all should-fix findings applied.

---

## Response to Reviewer pqAY

```text
We thank the reviewer for the careful reading, for recognizing the timeliness of the topic and the value of the temporal three-pillar framing, and for the constructive suggestions.

Weakness 1 (VRL scope). We agree, and this is the primary revision. The current broad definition gets replaced by two inclusion criteria: (i) the feedback is expressed in natural language and its linguistic structure is functionally consumed by the agent, rather than being collapsed to a scalar or preference bit before it is used, and (ii) the feedback participates in an improvement loop (output revision, memory write, or parameter update). Under these criteria, plain instruction following (no improvement loop) and vanilla RLHF/DPO (language reduced to a preference bit before learning) fall outside VRL; the latter appear only for contrast, as the scalar endpoint of our compression spectrum. One clarification the criteria make precise: language consumed at specification time to construct a reward function (as in reward-code generation) satisfies criterion (i) even though the constructed function later emits scalars, because the linguistic content itself is what gets consumed. A dedicated "what is not VRL" paragraph will state how VRL differs from RLHF, instruction following, language-conditioned RL, and generic LLM-agent feedback loops.

Weakness 2 (cross-pillar decision rules). We agree. The revision adds an assignment rule: a method is placed by what the linguistic signal modifies at the moment it takes effect, plus a hybrid-cases table that tags multi-pillar methods rather than forcing them into one cell. For the two cases the reviewer names: reward-code generation grounds the MDP at problem-definition time (per the clarification above), and any downstream training it enables is tagged as a learning-signal role in the table; experiential memory is consumed as deliberative feedback at inference time, and the table notes its cross-episode persistence and its boundary with long-term adaptation.

Comments (terminology). We will standardize on "grounding signal" throughout.

Limitations and societal impact. The revision expands the Limitations section to discuss who is harmed when verbal feedback is incorrect, biased, adversarial, or poorly grounded, with attention to high-stakes deployments (coding assistants, robotics, clinical decision support, education), complementing the existing Section 6.3 discussion of prompt injection, memory poisoning, and sycophancy.

These changes materially sharpen the paper, and we thank the reviewer for prompting them.
```

---

## Response to Reviewer Q27s

```text
We thank the reviewer for the detailed and candid assessment, and for finding the direction exciting. The weaknesses identified here, in particular the breadth of the definition, have shaped the main revision now underway.

1. Definition scope. We agree. The revision replaces the definition with two inclusion criteria: (i) the linguistic structure of the feedback must be functionally consumed, not collapsed to a scalar or preference bit before use, and (ii) the feedback must participate in an improvement loop (revision, memory write, or parameter update). Under this definition, supervised fine-tuning on instructions and vanilla RLHF/DPO fall outside VRL; they appear only as the scalar endpoint of our compression spectrum, for contrast. One boundary case the criteria settle: language consumed at specification time to construct a reward function satisfies criterion (i) even though the constructed function later emits scalars. This narrows the scope substantially and separates the survey from general LLM training and alignment.

2. Terminology. We agree and the revision adds a genealogy to Section 1: Shinn et al. (2023) introduced the term for self-reflective agents; we deliberately generalize it, we say so up front, and a side-by-side statement of the original sense and our generalization prevents conflation.

3. Taxonomy structure. We agree with the specific criticism and will fix it: the revision drops any implication that methods traverse a clean grounding-deliberation-learning cycle. The pillars classify where an individual signal acts, not a lifecycle that methods follow. The coding-agent example gets reframed accordingly: it illustrates that one system can consume signals in all three regimes, not that any single method operates through the full loop.

4. Scope. The sharpened definition in point 1 does most of this work, and exclusions get stated up front. We considered restricting to verbal feedback without model training, as the reviewer suggests; we prefer to keep training-time methods that retain linguistic structure (feedback-conditioned training, critique-based distillation) because excluding them would sever the inference-time and training-time uses of the same signal, but everything scalar-only moves out of scope.

5. MDP framing. We agree in part. The MDP vocabulary organizes the grounding pillar; it is not a claim that all language-agent methods admit an MDP formulation. The revision adds caveats where the formalism stops applying: many settings are partially observable, non-Markovian, and lack well-defined transition or reward functions.

6. Search-guided deliberation. Partially agreed. Our intended inclusion criterion is the verbal evaluator signal consumed during search, not the search procedure itself. The subsection gets renamed and reframed around evaluator and critique feedback within search, with that criterion stated, and pure decoding strategies that involve no linguistic feedback are excluded.

7. Synthesis and benchmarking. Agreed. The revision adds an evaluation synthesis: a table organizing benchmarks for critique quality, reward-model quality, process supervision, and feedback utilization, together with a practitioner decision table for choosing among verbal-feedback mechanisms. A new benchmark is beyond the scope of a survey, but the synthesis and a recommended evaluation protocol directly target the comparability gap the reviewer identifies.

We believe these revisions engage the core concerns, and we thank the reviewer for the specificity of the critique, which made them concrete.
```

---

## Response to Reviewer 3gqM

```text
We thank the reviewer for the constructive review and for the concrete guidance on what a survey in this area should deliver.

1. Comparison with prior surveys. Agreed. The revision adds a comparison table covering, at minimum: Luketina et al. (2019) on RL informed by natural language; the self-correction surveys of Pan et al. and Kamoi et al.; RLHF and preference-optimization surveys; self-evolving-agent surveys; agent-memory surveys; and test-time-scaling surveys. Columns compare scope, feedback type (scalar, preference, verbal), lifecycle stage covered, whether a formal framework is offered, and whether practitioner guidance is given. The accompanying text states our positioning: the surveys we compare against are mechanism-centric or agent-centric; ours is signal-centric, organized by which component of the decision problem a linguistic signal modifies and when.

2. Actionable organization. Two changes: decision rules for assigning methods (including hybrid cases, with a table tagging methods that span pillars), and a synthesis paragraph per pillar stating shared failure modes and the conditions under which that pillar's methods are the right choice, rather than only enumerating work.

3. Practitioner guidance. Agreed, and this becomes a dedicated contribution of the revision: when to use language as a reward signal, as state information, for action-level guidance, or as inference-time deliberation, keyed to properties a practitioner can assess: verifiability of task outcomes, feedback latency and cost, and risk exposure (reward hacking, sycophancy, feedback poisoning).

4. RL depth. Agreed. The revision adds a subsection on how feedback forms pair with algorithm families (online policy-gradient methods with generated reward functions, offline preference optimization, supervised fine-tuning on filtered or feedback-conditioned text, process-level credit assignment with process reward models) and a discussion of the consequences the reviewer raises: reward specified through language raises objective mis-specification and hacking risks; state represented through language raises information-loss and aliasing questions; actions generated under LLM priors change exploration. Where formal results do not exist, the open problems get named as such rather than overclaimed; part of the survey's value is stating precisely which guarantees are missing.

Scope precision. The revision defines the signal modality scope in Section 1 (feedback is natural language; observations may be non-text) and expands coverage of embodied settings where language corrections and language-derived rewards interface with non-text observations, so the framing and the coverage match.

Limitations. The revision also expands the Limitations section to directly discuss the failure modes of language-based feedback the reviewer names: reward-specification failures, unreliable language interpretation, weak grounding, and the transfer of language-guided policies to real-world settings.

The four requested additions (survey comparison, actionable organization, practitioner guidance, RL depth) map directly onto the revision, and we thank the reviewer for laying them out so clearly.
```

---

## Response to Reviewer bnae

```text
We thank the reviewer for the frank assessment and for spelling out what would make the survey valuable beyond literature organization.

1. Contribution beyond synthesis. The revision foregrounds four concrete contributions: (i) a signal-centric framing that types every linguistic artifact by which component of the decision problem it modifies (goal, state, action, reward, policy) and when it enters the agent lifecycle, which to our knowledge no existing survey provides; (ii) decision rules for classifying methods, including hybrid cases; (iii) a cross-cutting treatment of credit assignment for verbal feedback (outcome-level, process-level, and reflective), currently fragmented across separate literatures; and (iv) practitioner guidance plus a research agenda. To make the differentiation checkable, the revision adds a comparison table against prior surveys (RL informed by natural language, self-correction, RLHF and preference optimization, agent memory, test-time scaling), comparing scope, feedback type, lifecycle stage, formal framework, and practitioner guidance. These are stated as claims in the introduction so the paper can be judged against them.

2. Call to action. Agreed. The revision adds a research agenda with concrete open problems, including: under what conditions verbal feedback improves sample efficiency over scalar reward; optimality and convergence when rewards are specified or shaped through language; provenance and robustness of feedback channels (injection, poisoning, sycophancy); and standardized evaluation of feedback quality and utilization. Each item states why current methods cannot answer it.

3. Algorithmic perspective. Agreed. A new subsection maps feedback forms to algorithm families and their assumptions: online policy optimization against language-derived reward functions, offline preference-based objectives, supervised fine-tuning on filtered or feedback-conditioned data, and step-level credit assignment via process reward models, with the conditions under which each is appropriate. It also takes up the reviewer's specific questions: how language-based reward specification affects the learning objective and temporal credit assignment, and when language-based state representations preserve the information needed for control. Where the honest answer is that no formal result exists, we say so and place the item in the research agenda rather than gesture at rigor the field does not yet have.

4. Terminology. The revision defines the scope up front: feedback signals are natural language; observations may be non-text, and coverage of embodied settings where language feedback interfaces with such observations is expanded so the term and the coverage align. A short genealogy note records that Shinn et al. (2023) introduced the term for self-reflective agents and that we deliberately generalize it.

Limitations. The revision also expands the Limitations section to directly discuss the theoretical and practical failure modes the reviewer names: reward-specification failures, unreliable language interpretation, weak grounding, and the transfer of language-guided policies to real-world settings.

These revisions aim to convert the paper from a descriptive organization of the literature into a framework with testable claims, guidance, and a concrete agenda, which is what the reviewer asks of a survey in this space.
```
