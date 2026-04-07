---
id: fragment-read-project-instruction
name: Read Project Instruction
type: instruction
version: 1.0
domain: codebase
---

# Fragment: Read Project Instruction

Reads `.pipes/ai-instructions/project.md` if it exists and extracts stack, architecture, and conventions as the baseline context for the current session.

## Instructions

1. **Check for `.pipes/ai-instructions/project.md`** in the current project root
2. **If found:**
   - Read the full content
   - Extract: project name, stack overview, architecture patterns, conventions
   - Set `project_instruction_found: true`
   - Summarise what was loaded:
     ```
     Project instruction found at .pipes/ai-instructions/project.md
     Stack: [extracted stack]
     Architecture: [extracted pattern]
     Conventions: [key conventions]
     ```
3. **If not found:**
   - Set `project_instruction_found: false`
   - Inform the user:
     ```
     No project.md found — will attempt stack rule fallback.
     ```

## Output
- `project_instruction_found`: `true` | `false`
- `stack_baseline`: extracted stack summary (if found), or `null`
- `architecture_baseline`: extracted architecture description (if found), or `null`
- `conventions_baseline`: extracted conventions (if found), or `null`
