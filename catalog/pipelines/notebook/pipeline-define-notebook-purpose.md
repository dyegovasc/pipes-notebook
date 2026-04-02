---
id: pipeline-define-notebook-purpose
name: Define Notebook Purpose
description: Captures the notebook's purpose, domains, and workflow and generates a project identity ai-instruction
domain: notebook
version: 1.0
category: compose
fragments:
  - fragment-ask-notebook-purpose
  - fragment-check-existing-project-instruction
  - fragment-reframe-intent
  - fragment-draft-project-instruction
  - fragment-format-project-instruction
  - fragment-request-approval
  - fragment-create-files
---

# Pipeline: Define Notebook Purpose

Guides the user through capturing their notebook's purpose, domains, and workflow, then writes a persistent `ai-instructions/project.md` to `.pipes/ai-instructions/`.

This file is **project-specific** — it gives the agent the vault's identity before it reads any framework instructions. It is the first thing inlined into agent entrypoints when present.

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
2. Do not draft the instruction file until Phase 4. Do not generate any content before Phase 3 is confirmed.
3. If a phase asks for confirmation, stop and wait for the user's response before advancing.
4. Only continue after the current phase has been confirmed or corrected.

## Phases

### Phase 1: Ask Notebook Purpose
**Objective:** Gather the notebook's purpose, domains, workflow, and integrations

**Fragments:**
- `fragment-ask-notebook-purpose`

**Instructions:**
1. Present `fragment-ask-notebook-purpose` to gather:
   - Notebook purpose
   - Domains (names + one-line descriptions)
   - Primary workflow
   - External integrations (if any)
2. Wait for user response
3. Accept multi-part answers — the user may answer section by section
4. Do not move to Phase 2 until all four areas are covered

---

### Phase 2: Check Existing Instruction
**Objective:** Detect whether a project.md already exists and set mode accordingly

**Fragments:**
- `fragment-check-existing-project-instruction`

**Instructions:**
1. Check if `.pipes/ai-instructions/project.md` exists
2. If it exists: read current content, set mode `update`, inform user
3. If it does not exist: set mode `create`, inform user
4. Do not modify anything — discovery only

---

### Phase 3: Reframe and Confirm
**Objective:** Confirm the agent understands everything before generating the file

**Fragments:**
- `fragment-reframe-intent`

**Instructions:**
1. Summarize all captured information:
   - Notebook purpose
   - Domains and their descriptions
   - Workflow summary
   - Integrations (or "none")
   - Current mode (create or update)
2. Present a clear, concise summary
3. Ask for confirmation or corrections
4. Do not advance to Phase 4 until the user explicitly confirms

---

### Phase 4: Draft Instruction
**Objective:** Generate the complete project.md file content

**Fragments:**
- `fragment-draft-project-instruction`
- `fragment-format-project-instruction`

**Instructions:**
1. Use `fragment-draft-project-instruction` to compose the full file from confirmed inputs
2. Use `fragment-format-project-instruction` as the structural template
3. Populate all sections as appropriate (domains, workflow, integrations)
4. In update mode: merge new information with existing content, preserving anything already correct
5. Present the complete draft — do not write files yet

---

### Phase 5: Review and Approve
**Objective:** Get explicit user approval before writing to disk

**Fragments:**
- `fragment-request-approval`

**Instructions:**
1. Display the full draft in a readable format
2. Use `fragment-request-approval` to ask for one of:
   - **Approve** — write as-is
   - **Edit** — user provides changes, return to start of Phase 5
   - **Cancel** — discard and stop
3. Do not write any files until approved
4. If edits are requested, apply them and re-present before confirming again

---

### Phase 6: Write File
**Objective:** Persist the approved file to the project's `.pipes/ai-instructions/`

**Fragments:**
- `fragment-create-files`

**Instructions:**
1. Write the approved content to `.pipes/ai-instructions/project.md`
   - In create mode: create the file
   - In update mode: overwrite the existing file with merged content
2. Confirm the file was written successfully
3. Output the final file path
4. Remind the user that this file will be inlined first in all future agent entrypoints
5. Suggest running `pipeline-regenerate-agent-entry-points` to update entrypoints immediately
