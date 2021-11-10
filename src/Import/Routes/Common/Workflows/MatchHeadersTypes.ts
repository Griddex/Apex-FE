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
  id: string;
  fileHeader?: string;
  appHeader?: string;
  include: boolean;
  fileUnit?: string;
  appUnit?: string | string[];
  unitId?: string | string[];
  optionIndex: number | number[];
  type: THeader | TUnit;
  unitGroup?: string;
  match: string;
  acceptMatch: boolean;
};

export type TUserMatchObject = {
  [index: string]: {
    [index: string]: {
      [index: string]: TSingleMatchObject;
    };
  };
};
