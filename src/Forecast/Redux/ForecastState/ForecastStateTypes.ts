import { FormikErrors, FormikTouched } from "formik";
import { IUserDetails } from "../../../Application/Components/User/UserTypes";
import { IApplicationExistingForecastResultsRow } from "../../../Application/Types/ApplicationTypes";
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
  selectedModuleIds: string[];
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
  forecastResults: any[];
  forecastTree: RenderTree["children"];
  forecastKeys: string[];
  transForecastResult: any[];

  forecastResultsId: string;

  selectedForecastingResultsId: string;
  isForecastResultsLoading: boolean;
  isForecastResultsSaved: boolean;

  existingDataWorkflows: {
    forecastResultsExisting: IApplicationExistingForecastResultsRow[];
  };
}

export type colorGradient = typeof initialColorGradient;

export interface IExistingForecastResultsRow {
  sn?: number;
  id?: string;
  userId?: string;
  status: "Approved" | "Pending" | "Returned" | "Not Started";
  saved: "Saved" | "Not Saved" | string;
  title?: string;
  forecastResultsId?: string;
  forecastParametersGroupId?: string;
  forecastInputDeckId?: string;
  forecastInputDeckTitle?: string;
  forecastParametersTitle?: string;
  description?: string;
  author: IUserDetails | string;
  approvers: IUserDetails[] | string;
  createdOn: string;
  modifiedOn: string;
}

export type ForecastStateType = IForecastResultState &
  IForecastChartState &
  IForecastChartLayoutProps;
