/**
 * テスト手順書シートのビルド（GAS 上で実行）
 */

function buildTestRunbook(
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
  testCases: { id: string; category: string; title: string; precondition?: string; steps: string; expectedResult: string; actualResult?: string; status?: string; tester?: string; memo?: string }[]
): void {
  const headers = ["test_id", "category", "title", "precondition", "steps", "expected_result", "actual_result", "status", "tester", "memo"];
  const rows = testCases.map((t) => [
    t.id,
    t.category,
    t.title,
    t.precondition ?? "",
    t.steps,
    t.expectedResult,
    t.actualResult ?? "",
    t.status ?? "未実施",
    t.tester ?? "",
    t.memo ?? "",
  ]);
  buildSheet(spreadsheet, "テスト手順書", headers, rows);
}
