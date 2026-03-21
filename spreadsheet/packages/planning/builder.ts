/**
 * 機能一覧（プランニング）シートのビルド（GAS 上で実行）
 */

function buildPlanning(
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
  features: { id: string; category: string; name: string; description?: string; priority: string; status?: string; milestone?: string; owner?: string; memo?: string }[]
): void {
  const headers = ["feature_id", "category", "name", "description", "priority", "milestone", "owner", "status", "memo"];
  const rows = features.map((f) => [
    f.id,
    f.category,
    f.name,
    f.description ?? "",
    f.priority,
    f.milestone ?? "",
    f.owner ?? "",
    f.status ?? "未着手",
    f.memo ?? "",
  ]);
  buildSheet(spreadsheet, "機能一覧", headers, rows);
}
