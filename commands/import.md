---
id: command-import
name: Import Pipelines
description: Selectively installs pipelines, fragments, and rules from the catalog into a project
version: 3.1
---

# Command: Import

Imports pipelines, fragments, and rules from the catalog into an existing pipes installation.

**CRITICAL:** The agent must ALWAYS ask the user which pipelines and rules they want before running anything. Never auto-select, never use `--all`, never use `--yes` without explicit user confirmation. The `--all --yes` flags exist only for programmatic use, not for agent-driven imports.

**Primary path:** agent presents the catalog, user selects, agent runs the script with the exact selection.

**Fallback:** if the script cannot be run, follow the manual phases below.

## Prerequisites

- The target project already has a pipes folder installed (run `init` first if not)
- Node.js is available (`node --version`)

---

## Primary Path: Run the Script

### Phase 1: Check Installation

1. Ask the user for the **target path** if not already known.
2. Detect which folder name is in use:
   ```bash
   if [ -d "{target_path}/pipes" ]; then
     _pipes_dir=pipes
   elif [ -d "{target_path}/.pipes" ]; then
     _pipes_dir=.pipes
   else
     echo "No pipes installation found. Run init first."
     exit 1
   fi
   ```
3. Confirm `{target_path}/$_pipes_dir/utils/scripts/import.js` exists.
   - If missing, fall back to the manual path below.

### Phase 2: Fetch Catalog and Present Choices

**The agent does this step — do not run the script yet.**

1. Fetch the catalog:

   ```bash
   curl -sL https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/CATALOG.md
   ```

2. Parse the **Pipelines** and **Rules** tables. For each entry check if the file already exists at its destination in `{target_path}/$_pipes_dir/`.

3. Display the full list grouped by domain, marking installed items with `(installed)`:

   ```
   Pipelines:
     [all]
       pipeline-health-check               Assesses notebook structure             (installed)
       pipeline-initiate-session           Sets session focus and goal
       pipeline-create-pipeline            Guides creation of a new pipeline
       pipeline-update-catalog             Regenerates the fragment catalog
       pipeline-regenerate-agent-entry-points  Updates agent entrypoint files
     [codebase]
       pipeline-define-codebase-stack      Captures stack conventions as a rule

   Rules:
     [shared]
       rule-auto-update-catalog            Re-generates catalog on fragment changes
       ...

   (Fragments are resolved automatically from selected pipelines.)

   Which pipelines and/or rules would you like to import?
   Enter IDs separated by commas, or "all" to import everything.
   ```

4. **Wait for the user's response.** Do not proceed until the user explicitly states what they want.

**Captured values:**
- `selected_ids`: comma-separated list of IDs the user chose

### Phase 3: Run the Script with the User's Selection

Only after the user has chosen, run the script passing their exact selection:

```bash
cd {target_path}
node $_pipes_dir/utils/scripts/import.js --select {selected_ids}
```

The script will:
1. Resolve fragment dependencies for selected pipelines
2. Show the full import plan (pipelines, fragments, rules, already-installed skips)
3. Ask for confirmation before downloading anything

If the user said `all`, use:

```bash
node $_pipes_dir/utils/scripts/import.js --all
```

The `--yes` flag bypasses the script's confirmation prompt. **Only add `--yes` if the user explicitly confirmed in the conversation that they want to proceed without a further prompt.**


---

## Fallback Path: Manual Steps

Use if `import.js` is not available or Node.js is not installed.

### Phase 1: Check Installation

1. Ask the user for the **target path**.
2. Detect which folder name is in use:
   ```bash
   if [ -d "{target_path}/pipes" ]; then _pipes_dir=pipes
   elif [ -d "{target_path}/.pipes" ]; then _pipes_dir=.pipes
   else echo "No pipes installation found. Run init first."; exit 1; fi
   ```
3. Check that `{target_path}/$_pipes_dir/utils/pipelines/` and `{target_path}/$_pipes_dir/utils/fragments/` exist.
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
   - Pipeline → `{target_path}/$_pipes_dir/utils/pipelines/{filename}`
   - Fragment → `{target_path}/$_pipes_dir/utils/fragments/{type}/{filename}` (`type` = second-to-last URL segment)
   - Rule → `{target_path}/$_pipes_dir/utils/rules/{filename}`

```bash
mkdir -p "{destination_dir}"
curl -sL "{url}" -o "{destination_path}"   # only if file does not exist
```

**For notebook projects (`_pipes_dir=pipes`) only:** after copying, rewrite any `.pipes/` references in the newly installed file:
```bash
sed -i '' 's|\.pipes/|pipes/|g' "{destination_path}"
```

### Phase 5: Report

Display what was installed vs skipped.

---

## Error Handling

| Condition | Action |
|-----------|--------|
| No pipes folder found | Stop — tell user to run `init` first |
| `import.js` missing | Use manual fallback path |
| ID not in catalog | List invalid IDs, ask user to correct |
| Fragment not in CATALOG.md | Report missing ID, stop |
| Network error | Report URL and error, continue with remaining files |

## Notes

- `import.js` is installed automatically during `init` as part of the pipes skeleton.
- Import never overwrites existing files. Re-run to pick up newly added catalog entries.
- Fragments are always resolved from pipeline dependencies — never selected individually.
- Rules must be selected explicitly; they are not auto-resolved from pipelines.
- The `fragments:` frontmatter list in each catalog pipeline is the authoritative dependency manifest.
- Fragment type (subdirectory) is resolved from the fragment file's own `type:` frontmatter, not inferred from the path.
- `shared` pipelines and fragments are always available regardless of typology selection.
