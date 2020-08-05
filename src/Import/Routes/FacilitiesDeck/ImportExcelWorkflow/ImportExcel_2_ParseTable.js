import { makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import BuildIcon from "@material-ui/icons/Build";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";
import orderBy from "lodash.orderby";
import zip from "lodash.zip";
import React, { useEffect, useReducer, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AutoSizer,
  Column,
  SortDirection,
  SortIndicator,
  Table,
} from "react-virtualized";
import ToTitleCase from "./../../../../Application/Utils/ToTitleCase";
import Draggable from "react-draggable";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    [theme.breakpoints.down("sm")]: { width: "95%" },
    height: "100%",
  },
  tableHeadBanner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "10%",
    marginLeft: "20px",
    marginRight: "20px",
  },
  tableTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "50%",
    fontWeight: "bold",
    fontSize: "14px",
  },
  tableFunctions: {
    display: "flex",
    width: "100%",
    height: "50%",
  },
  tableIcons: {
    display: "flex",
    width: "70%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    "& > *": {
      width: "24px",
      height: "24px",
    },
  },
  tableSearch: {
    display: "flex",
    width: "30%",
    height: "100%",
    alignItems: "flex-start",
  },
  tableRoot: {
    width: "100%",
    height: "70%",
    marginLeft: "20px",
    marginRight: "20px",
    overflowX: "auto",
    overflowY: "none",
  },
  outlinedInput: {
    height: "30px",
    width: "350px",
    paddingLeft: 0,
  },
  pagination: {
    display: "flex",
    width: "100%",
    height: "30px",
    margin: "20px",
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: theme.palette.primary.main,
  },
  formControl: {
    height: "30px",
    margin: theme.spacing(1),
    minWidth: 230,
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
    fontSize: "12px",
    borderBottom: "1px solid #F1F1F1",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.light,
    "& > *": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.light,
    },
  },
  rows: {
    fontSize: "12px",
    textTransform: "none",
  },
  resizeColumn: {
    cursor: "col-resize",
    // float: "right",
    position: "absolute",
    right: "0px",
  },
  resizeHandle: {
    cursor: "col-resize",
    float: "right",
    color: theme.palette.primary.main,
    zIndex: 999,
  },
}));

