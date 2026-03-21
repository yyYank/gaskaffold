/**
 * インフラ手順書の型定義
 * GAS グローバルスコープで利用するためexportしない
 */

// ノミナルタイピング: ブランド型で誤用を防ぐ
type StepId = string & { readonly _brand: "StepId" };

interface FileRef {
  file: string;
  direction: "input" | "output";
  description?: string;
}

interface Step {
  id: StepId;
  phase: string;
  title: string;
  description?: string;
  command?: string;
  expected?: string;
  rollback?: string;
  owner: string;
  files?: FileRef[];
}
