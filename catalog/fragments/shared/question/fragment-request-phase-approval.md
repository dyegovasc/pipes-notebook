---
id: fragment-request-phase-approval
name: Request Phase Approval
type: question
version: 1.0
domain: all
---

# Fragment: Request Phase Approval

Asks the user whether the current phase output is good enough to proceed, needs changes, or should stop.

## Summary to Display

- Current phase name
- Key outputs from the phase
- Any assumptions or deferred items that matter before moving on

## Question
Do you want to continue with this phase output, request changes, or stop here?

## Options

- approve_continue: "Approve and continue"
- request_changes: "Request changes"
- stop_here: "Stop here"

## If Approved

Proceed to the next phase.

## If Changes Requested

Stay in the current phase, collect the requested changes, and re-present the updated phase output.

## If Stopped

Stop the pipeline without advancing.
