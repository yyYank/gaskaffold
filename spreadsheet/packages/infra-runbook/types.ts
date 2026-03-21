/**
 * インフラ手順書の型定義
 * GAS グローバルスコープで利用するためexportしない
 *
 * 設計方針: ADR-002 に従い意味構造を先に定義する
 * - RunbookPhase > PhaseStep という親子関係をそのまま型で表現する
 * - phase はステップの属性ではなく親の属性
 */

// ノミナルタイピング: StepId を string と区別する
type StepId = string & { readonly __brand: "StepId" };

// コマンド実行と期待結果をひとまとめにした確認手順
type Verification = {
  command: string;
  expected: string;
};

// ロールバック手順
type Rollback = {
  command: string;
};

// ステップに紐づくファイル参照
type FileRef = {
  file: string;
  direction: "input" | "output";
  description?: string;
};

// フェーズ内の1ステップ
type PhaseStep = {
  id: StepId;
  title: string;
  description?: string;
  verification: Verification;
  rollback?: Rollback;
  files?: FileRef[];
  owner: string;
};

// フェーズ（複数ステップをまとめる親）
type RunbookPhase = {
  phase: string;
  steps: PhaseStep[];
};

// Output: Builder の出力 (ADR-001: Brand型)
type InfraRunbookSheet = Brand<{ sheets: SheetData[] }, "InfraRunbookSheet">;
