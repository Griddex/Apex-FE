export interface IEconomicsSensitivitiesLayouts {
  create: JSX.Element;
  stored: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IEconomicsSensitivitiesLayouts;
};
