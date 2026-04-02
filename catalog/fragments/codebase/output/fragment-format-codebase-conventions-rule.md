---
id: fragment-format-codebase-conventions-rule
type: output
name: Format Codebase Conventions Rule
version: 1.0
domain: codebase
---

# Fragment: Format Codebase Conventions Rule

## Format

The `rule-codebase-conventions.md` file must follow this structure:

```
---
id: rule-codebase-conventions
name: Codebase Conventions
type: codebase
version: 1.0
description: Enforces coding conventions for {project-name}
---
# Rule: Codebase Conventions

## Dos                      ← omit section if none specified

- Use {pattern}
- Use {pattern}

## Don'ts                   ← omit section if none specified

- Never use {anti-pattern}
- Never use {anti-pattern}

## Best Practices           ← omit section if none specified

- {practice}
- {practice}

## Conventions              ← omit section if none specified

- {convention}
```

## Template

Rules for the formatted output:

- Each bullet is one actionable statement — no multi-sentence bullets
- Omit any section entirely if the corresponding input was not provided by the user
- Dos and Don'ts sections use present-tense directives
- The description in frontmatter names the project so this rule is clearly project-scoped
- No framework concepts appear in this file — it is about the codebase only
