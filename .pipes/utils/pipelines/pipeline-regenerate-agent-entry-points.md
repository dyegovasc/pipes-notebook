---
id: pipeline-regenerate-agent-entry-points
name: Regenerate Agent Entry Points
description: Generates or updates agent entrypoint files with Pipes Notebook instructions using delimiter-based merge
domain: all
version: 1.0
---

# Pipeline: Regenerate Agent Entry Points

Generates the Pipes Notebook section and merges it into agent entrypoint files (CLAUDE.md, AGENTS.md, .github/copilot-instructions.md). Existing content outside the delimiters is preserved.

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

## Phases

### Phase 1: Validate Sources
**Objective:** Confirm that ai-instructions and rules exist in .pipes/ before generating

**Fragments:**
- `fragment-validate-pipes-sources`

**Instructions:**
1. Check that `.pipes/ai-instructions/` exists and contains at least one `.md` file
2. Check that `.pipes/utils/rules/` exists (may be empty)
3. List the files that will be included in the generated section
4. If ai-instructions is empty, stop and report the error

### Phase 2: Check Existing Entrypoints
**Objective:** Detect which entrypoint files already exist and their current state

**Fragments:**
- `fragment-check-entrypoint-state`

**Instructions:**
1. For each target (CLAUDE.md, AGENTS.md, .github/copilot-instructions.md):
   - Check if the file exists
   - If it exists, check if it contains Pipes Notebook delimiters
2. Present a summary to the user:
   - Files that will be created (new)
   - Files that will have their Pipes section replaced (has delimiters)
   - Files that will have a Pipes section appended (exists, no delimiters)
3. Ask the user to confirm before proceeding

### Phase 3: Run Assembly
**Objective:** Execute the assembly script to generate/merge entrypoints

**Fragments:**
- `fragment-run-assembly-script`

**Instructions:**
1. Execute `node .pipes/utils/scripts/assemble-instructions.js`
2. Capture and display the script output
3. If the script fails, report the error and stop

### Phase 4: Report Results
**Objective:** Confirm what was generated and suggest next steps

**Fragments:**
- `fragment-report-entrypoint-results`

**Instructions:**
1. List each entrypoint and what action was taken (created, replaced, appended)
2. If any files were appended (first-time merge into existing file), advise the user to review placement
3. Suggest committing the changes
