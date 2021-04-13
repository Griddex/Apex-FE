export interface IForecastLanding {
  forecastvisualytics: JSX.Element;
  approvedforecastresults: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IForecastLanding;
};
