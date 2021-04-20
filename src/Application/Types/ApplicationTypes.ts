import { IUserDetails } from "../Components/User/UserTypes";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { ITableButtonsProps } from "../Components/Table/TableButtonsTypes";
import { IAllWorkflowProcesses } from "../Components/Workflows/WorkflowTypes";

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
  dataKey?: string;
  dataTitle?: string;
  chartData?: Record<string, React.Key>[];
  showChart?: boolean;
  showBaseButtons?: boolean;
  tableButtons?: ITableButtonsProps;
  wkPs?:
    | "facilitiesInputDeckExisting"
    | "forecastInputDeckExisting"
    | "productionInputDataExisting"
    | "economicsCostsRevenuesDeckExisting"
    | "economicsParametersDeckExisting"
    | "networkExisting"
    | "forecastResultsData"
    | "forecastResultsVisualytics"
    | "forecastResultsExisting";
  wkCy?: "existingDataWorkflows";
  containerStyle?: CSSProperties;
  finalAction?: () => void;
  finalIcon?: JSX.Element;
  finalText?: string;
  name?: keyof Pick<IExistingDataRow, "id" | "title">;
  persistIdTitleAction?: (
    name: IExistingDataProps["name"],
    value: any
  ) => {
    type: string;
    payload: {
      name: IExistingDataProps["name"];
      value: any;
    };
  };
}

export interface IApplicationExistingData {
  sn?: number;
  id?: string;
  userId?: string;
  status?: "Approved" | "Pending" | "Returned" | "Not Started";
  title?: string;
  description?: string;
  author?: IUserDetails | string;
  approvers?: IUserDetails[] | string;
  createdAt?: string;
}
export interface IApplicationExistingForecastResultsRow
  extends IApplicationExistingData {
  saved: "Saved" | "Not Saved";
  forecastResultsId: string;
  networkTitle: string;
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
