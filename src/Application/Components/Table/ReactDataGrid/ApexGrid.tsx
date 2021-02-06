import {
  FormControl,
  IconButton,
  InputAdornment,
  makeStyles,
  OutlinedInput,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";
import filter from "lodash/filter";
import sortBy from "lodash/sortBy";
import uniqBy from "lodash/uniqBy";
import React, { useCallback, useMemo, useState } from "react";
import ReactDataGrid, {
  DataGridHandle,
  HeaderRendererProps,
  SortDirection,
} from "react-data-griddex";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TableIcons from "../TableIcons";
import { IApexGrid, ITableMetaData } from "./ApexGridTypes";
import { DraggableHeaderRenderer } from "./DraggableHeaderRenderer";
import { SelectEditor } from "./SelectEditor";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "98%",
    height: "95%",
    border: "1px solid #A8A8A8",
    boxShadow: theme.shadows[2],
    backgroundColor: "#FFF",
  },
  tableHeadBanner: {
    width: "100%",
    height: 30,
    marginBottom: 5,
  },
  tableRoot: {
    display: "flex",
    alignItems: "flex-start",
    overflow: "overlay",
    width: "100%",
    height: "86%",
  },
  tableIcons: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    "& > *": {
      marginLeft: 10,
    },
  },
  tableFilter: {
    "& > *": { width: 190 },
  },
  tableHeader: { flexWrap: "nowrap" },
  tableColumnTitle: { "& > *": { textTransform: "capitalize" } },
  tablePagination: {
    display: "flex",
    width: "100%",
    height: 40,
    margin: 0,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  formControl: {
    height: 30,
    margin: theme.spacing(1),
    minWidth: 70,
  },
  filterIcon: { width: 20, height: 20, borderLeftColor: "#E7E7E7" },
  tableHeaders: {
    margin: 0,
  },
  headerRow: {
    fontSize: "14px",
    backgroundColor: "#EFEFEF",
    "& > *": {
      textTransform: "none",
    },
    borderBottom: "1px solid #F1F1F1",
  },
  bodyRow: {
    fontSize: "14px",
    borderBottom: "1px solid #F1F1F1",
    height: "100%",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      // border: `1px solid ${theme.palette.primary.light}`,
    },
  },
  selectedRow: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.light,
    "& > *": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.light,
    },
  },
}));

export function ApexGrid<R, O>(props: IApexGrid<R, O>) {
  const classes = useStyles();

  const {
    columns: rawColumns,
    rows: rawRows,
    options,
    newTableRowHeight,
    selectedRows,
    setSelectedRows,
  } = props;

  const rawTableRows = React.useRef<R[]>(rawRows); //Memoize table data
  const [, setRenderRows] = React.useState(rawRows);
  const [filteredTableRows, setFilteredTableRows] = React.useState(rawRows);

  const tableRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<DataGridHandle>(null);
  const tableHeaderHeight = 40;
  const tableRowHeight = newTableRowHeight ? newTableRowHeight : 35;
  const pagesHeight = 35;
  const noOfTableRows = rawTableRows.current.length;

  const [columns, setColumns] = useState(rawColumns);
  const [[sortColumn, sortDirection], setSort] = useState<
    [string, SortDirection]
  >(["", "NONE"]);

  const [tablePagination, setTablePagination] = React.useState(0);
  const [tableHeight, setTableHeight] = React.useState(500);

  const pageOptions = ["All", 25, 50, 100, 500].map((v) => ({
    value: v,
    label: v,
  }));
  const uniquePageOptions = uniqBy(pageOptions, (v) => v.label);

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
    // localDispatch({
    //   type: "FILTERROWS",
    //   payload: { filteredTableRows: tableRows },
    // });

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

  React.useEffect(() => {
    const tableHeight = tableRef?.current?.clientHeight || 600;
    console.log(
      "Logged output --> ~ file: ApexGrid.tsx ~ line 335 ~ React.useEffect ~ tableHeight",
      tableHeight
    );
    const pagination = Math.round(
      noOfTableRows / (tableHeight / tableRowHeight)
    );
    setTablePagination(pagination);
    setTableHeight(tableHeight);
    setFilteredTableRows(rawRows);
    setRenderRows(rawRows);
  }, [noOfTableRows, rawRows]);

  const { pageSelect, tableFilter } = tableMetaData;

  return (
    <>
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
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <SearchIcon className={classes.filterIcon} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item container className={classes.tableIcons}>
          <TableIcons localDispatch={localDispatch} options={options} />
        </Grid>
      </Grid>
      <DndProvider backend={HTML5Backend}>
        <div
          ref={tableRef}
          // style={{ width: "100%", height: "100%", minHeight: 200 }}
          style={{ width: "100%", height: "100%", minHeight: 200 }}
        >
          <ReactDataGrid
            ref={gridRef}
            // style={{ width: "100%", height: "100%" }}
            style={{ width: "100%" }}
            rows={sortedRows}
            rowKeyGetter={rowKeyGetter}
            selectedRows={selectedRows}
            onSelectedRowsChange={setSelectedRows}
            onRowsChange={setRenderRows}
            columns={draggableColumns}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
            headerRowHeight={tableHeaderHeight}
            rowHeight={tableRowHeight}
          />
        </div>
      </DndProvider>
      <div className={classes.tablePagination}>
        <div>Pages</div>
        {/* <FormControl variant="outlined" className={classes.formControl}> */}
        <SelectEditor
          className={classes.formControl}
          value={pageSelect || "All"}
          onChange={(value) => handlePageSelectChange(value)}
          options={uniquePageOptions}
          rowHeight={pagesHeight}
        />
        {/* </FormControl> */}
        <Pagination
          count={tablePagination + 1}
          variant="outlined"
          shape="rounded"
          onChange={handlePaginationChange}
        />
      </div>
    </>
  );
}
