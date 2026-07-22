#!/bin/bash
# check-dictionaries.sh — PostToolUse:Edit|Write on src/dictionaries/*.json
#
# Thin wrapper: all rules live in validate_dictionaries.py, shared with the
# Jest test so the hook and CI can never disagree.
#
# PostToolUse contract: never exit 2. Feedback = exit 0 + JSON decision:block.
# Shared with Codex via .codex/hooks -> ../.claude/hooks (symlink).

INPUT=$(cat)
FILE=$(printf '%s' "$INPUT" | jq -r '.tool_input.file_path // empty')

case "$FILE" in
  *src/dictionaries/*.json) ;;
  *) exit 0 ;;
esac

HOOK_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)
PROBLEMS=$(python3 "$HOOK_DIR/validate_dictionaries.py" "$(dirname "$FILE")")

if [ -n "$PROBLEMS" ]; then
  jq -n --arg reason "$PROBLEMS" '{
    decision: "block",
    reason: ("Dictionary check failed:\n" + $reason + "\n\nEdit by JSON path (python3 json.load -> set -> json.dump ensure_ascii=False indent=4), never with sed. Then run: npx jest dictionaries. See .agents/skills/landing-marketing-claims.")
  }'
fi

exit 0
