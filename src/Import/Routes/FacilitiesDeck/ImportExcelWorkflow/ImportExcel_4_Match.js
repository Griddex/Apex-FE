import { Button, Divider, makeStyles, Typography } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import LaunchIcon from "@material-ui/icons/Launch";
import SearchIcon from "@material-ui/icons/Search";
import Fuse from "fuse.js";
import React, { useEffect, useReducer, useState } from "react";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { AutoSizer, Column, Table } from "react-virtualized";
import "react-virtualized/styles.css";
import * as xlsx from "xlsx";
import ToTitleCase from "../../../../Application/Utils/ToTitleCase";
import NotificationDialog from "../../../Components/NotificationDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "88%",
    [theme.breakpoints.down("sm")]: { width: "95%" },
    height: "100%",
    "& > *": { margin: theme.spacing(2) },
  },

  paper1: {
    display: "flex",
    height: "15%",
    // padding: theme.spacing(1),
    "& > *": { margin: theme.spacing(2) },
  },
  paper2: {
    display: "flex",
    flexDirection: "column",
    height: "85%",
    padding: theme.spacing(1),
    // alignItems: "center",
    // justifyContent: "center",
  },
  gridroot: { margin: theme.spacing(1) },
  gridItem: {
    "& > *": {
      alignSelf: "center",
    },
  },
  alignCenter: {
    alignSelf: "center",
  },
  alignTextCenter: {
    textAlign: "center",
  },
  formControl: {
    height: "30px",
    width: "100%",
  },
  select: {
    height: "30px",
    width: "100%",
    fontSize: "12px",
  },
  menuItem: {
    fontSize: "12px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  table: {
    width: "100%",
    height: "100%",
  },
  tableHeader: {
    cursor: "col-resize",
  },
  column: {
    borderWidth: "4px",
  },
  tableSearch: {
    height: "100%",
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  expansionPanelSummary: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  expansionPanel: {
    // display: "flex",
    width: "100%",
    height: "80px",
  },
  outlinedInput: {
    height: "20px",
  },
}));

function getHeadCells() {
  return [
    {
      id: "sn",
      numeric: true,
      disablePadding: false,
      label: "S/N",
    },
    {
      id: "fileHeader",
      numeric: true,
      disablePadding: false,
      label: "File Header",
    },
    {
      id: "databaseHeader",
      numeric: true,
      disablePadding: false,
      label: "Database Header",
    },
    {
      id: "matchPercent",
      numeric: true,
      disablePadding: false,
      label: "Match (%)",
    },
  ];
}

const getDatabaseHeaders = () => {
  return [
    "Version",
    "Asset Team",
    "Field Name",
    "Reservoir Identification",
    "Drainage Point Nomenclature",
    "String",
    "Module",
    "PEEP",
    "Activity",
    "Flow station",
    "Hydrocarbon Stream",
    "Resource Category",
    "Change Category",
    "1P Technique",
    "URo 1P/1C",
    "URo Low",
    "URo 2P/2C",
    "URo 3P/3C",
    "Np",
    "URg 1P/1C",
    "URg Low",
    "URg 2P/2C",
    "URg 3P/3C",
    "Gp",
    "Init. Oil/Gas Rate 1P/1C",
    "Init. Oil/Gas Rate Low",
    "Init. Oil/Gas Rate 2P/2C",
    "Init. Oil/Gas Rate 3P/3C",
    "Aband. Oil/Gas Rate 1P/1C",
    "Aband. Oil/Gas Rate 2P/2C",
    "Aband. Oil/Gas Rate 3P/3C",
    "Init. BSW/WGR",
    "Aband. BSW/WGR 1P/1C",
    "Aband. BSW/WGR 2P/2C",
    "Aband. BSW/WGR 3P/3C",
    "Init. GOR/CGR",
    "Aband. GOR/CGR 1P/1C",
    "Aband. GOR/CGR 2P/2C",
    "Aband. GOR/CGR 3P/3C",
    "lift Gas Rate",
    "Plateau [Oil/Gas]",
    "In-year Booking",
    "LE/LV",
    "PRCS",
    "On-stream Date-1P/1C",
    "On-stream Date-2P/2C",
    "On-stream Date-3P/3C",
    "Remarks",
    "TRANCHE",
  ];
};

