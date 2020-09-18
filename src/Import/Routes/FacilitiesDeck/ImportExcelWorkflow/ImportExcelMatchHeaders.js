import { makeStyles, fade } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Fuse from "fuse.js";
import zipobject from "lodash.zipobject";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ApexTable from "../../../../Application/Components/ApexTable";
import RowActions from "../../../../Application/Components/RowActions";
import DoughnutChart from "./../../../../Visualytics/Components/DoughnutChart";
import {
  persistFileHeadersAction,
  persistFileHeadersMatchAction,
  persistSelectedHeaderRowIndexAction,
  persistSelectedHeaderOptionIndexAction,
} from "./../../../Redux/Actions/ImportActions";

const useStyles = makeStyles((theme) => ({
  rootMatchHeaders: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "85%",
    height: "100%",
    border: "1px solid #A8A8A8",
    boxShadow: `${fade("#A8A8A8", 0.25)} 0 0 0 2px`,
    backgroundColor: "#FFF",
  },
  chart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "20%",
  },
  table: {
    width: "100%",
    height: "80%",
    padding: 20,
  },
  select: {
    top: 0,
    height: 30,
    width: 250,
    fontSize: 14,
  },
  score: { fontSize: 14 },
}));

const getApplicationHeaders = () => {
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

export default function ImportExcelMatchHeaders() {
  const classes = useStyles();
  const dispatch = useDispatch();

  //Actions
  const handleEditAction = (e) => {
    e.persist();
    console.log("Logged output -->: handleEditAction -> e", e);
  };
  const handleDeleteAction = (e) => {
    e.persist();
    console.log("Logged output -->: handleDeleteAction -> e", e);
  };
  const handlePickAction = (e) => {
    e.persist();
    console.log("Logged output -->: handlePickAction -> e", e);
  };

  const tableData = useSelector((state) => state.importReducer.tableData);
  React.useEffect(() => {
    const fileHeaders = Object.values(tableData[0]);

    dispatch(persistFileHeadersAction(fileHeaders));
    dispatch(persistFileHeadersMatchAction(headerMatches));
  }, []);

  //File Headers
  const fileHeaders = useSelector((state) => state.importReducer.fileHeaders);

  //Application headers
  const applicationHeaders = getApplicationHeaders();
  const options = {
    isCaseSensitive: false,
    includeScore: true,
    shouldSort: true,
    keys: [],
  };
  const fuse = new Fuse(applicationHeaders, options);

  //Header matching in a useeffect - call backend api
  //Rematch button to call api with new matching method?
  //Replace empty matches with all headers in select control
  //set score to zero and red background
  //Monitor all currently selected to ensure no app header is
  //selected twice
  const headerMatches = fileHeaders.map((fileHeader) => {
    const matchedHeaders = fuse
      .search(fileHeader)
      .map((match) => match["item"]);
    const matchedScores = fuse
      .search(fileHeader)
      .map((match) => match["score"]);

    if (matchedHeaders.length > 0) {
      const cleanedMatchedScores = matchedScores.map((score) =>
        isNaN(score) ? 0 : score
      );
      return zipobject(matchedHeaders, cleanedMatchedScores);
    } else {
      const zeroScores = new Array(applicationHeaders.length).fill(0);
      return zipobject(applicationHeaders, zeroScores);
    }
  });

  const HeaderSelect = ({ rowIndex }) => {
    const headerMatches = useSelector(
      (state) => state.importReducer.fileHeadersMatch
    );

    const selectedHeaderRowIndex = useSelector(
      (state) => state.importReducer.selectedHeaderRowIndex
    );
    const matches = Object.keys(headerMatches[rowIndex]);
    const [header, setHeader] = React.useState(matches[selectedHeaderRowIndex]);

    const handleSelectChange = (event) => {
      const { nativeEvent } = event;
      event.persist();

      dispatch(persistSelectedHeaderRowIndexAction(rowIndex));
      const selectedHeader = event.target.value;
      setHeader(selectedHeader);
      const optionIndex = matches.indexOf(selectedHeader);
      dispatch(persistSelectedHeaderOptionIndexAction(optionIndex));
      nativeEvent.stopImmediatePropagation();
    };

    //rowIndex encapsulated in name
    //option index selected is headerMatches.indexOf(event.target.value)
    //persist both above in redux store
    //use both numbers to access scores and change it
    return (
      <Select
        key={rowIndex}
        className={classes.select}
        name={rowIndex.toString()}
        value={header}
        onChange={handleSelectChange}
        label=""
        size="small"
      >
        {matches.map((matchName, i) => (
          <MenuItem key={i} value={matchName}>
            {matchName}
          </MenuItem>
        ))}
      </Select>
    );
  };

  //Match
  const MatchScore = ({ rowIndex }) => {
    const headerMatches = useSelector(
      (state) => state.importReducer.fileHeadersMatch
    );
    const selectedHeaderRowIndex = useSelector(
      (state) => state.importReducer.selectedHeaderRowIndex
    );
    const selectedHeaderOptionIndex = useSelector(
      (state) => state.importReducer.selectedHeaderOptionIndex
    );
    const matchScores = Object.values(headerMatches[rowIndex]);
    const score =
      selectedHeaderRowIndex === rowIndex
        ? matchScores[selectedHeaderOptionIndex]
        : matchScores[0];

    return (
      <Typography
        className={classes.score}
        key={rowIndex}
        name={rowIndex.toString()}
        variant="caption"
      >
        {Math.round(100 - score * 100, 2)}
        {"%"}
      </Typography>
    );
  };

  //Anchor Match
  const AnchorMatch = ({ rowIndex }) => {
    const [checkboxSelected, setCheckboxSelected] = React.useState(false);
    const [
      selectedAnchorMatchRowIndex,
      setSelectedAnchorMatchRowIndex,
    ] = React.useState(0);

    const handleCheckboxChange = (event) => {
      event.persist();

      console.log(
        "Logged output -->: AnchorMatch -> checkboxSelected",
        checkboxSelected
      );
      setCheckboxSelected(!checkboxSelected);
      const selectedAnchorMatchRowIndex = event.target.name;
    };

    return (
      <Checkbox
        key={rowIndex}
        name={rowIndex.toString()}
        onClick={handleCheckboxChange}
        checked={checkboxSelected}
      />
    );
  };

  //Generate from columns data above
  const addedColumnsHeaders = ["ACTIONS"];
  const addedColumns = {
    ACTIONS: () => <RowActions />,
  };
  const addedColumnsWidths = 100;
  const actionsColumnProps = {
    handleEditAction: handleEditAction,
    handleDeleteAction: handleDeleteAction,
    handlePickAction: handlePickAction,
  };

  const rawTableHeaders = [
    "FILE HEADER",
    "APPLICATION HEADER",
    "MATCH",
    "ANCHOR MATCH",
  ];
  const rawTableData = fileHeaders.map((fileHeader, i) => {
    return {
      [rawTableHeaders[0]]: fileHeader,
      [rawTableHeaders[1]]: <HeaderSelect rowIndex={i} />,
      [rawTableHeaders[2]]: <MatchScore rowIndex={i} />,
      [rawTableHeaders[3]]: <AnchorMatch rowIndex={i} />,
    };
  });
  const definedWidths = [39, 100, 250, 250, 120, 180];

  return (
    <div className={classes.rootMatchHeaders}>
      <div className={classes.chart}>
        <DoughnutChart />
      </div>
      <div className={classes.table}>
        <ApexTable
          useInterimHeaders={false}
          useCalculatedWidths={false}
          definedWidths={definedWidths}
          rawTableData={rawTableData}
          addedColumnsHeaders={addedColumnsHeaders}
          addedColumns={addedColumns}
          addedColumnsWidths={addedColumnsWidths}
          actionsColumnProps={actionsColumnProps}
        />
      </div>
    </div>
  );
}
