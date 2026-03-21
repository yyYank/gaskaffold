/**
 * 星取り表（SWOT）の型定義
 * GAS グローバルスコープで利用するためexportしない
 */

type SwotCategory = "Strength" | "Weakness" | "Opportunity" | "Threat";

// Input: asキャスト不要なプレーンな型
type SwotInput = {
  id: string;
  category: SwotCategory;
  item: string;
  description?: string;
  priority?: "高" | "中" | "低";
};

// Output: Brand型で他のSheet型と区別する
type SwotSheet = Brand<{ sheets: SheetData[] }, "SwotSheet">;
