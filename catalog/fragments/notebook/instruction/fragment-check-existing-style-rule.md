---
id: fragment-check-existing-style-rule
type: instruction
name: Check Existing Style Rule
version: 1.0
domain: notebook
---

# Fragment: Check Existing Style Rule

## Instructions

1. Check if `.pipes/utils/rules/rule-writing-style.md` exists in the current project.
2. If it **exists**:
   - Read its current content.
   - Inform the user: "A writing style rule already exists. Running in update mode."
   - Note which preferences are already captured.
   - Set mode: `update`
3. If it **does not exist**:
   - Inform the user: "No writing style rule found. Running in create mode."
   - Set mode: `create`
4. Do not modify anything in this phase — discovery only.

## Output

Report:
- File path checked: `.pipes/utils/rules/rule-writing-style.md`
- Exists: yes / no
- Mode: `create` | `update`
- If update mode: brief summary of currently captured preferences (tone, key banned words/patterns)
