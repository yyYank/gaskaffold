/**
 * マトリクス表シートのビルド（GAS 上で実行）
 */

function buildMatrix(
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
  matrix: { columns: string[]; rows: { id: string; label: string; [key: string]: string }[] }
): void {
  const headers = ["id", "label", ...matrix.columns];
  const rows = matrix.rows.map((r) => [
    r.id,
    r.label,
    ...matrix.columns.map((col) => r[col] ?? ""),
  ]);
  buildSheet(spreadsheet, "マトリクス", headers, rows);
}
