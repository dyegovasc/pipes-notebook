---
id: command-import
name: Import Pipelines
description: Selectively installs pipelines, fragments, and rules from the catalog into a project
version: 3.0
---

# Command: Import

Imports pipelines, fragments, and rules from the catalog into an existing `.pipes/` installation.

**Primary path:** run the bundled `import.js` script — it fetches the catalog, shows the list, resolves fragments, and copies files automatically.

**Fallback:** if the script cannot be run, follow the manual phases below.

## Prerequisites

- The target project already has `.pipes/` installed (run `init` first if not)
- Node.js is available (`node --version`)

---

## Primary Path: Run the Script

### Phase 1: Check Installation

1. Ask the user for the **target path** if not already known.
2. Confirm `{target_path}/.pipes/utils/scripts/import.js` exists.
   - If missing, fall back to the manual path below.

### Phase 2: Run the Importer

Run from the project root (the script derives `PROJECT_ROOT` from its own location):

```bash
cd {target_path}
node .pipes/utils/scripts/import.js
```

The script will:
1. Fetch `catalog/CATALOG.md` from GitHub
2. Display the full list of pipelines and rules, marking installed ones with `(installed)`
3. Prompt for selection (comma-separated IDs, or `all`)
4. Resolve fragment dependencies from each selected pipeline's frontmatter
5. Show the import plan and ask for confirmation
6. Download and install all files into the correct `.pipes/` directories

**Flags for non-interactive use:**

```bash
# Pre-select specific pipelines/rules (still shows plan and asks to confirm)
node .pipes/utils/scripts/import.js --select pipeline-health-check,pipeline-initiate-session

# Skip the confirmation prompt
node .pipes/utils/scripts/import.js --select pipeline-health-check --yes

# Import everything
node .pipes/utils/scripts/import.js --all --yes
```

---

## Fallback Path: Manual Steps

Use if `import.js` is not available or Node.js is not installed.

### Phase 1: Check Installation

1. Ask the user for the **target path**.
2. Check that `{target_path}/.pipes/utils/pipelines/` and `{target_path}/.pipes/utils/fragments/` exist.
   - If missing, stop and tell the user to run `init` first.

### Phase 2: Read Catalog and Show List

1. Fetch `catalog/CATALOG.md`:

   ```bash
   curl -sL https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/CATALOG.md
   ```

2. Parse the **Pipelines** and **Rules** tables. For each entry, check if the file already exists at its destination.

3. Respond immediately with the full list, marking installed items. Ask in the same message which IDs to import.

### Phase 3: Resolve and Confirm

1. For each selected pipeline, fetch it and extract the `fragments:` frontmatter list.
2. Look up each fragment ID in CATALOG.md's Fragments table to get its `url`.
3. Show the import plan (pipelines, fragments, rules, skipped). Wait for confirmation.

### Phase 4: Copy Files

For each file to install:

1. Source URL: the absolute `url` from CATALOG.md (`raw.githubusercontent.com/…`)
2. Destination:
   - Pipeline → `{target_path}/.pipes/utils/pipelines/{filename}`
   - Fragment → `{target_path}/.pipes/utils/fragments/{type}/{filename}` (`type` = second-to-last URL segment)
   - Rule → `{target_path}/.pipes/utils/rules/{filename}`

```bash
mkdir -p "{destination_dir}"
curl -sL "{url}" -o "{destination_path}"   # only if file does not exist
```

### Phase 5: Report

Display what was installed vs skipped.

---

## Error Handling

| Condition | Action |
|-----------|--------|
| `.pipes/` not found | Stop — tell user to run `init` first |
| `import.js` missing | Use manual fallback path |
| ID not in catalog | List invalid IDs, ask user to correct |
| Fragment not in CATALOG.md | Report missing ID, stop |
| Network error | Report URL and error, continue with remaining files |

## Notes

- `import.js` is installed automatically during `init` as part of the `.pipes/` skeleton.
- Import never overwrites existing files. Re-run to pick up newly added catalog entries.
- Fragments are always resolved from pipeline dependencies — never selected individually.
- Rules must be selected explicitly; they are not auto-resolved from pipelines.
- The `fragments:` frontmatter list in each catalog pipeline is the authoritative dependency manifest.
- Fragment type (subdirectory) is resolved from the fragment file's own `type:` frontmatter, not inferred from the path.
- `shared` pipelines and fragments are always available regardless of typology selection.
