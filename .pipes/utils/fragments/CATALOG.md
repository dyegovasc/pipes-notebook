---
id: fragment-catalog
name: Fragment Catalog
type: reference
version: 1.0
domain: all
---

# Fragment Catalog

**Version:** 1.0
**Total Fragments:** 18
**Total Pipelines:** 3

> This catalog covers the base fragments and pipelines shipped with `.pipes/`. It is updated by `pipeline-update-catalog` whenever fragments or pipelines change.

## By Type

### Instruction (9)

| Fragment | Name | Description |
|----------|------|-------------|
| `fragment-check-entrypoint-state` | Check Entrypoint State | Detects the current state of each agent entrypoint file before assembly |
| `fragment-confirm-catalog-update` | Confirm Catalog Update | Confirms the catalog update completed and displays a summary to the user |
| `fragment-create-files` | Create Files | Creates the pipeline and fragment files on disk |
| `fragment-define-phases` | Define Phases | Breaks down the pipeline into ordered phases |
| `fragment-generate-catalog` | Generate Catalog | Generates a complete CATALOG.md file from the collected fragment and pipeline inventories |
| `fragment-identify-fragments` | Identify Fragments | Determines which fragments to reuse and which to create |
| `fragment-run-assembly-script` | Run Assembly Script | Executes the assembly script to generate or merge Pipes Notebook sections into entrypoints |
| `fragment-scan-fragments-for-catalog` | Scan Fragments For Catalog | Scans all fragment type directories and collects metadata from each fragment file |
| `fragment-scan-pipelines` | Scan Pipelines | Scans the pipelines directory and collects metadata from each pipeline file |

### Output (3)

| Fragment | Name | Description |
|----------|------|-------------|
| `fragment-consolidate-structure` | Consolidate Structure | Presents the complete pipeline and fragment definitions |
| `fragment-present-memory-contract` | Present Memory Contract | Formats the memory contract during pipeline design or review |
| `fragment-report-entrypoint-results` | Report Entrypoint Results | Summarizes what the assembly script did and suggests next steps |

### Question (4)

| Fragment | Name | Description |
|----------|------|-------------|
| `fragment-ask-memory-contract` | Ask Memory Contract | Captures the memory behavior a pipeline should declare |
| `fragment-ask-pipeline-intent` | Ask Pipeline Intent | Asks the user what they want the new pipeline to accomplish |
| `fragment-reframe-intent` | Reframe Intent | Restates the user's intent to confirm understanding |
| `fragment-request-approval` | Request Approval | Asks user to approve the final structure before creating files |

### Validation (2)

| Fragment | Name | Description |
|----------|------|-------------|
| `fragment-validate-pipes-sources` | Validate Pipes Sources | Confirms that `.pipes/ai-instructions/` and `.pipes/utils/rules/` contain the files needed for assembly |
| `fragment-validate-reuse-opportunities` | Validate Reuse Opportunities | Checks that the proposed fragments maximize reuse and avoid duplication |

## Pipelines

| Pipeline | Name | Category | Description |
|----------|------|----------|-------------|
| `pipeline-create-pipeline` | Create Pipeline | meta | Guides user through creating a new pipeline with phases and fragments |
| `pipeline-regenerate-agent-entry-points` | Regenerate Agent Entry Points | meta | Generates or updates agent entrypoint files with Pipes Notebook instructions |
| `pipeline-update-catalog` | Update Fragment Catalog | meta | Regenerates the fragment catalog by scanning all fragment files |
