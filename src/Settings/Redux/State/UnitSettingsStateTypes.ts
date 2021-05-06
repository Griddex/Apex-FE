import { ISelectOption } from "./../../../Application/Components/Selects/SelectItemsType";
export interface IUnit {
  title: string;
  group: string;
  unitId: string;
}
export interface IUnitsRow {
  sn?: number;
  variableTitle?: string;
  variableId?: string;
  variableName: string;
  displayUnitId?: string;
  databaseUnitId?: string;
  units: IUnit[];
}

export type SelectedVariablesType = Pick<
  IUnitsRow,
  "variableName" | "displayUnitId" | "databaseUnitId"
>;

export interface IUnitSettingsData {
  unitGroup: "Field" | "Metric" | "Mixed";
  dayFormat: string;
  monthFormat: string;
  yearFormat: string;
  pressureAddend?: number;
  selectedVariableUnits: SelectedVariablesType[];
  variableUnits: IUnitsRow[];
  uniqUnitOptions: ISelectOption[];
  applicationUnitsCollection?: IUnitsRow["units"];
}
