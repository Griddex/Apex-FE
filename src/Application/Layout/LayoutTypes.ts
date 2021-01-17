export type LayoutNames =
  | "background"
  | "import"
  | "network"
  | "visualytics"
  | "economics"
  | "declineCurveAnalysis"
  | "corporate"
  | "administration"
  | "settings";
export type ILayouts = Record<LayoutNames, JSX.Element>;
