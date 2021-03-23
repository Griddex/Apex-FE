import { Column } from "react-data-griddex";
import { ITableButtonsProps } from "../TableButtonsTypes";

export type IRawRow = Record<
  string,
  React.Key | Record<string, React.Key> | Record<string, React.Key>[]
>;

export type IRawTable = IRawRow[];

export interface IApexGrid<R, O> {
  columns: readonly Column<R, unknown>[];
  rows: R[];
  tableButtons: ITableButtonsProps;
  setRowsChange?: React.SetStateAction<any>;
  newTableRowHeight?: number;
  selectedRows?: Set<React.Key>;
  setSelectedRows?: React.Dispatch<React.SetStateAction<Set<React.Key>>>;
  setRows?: (rows: R[]) => void;
  onSelectedRowsChange?: (selectedRows: Set<React.Key>) => void | undefined;
  selectedRow?: number;
  onSelectedRowChange?: React.Dispatch<React.SetStateAction<number>>;
  onRowsChange?: React.Dispatch<any>;
  mappingErrors?: string;
}

export interface ITableMetaData<R> {
  scrollToIndex?: number;
  pageSelect?: string;
  tableFilter?: string;
  pageSelectTableRows?: R[];
  filteredTableRows?: R[];
}
