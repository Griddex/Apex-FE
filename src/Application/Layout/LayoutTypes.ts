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

export interface IHTTPResponse {
  data?: any;
  success?: boolean;
  statusCode?: number;
  message?: string;
  errors?: [];
}
