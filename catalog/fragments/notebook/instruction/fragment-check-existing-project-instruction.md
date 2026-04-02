---
id: fragment-check-existing-project-instruction
type: instruction
name: Check Existing Project Instruction
version: 1.0
domain: notebook
---

# Fragment: Check Existing Project Instruction

## Instructions

1. Check if `.pipes/ai-instructions/project.md` exists in the current project.
2. If it **exists**:
   - Read its current content.
   - Inform the user: "A project identity file already exists. Running in update mode."
   - Note which sections are present and which are missing or outdated.
   - Set mode: `update`
3. If it **does not exist**:
   - Inform the user: "No project identity file found. Running in create mode."
   - Set mode: `create`
4. Do not modify anything in this phase — discovery only.

## Output

Report:
- File path checked: `.pipes/ai-instructions/project.md`
- Exists: yes / no
- Mode: `create` | `update`
- If update mode: summary of current content (title, domains listed, workflow described)
