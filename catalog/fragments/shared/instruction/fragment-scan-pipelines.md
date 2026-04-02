---
id: fragment-scan-pipelines
type: instruction
name: Scan Pipelines
description: Scans pipeline directory and extracts metadata from each file
version: 1.0
domain: all
---

# Fragment: Scan Pipelines

Scans the pipelines directory and collects metadata from each pipeline file.

## Instructions

1. Scan `utils/pipelines/` for all files matching `pipeline-*.md`
2. For each pipeline file, extract:
   - `id` from frontmatter
   - `name` from frontmatter
   - `description` from frontmatter
   - `domain` from frontmatter
   - `version` from frontmatter
3. Build pipeline inventory list sorted by name
4. Flag any files missing required frontmatter fields

## Output

- **Pipeline inventory**: Complete list with all metadata
- **Missing frontmatter report**: Any pipelines with incomplete frontmatter
- **Pipeline count**: Total number of pipelines found

## Next Step

Proceed to `fragment-generate-catalog`
