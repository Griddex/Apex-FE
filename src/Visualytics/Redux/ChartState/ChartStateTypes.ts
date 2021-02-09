import { chartObjectsNameTitleMap, initialColorGradient } from "./ChartState";

export type chartObjNameType = keyof typeof chartObjectsNameTitleMap;
export interface IChartObject {
  chartObjId: string;
  chartObjName: chartObjNameType;
  formatObj?: {
    colorScheme: "solid" | "gradient";
    color?: string;
    gradient?: colorGradient;
  };
}
export interface IChartState {
  selectedChartIndex: number;
  selectedChartObjId: string;

  chartObjects: IChartObject[];
  formatObj: {
    chartLayoutColor: "white";
    chartSeriesSolidColors: string[];
  };
  structureObj: {
    xAxes: { xAxisId: string }[];
    yAxes: { yAxisId: string }[];
  };
}

export interface ICharts {
  [index: number]: () => JSX.Element;
}
export interface IChartMetaData {
  activeIndex?: number;
  chartAreaBorder?: number;
  activeDataKey?: string;
}
export interface IChartLayoutProps {
  chartLayoutColor?: string;
  chartLayoutGradient?: string;
  chartMetaData?: IChartMetaData;
}

export type colorGradient = typeof initialColorGradient;
