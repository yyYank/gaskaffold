/**
 * GAS エントリーポイント
 * GAS エディタ、またはスプレッドシートのメニューから build() を実行する
 */

declare const RUNBOOK: RunbookPhase[];
declare const SCREENS: ScreenInput[];

function writeSheets(
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
  data: { sheets: SheetData[] }
): void {
  for (const sheet of data.sheets) {
    buildSheet(spreadsheet, sheet.name, sheet.headers, sheet.rows);
  }
}

function build(): void {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  writeSheets(spreadsheet, infraRunbookBuilder.build(RUNBOOK));
  writeSheets(spreadsheet, screenListBuilder.build(SCREENS));
}
