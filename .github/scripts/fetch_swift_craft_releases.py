#!/usr/bin/env python3

import os
import sys
from typing import List, Optional


def safe_html_basename(name: str) -> str:
    name = name.strip()
    if not name:
        name = "unknown-version"
    forbidden = '\\/:*?"<>| '
    for ch in forbidden:
        name = name.replace(ch, "-")
    return name


def render_release_html(version: str, body: str) -> str:
    def html_escape(text: str) -> str:
        return (
            text.replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
        )

    normalized = (body or "").replace("\r\n", "\n").replace("\r", "\n")
    lines = normalized.split("\n")

    html_lines = []

    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue

        if stripped.startswith("## "):
            heading = stripped[3:]
            html_lines.append(f"<h4>{html_escape(heading)}</h4>")
        elif stripped.startswith("- "):
            item = stripped[2:]
            html_lines.append(f"<p>{html_escape(item)}</p>")
        else:
            html_lines.append(f"<p>{html_escape(stripped)}</p>")

    html_body = "\n".join(html_lines)

    title = f"版本 {version} 发布日志"

    return f"""<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <title>{title}</title>
    <meta name="description" content="Swift Craft Launcher 版本 {version} 发布日志">
    <meta name="keywords" content="Swift Craft Launcher, 发布日志, 版本 {version}">
    <meta content="light dark" name="color-scheme">
    <link media="all" href="https://suhang12332.github.io/Swift-Craft-Launcher-Assets/help/SwiftCraftLauncher.help/Contents/Resources/css/app.css" type="text/css" rel="stylesheet">
</head>
<body dir="ltr" id="release-{html_escape(version)}" class="AppleTopic apd-topic dark-mode-enabled" data-istaskopen="true" data-designversion="2">
    <a name="release-{html_escape(version)}"></a>
    <div id="release-{html_escape(version)}-body">
        <div class="TaskBody" role="region" aria-hidden="false" id="aria-release-{html_escape(version)}-body">
            {html_body}
        </div>
    </div>
</body>
</html>
"""


def save_release_html(version: str, body: str, html_root_dir: str) -> None:
    basename = safe_html_basename(str(version))
    filename = f"{basename}.html"

    os.makedirs(html_root_dir, exist_ok=True)
    path = os.path.join(html_root_dir, filename)

    html = render_release_html(str(version), body)

    with open(path, "w", encoding="utf-8") as f:
        f.write(html)

    print(f"已写入 HTML: {path}")


def build_html_from_existing_txt(txt_root_dir: str, html_root_dir: str) -> int:
    if not os.path.isdir(txt_root_dir):
        print(f"目录不存在，无法生成 HTML: {txt_root_dir}")
        return 1

    txt_files = [f for f in os.listdir(txt_root_dir) if os.path.isfile(os.path.join(txt_root_dir, f))]
    if not txt_files:
        print(f"目录中未找到任何文件: {txt_root_dir}")
        return 0

    # 计算 releases 目录中已经存在的版本（不区分后缀，只看去掉后缀的文件名）
    existing_basenames = set()
    if os.path.isdir(html_root_dir):
        for name in os.listdir(html_root_dir):
            if os.path.isfile(os.path.join(html_root_dir, name)):
                base, _ = os.path.splitext(name)
                existing_basenames.add(base)

    count = 0
    for filename in sorted(txt_files):
        base, ext = os.path.splitext(filename)
        # 只处理 Markdown 源文件
        if ext.lower() != ".md":
            continue

        # releases-notes 中有，但 releases 中（按去掉后缀的文件名比较）还没有的才进行转换
        if base in existing_basenames:
            continue

        version = base
        txt_path = os.path.join(txt_root_dir, filename)
        with open(txt_path, "r", encoding="utf-8") as f:
            body = f.read()
        save_release_html(version, body, html_root_dir)
        count += 1

    print(f"已根据现有 TXT 生成 {count} 个 HTML 文件。")
    return 0


def main(argv: Optional[List[str]] = None) -> int:
    if argv is None:
        argv = sys.argv[1:]

    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.dirname(script_dir)
    txt_root_dir = os.path.join(repo_root, "releases-notes")
    html_root_dir = os.path.join(repo_root, "releases")

    # 现在仅根据本地 Markdown 文件生成 HTML
    return build_html_from_existing_txt(txt_root_dir, html_root_dir)


if __name__ == "__main__":
    raise SystemExit(main())

