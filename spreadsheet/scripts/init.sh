#!/bin/bash
set -e

echo "=== gaskaffold 初期化スクリプト ==="

# .clasp.json の scriptId を更新
if [ -z "$1" ]; then
  echo "Usage: bash scripts/init.sh <SCRIPT_ID>"
  echo ""
  echo "SCRIPT_ID は以下で確認できます:"
  echo "  1. script.google.com で新規プロジェクトを作成"
  echo "  2. プロジェクトの設定 > スクリプト ID をコピー"
  exit 1
fi

SCRIPT_ID="$1"

# .clasp.json を更新
cat > .clasp.json <<EOF
{
  "scriptId": "${SCRIPT_ID}",
  "rootDir": "."
}
EOF

echo "✓ .clasp.json を更新しました (scriptId: ${SCRIPT_ID})"
echo ""
echo "次のステップ:"
echo "  1. npm install"
echo "  2. clasp login"
echo "  3. clasp push"
