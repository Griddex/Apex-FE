import { FormikErrors, FormikTouched } from "formik";
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
  selectedForecastChartVariable: string;
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

export interface ISaveForecastResultsFormValues {
  forecastResultsTitle: string;
  forecastResultsDescription: string;
}

export interface ISaveForecastResultsProps
  extends ISaveForecastResultsFormValues {
  errors?: FormikErrors<ISaveForecastResultsFormValues>;
  touched?: FormikTouched<ISaveForecastResultsFormValues>;
  isValid?: boolean;
  handleChange?: (event: React.ChangeEvent<any>) => void;
  children?: (props: ISaveForecastResultsProps) => JSX.Element;
}
export interface ISaveForecastProps {
  children?: (props: ISaveForecastResultsProps) => JSX.Element;
}

export interface IForecastResultState extends ISaveForecastResultsProps {
  forecastResult: any[];
  forecastTree: RenderTree["children"];
  transForecastResult: any[];
}

export type colorGradient = typeof initialColorGradient;

export type ForecastStateType = IForecastResultState &
  IForecastChartState &
  IForecastChartLayoutProps;
