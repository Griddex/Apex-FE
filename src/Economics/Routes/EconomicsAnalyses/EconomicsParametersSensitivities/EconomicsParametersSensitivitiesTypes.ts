export interface IParameterSensitivity {
  sensitivitiesIndex: number;
  sensitivitiesTitle: string;
  parameterSensitivitiesObj: Record<
    string,
    { parameters: string[]; selectedParameter: string }
  >;
  setParameterSensitivitiesObj: React.Dispatch<React.SetStateAction<any>>;
  variableTitlesNamesObj: Record<string, string>;
}
