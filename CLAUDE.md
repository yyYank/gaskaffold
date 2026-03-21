# gaskaffold

GAS（Google Apps Script）でスプレッドシートをコードで管理するボイラープレート生成キットツール。

## 設計方針

**`docs/` 配下の ADR（Architecture Decision Record）に必ず従うこと。**

| ドキュメント | 概要 |
|---|---|
| [docs/builder-design.md](docs/builder-design.md) | ADR-001: classレス Builder パターンと Brand 型によるノミナルタイピング |
| [docs/sheet-type-design.md](docs/sheet-type-design.md) | ADR-002: データ意味構造の先行定義と出力フォーマットの分離 |

### ADR-001 要点

- `class` を使わない。`const xxxBuilder: Builder<TInput, TOutput> = { build(input) {...} }` で実装する
- `Brand<T, B>` で Output 型を識別する。Input はプレーンな型にして `as` キャストを不要にする
- `Builder<TInput, TOutput>` インターフェースへの型注釈でコンパイラに実装を強制させる

### ADR-002 要点

- データの意味構造（`Phase > Step` など）をコードで先に定義する
- スプレッドシートの row はただの出力フォーマット。データ定義を row に合わせない
- row への展開（`toRows`）はシート書き込み層だけに閉じ込める

## ディレクトリ構成

```
gaskaffold/
├── docs/          # 設計方針（ADR）
└── spreadsheet/   # 実装本体
    ├── core/      # 共通基盤（触らない）
    ├── packages/  # ドキュメント種別ごとのテンプレート（触らない）
    ├── data/      # ★ここだけ書き換える★
    └── scripts/   # ローカル実行スクリプト
```
