import { IExtendedSelectOption } from "../../Application/Components/Selects/SelectItemsType";
import { TUseState } from "../../Application/Types/ApplicationTypes";
import { TChartStory } from "../Components/Charts/ChartTypes";

export interface IVisualyticsLanding {
  excel: JSX.Element;
  database: JSX.Element;
  approveddeck: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IVisualyticsLanding;
};

export interface IChartVisualytics {
  selectedZ: string;
  setSelectedZ: TUseState<string>;
  chartStory: TChartStory;
  variableZDataOptions?: IExtendedSelectOption<string, string, string>[];
  ZValuesTitle?: string;
}
