import { NumberInputTranslationKey } from "carbon-components-react";
import { NumberInput } from "carbon-components-react/lib/components/NumberInput";
import { Column } from "react-data-griddex";
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
  setSelectedRows?: React.Dispatch<React.SetStateAction<Set<React.Key>>>;
  onSelectedRowsChange?: (selectedRows: Set<React.Key>) => void | undefined;
  selectedRow?: number;
  onSelectedRowChange?: React.Dispatch<React.SetStateAction<number>>;
  onRowsChange?: React.Dispatch<any>;
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
  adjustTableDimAuto?: boolean;
  staticTableHeight?: number;
}

export interface ITableMetaData<R> {
  scrollToIndex?: number;
  pageSelect?: string;
  tableFilter?: string;
  pageSelectTableRows?: R[];
  filteredTableRows?: R[];
}
