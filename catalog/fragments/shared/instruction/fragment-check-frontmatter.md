---
id: fragment-check-frontmatter
name: Check Note Frontmatter
type: instruction
version: 1.0
domain: all
---

# Fragment: Check Note Frontmatter

Verifies notes in domains/ have required frontmatter fields.

## Required Fields
```yaml
---
created: YYYY-MM-DD
tags: []
domain: domain-name
---
```

## Instructions

1. **Scan all markdown files** in `domains/`

2. **Skip excluded directories:**
   - `.obsidian/`
   - Any fragments or pipelines (if present)

3. **For each note file, verify:**
   - Has YAML frontmatter delimited by `---`
   - Frontmatter contains `created` field with valid date format (YYYY-MM-DD)
   - Frontmatter contains `tags` field (array format)
   - Frontmatter contains `domain` field matching the folder location

4. **Record violations** with file path and specific missing/invalid fields

## Output
List notes missing required frontmatter or fields.
