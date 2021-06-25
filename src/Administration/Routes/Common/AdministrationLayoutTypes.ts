export interface IAdministrationLayouts {
  background: JSX.Element;
  administration: JSX.Element;
}

export type IdType = {
  administrationId: keyof IAdministrationLayouts;
};
