import { IRawRow } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";

export interface IEconomicsParametersTable {
  row: IRawRow;
  additionalColumnsObj: Record<string, string>;
}

export interface IEconomicsParametersValue {
  row: IRawRow;
  valueTitle: "Table" | "Equation";
  nameOfTableOrEquation?: string;
  additionalColumnsObj?: IEconomicsParametersTable["additionalColumnsObj"];
}
