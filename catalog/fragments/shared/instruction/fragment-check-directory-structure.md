---
id: fragment-check-directory-structure
name: Check Directory Structure
type: instruction
version: 1.0
domain: all
---

# Fragment: Check Directory Structure

Verifies the notebook directory structure matches CLAUDE.md definition.

## Expected Structure
```
notebook/
├── CLAUDE.md
├── domains/
│   ├── personal/
│   ├── work/
│   ├── side-projects/
│   ├── dj-projects/
│   └── sales/
└── utils/
    ├── fragments/
    │   ├── context/
    │   ├── instruction/
    │   ├── validation/
    │   ├── output/
    │   └── question/
    └── pipelines/
```

## Instructions

1. **Verify root directories exist:**
   - `domains/`
   - `utils/`

2. **Verify domain subdirectories exist:**
   - `domains/personal/`
   - `domains/work/`
   - `domains/side-projects/`
   - `domains/dj-projects/`
   - `domains/sales/`

3. **Verify utils subdirectories exist:**
   - `utils/fragments/context/`
   - `utils/fragments/instruction/`
   - `utils/fragments/validation/`
   - `utils/fragments/output/`
   - `utils/fragments/question/`
   - `utils/pipelines/`
   - `utils/rules/`

4. **Identify unexpected directories** not in the expected structure

## Output
Report missing directories and extra directories found.
