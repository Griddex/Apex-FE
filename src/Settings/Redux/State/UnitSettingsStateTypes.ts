export interface IUnitsRow {
  sn?: number;
  key: string;
  parameter: string;
  appUnitOptions: Record<string, "field" | "metric">[];
  selectedAppUnitIndex: number;
}

export interface IUnitSettingsData {
  dayFormat: string;
  monthFormat: string;
  yearFormat: string;
  globalUnitGroup: "Field" | "Metric" | "Mixed";
  allUnits: IUnitsRow[];
  chosenAppUnitIndices?: number[];
}

export interface IHTTPResponse {
  statusCode: number;
  error: string[];
}
