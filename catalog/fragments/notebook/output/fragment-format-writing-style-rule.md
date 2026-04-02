---
id: fragment-format-writing-style-rule
type: output
name: Format Writing Style Rule
version: 1.0
domain: notebook
---

# Fragment: Format Writing Style Rule

## Format

The `rule-writing-style.md` file must follow this structure:

```
---
id: rule-writing-style
name: Writing Style
type: notebook
version: 1.0
description: {one-line summary of tone and key constraints}
---
# Rule: Writing Style

{Brief intro — what this rule enforces}

## Tone

{Description of desired voice and tone}

## Banned Words         ← omit section if none specified

- word or phrase
- word or phrase

## Banned Patterns      ← omit section if none specified

- pattern description
- pattern description

## Formatting           ← omit section if none specified

- formatting constraint
- formatting constraint

## Domain Exceptions    ← omit section if none specified

{Domain-specific overrides}

## Trigger Conditions

This rule applies to all writing output produced in this notebook.
```

## Template

Rules for the formatted output:

- Frontmatter `description` must be a single line summarising tone + key constraints
- Omit any section entirely if the corresponding preference was not specified by the user — do not include empty sections
- The rule must only reflect preferences the user explicitly confirmed
- `Trigger Conditions` section is always present
