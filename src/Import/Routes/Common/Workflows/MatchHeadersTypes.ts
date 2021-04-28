import { IUnit } from "../../../../Settings/Redux/State/UnitSettingsStateTypes";

export type THeader = "Text" | "Number" | "Date";
export type TUnit = "Single" | "Multiple";
export interface IApplicationHeaders {
  variableId?: string;
  variableName: string;
  variableTitle: string;
  displayUnitId?: string;
  units?: IUnit[];
}

export type TSingleMatchObject = {
  header: string;
  type: THeader | TUnit;
  acceptMatch: boolean;
};

export type TUserMatchObject = {
  [index: string]: {
    [index: string]: {
      [index: string]: TSingleMatchObject;
    };
  };
};
