---
id: pipeline-plan-new-feature
name: New Feature Implementation Plan
description: Validates intent, maps codebase context, designs solution architecture, and produces a detailed implementation plan before any code is written
domain: codebase
version: 1.0
category: compose
fragments:
  - fragment-ask-feature-requirements
  - fragment-deliver-question-with-options
  - fragment-establish-scope-guardrails
  - fragment-reframe-intent
  - fragment-request-approval
  - fragment-read-project-instruction
  - fragment-check-existing-stack-rule
  - fragment-analyze-codebase-context
  - fragment-map-system-boundaries
  - fragment-assess-blast-radius
  - fragment-generate-solution-hypotheses
  - fragment-select-solution
  - fragment-define-solution-architecture
  - fragment-define-implementation-steps
  - fragment-draft-test-strategy
  - fragment-assess-implementation-risks
  - fragment-confirm-content
  - fragment-format-implementation-plan
  - fragment-create-files
  - fragment-validate-plan-consistency
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

## Phases

### Phase 1: Framing
**Objective:** Validate user intent, gather requirements, define success criteria, and establish scope guardrails.

**Entry Conditions:**
- User has requested a new feature
- Feature scope is reasonably defined

**Fragments:**
- `fragment-ask-feature-requirements`
- `fragment-deliver-question-with-options`
- `fragment-establish-scope-guardrails`
- `fragment-reframe-intent`
- `fragment-request-approval`

**Instructions:**
1. Present `fragment-ask-feature-requirements` via `fragment-deliver-question-with-options`
2. Gather feature description, requirements, and success criteria
3. Apply `fragment-establish-scope-guardrails` to define what is in/out of scope
4. Use `fragment-reframe-intent` to restate and confirm understanding
5. Present `fragment-request-approval` — do not proceed to Phase 2 without explicit approval

**Exit Conditions:**
- Intent validated and confirmed
- Requirements documented
- Success criteria defined and testable
- Scope guardrails established

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
- `fragment-request-approval`

**Instructions:**
1. Run `fragment-read-project-instruction` — attempt to read `.pipes/ai-instructions/project.md`
2. If `project_instruction_found: false`, run `fragment-check-existing-stack-rule` as fallback
3. If neither exists, proceed with live codebase investigation only
4. Run `fragment-analyze-codebase-context` to complement with targeted codebase scan
5. Run `fragment-map-system-boundaries` to identify affected components
6. Run `fragment-assess-blast-radius` to assess regression surface
7. Present `fragment-request-approval` — do not proceed to Phase 3 without explicit approval

**Exit Conditions:**
- Stack and architecture baseline established
- Codebase structure understood
- System boundaries mapped
- Affected components identified
- Blast radius assessed

---

### Phase 3: Design
**Objective:** Generate and evaluate solution hypotheses before committing to an approach.

**Entry Conditions:**
- Phase 2 approved by user

**Fragments:**
- `fragment-generate-solution-hypotheses`
- `fragment-select-solution`
- `fragment-define-solution-architecture`
- `fragment-request-approval`

**Instructions:**
1. Run `fragment-generate-solution-hypotheses` to propose multiple approaches with trade-offs
2. Run `fragment-select-solution` to evaluate and select the optimal approach
3. Run `fragment-define-solution-architecture` to define architecture, data flow, and impacted files
4. Present `fragment-request-approval` — do not proceed to Phase 4 without explicit approval

**Exit Conditions:**
- Multiple solution hypotheses generated
- Optimal solution selected
- Solution architecture defined
- Impacted files identified

---

### Phase 4: Planning
**Objective:** Produce a complete execution plan with test strategy, risk assessment, and confirmed acceptance criteria.

**Entry Conditions:**
- Phase 3 approved by user

**Fragments:**
- `fragment-define-implementation-steps`
- `fragment-draft-test-strategy`
- `fragment-assess-implementation-risks`
- `fragment-confirm-content`
- `fragment-request-approval`

**Instructions:**
1. Run `fragment-define-implementation-steps` to break solution into sequenced steps
2. Run `fragment-draft-test-strategy` to document unit, integration, and e2e coverage
3. Run `fragment-assess-implementation-risks` to identify risks and mitigations
4. Use `fragment-confirm-content` to confirm acceptance criteria with the user
5. Present `fragment-request-approval` — do not proceed to Phase 5 without explicit approval

**Exit Conditions:**
- Implementation steps sequenced
- Test strategy documented
- Risks and regressions assessed
- Acceptance criteria confirmed by user

---

### Phase 5: Generate Artifact
**Objective:** Write all gathered information into a structured plan file.

**Entry Conditions:**
- Phase 4 approved by user

**Fragments:**
- `fragment-format-implementation-plan`
- `fragment-create-files`
- `fragment-request-approval`

**Instructions:**
1. Run `fragment-format-implementation-plan` to format all gathered data into the plan document
2. Display the full formatted plan to the user
3. Present `fragment-request-approval` — do not write to disk without explicit approval
4. On approval, run `fragment-create-files` to write `.pipes/plans/{number}-plan-{short-description}.md`

**Exit Conditions:**
- Plan formatted and approved
- File written to `.pipes/plans/` with correct naming pattern
- All required sections present and properly formatted

---

### Phase 6: Consistency Assessment
**Objective:** Validate the generated plan against the actual current codebase state.

**Entry Conditions:**
- Phase 5 approved by user
- Plan file exists at `.pipes/plans/`

**Fragments:**
- `fragment-validate-plan-consistency`

**Instructions:**
1. Run `fragment-validate-plan-consistency` against the generated plan file and current codebase
2. Surface all contradictions with severity and concrete corrections
3. Present findings to the user

**Exit Conditions:**
- Plan contradictions identified and documented
- Severity of discrepancies assessed
- Concrete corrections provided
- Plan validated against current codebase state
