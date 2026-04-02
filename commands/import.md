---
id: command-import
name: Import Pipelines
description: Selectively installs pipelines (and their fragment dependencies) from the catalog into a project
version: 1.0
---

# Command: Import

Imports one or more pipelines from the `catalog/` into an existing `.pipes/` installation. Resolves and copies all fragment dependencies automatically.

## Prerequisites

- The target project already has `.pipes/` installed (run `init` first if not)
- This repository (pipes-notebook) is accessible for reading `catalog/` content

---

## Phases

### Phase 1: Check Installation

**Objective:** Confirm the target project has a valid `.pipes/` structure before importing anything.

**Instructions:**

1. Ask the user for the **target path** if not already known.

2. Check that `{target_path}/.pipes/utils/pipelines/` and `{target_path}/.pipes/utils/fragments/` exist.
   - If either is missing, stop and tell the user to run `init` first.

3. Proceed to Phase 2.

**Captured values:**
- `target_path`: absolute path to the project

---

### Phase 2: Identify Typology

**Objective:** Determine which catalog sections to show.

**Instructions:**

1. Ask the user:

   > What type of project is this?
   >
   > - shared: "Show pipelines available for any project type"
   > - notebook: "Show notebook-specific pipelines (includes shared)"
   > - codebase: "Show codebase-specific pipelines (includes shared)"

2. Capture the selection as `typology`.

**Captured values:**
- `typology`: `shared` | `notebook` | `codebase`

---

### Phase 3: List Available Pipelines

**Objective:** Download the catalog and present available pipelines grouped by category.

**Instructions:**

1. Download the catalog in a single operation:

   ```bash
   _pipes_tmp=$(mktemp -d)
   curl -sL "https://github.com/dyegovasc/pipes-notebook/archive/refs/heads/main.tar.gz" \
     | tar -xz -C "$_pipes_tmp" --strip-components=1 \
       pipes-notebook-main/catalog/pipelines
   ```

2. Collect pipeline files from:
   - `$_pipes_tmp/catalog/pipelines/shared/`
   - `$_pipes_tmp/catalog/pipelines/{typology}/` (if typology is not `shared`)

3. For each pipeline file, read the frontmatter fields: `id`, `name`, `description`, `category`.

4. Group by `category` and display:

   ```
   Available pipelines:

     Meta
       pipeline-health-check        Assesses notebook structure against canonical guidelines
       pipeline-update-catalog      Regenerates the fragment catalog

     Session
       pipeline-initiate-session    Sets focus by capturing domain, folder, and goal
   ```

5. If a pipeline is already installed at `{target_path}/.pipes/utils/pipelines/`, mark it with `(installed)`.

---

### Phase 4: Select Pipelines

**Objective:** Capture which pipelines the user wants to import.

**Instructions:**

1. Ask:

   > Which pipelines would you like to import? Enter IDs separated by commas, or type `all` to import everything shown.

2. Validate each entered ID exists in the displayed list.

3. If any ID is invalid, list the unrecognised ones and ask again.

**Captured values:**
- `selected_ids`: list of pipeline IDs to import

---

### Phase 5: Resolve Fragment Dependencies

**Objective:** Determine all fragment files that need to be copied.

**Instructions:**

1. For each selected pipeline, read its `fragments:` frontmatter list.

2. Build a deduplicated flat list of all required fragment IDs across all selected pipelines.

3. Locate each fragment in:
   - `$_pipes_tmp/catalog/fragments/shared/{type}/fragment-{id}.md`
   - `$_pipes_tmp/catalog/fragments/{typology}/{type}/fragment-{id}.md`

   To find the right subdirectory, read the fragment file's `type:` frontmatter field.

4. If any fragment cannot be located, report it as missing and stop.

5. Display the resolution plan:

   ```
   Import plan:
     Pipelines  (2): pipeline-health-check, pipeline-initiate-session
     Fragments (11): fragment-check-directory-structure,
                     fragment-check-naming-conventions, ...

   Files already installed (will skip):
     — none

   Proceed?
   ```

6. Wait for user confirmation before continuing.

---

### Phase 6: Copy Files

**Objective:** Install pipelines and fragments into the target project.

**Instructions:**

1. Copy pipeline files (skip existing):

   ```bash
   cp -n "$_pipes_tmp/catalog/pipelines/shared/pipeline-{id}.md" \
     "{target_path}/.pipes/utils/pipelines/"
   # Repeat for typology-specific pipelines
   ```

2. Copy each fragment to its type directory (skip existing):

   ```bash
   cp -n "$_pipes_tmp/catalog/fragments/shared/{type}/fragment-{id}.md" \
     "{target_path}/.pipes/utils/fragments/{type}/"
   ```

3. Clean up:

   ```bash
   rm -rf "$_pipes_tmp"
   ```

---

### Phase 7: Report

**Objective:** Summarise what was installed.

**Instructions:**

1. Display results:

   ```
   Import complete:

   Pipelines:
     ✓ pipeline-health-check       — installed
     ✓ pipeline-initiate-session   — installed
     — pipeline-update-catalog     — already existed (skipped)

   Fragments:
     ✓ 10 installed
     — 1 already existed (skipped)

   Next steps:
   - Run pipeline-health-check to verify your .pipes/ structure
   - Run pipeline-initiate-session to start a working session
   ```

---

## Error Handling

| Condition | Action |
|-----------|--------|
| `.pipes/` not found in target | Stop and tell user to run `init` first |
| Pipeline ID not in catalog | List invalid IDs, ask user to correct |
| Fragment missing from catalog | Report missing ID, stop before copying anything |
| File write fails | Report error with path, continue with remaining files |

## Notes

- Import never overwrites existing files. Re-running import after a catalog update will only add new fragments.
- The `fragments:` frontmatter list in each catalog pipeline is the authoritative dependency manifest.
- Fragment type (subdirectory) is resolved from the fragment file's own `type:` frontmatter, not inferred from the path.
- `shared` pipelines and fragments are always available regardless of typology selection.
