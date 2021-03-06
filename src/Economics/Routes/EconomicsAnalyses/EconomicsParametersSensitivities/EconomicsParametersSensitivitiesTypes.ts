import { IUserDetails } from "../../../../Application/Components/User/UserTypes";
import {
  IStoredDataRow,
  TUseState,
} from "../../../../Application/Types/ApplicationTypes";
import {
  IEcoSelectedSensitivities,
  TParametersId,
} from "../EconomicsAnalysesTypes";
import { ISelectOption } from "./../../../../Application/Components/Selects/SelectItemsType";

export interface IParameterSensitivity {
  parIndex: number;
  parId: TParametersId;
  parameterSensitivitiesObj: Record<TParametersId, IEcoSelectedSensitivities>;
  setParameterSensitivitiesObj: TUseState<any>;
}

export interface ISensitivityColumn {
  parameterName: string;
  parameterTitle: string;
  parameterValues: string;
}

//TODO: Maybe I can use same type to receive
//Gift's and define mine??
export interface IStoredEconomicsSensitivitiesRow {
  sn?: number;
  id?: string;
  title?: string;
  approval?: IStoredDataRow["approval"];
  description?: string;
  economicsSensitivitiesId?: string;
  economicsSensitivitiesTitle?: string;
  economicsSensitivitiesDescription?: string;
  analysisName?: string;
  sensitivityValues?: ISensitivityColumn[];
  author?: IUserDetails | string;
  createdOn?: string;
  modifiedOn?: string;
}
