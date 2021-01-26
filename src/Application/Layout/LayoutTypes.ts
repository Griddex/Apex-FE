import { IAction } from "../Redux/Actions/ActionTypes";

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
  errors?: { message: "" };
}

export type GenericObjectRKType = Record<string, React.Key>;
export type GenericArrayRKType = GenericObjectRKType[];
export type GenericObjectSType = Record<string, string>;
export type GenericArraySType = GenericObjectSType[];

export interface IFinalAction {
  executeFinalAction: boolean;
  finalAction: () => IAction;
}