export default function ImportExcel_2_ParseTable() {
  const tableRef = useRef(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  const sheetDataArray = useSelector(
    (state) => state.ImportReducer.SelectedWorksheetData
  );
  const noOfRows = sheetDataArray.length;

  const initialTableMetaData = () => {
    const tableHeight = 0;
    const tableSearch = "";
    const tableSelect = "all";
    const tablePagination = 0;
    const scrollToIndex = 1;
    const currentRowIndex = null;
    const currentColumnDatakey = null;

    const tableKeysArray = Object.keys(sheetDataArray[0]).map(
      (_, i) => `column_${i}`
    );
    const sortBy = tableKeysArray[0];
    const currentSortDirection = SortDirection.ASC;
    const noOfColumns = tableKeysArray.length;

    const singleColumnthicknessFraction = 1 / noOfColumns;
    const columnWidthsArray = new Array(noOfColumns).fill(
      singleColumnthicknessFraction
    );

    let columnWidthsObj = {};
    let index = 0;
    for (const key of tableKeysArray) {
      columnWidthsObj[key] = columnWidthsArray[index];
      index += 1;
    }

    const finalsheetDataArray = [];
    let columnWidthsNumberArray = [];
    for (const obj of sheetDataArray) {
      let i = 0;
      let reKeyedSheetDataObj = {};
      let widthArray = [];
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const cellValue = obj[key];
          reKeyedSheetDataObj[tableKeysArray[i]] = cellValue;
          widthArray.push(String(cellValue).length * 10);
        }
        i += 1;
      }
      columnWidthsNumberArray.push(widthArray);
      finalsheetDataArray.push(reKeyedSheetDataObj);
    }

    const columnHeaderWidthsArray = Object.keys(finalsheetDataArray[0]).map(
      (key) => key.length
    );

    columnWidthsNumberArray = [
      columnHeaderWidthsArray,
      ...columnWidthsNumberArray,
    ];

    const columnWidthsArrayTransposed = zip(...columnWidthsNumberArray);
    const columnWidthsArrayfinal = columnWidthsArrayTransposed.map(
      (widthArray) => Math.max(...widthArray)
    );
    const tableWidth = columnWidthsArrayfinal.reduce((a, c) => a + c, 0);
    const originalSheetDataArray = finalsheetDataArray;

    return {
      currentRowIndex,
      currentColumnDatakey,
      sortBy,
      currentSortDirection,
      scrollToIndex,
      tablePagination,
      tableSelect,
      tableHeight,
      tableWidth,
      tableSearch,
      tableKeysArray,
      columnWidthsObj,
      columnWidthsArrayfinal,
      originalSheetDataArray,
      finalsheetDataArray,
    };
  };

  const tableMetaDataReducer = (state, action) => {
    switch (action.type) {
      case "initializeTableMetadata":
        return {
          ...state,
          tableHeight: tableRef.current.clientHeight,
          tableWidth: state.tableWidth,
        };
      case "scrollToRow":
        return {
          ...state,
          scrollToIndex: action.payload.scrollToIndex,
        };
      case "executeSort":
        return {
          ...state,
          sortBy: action.payload.sortBy,
          currentSortDirection: action.payload.currentSortDirection,
          finalsheetDataArray: action.payload.sortedDataArray,
        };
      case "tableHeightResize":
        return {
          ...state,
          tableHeight: action.payload.height,
        };
      case "tablePaginationSpread":
        return {
          ...state,
          tablePagination: Math.round(noOfRows / (action.payload.height / 30)),
        };
      case "searchedTableMetadata":
        return {
          ...state,
          finalsheetDataArray: action.payload.searchedDataArray,
        };
      case "setTableSearchValue":
        return {
          ...state,
          tableSearch: action.payload.searchValue,
        };
      case "setTableSelectData":
        return {
          ...state,
          tableSelect: action.payload.tableSelect,
          finalsheetDataArray: action.payload.selectedDataArray,
        };
      case "setCurrentColumnDatakey":
        return {
          ...state,
          currentColumnDatakey: action.payload.dataKey,
        };
      case "setCurrentRowIndex":
        return {
          ...state,
          currentRowIndex: action.payload.index,
        };
      case "setColumnWidths":
        return {
          ...state,
          columnWidthsArrayfinal: action.payload.columnWidthsArrayfinal,
        };
      default:
        break;
    }
  };

  const [tableMetaData, localDispatch] = useReducer(
    tableMetaDataReducer,
    initialTableMetaData()
  );

  const handleSelectChange = (e) => {
    const tableSelectValue = e.target.value;
    const { originalSheetDataArray } = tableMetaData;

    if (tableSelectValue === "all") {
      localDispatch({
        type: "setTableSelectData",
        payload: {
          tableSelect: tableSelectValue,
          selectedDataArray: originalSheetDataArray,
        },
      });
    } else {
      const tableSelect = parseInt(tableSelectValue);
      const currentSelectedSheetDataArray = originalSheetDataArray.slice(
        0,
        tableSelect
      );

      localDispatch({
        type: "setTableSelectData",
        payload: {
          tableSelect,
          selectedDataArray: currentSelectedSheetDataArray,
        },
      });
    }
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    const { originalSheetDataArray } = tableMetaData;

    localDispatch({
      type: "setTableSearchValue",
      payload: { searchValue },
    });

    if (searchValue === "")
      localDispatch({
        type: "searchedTableMetadata",
        payload: { searchedDataArray: originalSheetDataArray },
      });

    const searchedDataArray = [];
    if (searchValue.length > 1) {
      let promise = new Promise((resolve, reject) => {
        for (const rowObj of originalSheetDataArray) {
          const tableRowArray = Object.values(rowObj);
          const searchValueIsPresent = tableRowArray.some((cellValue) => {
            const smallCellValue = String(cellValue).toLowerCase();
            return smallCellValue.indexOf(searchValue.toLowerCase()) !== -1;
          });
          if (searchValueIsPresent) searchedDataArray.push(rowObj);
        }
        resolve(searchedDataArray);
        if (searchedDataArray === []) reject(new Error("No matches"));
      });

      promise
        .then((searchedDataArray) => {
          localDispatch({
            type: "searchedTableMetadata",
            payload: { searchedDataArray },
          });
        })
        .catch((error) =>
          localDispatch({
            type: "searchedTableMetadata",
            payload: { searchedDataArray: [] },
          })
        );
    }
  };

  const handlePaginationChange = (e, pageNumber) => {
    e.persist();
    const { tableHeight } = tableMetaData;
    const rowsPerPage = Math.round(tableHeight / 30);

    let scrollToIndex = 0;
    if (pageNumber === 1) {
      scrollToIndex = 0;
    } else {
      scrollToIndex = pageNumber * rowsPerPage - 4;
    }

    localDispatch({ type: "scrollToRow", payload: { scrollToIndex } });
  };

  useEffect(() => {
    localDispatch({ type: "initializeTableMetadata" });
  }, [localDispatch]);

  const _rowClassName = ({ index }) => {
    if (index < 0) {
      return classes.headerRow;
    } else {
      const { setCurrentRowIndex } = tableMetaData;
      if (setCurrentRowIndex === index) return classes.selectedRow;
    }
    return classes.bodyRow;
  };

  const _sort = ({ sortBy, sortDirection }) => {
    const currentSortDirection =
      sortDirection === SortDirection.ASC ? "asc" : "desc";
    const sortedDataArray = orderBy(
      finalsheetDataArray,
      [sortBy],
      [currentSortDirection]
    );
    localDispatch({
      type: "executeSort",
      payload: { sortBy, currentSortDirection, sortedDataArray },
    });
  };

  const _noRowsRenderer = () => {
    return (
      <div>
        <h1>No data</h1>
      </div>
    );
  };

  const _onColumnClick = ({ columnData, dataKey, event }) =>
    localDispatch({
      type: "setCurrentColumnDatakey",
      payload: dataKey,
    });

  const _onRowClick = ({ rowData, index, event }) =>
    localDispatch({ type: "setCurrentRowIndex", payload: index });

  const _cellDataGetter = ({ columnData, dataKey, rowData }) => {
    if (rowData === undefined) return;
    return rowData[dataKey];
  };

  const _resizeRow = ({ dataKey, deltaX }) => {
    const { columnWidthsArrayfinal, tableKeysArray } = tableMetaData;
    const index = tableKeysArray.indexOf(dataKey);
    // const nextDataKey = tableKeysArray[index + 1]

    const dataKeyWidth = columnWidthsArrayfinal[index] + deltaX;
    const nextDataKeyWidth = columnWidthsArrayfinal[index + 1] - deltaX;

    columnWidthsArrayfinal.splice(index, 1, dataKeyWidth);
    columnWidthsArrayfinal.splice(index + 1, 1, nextDataKeyWidth);

    localDispatch({
      type: "setColumnWidths",
      payload: { columnWidthsArrayfinal },
    });
  };

  const _headerRenderer = ({
    columnData,
    dataKey,
    disableSort,
    label,
    sortBy,
    sortDirection,
  }) => {
    return (
      <div key={dataKey}>
        <div className="ReactVirtualized__Table__headerTruncatedText">
          {label}
        </div>
        {sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
        <Draggable
          className={classes.resizeColumn}
          axis="x"
          onDrag={(event, { deltaX }) =>
            _resizeRow({
              dataKey,
              deltaX,
            })
          }
          // position={{ x: 0 }}
          zIndex={999}
        >
          <span className={classes.resizeHandle}>⋮</span>
        </Draggable>
      </div>
    );
  };

  //Reset sorted table
  const {
    currentRowIndex,
    currentColumnDatakey,
    sortBy,
    currentSortDirection,
    scrollToIndex,
    tablePagination,
    tableSelect,
    tableHeight,
    tableWidth,
    tableSearch,
    tableKeysArray,
    columnWidthsObj,
    columnWidthsArrayfinal,
    originalSheetDataArray,
    finalsheetDataArray,
  } = tableMetaData;

  return (
    <div className={classes.root}>
      <div className={classes.tableHeadBanner}>
        <div>
          <Typography
            className={classes.tableTitle}
            variant="overline"
            display="block"
            gutterBottom
          >
            FACILITIES DECK: SELECT HEADER AND UNITS ROW
          </Typography>
        </div>
        <div className={classes.tableFunctions}>
          <div className={classes.tableSearch}>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Search
              </InputLabel>
              <OutlinedInput
                className={classes.outlinedInput}
                id="outlined-adornment-password"
                value={tableSearch}
                onChange={handleSearchChange}
                startAdornment={
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
          </div>
          <div className={classes.tableIcons}>
            <AddIcon />
            <BeenhereIcon />
            <BuildIcon />
            <CardGiftcardIcon />
          </div>
        </div>
      </div>
      <div className={classes.tableRoot} ref={tableRef}>
        <AutoSizer
          onResize={({ height }) => {
            localDispatch({ type: "tableHeightResize", payload: { height } });
            localDispatch({
              type: "tablePaginationSpread",
              payload: { height },
            });
          }}
        >
          {() => (
            <Table
              height={tableHeight}
              width={tableWidth}
              headerHeight={30}
              rowHeight={30}
              rowCount={finalsheetDataArray.length}
              rowGetter={({ index }) => finalsheetDataArray[index]}
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
              {tableKeysArray &&
                tableKeysArray.map((key, index) => {
                  return (
                    <Column
                      key={key}
                      dataKey={key}
                      label={ToTitleCase(key)}
                      headerRenderer={_headerRenderer}
                      width={columnWidthsArrayfinal[index]}
                      cellDataGetter={_cellDataGetter}
                    />
                  );
                })}
            </Table>
          )}
        </AutoSizer>
      </div>
      <div className={classes.pagination}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            className={classes.formControl}
            id="demo-simple-select-outlined-label"
          >
            Number of Pages
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
    </div>
  );
}
