---
id: fragment-consolidate-structure
name: Consolidate Structure
type: output
version: 1.0
domain: all
---

# Fragment: Consolidate Structure

Presents the complete pipeline and fragment definitions.

## Output Format

### Pipeline File Preview
```markdown
---
id: pipeline-[id]
name: [Name]
description: [Description]
domain: [domain]
version: 1.0
category: [meta | capture | compose | refine | analyze | context]
fragments:
  - fragment-[id]
---

# Pipeline: [Name]

[Brief description]

## Phases

### Phase 1: [Phase Name]
**Objective:** [Objective]

**Fragments:**
- `fragment-id-1`
- `fragment-id-2`

### Phase 2: [Phase Name]
...
```

### New Fragment Previews
For each new fragment to create:

```markdown
---
id: fragment-[id]
name: [Name]
type: [type]
version: 1.0
domain: [domain]
---

# Fragment: [Name]

[Description]

## [Section based on type]
...
```

## Files to Create
- `utils/pipelines/pipeline-{id}.md`
- `utils/fragments/{type}/fragment-{id}.md` (for each new fragment)
