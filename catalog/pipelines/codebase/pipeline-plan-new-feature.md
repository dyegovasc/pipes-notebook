---
id: pipeline-plan-new-feature
name: New Feature Implementation Plan
description: Validates intent, maps codebase context, designs solution architecture, and produces a detailed implementation plan before any code is written
domain: codebase
version: 1.1
category: compose
fragments:
  - fragment-ask-feature-requirements
  - fragment-lint-feature-questions
  - fragment-classify-feature-unknowns
  - fragment-establish-scope-guardrails
  - fragment-reframe-intent
  - fragment-request-phase-approval
  - fragment-read-project-instruction
  - fragment-check-existing-stack-rule
  - fragment-analyze-codebase-context
  - fragment-map-system-boundaries
  - fragment-assess-blast-radius
  - fragment-generate-solution-hypotheses
  - fragment-select-solution
  - fragment-clarify-shared-decisions
  - fragment-define-solution-architecture
  - fragment-define-implementation-steps
  - fragment-draft-test-strategy
  - fragment-assess-implementation-risks
  - fragment-confirm-acceptance-criteria
  - fragment-format-implementation-plan
  - fragment-create-plan-file
  - fragment-validate-plan-consistency
  - fragment-audit-plan-ambiguity
---

# Pipeline: New Feature Implementation Plan

Guides an agent through the full planning process for a new feature before any code is written. Validates intent, maps the codebase, designs a solution, produces a structured implementation plan artifact, and validates it against the current codebase state.

## Memory Contract

Mode: none
Scope: none
Reads:
- none

Writes:
- none

Compaction:
- none

Model Guidance:
- strict

## Control Rules

1. Complete one phase at a time.
2. Do not draft, summarize, or plan later phases before the current phase is shown to the user.
3. Each phase requires explicit user approval before the next phase begins.
4. Stop and wait for the user's response at every approval gate.
5. Only continue after the current phase has been confirmed or corrected.
6. Do not ask repo-specific questions before Phase 2: Context.
7. If a follow-up question is needed in Phase 1: Framing, validate it with `fragment-lint-feature-questions` first and ask only user-owned questions.
8. Keep solution hypothesis generation in Phase 3: Design, not in Framing.
9. Phase 3 must end with one recommended hypothesis, even if it is marked provisional.
10. If the user signals a question is premature, defer it and resolve it through Context when possible.
11. Final validation must include both plan consistency checking and ambiguity auditing.

## Phases

### Phase 1: Framing
**Objective:** Validate user intent, gather requirements, define success criteria, and establish scope guardrails.

**Entry Conditions:**
- User has requested a new feature
- Feature scope is reasonably defined

**Fragments:**
- `fragment-ask-feature-requirements`
- `fragment-lint-feature-questions`
- `fragment-classify-feature-unknowns`
- `fragment-establish-scope-guardrails`
- `fragment-reframe-intent`
- `fragment-request-phase-approval`

**Instructions:**
1. Run `fragment-ask-feature-requirements` to gather feature description, requirements, success criteria, and non-goals
2. If follow-up questions are needed, run `fragment-lint-feature-questions` first and only ask user-owned questions that pass validation
3. Run `fragment-classify-feature-unknowns` to sort open items into user-owned, repo-owned, agent-owned, and shared-decision buckets
4. Apply `fragment-establish-scope-guardrails` to define what is in scope, out of scope, protected areas, and which repo-specific questions are deferred to later phases
5. Use `fragment-reframe-intent` to restate and confirm understanding
6. Present `fragment-request-phase-approval` — do not proceed to Phase 2 without explicit approval

**Exit Conditions:**
- Intent validated and confirmed
- Requirements documented
- Success criteria defined and testable
- Scope guardrails established
- Repo-specific open questions deferred instead of asked prematurely

---

### Phase 2: Context
**Objective:** Understand the codebase environment the feature will live in.

**Entry Conditions:**
- Phase 1 approved by user

**Fragments:**
- `fragment-read-project-instruction`
- `fragment-check-existing-stack-rule`
- `fragment-analyze-codebase-context`
- `fragment-map-system-boundaries`
- `fragment-assess-blast-radius`
- `fragment-request-phase-approval`

