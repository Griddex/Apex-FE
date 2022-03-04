import { IAllWorkflows } from "../../../Application/Components/Workflows/WorkflowTypes";
import {
  IStoredDataProps,
  IStoredDataRow,
} from "../../../Application/Types/ApplicationTypes";

export interface IForecastDeckRow extends IStoredDataRow {}

export interface IForecastProfilesDeckLanding {
  excel: JSX.Element;
  database: JSX.Element;
  storeddeck: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IForecastProfilesDeckLanding;
};
