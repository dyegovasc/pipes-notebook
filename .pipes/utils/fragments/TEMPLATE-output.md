---
id: TEMPLATE
type: output
name: <Output Name>
version: 1.0
domain: <all|domain-name>
---

# Fragment: <Name>

One-sentence description of what this fragment formats/presents.

## Format

Description of the output format (prose, table, code block, etc.).

## Template

The actual template with placeholders:

```markdown
## Section Header

**Field 1:** <placeholder-1>

**Field 2:** <placeholder-2>

### Subsection

- Item: <placeholder-3>
- Item: <placeholder-4>
```

## Example

Realistic example with sample values:

```markdown
## User Story

**Title:** Implement dark mode toggle

**Objective:** Allow users to switch between light and dark themes

### Acceptance Criteria

- [ ] Toggle appears in settings
- [ ] Selection persists across sessions
```

## Variables

List of placeholders and their sources:

| Placeholder | Source | Required |
|-------------|--------|----------|
| `<placeholder-1>` | From fragment X | Yes |
| `<placeholder-2>` | From fragment Y | No |
