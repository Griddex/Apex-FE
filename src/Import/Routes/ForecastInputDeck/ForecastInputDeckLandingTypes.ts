import { IExistingDataRow } from "../Common/InputLayoutTypes";

export interface IForecastDeckRow extends IExistingDataRow {}

export interface IForecastInputDeckLanding {
  excel: JSX.Element;
  database: JSX.Element;
  approveddeck: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IForecastInputDeckLanding;
};
