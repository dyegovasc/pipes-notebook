---
id: fragment-assess-implementation-risks
name: Assess Implementation Risks
type: instruction
version: 1.0
domain: codebase
---

# Fragment: Assess Implementation Risks

Identifies implementation risks, regressions, and mitigations before any code is written.

## Instructions

1. **List implementation risks** — what could go wrong during implementation?
2. **List regression risks** — which existing behaviours could break?
3. **For each risk, document:**
   - Risk description
   - Likelihood: low / medium / high
   - Impact: low / medium / high
   - Mitigation strategy
4. **Identify reversibility** — can this change be rolled back easily? If not, flag it
5. **Flag blockers** — any unknowns or dependencies that must be resolved before implementation begins

## Output
- `risks`: list of risk objects with description, likelihood, impact, and mitigation
- `reversible`: `true` | `false`
- `blockers`: list of unknowns or unresolved dependencies
