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

export interface IExistingDataRow {
  sn?: number;
  id?: string;
  userId?: string;
  status?: "Approved" | "Pending" | "Returned" | "Not Started";
  title?: string;
  description?: string;
  author?: IUserDetails | string;
  approvers?: IUserDetails[] | string;
  createdOn?: string;
  modifiedOn?: string;
  reducer?: ReducersType;
  // workflowProcess?:IExistingDataProps["wrkflwPrcss"]
}

export interface IExistingDataProps {
  snExistingData?: IExistingDataRow[];
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
  workflowProcess?: IExistingDataProps["wkPs"];
  wkPs?:
    | "facilitiesInputDeckExisting"
    | "forecastInputDeckExisting"
    | "productionInputDataExisting"
    | "economicsCostsRevenuesDeckExisting"
    | "economicsParametersDeckExisting"
    | "economicsSensitivitiesExisting"
    | "networkExisting"
    | "declineParametersExisting"
    | "productionPrioritizationExisting"
    | "forecastResultsData"
    | "forecastResultsVisualytics"
    | "forecastResultsExisting"
    | "economicsResultsExisting";
  wkCy?: "existingDataWorkflows";
  containerStyle?: CSSProperties;
  finalAction?: () => void;
  finalIcon?: JSX.Element;
  finalText?: string;
  name?: keyof Pick<IExistingDataRow, "id" | "title">;
  handleCheckboxChange?: (row: any, event?: React.ChangeEvent<any>) => void;
}

export interface IApplicationExistingDataRow {
  sn?: number;
  id?: string;
  userId?: string;
  status?: "Approved" | "Pending" | "Returned" | "Not Started";
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
export interface IApplicationExistingForecastResultsRow
  extends IApplicationExistingDataRow {
  saved: "Saved" | "Not Saved";
  forecastResultsId: string;
  networkTitle: string;
  networkId: string;
  forecastInputDeckTitle: string;
  forecastingParametersGroupTitle: string;
}

export interface ILandingData {
  name: string;
  description: string;
  icon: JSX.Element;
  route: string;
  workflowProcess: IAllWorkflows["wrkflwPrcss"] | IExistingDataProps["wkPs"];
  workflowCategory: IAllWorkflows["wrkflwCtgry"] | IExistingDataProps["wkCy"];
}

export interface IVariableNameTitle {
  variableName: string;
  variableTitle: string;
}

export type TVariableNameTitleData = IVariableNameTitle[];

export type TUseState<T> = React.Dispatch<React.SetStateAction<T>>;
