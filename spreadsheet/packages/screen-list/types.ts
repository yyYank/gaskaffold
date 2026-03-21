/**
 * 画面一覧の型定義
 * GAS グローバルスコープで利用するためexportしない
 */

// ノミナルタイピング: ブランド型で誤用を防ぐ
type ScreenId = string & { readonly _brand: "ScreenId" };

interface Screen {
  id: ScreenId;
  name: string;
  path: string;
  owner: string;
  description?: string;
  status?: "未着手" | "開発中" | "完了";
}
