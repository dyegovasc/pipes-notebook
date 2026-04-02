---
id: fragment-request-approval
name: Request Approval
type: question
version: 1.0
domain: all
---

# Fragment: Request Approval

Asks user to approve the final structure before creating files.

## Summary to Display
- Pipeline ID and name
- Number of phases
- Number of new fragments to create
- List of files that will be created

## Question
Do you approve this structure? Should we create the files?

## Options
- approve_create: "Approve and create"
- request_changes: "Request changes"

## If Approved
Proceed to create files

## If Changes Requested
Ask which phase needs changes:
- Phase 3: Redefine phases
- Phase 4: Reidentify fragments
- Phase 5: Recompute structure
