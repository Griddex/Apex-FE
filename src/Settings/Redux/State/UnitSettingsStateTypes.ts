export interface IUnit {
  title: string;
  group: string;
  unitId: string;
}
export interface IUnitsRow {
  sn?: number;
  variableName: string;
  variableTitle: string;
  variableId: string;
  displayUnitId: string;
  units: IUnit[];
}

export interface IUnitSettingsData {
  unitGroup: "Field" | "Metric" | "Mixed";
  dayFormat: string;
  monthFormat: string;
  yearFormat: string;
  pressureAddend?: number;
  variableUnits: IUnitsRow[];
}
