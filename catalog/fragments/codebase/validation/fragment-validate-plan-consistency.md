---
id: fragment-validate-plan-consistency
name: Validate Plan Consistency
type: validation
version: 1.0
domain: codebase
---

# Fragment: Validate Plan Consistency

Validates that the generated implementation plan accurately reflects the current codebase state by identifying contradictions and providing concrete corrections.

## Instructions

1. **Read the generated plan** from `.pipes/plans/`
2. **Cross-reference against the codebase:**
   - Do the impacted files listed actually exist?
   - Do the referenced functions, modules, or APIs exist with the expected signatures?
   - Are the architecture patterns described consistent with what is in the codebase?
   - Are any dependencies listed that are not in the project?
3. **For each contradiction found, document:**
   - Location in the plan (section and line)
   - What the plan states
   - What the codebase shows
   - Severity: `low` (cosmetic) | `medium` (misleading) | `high` (would cause implementation failure)
   - Concrete correction
4. **Present findings** with a consistency score:
   - **Pass** — no high-severity contradictions found
   - **Review** — medium contradictions found; corrections recommended
   - **Fail** — high-severity contradictions found; plan must be updated before implementation

## Output
- `contradictions`: list of contradiction objects with location, plan_state, codebase_state, severity, and correction
- `consistency_score`: `pass` | `review` | `fail`
- `summary`: brief narrative of findings
