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
| pipeline-define-notebook-purpose | Define Notebook Purpose | Captures the notebook's purpose, domains, and workflow and generates a project identity ai-instruction | notebook | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/pipelines/notebook/pipeline-define-notebook-purpose.md |
| pipeline-define-writing-style | Define Writing Style | Captures writing preferences and generates a tailored writing style rule | notebook | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/pipelines/notebook/pipeline-define-writing-style.md |
| pipeline-define-codebase-stack | Define Codebase Stack | Captures project stack, conventions, and generates a project identity ai-instruction and a codebase conventions rule | codebase | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/pipelines/codebase/pipeline-define-codebase-stack.md |
| pipeline-define-commit-guardrails | Define Commit Guardrails | Captures VCS and commit safety requirements and generates a tailored commit guardrails rule | codebase | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/pipelines/codebase/pipeline-define-commit-guardrails.md |
| pipeline-plan-new-feature | New Feature Implementation Plan | Validates intent, maps codebase context, designs solution architecture, and produces a detailed implementation plan before any code is written | codebase | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/pipelines/codebase/pipeline-plan-new-feature.md |

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
| fragment-run-assembly-script | Run Assembly Script | Executes the .pipes/utils/scripts/assemble-instructions.js script | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/shared/instruction/fragment-run-assembly-script.md |
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

### notebook › instruction

| id | name | description | url |
|---|---|---|---|
| fragment-check-existing-project-instruction | Check Existing Project Instruction | Detects whether a project.md already exists and sets create vs update mode | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/notebook/instruction/fragment-check-existing-project-instruction.md |
| fragment-check-existing-style-rule | Check Existing Style Rule | Detects whether a writing style rule already exists and sets create vs update mode | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/notebook/instruction/fragment-check-existing-style-rule.md |
| fragment-draft-project-instruction | Draft Project Instruction | Drafts project.md content from confirmed notebook purpose inputs | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/notebook/instruction/fragment-draft-project-instruction.md |
| fragment-draft-writing-style-rule | Draft Writing Style Rule | Drafts writing style rule content from confirmed preferences | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/notebook/instruction/fragment-draft-writing-style-rule.md |

### notebook › output

| id | name | description | url |
|---|---|---|---|
| fragment-format-project-instruction | Format Project Instruction | Formats project.md as a structured inline ai-instruction file | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/notebook/output/fragment-format-project-instruction.md |
| fragment-format-writing-style-rule | Format Writing Style Rule | Formats the writing style rule as a structured rule file | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/notebook/output/fragment-format-writing-style-rule.md |

### notebook › question

| id | name | description | url |
|---|---|---|---|
| fragment-ask-notebook-purpose | Ask Notebook Purpose | Asks for the notebook's purpose, domains, workflow, and integrations | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/notebook/question/fragment-ask-notebook-purpose.md |
| fragment-ask-writing-preferences | Ask Writing Preferences | Asks for tone, banned words, formatting constraints, and domain exceptions | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/notebook/question/fragment-ask-writing-preferences.md |

### codebase › instruction

