export interface IVisualyticsLayouts {
  background: JSX.Element;
  visualytics: JSX.Element;
}

export type IdType = {
  visualyticsId: keyof IVisualyticsLayouts;
};
