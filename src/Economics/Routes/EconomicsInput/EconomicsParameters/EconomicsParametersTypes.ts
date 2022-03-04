export interface IEconomicsParametersLayouts {
  excel: JSX.Element;
  database: JSX.Element;
  manual: JSX.Element;
  storeddeck: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IEconomicsParametersLayouts;
};
