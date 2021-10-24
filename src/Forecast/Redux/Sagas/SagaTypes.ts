import { TChartTypes } from "../../../Visualytics/Components/Charts/ChartTypes";

export interface IForecastResultsTransformers {
  data: any;
  yearsOrMonths?: number[];
  lineOrScatter?: "lineChart" | "scatterChart";
  isYear?: boolean;
}

export type TForecastResultsTransformersObj = Record<
  TChartTypes,
  (props: IForecastResultsTransformers) => any
>;
