/**
 * テスト手順書の型定義
 * GAS グローバルスコープで利用するためexportしない
 */

// ノミナルタイピング: ブランド型で誤用を防ぐ
type TestCaseId = string & { readonly _brand: "TestCaseId" };

interface TestCase {
  id: TestCaseId;
  category: string;
  title: string;
  precondition?: string;
  steps: string;
  expectedResult: string;
  actualResult?: string;
  status?: "未実施" | "OK" | "NG" | "保留";
  tester?: string;
  memo?: string;
}
