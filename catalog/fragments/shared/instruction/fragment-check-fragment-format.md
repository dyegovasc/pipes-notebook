---
id: fragment-check-fragment-format
name: Check Fragment Format
type: instruction
version: 1.0
domain: all
---

# Fragment: Check Fragment Format

Verifies fragment files have valid structure per CLAUDE.md.

## Required Frontmatter
```yaml
---
id: fragment-unique-id
name: Short Name
type: context | instruction | validation | output | question
version: 1.0
---
```

## Instructions

1. **Scan all fragment files** in `utils/fragments/{type}/`

2. **For each fragment file, verify:**
   - Has YAML frontmatter delimited by `---`
   - Frontmatter contains `id` field starting with `fragment-`
   - Frontmatter contains `name` field (non-empty)
   - Frontmatter contains `type` field with valid value: `context`, `instruction`, `validation`, `output`, or `question`
   - Frontmatter contains `version` field
   - Frontmatter contains `domain` field

3. **Record violations** with file path and specific missing/invalid fields

## Output
List malformed fragments with specific issues.
