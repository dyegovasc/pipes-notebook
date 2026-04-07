---
id: fragment-select-solution
name: Select Solution
type: instruction
version: 1.0
domain: codebase
---

# Fragment: Select Solution

Evaluates generated solution hypotheses and selects the optimal approach based on fit, risk, and maintainability.

## Instructions

1. **Score each hypothesis** against:
   - Requirement fit (does it satisfy all success criteria?)
   - Implementation complexity (how hard is it to build?)
   - Maintainability (how easy is it to maintain long-term?)
   - Risk (what could go wrong?)
   - Alignment with existing patterns (does it fit the codebase?)
2. **Identify the recommended solution** — explain clearly why it scores best
3. **Present the recommendation** to the user with a brief rationale
4. **Allow the user to override** the recommendation if they prefer a different hypothesis

## Output
- `selected_hypothesis`: name and summary of chosen approach
- `selection_rationale`: why this approach was selected over others
- `user_override`: `true` | `false`
