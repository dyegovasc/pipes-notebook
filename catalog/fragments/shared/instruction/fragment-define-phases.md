---
id: fragment-define-phases
name: Define Phases
type: instruction
version: 1.0
domain: all
---

# Fragment: Define Phases

Breaks down the pipeline into ordered phases.

## Instructions

1. **Explain phase concept:** A phase represents a distinct step in the workflow

2. **Present typical phases:**
   - **Gather** — Collect input or information
   - **Process** — Transform or analyze input
   - **Validate** — Check correctness
   - **Format** — Prepare output
   - **Confirm** — Get user approval
   - **Execute** — Perform the final action
   - **Report** — Present results

3. **Ask guiding questions:**
   - What are the main steps to accomplish this goal?
   - Are there any decision points or branches?
   - Do you need user confirmation at any step?
   - What is the final output?

4. **Define phase structure for each:**
   - A clear name
   - A single objective
   - A set of fragments (reuse existing or create new)

## Inputs

- User's pipeline intent and goal
- Any constraints or requirements mentioned

## Output
List of phases in order:
```
Phase 1: [Name] — [Objective]
Phase 2: [Name] — [Objective]
...
```
