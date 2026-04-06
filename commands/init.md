---
id: command-init
name: Initialize Pipes Notebook
description: Scaffolds Pipes Notebook into a project, copies typology-appropriate content, and handles agent entrypoints
version: 3.0
---

# Command: Init

Initializes Pipes Notebook in a project through a layered sequence: scaffold structure, identify typology, install catalog content, install setup pipelines, and handle agent entrypoints.

## Prerequisites

- The user has a local folder (Obsidian vault or codebase) where they want to install Pipes Notebook
- This repository (pipes-notebook) is accessible for reading the `.pipes/` skeleton and `catalog/` content

## Phases

### Phase 1: Check Existing Installation

**Objective:** Determine if `.pipes/` already exists in the target project.

**Instructions:**

1. Ask the user for the **target path**: the absolute local folder where the system should be installed.

2. Validate the path exists and is a directory.

3. Check if `{target_path}/pipes/` or `{target_path}/.pipes/` exists.
   - If either exists, inform the user and skip to Phase 4 (the structure is already installed). Store the detected folder name as `_pipes_dir`.
   - If neither exists, proceed to Phase 2.

**Captured values:**
- `target_path`: absolute path to the local folder
- `pipes_exists`: boolean

---

### Phase 2: Identify Project Typology

**Objective:** Determine whether the target is a notebook or a codebase to select the right catalog content.

**Instructions:**

1. Ask the user:

   > What type of project is this?
   >
   > - notebook: "Obsidian vault or markdown notebook"
   > - codebase: "Software project or repository"

2. Capture the selection.

**Captured values:**
- `typology`: `notebook` | `codebase`

> **Note on folder name:** For `notebook` projects, the system installs to `pipes/` (a visible folder so you can edit its contents in Obsidian). For `codebase` projects, it installs to `.pipes/` (a conventional dotfolder, like `.github/`). Store the result as `_pipes_dir`:
> - `notebook` → `_pipes_dir=pipes`
> - `codebase` → `_pipes_dir=.pipes`

---

### Phase 3 + 4: Download and Install Content

**Objective:** Download the `pipes` skeleton and catalog content from GitHub in a single operation, then install the right files for the selected typology.

**Instructions:**

1. Run the following shell commands to download and extract the repository content into a temp directory:

   ```bash
   _pipes_tmp=$(mktemp -d)
   curl -sL "https://github.com/dyegovasc/pipes-notebook/archive/refs/heads/main.tar.gz" \
     | tar -xz -C "$_pipes_tmp" --strip-components=1 \
       pipes-notebook-main/.pipes \
       pipes-notebook-main/catalog
   ```

   This downloads a single tar.gz archive from GitHub and extracts only the `.pipes/` skeleton and `catalog/` directories. No separate fetch per file.

2. Copy the pipes skeleton into the target project under `_pipes_dir` (skip existing files):

   ```bash
   mkdir -p "{target_path}/$_pipes_dir"
   cp -rn "$_pipes_tmp/.pipes/." "{target_path}/$_pipes_dir/"
   ```

   The `-n` flag skips any files that already exist, protecting user customizations.

3. Copy **shared** ai-instructions (skip existing):

   ```bash
   cp -n "$_pipes_tmp/catalog/ai-instructions/shared/core.md" "{target_path}/$_pipes_dir/ai-instructions/"
   cp -n "$_pipes_tmp/catalog/ai-instructions/shared/architecture.md" "{target_path}/$_pipes_dir/ai-instructions/"
   ```

   Note: `tools.md` is no longer a catalog file. The shared set is `core.md` and `architecture.md` only.

4. Copy **typology-specific** ai-instructions (skip existing):

   ```bash
   # For notebook only — codebase has no pre-written ai-instructions
   if [ "{typology}" = "notebook" ]; then
     cp -n "$_pipes_tmp/catalog/ai-instructions/notebook/"*.md "{target_path}/$_pipes_dir/ai-instructions/" 2>/dev/null || true
   fi
   ```

