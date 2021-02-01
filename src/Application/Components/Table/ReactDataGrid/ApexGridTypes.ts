import { Column } from "react-data-griddex";

export type IRawRow = Record<
  string,
  React.Key | Record<string, React.Key> | Record<string, React.Key>[]
>;

export type IRawTable = IRawRow[];

export interface ITableIconsOptions {
  [x: string]: { show: boolean; action?: () => void };
}

export interface IApexGrid<R, O> {
  columns: readonly Column<R, unknown>[];
  rows: R[];
  options: ITableIconsOptions;
  setRowsChange?: React.SetStateAction<any>;
  newTableRowHeight?: number;
  selectedRows?: Set<React.Key>;
  setSelectedRows?: React.Dispatch<React.SetStateAction<Set<React.Key>>>;
}

export interface ITableMetaData<R> {
  scrollToIndex?: number;
  pageSelect?: string;
  tableFilter?: string;
  pageSelectTableRows?: R[];
  filteredTableRows?: R[];
}
