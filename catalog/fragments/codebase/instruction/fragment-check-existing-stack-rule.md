---
id: fragment-check-existing-stack-rule
name: Check Existing Stack Rule
type: instruction
version: 1.0
domain: codebase
---

# Fragment: Check Existing Stack Rule

Detects whether a `rule-codebase-stack.md` already exists in the project's `.pipes/utils/rules/` and sets the pipeline operating mode accordingly.

## Instructions

1. **Check for existing rule:**
   - Look for `.pipes/utils/rules/rule-codebase-stack.md` in the current project root
   - Do not confuse this with catalog rules — the target is the project-local `.pipes/` directory

2. **If the file exists (`update` mode):**
   - Read the full content of the file
   - Identify which sections are present: Stack Overview, Architecture, Best Practices, Dos, Don'ts, Conventions
   - Note which sections are missing or thin
   - Set `mode = update`
   - Inform the user:
     ```
     Stack rule found at .pipes/utils/rules/rule-codebase-stack.md
     Mode: update

     Current sections:
     - [present] Stack Overview
     - [present] Architecture
     - [missing] Best Practices
     - [present] Dos
     - [present] Don'ts
     - [missing] Conventions
     ```

3. **If the file does not exist (`create` mode):**
   - Set `mode = create`
   - Inform the user:
     ```
     No stack rule found.
     Mode: create — a new rule-codebase-stack.md will be written.
     ```

4. **Do not modify anything in this phase** — this is discovery only.

## Inputs

- Project root path (current working directory)

## Output

- `mode`: `create` | `update`
- `existing_content`: full text of the existing rule (if update mode), or `null`
- `present_sections`: list of section names found (if update mode), or empty list
- `missing_sections`: list of section names absent (if update mode), or all sections
