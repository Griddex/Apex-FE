import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { useCombinedRefs } from "./useCombinedRefs";
import SortableHeaderCell from "./SortableHeaderCell";
import { HeaderRendererProps } from "react-data-griddex";

interface ColumnDragObject {
  key: string;
}

interface DraggableHeaderRendererProps<R> extends HeaderRendererProps<R> {
  onColumnsReorder: (sourceKey: string, targetKey: string) => void;
}

export function DraggableHeaderRenderer<R>({
  onColumnsReorder,
  column,
  sortColumn,
  sortDirection,
  onSort,
}: DraggableHeaderRendererProps<R>) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "COLUMN_DRAG",
      item: { key: column.key },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );

  const [{ isOver }, drop] = useDrop({
    accept: "COLUMN_DRAG",
    drop({ key }: ColumnDragObject) {
      onColumnsReorder(key, column.key);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={useCombinedRefs(drag, drop)}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isOver ? "#ececec" : "inherit",
        cursor: "move",
      }}
    >
      <SortableHeaderCell
        column={column}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={onSort}
      >
        {column.name}
      </SortableHeaderCell>
    </div>
  );
}
