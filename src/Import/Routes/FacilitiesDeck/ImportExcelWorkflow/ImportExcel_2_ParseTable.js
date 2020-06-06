import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AutoSizer, Column, Table } from "react-virtualized";
import ToTitleCase from "./../../../../Application/Utils/ToTitleCase";
import AddIcon from "@material-ui/icons/Add";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import BuildIcon from "@material-ui/icons/Build";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    [theme.breakpoints.down("sm")]: { width: "95%" },
    height: "100%",
  },
  tableHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "10%",
    marginLeft: "20px",
    marginRight: "20px",
    // backgroundColor: theme.palette.primary.main,
  },
  tableTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "50%",
  },
  tableFunctions: {
    display: "flex",
    width: "100%",
    height: "50%",
  },
  tableIcons: {
    display: "flex",
    width: "50%",
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
    width: "50%",
    height: "100%",
    alignItems: "flex-start",
  },
  tableRoot: {
    width: "100%",
    height: "70%",
    marginLeft: "20px",
    marginRight: "20px",
    overflow: "auto",
  },
  outlinedInput: {
    height: "30px",
    width: "350px",
    paddingLeft: 0,
  },
  pagination: {
    display: "flex",
    width: "100%",
    height: "10%",
    margin: "20px",
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: theme.palette.primary.main,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  headers: {
    fontSize: "12px",
    textTransform: "none",
  },
  rows: {
    fontSize: "12px",
    textTransform: "none",
  },
}));

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });
const tableWidth = 2400;
export default function ImportExcel_2_ParseTable() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const sheetDataArray = useSelector(
    (state) => state.ImportReducer.SelectedWorksheetData
  );

  const initialTableMetaData = () => {
    const tableSearch = "";
    const tablePage = 500;

    const tableKeysArray = Object.keys(sheetDataArray[0]).map(
      (_, i) => `column_${i}`
    );
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
    for (const obj of sheetDataArray) {
      let reKeyedSheetDataObj = {};
      let i = 0;
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          reKeyedSheetDataObj[tableKeysArray[i]] = obj[key];
        }
        i += 1;
      }
      finalsheetDataArray.push(reKeyedSheetDataObj);
    }

    return {
      tableSearch,
      tablePage,
      tableKeysArray,
      columnWidthsObj,
      finalsheetDataArray,
    };
  };

  const tableMetaDataReducer = (state, action) => {
    switch (action.type) {
      case "initializeTableMetadata":
        return { ...state };
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
      default:
        break;
    }
  };

  const [tableHeight, setTableHeight] = useState(0);
  const tableRef = useRef(null);

  const [tableMetaData, localDispatch] = useReducer(
    tableMetaDataReducer,
    initialTableMetaData()
  );

  const _noRowsRenderer = () => {
    return <h1>No data</h1>;
  };

  const handleSelectChange = (e) => {
    // const { value } = e.target;
    // setPage(value);
  };
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    localDispatch({
      type: "setTableSearchValue",
      payload: { searchValue },
    });

    const searchedDataArray = [];
    if (searchValue.length > 1) {
      const { finalsheetDataArray } = tableMetaData;
      for (const rowObj of finalsheetDataArray) {
        const tableRowArray = Object.values(rowObj);
        //optimize this => on first match of search term go to next row
        const searchValuesIsPresent = tableRowArray.some(
          (cellValue) => String(cellValue).indexOf(searchValue) !== -1
        );

        if (searchValuesIsPresent) searchedDataArray.push(rowObj);
      }
      localDispatch({
        type: "searchedTableMetadata",
        payload: { searchedDataArray },
      });
    }
  };
  const handlePaginationChange = (e) => {
    // const { value } = e.target;
    // if (value.length > 1) setTableSearch(value);
  };

  useEffect(() => {
    localDispatch({ type: "initializeTableMetadata" });
    setTableHeight(tableRef.current.clientHeight);
  }, [localDispatch]);

  const {
    tableSearch,
    tablePage,
    tableKeysArray,
    columnWidthsObj,
    finalsheetDataArray,
  } = tableMetaData;

  return (
    <div className={classes.root}>
      <div className={classes.tableHeader}>
        <div className={classes.tableTitle}>
          <Typography variant="overline" display="block" gutterBottom>
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
                      <SearchIcon />
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
        <AutoSizer onResize={({ height }) => setTableHeight(height)}>
          {() => (
            <Table
              width={4800}
              height={tableHeight}
              headerClassName={classes.headers}
              headerHeight={30}
              rowHeight={30}
              rowCount={sheetDataArray.length}
              rowGetter={({ index }) => finalsheetDataArray[index]}
              noRowsRenderer={_noRowsRenderer}
              overscanRowCount={10}
              rowClassName={classes.rows}
              // headerRenderer={headerRenderer}
              // rowHeight={useDynamicRowHeight ? _getRowHeight : rowHeight}
              // scrollToIndex={scrollToIndex}
              // sort={_sort}
              // sortBy={sortBy}
              // sortDirection={sortDirection}
            >
              {tableKeysArray &&
                tableKeysArray.map((key) => {
                  return (
                    <Column
                      // className={classes.column}
                      key={key}
                      dataKey={key}
                      label={ToTitleCase(key)}
                      // width={columnWidthsObj[key] * tableWidth}
                      width={100}
                      // cellDataGetter={({ columnData, dataKey, rowData }) => {
                      //   // console.log(dataKey, rowData, columnData);
                      //   console.log(dataKey, rowData);
                      //   return rowData || rowData[dataKey];
                      // }}
                    />
                  );
                })}
            </Table>
          )}
        </AutoSizer>
      </div>
      <div className={classes.pagination}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Number of Pages
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={tablePage}
            onChange={handleSelectChange}
            label="Number of Pages"
            size="small"
          >
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={500}>500</MenuItem>
            <MenuItem value={500}>All</MenuItem>
          </Select>
        </FormControl>
        {/* To get count, get number of rows that can be currently displayed by table
        ==> current table height/row height. Note that table height may change with changing div height
        --->use autoSizer's onresize to update this value.
        To get pagination count prop, use the number of rows that can be displayed
        to divide the total number of rows to get the current pagination spread  */}
        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          onChange={handlePaginationChange}
        />
        {/*OnChange here will use ScrollTo functionality to focus topmost row of page
        Each pagination item must get start and end row value
        for start row value ==> pagenumber * numberofrows + 1
        for end row value ==> pagenumber * numberofrows */}
      </div>
    </div>
  );
}
