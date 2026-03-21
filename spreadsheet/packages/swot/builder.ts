/**
 * SWOT シートのビルド（GAS 上で実行）
 */

function buildSwot(
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
  items: { id: string; category: string; item: string; description?: string; priority?: string }[]
): void {
  const headers = ["id", "category", "item", "description", "priority"];
  const rows = items.map((s) => [
    s.id,
    s.category,
    s.item,
    s.description ?? "",
    s.priority ?? "中",
  ]);
  buildSheet(spreadsheet, "SWOT", headers, rows);
}
