---
id: fragment-create-files
name: Create Files
type: instruction
version: 1.0
domain: all
---

# Fragment: Create Files

Creates the pipeline and fragment files on disk.

## Instructions

1. **Verify preconditions:**
   - User has approved the structure in Phase 6
   - All fragment IDs and content are finalized

2. **Create pipeline file:**
   - Path: `utils/pipelines/pipeline-{id}.md`
   - Content: Complete pipeline definition with frontmatter and all phases

3. **Create fragment files:**
   - For each new fragment:
     - Path: `utils/fragments/{type}/fragment-{id}.md`
     - Content: Complete fragment definition
   - Use kebab-case for IDs
   - Match type to correct subdirectory

4. **Confirm success:**
   - List all created files
   - Verify each file was written
   - Show final directory structure
   - Inform user the pipeline is ready to use

## Inputs

- Pipeline ID, name, description, domain, category, fragments list, phases
- Fragment definitions (id, type, name, content)

## Output

- Created pipeline file at `utils/pipelines/pipeline-{id}.md`
- Created fragment files at `utils/fragments/{type}/fragment-{id}.md`
- Confirmation message with file list
