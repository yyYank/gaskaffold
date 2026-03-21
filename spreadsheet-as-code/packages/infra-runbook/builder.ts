/**
 * インフラ手順書シートのビルド（GAS 上で実行）
 */

function buildInfraRunbook(
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
  steps: { id: string; phase: string; title: string; description?: string; command?: string; expected?: string; rollback?: string; owner: string; files?: { file: string; direction: string; description?: string }[] }[]
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
