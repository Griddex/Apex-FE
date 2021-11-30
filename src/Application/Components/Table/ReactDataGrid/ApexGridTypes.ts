import React from "react";
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

export interface ISize {
  readonly width: number | null;
  readonly height: number | null;
}

export interface IApexGrid<R = IRawRow, O = ITableButtonsProps> {
  apexGridProps: IApexGridProps<R, O>;
  ref?: React.RefAttributes<HTMLDivElement>;
  // ref?: React.MutableRefObject<HTMLDivElement>;
}

export interface IApexGridProps<R, O> {
  columns: readonly Column<any, unknown>[];
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
  size?: ISize;
  groupBy?: readonly string[];
  rowGrouper?: (rows: readonly R[], columnKey: string) => Record<string, any[]>;
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
