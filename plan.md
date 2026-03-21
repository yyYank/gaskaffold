# gascaffold Go CLI 実装プラン

## 概要

`gascaffold generate spread-sheet --out path/to/dir` でGASスプレッドシートプロジェクトのボイラープレートを生成するGoコマンド。

## TDDステップ

- [x] Step 1: rootコマンドが存在してヘルプが出る
- [x] Step 2: `generate` サブコマンドが存在する
- [x] Step 3: `generate spread-sheet --out` が出力ディレクトリを作成する
- [x] Step 4: `--out` 先にcoreファイルがコピーされる
- [x] Step 5: `--out` 先にpackagesが全コピーされる
- [x] Step 6: `--out` 先にdataファイルがコピーされる
- [x] Step 7: `--packages` フラグで特定パッケージのみ絞り込める
- [x] Step 8: `--packages` 未指定時にインタラクティブ選択（survey）

## 構成

```
gascaffold/
├── main.go
├── go.mod
├── cmd/
│   ├── root.go
│   ├── generate.go
│   └── generate_spreadsheet.go
├── internal/
│   └── scaffold/
│       └── spreadsheet.go
└── template/                  # embed対象
    ├── core/
    ├── packages/
    ├── data/
    ├── index.ts
    ├── package.json
    ├── tsconfig.json
    └── appsscript.json
```

## 依存ライブラリ

- `github.com/spf13/cobra`
- `github.com/AlecAivazis/survey/v2`
