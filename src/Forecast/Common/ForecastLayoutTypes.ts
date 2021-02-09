export interface IForecastLayouts {
  background: JSX.Element;
  forecastresults: JSX.Element;
}

export type IdType = {
  forecastId: keyof IForecastLayouts;
};
