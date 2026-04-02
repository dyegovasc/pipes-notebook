---
id: fragment-draft-writing-style-rule
type: instruction
name: Draft Writing Style Rule
version: 1.0
domain: notebook
---

# Fragment: Draft Writing Style Rule

## Instructions

Using the confirmed preferences from the reframe phase, generate the full content of `rule-writing-style.md`:

1. Open with frontmatter:
   ```yaml
   ---
   id: rule-writing-style
   name: Writing Style
   type: notebook
   version: 1.0
   description: Enforces {tone} tone and writing conventions for this notebook
   ---
   ```
2. Write a `# Rule: Writing Style` heading.
3. Write a brief intro: what this rule enforces and why.
4. Include a `## Tone` section describing the desired voice.
5. If banned words were specified, include a `## Banned Words` section as a bullet list.
6. If banned patterns were specified, include a `## Banned Patterns` section as a bullet list.
7. If formatting rules were specified, include a `## Formatting` section as a bullet list.
8. If domain exceptions were specified, include a `## Domain Exceptions` section describing per-domain overrides.
9. Include a `## Trigger Conditions` section stating this rule applies to all writing output in this notebook.
10. In update mode: merge new preferences into existing content, preserving anything already correct.

## Output

Present the complete draft content — do not write to disk yet.
