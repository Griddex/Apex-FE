export interface IChartObject {
  chartId: string;
  yAxes: { yAxisId: string }[];
}
export interface IChartState {
  currentChartIndex: number;
  selectedChartElementId: Record<string, React.Key>;
  chartLayoutColor: "white";
  chartSeriesSolidColors: string[];
  chartObjects: IChartObject[];
  xAxes: string[];
  yAxes: string[];
}

export interface ICharts {
  [index: number]: () => JSX.Element;
}
