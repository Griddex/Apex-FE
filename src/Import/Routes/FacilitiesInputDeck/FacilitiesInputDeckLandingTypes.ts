export interface IFacilitiesInputDeckLanding {
  excel: JSX.Element;
  database: JSX.Element;
  storeddeck: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IFacilitiesInputDeckLanding;
};
