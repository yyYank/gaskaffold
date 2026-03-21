/**
 * 星取り表（SWOT）の型定義
 */

export type SwotCategory = "Strength" | "Weakness" | "Opportunity" | "Threat";

export interface SwotItem {
  id: string;
  category: SwotCategory;
  item: string;
  description?: string;
  priority?: "高" | "中" | "低";
}
