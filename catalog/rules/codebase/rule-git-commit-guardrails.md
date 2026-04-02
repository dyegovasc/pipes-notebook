---
id: rule-git-commit-guardrails
name: Git Commit Guardrails
type: codebase
version: 1.0
---

# Rule: Git Commit Guardrails

Before committing or pushing to git, run these checks to prevent exposing secrets, credentials, or bloated artifacts.

## Trigger Conditions

This rule activates when ANY of the following occur:

1. **Commit staged** — User is about to run `git commit`
2. **Push requested** — User is about to run `git push`
3. **Staging files** — User runs `git add` on files not yet reviewed
4. **Pre-commit hook** — A pre-commit check is being assembled or generated

## Checks to Run

### 1. Secrets and Keys

Scan staged files for patterns that indicate secrets, API keys, or credentials:

- Strings matching common key patterns: `sk-`, `pk_`, `AKIA`, `Bearer `, `token`, `secret`, `password`, `api_key`, `apikey`, `private_key`, `-----BEGIN`
- `.pem`, `.p12`, `.pfx`, `.key` files staged
- Hardcoded credentials in config files (e.g. `username:password@host`)

**If found:** BLOCK commit and alert:

```
BLOCKED: Potential secret detected in <file> at line <n>.
Pattern matched: <pattern>
Action required: Remove the value. Use environment variables or a secrets manager instead.
Add <file> to .gitignore if it should never be tracked.
```

### 2. Environment Files

Check if any of the following files are staged:

- `.env`
- `.env.local`
- `.env.development`
- `.env.production`
- `.env.test`
- Any file matching `.env.*`

**If found:** BLOCK commit and alert:

```
BLOCKED: Environment file staged for commit: <file>
Action required: Unstage it with: git restore --staged <file>
Add it to .gitignore:
  echo "<file>" >> .gitignore
```

### 3. node_modules

Check if any path under `node_modules/` is staged.

**If found:** BLOCK commit and alert:

```
BLOCKED: node_modules detected in staged files.
Action required: Unstage with: git rm -r --cached node_modules
Add to .gitignore:
  echo "node_modules/" >> .gitignore
```

## .gitignore Recommendations

If any check fails, suggest reviewing or creating a `.gitignore` with at minimum:

```
# Dependencies
node_modules/

# Environment files
.env
.env.local
.env.*.local
.env.development
.env.production
.env.test

# Secrets and keys
*.pem
*.key
*.p12
*.pfx
```

## Exceptions

Do NOT block when:

- The file is explicitly named `*.example` or `*.sample` (e.g. `.env.example`)
- The secret-like string is inside a comment or documentation file with no sensitive value (e.g. `# set your API_KEY here`)
- The user explicitly confirms with `--allow-secrets` flag after reviewing the alert

## Output Format

On clean pass:

```
Git guardrails: all checks passed. Safe to commit.
```

On failure:

```
Git guardrails: <count> issue(s) found — commit blocked.
- <check>: <file> — <reason>
Run the suggested actions above before retrying.
```
