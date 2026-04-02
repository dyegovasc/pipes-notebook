---
id: fragment-ask-commit-preferences
type: question
name: Ask Commit Preferences
version: 1.0
domain: codebase
---

# Fragment: Ask Commit Preferences

## Question

What are the commit safety requirements for this project? Help the agent generate a tailored commit guardrails rule.

Please answer the following:

1. **VCS** — What version control system does this project use? (git is assumed — confirm or specify otherwise)
2. **Package manager** — Which package manager does this project use? (e.g. npm, pnpm, yarn, pip, cargo, go modules)
3. **Secret patterns** — What secret or credential formats are relevant to this stack? (e.g. AWS keys, API tokens, `.env` files, private keys, JWT secrets). Common patterns to consider:
   - Any `.env` or `.env.*` files
   - Files containing `SECRET`, `TOKEN`, `KEY`, `PASSWORD` in their name
   - Private key files (`.pem`, `.p12`, `.key`)
   - Cloud provider credential files (`~/.aws/credentials`, service account JSON)
4. **Large file thresholds** — Is there a file size limit for commits? (e.g. no files over 5MB)
5. **Environment file conventions** — Any `.env` naming conventions to enforce? (e.g. only `.env.example` allowed, never `.env.local`)
6. **Existing hooks or CI checks** — Are there pre-commit hooks, CI lint steps, or secret scanning tools already in place? (e.g. Husky, lefthook, GitHub secret scanning, git-secrets)
7. **Anything else** — Any other commit safety requirements specific to this project?

## Capture

Record the following from the user's response:

- `vcs`: version control system in use
- `package_manager`: package manager used
- `secret_patterns`: list of secret patterns and file types to block
- `large_file_threshold`: max file size for commits (null if not specified)
- `env_conventions`: rules about .env files
- `existing_hooks`: existing safety tooling already in place
- `extra_requirements`: any other commit safety requirements

## Options

- git: "Git"
- git_svn: "Git with SVN bridge"
- other: "Other VCS"

## Guidelines

- The secret patterns listed are suggestions — the user should confirm which apply to their stack
- If existing hooks already cover a check, note it in the rule without duplicating the enforcement logic
- If the user's stack is not Node.js, adjust away from Node.js-centric patterns
