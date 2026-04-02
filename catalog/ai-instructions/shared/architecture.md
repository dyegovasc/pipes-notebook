---
id: architecture
assembly: reference
---
# Architecture: Repository Structure, Concepts, and Conventions

## System Overview

This is a modular, markdown-first architecture for guiding AI agents through structured workflows. Its foundation has three governing layers and one scoped state layer:

- **Fragments** — atomic, reusable instruction blocks
- **Pipelines** — multi-phase workflows that compose fragments
- **Rules** — universal governance applied automatically to all sessions
- **Memory Surfaces** — scoped Markdown state files such as `MEMORY.md` and `CURRENT.md`

Fragments, pipelines, and rules are the governing architecture. Memory surfaces are the operating state used within that architecture. Agents must treat all four as first-class citizens, while preserving the precedence of rules and canonical instructions.

## Fragments

Fragments are atomic, reusable instruction blocks. They are the base unit of the instruction system.

**Types and required sections:**

| Type | Purpose | Required Sections |
|------|---------|-------------------|
| `context` | Background information and shared understanding | `## Background`, `## Structure` |
| `instruction` | Directives on how to perform a task | `## Instructions`, `## Output` |
| `validation` | Checks and verification steps | `## Checks`, `## Acceptance Criteria` |
| `output` | Formatting and delivery templates | `## Format`, `## Template` |
| `question` | Prompt templates for gathering input | `## Question`, `## Capture` |

Structure is enforced by `rule-validate-fragment-types`.

**Storage:** `.pipes/utils/fragments/{type}/`
**Naming:** `fragment-{id}.md`
**Discovery:** `.pipes/utils/fragments/CATALOG.md` lists all fragments by type and use case.
**Templates:** `.pipes/utils/fragments/TEMPLATE-{type}.md` provides the starting structure for each type.

**Frontmatter required fields:** `id`, `type`, `name`, `version`, `domain`

## Pipelines

Pipelines compose fragments into multi-phase, sequenced workflows.

**Structure:**
```
id: pipeline-{id}
name: Human-readable name
description: One-line summary
domain: all | {domain-name}
version: {semver}
category: meta | session | writing | ingestion | ticket | memory
fragments:
  - fragment-{id}
  - fragment-{id}
```

**Valid categories:**

| Category | Pattern | Examples |
|----------|---------|----------|
| `meta` | Pipelines that operate on `.pipes/` itself | Health check, create pipeline, update catalog, regenerate entrypoints |
| `capture` | Bring information in from sources | Ingest content, fetch ticket, scan folder |
| `compose` | Produce new output from inputs | Write user story, write implementation plan, draft document |
| `refine` | Improve or validate existing content | Text refinement, zero-ambiguity review, style editing |
| `analyze` | Decompose, investigate, or understand | Debug an issue, split complex problem, dependency mapping |
| `context` | Manage session state and memory | Initiate session, compact context, promote durable memory |

Every pipeline must declare exactly one `category`. The `import` command uses this field to group pipelines when listing the catalog.

**Phase structure:**
```
### Phase N: Name
Objective: What this phase accomplishes
Fragments: list of fragment-{id} references
Instructions: numbered steps
```

**Storage:** `.pipes/utils/pipelines/`
**Naming:** `pipeline-{id}.md`

**To create a new pipeline:** use `pipeline-create-pipeline`. Do not create pipeline files manually.

**Memory contract:** Pipelines that use state must declare a `## Memory Contract` section in the pipeline body. Do not store the memory contract in frontmatter.

**Memory contract fields:**
```markdown
## Memory Contract

Mode: none | read | write | read-write
Scope: none | domain | project | session
Reads:
- `MEMORY.md`
- `CURRENT.md`

Writes:
- `CURRENT.md`
- dated session note
- permanent note promotion

Compaction:
- none | optional | required

Model Guidance:
- strict | normal | adaptive
```

## Memory Layer

The system uses scoped Markdown files as operating state. These are not a governance layer. They are state surfaces used by pipelines within rule boundaries.

**`MEMORY.md`** — curated, durable, repeatedly useful context. Should stay concise and link outward when detail grows.

**`CURRENT.md`** — active focus, open questions, and next actions. Temporary and refreshable. Should be rewritten as work progresses, not accumulated forever.

**Session notes** — dated records (`sessions/YYYY-MM-DD-{slug}.md`). Transitional by default. Used for compaction and carry-forward state.

**Scope guidance:**
- `domain` scope uses the memory surfaces in the selected domain or area
- `project` scope reads project memory first, then domain memory as fallback
- `session` scope is mainly for compaction and carry-forward state

**Conflict handling:**
1. Read project memory before domain memory when both are in scope.
2. Use the narrower scope as the operational source when memory files disagree.
3. Surface contradictions explicitly instead of silently merging them.
4. Do not read unrelated scopes.

**Model guidance:**
- `strict`: use explicit fragments and templates for memory operations
- `normal`: use explicit fragments for core memory operations, allow bounded summarization
- `adaptive`: allow stronger models to choose the best summarization or promotion sequence within the declared contract

## Rules

Rules define universal governance. They activate automatically; no invocation required.

**Storage:** `.pipes/utils/rules/`

## Directory Structure

```
{project-root}/
├── CLAUDE.md                    # Claude entrypoint (managed section)
├── AGENTS.md                    # Codex entrypoint (managed section)
├── .github/
│   └── copilot-instructions.md  # GitHub Copilot entrypoint (managed section)
└── .pipes/                      # Pipes Notebook managed folder
    ├── ai-instructions/         # Canonical instruction files
    │   ├── core.md
    │   ├── architecture.md
    │   └── tools.md
    └── utils/
        ├── fragments/           # Reusable instruction blocks by type
        │   ├── CATALOG.md
        │   ├── TEMPLATE-{type}.md
        │   ├── context/
        │   ├── instruction/
        │   ├── validation/
        │   ├── output/
        │   └── question/
        ├── pipelines/           # Multi-phase workflows
        ├── rules/               # Universal governance rules
        └── scripts/             # Utility scripts (assembly, etc.)
```

## Naming Conventions

| Item | Pattern | Example |
|------|---------|---------|
| All files | `kebab-case.md` | `my-note.md` |
| Fragment files | `fragment-{id}.md` | `fragment-ask-domain.md` |
| Pipeline files | `pipeline-{id}.md` | `pipeline-write-user-story.md` |
| Rule files | `rule-{id}.md` | `rule-auto-update-catalog.md` |

## Frontmatter Requirements

**Fragment files:**
```yaml
---
id: fragment-{id}
type: context | instruction | validation | output | question
name: Human-readable name
version: 1.0
domain: all | {domain-name}
---
```

**Pipeline files:**
```yaml
---
id: pipeline-{id}
name: Human-readable name
description: One-line summary
domain: all | {domain-name}
version: 1.0
---
```
