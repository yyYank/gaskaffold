/**
 * プランニング用機能一覧の型定義
 */

export interface Feature {
  id: string;
  category: string;
  name: string;
  description?: string;
  priority: "高" | "中" | "低";
  status?: "未着手" | "開発中" | "完了" | "保留";
  milestone?: string;
  owner?: string;
  memo?: string;
}
