---
id: pipeline-define-writing-style
name: Define Writing Style
description: Captures writing preferences and generates a tailored writing style rule
domain: notebook
version: 1.0
category: compose
fragments:
  - fragment-ask-writing-preferences
  - fragment-check-existing-style-rule
  - fragment-reframe-intent
  - fragment-draft-writing-style-rule
  - fragment-format-writing-style-rule
  - fragment-request-approval
  - fragment-create-files
---

# Pipeline: Define Writing Style

Guides the user through capturing their writing preferences and generates a tailored `rule-writing-style.md` in `.pipes/utils/rules/`.

This pipeline replaces the pre-written `rule-human-editor`. The generated rule reflects the user's actual preferences rather than a generic default.

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

### Phase 1: Ask Writing Preferences
**Objective:** Gather the user's tone, banned words, banned patterns, and formatting constraints

**Fragments:**
- `fragment-ask-writing-preferences`

**Instructions:**
1. Present `fragment-ask-writing-preferences` to gather:
   - Desired tone
   - Banned words or phrases (with suggested defaults as starting point)
   - Banned structural or stylistic patterns
   - Formatting constraints
   - Domain exceptions (if any)
2. Allow multi-part answers
3. Do not pre-populate a rule with defaults the user did not confirm
4. Do not move to Phase 2 until tone and at least one constraint are captured

---

### Phase 2: Check Existing Rule
**Objective:** Detect whether a writing style rule already exists and set mode accordingly

**Fragments:**
- `fragment-check-existing-style-rule`

**Instructions:**
1. Check if `.pipes/utils/rules/rule-writing-style.md` exists
2. If it exists: read current content, set mode `update`, inform user
3. If it does not exist: set mode `create`, inform user
4. Do not modify anything — discovery only

---

### Phase 3: Reframe and Confirm
**Objective:** Confirm the agent understands the preferences before drafting

**Fragments:**
- `fragment-reframe-intent`

**Instructions:**
1. Summarize all captured preferences:
   - Tone
   - Banned words (list)
   - Banned patterns (list)
   - Formatting rules (list)
   - Domain exceptions (or "none")
   - Current mode (create or update)
2. Present a clear, concise summary
3. Ask for confirmation or corrections
4. Do not advance to Phase 4 until the user explicitly confirms

---

### Phase 4: Draft Rule
**Objective:** Generate the complete rule file content

**Fragments:**
- `fragment-draft-writing-style-rule`
- `fragment-format-writing-style-rule`

**Instructions:**
1. Use `fragment-draft-writing-style-rule` to compose the full rule from confirmed inputs
2. Use `fragment-format-writing-style-rule` as the structural template
3. Only include sections for preferences the user explicitly confirmed
4. In update mode: merge new preferences with existing content, preserving anything already correct
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
1. Write the approved content to `.pipes/utils/rules/rule-writing-style.md`
   - In create mode: create the file
   - In update mode: overwrite the existing file with merged content
2. Confirm the file was written successfully
3. Output the final file path
4. Remind the user this rule will be active in all future sessions for this project
5. Suggest running `pipeline-regenerate-agent-entry-points` to update entrypoints with the new rule in the Active Rules table
