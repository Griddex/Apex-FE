import { IAllWorkflows } from "../../../Application/Components/Workflows/WorkflowTypes";
import {
  IStoredDataProps,
  IStoredDataRow,
} from "../../../Application/Types/ApplicationTypes";

export interface IForecastDeckRow extends IStoredDataRow {}

export interface IForecastInputDeckLanding {
  excel: JSX.Element;
  database: JSX.Element;
  approveddeck: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IForecastInputDeckLanding;
};
