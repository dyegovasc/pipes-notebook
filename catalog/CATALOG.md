---
id: catalog
description: Master index of all installable files in the pipes-notebook catalog
updated: 2026-04-02
---

# Pipes Notebook Catalog

Complete index of all pipelines, fragments, and rules available for installation.
URL is an absolute `raw.githubusercontent.com` link — fetch directly or use to locate source files.

---

## Pipelines

| id | name | description | domain | url |
|---|---|---|---|---|
| pipeline-health-check | Notebook Health Check | Assesses the notebook structure against canonical instruction guidelines | all | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/pipelines/shared/pipeline-health-check.md |
| pipeline-initiate-session | Initiate Session | Sets the focus for an interaction by capturing domain, folder, and high-level goal | all | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/pipelines/shared/pipeline-initiate-session.md |
| pipeline-create-pipeline | Create Pipeline | Guides user through creating a new pipeline with phases and fragments | all | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/pipelines/shared/pipeline-create-pipeline.md |
| pipeline-update-catalog | Update Fragment Catalog | Regenerates the fragment catalog by scanning all fragment files | all | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/pipelines/shared/pipeline-update-catalog.md |
| pipeline-regenerate-agent-entry-points | Regenerate Agent Entry Points | Generates or updates agent entrypoint files using delimiter-based merge | all | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/pipelines/shared/pipeline-regenerate-agent-entry-points.md |
| pipeline-define-codebase-stack | Define Codebase Stack Rule | Captures project stack, conventions and writes an on-demand rule to .pipes/utils/rules/ | codebase | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/pipelines/codebase/pipeline-define-codebase-stack.md |

---

## Fragments

### shared › instruction

| id | name | description | url |
|---|---|---|---|
| fragment-check-directory-structure | Check Directory Structure | Verifies the .pipes/ directory structure matches the expected layout | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/instruction/fragment-check-directory-structure.md |
| fragment-check-entrypoint-state | Check Entrypoint State | Reads agent entrypoint files to assess current content and delimiters | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/instruction/fragment-check-entrypoint-state.md |
| fragment-check-fragment-format | Check Fragment Format | Validates fragment files conform to structural requirements | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/instruction/fragment-check-fragment-format.md |
| fragment-check-frontmatter | Check Note Frontmatter | Checks note frontmatter fields for completeness and correct format | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/instruction/fragment-check-frontmatter.md |
| fragment-check-naming-conventions | Check Naming Conventions | Validates file and folder names against kebab-case conventions | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/instruction/fragment-check-naming-conventions.md |
| fragment-check-pipeline-format | Check Pipeline Format | Validates pipeline files conform to structural requirements | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/instruction/fragment-check-pipeline-format.md |
| fragment-confirm-catalog-update | Confirm Catalog Update | Confirms catalog update completion and displays a summary | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/instruction/fragment-confirm-catalog-update.md |
| fragment-create-files | Create Files | Writes resolved files to disk at the specified paths | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/instruction/fragment-create-files.md |
| fragment-define-phases | Define Phases | Transforms an approved plan into structured pipeline phase outlines | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/instruction/fragment-define-phases.md |
| fragment-deliver-question-with-options | Deliver Question with Options | Renders questions with machine-readable numbered options | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/instruction/fragment-deliver-question-with-options.md |
| fragment-generate-catalog | Generate Catalog | Generates the CATALOG.md file from collected fragment and pipeline metadata | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/instruction/fragment-generate-catalog.md |
| fragment-identify-fragments | Identify Fragments | Selects or proposes fragments required for the pipeline being designed | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/instruction/fragment-identify-fragments.md |
| fragment-read-memory-context | Read Memory Context | Reads MEMORY.md and CURRENT.md files to load session context | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/instruction/fragment-read-memory-context.md |
| fragment-run-assembly-script | Run Assembly Script | Executes the .pipes/utils/scripts/assemble.sh script | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/instruction/fragment-run-assembly-script.md |
| fragment-scan-fragments-for-catalog | Scan Fragments For Catalog | Scans fragment directories and extracts metadata from each file | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/instruction/fragment-scan-fragments-for-catalog.md |
| fragment-scan-pipelines | Scan Pipelines | Scans the pipeline directory and extracts metadata from each file | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/instruction/fragment-scan-pipelines.md |

### shared › output

