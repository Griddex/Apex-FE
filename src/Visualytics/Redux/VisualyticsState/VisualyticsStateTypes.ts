import { allChartsDataAndSpecificProperties } from "../../Data/VisualyticsData";
import { ISelectOption } from "./../../../Application/Components/Selects/SelectItemsType";
import {
  chartObjectsNameTitleMap,
  initialColorGradient,
} from "./VisualyticsState";

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

export type TAllChartsDataAndSpecificProperties =
  typeof allChartsDataAndSpecificProperties;
export interface IVisualyticsState {
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

  selectedVisualyticsOption: ISelectOption;
  visualyticsChartsWorkflows: TAllChartsDataAndSpecificProperties;
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
