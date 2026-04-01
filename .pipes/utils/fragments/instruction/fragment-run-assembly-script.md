---
id: fragment-run-assembly-script
name: Run Assembly Script
type: instruction
version: 1.0
domain: all
---

# Fragment: Run Assembly Script

Executes the assembly script to generate or merge Pipes Notebook sections into entrypoints.

## Instructions

1. Run the assembly script:
   ```bash
   node .pipes/utils/scripts/assemble-instructions.js
   ```

2. Capture the full output

3. Check the exit code:
   - Exit 0: success
   - Exit 1: failure (report errors and stop)

4. Display the script output to the user

## Output

The script output showing which files were processed and what action was taken for each.
