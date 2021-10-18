import {
  alpha,
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import filter from "lodash.filter";
import sortBy from "lodash.sortby";
import uniqBy from "lodash.uniqby";
import zipObject from "lodash.zipobject";
import React, { useCallback, useMemo, useState } from "react";
import ReactDataGrid, {
  DataGridHandle,
  HeaderRendererProps,
  SortDirection,
} from "react-data-griddex";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ValueType } from "react-select";
import { parsePasteData } from "../../../../Economics/Utils/ParsePasteData";
import { Position, TPastePosition } from "../../../Types/ApplicationTypes";
import ApexSelectRS from "../../Selects/ApexSelectRS";
import { ISelectOption } from "../../Selects/SelectItemsType";
import TableButtons from "../TableButtons";
import { IApexGrid, IRawRow, ITableMetaData } from "./ApexGridTypes";
import { DraggableHeaderRenderer } from "./DraggableHeaderRenderer";
import { ITableButtonsProps } from "../TableButtonsTypes";
import grey from "@mui/material/colors/grey";

const useStyles = makeStyles((theme) => ({
  tableHeadBanner: {
    width: "100%",
    height: 30,
    marginBottom: 5,
  },
  tableButtons: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    "& > *": {
      marginLeft: 10,
    },
    width: 135,
  },
  mappingErrors: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    height: "100%",
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightBold,
  },
  tableFilter: {
    "& > *": { width: 190 },
  },
  tablePagination: {
    display: "flex",
    width: "100%",
    height: 40,
    margin: 5,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  formControl: {
    height: 30,
    marginLeft: 5,
    minWidth: 100,
    width: 100,
  },
  tableHeightStyle: {
    height: (props: any) => {
      if (props.autoAdjustTableDim) return `calc(100% - 70px)`;
      else return props.staticTableHeight; //Chosen for best fit
    },
  },
  search: {
    border: `1px solid ${grey[300]}`,
    "&:hover": {
      border: `1px solid ${theme.palette.primary.main}`,
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    },
    "&:active": {
      outline: `2px solid ${theme.palette.primary.main}`,
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    },
  },
}));

