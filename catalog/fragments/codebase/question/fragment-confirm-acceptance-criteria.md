---
id: fragment-confirm-acceptance-criteria
name: Confirm Acceptance Criteria
type: question
version: 1.0
domain: codebase
---

# Fragment: Confirm Acceptance Criteria

Confirms the final acceptance criteria, blockers, and readiness assumptions before the plan artifact is generated.

## Question
Please review the acceptance criteria, blockers, and assumptions captured so far. What needs to change before the plan is finalized?

## Guidelines

- Confirm that the success criteria are still correct after Design.
- Call out any blocker that would prevent safe implementation.
- Note whether the current assumptions are acceptable for a first implementation pass.
- If nothing needs to change, say that the criteria and assumptions are correct as written.

## Capture

- `confirmed_success_criteria`: final acceptance criteria approved by the user
- `acceptance_criteria_changes`: requested changes, if any
- `readiness_assumptions`: assumptions the user explicitly accepts for planning
- `blocking_feedback`: blockers or unresolved concerns raised by the user
