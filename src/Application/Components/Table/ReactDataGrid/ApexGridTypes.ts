import { Column, PasteEvent } from "react-data-griddex";
import { TUseState } from "../../../Types/ApplicationTypes";
import { ITableButtonsProps } from "../TableButtonsTypes";

export type IRawRow = {
  [index: string]:
    | React.Key
    | Record<string, React.Key>
    | Record<string, React.Key>[]
    | string[]
    | boolean;
};

export type TRawRowValue<T> = T[keyof T];
export type TRawTable = IRawRow[];

export interface IPosition {
  idx: number;
  rowIdx: number;
}
export interface IApexGrid<R, O> {
  columns: readonly Column<R, unknown>[];
  rows: R[];
  tableButtons?: ITableButtonsProps;
  setRowsChange?: React.SetStateAction<any>;
  newTableRowHeight?: number;
  onSelectedCellChange?: (position: IPosition) => void;
  selectedRows?: Set<React.Key>;
  setSelectedRows?: TUseState<Set<any>>;
  onSelectedRowsChange?: (selectedRows: Set<React.Key>) => void | undefined;
  selectedRow?: number;
  onSelectedRowChange?: TUseState<any>;
  onRowsChange?: React.Dispatch<any>;
  onPaste?: (event: PasteEvent<R>) => R;
  mappingErrors?: React.Key[];
  size?: {
    readonly width: number | null;
    readonly height: number | null;
  };
  groupBy?: readonly string[];
  rowGrouper?: (
    rows: readonly R[],
    columnKey: string
  ) => Record<string, readonly R[]>;
  expandedGroupIds?: ReadonlySet<unknown>;
  onExpandedGroupIdsChange?: (expandedGroupIds: Set<unknown>) => void;
  showTableHeader?: boolean;
  showTablePagination?: boolean;
  autoAdjustTableDim?: boolean;
  staticTableHeight?: number;
  componentRef?: React.MutableRefObject<any>;
  initialRowsLength?: number;
}

export interface ITableMetaData<R> {
  scrollToIndex?: number;
  pageSelect?: string;
  tableFilter?: string;
  pageSelectTableRows?: R[];
  filteredTableRows?: R[];
}
