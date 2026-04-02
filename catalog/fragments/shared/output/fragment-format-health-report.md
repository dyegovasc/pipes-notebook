---
id: fragment-format-health-report
name: Format Health Report
type: output
version: 1.0
domain: all
---

# Fragment: Format Health Report

Formats the health check results for display.

## Report Format
```markdown
# Notebook Health Report

## Summary
- Total checks: N
- Passed: N
- Failed: N

## Issues Found

### Directory Structure
<!-- issues or "All clear" -->

### Naming Conventions
<!-- issues or "All clear" -->

### Frontmatter
<!-- issues or "All clear" -->

### Fragment Format
<!-- issues or "All clear" -->

### Pipeline Format
<!-- issues or "All clear" -->

## Recommendations
<!-- specific fixes if issues found -->
```

## Status Icons
- ✅ Pass
- ❌ Fail
- ⚠️ Warning

## Instructions
1. Group issues by category
2. List file paths for each issue
3. Provide specific fix for each issue
4. If no issues, show "All clear" per category
