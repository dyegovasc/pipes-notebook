---
id: pipeline-define-commit-guardrails
name: Define Commit Guardrails
description: Captures VCS and commit safety requirements and generates a tailored commit guardrails rule
domain: codebase
version: 1.0
category: compose
fragments:
  - fragment-ask-commit-preferences
  - fragment-check-existing-guardrails-rule
  - fragment-reframe-intent
  - fragment-draft-commit-guardrails-rule
  - fragment-format-commit-guardrails-rule
  - fragment-request-approval
  - fragment-create-files
---

# Pipeline: Define Commit Guardrails

Guides the user through capturing their VCS and commit safety requirements, then writes a persistent `rule-commit-guardrails.md` to `.pipes/utils/rules/`.

This pipeline replaces the pre-written `rule-git-commit-guardrails`. The generated rule is tailored to the actual stack rather than assuming Node.js defaults.

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
2. Do not draft the rule until Phase 4. Do not generate any rule content before Phase 3 is confirmed.
3. If a phase asks for confirmation, stop and wait for the user's response before advancing.
4. Only continue after the current phase has been confirmed or corrected.

## Phases

### Phase 1: Ask Commit Preferences
**Objective:** Gather VCS, package manager, secret patterns, file size limits, env conventions, and existing hooks

**Fragments:**
- `fragment-ask-commit-preferences`

**Instructions:**
1. Present `fragment-ask-commit-preferences` to gather:
   - VCS tool (confirm git or specify otherwise)
   - Package manager
   - Secret patterns relevant to this stack
   - Large file thresholds (if any)
   - Environment file conventions
   - Existing hooks or CI checks
2. Allow multi-part answers
3. Do not move to Phase 2 until VCS, package manager, and at least one blocked pattern are captured

---

### Phase 2: Check Existing Rule
**Objective:** Detect whether a commit guardrails rule already exists and set mode accordingly

**Fragments:**
- `fragment-check-existing-guardrails-rule`

**Instructions:**
1. Check if `.pipes/utils/rules/rule-commit-guardrails.md` exists
2. If it exists: read current content, set mode `update`, inform user
3. If it does not exist: set mode `create`, inform user
4. Do not modify anything — discovery only

---

### Phase 3: Reframe and Confirm
**Objective:** Confirm the agent understands all requirements before drafting

**Fragments:**
- `fragment-reframe-intent`

**Instructions:**
1. Summarize all captured information:
   - VCS and package manager
   - Blocked patterns and file types
   - File size limits (or "none")
   - Env file conventions
   - Existing tooling already in place
   - Current mode (create or update)
2. Present a clear, concise summary
3. Ask for confirmation or corrections
4. Do not advance to Phase 4 until the user explicitly confirms

---

### Phase 4: Draft Rule
**Objective:** Generate the complete rule file content

**Fragments:**
- `fragment-draft-commit-guardrails-rule`
- `fragment-format-commit-guardrails-rule`

**Instructions:**
1. Use `fragment-draft-commit-guardrails-rule` to compose the full rule from confirmed inputs
2. Use `fragment-format-commit-guardrails-rule` as the structural template
3. Only include patterns the user confirmed — do not add stack-generic defaults without confirmation
4. In update mode: merge new requirements with existing content, preserving anything already correct
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

### Phase 6: Write Rule File
**Objective:** Persist the approved rule to the project's `.pipes/utils/rules/`

**Fragments:**
- `fragment-create-files`

**Instructions:**
1. Write the approved content to `.pipes/utils/rules/rule-commit-guardrails.md`
   - In create mode: create the file
   - In update mode: overwrite the existing file with merged content
2. Confirm the file was written successfully
3. Output the final file path
4. Remind the user this rule will be active in all future sessions for this project
5. Suggest running `pipeline-regenerate-agent-entry-points` to update entrypoints with the new rule in the Active Rules table
