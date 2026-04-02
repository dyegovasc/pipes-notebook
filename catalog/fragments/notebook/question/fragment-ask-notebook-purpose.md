---
id: fragment-ask-notebook-purpose
type: question
name: Ask Notebook Purpose
version: 1.0
domain: notebook
---

# Fragment: Ask Notebook Purpose

## Question

What is this notebook for? Help the agent understand the vault so it can generate a useful project identity file.

Please answer the following:

1. **Purpose** — What is the primary purpose of this notebook? (e.g. personal knowledge management, team wiki, research notes, project planning, writing projects)
2. **Domains** — What domains or areas does it cover? List the main ones (e.g. work, side-projects, learning, writing). For each, give a short one-line description of what lives there.
3. **Primary workflow** — How do you typically use this notebook day-to-day? (e.g. capture fleeting notes, process weekly, write long-form, track tasks)
4. **External integrations** — Are there any tools integrated with this vault? (e.g. Obsidian plugins, sync services, publish setups, calendar, task manager)

## Capture

Record the following from the user's response:

- `notebook_purpose`: short description of why this notebook exists
- `domains`: list of domain names with one-line descriptions
- `workflow`: how the user works with the notebook day-to-day
- `integrations`: external tools or plugins in use (empty list if none)

## Options

- personal_km: "Personal knowledge management"
- team_wiki: "Team or project wiki"
- research: "Research and study notes"
- project_planning: "Project planning and tracking"
- writing: "Writing projects and long-form content"
- mixed: "Multiple purposes"

## Guidelines

- Accept freeform answers — the options above are prompts, not constraints
- If the user describes multiple purposes, capture them all
- Domains may be top-level folder names or conceptual areas — either is valid
- If the user is unsure about integrations, record as empty
