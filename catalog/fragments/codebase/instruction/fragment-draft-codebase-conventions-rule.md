---
id: fragment-draft-codebase-conventions-rule
type: instruction
name: Draft Codebase Conventions Rule
version: 1.0
domain: codebase
---

# Fragment: Draft Codebase Conventions Rule

## Instructions

Using the confirmed inputs from the reframe phase, generate the full content of `rule-codebase-conventions.md`:

1. Open with frontmatter:
   ```yaml
   ---
   id: rule-codebase-conventions
   name: Codebase Conventions
   type: codebase
   version: 1.0
   description: Enforces coding conventions for {project-name}
   ---
   ```
2. Write a `# Rule: Codebase Conventions` heading.
3. If dos were specified, include a `## Dos` section as a bullet list of patterns to follow.
4. If don'ts were specified, include a `## Don'ts` section as a bullet list of patterns to avoid.
5. If best practices were specified, include a `## Best Practices` section.
6. If project-specific conventions were specified that don't fit above, include a `## Conventions` section.
7. Keep each item concise — one actionable statement per bullet.
8. In update mode: merge new conventions into existing content, preserving anything already correct.

## Output

Present the complete draft content — do not write to disk yet.
