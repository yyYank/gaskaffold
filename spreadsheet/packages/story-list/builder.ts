/**
 * ストーリー一覧シートのビルド（GAS 上で実行）
 */

function buildStoryList(
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
  stories: { id: string; title: string; asA: string; iWant: string; soThat: string; priority: string; status?: string; owner?: string; storyPoints?: number }[]
): void {
  const headers = ["story_id", "title", "as_a", "i_want", "so_that", "priority", "story_points", "owner", "status"];
  const rows = stories.map((s) => [
    s.id,
    s.title,
    s.asA,
    s.iWant,
    s.soThat,
    s.priority,
    s.storyPoints ?? "",
    s.owner ?? "",
    s.status ?? "未着手",
  ]);
  buildSheet(spreadsheet, "ストーリー一覧", headers, rows);
}
