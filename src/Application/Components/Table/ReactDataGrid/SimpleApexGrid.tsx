import sortBy from "lodash/sortBy";
import React, { useCallback, useMemo, useState } from "react";
import ReactDataGrid, {
  Column,
  DataGridHandle,
  HeaderRendererProps,
  SortDirection,
} from "react-data-griddex";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DraggableHeaderRenderer } from "./DraggableHeaderRenderer";

export interface IApexGrid<R> {
  columns: readonly Column<R, unknown>[];
  rows: R[];
}

export interface ITableMetaData<R> {
  scrollToIndex?: number;
  pageSelect?: string;
  tableFilter?: string;
  pageSelectTableRows?: R[];
  filteredTableRows?: R[];
}

export function SimpleApexGrid<R>(props: IApexGrid<R>) {
  const { columns: rawColumns, rows: rawRows } = props;

  const rawTableRows = React.useRef<R[]>(rawRows); //Memoize table data
  const [selectedRows, setSelectedRows] = React.useState(
    () => new Set<React.Key>()
  );
  const tableRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<DataGridHandle>(null);
  const tableHeaderHeight = 40;

  const [columns, setColumns] = useState(rawColumns);
  const [[sortColumn, sortDirection], setSort] = useState<
    [string, SortDirection]
  >(["", "NONE"]);

  const handleSort = useCallback(
    (columnKey: string, direction: SortDirection) => {
      setSort([columnKey, direction]);
    },
    []
  );

  const draggableColumns = useMemo(() => {
    function HeaderRenderer(props: HeaderRendererProps<R>) {
      return (
        <DraggableHeaderRenderer
          {...props}
          onColumnsReorder={handleColumnsReorder}
        />
      );
    }

    function handleColumnsReorder(sourceKey: string, targetKey: string) {
      const sourceColumnIndex = columns.findIndex((c) => c.key === sourceKey);
      const targetColumnIndex = columns.findIndex((c) => c.key === targetKey);
      const reorderedColumns = [...columns];

      reorderedColumns.splice(
        targetColumnIndex,
        0,
        reorderedColumns.splice(sourceColumnIndex, 1)[0]
      );

      setColumns(reorderedColumns);
    }

    return columns.map((c) => {
      if (c.key === "id") return c;
      return { ...c, headerRenderer: HeaderRenderer };
    });
  }, [columns]);
  console.log(
    "Logged output --> ~ file: SimpleApexGrid.tsx ~ line 78 ~ draggableColumns ~ draggableColumns",
    draggableColumns
  );

  const sortedRows = useMemo((): R[] => {
    if (sortDirection === "NONE") return rawTableRows.current;

    let sortedRows: R[] = [...rawTableRows.current];

    sortedRows = sortBy(sortedRows, (row: R) => (row as any)[sortColumn]);

    return sortDirection === "DESC" ? sortedRows.reverse() : sortedRows;
  }, [rawTableRows, sortDirection, sortColumn]);
  console.log(
    "Logged output --> ~ file: SimpleApexGrid.tsx ~ line 88 ~ sortedRows ~ sortedRows",
    sortedRows
  );

  function rowKeyGetter(row: R) {
    return (row as any)["sn"];
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div ref={tableRef} style={{ width: "100%", height: "100%" }}>
        <ReactDataGrid
          ref={gridRef}
          style={{ width: "100%", height: "100%" }}
          rows={sortedRows}
          rowKeyGetter={rowKeyGetter}
          selectedRows={selectedRows}
          onSelectedRowsChange={setSelectedRows}
          columns={draggableColumns}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
          headerRowHeight={tableHeaderHeight}
        />
      </div>
    </DndProvider>
  );
}
