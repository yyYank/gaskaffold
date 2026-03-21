/**
 * インフラ手順書の型定義
 * GAS グローバルスコープで利用するためexportしない
 */

// Input: asキャスト不要なプレーンな型
type InfraRunbookFileRef = {
  file: string;
  direction: "input" | "output";
  description?: string;
};

type InfraRunbookInput = {
  id: string;
  phase: string;
  title: string;
  description?: string;
  command?: string;
  expected?: string;
  rollback?: string;
  owner: string;
  files?: InfraRunbookFileRef[];
};

// Output: Brand型で他のSheet型と区別する
type InfraRunbookSheet = Brand<{ sheets: SheetData[] }, "InfraRunbookSheet">;
