import { ButtonProps } from "@material-ui/core";
import { IAction } from "../Redux/Actions/ActionTypes";

export type LayoutNames =
  | "background"
  | "import"
  | "network"
  | "forecast"
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
  status?: number;
  message?: string;
  errors?: { message: "" };
}

export type GenericObjectRKType = Record<string, React.Key>;
export type GenericArrayRKType = GenericObjectRKType[];
export type GenericObjectSType = Record<string, string>;
export type GenericObjectObjStrType = Record<string, Record<string, string>>;
export type GenericArraySType = GenericObjectSType[];

export interface IButtonsConfigProps {
  buttonTexts: string[];
  variants?: ButtonProps["variant"][];
  colors?: ButtonProps["color"][];
  startIcons?: ButtonProps["startIcon"][];
  endIcons?: ButtonProps["endIcon"][];
  disableds?: ButtonProps["disabled"][];
  shouldExecute: boolean[];
  shouldDispatch: boolean[];
  finalActions: (() => IAction | void)[];
}
