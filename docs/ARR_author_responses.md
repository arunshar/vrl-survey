# ARR May 2026 author responses (Submission 12040)

Verbatim record of the responses Kshitij posted to OpenReview as Official Comments, one per review, reformatted here into headings for readability. Wording is unchanged from what was actually posted; only the structure (headings instead of one prose block per reviewer) is new. If you need to re-edit a live comment, pull the exact current text from OpenReview, not this file.

Originally: paste each block into OpenReview as an Official Comment on the corresponding review, text only, no links, per ARR rules. Posted before July 13, 2026 AoE (EMNLP lists Jul 7 to 13; the ARR dates page says Jul 8 to 14; the console date governs).

Red-teamed 2026-07-09 by a 4-agent panel (coverage, ARR rules/tone, consistency, style); all should-fix findings applied. Updated same day to already-implemented phrasing: every described change now exists in the revised manuscript (`revision/` in this repo, marked and clean builds), so the responses state completed work, not promises. The marked PDF and the Summary of Differences accompany a future resubmission; they are not posted during the discussion phase (ARR responses are text-only).

---

## Response to Reviewer pqAY

We thank the reviewer for the careful reading, for recognizing the timeliness of the topic and the value of the temporal three-pillar framing, and for the constructive suggestions.

### Weakness 1 (VRL scope)

We agree, and this became the primary revision, which we have already implemented. The broad definition is replaced by two inclusion criteria: (i) the feedback is expressed in natural language and its linguistic structure is functionally consumed by the agent, rather than being collapsed to a scalar or preference bit before it is used, and (ii) the feedback participates in an improvement loop (output revision, memory write, or parameter update). Under these criteria, plain instruction following (no improvement loop) and vanilla RLHF/DPO (language reduced to a preference bit before learning) fall outside VRL; the latter appear only for contrast, as the scalar endpoint of our compression spectrum. One clarification the criteria make precise: language consumed at specification time to construct a reward function (as in reward-code generation) satisfies criterion (i) even though the constructed function later emits scalars, because the linguistic content itself is what gets consumed. A dedicated passage now states how VRL differs from RLHF, instruction following, language-conditioned RL, and generic LLM-agent feedback loops.

### Weakness 2 (cross-pillar decision rules)

We agree, and we have implemented the fix. The taxonomy section now states an assignment rule, a method is placed by what the linguistic signal modifies at the moment it takes effect, plus a hybrid-cases table that tags multi-pillar methods rather than forcing them into one cell. For the two cases the reviewer names: reward-code generation grounds the MDP at problem-definition time (per the clarification above), and its downstream training role is tagged in the table; experiential memory is classified by its moment of consumption, and the table records its cross-episode persistence and boundary with long-term adaptation.

### Comments (terminology)

We have standardized on "grounding signal" throughout the text and are re-exporting the figures so their labels match.

### Limitations and societal impact

The Limitations section now discusses who is harmed when verbal feedback is incorrect, biased, adversarial, or poorly grounded, with attention to high-stakes deployments (coding assistants, robotics, clinical decision support, education), complementing the existing Section 6.3 discussion of prompt injection, memory poisoning, and sycophancy.

All of the above is implemented in the revised manuscript, with every change tracked for the next stage of review. These changes materially sharpen the paper, and we thank the reviewer for prompting them.

---

## Response to Reviewer Q27s

We thank the reviewer for the detailed and candid assessment, and for finding the direction exciting. The weaknesses identified here, in particular the breadth of the definition, have shaped the main revision now underway.

### 1. Definition scope

We agree, and we have already implemented the fix. The definition is replaced with two inclusion criteria: (i) the linguistic structure of the feedback must be functionally consumed, not collapsed to a scalar or preference bit before use, and (ii) the feedback must participate in an improvement loop (revision, memory write, or parameter update). Under this definition, supervised fine-tuning on instructions and vanilla RLHF/DPO fall outside VRL; they appear only as the scalar endpoint of our compression spectrum, for contrast. One boundary case the criteria settle: language consumed at specification time to construct a reward function satisfies criterion (i) even though the constructed function later emits scalars. This narrows the scope substantially and separates the survey from general LLM training and alignment.

### 2. Terminology

We agree, and Section 1 now carries the genealogy: Shinn et al. (2023) introduced the term for self-reflective agents; we deliberately generalize it, and the text states this explicitly to prevent conflation with the original, narrower sense.

### 3. Taxonomy structure

We agree with the specific criticism and have fixed it: the revised text drops any implication that methods traverse a clean grounding-deliberation-learning cycle, stating instead that the pillars classify where an individual signal acts, not stages of a pipeline that methods follow. The coding-agent example is reframed accordingly: it illustrates that one system can consume signals in all three regimes, not that any single method operates through the full loop.

### 4. Scope

The sharpened definition in point 1 does most of this work, and exclusions are now stated up front. We considered restricting to verbal feedback without model training, as the reviewer suggests; we prefer to keep training-time methods that retain linguistic structure (feedback-conditioned training, critique-based distillation) because excluding them would sever the inference-time and training-time uses of the same signal, but everything scalar-only moves out of scope.

### 5. MDP framing

We agree in part. The MDP vocabulary organizes the grounding pillar; it is not a claim that all language-agent methods admit an MDP formulation. The taxonomy section now carries this caveat explicitly: many settings are partially observable, non-Markovian, and lack well-defined transition or reward functions.

### 6. Search-guided deliberation

Partially agreed, and we have revised accordingly. The subsection is renamed "Evaluator Feedback in Search" and now opens with the inclusion criterion: the verbal evaluator signal consumed during search qualifies, not the search procedure itself, and pure decoding strategies that involve no linguistic feedback are excluded.

### 7. Synthesis and benchmarking

