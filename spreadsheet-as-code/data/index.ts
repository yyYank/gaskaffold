/**
 * GAS エントリーポイント
 * GAS エディタ、またはスプレッドシートのメニューから build() を実行する
 */

// GAS 環境ではすべてのファイルがグローバルスコープを共有するため、
// 他ファイルの変数を declare で参照する
declare const STEPS: { id: string; phase: string; title: string; description?: string; command?: string; expected?: string; rollback?: string; owner: string; files?: { file: string; direction: string; description?: string }[] }[];
declare const SCREENS: { id: string; name: string; path: string; owner: string; description?: string; status?: string }[];

function build(): void {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  // インフラ手順書
  buildInfraRunbook(spreadsheet, STEPS);

  // 画面一覧
  buildScreenList(spreadsheet, SCREENS);
}
