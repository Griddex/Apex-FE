import { IUserDetails } from "../Components/User/UserTypes";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { ITableButtonsProps } from "../Components/Table/TableButtonsTypes";
import {
  IAllWorkflowProcesses,
  ReducersType,
} from "../Components/Workflows/WorkflowTypes";
import {
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
  wkPs?:
    | "facilitiesInputDeckExisting"
    | "forecastInputDeckExisting"
    | "productionInputDataExisting"
    | "economicsCostsRevenuesDeckExisting"
    | "economicsParametersDeckExisting"
    | "economicsSensitivitiesExisting"
    | "networkExisting"
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

// export interface ILandingData {
export interface ILandingData {
  name: string;
  description: string;
  icon: JSX.Element;
  route: string;
  workflowProcess:
    | IAllWorkflowProcesses["wrkflwPrcss"]
    | IExistingDataProps["wkPs"];
  workflowCategory:
    | IAllWorkflowProcesses["wrkflwCtgry"]
    | IExistingDataProps["wkCy"];
}

export interface IVariableNameTitle {
  variableName: string;
  variableTitle: string;
}

export type TVariableNameTitleData = IVariableNameTitle[];

export type TUseState<T> = React.Dispatch<React.SetStateAction<T>>;
