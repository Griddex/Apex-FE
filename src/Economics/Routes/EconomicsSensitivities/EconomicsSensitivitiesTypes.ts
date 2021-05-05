export interface IEconomicsSensitivitiesLayouts {
  create: JSX.Element;
  existing: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IEconomicsSensitivitiesLayouts;
};
