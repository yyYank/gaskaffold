/**
 * 画面一覧シートのビルド（GAS 上で実行）
 */

function buildScreenList(
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
  screens: { id: string; name: string; path: string; owner: string; description?: string; status?: string }[]
): void {
  const headers = ["screen_id", "name", "path", "description", "owner", "status"];
  const rows = screens.map((s) => [
    s.id,
    s.name,
    s.path,
    s.description ?? "",
    s.owner,
    s.status ?? "未着手",
  ]);
  buildSheet(spreadsheet, "画面一覧", headers, rows);
}