export default function ApexGrid<R = IRawRow, O = ITableButtonsProps>(
  props: IApexGrid<R, O>
) {
  const classes = useStyles(props);

  const {
    columns,
    rows: rawRows,
    tableButtons,
    newTableRowHeight,
    selectedRows,
    setSelectedRows,
    selectedRow,
    onSelectedRowChange,
    onRowsChange,
    onPaste,
    mappingErrors,
    size,
    groupBy,
    rowGrouper,
    expandedGroupIds,
    onExpandedGroupIdsChange,
    showTableHeader,
    showTablePagination,
    initialRowsLength,
  } = props;

  const rawTableRows = React.useRef<R[]>(rawRows);
  const [filteredTableRows, setFilteredTableRows] = React.useState(rawRows);

  const totaltableHeight = size?.height as number;
  const tableHeight = totaltableHeight - 70;

  const tableRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<DataGridHandle>(null);

  const tableHeaderHeight = 40;
  const tableRowHeight = newTableRowHeight ? newTableRowHeight : 35;
  const noOfTableRows = rawTableRows.current?.length;

  const [inComingColumns, setIncomingColumns] = useState(columns);

  const [[sortColumn, sortDirection], setSort] = useState<
    [string, SortDirection]
  >(["", "NONE"]);

  const [tablePagination, setTablePagination] = React.useState(0);
  const [selectedCell, setSelectedCell] = React.useState<Position>();
  const [pastePosition, setPastePosition] = React.useState<TPastePosition>({
    topLeft: {},
    botRight: {},
  });

  const handleCellSelection = (position: Position) => {
    setSelectedCell(position);
    setPastePosition((prev) => ({
      ...prev,
      topLeft: {
        ...prev.topLeft,
        rowIdx: position.rowIdx,
        colIdx: position.idx,
      },
    }));
  };

  const updateRows = (
    startRowIdx: number,
    startColIdx: number,
    newRows: any[]
  ) => {
    onRowsChange &&
      onRowsChange((prev: IRawRow[]) => {
        let rows = prev.slice();

        const extraRowsLength =
          newRows.length - ((initialRowsLength as number) - startRowIdx + 1);
        const extraRows = [];

        if (extraRowsLength > 0) {
          const lastSN = initialRowsLength as number;
          const headerNames = Object.keys(newRows[0]);

          for (let i = 0; i < extraRowsLength; i++) {
            const row = zipObject(
              headerNames,
              Array(headerNames.length).fill("")
            );
            extraRows.push({ ...row, sn: lastSN + i });
          }

          rows = [...rows, ...extraRows];
        }

        for (let i = 0; i < newRows.length; i++) {
          if (startRowIdx + i < rows.length) {
            rows[startRowIdx + i] = { ...rows[startRowIdx + i], ...newRows[i] };
          }
        }

        return rows;
      });
  };

  const handlePaste = (e: ClipboardEvent, pastePosition: TPastePosition) => {
    e.preventDefault();
    const { topLeft } = pastePosition;

    const newRows = [] as any[];
    let pasteData;
    if (e && e.clipboardData) {
      pasteData = parsePasteData(e.clipboardData.getData("text/plain"));

      pasteData.forEach((row) => {
        const rowData = {} as Record<string, any>;
        columns
          .slice(topLeft.colIdx, (topLeft.colIdx as number) + row.length)
          .forEach((col, j) => {
            rowData[col.key] = row[j];
          });
        newRows.push(rowData);
      });

      updateRows(topLeft.rowIdx as number, topLeft.colIdx as number, newRows);
    }
  };

  const pageOptions = ["All", 25, 50, 100, 500].map((v) => ({
    value: v,
    label: v,
  }));
  const uniquePageOptions = uniqBy(
    pageOptions,
    (v) => v.label
  ) as ISelectOption[];

  const initializeTableMetaData = (): ITableMetaData<R> => {
    const scrollToIndex = 1;
    const pageSelect = "All";
    const tableFilter = "";
    const pageSelectTableRows: R[] = [];

    return {
      scrollToIndex,
      pageSelect,
      tableFilter,
      pageSelectTableRows,
    };
  };

  const tableMetaDataReducer = (
    state: ITableMetaData<R>,
    action: {
      type: string;
      payload: ITableMetaData<R>;
    }
  ) => {
    switch (action.type) {
      case "SCROLLTOROW":
        return {
          ...state,
          scrollToIndex: action.payload.scrollToIndex,
        };
      case "FILTERROWS":
        return {
          ...state,
          filteredTableRows: action.payload.filteredTableRows,
        };
      case "FILTERVALUE":
        return {
          ...state,
          tableFilter: action.payload.tableFilter,
        };
      case "PAGESELECT":
        return {
          ...state,
          pageSelect: action.payload.pageSelect,
          pageSelectTableRows: action.payload.pageSelectTableRows,
        };
      default:
        return state;
    }
  };
  const [tableMetaData, localDispatch] = React.useReducer(
    tableMetaDataReducer,
    initializeTableMetaData()
  );

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
      const sourceColumnIndex = inComingColumns.findIndex(
        (c) => c.key === sourceKey
      );
      const targetColumnIndex = inComingColumns.findIndex(
        (c) => c.key === targetKey
      );
      const reorderedColumns = [...inComingColumns];

      reorderedColumns.splice(
        targetColumnIndex,
        0,
        reorderedColumns.splice(sourceColumnIndex, 1)[0]
      );

      setIncomingColumns(reorderedColumns);
    }

    return inComingColumns.map((c) => {
      if (c.key === "id") return c;
      return { ...c, headerRenderer: HeaderRenderer };
    });
  }, [inComingColumns]);

  const sortedRows = useMemo((): R[] => {
    if (sortDirection === "NONE") return filteredTableRows;

    let sortedRows: R[] = [...filteredTableRows];
    sortedRows = sortBy(sortedRows, (row: R) => (row as any)[sortColumn]);

    return sortDirection === "DESC" ? sortedRows.reverse() : sortedRows;
  }, [filteredTableRows, sortDirection, sortColumn]);

  const handleFilterChange = (e: { target: { value: any } }) => {
    const filterValue = e.target.value;

    const tableRows = rawTableRows.current;

    localDispatch({
      type: "FILTERVALUE",
      payload: { tableFilter: filterValue },
    });

    if (filterValue === "") setFilteredTableRows(tableRows);

    if (filterValue.length > 1) {
      const promise = new Promise<R[]>((resolve, reject) => {
        const filteredTableRows = filter(tableRows, (row) => {
          const valuesString = Object.values(row).join();
          return valuesString.includes(filterValue);
        });

        resolve(filteredTableRows);
        if (filteredTableRows === []) reject(new Error("No matches"));
      });

      promise
        .then((filteredTableRows: R[]) => {
          // localDispatch({
          //   type: "FILTERROWS",
          //   payload: { filteredTableRows },
          // });
          setFilteredTableRows(filteredTableRows);
        })
        .catch(() =>
          localDispatch({
            type: "FILTERROWS",
            payload: { filteredTableRows: [] },
          })
        );
    }
  };

  const handlePageSelectChange = (value: string) => {
    const pageSelectValue: string = value;

    if (pageSelectValue === "All") {
      localDispatch({
        type: "PAGESELECT",
        payload: {
          pageSelect: pageSelectValue,
          pageSelectTableRows: rawTableRows.current,
        },
      });
    } else {
      const pageSelect = parseInt(pageSelectValue);
      const activeSelectedTableRows: R[] = rawTableRows.current.slice(
        0,
        pageSelect
      );

      localDispatch({
        type: "PAGESELECT",
        payload: {
          pageSelect: pageSelect.toString(),
          pageSelectTableRows: activeSelectedTableRows,
        },
      });
    }
  };

  const handlePaginationChange = (
    e: { persist: () => void },
    pageNumber: number
  ) => {
    e.persist();
    const rowsPerPage = Math.round(tableHeight / tableRowHeight);

    let scrollToIndex = 0;
    if (pageNumber === 1) {
      scrollToIndex = 0;
    } else {
      scrollToIndex = (pageNumber - 1) * rowsPerPage - (pageNumber - 1);
    }
    gridRef.current!.scrollToRow(scrollToIndex);
  };

  function rowKeyGetter(row: R) {
    return (row as any)["sn"];
  }

  React.useLayoutEffect(() => {
    const pagination = Math.round(
      noOfTableRows / (tableHeight / tableRowHeight)
    );

    setTablePagination(pagination);
    setFilteredTableRows(rawRows);
    setIncomingColumns(columns);
  }, [tableHeight, rawRows, columns]);

  React.useEffect(() => {
    if (tableRef.current) {
      (tableRef.current as HTMLDivElement).addEventListener(
        "paste",
        (e: ClipboardEvent) => handlePaste(e, pastePosition)
      );
    }

    return () => {
      if (tableRef.current) {
        (tableRef.current as HTMLDivElement).removeEventListener(
          "paste",
          (e: ClipboardEvent) => handlePaste(e, pastePosition)
        );
      }
    };
  }, [JSON.stringify(selectedCell)]);

  const { pageSelect, tableFilter } = tableMetaData;

  return (
    <div style={{ width: "100%", height: "100%" }} ref={tableRef}>
      {showTableHeader && (
        <Grid
          className={classes.tableHeadBanner}
          container
          justifyContent="space-between"
          alignItems="center"
          wrap="nowrap"
        >
          <Grid className={classes.tableFilter} item xs>
            <OutlinedInput
              className={classes.search}
              id="outlined-adornment-filter"
              value={tableFilter}
              onChange={handleFilterChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    size="large"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              notched={true}
            />
          </Grid>
          {mappingErrors && mappingErrors?.length > 0 && (
            <Box
              fontSize={12}
              component="div"
              overflow="hidden"
              whiteSpace="pre-line"
              textOverflow="ellipsis"
              className={classes.mappingErrors}
            >
              {`Duplicates: ${mappingErrors.join(", ")}`}
            </Box>
          )}
          <Grid className={classes.tableButtons} item xs container>
            <TableButtons {...tableButtons} componentRef={tableRef} />
          </Grid>
        </Grid>
      )}
      <DndProvider backend={HTML5Backend}>
        <div className={classes.tableHeightStyle}>
          <ReactDataGrid
            ref={gridRef}
            style={{ height: "100%" }}
            rows={sortedRows}
            columns={draggableColumns}
            rowKeyGetter={rowKeyGetter}
            onSelectedCellChange={handleCellSelection}
            selectedRows={selectedRows}
            onSelectedRowsChange={setSelectedRows}
            onRowsChange={onRowsChange}
            onPaste={onPaste}
            selectedRow={selectedRow}
            onSelectedRowChange={onSelectedRowChange}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
            headerRowHeight={tableHeaderHeight}
            rowHeight={tableRowHeight}
            groupBy={groupBy}
            rowGrouper={rowGrouper}
            expandedGroupIds={expandedGroupIds}
            onExpandedGroupIdsChange={onExpandedGroupIdsChange}
          />
        </div>
      </DndProvider>
      {showTablePagination && (
        <div className={classes.tablePagination}>
          <div>Pages</div>
          <ApexSelectRS
            className={classes.formControl}
            containerWidth={100}
            valueOption={
              {
                value: pageSelect,
                label: pageSelect,
              } as NonNullable<ISelectOption>
            }
            data={uniquePageOptions}
            handleSelect={(option: ValueType<ISelectOption, false>) => {
              const optionDefined = option as NonNullable<ISelectOption>;
              handlePageSelectChange(optionDefined?.value as string);
            }}
            isSelectOptionType={true}
            menuPortalTarget={document.body}
            containerHeight={35}
          />
          <Pagination
            style={{ marginLeft: 10 }}
            count={tablePagination ? tablePagination + 1 : 1}
            variant="outlined"
            shape="rounded"
            onChange={handlePaginationChange}
          />
        </div>
      )}
    </div>
  );
}
