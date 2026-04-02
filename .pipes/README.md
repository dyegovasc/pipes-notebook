# Pipes Notebook — Quick Guide

You've just installed the Pipes Notebook system. Here's what was set up and how to use it.

---

## What Got Installed

```
.pipes/
  ai-instructions/        ← canonical instructions your agent always reads
  utils/
    fragments/             ← atomic instruction blocks (context, instruction, validation, output, question)
    pipelines/             ← composable multi-phase workflows
    rules/                 ← always-active governance (no invocation needed)
    scripts/
      assemble-instructions.js   ← generates agent entrypoints from canonical files
      import.js                  ← imports pipelines and fragments from the catalog
```

Depending on your typology (notebook or codebase), agent entrypoints were also created or updated:

- `CLAUDE.md` — for Claude Code
- `AGENTS.md` — for Codex
- `.github/copilot-instructions.md` — for GitHub Copilot

These are auto-generated thin wrappers. Do not hand-edit them; edit the canonical files in `ai-instructions/` instead.

---

## Running a Pipeline

Pipelines are the main way you interact with the system. To invoke one, tell your agent:

```
Run the pipeline-initiate-session pipeline from .pipes/utils/pipelines/
```

Or more casually:

```
Run pipeline-health-check
```

The agent reads the pipeline file, follows its phases in order, and asks you for input at each step. You do not need to manage fragments manually — pipelines reference them internally.

**Strict phase discipline applies:** the agent will not advance to the next phase until the current one is confirmed. If it skips ahead, remind it to follow the pipeline phases.

---

## Importing More Pipelines

The catalog at `github.com/dyegovasc/pipes-notebook` has additional pipelines and rules you can pull into your project at any time.

To browse and import:

```
Read https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/commands/import.md and execute it against this project.
```

The agent will present the full catalog (marking what you already have), let you pick what you want, and resolve all fragment dependencies automatically. It will never overwrite files you have already customised.

---

## Updating Agent Entrypoints

After editing `ai-instructions/` files or adding rules, regenerate your entrypoints so all agents stay in sync:

```
Run the pipeline-regenerate-agent-entry-points pipeline from .pipes/utils/pipelines/
```

Or directly:

```bash
node .pipes/utils/scripts/assemble-instructions.js
```

The script only replaces the Pipes Notebook section inside each entrypoint (between `<!-- pipes-notebook:start -->` and `<!-- pipes-notebook:end -->` delimiters). Everything else in those files is preserved.

---

## What You Can Safely Customise

| Path | Safe to edit? |
|------|--------------|
| `ai-instructions/*.md` | Yes — this is your canonical config |
| `utils/rules/*.md` | Yes — tune governance to your project |
| `utils/pipelines/*.md` | Yes — modify or extend any pipeline |
| `utils/fragments/**/*.md` | Yes — extend or add fragments |
| `CLAUDE.md`, `AGENTS.md`, `copilot-instructions.md` | **No** — re-generated on each assembly run. Put changes in `ai-instructions/` |
| `utils/scripts/*.js` | Not normally — these are system scripts |

---

## How Rules Work

Rules in `utils/rules/` apply automatically to every session — you never invoke them. If a rule governs how the agent writes (e.g. style), it is active the moment the agent reads the entrypoint.

To see which rules are active, check `utils/rules/` or look at the end of any entrypoint file where rules are appended.

---

## Pipelines Installed

Check `utils/pipelines/` for a list of installed pipelines. Each file has a frontmatter header with its `id`, `name`, and `description`. The `CATALOG.md` in `utils/fragments/` (if present) is an auto-generated index of all fragments and pipelines in the system.

---

## Getting Help

- Full documentation: `https://github.com/dyegovasc/pipes-notebook`
- Reference implementation: `Notebook-example/` (in the pipes-notebook repo)
- System architecture: `ai-instructions/architecture.md`
