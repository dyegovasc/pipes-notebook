---
id: fragment-report-entrypoint-results
name: Report Entrypoint Results
type: output
version: 1.0
domain: all
---

# Fragment: Report Entrypoint Results

Summarizes what the assembly script did and suggests next steps.

## Format

Present results as a table followed by contextual guidance.

## Template

```markdown
## Entrypoint Assembly Results

| File                            | Action                  | Lines |
|---------------------------------|-------------------------|-------|
| CLAUDE.md                       | <action>                | <n>   |
| AGENTS.md                       | <action>                | <n>   |
| .github/copilot-instructions.md | <action>                | <n>   |

Sources: <n> canonical files, <n> rules

### Next Steps
- Review the generated entrypoints
- If any files had sections appended (first merge), verify the placement works with existing content
- Commit: `git add CLAUDE.md AGENTS.md .github/copilot-instructions.md`
- To regenerate later: run `pipeline-regenerate-agent-entry-points`
```
