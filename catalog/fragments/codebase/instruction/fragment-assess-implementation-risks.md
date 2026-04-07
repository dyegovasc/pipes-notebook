---
id: fragment-assess-implementation-risks
name: Assess Implementation Risks
type: instruction
version: 1.1
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
6. **Separate assumption-driven risk** — call out risks that exist mainly because the plan depends on explicit assumptions
7. **Separate blocking ambiguity** — identify ambiguity that is serious enough to stop implementation until resolved

## Output
- `risks`: list of risk objects with description, likelihood, impact, and mitigation
- `reversible`: `true` | `false`
- `blockers`: list of unknowns or unresolved dependencies
- `assumption_risks`: list of risks introduced by proceeding on assumptions
- `blocking_ambiguities`: list of ambiguities that would block safe implementation
