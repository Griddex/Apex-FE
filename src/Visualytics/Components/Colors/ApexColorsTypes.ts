import { IAction } from "../../../Application/Redux/Actions/ActionTypes";

export interface IApexColors {
  basePath: string;
  intialColorValue: string;
  plotRef: React.MutableRefObject<any>;
  updateParameterAction: (path: string, value: any) => IAction;
  axisFormat: string;
}
