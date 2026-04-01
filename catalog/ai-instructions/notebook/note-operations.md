# Note Operations: Working with Notes

## Note Lifecycle

Notes move through three stages:

```
Fleeting → Project → Permanent
```

| Stage | Description | Constraint |
|-------|-------------|-----------|
| **Fleeting** | Raw captures, unprocessed | Must be processed within 48 hours |
| **Project** | Associated with a specific project or initiative | Lives within a domain folder |
| **Permanent** | Atomic, self-contained, interconnected knowledge | One idea per note; linked via wikilinks |

## Domain Isolation

Each domain operates independently. Notes, context, and projects do not bleed across domain boundaries unless explicitly connected.

Define your domains in `domains/`. Domain folder names are exact. Use them as-is in paths and frontmatter.

## Frontmatter Requirements

Every note requires YAML frontmatter:

**Domain notes:**
```yaml
---
created: YYYY-MM-DD
tags: [tag-one, tag-two]
domain: {domain-name}
---
```

## Creating Notes

1. Check for existing notes on the topic before creating a new one.
2. Confirm the correct domain and folder before placing the file.
3. Add all required frontmatter fields.
4. Use `[[note-name]]` wikilinks to connect to related knowledge.

## Processing Notes

**Fleeting to Project:**
- Associate with a specific project or initiative.
- Move to the appropriate domain folder.
- Update stage tag (e.g., remove `fleeting`, add project tag).

**Project to Permanent:**
- Break into atomic units (one idea per note).
- Add wikilinks to connect related permanent notes.
- Ensure frontmatter is complete and accurate.

## Memory Surfaces

Memory surfaces are scoped state files used by memory-aware pipelines. They do not replace normal notes.

**`MEMORY.md`**
- Curated, durable, repeatedly useful context
- Should stay concise and link outward when detail grows
- May exist at domain or project scope

**`CURRENT.md`**
- Active focus, open questions, and next actions
- Temporary and refreshable
- Should be rewritten as work progresses, not accumulated forever

**Session notes**
- Dated records such as `sessions/YYYY-MM-DD-{slug}.md`
- Transitional by default
- Used for compaction, carry-forward state, and preserving work before context is lost

## Using Memory Surfaces

1. Read memory files only when the active pipeline declares a memory contract, or when a non-pipeline task explicitly adopts the same contract.
2. Respect scope. Read project memory before domain memory when both are relevant.
3. Surface contradictions between memory and canonical instructions instead of silently merging them.
4. Promote durable conclusions into proper notes or `MEMORY.md`.
5. Leave only active residue in `CURRENT.md`.
6. Treat session notes as transitional unless they are later promoted into project or permanent notes.

## Modifying Notes

- Preserve all existing wikilinks. Do not remove or rename linked notes without updating references.
- Maintain frontmatter integrity. Do not remove or rename required fields.
- For significant rewrites, confirm intent with the user before proceeding.

## Compaction Guidance

When a session becomes long, noisy, or likely to lose context:

1. Write the active plan and next actions into `CURRENT.md` when the pipeline contract allows it.
2. Save intermediate but useful residue into a dated session note.
3. Promote stable conclusions into `MEMORY.md` or a proper note.
4. Do not leave durable conclusions stranded only in `CURRENT.md`.

## Knowledge Connectivity

Notes connect via Obsidian wikilinks: `[[note-name]]`.

- Permanent notes are atomic (one idea per note) and interconnected via wikilinks.
- Notes within a domain can link to each other freely.
- Cross-domain links are allowed but should be intentional.
- Do not remove or break existing wikilinks when editing notes.
