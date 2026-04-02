---
id: fragment-check-existing-guardrails-rule
type: instruction
name: Check Existing Guardrails Rule
version: 1.0
domain: codebase
---

# Fragment: Check Existing Guardrails Rule

## Instructions

1. Check if `.pipes/utils/rules/rule-commit-guardrails.md` exists in the current project.
2. If it **exists**:
   - Read its current content.
   - Inform the user: "A commit guardrails rule already exists. Running in update mode."
   - Note which checks are already covered.
   - Set mode: `update`
3. If it **does not exist**:
   - Inform the user: "No commit guardrails rule found. Running in create mode."
   - Set mode: `create`
4. Do not modify anything in this phase — discovery only.

## Output

Report:
- File path checked: `.pipes/utils/rules/rule-commit-guardrails.md`
- Exists: yes / no
- Mode: `create` | `update`
- If update mode: summary of currently captured checks (VCS, blocked patterns, existing hooks)
