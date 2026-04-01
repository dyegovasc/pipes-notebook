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

### Phase 3: Create .pipes Skeleton

**Objective:** Copy the base .pipes structure into the target project.

**Instructions:**

1. Copy the contents of this repository's `.pipes/` folder into `{target_path}/.pipes/`. This includes:

   ```
   .pipes/
     ai-instructions/
     utils/
       fragments/
         TEMPLATE-context.md
         TEMPLATE-instruction.md
         TEMPLATE-output.md
         TEMPLATE-question.md
         TEMPLATE-validation.md
         context/
         instruction/
           fragment-create-files.md
           fragment-define-phases.md
           fragment-identify-fragments.md
           fragment-check-entrypoint-state.md
           fragment-run-assembly-script.md
         output/
           fragment-consolidate-structure.md
           fragment-present-memory-contract.md
           fragment-report-entrypoint-results.md
         question/
           fragment-ask-memory-contract.md
           fragment-ask-pipeline-intent.md
           fragment-reframe-intent.md
           fragment-request-approval.md
         validation/
           fragment-validate-reuse-opportunities.md
           fragment-validate-pipes-sources.md
       pipelines/
         pipeline-create-pipeline.md
         pipeline-regenerate-agent-entry-points.md
       rules/
       scripts/
         assemble-instructions.js
   ```

2. Apply typology-specific additions:
   - If `notebook`: create `{target_path}/domains/`
   - If `codebase`: no additional directories

3. Do not overwrite any existing files. Skip and note in output.

---

### Phase 4: Install Catalog Content

**Objective:** Copy the right ai-instructions and rules from `catalog/` into `.pipes/` based on the selected typology.

**Instructions:**

1. Copy **shared** ai-instructions:
   - `catalog/ai-instructions/shared/*.md` → `{target_path}/.pipes/ai-instructions/`

2. Copy **typology-specific** ai-instructions:
   - `catalog/ai-instructions/{typology}/*.md` → `{target_path}/.pipes/ai-instructions/`

3. Copy **shared** rules:
   - `catalog/rules/shared/*.md` → `{target_path}/.pipes/utils/rules/`

4. Copy **typology-specific** rules:
   - `catalog/rules/{typology}/*.md` → `{target_path}/.pipes/utils/rules/`

5. Do not overwrite existing files. If a file already exists, skip it and note it in the output. This allows re-init to add new catalog content without destroying user customizations.

6. Display what was installed:
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

### Phase 5: Check Agent Entrypoints

**Objective:** Detect existing agent entrypoint files and decide how to handle them.

**Instructions:**

1. Check for the existence of these files in `{target_path}/`:
   - `CLAUDE.md`
   - `AGENTS.md`
   - `.github/copilot-instructions.md`

2. **If none exist:**
   - Ask: "No agent entrypoint files found. Create them now?"
   - If yes, proceed to Phase 6.
   - If no, skip to Phase 7.

3. **If some or all exist:**
   - For each existing file, check if it contains Pipes Notebook delimiters (`<!-- pipes-notebook:start -->` / `<!-- pipes-notebook:end -->`).
   - Present the status:
     ```
     CLAUDE.md                       — exists, no Pipes section (will append)
     AGENTS.md                       — exists, has Pipes section (will replace)
     .github/copilot-instructions.md — missing (will create)
     ```
   - Ask: "Run pipeline-regenerate-agent-entry-points to update these?"
   - If yes, proceed to Phase 6.
   - If no, skip to Phase 7.

---

### Phase 6: Generate Agent Entrypoints

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

### Phase 7: Report

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
   1. Define your domains by creating folders under domains/
   2. Customize .pipes/ai-instructions/ for your specific needs
   3. Create new pipelines with pipeline-create-pipeline
   4. Re-run pipeline-regenerate-agent-entry-points after editing ai-instructions or rules
   ```

   **For `codebase`:**
   ```
   Next steps:
   1. Customize .pipes/ai-instructions/ for your specific needs
   2. Create new pipelines with pipeline-create-pipeline
   3. Re-run pipeline-regenerate-agent-entry-points after editing ai-instructions or rules
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
- Phase 4 still runs but skips existing files (only adds new catalog content)
- Phase 5/6 still run to update entrypoints with any new ai-instructions or rules

This makes re-init safe: it adds missing content without destroying user customizations.

## Notes

- The `.pipes/` skeleton contains base pipelines, fragments, templates, and the assembly script. No ai-instructions or rules.
- ai-instructions and rules come exclusively from `catalog/` during Phase 4, selected by typology.
- Agent entrypoints use HTML comment delimiters to isolate the Pipes Notebook section from existing file content.
- The assembly script reads from `.pipes/ai-instructions/` and `.pipes/utils/rules/`, not from `catalog/`.

