# gaskaffold

Google スプレッドシートなど、GASで扱えるドキュメント群をコードで管理するボイラープレート生成キットツール

手順書・画面一覧・ストーリー一覧などのドキュメントを TypeScript で定義し、Google Apps Script（GAS）でスプレッドシートとして自動生成する。

- **コードが唯一の真実（SSoT）**：シートは出力物であり、直接編集しない
- **AI リーダブル**：Claude Code などのエージェントがコードを読んで手順を理解・実行できる
- **ヒューマンリーダブル**：TypeScript がそのままドキュメントとして読める
- **TSV 出力対応**：シート以外のツールへのエクスポートも可能

---

## リポジトリ構成

```
spreadsheet-as-code/
├── CLAUDE.md                  # AI エージェント向けのコンテキスト
├── package.json
├── tsconfig.json
├── .clasp.json
├── appsscript.json
├── core/                      # 共通基盤（触らない）
│   ├── types.ts               # 全 package が使う共通型
│   ├── exporter.ts            # TSV 出力ロジック
│   └── builder.ts             # シート構築の共通ロジック
├── packages/                  # ドキュメント種別ごとのテンプレート（触らない）
│   ├── infra-runbook/         # インフラ手順書
│   ├── screen-list/           # 画面一覧
│   ├── story-list/            # ストーリー一覧
│   ├── planning/              # 機能一覧（プランニング用）
│   ├── test-runbook/          # テスト手順書
│   ├── matrix/                # マトリクス
│   └── swot/                  # 星取り表（SWOT）
├── data/                      # ★ここだけ書き換える★
│   ├── index.ts               # 使う package を選んでビルド
│   ├── infra-runbook.ts       # 手順書のデータ
│   ├── screen-list.ts         # 画面一覧のデータ
│   └── ...
└── scripts/
    ├── init.sh                # clone 後の初期化スクリプト
    └── export-tsv.ts          # TSV 出力スクリプト
```

---

## セットアップ

### 前提

- Node.js 18+
- [clasp](https://github.com/google/clasp) (`npm install -g @google/clasp`)
- Google アカウント

### 手順

```bash
# 1. このリポジトリを clone
git clone https://github.com/yourname/spreadsheet-as-code my-project
cd my-project

# 2. 初期化（clasp の紐付けなど）
bash scripts/init.sh

# 3. 依存パッケージのインストール
npm install

# 4. Google アカウントでログイン
clasp login

# 5. data/ 配下のファイルを書き換える（後述）

# 6. デプロイ
clasp push
```

---

## 使い方

### 新しいプロジェクトを始めるとき

`data/` 配下のファイルだけを書き換える。`core/` と `packages/` は触らない。

```typescript
// data/screen-list.ts
import { Screen } from "../packages/screen-list/types";

export const SCREENS: Screen[] = [
  {
    id: "SCR-001",
    name: "ログイン画面",
    path: "/login",
    owner: "佐藤",
  },
  {
    id: "SCR-002",
    name: "ダッシュボード",
    path: "/dashboard",
    owner: "鈴木",
  },
];
```

```typescript
// data/infra-runbook.ts
import { Step } from "../packages/infra-runbook/types";

export const STEPS: Step[] = [
  {
    id: "01-001",
    phase: "事前確認",
    title: "ディスク空き容量確認",
    description: "デプロイに必要な最低 2GB 以上の空きがあること",
    command: "df -h /var",
    expected: "Avail 列が 2G 以上",
    owner: "佐藤",
    files: [
      { file: "params.yaml", direction: "input", description: "デプロイパラメータ" },
    ],
  },
  {
    id: "01-002",
    phase: "デプロイ",
    title: "Nginx 停止",
    command: "systemctl stop nginx",
    expected: "inactive (dead)",
    rollback: "systemctl start nginx",
    owner: "佐藤",
  },
];
```

### ビルドして Google スプレッドシートに反映

```bash
clasp push
# GAS エディタで build() を実行、またはスプレッドシートを開いてメニューから実行
```

### TSV 出力

```bash
npx ts-node scripts/export-tsv.ts
# output/steps.tsv と output/files.tsv が生成される
```

---

## 出力される TSV の構造

**steps.tsv**（手順マスタ）

| step_id | phase | title | command | expected | rollback | owner |
|---------|-------|-------|---------|----------|----------|-------|
| 01-001 | 事前確認 | ディスク空き容量確認 | df -h /var | Avail 列が 2G 以上 | | 佐藤 |

**files.tsv**（ステップ紐づきファイル）

| step_id | file | direction | description |
|---------|------|-----------|-------------|
| 01-001 | params.yaml | input | デプロイパラメータ |

`step_id` で JOIN することで、ステップとファイルを紐づけて参照できる。

---

## スプレッドシートの保護について

生成されたシートは **読み取り専用（警告モード）** に設定される。編集しようとすると警告が表示される。

手順の変更は必ずコードで行い、`clasp push` で反映すること。

---

## AI エージェントとの連携

`CLAUDE.md` にプロジェクトの概要と操作方法が記載されている。Claude Code などのエージェントは `data/` 配下のコードを読むことで全手順を把握できる。

```
# Claude Code での典型的な使い方

「01-001 のステップを実行して結果を確認して」
→ data/infra-runbook.ts を読んでコマンドを理解・実行

「画面一覧に SCR-003 を追加して」
→ data/screen-list.ts を編集して clasp push
```

---

## 対応ドキュメント種別

| package | 用途 |
|---------|------|
| `infra-runbook` | インフラ作業手順書 |
| `screen-list` | 画面一覧 |
| `story-list` | ストーリー一覧 |
| `planning` | プランニング用機能一覧 |
| `test-runbook` | テスト手順書 |
| `matrix` | マトリクス表 |
| `swot` | 星取り表（SWOT） |

---

## ライセンス

Apache 2

