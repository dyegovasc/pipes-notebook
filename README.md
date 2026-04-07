# Pipes Notebook

A markdown-first instruction system for AI coding agents.

Pipes Notebook gives your AI agent a structured operating system: canonical instructions, composable pipelines, governing rules, and memory surfaces — all in plain markdown. No plugins, no vendor lock-in. Works with any agent that reads files.

**The core idea:** instead of re-explaining your project, conventions, and preferences every conversation, you define them once as structured markdown. Your agent always knows where to look — and you can build new workflows on top of that foundation whenever you need them.

## What It Does

- **ai-instructions/** — Canonical knowledge your agent always has access to
- **pipelines/** — Multi-phase workflows composed from reusable fragments
- **fragments/** — Atomic instruction blocks (context, instruction, validation, output, question)
- **rules/** — Always-active governance that shapes agent behavior without invocation
- **Assembly script** — Generates agent entrypoints (CLAUDE.md, AGENTS.md, copilot-instructions.md) from your instructions and rules, using delimiter-based merge that never overwrites your existing content

## Install

Copy this prompt into your AI agent (Claude, Copilot, or any agent that can read URLs):

```
Read https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/commands/init.md and execute it against this project.
```

The agent will:
1. Scaffold the `.pipes/` structure into your project
2. Ask whether this is a **notebook** (Obsidian vault) or **codebase** (software project)
3. Install the right ai-instructions and rules for your typology
4. Generate or merge agent entrypoints without touching your existing content

That's it. Your project now has a structured instruction layer your agent can operate from.

## Structure After Init

The pipes folder name depends on project type:

**Notebook (Obsidian vault)** — uses `pipes/` so the folder is visible inside Obsidian:
```
your-vault/
  pipes/
    ai-instructions/        ← canonical instructions (from catalog)
    utils/
      fragments/             ← atomic instruction blocks
      pipelines/             ← composable workflows
      rules/                 ← always-active governance
      scripts/
        assemble-instructions.js
  CLAUDE.md                  ← auto-generated entrypoint
  AGENTS.md                  ← auto-generated entrypoint
  .github/
    copilot-instructions.md  ← auto-generated entrypoint
```

**Codebase (software project)** — uses `.pipes/` following dotfolder convention:
```
your-project/
  .pipes/
    ai-instructions/
    utils/
      fragments/
      pipelines/
      rules/
      scripts/
        assemble-instructions.js
  CLAUDE.md
  AGENTS.md
  .github/
    copilot-instructions.md
```

## Import Pipelines

Once `.pipes/` is installed, add pipelines (and their fragment dependencies) from the catalog:

```
Read https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/commands/import.md and execute it against this project.
```

The agent will list available pipelines grouped by category and let you pick which ones to install. It resolves all fragment dependencies automatically and never overwrites files you've already customised.

## Build Your Own Pipelines

Importing from the catalog is just the starting point. The real power is building pipelines tailored to your project.

To create a pipeline, run the pre-installed `pipeline-create-pipeline` pipeline. It will guide you through the process and scaffold everything correctly — fragments, structure, and catalog registration included.

> The more pipelines you build, the more leverage you get — each one is a repeatable workflow your agent can execute reliably, without you explaining the steps each time.

## Updating Entrypoints

After editing ai-instructions or rules, regenerate your agent entrypoints:

```
Run the pipeline-regenerate-agent-entry-points pipeline from .pipes/utils/pipelines/
```

The assembly script replaces only the Pipes Notebook section (between `<!-- pipes-notebook:start -->` and `<!-- pipes-notebook:end -->` delimiters), leaving everything else untouched.

## Commands

| Command | Description |
|---------|-------------|
| [init](commands/init.md) | Install Pipes Notebook into a project |
| [import](commands/import.md) | Add pipelines and fragments from the catalog |

## License

MIT