export interface ICorporateLayouts {
  background: JSX.Element;
  corporateLayout: JSX.Element;
}

export type IdType = {
  corporateId: keyof ICorporateLayouts;
};
