---
id: fragment-audit-plan-ambiguity
name: Audit Plan Ambiguity
type: validation
version: 1.0
domain: codebase
---

# Fragment: Audit Plan Ambiguity

Performs a final ambiguity audit after the plan has been written, separate from codebase consistency checking.

## Instructions

1. **Review the final plan and prior phase outputs**
2. **Identify unresolved ambiguity** that still affects:
   - scope
   - architecture
   - testing
   - rollout safety
   - recommendation validity
3. **Decide whether the ambiguity is acceptable**
   - `clear` — nothing important remains unresolved
   - `assumption_based` — the plan can proceed, but assumptions must be recorded
   - `blocking` — implementation should not proceed without clarification
4. **Record only minimal blocking questions** if the outcome is `blocking`
5. **Do not reopen broad design exploration** — this is an audit, not a new hypothesis phase

## Output

- `ambiguity_outcome`: `clear` | `assumption_based` | `blocking`
- `ambiguities`: list of unresolved ambiguous items
- `assumptions_to_record`: assumptions that should be carried with the plan
- `blocking_questions`: list of minimal blocking clarification questions, or `none`
