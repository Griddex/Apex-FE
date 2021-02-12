import { RenderTree } from "./../../Components/ForecastTreeViewTypes";
import {
  forecastChartObjectsNameTitleMap,
  initialColorGradient,
} from "./ForecastState";

export type forecastChartObjNameType = keyof typeof forecastChartObjectsNameTitleMap;
export interface IForecastChartObject {
  forecastChartObjId: string;
  forecastChartObjName: forecastChartObjNameType;
  formatObj?: {
    colorScheme: "solid" | "gradient";
    color?: string;
    gradient?: colorGradient;
  };
}
export interface IForecastChartState {
  selectedChartIndex: number;
  selectedChartObjId: string;

  forecastChartObjects: IForecastChartObject[];
  formatObj: {
    forecastChartLayoutColor: "white";
    forecastChartSeriesSolidColors: string[];
  };
  structureObj: {
    xAxes: { xAxisId: string }[];
    yAxes: { yAxisId: string }[];
  };
}

export interface IForecastCharts {
  [index: number]: () => JSX.Element;
}
export interface IForecastChartMetaData {
  activeIndex?: number;
  forecastChartAreaBorder?: number;
  activeDataKey?: string;
}
export interface IForecastChartLayoutProps {
  forecastChartLayoutColor?: string;
  forecastChartLayoutGradient?: string;
  forecastChartMetaData?: IForecastChartMetaData;
}

export interface IForecastResultState {
  forecastResult: any[];
  forecastTree: RenderTree;
}

export type colorGradient = typeof initialColorGradient;

export type ForecastStateType = IForecastResultState &
  IForecastChartState &
  IForecastChartLayoutProps;
