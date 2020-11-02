import { fade, makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";
import orderBy from "lodash.orderby";
import React from "react";
import Draggable from "react-draggable";
import {
  AutoSizer,
  Column,
  SortDirection,
  SortIndicator,
  Table,
} from "react-virtualized";
import "react-virtualized/styles.css";
import TableIcons from "./TableIcons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "98%",
    height: "95%",
    border: "1px solid #A8A8A8",
    boxShadow: `${fade("#A8A8A8", 0.25)} 0 0 0 2px`,
    backgroundColor: "#FFF",
  },
  tableHeadBanner: {
    width: "100%",
    height: "8%",
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
  tableSearch: {
    "& > *": { width: 190 },
  },
  tableHeader: { flexWrap: "nowrap" },
  tableColumnTitle: { "& > *": { textTransform: "capitalize" } },
  tablePagination: {
    display: "flex",
    width: "100%",
    height: "6%",
    margin: 0,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  formControl: {
    height: 30,
    margin: theme.spacing(1),
    minWidth: 70,
  },
  searchIcon: { width: 20, height: 20 },
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

export default function ApexTable({
  tableData,
  tableHeaders,
  tableColumnWidths,
  tableWidth,
}) {
  const classes = useStyles();

  const tableRef = React.useRef(null);
  const tableHeaderHeight = 40;
  const tableRowHeight = 35;
  const noOfTableRows = tableData.length;

  const [tablePagination, setTablePagination] = React.useState(0);
  const [tableHeight, setTableHeight] = React.useState(500);

  const initializeTableMetaData = () => {
    const activeRow = null;
    const activeColumn = null;
    const sortBy = activeColumn;
    const currentSortDirection = SortDirection.ASC;
    const scrollToIndex = 1;
    const tableSelect = "all";
    const tableSearch = "";

    return {
      activeRow,
      activeColumn,
      sortBy,
      currentSortDirection,
      scrollToIndex,
      tableSelect,
      tableSearch,
    };
  };

  const tableMetaDataReducer = (state, action) => {
    switch (action.type) {
      case "SCROLLTO_TABLEROW":
        return {
          ...state,
          scrollToIndex: action.payload.scrollToIndex,
        };
      case "SORT_TABLE":
        return {
          ...state,
          sortBy: action.payload.sortBy,
          currentSortDirection: action.payload.currentSortDirection,
          tableData: action.payload.sortedTableData,
        };
      case "RESIZEHEIGHT_TABLE":
        return {
          ...state,
          tableHeight: action.payload.height,
        };
      case "SEARCH_TABLE":
        return {
          ...state,
          tableData: action.payload.tableData,
        };
      case "SEARCHVALUE_TABLE":
        return {
          ...state,
          tableSearch: action.payload.searchValue,
        };
      case "SELECTDATA_TABLE":
        return {
          ...state,
          tableSelect: action.payload.tableSelect,
          tableData: action.payload.selectedTableData,
        };
      case "ACTIVECOLUMN_TABLE":
        return {
          ...state,
          activeColumn: action.payload.dataKey,
        };
      case "ACTIVEROW_TABLE":
        return {
          ...state,
          activeRow: action.payload.index,
        };
      case "COLUMNWIDTHS_TABLE":
        return {
          ...state,
          tableColumnWidths: action.payload.tableColumnWidths,
          tableWidth: action.payload.tableWidth,
        };
      default:
        return state;
    }
  };

  const [tableMetaData, localDispatch] = React.useReducer(
    tableMetaDataReducer,
    initializeTableMetaData()
  );

  React.useEffect(() => {
    const tableHeight = tableRef.current.clientHeight;
    const pagination = Math.round(
      noOfTableRows / (tableHeight / tableRowHeight)
    );
    setTablePagination(pagination);
    setTableHeight(tableHeight);
  }, [noOfTableRows]);

  const handleSelectChange = (e) => {
    const tableSelectValue = e.target.value;
    const { tableData } = tableMetaData;

    if (tableSelectValue === "all") {
      localDispatch({
        type: "SELECTDATA_TABLE",
        payload: {
          tableSelect: tableSelectValue,
          selectedTableData: tableData,
        },
      });
    } else {
      const tableSelect = parseInt(tableSelectValue);
      const activeSelectedTableData = tableData.slice(0, tableSelect);

      localDispatch({
        type: "SELECTDATA_TABLE",
        payload: {
          tableSelect,
          selectedTableData: activeSelectedTableData,
        },
      });
    }
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    const { tableData } = tableMetaData;

    localDispatch({
      type: "SEARCHVALUE_TABLE",
      payload: { searchValue },
    });

    if (searchValue === "")
      localDispatch({
        type: "SEARCH_TABLE",
        payload: { tableData },
      });

    const searchedTableData = [];
    if (searchValue.length > 1) {
      let promise = new Promise((resolve, reject) => {
        for (const rowObj of tableData) {
          const tableRowArray = Object.values(rowObj);
          const searchValueIsPresent = tableRowArray.some((cellValue) => {
            const smallCellValue = String(cellValue).toLowerCase();

            return smallCellValue.indexOf(searchValue.toLowerCase()) !== -1;
          });
          if (searchValueIsPresent) searchedTableData.push(rowObj);
        }
        resolve(searchedTableData);
        if (searchedTableData === []) reject(new Error("No matches"));
      });

      promise
        .then((searchedTableData) => {
          localDispatch({
            type: "SEARCH_TABLE",
            payload: { searchedTableData },
          });
        })
        .catch(() =>
          localDispatch({
            type: "SEARCH_TABLE",
            payload: { searchedTableData: [] },
          })
        );
    }
  };

  const handlePaginationChange = (e, pageNumber) => {
    e.persist();
    const rowsPerPage = Math.round(tableHeight / tableRowHeight);

    let scrollToIndex = 0;
    if (pageNumber === 1) {
      scrollToIndex = 0;
    } else {
      scrollToIndex = pageNumber * rowsPerPage - 3;
    }
    //if last page is clicked, use last index as scroll index

    localDispatch({ type: "SCROLLTO_TABLEROW", payload: { scrollToIndex } });
  };

  const _rowClassName = ({ index }) => {
    if (index < 0) {
      return classes.headerRow;
    } else {
      const { activeRow } = tableMetaData;
      if (activeRow === index) return classes.selectedRow;
    }
    return classes.bodyRow;
  };

  const _sort = ({ sortBy, sortDirection }) => {
    const currentSortDirection =
      sortDirection === SortDirection.ASC ? "asc" : "desc";

    const sortedTableData = orderBy(
      tableData,
      [sortBy],
      [currentSortDirection]
    );

    localDispatch({
      type: "SORT_TABLE",
      payload: { sortBy, currentSortDirection, sortedTableData },
    });
  };

  const _noRowsRenderer = () => {
    return (
      <div>
        <h1>No data</h1>
      </div>
    );
  };

  const _onColumnClick = ({ dataKey }) =>
    localDispatch({
      type: "ACTIVECOLUMN_TABLE",
      payload: dataKey,
    });

  const _onRowClick = ({ index }) =>
    localDispatch({ type: "ACTIVEROW_TABLE", payload: index });

  const _resizeRow = ({ dataKey, deltaX }) => {
    //TODO: Optimize
    const { tableColumnWidths, tableWidth, tableHeaders } = tableMetaData;
    const index = tableHeaders.indexOf(dataKey);

    const columnWidth = tableColumnWidths[index] + deltaX;
    // const nextColumnWidth = tableColumnWidths[index + 1] - deltaX;

    tableColumnWidths.splice(index, 1, columnWidth);
    // tableColumnWidths.splice(index + 1, 1, nextColumnWidth);

    localDispatch({
      type: "COLUMNWIDTHS_TABLE",
      payload: { tableColumnWidths, tableWidth: tableWidth + deltaX },
    });
  };

  const _headerRenderer = ({ dataKey, label, sortBy, sortDirection }) => {
    const lastHeader = tableHeaders[tableHeaders.length - 1];

    return (
      <Grid
        className={classes.tableHeader}
        key={dataKey}
        container
        justify="space-between"
      >
        <Grid item container>
          <Typography variant="button" display="block" gutterBottom>
            {label}
          </Typography>
          <Grid item>
            {sortBy === dataKey && (
              <SortIndicator sortDirection={sortDirection} />
            )}
          </Grid>
        </Grid>
        <Grid item xs>
          <Draggable
            axis="x"
            onDrag={(event, { deltaX }) =>
              _resizeRow({
                dataKey,
                deltaX,
              })
            }
            zIndex={999}
          >
            <span>{dataKey === lastHeader ? "" : "⋮"}</span>
          </Draggable>
        </Grid>
      </Grid>
    );
  };

  const _cellRenderer = ({ dataKey, rowData }) => {
    const cell = rowData[dataKey];
    if (typeof cell === "function") return cell();
    else return cell;
  };

  const {
    sortBy,
    currentSortDirection,
    scrollToIndex,
    tableSelect,
    tableSearch,
  } = tableMetaData;

  return (
    <>
      <Grid
        className={classes.tableHeadBanner}
        container
        justify="space-between"
        alignItems="center"
        wrap="nowrap"
      >
        <Grid className={classes.tableSearch} item xs>
          <FormControl variant="outlined">
            {/* <InputLabel htmlFor="outlined-adornment-search">Search</InputLabel> */}
            <OutlinedInput
              id="outlined-adornment-search"
              value={tableSearch}
              onChange={handleSearchChange}
              endAdornment={
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <SearchIcon className={classes.searchIcon} />
                  </IconButton>
                </InputAdornment>
              }
              // labelWidth={50}
            />
          </FormControl>
        </Grid>
        <Grid item container className={classes.tableIcons}>
          <TableIcons localDispatch={localDispatch} />
        </Grid>
      </Grid>
      <div className={classes.tableRoot} ref={tableRef}>
        <AutoSizer>
          {({ height, width }) => (
            <Table
              height={height}
              width={width > tableWidth ? width : tableWidth}
              headerHeight={tableHeaderHeight}
              rowHeight={tableRowHeight}
              rowCount={tableData.length}
              rowGetter={({ index }) => tableData[index]}
              noRowsRenderer={_noRowsRenderer}
              overscanRowCount={10}
              rowClassName={_rowClassName}
              scrollToIndex={scrollToIndex}
              sortBy={sortBy}
              sortDirection={currentSortDirection.toUpperCase()}
              sort={_sort}
              onColumnClick={_onColumnClick}
              onRowClick={_onRowClick}
              headerClassName={classes.tableHeaders}
            >
              {tableHeaders &&
                tableHeaders.map((key, index) => {
                  return (
                    <Column
                      key={key}
                      dataKey={key}
                      label={tableHeaders[index]}
                      headerRenderer={_headerRenderer}
                      width={tableColumnWidths[index]}
                      cellRenderer={_cellRenderer}
                    />
                  );
                })}
            </Table>
          )}
        </AutoSizer>
      </div>
      <div className={classes.tablePagination}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            className={classes.formControl}
            id="demo-simple-select-outlined-label"
          >
            Pages
          </InputLabel>
          <Select
            className={classes.formControl}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={tableSelect || "all"}
            onChange={handleSelectChange}
            label="Number of Pages"
            size="small"
          >
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={500}>500</MenuItem>
          </Select>
        </FormControl>
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
