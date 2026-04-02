---
id: pipeline-initiate-session
name: Initiate Session
description: Sets the focus for an interaction by capturing domain, folder, and high-level goal
domain: all
version: 1.0
category: context
fragments:
  - fragment-ask-domain
  - fragment-deliver-question-with-options
  - fragment-ask-folder
  - fragment-read-memory-context
  - fragment-validate-memory-state
  - fragment-ask-session-goal
  - fragment-reframe-intent
  - fragment-present-session-context
  - fragment-confirm-content
---

# Pipeline: Initiate Session

Establishes session context by asking for domain, folder, and goal.

## Memory Contract

Mode: read
Scope: project
Reads:
- `CURRENT.md`
- `MEMORY.md`

Writes:
- none

Compaction:
- none

Model Guidance:
- strict

## Phases

### Phase 1: Ask Domain
**Objective:** Identify the working domain

**Fragments:**
- `fragment-ask-domain`
- `fragment-deliver-question-with-options`

**Instructions:**
1. Use `fragment-deliver-question-with-options` to present `fragment-ask-domain`
2. Wait for user response
3. Capture the selected domain key

### Phase 2: Ask Folder
**Objective:** Identify the specific folder within the domain

**Fragments:**
- `fragment-ask-folder`

**Instructions:**
1. Present the question about which folder to work in
2. Wait for user response
3. Capture the folder path

### Phase 3: Read Memory Context
**Objective:** Load scoped memory when relevant files exist

**Fragments:**
- `fragment-read-memory-context`
- `fragment-validate-memory-state`

**Instructions:**
1. Detect whether project-scoped or domain-scoped `MEMORY.md` and `CURRENT.md` files exist
2. Read project memory before domain memory when both are in scope
3. Summarize only context relevant to the session setup
4. Surface any conflicts between memory files and canonical instructions
5. Continue even if no memory files exist

### Phase 4: Ask Session Goal
**Objective:** Capture the high-level goal for the session

**Fragments:**
- `fragment-ask-session-goal`

**Instructions:**
1. Present the question about the session goal
2. Wait for user response
3. Capture the goal description

### Phase 5: Reframe Intent
**Objective:** Confirm understanding of captured information

**Fragments:**
- `fragment-reframe-intent`
- `fragment-deliver-question-with-options`

**Instructions:**
1. Restate the captured domain, folder, goal, and relevant memory context
2. Use `fragment-deliver-question-with-options` to present `fragment-reframe-intent`
3. If adjustments needed, return to Phase 1

### Phase 6: Present Session Context
**Objective:** Display the established session context

**Fragments:**
- `fragment-present-session-context`

**Instructions:**
1. Format and display domain, folder, goal, and memory summary
2. Set the stage for the session

### Phase 7: Confirm Content
**Objective:** Validate the session context is correct

**Fragments:**
- `fragment-confirm-content`
- `fragment-deliver-question-with-options`

**Instructions:**
1. Ask user to confirm the context is correct
2. Use `fragment-deliver-question-with-options` to present `fragment-confirm-content`
3. If confirmed, pipeline is complete
4. If changes needed, return to appropriate phase
