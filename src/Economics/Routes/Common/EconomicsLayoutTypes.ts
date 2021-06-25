export interface IEconomicsLayouts {
  background: JSX.Element;
  costsrevenue: JSX.Element;
  parameters: JSX.Element;
  analyseslanding: JSX.Element;
  sensitivities: JSX.Element;
  viewresults: JSX.Element;
}

export type IdType = {
  economicsId: keyof IEconomicsLayouts;
};
