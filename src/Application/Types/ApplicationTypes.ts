import { ITableIconsOptions } from "../Components/Table/ReactDataGrid/ApexGridTypes";
import { IUserDetails } from "../Components/User/UserTypes";

export interface IExistingDataRow {
  status: string;
  title: string;
  description: string;
  author: IUserDetails;
  approvers: IUserDetails[];
  createdOn: string;
  modifiedOn: string;
}

export interface IExistingDataProps {
  snExistingData?: IExistingDataRow[];
  dataKey?: string;
  dataTitle?: string;
  chartData?: Record<string, React.Key>[];
  tableOptions?: ITableIconsOptions;
  workflowProcess?:
    | "facilitiesInputDeckExisting"
    | "forecastInputDeckExisting"
    | "productionInputDataExisting"
    | "economicsInputDataExisting"
    | "networkExisting"
    | "";
  workflowCategory?: "existingDataCategory";
  finalAction?: () => void;
  finalIcon?: JSX.Element;
  finalText?: string;
}
