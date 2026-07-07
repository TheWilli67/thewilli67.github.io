#!/usr/bin/env python3
"""
Strip em dashes (—) from HTML files EXCEPT inside heading tags (h1/h2/h3) and <title>.

Strategy: replace protected regions (heading + title tags) with placeholders,
perform global em-dash substitutions on the rest, then restore placeholders.
This preserves the file's original bytes / formatting exactly outside the
substitutions themselves.

Replacements applied outside protected tags:
  " — "  -> " "    (dash between spaces: collapse to single space)
  " —"   -> ""     (trailing dash: remove entirely)
  "— "   -> ""     (leading dash: remove entirely)
  "—"    -> ""     (bare dash: remove entirely)
"""
import re
import sys
from pathlib import Path

PROTECTED_TAGS = ("h1", "h2", "h3", "title")


def build_protected_pattern():
    # Match <tag ...>...</tag> non-greedy for each protected tag.
    # Case-insensitive on tag names.
    alt = "|".join(PROTECTED_TAGS)
    # DOTALL so .*? crosses newlines (headings can be multi-line in practice)
    return re.compile(
        rf"<(?P<tag>{alt})\b[^>]*>.*?</(?P=tag)>",
        re.IGNORECASE | re.DOTALL,
    )


def normalize_dashes(s: str) -> str:
    # Order matters: handle padded case first so we don't turn " — " into two removals.
    s = s.replace(" — ", " ")
    s = s.replace(" —", "")
    s = s.replace("— ", "")
    s = s.replace("—", "")
    return s


def process_content(content: str) -> tuple[str, int]:
    """Return (new_content, num_removed)."""
    pattern = build_protected_pattern()
    placeholders = []

    def stash(match):
        placeholders.append(match.group(0))
        return f"\x00PROTECTED{len(placeholders) - 1}\x00"

    stashed = pattern.sub(stash, content)

    before = stashed.count("—")
    modified = normalize_dashes(stashed)
    after = modified.count("—")

    # Restore placeholders
    def restore(match):
        idx = int(match.group(1))
        return placeholders[idx]

    restored = re.sub(r"\x00PROTECTED(\d+)\x00", restore, modified)

    return restored, before - after


def process_file(path: Path) -> int:
    original = path.read_text(encoding="utf-8")
    new_content, removed = process_content(original)

    if new_content != original:
        # Preserve original line endings by writing with the same bytes
        path.write_text(new_content, encoding="utf-8", newline="")
    return removed


def main():
    if len(sys.argv) < 2:
        print("Usage: python strip_emdash.py <file1.html> [<file2.html> ...]")
        sys.exit(1)

    total_removed = 0
    for arg in sys.argv[1:]:
        p = Path(arg)
        if not p.exists():
            print(f"[skip] {p} — not found")
            continue
        removed = process_file(p)
        total_removed += removed
        remaining = p.read_text(encoding="utf-8").count("—")
        print(f"[ok] {p.name}: removed {removed}, remaining {remaining} (inside protected tags)")

    print(f"\nTotal removed: {total_removed}")


if __name__ == "__main__":
    main()
