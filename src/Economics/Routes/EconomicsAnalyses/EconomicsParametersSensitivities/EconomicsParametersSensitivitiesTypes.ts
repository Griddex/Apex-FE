import { IUserDetails } from "../../../../Application/Components/User/UserTypes";
import {
  IEconomicsSensitivities,
  TParametersId,
} from "../EconomicsAnalysesTypes";
import { ISelectOption } from "./../../../../Application/Components/Selects/SelectItemsType";

export interface IParameterSensitivity {
  parIndex: number;
  parId: TParametersId;
  parameterSensitivitiesObj: Record<TParametersId, IEconomicsSensitivities>;
  setParameterSensitivitiesObj: React.Dispatch<React.SetStateAction<any>>;
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
  analysisName: string;
  sensitivityValues: ISensitivityColumn[];
  author: IUserDetails;
  createdOn: string;
  modifiedOn: string;
}
