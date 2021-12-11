import { IRawRow } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { TUseState } from "../../../Application/Types/ApplicationTypes";

export interface IColumnsObj {
  row: IRawRow;
  genericAddtnlColumnsObj?: Record<string, string>;
  customAddtnlColumnsObj?: Record<string, string>;
}

export interface IEconomicsParametersTable extends IColumnsObj {
  isRoyalty: boolean;
  toggleSwitch: boolean;
  setToggleSwitch: TUseState<boolean>;
  rows: IRawRow[];
  setRows: TUseState<IRawRow[]>;
  columnsObjKeys: string[];
  genericCustomAddtnlColumnsObj: Record<string, string>;
}

export interface IEconomicsParametersTableData extends IColumnsObj {}

export interface IEconomicsParametersValue extends IColumnsObj {
  valueTitle: "Table" | "Equation";
  nameOfTableOrEquation?: string;
}
