import React, { useCallback, useMemo, useState } from "react";
import ReactDataGrid, { Column, HeaderRendererProps } from "react-data-griddex";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DraggableHeaderRenderer } from "./DraggableHeaderRenderer";
import sortBy from "lodash/sortBy";

export type SortDirection = "ASC" | "DESC" | "NONE";

const fakeRow = {
  year: 0,
  oilRate: 0,
  gasRate: 0,
  seismicCost: 0,
  explApprCost: 0,
  facilitiesCost: 0,
  tangWellCost: 0,
  intangWellCost: 0,
  abandCost: 0,
  directCost: 0,
  cha: 0,
  terminalCost: 0,
};

type sortColumnType = keyof typeof fakeRow;
export interface IApexGrid<R> {
  columns: readonly Column<R, unknown>[];
  rows: R[];
  sortColumn: sortColumnType;
  sortDirection: "ASC" | "DESC" | "NONE";
}

export function ApexGrid<R>(props: IApexGrid<R>) {
  const {
    columns: rawColumns,
    rows: rawRows,
    sortColumn: rawSortColumn,
    sortDirection: rawSortDirection,
  } = props;

  const [rows] = useState(rawRows);
  const [columns, setColumns] = useState(rawColumns);
  const [[sortColumn, sortDirection], setSort] = useState<
    [string, SortDirection]
  >([rawSortColumn, rawSortDirection]);

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

  const sortedRows = useMemo((): R[] => {
    if (sortDirection === "NONE") return rows;

    let sortedRows: R[] = [...rows];

    sortedRows = sortBy(sortedRows, (row: R) => (row as any)[sortColumn]);

    return sortDirection === "DESC" ? sortedRows.reverse() : sortedRows;
  }, [rows, sortDirection, sortColumn]);

  return (
    <DndProvider backend={HTML5Backend}>
      <ReactDataGrid
        columns={draggableColumns}
        rows={sortedRows}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
    </DndProvider>
  );
}