5. Copy **shared** rules (skip existing):

   ```bash
   cp -n "$_pipes_tmp/catalog/rules/shared/"*.md "{target_path}/$_pipes_dir/utils/rules/"
   ```

6. Copy **typology-specific** rules (skip existing):

   ```bash
   # For notebook: only rule-memory-boundaries (rule-human-editor is no longer in catalog)
   # For codebase: no pre-written rules (rule-git-commit-guardrails is no longer in catalog)
   cp -n "$_pipes_tmp/catalog/rules/{typology}/"*.md "{target_path}/$_pipes_dir/utils/rules/" 2>/dev/null || true
   ```

7. Install **setup pipelines** for the typology and their fragment dependencies (skip existing):

   ```bash
   # Install setup pipelines
   cp -n "$_pipes_tmp/catalog/pipelines/{typology}/"*.md "{target_path}/$_pipes_dir/utils/pipelines/" 2>/dev/null || true

   # Install fragment dependencies for setup pipelines
   for type in question instruction output; do
     cp -n "$_pipes_tmp/catalog/fragments/{typology}/$type/"*.md "{target_path}/$_pipes_dir/utils/fragments/$type/" 2>/dev/null || true
   done
   ```

8. Apply typology-specific additions:
   - If `notebook`: `mkdir -p "{target_path}/domains/"`
   - If `codebase`: no additional directories

9. **For `notebook` only:** Rewrite all internal `.pipes/` path references in the installed files to `pipes/` so rules, pipelines, and instructions refer to the correct visible folder:

   ```bash
   find "{target_path}/pipes/" -type f \( -name "*.md" -o -name "*.js" \) -exec sed -i '' 's|\.pipes/|pipes/|g' {} \;
   ```

10. Clean up temp directory:

   ```bash
   rm -rf "$_pipes_tmp"
   ```

11. Display what was installed:

    **For `notebook`:**
    ```
    Installed ai-instructions:
      ✓ core.md (shared, framework, inline)
      ✓ architecture.md (shared, framework, reference)
      ✓ note-operations.md (notebook, feature, inline)

    Installed rules:
      ✓ rule-auto-update-catalog.md (shared, framework)
      ✓ rule-validate-fragment-types.md (shared, framework)
      ✓ rule-question-options-format.md (shared, framework)
      ✓ rule-memory-boundaries.md (notebook, feature)

    Installed setup pipelines:
      ✓ pipeline-define-notebook-purpose (generates project identity)
      ✓ pipeline-define-writing-style (generates writing style rule)
    ```

    **For `codebase`:**
    ```
    Installed ai-instructions:
      ✓ core.md (shared, framework, inline)
      ✓ architecture.md (shared, framework, reference)

    Installed rules:
      ✓ rule-auto-update-catalog.md (shared, framework)
      ✓ rule-validate-fragment-types.md (shared, framework)
      ✓ rule-question-options-format.md (shared, framework)

    Installed setup pipelines:
      ✓ pipeline-define-codebase-stack (generates project identity + conventions rule)
      ✓ pipeline-define-commit-guardrails (generates commit safety rule)
    ```

---

### Phase 4: Check Agent Entrypoints

**Objective:** Detect existing agent entrypoint files and decide how to handle them.

**Instructions:**

1. Check for the existence of these files in `{target_path}/`:
   - `CLAUDE.md`
   - `AGENTS.md`
   - `.github/copilot-instructions.md`

2. **If none exist:**
   - Ask: "No agent entrypoint files found. Create them now?"
   - If yes, proceed to Phase 5.
   - If no, skip to Phase 6.

3. **If some or all exist:**
   - For each existing file, check if it contains Pipes Notebook delimiters (`<!-- pipes-notebook:start -->` / `<!-- pipes-notebook:end -->`).
   - Present the status:
     ```
     CLAUDE.md                       — exists, no Pipes section (will append)
     AGENTS.md                       — exists, has Pipes section (will replace)
     .github/copilot-instructions.md — missing (will create)
     ```
   - Ask: "Run pipeline-regenerate-agent-entry-points to update these?"
   - If yes, proceed to Phase 5.
   - If no, skip to Phase 6.

