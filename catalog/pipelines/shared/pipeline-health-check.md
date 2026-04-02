---
id: pipeline-health-check
name: Notebook Health Check
description: Assesses the notebook structure against canonical instruction guidelines
domain: all
version: 1.1
category: meta
fragments:
  - fragment-check-directory-structure
  - fragment-check-naming-conventions
  - fragment-check-frontmatter
  - fragment-check-fragment-format
  - fragment-check-pipeline-format
  - fragment-validate-memory-state
  - fragment-format-health-report
---

# Pipeline: Notebook Health Check

Scans the notebook to verify compliance with canonical instruction rules and reports issues.

## Memory Contract

Mode: none
Scope: none
Reads:
- none

Writes:
- none

Compaction:
- none

Model Guidance:
- strict

## Phases

### Phase 1: Check Directory Structure
**Objective:** Verify directories match the structure defined in `ai-instructions/architecture.md`

**Fragments:**
- `fragment-check-directory-structure`

**Instructions:**
1. Scan the notebook root
2. Compare against expected structure in `ai-instructions/architecture.md`
3. Verify `ai-instructions/` exists with: `core.md`, `architecture.md`, `note-operations.md`, `tools.md`
4. Verify `.github/copilot-instructions.md` exists
5. Verify `AGENTS.md` exists at notebook root
6. Report missing or extra directories and files

### Phase 2: Check Naming Conventions
**Objective:** Verify files follow naming rules

**Fragments:**
- `fragment-check-naming-conventions`

**Instructions:**
1. Check all .md files for kebab-case naming
2. Verify fragment files have `fragment-` prefix
3. Verify pipeline files have `pipeline-` prefix
4. Check domain folders match defined domains

### Phase 3: Check Note Frontmatter
**Objective:** Verify notes have required frontmatter

**Fragments:**
- `fragment-check-frontmatter`

**Instructions:**
1. Scan .md files in domains/
2. Check for required fields: created, tags, domain
3. Report missing frontmatter

### Phase 4: Check Fragment/Pipeline Format
**Objective:** Verify fragments and pipelines have valid structure

**Fragments:**
- `fragment-check-fragment-format`
- `fragment-check-pipeline-format`

**Instructions:**
1. Parse each fragment file
2. Verify required fields: id, name, type, version
3. Parse each pipeline file
4. Verify required fields: id, name, description, phases
5. If a pipeline includes `## Memory Contract`, verify the contract fields are present

### Phase 5: Check Memory Layer
**Objective:** Verify memory files follow location and usage conventions

**Fragments:**
- `fragment-validate-memory-state`

**Instructions:**
1. Check that memory files exist only in valid domain or project locations
2. Check allowed filenames: `MEMORY.md`, `CURRENT.md`, and dated session notes under `sessions/`
3. If memory templates are later standardized, verify required section structure
4. Flag `CURRENT.md` files that appear to act as long-term archives instead of active context
5. Report cross-domain leakage or invalid session-note placement

### Phase 6: Report Summary
**Objective:** Present health report to user

**Fragments:**
- `fragment-format-health-report`

**Instructions:**
1. Compile all findings
2. Display summary of passed/failed checks
3. List issues found with file paths
4. Recommend fixes if issues detected
