---
id: rule-auto-update-catalog
name: Auto Update Catalog
type: shared
version: 1.0
description: Regenerates CATALOG.md when fragments, pipelines, or rules are created, modified, or deleted
---

# Rule: Auto Update Catalog

Automatically regenerates the fragment catalog when fragments or pipelines change.

## Trigger Conditions

This rule activates when ANY of the following occur:

1. **Fragment created** — New file added to `.pipes/utils/fragments/{type}/`
2. **Fragment modified** — Existing fragment file edited
3. **Fragment deleted** — Fragment file removed
4. **Pipeline created** — New file added to `.pipes/utils/pipelines/`
5. **Pipeline modified** — Existing pipeline file edited
6. **Pipeline deleted** — Pipeline file removed
7. **Rule created** — New file added to `.pipes/utils/rules/`
8. **Rule modified** — Existing rule file edited
9. **Rule deleted** — Rule file removed

## Action

When triggered:

1. **Detect change type** — Identify what changed (fragment, pipeline, or rule)
2. **Invoke pipeline** — Run `pipeline-update-catalog`
3. **Report result** — Briefly note catalog was updated (unless errors occurred)

## Exceptions

Do NOT trigger when:
- Only `CATALOG.md` itself was modified (prevents infinite loop)
- The change is a bulk operation (user will run pipeline manually after)
- The session is in read-only mode

## Output Format

When auto-triggered, output:

```
Catalog auto-updated: <count> fragments, <count> pipelines indexed.
```

If errors encountered (missing frontmatter, malformed files):

```
Catalog auto-update: <count> errors found
- <file>: <error description>
```
