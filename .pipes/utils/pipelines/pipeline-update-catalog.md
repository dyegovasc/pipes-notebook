---
id: pipeline-update-catalog
name: Update Fragment Catalog
description: Regenerates the fragment catalog by scanning all fragment files
domain: all
version: 1.0
---

# Pipeline: Update Fragment Catalog

Scans all fragment files and regenerates `utils/fragments/CATALOG.md` with current inventory.

## Phases

### Phase 1: Scan Fragments
**Objective:** Collect metadata from all fragment files

**Fragments:**
- `fragment-scan-fragments-for-catalog`

**Instructions:**
1. Scan `utils/fragments/{type}/` directories for all `fragment-*.md` files
2. Extract from each file's frontmatter: id, name, type, version, domain
3. Extract first paragraph of description (after # Fragment: title)
4. Build inventory list organized by type

### Phase 2: Scan Pipelines
**Objective:** Collect metadata from all pipeline files

**Fragments:**
- `fragment-scan-pipelines`

**Instructions:**
1. Scan `utils/pipelines/` for all `pipeline-*.md` files
2. Extract from each file's frontmatter: id, name, description, domain, version
3. Build pipeline inventory

### Phase 3: Generate Catalog
**Objective:** Write updated CATALOG.md

**Fragments:**
- `fragment-generate-catalog`

**Instructions:**
1. Generate markdown content with:
   - Header with frontmatter (id: fragment-catalog, version auto-incremented)
   - Summary counts (total fragments, by type, total pipelines)
   - Fragment tables organized by type
   - Pipeline reference table
   - Quick reference by use case (session, ticket, pipeline-creation, writing)
2. Write to `utils/fragments/CATALOG.md`

### Phase 4: Confirm Update
**Objective:** Notify user of completion

**Fragments:**
- `fragment-confirm-catalog-update`

**Instructions:**
1. Display summary of what was updated
2. Show counts: fragments added, removed, modified
3. Note any fragments missing required frontmatter
