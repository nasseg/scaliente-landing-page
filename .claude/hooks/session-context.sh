#!/bin/bash
# session-context.sh — SessionStart. Prints context; stdout is injected verbatim.
#
# Surfaces what silently causes bad work on this repo:
#   - which branch, and whether it is behind main (stale tree = stale copy)
#   - uncommitted work (so a session does not clobber another's WIP)
#   - whether the dictionaries currently validate
#
# Shared with Codex via .codex/hooks -> ../.claude/hooks (symlink).

cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0
git rev-parse --git-dir >/dev/null 2>&1 || exit 0

BRANCH=$(git branch --show-current 2>/dev/null)
DIRTY=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
BEHIND=$(git rev-list --count "HEAD..origin/main" 2>/dev/null || echo 0)

printf 'Landing page — branch: %s' "${BRANCH:-detached}"
[ "$DIRTY" != "0" ] && printf ' | %s uncommitted file(s)' "$DIRTY"
[ "$BEHIND" != "0" ] && printf ' | %s commit(s) behind origin/main' "$BEHIND"
printf '\n'

if [ "$BRANCH" = "main" ]; then
  printf 'On main: branch before committing.\n'
fi

if [ -d src/dictionaries ] && [ -f .claude/hooks/validate_dictionaries.py ]; then
  PROBLEMS=$(python3 .claude/hooks/validate_dictionaries.py src/dictionaries 2>/dev/null | head -3)
  if [ -n "$PROBLEMS" ]; then
    printf 'Dictionaries currently FAIL validation:\n%s\n' "$PROBLEMS"
  fi
fi

printf 'Public brochure: every figure must match the app. Pricing -> customerPro/src/config/plans.js, affiliate -> config/affiliate.js. Invoke the landing-marketing-claims skill before editing src/dictionaries.\n'
exit 0
