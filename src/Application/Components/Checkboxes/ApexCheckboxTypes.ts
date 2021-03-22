import { IAction } from "../../Redux/Actions/ActionTypes";

export interface IApexCheckbox {
  shouldExecute: boolean[];
  shouldDispatch: boolean[];
  apexCheckboxActions: (() => void | IAction)[];
}
