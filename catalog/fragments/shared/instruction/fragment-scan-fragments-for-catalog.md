---
id: fragment-scan-fragments-for-catalog
type: instruction
name: Scan Fragments For Catalog
description: Scans fragment directories and extracts metadata from each file
version: 1.0
domain: all
---

# Fragment: Scan Fragments For Catalog

Scans all fragment type directories and collects metadata from each fragment file.

## Instructions

1. Scan all directories under `utils/fragments/` that represent types: `context`, `instruction`, `output`, `question`, `validation`
2. For each directory, find all files matching `fragment-*.md` (exclude TEMPLATE-* files)
3. For each fragment file, extract:
   - `id` from frontmatter
   - `name` from frontmatter
   - `type` from frontmatter (directory name is fallback)
   - `version` from frontmatter
   - `domain` from frontmatter
   - First paragraph after `# Fragment:` as description
4. Build inventory organized by type
5. Flag any files missing required frontmatter fields

## Output

- **Fragment inventory**: Complete list grouped by type with all metadata
- **Missing frontmatter report**: Any fragments with incomplete frontmatter
- **File count by type**: Summary counts for each fragment type

## Next Step

Proceed to `fragment-scan-pipelines`
