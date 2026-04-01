# Pipes Notebook

A markdown-first instruction system for AI coding agents.

Pipes Notebook gives your AI agent a structured operating system: canonical instructions, composable pipelines, governing rules, and memory surfaces — all in plain markdown. No plugins, no vendor lock-in. Works with any agent that reads files.

## What It Does

- **ai-instructions/** — Canonical knowledge your agent always has access to
- **pipelines/** — Multi-phase workflows composed from reusable fragments
- **fragments/** — Atomic instruction blocks (context, instruction, validation, output, question)
- **rules/** — Always-active governance that shapes agent behavior without invocation
- **Assembly script** — Generates agent entrypoints (CLAUDE.md, AGENTS.md, copilot-instructions.md) from your instructions and rules, using delimiter-based merge that never overwrites your existing content

## Install

Copy this prompt into your AI agent (Claude, Copilot, or any agent that can read URLs):

```
Read https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/commands/init.md and execute it against this project. Use https://github.com/dyegovasc/pipes-notebook as the source repository.
```

The agent will:
1. Scaffold the `.pipes/` structure into your project
2. Ask whether this is a **notebook** (Obsidian vault) or **codebase** (software project)
3. Install the right ai-instructions and rules for your typology
4. Generate or merge agent entrypoints without touching your existing content

That's it. Your project now has a structured instruction layer your agent can operate from.

## Structure After Init

```
your-project/
  .pipes/
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

## License

MIT