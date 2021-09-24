import { TUseState } from "../../../Application/Types/ApplicationTypes";

export interface IIsSaveEconomicsResultsValid {
  isSaveEconomicsResultsValid?: boolean;
  setIsSaveEconomicsResultsValid?: TUseState<boolean>;
  titleDesc?: Record<string, string>;
}