---

### Phase 5: Generate Agent Entrypoints

**Objective:** Run the assembly script to generate or merge Pipes Notebook sections into entrypoints.

**Instructions:**

1. Run: `node {target_path}/$_pipes_dir/utils/scripts/assemble-instructions.js`
   (The script must be run from `{target_path}/` as the working directory.)

2. The script will:
   - Create new entrypoint files where none exist
   - Append a delimited Pipes section to existing files without delimiters
   - Replace the delimited section in files that already have one
   - Never touch content outside the delimiters

3. Display the script output.

4. If the script fails, report the error.

---

### Phase 6: Report

**Objective:** Summarize the initialization and suggest next steps.

**Instructions:**

1. Summarize what was done:
   - Structure created or already existed
   - Typology selected
   - ai-instructions and rules installed
   - Setup pipelines installed
   - Entrypoints created, updated, or skipped

2. Display next steps based on typology:

   **For `notebook`:**
   ```
   Next steps:
   1. Run pipeline-define-notebook-purpose — give your vault an identity (recommended first)
   2. Run pipeline-define-writing-style — configure your writing rules
   3. Define your domains by creating folders under domains/
   4. Import more pipelines with the import command
   5. Run pipeline-regenerate-agent-entry-points after any rule or ai-instruction changes
   ```

   **For `codebase`:**
   ```
   Next steps:
   1. Run pipeline-define-codebase-stack — capture your project's tech stack, architecture, and conventions (recommended first)
   2. Run pipeline-define-commit-guardrails — configure commit safety checks
   3. Import more pipelines with the import command
   4. Run pipeline-regenerate-agent-entry-points after any rule or ai-instruction changes
   ```

---

## Error Handling

| Condition                        | Action                                              |
|----------------------------------|-----------------------------------------------------|
| Target path does not exist       | Ask the user to create it first or provide a valid path |
| Target path is not a directory   | Reject and ask for a directory path                 |
| pipes skeleton not found in repo  | Report error: can't find the pipes-notebook repository |
| `catalog/` missing or empty      | Report error: catalog not found                     |
| Existing files in pipes dir      | Skip, do not overwrite, report what was skipped     |
| Assembly script fails            | Report error, suggest checking ai-instructions      |

## Re-Init Behavior

Running init on a project that already has a pipes folder (`pipes/` or `.pipes/`):
- Phase 1 detects the folder exists and skips structure creation
- Phase 3 still runs but skips existing files (only adds new catalog content)
- Phase 4/5 still run to update entrypoints with any new ai-instructions or rules

This makes re-init safe: it adds missing content without destroying user customizations.

## Notes

- **Folder name by typology:** `notebook` projects use `pipes/` so the folder is visible in Obsidian. `codebase` projects use `.pipes/` following dotfolder convention (like `.github/`). The variable `_pipes_dir` is set in Phase 2 and used throughout.
- **Path rewrite (notebook only):** After installing all files, a `sed` pass rewrites every `.pipes/` reference inside installed markdown files to `pipes/`, keeping rules, pipelines, and instructions internally consistent.
- The pipes skeleton contains base pipelines, fragments, templates, and the assembly script. No ai-instructions or rules.
- ai-instructions and rules come exclusively from `catalog/` during Phase 3, selected by typology.
- Project-tier files (`project.md`, `rule-writing-style.md`, `rule-codebase-conventions.md`, `rule-commit-guardrails.md`) are never pre-installed — they are generated by the setup pipelines, which ask the user for project-specific information.
- Agent entrypoints use HTML comment delimiters to isolate the Pipes Notebook section from existing file content.
- The assembly script reads from `$_pipes_dir/ai-instructions/` and `$_pipes_dir/utils/rules/`, not from `catalog/`.

