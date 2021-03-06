import { FormikErrors, FormikTouched } from "formik";
import { IUserDetails } from "../../../Application/Components/User/UserTypes";
import {
  IApplicationStoredForecastResultsRow,
  TApproval,
} from "../../../Application/Types/ApplicationTypes";
import { RenderTree } from "../../../Visualytics/Components/TreeView/ApexTreeViewTypes";
import { TAllChartsDataAndSpecificProperties } from "../../../Visualytics/Redux/State/VisualyticsStateTypes";
import { ISelectOption } from "./../../../Application/Components/Selects/SelectItemsType";
import {
  forecastChartObjectsNameTitleMap,
  initialColorGradient,
} from "./ForecastState";

export type forecastChartObjNameType =
  keyof typeof forecastChartObjectsNameTitleMap;
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
  selectedForecastAggregationType: string;
  selectedForecastAggregationLevel: string;
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

  selectedForecastChartOption: ISelectOption;
  forecastChartsWorkflows: TAllChartsDataAndSpecificProperties;
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
  selectedView: string;
  selectedTableData: any;

  timeData: any[];
  forecastResults: any[];
  forecastDuration: number;
  forecastTree: RenderTree["children"];
  xValueCategories: string[];
  lineOrScatter: "lineChart" | "scatterChart";
  isYear: boolean;
  transForecastResult: any[];

  qualityAssuranceResults: any[];
  qualityAssuranceTree: RenderTree["children"];
  qualityAssuranceKeys: string[];
  transQualityAssuranceResult: any[];

  forecastResultsId: string;

  selectedForecastingResultsId: string;
  selectedForecastingResultsTitle: string;
  selectedForecastingResultsDescription: string;
  isForecastResultsLoading: boolean;
  isForecastResultsSaved: boolean;

  storedDataWorkflows: {
    forecastResultsStored: IApplicationStoredForecastResultsRow[];
  };

  forecastResultsAggregated: any[];

  selectedForecastData: any[];
  loadForecastResultsWorkflow: boolean;
}

export type colorGradient = typeof initialColorGradient;

export interface IStoredForecastResultsRow {
  sn?: number;
  id?: string;
  userId?: string;
  approval: TApproval;
  saved: "Saved" | "Not Saved" | string;
  forecastResultsId?: string;
  forecastResultsTitle?: string;
  networkId?: string;
  forecastParametersGroupId?: string;
  selectedForecastInputDeckId?: string;
  selectedForecastInputDeckTitle?: string;
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
