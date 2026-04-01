---
id: rule-question-options-format
name: Question Options Format
type: universal
version: 1.0
---

# Rule: Question Options Format

Enforces machine-readable options in question fragments for tool-based delivery.

## Purpose

Question fragments that define `## Options` MUST use a key-value format that can be parsed and delivered via `AskUserQuestion`. This enables agents (Claude Code, Codex, Copilot) to present options as interactive choices rather than prose text.

## Format Specification

Options MUST use the structured key-value format:

```markdown
## Options
- option-key: "Short label"
- option-key: "Short label"
```

### Requirements

- Each option uses a **key** (snake_case, no spaces) mapped to a **label** (short, readable text)
- Keys are used for programmatic handling; labels are shown to the user
- At least 2 options required when `## Options` is present
- An "Other" option with key `other` is RECOMMENDED when freeform input may be needed

### Valid Examples

```markdown
## Options
- personal: "Personal"
- mindera_work: "Mindera Work"
- side_projects: "Side Projects"
- other: "Something else"
```

### Invalid Examples

```markdown
## Options
- Personal domain
- Work projects     (no key:label format)
- side-projects
```

## Trigger Conditions

This rule runs when:
1. Any question fragment is created or modified
2. Any pipeline references a question fragment

## Validation Checks

For each question fragment with an `## Options` section:

- [ ] All options use `key: "label"` format (not prose or bare list items)
- [ ] Keys contain only `a-z`, `_`, and `0-9` (no hyphens, spaces, or special chars)
- [ ] Labels are non-empty strings
- [ ] At least 2 options present

## Report Format

```
Question Options Format Validation
=================================

Checked: <N> question fragments with options
Passed: <N>
Errors: <N>

[if errors]
Errors:
- .pipes/utils/fragments/question/<file>.md:
  - Line <N>: Invalid option format (expected: key: "label")

[if passed]
All question fragments use machine-readable options format.
```
