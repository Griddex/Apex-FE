import {
  ISubContextTabData,
  ISubContextTabPanel,
} from "./ChartTabsWrapperTypes";

export interface IChartObjContent {
  none?: null;
  chartLayout?: {
    subContextTabs: ISubContextTabData[];
    subContextTabPanels: ISubContextTabPanel[];
  };
  chartPlotArea?: Record<string, string>;
  legend?: Record<string, string>;
  yAxis?: Record<string, string>;
  xAxis?: Record<string, string>;
  axisTitle?: Record<string, string>;
  chartTitle?: Record<string, string>;
  dataLabels?: Record<string, string>;
  dataPoint?: Record<string, string>;
  dataSeries?: Record<string, string>;
  gridLines?: Record<string, string>;
}

export type optionType = "None" | "Solid" | "Gradient";