| id | name | description | url |
|---|---|---|---|
| fragment-check-existing-stack-rule | Check Existing Stack Rule | Reads any existing stack rule file for the project | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/instruction/fragment-check-existing-stack-rule.md |
| fragment-draft-stack-rule | Draft Stack Rule | Drafts stack rule content from the captured project details | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/instruction/fragment-draft-stack-rule.md |
| fragment-check-existing-guardrails-rule | Check Existing Guardrails Rule | Detects whether a commit guardrails rule already exists and sets create vs update mode | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/instruction/fragment-check-existing-guardrails-rule.md |
| fragment-draft-commit-guardrails-rule | Draft Commit Guardrails Rule | Drafts commit guardrails rule content from confirmed VCS and security inputs | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/instruction/fragment-draft-commit-guardrails-rule.md |
| fragment-draft-codebase-conventions-rule | Draft Codebase Conventions Rule | Drafts codebase conventions rule content from confirmed dos, don'ts, and practices | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/instruction/fragment-draft-codebase-conventions-rule.md |
| fragment-establish-scope-guardrails | Establish Scope Guardrails | Defines explicit in-scope and out-of-scope boundaries and safety constraints for a feature implementation | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/instruction/fragment-establish-scope-guardrails.md |
| fragment-read-project-instruction | Read Project Instruction | Reads .pipes/ai-instructions/project.md if it exists and extracts stack, architecture, and conventions as baseline context | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/instruction/fragment-read-project-instruction.md |
| fragment-analyze-codebase-context | Analyze Codebase Context | Scans the codebase to understand its structure and identify modules relevant to the feature being planned | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/instruction/fragment-analyze-codebase-context.md |
| fragment-map-system-boundaries | Map System Boundaries | Identifies system boundaries, integration points, and components affected by a feature implementation | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/instruction/fragment-map-system-boundaries.md |
| fragment-assess-blast-radius | Assess Blast Radius | Assesses the potential impact and regression surface of a feature implementation | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/instruction/fragment-assess-blast-radius.md |
| fragment-generate-solution-hypotheses | Generate Solution Hypotheses | Generates multiple distinct solution approaches for a feature with trade-offs assessed | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/instruction/fragment-generate-solution-hypotheses.md |
| fragment-select-solution | Select Solution | Evaluates generated solution hypotheses and selects the optimal approach | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/instruction/fragment-select-solution.md |
| fragment-define-solution-architecture | Define Solution Architecture | Defines the architecture of the selected solution including data flow and impacted files | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/instruction/fragment-define-solution-architecture.md |
| fragment-define-implementation-steps | Define Implementation Steps | Breaks the selected solution into a sequenced list of concrete implementation steps | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/instruction/fragment-define-implementation-steps.md |
| fragment-draft-test-strategy | Draft Test Strategy | Documents the test coverage plan for a feature implementation | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/instruction/fragment-draft-test-strategy.md |
| fragment-assess-implementation-risks | Assess Implementation Risks | Identifies implementation risks, regressions, and mitigations before any code is written | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/instruction/fragment-assess-implementation-risks.md |

### codebase › output

| id | name | description | url |
|---|---|---|---|
| fragment-format-stack-rule | Format Stack Rule | Formats the drafted stack rule as a structured rule file | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/output/fragment-format-stack-rule.md |
| fragment-format-commit-guardrails-rule | Format Commit Guardrails Rule | Formats the commit guardrails rule as a structured rule file | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/output/fragment-format-commit-guardrails-rule.md |
| fragment-format-codebase-conventions-rule | Format Codebase Conventions Rule | Formats the codebase conventions rule as a structured rule file | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/output/fragment-format-codebase-conventions-rule.md |
| fragment-format-implementation-plan | Format Implementation Plan | Formats all gathered planning data into a structured implementation plan markdown document | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/output/fragment-format-implementation-plan.md |

### codebase › question

| id | name | description | url |
|---|---|---|---|
| fragment-ask-project-context | Ask Project Context | Asks for high-level context about the codebase and team | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/question/fragment-ask-project-context.md |
| fragment-ask-stack-details | Ask Stack Details | Asks detailed questions about technologies, tooling, and conventions | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/question/fragment-ask-stack-details.md |
| fragment-ask-commit-preferences | Ask Commit Preferences | Asks for VCS, package manager, secret patterns, and commit safety requirements | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/question/fragment-ask-commit-preferences.md |
| fragment-ask-feature-requirements | Ask Feature Requirements | Gathers the feature description, requirements, and success criteria from the user | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/question/fragment-ask-feature-requirements.md |

### codebase › validation

| id | name | description | url |
|---|---|---|---|
| fragment-validate-plan-consistency | Validate Plan Consistency | Validates that an implementation plan accurately reflects the current codebase state by identifying contradictions and providing corrections | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/fragments/codebase/validation/fragment-validate-plan-consistency.md |

---

## Rules

| id | name | description | domain | url |
|---|---|---|---|---|
| rule-auto-update-catalog | Auto Update Catalog | Regenerates CATALOG.md when fragments, pipelines, or rules are created, modified, or deleted | shared | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/rules/shared/rule-auto-update-catalog.md |
| rule-question-options-format | Question Options Format | Enforces machine-readable key-value options in question fragments | shared | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/rules/shared/rule-question-options-format.md |
| rule-validate-fragment-types | Validate Fragment Types | Validates fragment files conform to their declared type's required structure | shared | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/rules/shared/rule-validate-fragment-types.md |
| rule-memory-boundaries | Memory Boundaries | Constrains how MEMORY.md and CURRENT.md may be read, written, and interpreted | notebook | https://raw.githubusercontent.com/dyegovasc/pipes-notebook/main/catalog/rules/notebook/rule-memory-boundaries.md |
