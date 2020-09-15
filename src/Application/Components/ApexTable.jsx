import { makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import BuildIcon from "@material-ui/icons/Build";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";
import orderBy from "lodash.orderby";
import zip from "lodash.zip";
import zipobject from "lodash.zipobject";
import React, { useReducer, useRef } from "react";
import Draggable from "react-draggable";
import {
  AutoSizer,
  Column,
  SortDirection,
  SortIndicator,
  Table,
} from "react-virtualized";
import "react-virtualized/styles.css";
import {
  persistFileHeadersAction,
  persistTableRowsRolesAction,
} from "./../../Import/Redux/Actions/ImportActions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "98%",
    height: "95%",
    border: "1px solid #707070",
    backgroundColor: "#FFF",
  },
  tableHeadBanner: {
    width: "95%",
    height: "8%",
  },
  tableRoot: {
    width: "95%",
    height: "86%",
    overflowX: "auto",
    overflowY: "none",
  },

  tableIcons: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    "& > *": {
      width: "24px",
      height: "24px",
    },
  },
  tableSearch: {
    "& > *": { width: 190 },
  },
  tableHeader: { flexWrap: "nowrap" },
  tableColumnTitle: { "& > *": { textTransform: "capitalize" } },
  tablePagination: {
    display: "flex",
    width: "95%",
    height: "6%",
    margin: 0,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  formControl: {
    height: 30,
    margin: theme.spacing(1),
    minWidth: 70,
    // "& > *": { height: 30 },
  },
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
    fontSize: "12px",
    borderBottom: "1px solid #F1F1F1",
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

export default function ApexTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    rawTableData,
    addedColumnsHeaders,
    addedColumns,
    addedColumnsWidths,
    actionsColumnProps,
    rolesColumnProps,
  } = props;

  const tableRef = useRef(null);
  const tableHeaderHeight = 40;
  const tableRowHeight = 35;
  const noOfTableRows = rawTableData.length;

  const [tablePagination, setTablePagination] = React.useState(0);
  const [tableHeight, setTableHeight] = React.useState(500);

  const initialTableMetaData = () => {
    const tableSearch = "";
    const tableSelect = "all";
    const scrollToIndex = 1;
    const activeRow = null;
    const activeColumn = null;

    //Robust algorithm to figure out what the keys are regardless of data shape
    //Find object in AoOs with highest number of keys?
    const headerRowIndex = rawTableData.reduce((maxNumber, row, i) => {
      const rowKeysLength = Object.keys(row).length;

      return rowKeysLength > maxNumber ? i : i;
    });

    //Generate actual ColumnHeaders
    const xlsxTableHeaders = Object.keys(rawTableData[headerRowIndex]);

    //Fill in blank spaces in table data
    const cleanTableData = rawTableData.map((row) => {
      const dataObj = {};
      for (const header of xlsxTableHeaders) {
        dataObj[header] = row[header] ? row[header] : "";
      }

      return dataObj;
    });

    //Generate interim ColumnHeaders
    const interimTableHeaders = xlsxTableHeaders.map((_, i) => `Column_${i}`);

    //Zip ColumnHeaders with keys for the Table API
    const headerRow = zipobject(interimTableHeaders, xlsxTableHeaders);

    //Bundle table headers with Table Data
    const xlsxHeadersTableData = [headerRow, ...cleanTableData];

    //Re-create table data by using interim headers
    const noAddsTableData = xlsxHeadersTableData.map((row) => {
      const rowValues = Object.values(row);

      return zipobject(interimTableHeaders, rowValues);
    });

    //Generate roles and actions array --> table api will be supplied this?
    //Update table data with Serial number and any other column data
    const tableData = noAddsTableData.map((row, i) => {
      return {
        SN: i + 1,
        ...addedColumns,
        ...row,
      };
    });

    //Update table headers with Serial number and any other column header
    const tableHeaders = ["SN", ...addedColumnsHeaders, ...interimTableHeaders];

    //Initial Tables Roles
    const dataRowsExceptFirstTwo = new Array(noOfTableRows - 1).fill(2);
    const initialRolesProps = [0, 1, ...dataRowsExceptFirstTwo];

    //Determine initial column widths
    const columnWidthsData = tableData.map((row) => {
      const rowWidths = Object.values(row).map(
        (value) => String(value).length * 13
      );

      return rowWidths;
    });
    const columnWidthsDataZipped = zip(...columnWidthsData);
    const columnMaxWidthsData = columnWidthsDataZipped.map((maxWidths, i) => {
      if (addedColumns && (i === 1 || i === 2)) return addedColumnsWidths; //A hack, please address with props
      return Math.max(...maxWidths);
    });

    //Initial table widths from all calculated widths
    const tableWidth = columnMaxWidthsData.reduce((a, c) => a + c);

    //For header renderer fxn
    const sortBy = activeColumn;
    const currentSortDirection = SortDirection.ASC;

    return {
      initialRolesProps,
      activeRow,
      activeColumn,
      sortBy,
      currentSortDirection,
      scrollToIndex,
      tablePagination,
      tableSelect,
      tableWidth,
      tableSearch,
      columnMaxWidthsData,
      tableHeaders,
      tableData,
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
          columnMaxWidthsData: action.payload.columnMaxWidthsData,
        };
      default:
        return {
          ...state,
        };
    }
  };

  const [tableMetaData, localDispatch] = useReducer(
    tableMetaDataReducer,
    initialTableMetaData()
  );

  React.useEffect(() => {
    const tableHeight = tableRef.current.clientHeight;
    const pagination = Math.round(
      noOfTableRows / (tableHeight / tableRowHeight)
    );
    setTablePagination(pagination);
    setTableHeight(tableHeight);

    const { initialRolesProps, tableHeaders } = tableMetaData;
    dispatch(persistTableRowsRolesAction(initialRolesProps));
    dispatch(persistFileHeadersAction(tableHeaders));
  }, []);

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
        .catch((error) =>
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
    const { columnMaxWidthsData, tableHeaders } = tableMetaData;
    const index = tableHeaders.indexOf(dataKey);

    const columnWidth = columnMaxWidthsData[index] + deltaX;
    const nextColumnWidth = columnMaxWidthsData[index + 1] - deltaX;

    columnMaxWidthsData.splice(index, 1, columnWidth);
    columnMaxWidthsData.splice(index + 1, 1, nextColumnWidth);

    localDispatch({
      type: "COLUMNWIDTHS_TABLE",
      payload: { columnMaxWidthsData },
    });
  };

  const _headerRenderer = ({ dataKey, label, sortBy, sortDirection }) => {
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
            <span>⋮</span>
          </Draggable>
        </Grid>
      </Grid>
    );
  };

  const _cellRenderer = ({ dataKey, rowData, rowIndex }) => {
    if (dataKey.startsWith("Column_") || dataKey.startsWith("SN")) {
      return rowData[dataKey];
    } else if (dataKey === "ACTIONS") {
      const actions = rowData[dataKey]();

      return React.cloneElement(actions, {
        ...actionsColumnProps,
      });
    } else if (dataKey === "ROLES") {
      const roles = rowData[dataKey]();

      //==>roles prop "#DA1B57"
      return React.cloneElement(roles, {
        rowIndex: rowIndex,
        ...rolesColumnProps,
      });
    } else {
      return rowData[dataKey];
    }
  };

  const {
    initialRolesProps,
    sortBy,
    currentSortDirection,
    scrollToIndex,
    tableSelect,
    tableWidth,
    tableSearch,
    columnMaxWidthsData,
    tableHeaders,
    tableData,
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
            <InputLabel htmlFor="outlined-adornment-search">Search</InputLabel>
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
                    <SearchIcon style={{ width: 20, height: 20 }} />
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={50}
            />
          </FormControl>
        </Grid>
        <Grid item container className={classes.tableIcons}>
          <AddIcon />
          <BeenhereIcon />
          <BuildIcon />
          <CardGiftcardIcon />
        </Grid>
      </Grid>
      <div className={classes.tableRoot} ref={tableRef}>
        <AutoSizer>
          {({ height }) => (
            <Table
              height={height}
              width={tableWidth}
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
                      width={columnMaxWidthsData[index]}
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
