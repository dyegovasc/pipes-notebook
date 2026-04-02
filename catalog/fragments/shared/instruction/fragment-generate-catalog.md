---
id: fragment-generate-catalog
type: instruction
name: Generate Catalog
description: Generates the CATALOG.md file from collected fragment and pipeline metadata
version: 1.0
domain: all
---

# Fragment: Generate Catalog

Generates a complete CATALOG.md file from the collected fragment and pipeline inventories.

## Instructions

1. Use the fragment inventory from `fragment-scan-directory` output
2. Use the pipeline inventory from `fragment-scan-pipelines` output
3. Generate markdown with these sections:
   - **Header**: frontmatter with id: fragment-catalog, type: reference, version: auto-incremented, domain: all
   - **Summary counts**: Total fragments, total by type, total pipelines, date
   - **By Type tables**: One table per fragment type (context, instruction, output, question, validation) with columns: Fragment, Name, Domain, Description
   - **Pipelines table**: with columns: Pipeline, Name, Domain, Description
   - **Quick Reference**: Example use case chains
   - **Type Structure Reference**: Table showing required sections per type
   - **Maintenance note**: Auto-generated footer with pipeline reference and date
4. Write the generated content to `utils/fragments/CATALOG.md`
5. Confirm file was written successfully

## Inputs

- **Fragment inventory**: Organized by type with all metadata
- **Pipeline inventory**: With all metadata

## Output

- **CATALOG.md**: Complete updated catalog file
- **Write confirmation**: Success/failure status

## Next Step

Proceed to `fragment-confirm-catalog-update`
