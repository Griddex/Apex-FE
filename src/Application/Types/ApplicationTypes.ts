import { ITableIconsOptions } from "../Components/Table/ReactDataGrid/ApexGridTypes";
import { IUserDetails } from "../Components/User/UserTypes";

export interface IExistingDataRow {
  sn?: number;
  id?: string;
  userId?: string;
  status: "Approved" | "Pending" | "Returned" | "Not Started";
  title?: string;
  description?: string;
  author: IUserDetails;
  approvers: IUserDetails[];
  createdOn?: string;
  modifiedOn?: string;
  // workflowProcess?:IExistingDataProps["wrkflwPrcss"]
}

export interface IExistingDataProps {
  snExistingData?: IExistingDataRow[];
  dataKey?: string;
  dataTitle?: string;
  chartData?: Record<string, React.Key>[];
  tableOptions?: ITableIconsOptions;
  wkPs?:
    | "facilitiesInputDeckExisting"
    | "forecastInputDeckExisting"
    | "productionInputDataExisting"
    | "economicsInputDataExisting"
    | "networkExisting"
    | "economicsParametersExisting"
    | "";
  wkCy?: "existingDataWorkflows";
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
