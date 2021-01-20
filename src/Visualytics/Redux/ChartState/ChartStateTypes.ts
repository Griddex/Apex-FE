export type ChartObjectType = { id: string };

export interface IChartState {
  currentChartIndex: number;
  selectedChartElementId: Record<string, React.Key>;
  chartLayoutColor: "white";
  chartSeriesSolidColors: string[];
  chartObjects: ChartObjectType[];
  xAxes: string[];
  yAxes: string[];
}
