---
paths: ["AGENTS.md", "CLAUDE.md", ".claude/**", ".codex/**", ".agents/**"]
---

# Where new information goes

This repo is driven by four agents (Claude Code, Codex, opencode, Cursor). The
config is built so one artefact serves all of them. Adding knowledge in the wrong
place either breaks that, or makes it invisible to Codex.

## Portability decides the mechanism

| Mechanism | Claude Code | Codex | opencode | Cursor | Use for |
|---|:--:|:--:|:--:|:--:|---|
| Jest test | yes | yes | yes | yes | anything that must never regress |
| Skill (`.agents/skills/`) | yes | yes | yes | yes | procedures, domain knowledge |
| Hook (`.claude/hooks/`) | yes | yes | partial | no | mechanical enforcement |
| Rule with `paths:` | yes | no | no | no | Claude-only governance (this file) |

**Anything load-bearing MUST be a test or a skill.** A `paths:` rule is invisible
to Codex, so it must never be the only place a critical constraint lives.

## Routing

- **A factual claim about the product** (price, limit, feature, competitor) →
  the `landing-marketing-claims` skill, **and** a retired-claim row in
  `src/lib/__tests__/dictionaries.test.js` + `.claude/hooks/validate_dictionaries.py`.
- **A visual/theming rule** → the `landing-theming` skill.
- **A mistake made twice** → make it mechanical. A test if it can be asserted, a
  hook if it must block at edit time. Never a paragraph in AGENTS.md hoping it is read.
- **A new command, path or version** → AGENTS.md, replacing the stale line.
- **Anything else** → a skill. AGENTS.md is an index, not a manual.

## AGENTS.md invariants

- Stays under ~120 lines. It loads on every session, in every tool.
- `CLAUDE.md` is a **symlink** to it — never turn it back into a real file, that
  reintroduces the drift the symlink exists to prevent.
- Names exact tools and versions (`Next.js 16.1.6`, `Jest 30`), never categories
  ("the test runner"). Version claims must match `package.json`.
- Keep every NEVER. They are there because the mistake was already made.

## Hooks

- Live in `.claude/hooks/`; `.codex/hooks` is a **symlink** to that directory so
  the two agents cannot diverge. Never copy a hook into `.codex/`.
- `.codex/hooks.json` needs absolute paths; `.claude/settings.json` uses
  `$CLAUDE_PROJECT_DIR`. Wiring a new hook means editing both.
- PreToolUse: `exit 2` blocks. PostToolUse: never `exit 2` — emit
  `{"decision":"block","reason":...}` and exit 0.
- Any hook change must be re-tested with realistic payloads before being trusted.

## Skills

- One copy in `.agents/skills/<name>/SKILL.md`, symlinked into `.claude/skills/`,
  `.opencode/skills/`, `.cursor/skills/`, `.gemini/skills/`.
- **Never keep a project skill whose name also exists in `~/.claude/skills/`** —
  personal overrides project, so the project copy never runs and drifts silently.
  Check before adding a skill; rename it if it collides.
