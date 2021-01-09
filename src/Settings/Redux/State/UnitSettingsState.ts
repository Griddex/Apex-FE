export interface IUnitsRow {
  sn?: number;
  key: string;
  parameter: string;
  appUnitOptions: Record<string, "field" | "metric">[];
  selectedAppUnitIndex: number;
}

export interface IUnitsData {
  globalUnitGroup: "Field" | "Metric" | "Mixed";
  allUnits: IUnitsRow[];
  chosenAppUnitIndices?: number[];
}

const unitSettingsState: IUnitsData = {
  globalUnitGroup: "Field",
  allUnits: [],
  chosenAppUnitIndices: [],
};

export default unitSettingsState;
