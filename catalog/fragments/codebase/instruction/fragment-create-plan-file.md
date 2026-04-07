---
id: fragment-create-plan-file
name: Create Plan File
type: instruction
version: 1.0
domain: codebase
---

# Fragment: Create Plan File

Creates the approved implementation plan artifact in `.pipes/plans/`.

## Instructions

1. **Verify preconditions:**
   - The formatted plan has been shown to the user
   - The user explicitly approved writing it to disk
2. **Ensure the target directory exists** — `.pipes/plans/`
3. **Compute the next file number** — count existing plan files and generate the next zero-padded prefix
4. **Generate the filename** — `{number}-plan-{short-description}.md`
5. **Write the formatted plan document** to `.pipes/plans/{number}-plan-{short-description}.md`
6. **Confirm success** — verify that the file exists and report the final path

## Output

- `plan_file_path`: final path of the created plan artifact
- `plan_file_number`: zero-padded plan number
- `plan_file_created`: `true` | `false`
