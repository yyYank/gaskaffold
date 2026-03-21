/**
 * テスト手順書の型定義
 */

export interface TestCase {
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
}
