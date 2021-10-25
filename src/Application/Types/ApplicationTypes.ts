import { CSSProperties } from "react";
import {
  TBackendDevScenarioTitles,
  TDevScenarioNames,
  TEconomicsAnalysesNames,
  TEconomicsAnalysesTitles,
} from "../../Economics/Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import { DialogStuff } from "../Components/Dialogs/DialogTypes";
import { IRawRow } from "../Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../Components/Table/TableButtonsTypes";
import { IUserDetails } from "../Components/User/UserTypes";
import {
  ReducersType,
  TAllWorkflowCategories,
  TAllWorkflowProcesses,
} from "../Components/Workflows/WorkflowTypes";
import { IAction } from "../Redux/Actions/ActionTypes";

export type TApproval = "Approved" | "Pending" | "Returned" | "Not Started";

export interface IStoredDataRow {
  sn?: number;
  id?: string;
  userId?: string;
  approval?: TApproval;
  title?: string;
  description?: string;
  author?: IUserDetails | string;
  approvers?: IUserDetails[] | string;
  createdOn?: string;
  modifiedOn?: string;
  reducer?: ReducersType;

  // workflowProcess?:IStoredDataProps["wrkflwPrcss"]
}

export interface IStoredDataProps {
  isAllForecastParameters?: boolean;
  isAllDeclineParameters?: boolean;
  isAllWellPrioritization?: boolean;
  snStoredData?: IStoredDataRow[];
  currentRow?: IStoredDataRow;
  reducer?: ReducersType;
  dataKey?: string;
  dataTitle?: string;
  chartData?: Record<string, React.Key>[];
  showChart?: boolean;
  showBaseButtons?: boolean;
  tableButtons?: ITableButtonsProps;
  shouldRunAggregation?: boolean;
  mainUrl?: string;
  collectionName?: string;
  tableTitle?: string;
  allWorkflowProcesses?: TAllWorkflowProcesses;
  workflowProcess?: IStoredDataProps["wkPs"];
  wkPs?:
    | "facilitiesInputDeckStored"
    | "forecastInputDeckStored"
    | "productionInputDataStored"
    | "economicsCostsRevenuesDeckStored"
    | "economicsParametersDeckStored"
    | "economicsSensitivitiesStored"
    | "networkStored"
    | "declineParametersStored"
    | "declineParametersCreate"
    | "productionPrioritizationStored"
    | "productionPrioritizationCreate"
    | "forecastResultsData"
    | "forecastResultsVisualytics"
    | "forecastResultsStored"
    | "economicsResultsStored"
    | "visualyticsDeckStored";
  wkCy?: "storedDataWorkflows";
  containerStyle?: CSSProperties;
  finalAction?: () => void;
  finalIcon?: JSX.Element;
  finalText?: string;
  name?: keyof Pick<IStoredDataRow, "id" | "title">;
  handleCheckboxChange?: (row: any, event?: React.ChangeEvent<any>) => void;
  componentRef?: React.MutableRefObject<any>;
  clickAwayAction?: () => void;
  fetchStoredUrl?: string;
  fetchStoredRequestAction?: (projectIdDefined?: string) => IAction;
  updateTableActionConfirmation?: (
    id: string
  ) => (titleDesc: Record<string, string>) => void;
  dataStored?: string;
  dialog?: DialogStuff<IRawRow>;
  buttonToolTip?: string;
  butttonTitle?: string;
  dialogTitle?: string;
  isDataVisibility?: boolean;
  isCloning?: boolean;
  wcc?: string;
  isCreateOrEdit?: boolean;
  willFetchForecast?: boolean;
}

export interface IApplicationStoredDataRow {
  sn?: number;
  id?: string;
  userId?: string;
  approval?: TApproval;
  title?: string;
  description?: string;
  author?: IUserDetails | string;
  approvers?: IUserDetails[] | string;
  createdAt?: string;
  sensitivities?: "Yes" | "None";
  analysisTitle?: TEconomicsAnalysesTitles | "Multiple";
  analysisName?: TEconomicsAnalysesNames;
  developmentScenariosCostsRevenue?: TDevScenarioNames[];
  build?: "Auto" | "Manual";
}
export interface IApplicationStoredForecastResultsRow
  extends IApplicationStoredDataRow {
  saved: "Saved" | "Not Saved";
  forecastResultsId: string;
  networkTitle: string;
  networkId: string;
  forecastInputDeckTitle: string;
  forecastingParametersGroupTitle: string;
}

export interface IApplicationStoredEconomicsResultsRow {
  sn?: number;
  id?: string;
  userId?: string;
  approval?: TApproval;
  title?: string;
  description?: string;
  saved?: "Saved" | "Not Saved";
  hasSensitivities: boolean;
  analysisName?: TEconomicsAnalysesNames | TEconomicsAnalysesNames[];
  developmentScenariosAnalysis?: TBackendDevScenarioTitles[];
  author?: IUserDetails | string;
  approvers?: IUserDetails[] | string;
  createdAt?: string;
}

export interface ILandingData {
  name: string;
  description: string;
  icon: JSX.Element;
  route: string;
  workflowProcess: TAllWorkflowProcesses | IStoredDataProps["wkPs"];
  workflowCategory?: TAllWorkflowCategories | IStoredDataProps["wkCy"];
}

export interface IVariableNameTitle {
  variableName: string;
  variableTitle: string;
}

export type TVariableNameTitleData = IVariableNameTitle[];

export type TUseState<T> = React.Dispatch<React.SetStateAction<T>>;

export type TApexRowData =
  | boolean
  | React.Key
  | string[]
  | Record<string, React.Key>
  | Record<string, React.Key>[];

export type TApexData = string[] | Record<string, TApexRowData>[];

export type TTitleDescription = { title: string; description: string };

export interface Position {
  idx: number;
  rowIdx: number;
}

export type TPastePosition = {
  topLeft: { rowIdx?: number; colIdx?: number };
  botRight: { rowIdx?: number; colIdx?: number };
};

export type TSize = { height: number; width: number };
