# gascaffold

GAS（Google Apps Script）でスプレッドシートをコードで管理するボイラープレート生成ツール。

`gascaffold` コマンドで、TypeScript + GAS のプロジェクトテンプレートを任意のディレクトリに生成します。

## インストール

```bash
go install github.com/yyYank/gascaffold@latest
```

## 使い方

### 全パッケージを生成

```bash
gascaffold generate spread-sheet --out ./my-project
```

### パッケージを絞り込んで生成

```bash
gascaffold generate spread-sheet --out ./my-project --packages infra-runbook,screen-list
```

### インタラクティブに選択（TTY環境）

`--packages` を省略すると、チェックボックスでパッケージを選択できます。

```bash
gascaffold generate spread-sheet --out ./my-project
? 出力するパッケージを選択してください（スペースで選択、Enterで確定）:
  ◉ infra-runbook
  ◯ matrix
  ◉ screen-list
  ...
```

### 非インタラクティブで全パッケージを生成（CI等）

```bash
gascaffold generate spread-sheet --out ./my-project --no-interactive
```

## テンプレート（packages）

生成されるプロジェクトには以下のパッケージが含まれます。
各パッケージは TypeScript でデータを定義し、GAS でスプレッドシートシートとして出力します。

| パッケージ | 説明 |
|---|---|
| `infra-runbook` | インフラ手順書（Phase > Step の階層構造） |
| `matrix` | マトリクス表 |
| `planning` | 機能一覧・プランニング表 |
| `screen-list` | 画面一覧 |
| `story-list` | ストーリー一覧 |
| `swot` | 星取り表（SWOT分析） |
| `test-runbook` | テスト手順書 |

## 生成されるプロジェクトの構成

```
<out>/
├── appsscript.json       # GAS マニフェスト
├── index.ts              # GAS エントリーポイント
├── package.json
├── tsconfig.json
├── core/                 # 共通基盤（Builder型定義・シート書き込み）
├── packages/             # 選択したパッケージのテンプレート
│   └── <package-name>/
│       ├── types.ts      # データ型定義
│       └── builder.ts    # スプレッドシート出力ロジック
├── data/                 # ★ここだけ書き換える★（サンプルデータ入り）
└── scripts/              # ローカル実行スクリプト（TSV出力など）
```

生成後は `data/` 配下のファイルを編集してデータを定義し、GAS エディタで `build()` を実行するとスプレッドシートが生成されます。

詳細は [spreadsheet/README.md](spreadsheet/README.md) を参照してください。
