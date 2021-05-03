import { IUserDetails } from "../../../../Application/Components/User/UserTypes";

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

export interface ISensitivityColumn {
  parameterName: string;
  parameterTitle: string;
  parameterValues: string;
}

//TODO: Maybe I can use same type to receive
//Gift's and define mine??
export interface IExistingEconomicsSensitivitiesRow {
  sn?: number;
  title?: string;
  description?: string;
  economicsSensitivitiesId: string;
  economicsSensitivitiesTitle: string;
  economicsSensitivitiesDescription: string;
  targetVariable: string;
  sensitivityParameters: ISensitivityColumn[];
  author: IUserDetails;
  createdOn: string;
  modifiedOn: string;
}
