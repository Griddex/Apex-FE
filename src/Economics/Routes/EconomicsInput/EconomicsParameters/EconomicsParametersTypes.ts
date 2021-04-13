export interface IEconomicsParametersLayouts {
  excel: JSX.Element;
  database: JSX.Element;
  manual: JSX.Element;
  approveddeck: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IEconomicsParametersLayouts;
};
