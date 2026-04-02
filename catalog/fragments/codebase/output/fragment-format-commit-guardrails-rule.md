---
id: fragment-format-commit-guardrails-rule
type: output
name: Format Commit Guardrails Rule
version: 1.0
domain: codebase
---

# Fragment: Format Commit Guardrails Rule

## Format

The `rule-commit-guardrails.md` file must follow this structure:

```
---
id: rule-commit-guardrails
name: Commit Guardrails
type: codebase
version: 1.0
description: {one-line summary of what this rule blocks}
---
# Rule: Commit Guardrails

{Brief intro — what commits this rule prevents}

## Blocked Patterns

- `.env` and `.env.*` files (except `.env.example`)
- Files matching: {patterns from user input}
- Directories: node_modules/, vendor/, .cache/, dist/   ← adjust to stack

## File Size Limits         ← omit section if no threshold specified

- No single file over {threshold}

## Existing Tooling         ← always include, even if empty

- {tool name}: {what it already covers}
- (none configured)

## Trigger Conditions

This rule runs when the agent is asked to commit, stage, or push files.
```

## Template

Rules for the formatted output:

- Frontmatter `description` summarises what is blocked in one line
- `Blocked Patterns` uses the exact file patterns the user confirmed — do not add patterns from generic Node.js defaults unless the user confirmed them
- `Existing Tooling` section is always present: it explicitly notes what's already handled so the agent doesn't duplicate it
- `File Size Limits` section is omitted if no threshold was specified
- Blocked patterns must be stack-appropriate based on the user's package manager and stack
