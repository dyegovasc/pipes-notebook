---
id: fragment-check-pipeline-format
name: Check Pipeline Format
type: instruction
version: 1.0
domain: all
---

# Fragment: Check Pipeline Format

Verifies pipeline files have valid structure per canonical instructions.

## Required Frontmatter
```yaml
---
id: pipeline-unique-id
name: Pipeline Name
description: What this pipeline accomplishes
domain: work | personal | all
version: 1.0
---
```

## Required Body Sections
- `# Pipeline: Name` (H1 title)
- `## Phases` (section with phases)
- Optional: `## Memory Contract` (required when the pipeline declares memory behavior)

## Instructions

1. **Scan all pipeline files** in `utils/pipelines/`

2. **For each pipeline file, verify frontmatter:**
   - Has YAML frontmatter delimited by `---`
   - Frontmatter contains `id` field starting with `pipeline-`
   - Frontmatter contains `name` field
   - Frontmatter contains `description` field
   - Frontmatter contains `domain` field
   - Frontmatter contains `version` field

3. **For each pipeline file, verify body:**
   - Has H1 title: `# Pipeline: Name`
   - Has `## Phases` section
   - If `## Memory Contract` exists, verify it includes `Mode`, `Scope`, `Reads`, `Writes`, `Compaction`, and `Model Guidance`
   - Each phase references valid fragment IDs

4. **Record violations** with file path and specific issues

## Output
List malformed pipelines with specific issues.
