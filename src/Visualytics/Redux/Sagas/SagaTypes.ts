import { IDragItem } from "../../Components/ChartCategories/ChartCategoryTypes";
import { TChartStory } from "../../Components/Charts/ChartTypes";

export interface IVisualyticsResultsTransformers {
  data: { name: string; values: any[] }[];
  linkedData?: Record<string, Record<string, any[]>>;
  categoryDragItems: Record<string, Record<string, IDragItem>>;
  chartStory: TChartStory;
  lineOrScatter?: "lineChart" | "scatterChart";
  collateBy?: "xValue" | "yValue";
  collationFxn?: "average" | "sum";
}
