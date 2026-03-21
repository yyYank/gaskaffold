/**
 * テスト手順書の型定義
 * GAS グローバルスコープで利用するためexportしない
 */

// Input: asキャスト不要なプレーンな型
type TestCaseInput = {
  id: string;
  category: string;
  title: string;
  precondition?: string;
  steps: string;
  expectedResult: string;
  actualResult?: string;
  status?: "未実施" | "OK" | "NG" | "保留";
  tester?: string;
  memo?: string;
};

// Output: Brand型で他のSheet型と区別する
type TestRunbookSheet = Brand<{ sheets: SheetData[] }, "TestRunbookSheet">;
