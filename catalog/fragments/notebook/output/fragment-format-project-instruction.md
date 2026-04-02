---
id: fragment-format-project-instruction
type: output
name: Format Project Instruction
version: 1.0
domain: notebook
---

# Fragment: Format Project Instruction

## Format

The `project.md` file must follow this structure exactly:

```
---
id: project
assembly: inline
---
# Project: {Descriptive Name}

{1–3 sentence summary}

## Domains

| Domain | Purpose |
|--------|---------|
| `domain-name` | One-line description |

## Workflow

{2–4 sentences describing day-to-day use}

## Integrations   ← omit if none

- Integration name — brief description
```

## Template

Rules for the formatted output:

- The frontmatter `assembly: inline` is required — the assembly script uses this to determine what to inline into entrypoints
- The heading must use `# Project:` as a prefix followed by a descriptive name (not just the folder name)
- The summary paragraph comes immediately after the heading, before any `##` sections
- The Domains table uses backtick-wrapped domain names for the first column
- The Workflow section is prose — not a list
- Integrations section is omitted entirely if no integrations were captured
- No Pipes framework concepts appear in this file
