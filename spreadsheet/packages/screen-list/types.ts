/**
 * 画面一覧の型定義
 */

export interface Screen {
  id: string;
  name: string;
  path: string;
  owner: string;
  description?: string;
  status?: "未着手" | "開発中" | "完了";
}
