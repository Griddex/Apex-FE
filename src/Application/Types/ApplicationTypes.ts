import { IUserDetails } from "../Components/User/UserTypes";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { ITableButtonsProps } from "../Components/Table/TableButtonsTypes";
import {
  IAllWorkflows,
  INetworkWorkflows,
  ReducersType,
} from "../Components/Workflows/WorkflowTypes";
import {
  TDevScenarioNames,
  TEconomicsAnalysesNames,
  TEconomicsAnalysesTitles,
} from "../../Economics/Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
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
  snStoredData?: IStoredDataRow[];
  reducer?: ReducersType;
  dataKey?: string;
  dataTitle?: string;
  chartData?: Record<string, React.Key>[];
  showChart?: boolean;
  showBaseButtons?: boolean;
  tableButtons?: ITableButtonsProps;
  shouldRunAggregation?: boolean;
  mainUrl?: string;
  tableTitle?: string;
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
    | "productionPrioritizationStored"
    | "forecastResultsData"
    | "forecastResultsVisualytics"
    | "forecastResultsStored"
    | "economicsResultsStored";
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
  fetchStoredSuccessAction?: () => IAction;
  dataStored?: string;
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
}
export interface IApplicationStoredForecastResultsRow
  extends IApplicationStoredDataRow {
  saved: "Saved" | "Not Saved";
  forecastResultsId: string;
  networkTitle: string;
  networkId: string;
  forecastInputdeckTitle: string;
  forecastingParametersGroupTitle: string;
}

export interface ILandingData {
  name: string;
  description: string;
  icon: JSX.Element;
  route: string;
  workflowProcess: IAllWorkflows["wrkflwPrcss"] | IStoredDataProps["wkPs"];
  workflowCategory: IAllWorkflows["wrkflwCtgry"] | IStoredDataProps["wkCy"];
}

export interface IVariableNameTitle {
  variableName: string;
  variableTitle: string;
}

export type TVariableNameTitleData = IVariableNameTitle[];

export type TUseState<T> = React.Dispatch<React.SetStateAction<T>>;
