---
id: fragment-lint-feature-questions
name: Lint Feature Questions
type: validation
version: 1.0
domain: codebase
---

# Fragment: Lint Feature Questions

Validates whether a follow-up question is admissible before it is shown to the user during feature planning.

## Instructions

1. **Inspect the candidate question**
2. **Reject the question** if any of the following are true:
   - it asks where the feature should live before Context
   - it asks the user to design the architecture for the codebase
   - the repository could likely answer it
   - the model could make a reasonable default instead
3. **Allow the question** only if:
   - it is user-owned, or
   - it is a high-impact shared decision asked after Context and grounded in repo evidence
4. **If rejected, record the fix** — defer it to Context, convert it into an assumption, or rewrite it as an evidence-backed comparison for later

## Validation Checklist

- Is this about desired behavior, constraints, success criteria, or non-goals?
- Can the repository answer this better than the user?
- Is the answer necessary to proceed right now?
- Could the model make a reasonable default instead?
- If the question is repo-specific, has Context already happened?
- If the question remains necessary, is it grounded in concrete repo evidence?

## Output

- `question_status`: `allow` | `reject`
- `question_reason`: brief explanation
- `question_action`: `ask_now` | `defer_to_context` | `defer_to_design` | `make_assumption` | `rewrite`
