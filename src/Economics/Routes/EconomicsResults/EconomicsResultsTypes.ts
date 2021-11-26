import { IExtendedSelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import { TUseState } from "../../../Application/Types/ApplicationTypes";

export interface IEconomicsResultsLanding {
  templateResults: JSX.Element;
  plotchartsTables: JSX.Element;
  storedResults: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IEconomicsResultsLanding;
};

export interface IEconomicsResultsVisualytics {
  selectedZ: string;
  setSelectedZ?: TUseState<string>;
  variableZDataOptions?: IExtendedSelectOption<string, string, string>[];
  ZValuesTitle?: string;
}
