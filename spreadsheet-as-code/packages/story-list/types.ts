/**
 * ストーリー一覧の型定義
 */

export interface Story {
  id: string;
  title: string;
  asA: string;
  iWant: string;
  soThat: string;
  priority: "高" | "中" | "低";
  status?: "未着手" | "開発中" | "完了";
  owner?: string;
  storyPoints?: number;
}
