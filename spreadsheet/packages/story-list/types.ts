/**
 * ストーリー一覧の型定義
 * GAS グローバルスコープで利用するためexportしない
 */

// ノミナルタイピング: ブランド型で誤用を防ぐ
type StoryId = string & { readonly _brand: "StoryId" };

interface Story {
  id: StoryId;
  title: string;
  asA: string;
  iWant: string;
  soThat: string;
  priority: "高" | "中" | "低";
  status?: "未着手" | "開発中" | "完了";
  owner?: string;
  storyPoints?: number;
}
