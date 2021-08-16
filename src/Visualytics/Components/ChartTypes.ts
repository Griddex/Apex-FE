export interface IChartProps {
  chartType?: string;
  data: any[];
  specificProperties?: any;
  commonProperties?: any;
  willUseThemeColor?: boolean;
}

export type DoughnutChartType = Record<string, React.Key>[];
