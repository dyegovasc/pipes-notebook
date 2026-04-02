---
id: fragment-confirm-catalog-update
type: instruction
name: Confirm Catalog Update
description: Confirms catalog update completion and displays summary
version: 1.0
domain: all
---

# Fragment: Confirm Catalog Update

Confirms the catalog update completed and displays a summary to the user.

## Instructions

1. Display "Catalog Update Complete" header
2. Show summary counts:
   - Total fragments now in catalog
   - Fragments by type breakdown
   - Total pipelines in catalog
3. List any fragments that were flagged for missing frontmatter
4. Note the date of update
5. Provide next action suggestions (e.g., "Run pipeline-update-catalog again after making changes")

## Output

- **Completion message**: Confirms successful update
- **Summary stats**: Counts and any warnings
- **Next actions**: Optional guidance

## Next Step

Pipeline complete — no further fragments
