---
id: pipeline-create-pipeline
name: Create Pipeline
description: Guides user through creating a new pipeline with phases and fragments
domain: all
version: 1.0
---

# Pipeline: Create Pipeline

Guides the user through designing and creating a new pipeline from scratch.

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
2. Do not draft, summarize, or plan later phases before the current phase is shown to the user.
3. If a phase asks for confirmation, stop and wait for the user's response before moving on.
4. Only continue after the current phase has been confirmed or corrected.

## Phases

### Phase 1: Capture Intent
**Objective:** Understand what the user wants the pipeline to accomplish

**Fragments:**
- `fragment-ask-pipeline-intent`

**Instructions:**
1. Ask user what they want the pipeline to do
2. Capture the high-level goal
3. Note any specific requirements or constraints
4. Do not infer later phases yet

### Phase 2: Reframe Intention
**Objective:** Confirm and clarify understanding of the goal

**Fragments:**
- `fragment-reframe-intent`

**Instructions:**
1. Restate the user's goal in clear terms
2. Ask for confirmation or correction
3. Wait for explicit confirmation before moving to Phase 3
4. Refine until understanding is aligned

### Phase 3: Define Phases
**Objective:** Break down the pipeline into ordered phases

**Fragments:**
- `fragment-define-phases`

**Instructions:**
1. Ask user to suggest phases or suggest logical phases based on intent
2. Define the objective for each phase
3. Determine what each phase should accomplish
4. Present the full phase list to the user
5. Confirm phase order makes sense before proceeding

### Phase 4: Define Memory Contract
**Objective:** Decide whether the new pipeline needs memory support

**Fragments:**
- `fragment-ask-memory-contract`
- `fragment-present-memory-contract`

**Instructions:**
1. Ask whether the pipeline needs memory support
2. Capture mode, scope, read targets, write targets, compaction, and model guidance
3. Present the proposed memory contract clearly
4. Confirm it before moving on
5. If no memory support is needed, record `Mode: none` and `Scope: none`

### Phase 5: Identify Fragments
**Objective:** Maximize reuse of existing fragments, then create only necessary new ones

**Fragments:**
- `fragment-identify-fragments`
- `fragment-validate-reuse-opportunities`

**Instructions:**
1. **Review the catalog** — Reference `utils/fragments/CATALOG.md` for all available fragments by type
2. **For each phase**, ask: which existing fragments fit this phase's objective?
3. **Document reuse decisions** — List which fragments will be reused and why
4. **Identify genuine gaps** — Only then ask what new fragments are needed
5. **Create new fragments** — For each new fragment, get id, name, type, and description
6. **Validate for reuse** — Check that new fragments don't duplicate existing functionality
7. **Present final fragment list** — Show reused + new fragments with full mapping
8. Do not move to structure consolidation until the user has seen the fragment mapping

### Phase 6: Consolidate Structure
**Objective:** Present the complete pipeline definition

**Fragments:**
- `fragment-consolidate-structure`

**Instructions:**
1. Generate complete pipeline definition with all phases
2. Include a `## Memory Contract` section in the pipeline definition
3. Generate all new fragment definitions
4. Display full structure in proper format
5. Do not create files yet

### Phase 7: Request Approval
**Objective:** Get user approval before creating files

**Fragments:**
- `fragment-request-approval`

**Instructions:**
1. Show summary of files to be created
2. Ask for approval to proceed
3. Wait for explicit approval before proceeding
4. If approved, proceed to Phase 8
5. If changes needed, return to appropriate phase

### Phase 8: Create Files
**Objective:** Create all pipeline and fragment files

**Fragments:**
- `fragment-create-files`

**Instructions:**
1. Create pipeline file at `utils/pipelines/pipeline-{id}.md`
2. Create each new fragment file at `utils/fragments/{type}/fragment-{id}.md`
3. Confirm files created successfully
4. Show final structure to user
