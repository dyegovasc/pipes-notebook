---
id: fragment-present-memory-contract
name: Present Memory Contract
type: output
version: 1.0
domain: all
---

# Fragment: Present Memory Contract

Format the memory contract during pipeline design or review.

## Format
Present the contract as a compact checklist with explicit fields.

## Template
```markdown
## Memory Contract

- Mode: <mode>
- Scope: <scope>
- Reads:
  - <read target>
- Writes:
  - <write target>
- Compaction: <none|optional|required>
- Model Guidance: <strict|normal|adaptive>
```
