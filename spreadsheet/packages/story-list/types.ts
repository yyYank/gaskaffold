/**
 * ストーリー一覧の型定義
 * GAS グローバルスコープで利用するためexportしない
 */

// Input: asキャスト不要なプレーンな型
type StoryInput = {
  id: string;
  title: string;
  asA: string;
  iWant: string;
  soThat: string;
  priority: "高" | "中" | "低";
  status?: "未着手" | "開発中" | "完了";
  owner?: string;
  storyPoints?: number;
};

// Output: Brand型で他のSheet型と区別する
type StoryListSheet = Brand<{ sheets: SheetData[] }, "StoryListSheet">;
