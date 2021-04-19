import { IAction } from "../../Redux/Actions/ActionTypes";
import { IExistingDataRow } from "../../Types/ApplicationTypes";

export interface IApexCheckbox {
  shouldExecute: boolean;
  shouldDispatch: boolean;
  apexCheckboxFxn: (
    // row: IExistingDataRow,
    //TODO: find a way to transfer type
    row?: any,
    event?: React.ChangeEvent<any>
  ) => void | IAction;
}
