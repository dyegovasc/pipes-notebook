---
id: fragment-validate-pipes-sources
name: Validate Pipes Sources
type: validation
version: 1.0
domain: all
---

# Fragment: Validate Pipes Sources

Confirms that .pipes/ai-instructions/ and .pipes/utils/rules/ contain the files needed for assembly.

## Checks

### ai-instructions
- [ ] `.pipes/ai-instructions/` directory exists
- [ ] At least one `.md` file is present
- [ ] `core.md` exists (required for precedence)

### rules
- [ ] `.pipes/utils/rules/` directory exists (may be empty)

### assembly script
- [ ] `.pipes/utils/scripts/assemble-instructions.js` exists

## Acceptance Criteria

- [ ] ai-instructions contains at least `core.md`
- [ ] Assembly script is present and executable
- [ ] All found files are readable