**Instructions:**
1. Run `fragment-read-project-instruction` — attempt to read `.pipes/ai-instructions/project.md`
2. If `project_instruction_found: false`, run `fragment-check-existing-stack-rule` as fallback
3. If neither exists, proceed with live codebase investigation only
4. Run `fragment-analyze-codebase-context` to complement with targeted codebase scan, using any deferred repo questions from Phase 1 to guide the investigation
5. Run `fragment-map-system-boundaries` to identify affected components
6. Run `fragment-assess-blast-radius` to assess regression surface
7. Present `fragment-request-phase-approval` — do not proceed to Phase 3 without explicit approval

**Exit Conditions:**
- Stack and architecture baseline established
- Codebase structure understood
- System boundaries mapped
- Affected components identified
- Blast radius assessed
- Repo-owned unknowns reduced with concrete context evidence

---

### Phase 3: Design
**Objective:** Generate and evaluate solution hypotheses before committing to an approach.

**Entry Conditions:**
- Phase 2 approved by user

**Fragments:**
- `fragment-generate-solution-hypotheses`
- `fragment-select-solution`
- `fragment-clarify-shared-decisions`
- `fragment-define-solution-architecture`
- `fragment-request-phase-approval`

**Instructions:**
1. Run `fragment-generate-solution-hypotheses` to propose multiple approaches with trade-offs grounded in Phase 2 context
2. Run `fragment-select-solution` to evaluate the hypotheses, choose the recommended approach, and explain why the alternatives are weaker
3. If meaningful shared decisions remain after the recommendation, run `fragment-clarify-shared-decisions`; otherwise, skip directly to architecture definition
4. Run `fragment-define-solution-architecture` to define architecture, data flow, impacted files, and any deviations from existing patterns
5. Present `fragment-request-phase-approval` — do not proceed to Phase 4 without explicit approval

**Exit Conditions:**
- Multiple solution hypotheses generated
- Recommended solution selected with rationale
- Solution architecture defined
- Impacted files identified
- Remaining shared decisions either clarified or recorded as assumptions

---

### Phase 4: Planning
**Objective:** Produce a complete execution plan with test strategy, risk assessment, and confirmed acceptance criteria.

**Entry Conditions:**
- Phase 3 approved by user

**Fragments:**
- `fragment-define-implementation-steps`
- `fragment-draft-test-strategy`
- `fragment-assess-implementation-risks`
- `fragment-confirm-acceptance-criteria`
- `fragment-request-phase-approval`

**Instructions:**
1. Run `fragment-define-implementation-steps` to break solution into sequenced steps
2. Run `fragment-draft-test-strategy` to document unit, integration, and e2e coverage
3. Run `fragment-assess-implementation-risks` to identify risks and mitigations
4. Use `fragment-confirm-acceptance-criteria` to confirm acceptance criteria, blockers, and readiness assumptions with the user
5. Present `fragment-request-phase-approval` — do not proceed to Phase 5 without explicit approval

**Exit Conditions:**
- Implementation steps sequenced
- Test strategy documented
- Risks and regressions assessed
- Acceptance criteria confirmed by user
- Blocking ambiguities identified or cleared

---

### Phase 5: Generate Artifact
**Objective:** Write all gathered information into a structured plan file.

**Entry Conditions:**
- Phase 4 approved by user

**Fragments:**
- `fragment-format-implementation-plan`
- `fragment-request-phase-approval`
- `fragment-create-plan-file`

**Instructions:**
1. Run `fragment-format-implementation-plan` to format all gathered data into the plan document
2. Display the full formatted plan to the user
3. Present `fragment-request-phase-approval` — do not write to disk without explicit approval
4. On approval, run `fragment-create-plan-file` to write `.pipes/plans/{number}-plan-{short-description}.md`

**Exit Conditions:**
- Plan formatted and approved
- File written to `.pipes/plans/` with correct naming pattern
- All required sections present and properly formatted

---

### Phase 6: Final Validation
**Objective:** Validate the generated plan against the current codebase state and audit remaining ambiguity before implementation.

**Entry Conditions:**
- Phase 5 approved by user
- Plan file exists at `.pipes/plans/`

**Fragments:**
- `fragment-validate-plan-consistency`
- `fragment-audit-plan-ambiguity`

**Instructions:**
1. Run `fragment-validate-plan-consistency` against the generated plan file and current codebase
2. Run `fragment-audit-plan-ambiguity` to determine whether the plan is clear, assumption-based, or blocking
3. Surface contradictions with severity and concrete corrections
4. Present ambiguity findings separately from consistency findings

**Exit Conditions:**
- Plan contradictions identified and documented
- Severity of discrepancies assessed
- Concrete corrections provided
- Plan validated against current codebase state
- Ambiguity outcome classified as `clear`, `assumption_based`, or `blocking`
