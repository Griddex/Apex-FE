import { TUseState } from "../../../Application/Types/ApplicationTypes";

export interface IIsSaveNetworkValid {
  isSaveNetworkValid?: boolean;
  setIsSaveNetworkValid?: TUseState<boolean>;
  titleDesc?: Record<string, string>;
}
export interface IIsSaveForecastResultsValid {
  isSaveForecastResultsValid?: boolean;
  setIsSaveForecastResultsValid?: TUseState<boolean>;
  titleDesc?: Record<string, string>;
}
