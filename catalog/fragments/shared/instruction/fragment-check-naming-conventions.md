---
id: fragment-check-naming-conventions
name: Check Naming Conventions
type: instruction
version: 1.0
domain: all
---

# Fragment: Check Naming Conventions

Verifies files follow naming conventions defined in CLAUDE.md.

## Rules
- Files: `kebab-case.md`
- Fragment files: `fragment-{id}.md`
- Pipeline files: `pipeline-{id}.md`
- Tags: lowercase with hyphens
- Domain names: match folder names exactly

## Instructions

1. **Scan all markdown files** in the notebook

2. **Verify file naming:**
   - All `.md` files use `kebab-case`
   - Fragment files use `fragment-{id}.md` pattern
   - Pipeline files use `pipeline-{id}.md` pattern

3. **Verify directory naming:**
   - Domain folders match: `personal`, `work`, `side-projects`, `dj-projects`, `sales`
   - Utils subdirectories match expected structure

4. **Record violations** with current name and suggested correction

## Output
List files that violate naming conventions with correct names.
