#!/usr/bin/env bash
# 本地将 Help HTML 转为 Markdown（图片保留为 HTML 标签）
# 用法: ./.github/scripts/help-to-md.sh

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_ROOT"

SRC_DIR="help/SwiftCraftLauncher.help/Contents/Resources/en.lproj"
OUT_DIR="_wiki_help"

if [[ ! -d "$SRC_DIR" ]]; then
  echo "错误: 源目录不存在: $SRC_DIR"
  exit 1
fi

command -v pandoc >/dev/null 2>&1 || {
  echo "错误: 需要安装 pandoc。macOS: brew install pandoc"
  exit 1
}

command -v perl >/dev/null 2>&1 || {
  echo "错误: 需要 perl（系统通常已自带）"
  exit 1
}

mkdir -p "$OUT_DIR"

shopt -s nullglob 2>/dev/null || true
for f in "$SRC_DIR"/*.html; do
  [[ -e "$f" ]] || continue
  base="$(basename "$f" .html)"

  out_name="$base.md"
  if [[ "$base" == "index" ]]; then
    out_name="home.md"
  fi

  out="$OUT_DIR/$out_name"
  tmp_preprocessed="$OUT_DIR/pre_${base}.html"
  map_file="$OUT_DIR/.img_${base}.map"

  echo "转换: $base.html -> $out_name"

  # 1. 预处理：用 <span data-img-replace="n"> 替换 <img...>，pandoc 会保留此 span
  perl "$SCRIPT_DIR/help-to-md-preprocess.pl" "$f" "$tmp_preprocessed" "$map_file"

  # 2. pandoc 转换
  pandoc "$tmp_preprocessed" \
    --from=html \
    --to=gfm+raw_html \
    --wrap=none \
    -o "$out"

  # 3. 后处理：将 <span data-img-replace="n"> 改回原始 <img> 标签
  perl "$SCRIPT_DIR/help-to-md-postprocess.pl" "$out" "$map_file"
  rm -f "$map_file" "$tmp_preprocessed" 2>/dev/null

  # 4. 调整内部链接以适配 GitHub Wiki，统一使用 home（不用 index）
  perl -pi -e '
    s/\]\(((?!https?:\/\/)[^)]*?)index\.html(\))/\]\(\1home\2/g;
    s/\]\(((?!https?:\/\/)[^)]*?)index\.html(#)/\]\(\1home\2/g;
    s/\]\(((?!https?:\/\/)[^)]*?)\.html(\))/\]\(\1\2/g;
    s/\]\(((?!https?:\/\/)[^)]*?)\.html(#)/\]\(\1\2/g;
    s/\]\(home(\#[^)]*)\)/\](home.md$1)/g;
    s/\]\(home\)/\](home.md)/g;
    s/href="index\.html"/href="home"/g;
    s/href="index\.html#/href="home#/g;
    s/href="home#index"/href="home"/g;
    s/id="index"/id="home"/g;
  ' "$out" 2>/dev/null || true
done

echo ""
echo "完成。输出目录: $OUT_DIR/"
