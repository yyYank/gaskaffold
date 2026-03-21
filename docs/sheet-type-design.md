# ADR-002: データ意味構造の先行定義と出力フォーマットの分離

## ステータス

承認済み

---

## コンテキスト

clasp + GAS によるスプレッドシートの Infrastructure as Code 化を進める中で、データ定義のコードがスプレッドシートの row 構造を直接反映する形になっていた。

具体的には、本来 `Phase > Step` という親子関係であるデータを、`phase` を各 `Step` の属性としてフラットな配列に持たせていた。

```typescript
// ❌ rowを先に意識した設計：phaseが各ステップの属性になっている
const steps = [
  { id: "01-001", phase: "事前確認", title: "ディスク空き容量確認", ... },
  { id: "01-002", phase: "デプロイ",  title: "Nginx 停止", ... },
];
```

この設計は以下の問題を引き起こす。

- 各オブジェクトが持つ属性が多くなり、可読性が低下する
- データの意味構造（セマンティクス）がコードから読み取れない
- スプレッドシートの出力形式がデータ定義を汚染している

---

## 決定

**「意味構造をコードで先に定義し、row はそこから導出する」** を設計の原則とする。

### 原則

スプレッドシートの row はただの**出力フォーマット**である。データの意味構造とは切り離して考える。

```
意味構造（コード）                 出力フォーマット（シート）
──────────────────                ─────────────────────────
RunbookPhase                      row: phase | id | title | ...
  └── PhaseStep[]      →  展開    row: phase | id | title | ...
        └── FileRef[]             row: phase | id | title | ...
```

### 型で意味構造を定義する

```typescript
type RunbookPhase = Brand<{
  phase: string;
  steps: PhaseStep[];
}, "RunbookPhase">;

type PhaseStep = Brand<{
  id: StepId;
  title: string;
  description?: string;
  verification: Verification;
  rollback?: Rollback;
  files?: FileRef[];
  owner: string;
}, "PhaseStep">;
```

### データは意味構造に従って定義する

```typescript
// ✅ 意味構造を先に定義：phaseはPhaseStepの属性ではなく親
const runbook: RunbookPhase[] = [
  {
    phase: "事前確認",
    steps: [
      {
        id:           "01-001" as StepId,
        title:        "ディスク空き容量確認",
        verification: verify("df -h /var", "Avail 列が 2G 以上"),
        files:        [input("params.yaml", "デプロイパラメータ")],
        owner:        "佐藤",
      },
    ],
  },
];
```

### row への展開はシート書き込み層で行う

```typescript
// 意味構造 → row への変換はここだけに閉じ込める
const toRows = (phases: RunbookPhase[]): Row[] =>
  phases.flatMap(({ phase, steps }) =>
    steps.flatMap(({ files, ...step }) => {
      const base = { phase, ...step };
      return files?.length
        ? files.map(file => ({ ...base, ...file }))
        : [base];
    })
  );
```

---

## 採用しなかった代替案

| 案 | 却下理由 |
|---|---|
| フラット配列に `phase` 属性を持たせる | rowを先に意識した設計。意味構造がコードから読み取れない |
| シート構造に合わせて型を定義する | 出力フォーマットがデータ定義を汚染する。シート変更のたびに型が壊れる |

---

## 結果

### メリット

- **可読性**：各オブジェクトはその階層が本来持つべき属性だけを持つ
- **意味の明確化**：`Phase > Step` という親子関係がコードから直接読み取れる
- **変更耐性**：シートのレイアウト変更が意味構造の型に影響しない
- **AI 可読性**：階層構造はフラット配列より意味を推論しやすい

### トレードオフ

- `toRows` のような変換層が必要になる
- ネストが深い構造は `flatMap` の連鎖が複雑になる場合がある（その場合は変換関数を分割する）

---

## アナロジー

IaC における関係と同じ。

| IaC | 本プロジェクト |
|---|---|
| HCL のリソース定義 | 意味構造の型定義 |
| `terraform plan` の出力 | スプレッドシートの row |

定義と出力は別物。出力フォーマットに引きずられて定義を歪めない。

---

## 参照

- ADR-001: TypeScript におけるクラスレス Builder パターンと Brand 型によるノミナルタイピング

