/**
 * 画面一覧の型定義
 * GAS グローバルスコープで利用するためexportしない
 */

// Input: asキャスト不要なプレーンな型
type ScreenInput = {
  id: string;
  name: string;
  path: string;
  owner: string;
  description?: string;
  status?: "未着手" | "開発中" | "完了";
};

// Output: Brand型で他のSheet型と区別する
type ScreenListSheet = Brand<{ sheets: SheetData[] }, "ScreenListSheet">;
