---
id: fragment-validate-memory-state
name: Validate Memory State
type: validation
version: 1.0
domain: all
---

# Fragment: Validate Memory State

Check that memory use matches the active contract and notebook boundaries.

## Checks

### Contract Alignment
- [ ] Does the active task or pipeline declare a memory contract?
- [ ] Are reads limited to the allowed scope?
- [ ] Are writes limited to the declared targets?

### Boundary Safety
- [ ] Do memory files avoid overriding canonical instructions or rules?
- [ ] Are contradictions surfaced explicitly instead of silently merged?
- [ ] Are unrelated domains excluded?

### State Quality
- [ ] Does `CURRENT.md` contain only active context?
- [ ] Are durable conclusions promoted when required?
- [ ] Are session notes treated as transitional unless promoted?

## Acceptance Criteria

- [ ] Memory reads and writes follow the declared scope
- [ ] No boundary violations are present
- [ ] `CURRENT.md` is operational rather than archival
- [ ] Durable information is promoted or clearly queued for promotion
