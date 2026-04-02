---
id: fragment-draft-project-instruction
type: instruction
name: Draft Project Instruction
version: 1.0
domain: notebook
---

# Fragment: Draft Project Instruction

## Instructions

Using the confirmed inputs from the reframe phase, generate the full content of `project.md`:

1. Open with frontmatter:
   ```yaml
   ---
   id: project
   assembly: inline
   ---
   ```
2. Write a `# Project: {name}` heading using a descriptive name derived from the notebook purpose.
3. Write a 1–3 sentence summary of what this notebook is for and how it is organized.
4. If domains were provided, include a `## Domains` section with a table:
   | Domain | Purpose |
   |--------|---------|
   | `domain-name` | One-line description |
5. If a workflow was described, include a `## Workflow` section summarizing the day-to-day process in 2–4 sentences.
6. If external integrations were listed, include a `## Integrations` section as a bullet list.
7. Do not include pipe framework concepts — this file is about the project, not the system.
8. In update mode: preserve any existing sections the user did not change. Merge new information into the existing structure.

## Output

Present the complete draft content — do not write to disk yet.
