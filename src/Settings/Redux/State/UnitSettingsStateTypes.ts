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
  dayFormat: string;
  monthFormat: string;
  yearFormat: string;
  unitGroup: "Field" | "Metric" | "Mixed";
  units: IUnitsRow[];
}

export interface IHTTPResponse {
  statusCode: number;
  error: string[];
}

[
  { Module: "hjgsdvlchsdvshd", "hydrocarbon Stream": "oil" },
  { Module: "hg;f'gug", "hydrocarbon Stream": "gas" },
];
