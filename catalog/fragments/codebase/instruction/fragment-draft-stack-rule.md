---
id: fragment-draft-stack-rule
name: Draft Stack Rule
type: instruction
version: 1.0
domain: codebase
---

# Fragment: Draft Stack Rule

Composes the complete `rule-codebase-stack.md` content from confirmed project inputs, using `fragment-format-stack-rule` as the structural template.

## Instructions

1. **Verify preconditions:**
   - Phase 4 (reframe + confirm) has been completed and confirmed by the user
   - All required inputs are available: `project_name`, `project_type`, `primary_language`, `runtime`, `tech_stack`, `architecture`, `best_practices`, `dos`, `donts`
   - `mode` is set (create or update)

2. **In create mode:**
   - Build the full rule file from scratch using `fragment-format-stack-rule`
   - Populate every section with the gathered inputs
   - Leave a section with a placeholder comment if the user gave no input for it (e.g., `# No conventions defined`)

3. **In update mode:**
   - Start from the existing content
   - Merge new information into existing sections
   - Add sections that were previously missing
   - Do not remove or overwrite existing entries without a clear reason from user input
   - Preserve any manually written notes the user may have added to the existing rule
   - If there is a conflict between old and new information, keep the new version and note the change

4. **Rule quality checks:**
   - Each Don't should be specific, not vague ("don't use `any`" not "write clean TypeScript")
   - Each best practice should be actionable
   - If a Don't has an approved alternative, include it inline
   - Stack entries should include version numbers when relevant

5. **Present the draft:**
   - Show the complete draft rule in a code block or readable format
   - Do not write to disk — this is a preview only

## Inputs

- `project_name`, `project_type`, `primary_language`, `runtime`
- `tech_stack`, `architecture`, `best_practices`, `dos`, `donts`, `conventions`
- `mode`: `create` | `update`
- `existing_content`: current file content (update mode only)

## Output

- Complete draft of `rule-codebase-stack.md` ready for user review
- Summary of changes made (update mode): sections added, sections updated, count of new entries
