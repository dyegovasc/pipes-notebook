---
id: pipeline-define-codebase-stack
name: Define Codebase Stack
description: Captures project stack, conventions, and generates a project identity ai-instruction and a codebase conventions rule
domain: codebase
version: 1.1
category: compose
fragments:
  - fragment-ask-project-context
  - fragment-ask-stack-details
  - fragment-check-existing-stack-rule
  - fragment-reframe-intent
  - fragment-draft-project-instruction
  - fragment-draft-codebase-conventions-rule
  - fragment-format-project-instruction
  - fragment-format-codebase-conventions-rule
  - fragment-request-approval
  - fragment-create-files
---

# Pipeline: Define Codebase Stack

Guides the user through capturing their project's tech stack, architecture decisions, best practices, and coding conventions, then writes two persistent files:

- **`.pipes/ai-instructions/project.md`** (`assembly: inline`) — project identity, stack overview, and architecture description. First thing inlined into agent entrypoints.
- **`.pipes/utils/rules/rule-codebase-conventions.md`** — dos, don'ts, and enforced patterns. Active in every session.

This pipeline replaces the old `rule-codebase-stack.md` single-file output with a cleaner separation: identity goes in ai-instructions, enforcement goes in rules.

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
2. Do not draft the rule until Phase 5. Do not generate any rule content before Phase 4 is confirmed.
3. If a phase asks for confirmation, stop and wait for the user's response before advancing.
4. Only continue after the current phase has been confirmed or corrected.

## Phases

### Phase 1: Capture Project Context
**Objective:** Establish the foundational identity of the project

**Fragments:**
- `fragment-ask-project-context`

**Instructions:**
1. Present `fragment-ask-project-context` to gather:
   - Project name
   - Project type (web app, API, CLI, library, mobile, etc.)
   - Primary programming language and runtime
2. Wait for user response
3. Capture all three values before proceeding

---

### Phase 2: Gather Stack Details
**Objective:** Collect the full technical picture: stack, patterns, practices, dos, and don'ts

**Fragments:**
- `fragment-ask-stack-details`

**Instructions:**
1. Present `fragment-ask-stack-details` to gather:
   - Full tech stack (frameworks, key libraries, infrastructure tools)
   - Architecture patterns in use (monolith, microservices, event-driven, etc.)
   - Best practices the project enforces
   - Explicit dos (patterns to follow)
   - Explicit don'ts (patterns to avoid)
   - Any project-specific conventions not covered above
2. Allow multi-part or iterative responses — the user may answer section by section
3. Do not move to Phase 3 until all sections are covered

---

### Phase 3: Check Existing Files
**Objective:** Detect whether output files already exist and set mode accordingly

**Fragments:**
- `fragment-check-existing-stack-rule`

**Instructions:**
1. Check if `.pipes/ai-instructions/project.md` exists in the current project
2. Check if `.pipes/utils/rules/rule-codebase-conventions.md` exists in the current project
3. If either or both exist:
   - Read the current content of any found files
   - Inform the user: "Existing files found. Running in update mode."
   - Note which sections are present vs missing
   - Set mode: `update`
4. If neither exists:
   - Inform the user: "No existing files found. Running in create mode."
   - Set mode: `create`
5. Do not modify anything in this phase — discovery only

---

### Phase 4: Reframe and Confirm
**Objective:** Confirm the agent understands everything before generating the rule

**Fragments:**
- `fragment-reframe-intent`

**Instructions:**
1. Summarize all captured information:
   - Project name, type, language/runtime
   - Tech stack and architecture
   - Best practices, dos, and don'ts
   - Current mode (create or update)
2. Present a clear, concise summary to the user
3. Ask for confirmation or corrections
4. Do not advance to Phase 5 until the user explicitly confirms

---

### Phase 5: Draft Files
**Objective:** Generate both output files

**Fragments:**
- `fragment-draft-project-instruction`
- `fragment-draft-codebase-conventions-rule`
- `fragment-format-project-instruction`
- `fragment-format-codebase-conventions-rule`

**Instructions:**
1. Use `fragment-draft-project-instruction` + `fragment-format-project-instruction` to compose `project.md`:
   - Frontmatter: `id: project`, `assembly: inline`
   - Heading: `# Project: {project name}`
   - Summary: 1–3 sentences describing what the project is
   - `## Stack` table: layer → technology
   - `## Architecture` section: how it's structured
2. Use `fragment-draft-codebase-conventions-rule` + `fragment-format-codebase-conventions-rule` to compose `rule-codebase-conventions.md`:
   - Frontmatter with `id`, `name`, `type: codebase`, `version`, `description`
   - `## Dos` section
   - `## Don'ts` section
   - `## Best Practices` section (if captured)
   - `## Conventions` section (if any project-specific ones)
3. In update mode: merge new information with existing content, preserving anything already correct
4. Present both complete drafts side by side — do not write files yet

---

### Phase 6: Review and Approve
**Objective:** Get explicit user approval before writing to disk

**Fragments:**
- `fragment-request-approval`

**Instructions:**
1. Display the full draft in a readable format
2. Use `fragment-request-approval` to ask for one of:
   - **Approve** — write as-is
   - **Edit** — user provides changes, return to start of Phase 6
   - **Cancel** — discard and stop
3. Do not write any files until approved
4. If edits are requested, apply them and re-present before confirming again

---

### Phase 7: Write Files
**Objective:** Persist both approved files to the project

**Fragments:**
- `fragment-create-files`

**Instructions:**
1. Write `project.md` to `.pipes/ai-instructions/project.md`
   - In create mode: create the file
   - In update mode: overwrite with merged content
2. Write `rule-codebase-conventions.md` to `.pipes/utils/rules/rule-codebase-conventions.md`
   - In create mode: create the file
   - In update mode: overwrite with merged content
3. Confirm both files were written successfully
4. Output both final file paths
5. Remind the user that `project.md` will be inlined first in all future agent entrypoints, and `rule-codebase-conventions` will be active in all future sessions
6. Suggest running `pipeline-regenerate-agent-entry-points` to update entrypoints immediately
