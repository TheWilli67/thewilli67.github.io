#!/usr/bin/env python3
"""
Re-indent CSS content inside <style> blocks and JS content inside <script>
blocks in an HTML file. Only touches leading whitespace on lines within those
blocks. Depth is computed from unquoted { and } tokens.

Assumes the <style>/<script> opening line has its own indent already correct;
that indent + 2 spaces becomes the base for content lines.
"""
import re
import sys
from pathlib import Path

INDENT = "  "


def strip_strings_and_comments_css(line: str) -> str:
    """Remove content of CSS strings and /* */ comments so we don't count braces inside them."""
    # Remove single-line strings
    line = re.sub(r'"[^"]*"', '""', line)
    line = re.sub(r"'[^']*'", "''", line)
    # Remove /* ... */ single-line comment content
    line = re.sub(r"/\*.*?\*/", "", line)
    return line


def strip_strings_and_comments_js(line: str) -> str:
    """Remove content of JS strings, template literals and comments (single-line)."""
    line = re.sub(r'"[^"\\]*(?:\\.[^"\\]*)*"', '""', line)
    line = re.sub(r"'[^'\\]*(?:\\.[^'\\]*)*'", "''", line)
    line = re.sub(r"`[^`\\]*(?:\\.[^`\\]*)*`", "``", line)
    line = re.sub(r"//.*$", "", line)
    line = re.sub(r"/\*.*?\*/", "", line)
    return line


def get_indent_of(line: str) -> int:
    stripped = line.lstrip(" \t")
    return len(line) - len(stripped)


def reindent_block(lines, start_line_indent, is_css: bool):
    """
    Re-indent a list of content lines inside a <style> or <script> block.
    start_line_indent is the number of spaces the <style>/<script> tag itself uses.
    Content should be indented at start_line_indent + 2.
    """
    base_depth = 1  # start one level deeper than the parent tag
    depth = base_depth
    inside_multiline_comment = False
    out = []

    for raw in lines:
        stripped = raw.lstrip(" \t")
        if stripped == "":
            out.append("")
            continue

        # Handle multiline comment state (CSS or JS)
        line_for_analysis = stripped
        if inside_multiline_comment:
            end_idx = line_for_analysis.find("*/")
            if end_idx == -1:
                out.append(" " * start_line_indent + INDENT * depth + stripped)
                continue
            line_for_analysis = line_for_analysis[end_idx + 2:]
            inside_multiline_comment = False

        # Now strip in-line strings and comments before counting braces
        if is_css:
            cleaned = strip_strings_and_comments_css(line_for_analysis)
        else:
            cleaned = strip_strings_and_comments_js(line_for_analysis)

        # If a /* remains open on this line, mark inside_multiline_comment
        last_open = cleaned.rfind("/*")
        if last_open != -1 and "*/" not in cleaned[last_open:]:
            cleaned = cleaned[:last_open]
            inside_multiline_comment = True

        # Line's effective depth: if it starts with a }, dedent first
        leading_closes = 0
        temp = cleaned.lstrip()
        while temp.startswith("}"):
            leading_closes += 1
            temp = temp[1:].lstrip()

        line_depth = max(depth - leading_closes, base_depth)
        out.append(" " * start_line_indent + INDENT * line_depth + stripped)

        # Update depth for next line: net open braces
        opens = cleaned.count("{")
        closes = cleaned.count("}")
        depth = max(depth + opens - closes, base_depth - 1)  # allow depth 0 briefly, will be clamped below
        if depth < base_depth:
            depth = base_depth

    return out


def process_file(path: Path):
    original = path.read_text(encoding="utf-8")
    lines = original.splitlines(keepends=False)

    out = []
    i = 0
    n = len(lines)
    while i < n:
        line = lines[i]
        # Detect open of a <style> or <script> block on its own line
        m = re.match(r'(\s*)<(style|script)\b([^>]*)>\s*$', line, re.IGNORECASE)
        if m and "</" not in line[m.end():]:
            base_indent = len(m.group(1))
            tag = m.group(2).lower()
            out.append(line)
            # Collect content until </style> or </script>
            content = []
            i += 1
            while i < n:
                close_m = re.match(rf'(\s*)</{tag}>\s*$', lines[i], re.IGNORECASE)
                if close_m:
                    # Re-indent the closing tag to base_indent
                    reindented = reindent_block(content, base_indent, is_css=(tag == "style"))
                    out.extend(reindented)
                    out.append(" " * base_indent + f"</{tag}>")
                    i += 1
                    break
                content.append(lines[i])
                i += 1
            continue

        out.append(line)
        i += 1

    new_content = "\n".join(out) + ("\n" if original.endswith("\n") else "")
    path.write_text(new_content, encoding="utf-8", newline="")


def main():
    if len(sys.argv) < 2:
        print("Usage: python reindent_style_js.py <file.html>")
        sys.exit(1)
    for arg in sys.argv[1:]:
        p = Path(arg)
        if p.exists():
            process_file(p)
            print(f"[ok] {p.name} style/script re-indented")
        else:
            print(f"[skip] {p} not found")


if __name__ == "__main__":
    main()
