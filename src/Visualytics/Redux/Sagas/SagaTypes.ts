import { IDragItem } from "../../Components/ChartCategories/ChartCategoryTypes";

export interface IVisualyticsResultsTransformers {
  data: { name: string; values: any[] }[];
  linkedData?: Record<string, Record<string, any[]>>;
  categoryDragItems: Record<string, Record<string, IDragItem>>;
  lineOrScatter?: "line" | "scatter";
  collateBy?: "xValue" | "yValue";
  collationFxn?: "average" | "sum";
}
