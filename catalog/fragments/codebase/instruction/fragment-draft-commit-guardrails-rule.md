---
id: fragment-draft-commit-guardrails-rule
type: instruction
name: Draft Commit Guardrails Rule
version: 1.0
domain: codebase
---

# Fragment: Draft Commit Guardrails Rule

## Instructions

Using the confirmed inputs from the reframe phase, generate the full content of `rule-commit-guardrails.md`:

1. Open with frontmatter:
   ```yaml
   ---
   id: rule-commit-guardrails
   name: Commit Guardrails
   type: codebase
   version: 1.0
   description: Blocks commits containing secrets, sensitive files, or oversized artifacts for {project-name}
   ---
   ```
2. Write a `# Rule: Commit Guardrails` heading.
3. Write a brief intro: what this rule protects against.
4. Include a `## Blocked Patterns` section listing files and patterns that must never be committed. Derive these from the confirmed secret patterns and env conventions.
5. If a large file threshold was specified, include a `## File Size Limits` section.
6. Include a `## Existing Tooling` section noting any hooks or CI checks already in place (so the agent avoids duplicating what's already handled).
7. Include a `## Trigger Conditions` section: this rule runs before any `git commit`, `git push`, or file staging action.
8. In update mode: merge new requirements into existing content, preserving anything already correct.

## Output

Present the complete draft content — do not write to disk yet.
