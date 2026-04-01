---
id: rule-memory-boundaries
name: Memory Boundaries
type: universal
version: 1.0
---

# Rule: Memory Boundaries

Constrains how `MEMORY.md` and `CURRENT.md` may be read, written, and interpreted.

## Trigger Conditions

This rule runs when:
1. A pipeline declares a `## Memory Contract`
2. A task reads `MEMORY.md` or `CURRENT.md`
3. A task writes `MEMORY.md`, `CURRENT.md`, or a session note intended for compaction

## Boundaries

1. `MEMORY.md` is curated, scoped, and repeatedly useful context.
2. `CURRENT.md` is active, temporary, and operational.
3. Memory files cannot override canonical instructions, universal rules, or explicit user intent.
4. Read or write memory only within the declared pipeline scope, or within an explicitly adopted non-pipeline memory contract.
5. Read project memory before domain memory when both are in scope.
6. Surface contradictions between memory files and canonical instructions explicitly; do not silently merge them.
7. Promote durable conclusions out of `CURRENT.md` into `MEMORY.md` or proper notes when the contract requires it.
8. Do not read unrelated domains.

## Output Format

When the rule blocks or flags memory behavior, report:

```markdown
Memory Boundary Check

- Scope: <scope>
- Status: blocked | warning
- Reason: <why>
- Required Action: <next step>
```
