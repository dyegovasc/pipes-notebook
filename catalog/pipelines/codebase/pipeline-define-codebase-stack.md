---
id: pipeline-define-codebase-stack
name: Define Codebase Stack Rule
description: Captures project stack, best practices, and conventions and writes an on-demand rule to .pipes/utils/rules/
domain: codebase
version: 1.0
category: compose
fragments:
  - fragment-ask-project-context
  - fragment-ask-stack-details
  - fragment-check-existing-stack-rule
  - fragment-reframe-intent
  - fragment-draft-stack-rule
  - fragment-format-stack-rule
  - fragment-request-approval
  - fragment-create-files
---

# Pipeline: Define Codebase Stack Rule

Guides the user through capturing their project's tech stack, architecture decisions, best practices, and coding conventions, then writes a persistent `rule-codebase-stack.md` to `.pipes/utils/rules/`.

This rule is **on-demand** — it lives in the project's own `.pipes/`, not in the catalog. It defines the project-specific truth for AI agents working in that codebase.

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

### Phase 3: Check Existing Rule
**Objective:** Detect whether a stack rule already exists and set mode accordingly

**Fragments:**
- `fragment-check-existing-stack-rule`

**Instructions:**
1. Check if `.pipes/utils/rules/rule-codebase-stack.md` exists in the current project
2. If it exists:
   - Read the current content
   - Inform the user: "A stack rule already exists. Running in update mode."
   - Note which sections are present vs missing
   - Set mode: `update`
3. If it does not exist:
   - Inform the user: "No stack rule found. Running in create mode."
   - Set mode: `create`
4. Do not modify anything in this phase — discovery only

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

### Phase 5: Draft Rule
**Objective:** Generate the complete rule file content

**Fragments:**
- `fragment-draft-stack-rule`
- `fragment-format-stack-rule`

**Instructions:**
1. Use `fragment-draft-stack-rule` to compose the full rule from confirmed inputs
2. Use `fragment-format-stack-rule` as the structural template
3. Populate all sections:
   - Frontmatter (`id`, `name`, `type`, `version`)
   - Stack overview table
   - Architecture section
   - Best practices list
   - Dos section
   - Don'ts section
   - Project conventions
4. In update mode: merge new information with existing content, preserving anything already correct
5. Present the complete draft — do not write files yet

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

### Phase 7: Write Rule File
**Objective:** Persist the approved rule to the project's `.pipes/utils/rules/`

**Fragments:**
- `fragment-create-files`

**Instructions:**
1. Write the approved content to `.pipes/utils/rules/rule-codebase-stack.md`
   - In create mode: create the file
   - In update mode: overwrite the existing file with merged content
2. Confirm the file was written successfully
3. Output the final file path
4. Remind the user that this rule will be active in all future sessions for this project
