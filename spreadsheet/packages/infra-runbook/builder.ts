/**
 * インフラ手順書シートのビルド（GAS 上で実行）
 * Step 型は packages/infra-runbook/types.ts でグローバル定義
 */

function buildInfraRunbook(
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
  steps: Step[]
): void {
  const stepHeaders = ["step_id", "phase", "title", "description", "command", "expected", "rollback", "owner"];
  const stepRows = steps.map((s) => [
    s.id,
    s.phase,
    s.title,
    s.description ?? "",
    s.command ?? "",
    s.expected ?? "",
    s.rollback ?? "",
    s.owner,
  ]);
  buildSheet(spreadsheet, "手順書", stepHeaders, stepRows);

  const fileHeaders = ["step_id", "file", "direction", "description"];
  const fileRows: (string | number | boolean)[][] = [];
  for (const step of steps) {
    for (const f of step.files ?? []) {
      fileRows.push([step.id, f.file, f.direction, f.description ?? ""]);
    }
  }
  buildSheet(spreadsheet, "ファイル一覧", fileHeaders, fileRows);
}
