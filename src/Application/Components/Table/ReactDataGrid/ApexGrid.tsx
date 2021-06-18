import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  makeStyles,
  OutlinedInput,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";
import filter from "lodash.filter";
import sortBy from "lodash.sortby";
import uniqBy from "lodash.uniqby";
import React, { useCallback, useMemo, useState } from "react";
import ReactDataGrid, {
  DataGridHandle,
  HeaderRendererProps,
  SortDirection,
} from "react-data-griddex";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ValueType } from "react-select";
import ApexSelectRS from "../../Selects/ApexSelectRS";
import { ISelectOption } from "../../Selects/SelectItemsType";
import TableButtons from "../TableButtons";
import composeRefs, { mergeRefs } from "./../../../Utils/ComposeRefs";
import { IApexGrid, ITableMetaData } from "./ApexGridTypes";
import { DraggableHeaderRenderer } from "./DraggableHeaderRenderer";

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
}));

export function ApexGrid<R, O>(props: IApexGrid<R, O>) {
  const classes = useStyles(props);

  const {
    columns,
    rows: rawRows,
    tableButtons,
    newTableRowHeight,
    onSelectedCellChange,
    selectedRows,
    setSelectedRows,
    selectedRow,
    onSelectedRowChange,
    onRowsChange,
    mappingErrors,
    size,
    groupBy,
    rowGrouper,
    expandedGroupIds,
    onExpandedGroupIdsChange,
    showTableHeader,
    showTablePagination,
    componentRef,
  } = props;
  console.log(
    "Logged output --> ~ file: ApexGrid.tsx ~ line 104 ~ componentRef",
    componentRef
  );

  const rawTableRows = React.useRef<R[]>(rawRows);
  const [filteredTableRows, setFilteredTableRows] = React.useState(rawRows);

  const totaltableHeight = size?.height as number;
  const tableHeight = totaltableHeight - 70;

  const tableRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<DataGridHandle>(null);

  const tableHeaderHeight = 40;
  const tableRowHeight = newTableRowHeight ? newTableRowHeight : 35;
  const pagesHeight = 35;
  const noOfTableRows = rawTableRows.current?.length;

  const [inComingColumns, setIncomingColumns] = useState(columns);

  const [[sortColumn, sortDirection], setSort] = useState<
    [string, SortDirection]
  >(["", "NONE"]);

  const [tablePagination, setTablePagination] = React.useState(0);

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

  const { pageSelect, tableFilter } = tableMetaData;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {showTableHeader && (
        <Grid
          className={classes.tableHeadBanner}
          container
          justify="space-between"
          alignItems="center"
          wrap="nowrap"
        >
          <Grid className={classes.tableFilter} item xs>
            <FormControl variant="outlined">
              <OutlinedInput
                id="outlined-adornment-filter"
                value={tableFilter}
                onChange={handleFilterChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
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
            <TableButtons {...tableButtons} />
          </Grid>
        </Grid>
      )}
      <DndProvider backend={HTML5Backend}>
        <div ref={tableRef} className={classes.tableHeightStyle}>
          <ReactDataGrid
            ref={mergeRefs(gridRef, componentRef)}
            style={{ height: "100%" }}
            rows={sortedRows}
            columns={draggableColumns}
            rowKeyGetter={rowKeyGetter}
            onSelectedCellChange={onSelectedCellChange}
            selectedRows={selectedRows}
            onSelectedRowsChange={setSelectedRows}
            onRowsChange={onRowsChange}
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
              handlePageSelectChange(
                (option as NonNullable<ISelectOption>).value
              );
            }}
            isSelectOptionType={true}
            menuPortalTarget={document.body}
            containerHeight={35}
          />
          <Pagination
            style={{ marginLeft: 10 }}
            count={tablePagination + 1}
            variant="outlined"
            shape="rounded"
            onChange={handlePaginationChange}
          />
        </div>
      )}
    </div>
  );
}
