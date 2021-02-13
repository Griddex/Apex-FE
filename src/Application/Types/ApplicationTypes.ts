import { IUserDetails } from "../Components/User/UserTypes";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { ITableButtonsProps } from "../Components/Table/TableButtonsTypes";

export interface IExistingDataRow {
  sn?: number;
  id?: string;
  userId?: string;
  status: "Approved" | "Pending" | "Returned" | "Not Started";
  title?: string;
  description?: string;
  author: IUserDetails | string;
  approvers: IUserDetails[] | string;
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
  tableButtons?: ITableButtonsProps;
  wkPs?:
    | "facilitiesInputDeckExisting"
    | "forecastInputDeckExisting"
    | "productionInputDataExisting"
    | "economicsInputDataExisting"
    | "networkExisting"
    | "forecastResultsVisualytics"
    | "forecastResultsExisting"
    | "economicsParametersExisting";
  wkCy?: "existingDataWorkflows";
  containerStyle?: CSSProperties;
  finalAction?: () => void;
  finalIcon?: JSX.Element;
  finalText?: string;
}

export interface IGiftExistingData {
  createdAt: string;
  userId: string;
  title: string;
  description: string;
  id: string;
}
