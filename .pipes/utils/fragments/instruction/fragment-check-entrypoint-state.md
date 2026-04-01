---
id: fragment-check-entrypoint-state
name: Check Entrypoint State
type: instruction
version: 1.0
domain: all
---

# Fragment: Check Entrypoint State

Detects the current state of each agent entrypoint file before assembly.

## Instructions

1. For each entrypoint target (`CLAUDE.md`, `AGENTS.md`, `.github/copilot-instructions.md`):
   - Check if the file exists at the project root
   - If it exists, read the file and search for the delimiters:
     - `<!-- pipes-notebook:start -->`
     - `<!-- pipes-notebook:end -->`
   - Classify the state as one of:
     - **missing**: file does not exist (will be created)
     - **has-delimiters**: file exists and contains both delimiters (section will be replaced)
     - **no-delimiters**: file exists but has no delimiters (section will be appended)

2. Present the summary to the user before proceeding

## Output

```
Entrypoint Status
=================

| File                            | Status         | Action            |
|---------------------------------|----------------|-------------------|
| CLAUDE.md                       | <status>       | <action>          |
| AGENTS.md                       | <status>       | <action>          |
| .github/copilot-instructions.md | <status>       | <action>          |
```

Where action is: "will be created" | "section will be replaced" | "section will be appended"
