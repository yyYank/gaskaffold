/**
 * プランニング用機能一覧の型定義
 * GAS グローバルスコープで利用するためexportしない
 */

// ノミナルタイピング: ブランド型で誤用を防ぐ
type FeatureId = string & { readonly _brand: "FeatureId" };

interface Feature {
  id: FeatureId;
  category: string;
  name: string;
  description?: string;
  priority: "高" | "中" | "低";
  status?: "未着手" | "開発中" | "完了" | "保留";
  milestone?: string;
  owner?: string;
  memo?: string;
}
