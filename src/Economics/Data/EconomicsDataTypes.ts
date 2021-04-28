import { economicsParametersSensitivities } from "./EconomicsData";

export type TParametersSensitivitiesNames = typeof economicsParametersSensitivities[number]["variableName"];
export type TParametersSensitivitiesTitles = typeof economicsParametersSensitivities[number]["variableTitle"];
export type TParametersSensitivitiesObj = Record<
  TParametersSensitivitiesNames,
  {
    variableTitle: TParametersSensitivitiesTitles;
    values: number[];
  }
>;
