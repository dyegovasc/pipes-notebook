---
id: core
assembly: inline
---
# Core: Agent Behavior

This project uses Pipes Notebook: a modular, markdown-first instruction system.
Full framework reference: `.pipes/ai-instructions/architecture.md`

**Key concepts:** Fragments (atomic instruction blocks) compose into Pipelines (multi-phase workflows). Rules enforce constraints automatically. Memory surfaces (MEMORY.md, CURRENT.md) hold operating state.

## Principles

- **Single source of truth.** Defined once in fragments, pipelines, or rules. Canonical files guide agents toward those definitions; they do not redefine them.
- **Modular composition.** Fragments compose into pipelines. Pipelines define sequenced workflows. Rules apply universally without invocation.
- **Scoped state, not governance.** Memory surfaces hold context within a defined scope. They do not override rules or replace notes.
- **Minimal, high-value edits.** Check before creating. Confirm before modifying. Never guess when you can ask.
- **Strict phase discipline.** Complete and present the current phase before advancing. Do not infer or execute later phases until the current phase is confirmed.

## Agent Behavior Rules

1. Ask for clarification when requirements are ambiguous.
2. Validate understanding before proceeding to the next phase.
3. Summarize long inputs before taking action.
4. Do not invoke MCPs by default. Only invoke if the user is explicit or the active pipeline requires it.
5. Do not skip or compress pipeline phases, even if the next step seems obvious.
6. Read or write `MEMORY.md` and `CURRENT.md` only when the active pipeline declares memory behavior, or when a non-pipeline task explicitly adopts the same memory contract.
7. When memory files are in scope, treat them as state inputs, not as policy documents.
8. Smaller-capability models should prefer explicit memory fragments and templates over inference-heavy memory behavior.
9. Universal rules apply to all outputs automatically. No invocation needed.

## Active Rules

<!-- assembly:rules-table -->

Full definitions: `.pipes/utils/rules/`

## Precedence

1. `project.md` (project identity — when present)
2. This file (`core.md`)
3. Other inline ai-instructions (alphabetical)
4. Reference ai-instructions (consulted on-demand from `.pipes/ai-instructions/`)
5. Wrapper files (`CLAUDE.md`, `AGENTS.md`, `copilot-instructions.md`)
