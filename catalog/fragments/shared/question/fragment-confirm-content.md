---
id: fragment-confirm-content
name: Confirm Content
type: question
version: 1.0
domain: work
---

# Fragment: Confirm Content

Ask user to confirm the file content before saving.

## Question
Is the content correct? Please review the file preview above.

## Options
- yes_save: "Yes, save it"
- no_cancel: "No, cancel"

## If Confirmed
Proceed to `fragment-confirm-location`

## If Cancelled
Return to Phase 4 (Handle Next Action)
