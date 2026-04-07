---
id: fragment-establish-scope-guardrails
name: Establish Scope Guardrails
type: instruction
version: 1.0
domain: codebase
---

# Fragment: Establish Scope Guardrails

Defines explicit in-scope and out-of-scope boundaries and safety constraints for the feature implementation.

## Instructions

1. **Define in-scope boundaries** — based on captured requirements, list what this implementation will cover
2. **Define out-of-scope boundaries** — explicitly state what will not be addressed in this implementation
3. **Identify safety constraints** — flag any areas that must not be modified (e.g., auth flows, billing, public APIs)
4. **Present guardrails to user** — display in-scope, out-of-scope, and safety constraints clearly
5. **Do not proceed** until the user has reviewed the guardrails

## Output
- `in_scope`: list of covered concerns
- `out_of_scope`: list of explicitly excluded concerns
- `safety_constraints`: list of protected areas that must not be touched
