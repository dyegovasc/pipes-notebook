---
id: fragment-analyze-codebase-context
name: Analyze Codebase Context
type: instruction
version: 1.0
domain: codebase
---

# Fragment: Analyze Codebase Context

Scans the codebase to understand its structure and identify modules relevant to the feature being planned.

## Instructions

1. **Read directory structure** — list top-level and second-level directories to understand project layout
2. **Identify entry points** — locate main application entry files
3. **Find relevant modules** — based on the feature description, identify directories and files likely to be involved
4. **Note patterns** — observe naming conventions, file organisation, and any consistent patterns
5. **Complement the baseline** — if `stack_baseline` from `fragment-read-project-instruction` exists, use it to guide where to look; do not re-ask what is already known
6. **Summarise findings** — present a concise overview of what is relevant to this feature

## Output
- `codebase_structure`: top-level directory overview
- `relevant_modules`: list of files/directories relevant to the feature
- `observed_patterns`: naming conventions and organisation patterns noted
