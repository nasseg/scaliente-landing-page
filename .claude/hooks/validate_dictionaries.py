#!/usr/bin/env python3
"""Validate src/dictionaries/{fr,en,de}.json.

The three dictionaries ARE the public brochure, so this checks more than syntax:

1. valid JSON            - a hand edit that breaks one file breaks the build
2. identical key sets    - drift makes a language render empty strings
3. no retired claims     - copy that was corrected once must not silently return

Usage:  validate_dictionaries.py <dictionaries-dir>
Prints one problem per line, empty output means OK. Always exits 0 so callers
decide what to do (the PostToolUse hook must never exit 2).

Shared by the Claude Code hook, the Codex hook, and the Jest test so all three
enforce exactly the same rules.
"""
import json
import os
import re
import sys

LANGS = ("fr", "en", "de")

# Each retired claim: pattern, why it is wrong, where the truth lives.
# Add a row here whenever a factual error is corrected, so it cannot come back.
RETIRED_CLAIMS = [
    (
        r"\b20 (commandes|orders|Bestellungen)/(mois|month|Monat)",
        "the Discovery cap is 50 orders, not 20",
        "customerPro/src/config/plans.js",
    ),
    (
        r"commission (a vie|à vie|lifetime)|lebenslange Provision|15\s?%\s?(a vie|à vie|lifetime|lebenslang)",
        "affiliate commission is capped at 12 months and is 20%, not 15% lifetime",
        "customerPro/src/config/affiliate.js (COMMISSION_DURATION_MONTHS)",
    ),
    (
        r"aucun script n.est inject|no script is injected|kein Skript in Ihren Storefront",
        "the Web Pixel extension does run on the storefront",
        "customerPro/src/lib/shopify/webPixel.js",
    ),
    (
        r"toutes les 5 minutes|every 5 minutes|alle 5 Minuten",
        "ad spend syncs 1-2x per day, not every 5 minutes",
        "customerPro/vercel.json (sync-ad-spend cron)",
    ),
    (
        r"5\+ (plateformes|ad platforms|Werbeplattformen)",
        "there are exactly 5 ad platforms, not more",
        "customerPro/src/lib/ads/platform-registry.js",
    ),
    (
        r"ADN europ|European DNA|europäische[rsn]? DNA",
        "the registered company is in Wyoming, USA - only claim data residency",
        "landing legalPage.sections.mentions.headquarters_value",
    ),
]


def flatten(node, prefix=""):
    if isinstance(node, dict):
        for key, value in node.items():
            yield from flatten(value, f"{prefix}.{key}" if prefix else key)
    elif isinstance(node, list):
        for index, value in enumerate(node):
            yield from flatten(value, f"{prefix}[{index}]")
    else:
        yield prefix, node


def validate(directory):
    problems = []
    loaded = {}

    for lang in LANGS:
        path = os.path.join(directory, f"{lang}.json")
        if not os.path.exists(path):
            problems.append(f"{lang}.json is missing")
            continue
        try:
            with open(path, encoding="utf-8") as handle:
                loaded[lang] = json.load(handle)
        except json.JSONDecodeError as exc:
            problems.append(f"{lang}.json is not valid JSON: line {exc.lineno}, {exc.msg}")

    if len(loaded) != len(LANGS):
        return problems

    keysets = {lang: {key for key, _ in flatten(data)} for lang, data in loaded.items()}
    reference = keysets["fr"]
    for lang in ("en", "de"):
        missing = sorted(reference - keysets[lang])
        extra = sorted(keysets[lang] - reference)
        if missing:
            problems.append(
                f"{lang}.json misses {len(missing)} key(s) present in fr: " + ", ".join(missing[:5])
            )
        if extra:
            problems.append(
                f"{lang}.json has {len(extra)} key(s) absent from fr: " + ", ".join(extra[:5])
            )

    for lang, data in loaded.items():
        for key, value in flatten(data):
            if not isinstance(value, str):
                continue
            for pattern, why, truth in RETIRED_CLAIMS:
                if re.search(pattern, value, re.IGNORECASE):
                    problems.append(f"{lang}.json {key}: {why} (source of truth: {truth})")

    return problems


def main():
    if len(sys.argv) < 2:
        print("usage: validate_dictionaries.py <dictionaries-dir>", file=sys.stderr)
        return 0
    for problem in validate(sys.argv[1]):
        print(problem)
    return 0


if __name__ == "__main__":
    sys.exit(main())