| id | name | description | url |
|---|---|---|---|
| fragment-consolidate-structure | Consolidate Structure | Merges pipeline structure into a reviewable output document | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/output/fragment-consolidate-structure.md |
| fragment-format-health-report | Format Health Report | Formats health check findings into a structured report | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/output/fragment-format-health-report.md |
| fragment-present-memory-contract | Present Memory Contract | Displays the memory contract for user review and approval | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/output/fragment-present-memory-contract.md |
| fragment-present-session-context | Present Session Context | Presents the captured session context for user confirmation | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/output/fragment-present-session-context.md |
| fragment-report-entrypoint-results | Report Entrypoint Results | Reports the results of entrypoint generation or update | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/output/fragment-report-entrypoint-results.md |

### shared › question

| id | name | description | url |
|---|---|---|---|
| fragment-ask-domain | Ask Domain | Asks the user to select an active domain from their notebook | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/question/fragment-ask-domain.md |
| fragment-ask-folder | Ask Folder | Asks which folder within the chosen domain to focus on | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/question/fragment-ask-folder.md |
| fragment-ask-memory-contract | Ask Memory Contract | Asks user to define memory read/write permissions for the pipeline | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/question/fragment-ask-memory-contract.md |
| fragment-ask-pipeline-intent | Ask Pipeline Intent | Asks user to describe the intent and goal of the new pipeline | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/question/fragment-ask-pipeline-intent.md |
| fragment-ask-session-goal | Ask Session Goal | Asks for the high-level goal for the current session | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/question/fragment-ask-session-goal.md |
| fragment-confirm-content | Confirm Content | Asks user to confirm content before finalising | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/question/fragment-confirm-content.md |
| fragment-reframe-intent | Reframe Intent | Presents a distilled intent summary for user confirmation | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/question/fragment-reframe-intent.md |
| fragment-request-approval | Request Approval | Requests explicit approval before executing irreversible actions | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/question/fragment-request-approval.md |

### shared › validation

| id | name | description | url |
|---|---|---|---|
| fragment-validate-memory-state | Validate Memory State | Checks memory files are present and structurally valid | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/validation/fragment-validate-memory-state.md |
| fragment-validate-pipes-sources | Validate Pipes Sources | Validates the pipes-notebook source path is accessible | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/validation/fragment-validate-pipes-sources.md |
| fragment-validate-reuse-opportunities | Validate Reuse Opportunities | Checks for existing fragments that could satisfy new requirements | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/validation/fragment-validate-reuse-opportunities.md |

### codebase › instruction

| id | name | description | url |
|---|---|---|---|
| fragment-check-existing-stack-rule | Check Existing Stack Rule | Reads any existing stack rule file for the project | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/instruction/fragment-check-existing-stack-rule.md |
| fragment-draft-stack-rule | Draft Stack Rule | Drafts stack rule content from the captured project details | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/instruction/fragment-draft-stack-rule.md |

### codebase › output

| id | name | description | url |
|---|---|---|---|
| fragment-format-stack-rule | Format Stack Rule | Formats the drafted stack rule as a structured rule file | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/output/fragment-format-stack-rule.md |

### codebase › question

| id | name | description | url |
|---|---|---|---|
| fragment-ask-project-context | Ask Project Context | Asks for high-level context about the codebase and team | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/question/fragment-ask-project-context.md |
| fragment-ask-stack-details | Ask Stack Details | Asks detailed questions about technologies, tooling, and conventions | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/question/fragment-ask-stack-details.md |

---

## Rules

| id | name | description | domain | url |
|---|---|---|---|---|
| rule-auto-update-catalog | Auto Update Catalog | Automatically regenerates the fragment catalog when fragments or pipelines change | shared | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/rules/shared/rule-auto-update-catalog.md |
| rule-question-options-format | Question Options Format | Enforces machine-readable options in question fragments for tool-based delivery | shared | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/rules/shared/rule-question-options-format.md |
| rule-validate-fragment-types | Validate Fragment Types | Validates that all fragments conform to their declared type's required structure | shared | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/rules/shared/rule-validate-fragment-types.md |
| rule-human-editor | Human Editor | Enforces human-quality voice and style in all writing output | notebook | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/rules/notebook/rule-human-editor.md |
| rule-memory-boundaries | Memory Boundaries | Constrains how MEMORY.md and CURRENT.md may be read, written, and interpreted | notebook | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/rules/notebook/rule-memory-boundaries.md |
| rule-git-commit-guardrails | Git Commit Guardrails | Prevents committing secrets, credentials, or bloated artifacts before pushing | codebase | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/rules/codebase/rule-git-commit-guardrails.md |