Agreed. The revised paper now recommends evaluating feedback quality and feedback utilization separately, citing the relevant benchmark families, and adds a practitioner decision table for choosing among verbal-feedback mechanisms plus a named research agenda. A new benchmark is beyond the scope of a survey, but this synthesis directly targets the comparability gap the reviewer identifies.

All the changes above are implemented in the revised manuscript with tracked changes. We believe they engage the core concerns, and we thank the reviewer for the specificity of the critique, which made them concrete.

---

## Response to Reviewer 3gqM

We thank the reviewer for the constructive review and for the concrete guidance on what a survey in this area should deliver.

### 1. Comparison with prior surveys

Agreed, and we have added it. A new comparison table covers twelve surveys and frameworks: Luketina et al. (2019) on RL informed by natural language; the self-correction surveys of Pan et al. and Kamoi et al.; feedback-integration, RLHF, and preference-optimization surveys; agent-memory, test-time-scaling, self-evolving-agent, and agentic-RL surveys; and the Natural Language Reinforcement Learning framework. Columns compare organizing axis, feedback types (scalar, preference, verbal), lifecycle stages covered, and whether practitioner guidance is given. The accompanying text states our positioning: the surveys we compare against are mechanism-centric or agent-centric; ours is signal-centric, organized by which component of the decision problem a linguistic signal modifies and when.

### 2. Actionable organization

We addressed this in two ways, both implemented: decision rules for assigning methods (including hybrid cases, with a table tagging methods that span pillars), and a sharpened contribution statement that commits the taxonomy to being applicable rather than merely descriptive.

### 3. Practitioner guidance

Agreed, and this is now a dedicated contribution: a decision table states when to use language as a reward signal, as state information, as inference-time deliberation, as memory, or as a training signal, keyed to properties a practitioner can assess: verifiability of task outcomes, feedback latency and cost, and risk exposure (reward hacking, sycophancy, feedback poisoning).

### 4. RL depth

Agreed. A new discussion subsection now maps feedback forms to algorithm families (online policy-gradient methods with generated reward functions, offline preference optimization, supervised fine-tuning on filtered or feedback-conditioned text, process-level credit assignment with process reward models) and discusses the consequences the reviewer raises: reward specified through language raises objective mis-specification and hacking risks; state represented through language raises information-loss and aliasing questions; actions generated under LLM priors change exploration. Where formal results do not exist, the open problems are named as such rather than overclaimed; part of the survey's value is stating precisely which guarantees are missing.

### Scope precision

Section 1 now defines the signal modality scope: the feedback signal is natural-language text, while observations may be non-textual, as in embodied settings. A fuller treatment of embodied and multimodal settings is planned for an extended version.

### Limitations

The Limitations section now directly discusses the failure modes of language-based feedback the reviewer names: reward-specification failures, unreliable language interpretation, weak grounding, and the transfer of language-guided policies to real-world settings.

The four requested additions (survey comparison, actionable organization, practitioner guidance, RL depth) are implemented in the revised manuscript with tracked changes, and we thank the reviewer for laying them out so clearly.

---

## Response to Reviewer bnae

We thank the reviewer for the frank assessment and for spelling out what would make the survey valuable beyond literature organization.

### 1. Contribution beyond synthesis

The revised introduction now states four concrete contributions: (i) a signal-centric framing that types every linguistic artifact by which component of the decision problem it modifies and when it enters the agent lifecycle, which to our knowledge no existing survey provides; (ii) explicit inclusion criteria plus decision rules for classifying methods, including hybrid cases; (iii) an algorithmic-interaction treatment connecting feedback forms to optimization families and credit assignment; and (iv) practitioner guidance plus a research agenda. To make the differentiation checkable, we have added a comparison table against twelve prior surveys and frameworks (RL informed by natural language, self-correction, feedback integration, RLHF and preference optimization, agent memory, test-time scaling, self-evolving agents, agentic RL), comparing organizing axis, feedback types, lifecycle stages, and practitioner guidance. These are stated as claims in the introduction so the paper can be judged against them.

### 2. Call to action

Agreed. The discussion now closes with a research agenda naming concrete open problems: under what conditions verbal feedback improves sample efficiency over scalar reward; optimality and convergence when rewards are specified or shaped through language; temporal credit assignment from free-form critiques; provenance and robustness of feedback channels (injection, poisoning, sycophancy); and standardized, separate evaluation of feedback quality and utilization. The practitioner decision table turns the taxonomy into design guidance.

### 3. Algorithmic perspective

Agreed. A new subsection now maps feedback forms to algorithm families and their assumptions: online policy optimization against language-derived reward functions, offline preference-based objectives, supervised fine-tuning on filtered or feedback-conditioned data, and step-level credit assignment via process reward models. It also addresses the reviewer's specific questions: how language-based reward specification affects the learning objective and credit assignment, and when language-based state representations preserve the information needed for control. Where the honest answer is that no formal result exists, we say so and place the item in the research agenda.

### 4. Terminology

Section 1 now defines the scope up front: the feedback signal is natural-language text; observations may be non-textual, as in embodied settings, so the term and the coverage align. A genealogy note records that Shinn et al. (2023) introduced the term for self-reflective agents and that we deliberately generalize it. A fuller treatment of embodied and multimodal settings is planned for an extended version.

### Limitations

The Limitations section now directly discusses the theoretical and practical failure modes the reviewer names: reward-specification failures, unreliable language interpretation, weak grounding, and the transfer of language-guided policies to real-world settings.

These revisions, all implemented in the revised manuscript with tracked changes, are aimed at converting the paper from a descriptive organization of the literature into a framework with checkable claims, guidance, and a concrete agenda, which is what the reviewer asks of a survey in this space.
