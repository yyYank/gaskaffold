/**
 * 星取り表（SWOT）の型定義
 * GAS グローバルスコープで利用するためexportしない
 */

type SwotCategory = "Strength" | "Weakness" | "Opportunity" | "Threat";

interface SwotItem {
  id: string;
  category: SwotCategory;
  item: string;
  description?: string;
  priority?: "高" | "中" | "低";
}
