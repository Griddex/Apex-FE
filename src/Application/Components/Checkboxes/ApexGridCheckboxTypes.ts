import { IAction } from "../../Redux/Actions/ActionTypes";
import { IStoredDataRow } from "../../Types/ApplicationTypes";
import { ISelectOption } from "../Selects/SelectItemsType";

export interface IApexGridCheckbox {
  shouldExecute: boolean;
  shouldDispatch: boolean;
  apexGridCheckboxFxn: (
    // row: IStoredDataRow,
    //TODO: find a way to transfer type
    row?: any,
    event?: React.ChangeEvent<any>
  ) => void | IAction;
}

export interface IApexCheckboxData {
  value: string;
  label: string;
  handleCheck: () => void;
}

export interface IApexCheckboxGroup {
  variableZOption: ISelectOption;
  apexCheckboxDataGroup: IApexCheckboxData[];
}
