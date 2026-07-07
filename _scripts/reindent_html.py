#!/usr/bin/env python3
"""
Re-indent an HTML file by walking through lines and recomputing depth based on
opening/closing tags. Preserves content exactly, only changes leading whitespace.

Heuristics:
  - A line's depth is the current stack depth BEFORE the line's tags are counted.
  - Void tags (br, hr, img, meta, link, input, etc.) don't push.
  - Lines with only text or with a mix are indented at the parent's depth.
  - Content inside <style> and <script> and <pre> is left untouched (kept as is).
"""
import re
import sys
from pathlib import Path

INDENT = "  "  # 2 spaces per level
VOID_TAGS = {"area", "base", "br", "col", "embed", "hr", "img", "input",
             "link", "meta", "param", "source", "track", "wbr"}
# Elements whose CONTENT we do not touch (only their opening/closing lines are re-indented)
RAW_CONTENT_TAGS = {"style", "script", "pre", "textarea"}

# Match a start or end tag on a line. Not perfect but works for well-formed HTML.
TAG_RE = re.compile(r"<(/?)([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*?(/?)>")


def strip_leading_ws(line: str) -> str:
    return line.lstrip(" \t")


def analyze_tags(line: str):
    """Return (opens, closes, net_delta) for a line, ignoring void self-closing tags."""
    opens = closes = 0
    for m in TAG_RE.finditer(line):
        is_close = (m.group(1) == "/")
        tag = m.group(2).lower()
        self_close = (m.group(3) == "/")
        if is_close:
            closes += 1
        else:
            if tag in VOID_TAGS or self_close:
                pass  # doesn't affect depth
            else:
                opens += 1
    return opens, closes


def line_starts_with_close(line: str) -> bool:
    stripped = line.lstrip()
    return stripped.startswith("</")


def reindent(content: str) -> str:
    lines = content.splitlines(keepends=False)
    out = []
    depth = 0
    inside_raw = None  # name of the raw content tag we're currently inside, or None

    for raw_line in lines:
        # If we're inside a raw content tag, preserve its content lines verbatim
        # BUT re-indent the closing tag line
        if inside_raw:
            stripped = raw_line.lstrip()
            # Detect end of raw block
            if stripped.startswith(f"</{inside_raw}"):
                # Re-indent this closing line at the parent depth (depth was already decremented mentally)
                # We treat depth as if the raw tag were a normal one: depth is currently "inside" so parent = depth - 1
                new_line = INDENT * (depth - 1) + stripped
                out.append(new_line)
                depth -= 1
                inside_raw = None
            else:
                # keep the raw content line untouched (do not strip or re-indent)
                out.append(raw_line)
            continue

        stripped = raw_line.lstrip()

        if stripped == "":
            out.append("")
            continue

        # Check if the line starts with a closing tag - it belongs to parent depth
        starts_close = stripped.startswith("</")

        opens, closes = analyze_tags(raw_line)

        # Line's effective depth:
        # - If it starts with a close tag, use depth - 1 (align with the open)
        # - Otherwise use current depth
        if starts_close:
            line_depth = max(depth - 1, 0)
        else:
            line_depth = depth

        new_line = INDENT * line_depth + stripped
        out.append(new_line)

        # Update depth for next line
        net = opens - closes
        depth = max(depth + net, 0)

        # Check if this line opens a raw content tag WITHOUT closing it on the same line
        # (e.g. `<style>` on its own line)
        for m in TAG_RE.finditer(raw_line):
            if m.group(1) == "":
                tag = m.group(2).lower()
                if tag in RAW_CONTENT_TAGS:
                    # Check if the raw tag also closes on this line
                    rest = raw_line[m.end():]
                    if f"</{tag}" not in rest.lower():
                        inside_raw = tag
                    break

    return "\n".join(out) + ("\n" if content.endswith("\n") else "")


def main():
    if len(sys.argv) < 2:
        print("Usage: python reindent_html.py <file.html>")
        sys.exit(1)

    for arg in sys.argv[1:]:
        p = Path(arg)
        if not p.exists():
            print(f"[skip] {p} not found")
            continue
        original = p.read_text(encoding="utf-8")
        new_content = reindent(original)
        p.write_text(new_content, encoding="utf-8", newline="")
        print(f"[ok] {p.name} re-indented")


if __name__ == "__main__":
    main()
