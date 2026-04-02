---
id: fragment-read-memory-context
name: Read Memory Context
type: instruction
version: 1.0
domain: all
---

# Fragment: Read Memory Context

Read scoped memory files according to the active memory contract.

## Instructions

1. Identify the declared memory scope: `domain`, `project`, or `session`.
2. Resolve only the memory files allowed by the contract.
3. If both project and domain memory exist, read project memory first and use it as the operational source on conflicts.
4. Read domain memory as fallback context when the contract allows it.
5. Never read unrelated domains.
6. Summarize only the parts relevant to the active pipeline or task.
7. If contradictions appear between memory and canonical instructions, surface them explicitly and stop short of silent merging.

## Inputs

- Active memory contract
- Domain path
- Optional project path

## Output
Structured memory summary:
```markdown
Memory Summary

- Scope: <scope>
- Files Read:
  - <path>
- Active Context:
  - <key point>
- Conflicts:
  - <none or issue>
```
