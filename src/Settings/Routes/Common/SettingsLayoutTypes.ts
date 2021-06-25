export interface ISettingsLayouts {
  background: JSX.Element;
  settings: JSX.Element;
}

export type IdType = {
  settingsId: keyof ISettingsLayouts;
};
