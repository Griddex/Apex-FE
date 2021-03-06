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

export type TVariableTitle = NonNullable<IUnitsRow["variableTitle"]>;
export type TVariableName = NonNullable<IUnitsRow["variableName"]>;
export type TVariableTitleNameMap = Record<TVariableTitle, TVariableName>;

export type SelectedVariablesType = Pick<
  IUnitsRow,
  "variableName" | "displayUnitId" | "databaseUnitId"
>;

export type TNumberFormat = "number" | "exponential";

export interface IUnitSettingsData {
  unitGroup: "Field" | "Metric" | "Mixed";
  dayFormat: string;
  monthFormat: string;
  yearFormat: string;
  pressureAddend?: number;
  selectedVariableUnits: SelectedVariablesType[];
  variableUnits: IUnitsRow[];
  variableNameUnitsMap: Record<string, IUnit[]>;
  unitOptionsByVariableName: Record<string, ISelectOption[]>;
  appUnitsUnitGroupsMap: Record<string, string>;
  applicationUnitsCollection?: IUnitsRow["units"];
  numberFormat: TNumberFormat;
  numberFormatString: string;
}
