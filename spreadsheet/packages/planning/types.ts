/**
 * プランニング用機能一覧の型定義
 * GAS グローバルスコープで利用するためexportしない
 */

// Input: asキャスト不要なプレーンな型
type FeatureInput = {
  id: string;
  category: string;
  name: string;
  description?: string;
  priority: "高" | "中" | "低";
  status?: "未着手" | "開発中" | "完了" | "保留";
  milestone?: string;
  owner?: string;
  memo?: string;
};

// Output: Brand型で他のSheet型と区別する
type PlanningSheet = Brand<{ sheets: SheetData[] }, "PlanningSheet">;
