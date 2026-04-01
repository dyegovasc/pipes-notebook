---
id: rule-validate-fragment-types
name: Validate Fragment Types
type: universal
version: 1.0
---

# Rule: Validate Fragment Types

Validates that all fragments conform to their declared type's required structure.

## Type Requirements

Each fragment type MUST have these exact sections (case-sensitive):

| Type | Required Sections | Optional Sections |
|------|-------------------|-------------------|
| `context` | `## Background`, `## Structure` | `## Key Terms`, `## Usage Notes` |
| `instruction` | `## Instructions`, `## Output` | `## Inputs`, `## Next Step` |
| `validation` | `## Checks`, `## Acceptance Criteria` | `## Decision Tree`, `## Failure Handling` |
| `output` | `## Format`, `## Template` | `## Example`, `## Variables` |
| `question` | `## Question`, `## Capture` | `## Options`, `## Guidelines`, `## Validation` |

## Trigger Conditions

This rule runs when:
1. Any fragment file is created or modified
2. When explicitly invoked via validation pipeline

## Validation Checks

For each fragment file:

### Frontmatter Check
- [ ] Has required fields: `id`, `type`, `name`, `version`, `domain`
- [ ] `type` is one of: `context`, `instruction`, `validation`, `output`, `question`
- [ ] `id` matches filename pattern: `fragment-{id}.md`

### Structure Check
- [ ] All required sections for the type are present
- [ ] No section names have typos (common: "Output" vs "Outputs")
- [ ] Checkboxes in `validation` type use proper markdown: `- [ ]`

### Type Conformity Check
- [ ] `validation` fragments have at least one checklist
- [ ] `output` fragments have code blocks for templates
- [ ] `question` fragments have actual question text
- [ ] `instruction` fragments have numbered steps
- [ ] `context` fragments define structure or background

## Report Format

On validation:

```
Fragment Type Validation
========================

Checked: <N> fragments
Passed: <N>
Warnings: <N>
Errors: <N>

[if errors]
Errors:
- .pipes/utils/fragments/<type>/<file>.md:
  - Missing required section: ## <Section>

[if passed]
All clear! All fragments conform to type specifications.
```

## Auto-Fix

For minor issues, the rule may suggest fixes:
- Missing section headers can be templated
- Typos in section names can be corrected
- Type mismatches can be flagged for review
