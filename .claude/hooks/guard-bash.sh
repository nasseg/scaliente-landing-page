#!/bin/bash
# guard-bash.sh — PreToolUse:Bash guard for the Scaliente landing page.
# exit 2 = block. permissionDecision "ask" = confirm with the user.
#
# Blocks, in order of how often they actually destroy work:
#   - WIP-destroyers: checkout <ref> -- <path>, reset --hard, clean -f,
#     restore --source, stash drop/clear
#   - push --force (--force-with-lease allowed), --no-verify, --no-gpg-sign
#   - rm -r on src/, .agents/, .claude/, .codex/, .git/
#   - sed/perl -i on src/dictionaries/** (breaks JSON / desyncs languages)
#   - obvious hardcoded API keys
# Asks before: push/merge to main, branch -D.
#
# Shared verbatim with Codex via .codex/hooks -> ../.claude/hooks (symlink).
# Behaviour is covered by 20 payload tests — re-run them after any edit.

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if [ -z "$COMMAND" ]; then
  exit 0
fi

# --- Git: force push (allow --force-with-lease) ---
if echo "$COMMAND" | grep -q '\-\-force' && ! echo "$COMMAND" | grep -q '\-\-force-with-lease'; then
  if echo "$COMMAND" | grep -q 'git push'; then
    echo "BLOCKED: git push --force is forbidden. Use --force-with-lease if absolutely needed, and only after user confirmation." >&2
    exit 2
  fi
fi

# --- Git: push to main/master ---
if echo "$COMMAND" | grep -qE 'git push.*(main|master)'; then
  jq -n '{
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "ask",
      permissionDecisionReason: "AGENTS.md rule: NEVER push/merge to main on own initiative. Confirm this was explicitly requested by the user."
    }
  }'
  exit 0
fi

# --- Git: merge to main/master ---
if echo "$COMMAND" | grep -qE 'git merge.*(main|master)|gh pr merge'; then
  jq -n '{
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "ask",
      permissionDecisionReason: "AGENTS.md rule: NEVER merge to main without explicit user request. Confirm this was requested."
    }
  }'
  exit 0
fi

# --- Git: destructive operations ---
if echo "$COMMAND" | grep -q 'git reset --hard'; then
  echo "BLOCKED: git reset --hard is a destructive operation. Consider git stash or a safer alternative." >&2
  exit 2
fi

if echo "$COMMAND" | grep -qE 'git clean.*-.*f'; then
  echo "BLOCKED: git clean -f is destructive. Investigate files before removing." >&2
  exit 2
fi

# checkout with a pathspec overwrites/discards WIP: `git checkout -- <path>` AND
# `git checkout <ref> -- <path>` (e.g. `git checkout origin/main -- .` — the 2026-07-16
# incident that clobbered uncommitted work; the old `-- \.`-only pattern missed it).
if echo "$COMMAND" | grep -qE 'git checkout( [^ ]+)* -- '; then
  echo "BLOCKED: git checkout ... -- <path> overwrites/discards uncommitted changes (incl. 'git checkout <ref> -- .'). Review with git diff or save with git stash first." >&2
  exit 2
fi

# restore-from-a-ref overwrites WIP (allow --staged, which only unstages)
if echo "$COMMAND" | grep -qE 'git restore ([^ ]*--source|[^ -][^ ]* -- )'; then
  echo "BLOCKED: git restore --source / restore <ref> -- <path> overwrites files from a ref. Commit or git stash first." >&2
  exit 2
fi

# stash drop/clear permanently deletes saved work
if echo "$COMMAND" | grep -qE 'git stash (drop|clear)'; then
  echo "BLOCKED: git stash drop/clear permanently deletes saved work. Check git stash list first." >&2
  exit 2
fi

if echo "$COMMAND" | grep -q 'git branch -D'; then
  jq -n '{
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "ask",
      permissionDecisionReason: "git branch -D force-deletes a branch. Confirm this is intended."
    }
  }'
  exit 0
fi

# --- Git: skip hooks ---
if echo "$COMMAND" | grep -q '\-\-no-verify'; then
  echo "BLOCKED: --no-verify is forbidden. Fix the underlying hook issue instead." >&2
  exit 2
fi

if echo "$COMMAND" | grep -q '\-\-no-gpg-sign'; then
  echo "BLOCKED: --no-gpg-sign is forbidden unless explicitly requested by user." >&2
  exit 2
fi

# --- rm: protect project directories ---
if echo "$COMMAND" | grep -qE 'rm .*(src|\.agents|\.claude|\.codex|\.git)(/|$| )'; then
  if echo "$COMMAND" | grep -q '\-r'; then
    echo "BLOCKED: rm -rf on critical project directories (src/, .agents/, .claude/, .codex/, .git/) is forbidden." >&2
    exit 2
  fi
fi

# --- Dictionaries: never bulk-rewrite copy with a stream editor ---
# The three dictionaries are the public brochure. sed/perl -i on them silently
# breaks JSON or desynchronises the languages (see .agents/skills/landing-marketing-claims).
if echo "$COMMAND" | grep -qE '(sed|perl) .*-i.*src/dictionaries'; then
  echo "BLOCKED: never stream-edit src/dictionaries/*.json. Edit by JSON path (python3 json.load -> set -> json.dump ensure_ascii=False indent=4), then run: npx jest dictionaries" >&2
  exit 2
fi

# --- Secrets in commands ---
if echo "$COMMAND" | grep -qE 'sk-[a-zA-Z0-9]{20,}'; then
  echo "BLOCKED: Command contains what appears to be a hardcoded API key (sk-...). Use environment variables." >&2
  exit 2
fi

if echo "$COMMAND" | grep -q 'GEMINI_API_KEY='; then
  echo "BLOCKED: Command contains a hardcoded API key. Use env vars." >&2
  exit 2
fi

exit 0
