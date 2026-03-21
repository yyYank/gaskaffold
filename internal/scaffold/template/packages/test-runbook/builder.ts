/**
 * テスト手順書シートのビルダー（GAS 上で実行）
 * Builder<TestCaseInput[], TestRunbookSheet> を実装するconstオブジェクト
 */

const testRunbookBuilder: Builder<TestCaseInput[], TestRunbookSheet> = {
  build(input) {
    const headers = ["test_id", "category", "title", "precondition", "steps", "expected_result", "actual_result", "status", "tester", "memo"];
    const rows = input.map((t) => [
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

    return {
      sheets: [{ name: "テスト手順書", headers, rows }],
      __brand: "TestRunbookSheet",
    } as TestRunbookSheet;
  },
};
