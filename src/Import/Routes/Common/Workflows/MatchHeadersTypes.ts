import { IUnit } from "../../../../Settings/Redux/State/UnitSettingsStateTypes";

export interface IApplicationHeaders {
  variableId: string;
  variableName: string;
  variableTitle: string;
  displayUnitId: string;
  units: IUnit[];
}
