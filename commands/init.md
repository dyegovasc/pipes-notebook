---
id: command-init
name: Initialize Pipes Notebook
description: Scaffolds Pipes Notebook into a project, copies typology-appropriate content, and handles agent entrypoints
version: 2.0
---

# Command: Init

Initializes Pipes Notebook in a project through a layered sequence: scaffold structure, identify typology, install catalog content, and handle agent entrypoints.

## Prerequisites

- The user has a local folder (Obsidian vault or codebase) where they want to install Pipes Notebook
- This repository (pipes-notebook) is accessible for reading the `.pipes/` skeleton and `catalog/` content

## Phases

### Phase 1: Check Existing Installation

**Objective:** Determine if `.pipes/` already exists in the target project.

**Instructions:**

1. Ask the user for the **target path**: the absolute local folder where the system should be installed.

2. Validate the path exists and is a directory.

3. Check if `{target_path}/.pipes/` exists.
   - If it exists, inform the user and skip to Phase 4 (the structure is already installed).
   - If it does not exist, proceed to Phase 2.

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

---

### Phase 3 + 4: Download and Install Content

**Objective:** Download the `.pipes/` skeleton and catalog content from GitHub in a single operation, then install the right files for the selected typology.

**Instructions:**

1. Run the following shell commands to download and extract the repository content into a temp directory:

   ```bash
   _pipes_tmp=$(mktemp -d)
   curl -sL "https://github.com/dyegovasc/pipes-notebook/archive/refs/heads/main.tar.gz" \
     | tar -xz -C "$_pipes_tmp" --strip-components=1 \
       pipes-notebook-main/.pipes \
       pipes-notebook-main/catalog
   ```

   This downloads a single tar.gz archive from GitHub and extracts only the `.pipes/` and `catalog/` directories. No separate fetch per file.

2. Copy `.pipes/` skeleton into the target project (skip existing files):

   ```bash
   cp -rn "$_pipes_tmp/.pipes/." "{target_path}/.pipes/"
   ```

   The `-n` flag skips any files that already exist, protecting user customizations.

3. Copy **shared** ai-instructions (skip existing):

   ```bash
   cp -n "$_pipes_tmp/catalog/ai-instructions/shared/"*.md "{target_path}/.pipes/ai-instructions/"
   ```

4. Copy **typology-specific** ai-instructions (skip existing):

   ```bash
   # Replace {typology} with notebook or codebase
   cp -n "$_pipes_tmp/catalog/ai-instructions/{typology}/"*.md "{target_path}/.pipes/ai-instructions/" 2>/dev/null || true
   ```

5. Copy **shared** rules (skip existing):

   ```bash
   cp -n "$_pipes_tmp/catalog/rules/shared/"*.md "{target_path}/.pipes/utils/rules/"
   ```

6. Copy **typology-specific** rules (skip existing):

   ```bash
   cp -n "$_pipes_tmp/catalog/rules/{typology}/"*.md "{target_path}/.pipes/utils/rules/" 2>/dev/null || true
   ```

7. Apply typology-specific additions:
   - If `notebook`: `mkdir -p "{target_path}/domains/"`
   - If `codebase`: no additional directories

8. Clean up temp directory:

   ```bash
   rm -rf "$_pipes_tmp"
   ```

9. Display what was installed:
   ```
   Installed ai-instructions:
     ✓ core.md (shared)
     ✓ architecture.md (shared)
     ✓ tools.md (shared)
     ✓ note-operations.md (notebook)
     — core.md already exists (skipped)

   Installed rules:
     ✓ rule-validate-fragment-types.md (shared)
     ✓ rule-auto-update-catalog.md (shared)
     ✓ rule-memory-boundaries.md (notebook)
     ✓ rule-human-editor.md (notebook)
     ✓ rule-question-options-format.md (notebook)
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

1. Run: `node {target_path}/.pipes/utils/scripts/assemble-instructions.js`
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
   - Entrypoints created, updated, or skipped

2. Display next steps based on typology:

   **For `notebook`:**
   ```
   Next steps:
   1. Read .pipes/README.md — it explains how to run pipelines, import more, and what to customise
   2. Define your domains by creating folders under domains/
   3. Customize .pipes/ai-instructions/ for your specific needs
   4. Create new pipelines with pipeline-create-pipeline
   5. Re-run pipeline-regenerate-agent-entry-points after editing ai-instructions or rules
   ```

   **For `codebase`:**
   ```
   Next steps:
   1. Read .pipes/README.md — it explains how to run pipelines, import more, and what to customise
   2. Customize .pipes/ai-instructions/ for your specific needs
   3. Create new pipelines with pipeline-create-pipeline
   4. Re-run pipeline-regenerate-agent-entry-points after editing ai-instructions or rules
   ```

---

## Error Handling

| Condition                        | Action                                              |
|----------------------------------|-----------------------------------------------------|
| Target path does not exist       | Ask the user to create it first or provide a valid path |
| Target path is not a directory   | Reject and ask for a directory path                 |
| `.pipes/` skeleton not found in repo | Report error: can't find the pipes-notebook repository |
| `catalog/` missing or empty      | Report error: catalog not found                     |
| Existing files in .pipes/        | Skip, do not overwrite, report what was skipped     |
| Assembly script fails            | Report error, suggest checking ai-instructions      |

## Re-Init Behavior

Running init on a project that already has `.pipes/`:
- Phase 1 detects `.pipes/` exists and skips structure creation
- Phase 3 still runs but skips existing files (only adds new catalog content)
- Phase 4/5 still run to update entrypoints with any new ai-instructions or rules

This makes re-init safe: it adds missing content without destroying user customizations.

## Notes

- The `.pipes/` skeleton contains base pipelines, fragments, templates, and the assembly script. No ai-instructions or rules.
- ai-instructions and rules come exclusively from `catalog/` during Phase 4, selected by typology.
- Agent entrypoints use HTML comment delimiters to isolate the Pipes Notebook section from existing file content.
- The assembly script reads from `.pipes/ai-instructions/` and `.pipes/utils/rules/`, not from `catalog/`.

