export interface IChartProps {
  chartType?: string;
  data: any[];
  otherProperties?: any;
  willUseThemeColor?: boolean;
}

export type DoughnutChartType = Record<string, React.Key>[];
