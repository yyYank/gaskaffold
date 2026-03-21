# gaskaffold プロジェクト

## 概要

GAS (Google Apps Script) でスプレッドシートを自動生成するボイラープレートキット。

## ディレクトリ構成

- `core/` - 共通基盤。触らない。
- `packages/` - ドキュメント種別ごとのテンプレート。触らない。
- `data/` - ★ここだけ書き換える★
- `scripts/` - ローカル実行スクリプト

## 基本操作

```bash
# 依存パッケージのインストール
npm install

# Google アカウントでログイン
clasp login

# GAS にプッシュ
clasp push

# TSV ローカル出力
npm run export-tsv
```

## AI エージェントへの指示

`data/` 配下のファイルを読むことで全ドキュメントの内容を把握できる。

- `data/infra-runbook.ts` - インフラ手順書のデータ
- `data/screen-list.ts` - 画面一覧のデータ
- `data/index.ts` - ビルド対象の設定

スプレッドシートの変更は必ず `data/` のコードを編集して `clasp push` で反映すること。
