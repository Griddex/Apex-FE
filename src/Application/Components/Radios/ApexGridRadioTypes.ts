import { IAction } from "../../Redux/Actions/ActionTypes";
import { TUseState } from "../../Types/ApplicationTypes";
import { IExtendedSelectOption } from "../Selects/SelectItemsType";

export interface IApexGridRadio {
  shouldExecute: boolean;
  shouldDispatch: boolean;
  apexGridRadioFxn: (
    row?: any,
    event?: React.ChangeEvent<any>
  ) => void | IAction;
}

export interface IApexRadioGroup {
  selectedVariable?: string;
  setSelectedVariable?: TUseState<string>;
  variableZOption?: IExtendedSelectOption;
  apexRadioDataGroup: IExtendedSelectOption[];
}
