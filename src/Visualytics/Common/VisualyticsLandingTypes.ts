import { TUseState } from "../../Application/Types/ApplicationTypes";

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
}
