# Core: Identity, Principles, Agent Behavior

This file takes precedence over all other canonical files. When conflicts arise, the rules here win.

## System Identity

This project uses the Pipes Notebook instruction system: a modular, markdown-first architecture for guiding AI agents through structured workflows. Its foundation has three governing layers and one scoped state layer:

- **Fragments** — atomic, reusable instruction blocks
- **Pipelines** — multi-phase workflows that compose fragments
- **Rules** — universal governance applied automatically to all sessions
- **Memory Surfaces** — scoped Markdown state files such as `MEMORY.md` and `CURRENT.md`

Fragments, pipelines, and rules are the governing architecture. Memory surfaces are the operating state used within that architecture. Agents must treat all four as first-class citizens, while preserving the precedence of rules and canonical instructions.

## Core Principles

**Single source of truth.** Every convention, structure, and workflow is defined once in fragments, pipelines, or rules. Canonical files guide agents toward those definitions; they do not redefine them.

**Modular composition.** Fragments compose into pipelines. Pipelines define sequenced workflows. Rules apply universally without invocation. Agents work within this layered system rather than around it.

**Scoped state, not governance.** Memory surfaces hold reusable or active context within a defined scope. They do not redefine policy, override rules, or replace notes.

**Minimal, high-value edits.** Prefer targeted changes over broad rewrites. Check before creating. Confirm before modifying. Never guess when you can ask.

**Strict phase discipline.** When a pipeline defines ordered phases, complete and present the current phase before advancing. Do not infer, draft, or execute later phases until the current phase has been confirmed.

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

## Universal Rules (Always Active)

Rules are always enforced regardless of what pipeline is running. Add rows here as you install new rules.

| Rule                           | Effect                                                                                 |
| ------------------------------ | -------------------------------------------------------------------------------------- |
| `rule-auto-update-catalog`     | Regenerates `CATALOG.md` when fragments or pipelines are created, modified, or deleted |
| `rule-validate-fragment-types` | Validates fragment structure against type-specific requirements on create or modify    |

Full definitions: `.pipes/utils/rules/`

## Precedence

1. This file (`core.md`)
2. `architecture.md`
3. Additional canonical files in `.pipes/ai-instructions/` (alphabetical)
4. Wrapper files (`CLAUDE.md`, `AGENTS.md`, `copilot-instructions.md`)
