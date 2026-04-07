---
id: fragment-format-implementation-plan
name: Format Implementation Plan
type: output
version: 1.0
domain: codebase
---

# Fragment: Format Implementation Plan

Formats all gathered planning data into a structured implementation plan markdown document.

## Output Format

```markdown
---
feature: {feature_description}
created: {date}
status: draft
---

# Plan: {short-description}

## Feature Summary
{feature_description}

## Requirements
{requirements list}

## Success Criteria
{success_criteria list}

## Scope
**In Scope:** {in_scope}
**Out of Scope:** {out_of_scope}
**Safety Constraints:** {safety_constraints}

## Context
**Stack:** {stack_baseline}
**Architecture:** {architecture_baseline}
**Affected Components:** {affected_components}
**Blast Radius:** {blast_radius_rating} — {blast_radius_justification}

## Solution Architecture
{architecture_description}

### Data Flow
{data_flow}

### Impacted Files
| File | Action | Description |
|------|--------|-------------|
{impacted_files table}

## Implementation Steps
{implementation_steps numbered list}

## Test Strategy
### Unit Tests
{unit_tests}

### Integration Tests
{integration_tests}

### E2E Tests
{e2e_tests}

### Edge Cases
{edge_cases}

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
{risks table}

**Reversible:** {reversible}
**Blockers:** {blockers}

## Acceptance Criteria
{confirmed success_criteria}
```

## File Naming

Generate the filename as: `{number}-plan-{short-description}.md`

- `{number}`: zero-padded count of existing files in `.pipes/plans/` + 1 (e.g. `001`, `002`)
- `{short-description}`: kebab-case summary of the feature (e.g. `user-auth`, `payment-webhook`)

## Instructions

1. Populate every section from the outputs captured across all prior phases
2. Do not leave any section empty — use "None identified" if applicable
3. Display the full formatted document to the user before requesting approval
4. Do not write the file — file creation is handled by `fragment-create-files`
