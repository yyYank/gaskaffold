# ADR-001: TypeScript におけるクラスレス Builder パターンと Brand 型によるノミナルタイピング

## ステータス

承認済み

---

## コンテキスト

TypeScript は構造的型付け（Structural Typing）を採用しており、形が同じであれば異なる意図の型でも互換とみなされる。  
Java のようなノミナルタイピング（型名による区別）を実現しつつ、以下の制約を満たす設計が必要となった。

- `class` 構文を使わない（関数・オブジェクトベースで統一する）
- 各プロジェクトが共通の契約（interface）を実装するだけで完結する
- 実装者が `as` キャストで型安全を回避できないよう縛る

---

## 決定

**Brand 型 + インターフェース分離 + クロージャによる状態管理** の組み合わせを採用する。

### 1. 共通基盤（1 回だけ定義）

```typescript
// Brand 型：構造が同じでも別物として区別する
type Brand<T, B extends string> = T & { readonly __brand: B };

// Builder 契約：Input / Output を分離することで as キャスト逃げを防ぐ
interface Builder<TInput, TOutput> {
  build(input: TInput): TOutput;
}
```

### 2. 各プロジェクト（ここだけ書く）

```typescript
// Brand 型で Output を定義
type InfraRunbook = Brand<{
  name: string;
  steps: string[];
}, "InfraRunbook">;

// Input 型を分離（as 不要になる）
type InfraRunbookInput = {
  name: string;
  steps: string[];
};

// Builder<TInput, TOutput> を実装するだけ
const infraRunbookBuilder: Builder<InfraRunbookInput, InfraRunbook> = {
  build(input) {
    return {
      ...input,
      __brand: "InfraRunbook",
    } as const as InfraRunbook;
  },
};
```

### 3. 呼び出し側

```typescript
const runbook = infraRunbookBuilder.build({
  name: "deploy-prod",
  steps: ["terraform apply", "health check"],
});

// 構造が同じでも別 Brand の型には代入不可
type NetworkRunbook = Brand<{ name: string; steps: string[] }, "NetworkRunbook">;
const wrong: NetworkRunbook = runbook; // ✅ 型エラー
```

---

## 採用しなかった代替案

| 案 | 却下理由 |
|---|---|
| `class implements Builder` | class 構文を排除する方針と相反する |
| 構造的型付けをそのまま使う | 同じ形の異なる型が混在したとき区別できない |
| `as` キャストで Brand を付与（Input 分離なし） | 実装者が誤った値を強制キャストできてしまう |

---

## 結果

### メリット

- **class ゼロ**：関数・オブジェクトベースで統一できる
- **ノミナルタイピング**：Brand 型により同形の型を区別できる
- **実装の縛り**：`Builder<TInput, TOutput>` を型注釈するだけでコンパイラが `build()` の実装を強制する
- **プロジェクト分離**：共通基盤に触れず、型定義と Builder オブジェクトを置くだけで完結する
- **as キャスト逃げの防止**：TInput を分離することで、実装者は正しい型の値を組み立てざるを得ない

### トレードオフ

- `__brand` フィールドは実行時にも存在するため、シリアライズ時に除去が必要な場合がある
- Java に慣れた開発者には `implements` キーワードがないことが直感に反する場合がある（型注釈で代替している旨をチームに共有すること）

---

## 参照

- [TypeScript Handbook – Type Compatibility](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)
- [TypeScript Deep Dive – Nominal Typing](https://basarat.gitbook.io/typescript/main-1/nominaltyping)