function getMatchesAndScores(headerMatchObject) {
  const matchesArray = Object.values(headerMatchObject)[0];
  const dbHeaderNameMatches = matchesArray.map((matchObj) => matchObj.item);
  const dbHeaderScoreMatches = matchesArray.map((matchObj) => matchObj.score);

  return [dbHeaderNameMatches, dbHeaderScoreMatches];
}

const ImportExcel_4_Match = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [bestHeadermatch, setBestHeadermatch] = useState("");
  const [selectNameWithRowId, setSelectNameWithRowId] = useState("Select_0");
  const [bestScorematch, setBestScorematch] = useState(0);
  const [matchValueIndex, setMatchValueIndex] = useState(0);
  const [algorithm, setAlgorithm] = useState("Fuzzy Logic");
  const [rematch, setRematch] = useState(false);
  const [allHeaderMatches, setAllHeaderMatches] = useState([]);
  const [allDataRows, setAllDataRows] = useReducer((state, newState) => {
    return [...state, ...newState];
  }, []);
  const [selectValues, setSelectValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { Select_0: "" }
  );
  const Matching = useSelector((state) => state.importReducer.Matching);
  const InputDeckWorkbook = useSelector(
    (state) => state.importReducer.AcceptedFile
  );
  const InputDeckSheetName = useSelector(
    (state) => state.importReducer.SelectedWorksheetName
  );

  const fileHeaderRow = getHeadCells();

  const handleClickOpen = () => {
    setRematch(true);
  };

  const handleClose = () => {
    setRematch(false);
  };

  const handleAlgorithm = (event) => {
    setAlgorithm(event.target.value);
  };

  const handleChange = (matches, event) => {
    const [headerMatches, scoreMatches] = matches;

    const { name, value } = event.target;
    setSelectValues({ [name]: value });
    setSelectNameWithRowId(name);
    setBestHeadermatch(value);
    const matchValueIndex = headerMatches.indexOf(value);
    setMatchValueIndex(matchValueIndex);
    const scorematch = scoreMatches[matchValueIndex];
    setBestScorematch(scorematch);
  };

  const dataRowValue = (
    rowIndex,
    headerObjectId,
    headerMatchObject,
    classes
  ) => {
    const headerMatches = getMatchesAndScores(headerMatchObject)[0];
    const scoreMatches = getMatchesAndScores(headerMatchObject)[1];
    const scorepercent = Math.round(1 - bestScorematch) * 100;
    const matches = [headerMatches, scoreMatches];

    switch (headerObjectId) {
      case "sn":
        return rowIndex + 1;
      case "fileHeader":
        return Object.keys(headerMatchObject)[0];
      case "databaseHeader":
        const headerMatchItems =
          Array.isArray(headerMatches) && headerMatches.length === 0
            ? getDatabaseHeaders()
            : headerMatches;

        return (
          <Select
            className={classes.select}
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            name={`Select_${rowIndex}`}
            variant="outlined"
            value={selectValues[selectNameWithRowId] || headerMatches[0]}
            onChange={(e) => handleChange(matches, e)}
          >
            {headerMatchItems.map((item, i) => (
              <MenuItem className={classes.menuItem} key={i} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        );
      case "matchPercent": //A chip with rounded corners is better than typography here?
        return (
          <Typography variant="caption">
            {scorepercent}
            {"%"}
          </Typography>
        );
      // const AnimatedCircularProgress = animated(CircularProgress);
      // const props = useSpring({ value: scorepercent, from: { value: 0 } });
      default:
        return;
    }
  };

  const generateAllDataRows = () => {
    const databaseHeaders = getDatabaseHeaders();

    const selectedSheet = InputDeckWorkbook.Sheets[InputDeckSheetName];
    const sheetData = xlsx.utils.sheet_to_json(selectedSheet, { header: 1 });
    const fileHeaderArray = sheetData[0];

    const options = {
      isCaseSensitive: false,
      includeScore: true,
      shouldSort: true,
      keys: [],
    };
    const fuse = new Fuse(databaseHeaders, options);

    let allHeaderMatchesArray = [];
    for (const fileHeader of fileHeaderArray) {
      let matchObject = {};
      const matchResults = fuse.search(fileHeader);
      matchObject[fileHeader] = matchResults;
      allHeaderMatchesArray.push(matchObject);
    }

    const headerRowData = getHeadCells();
    const dataRows = allHeaderMatchesArray.map((headerMatchObject, i) => {
      const dataRow = Object.fromEntries(
        headerRowData.map((headerObject) => {
          const headerObjectId = headerObject.id;
          return [
            headerObjectId,
            dataRowValue(i, headerObjectId, headerMatchObject, classes),
          ];
        })
      );
      return dataRow;
    });
    setAllHeaderMatches(allHeaderMatchesArray);
    setAllDataRows(dataRows);
  };

  const modifyAllDataRows = () => {
    const rowid = selectNameWithRowId.split("_")[1];
    const selectRow = allDataRows.find(
      (row) => parseInt(rowid) + 1 === parseInt(row.sn)
    );

    const matchObject = allHeaderMatches.find(
      (match) => Object.keys(match)[0] === selectRow.fileHeader
    );

    let newSelectRow = {};
    for (const key in selectRow) {
      if (selectRow.hasOwnProperty(key)) {
        const objValue = dataRowValue(
          parseInt(rowid),
          key,
          matchObject,
          classes
        );
        newSelectRow[key] = objValue;
      }
    }
    const newAllDataRows = [...allDataRows];
    newAllDataRows[parseInt(rowid)] = newSelectRow;
    setAllDataRows(newAllDataRows);
  };

  const headerRenderer = ({
    columnData,
    dataKey,
    disableSort,
    label,
    sortBy,
    sortDirection,
  }) => {
    return (
      <React.Fragment key={dataKey}>
        <Draggable
          axis="x"
          defaultClassName="DragHandle"
          defaultClassNameDragging="DragHandleActive"
          onDrag={(event, { deltaX }) => {
            resizeRow({
              dataKey,
              deltaX,
            });
          }}
          position={{ x: 0 }}
          zIndex={999}
        >
          <div>
            <div
              onMouseDown={(evt) => {
                evt.persist();
                setCurrentDataKey(dataKey);
              }}
              className="ReactVirtualized__Table__headerTruncatedText"
            >
              {label}
            </div>
            <span className="DragHandleIcon"> ⋮ </span>
          </div>
        </Draggable>
      </React.Fragment>
    );
  };

  const list = [
    {
      name: "Brian Vaughn",
      location: "Seattle",
      description: "Software engineer",
    },
    { name: "Gideon Sanni", location: "Houston", description: "CEO" },
    {
      name: "Natasha Chris",
      location: "Calgary",
      description: "Project Engineer",
    },
    // And so on...
  ];
  const TOTAL_WIDTH = 800;
  const [currentDataKey, setCurrentDataKey] = useState("");
  //use headers from file as selected in previous step
  const [deckTableHeaders, setDeckTableHeaders] = useState([]);

  const initializeColumnWidths = () => {
    let initialColumnWidths = {};
    const datakeys = Object.keys(allDataRows[0]);
    const initialColumnWidth = 1 / datakeys.length;
    datakeys.map((key) => (initialColumnWidths[key] = initialColumnWidth));

    return initialColumnWidths;
  };

  const resizeColumnReducer = (columnWidths, action) => {
    const { type, dataKey, deltaX } = action;
    const percentDelta = deltaX / TOTAL_WIDTH;

    const getNextDataKeyIndex = () => {
      const currentDataKeyIndex = deckTableHeaders.indexOf(dataKey);
      if (currentDataKeyIndex === deckTableHeaders.length - 1)
        return deckTableHeaders.length - 1;
      return currentDataKeyIndex + 1;
    };

    const nextDataKeyIndex = getNextDataKeyIndex();
    const nextDataKey = deckTableHeaders[nextDataKeyIndex];

    switch (type) {
      case "drag":
        const newColumnWidths = {
          ...columnWidths,
          [dataKey]: columnWidths[dataKey] + percentDelta,
          [nextDataKey]: columnWidths[nextDataKey] - percentDelta,
        };
        return newColumnWidths;
      default:
        return {
          ...columnWidths,
        };
    }
  };

  const [columnWidths, columnWidthsDispatch] = useReducer(
    resizeColumnReducer,
    initializeColumnWidths()
  );

  const resizeRow = ({ dataKey, deltaX }) =>
    columnWidthsDispatch({ type: "drag", dataKey, deltaX });

  useEffect(() => {
    // dispatch(ImportMatchingAction(true));
    generateAllDataRows();
    // dispatch(ImportMatchingAction(false));
    const headers = Object.keys(allDataRows[0]);
    setDeckTableHeaders(headers);
    initializeColumnWidths();
  }, []);

  // useEffect(() => {
  //   console.log("Second");
  //   // dispatch(ImportMatchingAction(true));
  //   modifyAllDataRows();
  //   // dispatch(ImportMatchingAction(false));
  // }, [selectValues]);

  const [tableSearch, setTableSearch] = useState("");
  const handleTableSearch = (evt) => {
    setTableSearch(evt.target.value);
  };
  const _noRowsRenderer = () => {
    return <div>No data to display...</div>; //return a button here to import data?
  };
  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={Matching}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <NotificationDialog
        algorithm={algorithm}
        rematch={rematch}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
      <Paper className={classes.paper1}>
        <Grid container className={classes.gridroot} spacing={1}>
          <Grid item container xs alignItems="center">
            <Grid item container xs justify="space-between" direction="column">
              <Typography variant="caption">Full Match</Typography>
              <Typography variant="caption">10 rows</Typography>
              {/* <CircularProgress variant="static" value={50} /> */}
            </Grid>
            <Grid item container xs justify="space-between" direction="column">
              <Typography variant="caption">Partial Match</Typography>
              <Typography variant="caption">5 rows</Typography>
              {/* <CircularProgress variant="static" value={30} /> */}
            </Grid>
            <Grid item container xs justify="space-between" direction="column">
              <Typography variant="caption">No Match</Typography>
              <Typography variant="caption">2 rows</Typography>
              {/* <CircularProgress variant="static" value={20} /> */}
            </Grid>
          </Grid>
          <Divider orientation="vertical" />
          <Grid
            item
            container
            justify="space-between"
            direction="column"
            xs={4}
          >
            <Grid item xs className={classes.alignTextCenter}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                  id="demo-simple-select-outlined-label"
                  className={classes.select}
                >
                  Matching Algorithms
                </InputLabel>
                <Select
                  className={classes.select}
                  labelId="demo-simple-select-placeholder-label-label"
                  id="demo-simple-select-placeholder-label"
                  value={algorithm}
                  onChange={handleAlgorithm}
                >
                  <MenuItem value={"Fuzzy Logic"}>Fuzzy Logic</MenuItem>
                  <MenuItem value={"Machine Learning"}>
                    Machine Learning
                  </MenuItem>
                  <MenuItem value={"Stochastics"}>Stochastics</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs className={classes.alignTextCenter}>
              <Button
                onClick={(e) => setRematch(true)}
                variant="outlined"
                endIcon={<LaunchIcon />}
              >
                Re-match
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <div>
        <div>
          <FormControl className={classes.tableSearch} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Search
            </InputLabel>
            <OutlinedInput
              className={classes.outlinedInput}
              id="outlined-adornment-password"
              value={tableSearch}
              onChange={handleTableSearch}
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
              labelWidth={70}
            />
          </FormControl>
        </div>
        <div className={classes.table}>
          <AutoSizer disableHeight>
            {({ width }) => (
              <Table
                width={width}
                headerHeight={30}
                rowHeight={30}
                rowCount={allDataRows.length}
                rowGetter={({ index }) => allDataRows[index]}
              >
                {deckTableHeaders &&
                  deckTableHeaders
                    .slice(0, deckTableHeaders.length)
                    .map((key) => {
                      return (
                        <Column
                          className={classes.column}
                          key={key}
                          label={ToTitleCase(key)}
                          dataKey={key}
                          width={columnWidths[key] * width}
                          // headerRenderer={headerRenderer}
                          // noRowsRenderer={_noRowsRenderer}
                          // overscanRowCount={overscanRowCount}
                          // rowClassName={_rowClassName}
                          // rowHeight={useDynamicRowHeight ? _getRowHeight : rowHeight}
                          // rowGetter={rowGetter}
                          // rowCount={rowCount}
                          // scrollToIndex={scrollToIndex}
                          // sort={_sort}
                          // sortBy={sortBy}
                          // sortDirection={sortDirection}
                        />
                      );
                    })}
              </Table>
            )}
          </AutoSizer>
        </div>
      </div>
    </div>
  );
};

ImportExcel_4_Match.propTypes = {};

export default ImportExcel_4_Match;
