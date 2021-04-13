export interface IEconomicsCostsAndRevenuesLayouts {
  excel: JSX.Element;
  database: JSX.Element;
  manual: JSX.Element;
  apexforecast: JSX.Element;
  approveddeck: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IEconomicsCostsAndRevenuesLayouts;
};
