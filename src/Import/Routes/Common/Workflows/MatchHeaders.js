import { makeStyles } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Fuse from "fuse.js";
import zipobject from "lodash.zipobject";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ApexTable from "../../../../Application/Components/Table/ApexTable";
import TableAction from "../../../../Application/Components/Table/TableAction";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import generateActualTable from "../../../../Application/Utils/GenerateActualTable";
import generateTableWidth from "../../../../Application/Utils/GenerateTableWidth";
import DoughnutChart from "../../../../Visualytics/Components/DoughnutChart";
import {
  persistFileHeadersMatchAction,
  persistOptionIndicesAction,
  persistRowsOptionsIndicesMapAction,
} from "../../../Redux/Actions/ImportActions";

const useStyles = makeStyles((theme) => ({
  rootMatchHeaders: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
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

export default function MatchHeaders() {
  const classes = useStyles();
  const dispatch = useDispatch();

  //Actions
  const handleEditAction = (event, i) => {
    event.persist();
  };
  const handleDeleteAction = (event, i) => {
    event.persist();
  };
  const handlePickAction = (event, i) => {
    event.persist();
  };

  //File Headers
  const fileHeadersTableData = useSelector(
    (state) => state.importReducer.fileHeaders
  );

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
  const fileHeaderMatches = fileHeadersTableData.map((fileHeader) => {
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
      const zeroScores = new Array(applicationHeaders.length).fill(1);

      return zipobject(applicationHeaders, zeroScores);
    }
  });

  //Calculate Match Groups
  // const FullMatch = 0;
  // const PartialMatch = 0;
  // const NoMatch = 0;
  // for (const match of fileHeaderMatches) {
  //   const bestMatch = match[0];
  //   if (bestMatch === 0) {FullMatch = FullMatch + bestMatch};
  //   else if (bestMatch === 1) {NoMatch = NoMatch + bestMatch};
  //   else {PartialMatch = PartialMatch + bestMatch};
  // }

  const fullMatch = fileHeaderMatches.reduce((a, match) => {
    const bestMatch = 1 - parseFloat(Object.values(match)[0]);

    if (bestMatch === 0.0) {
      return a + 1;
    } else return a;
  }, 0);
  const partialMatch = fileHeaderMatches.reduce((a, match) => {
    const bestMatch = 1 - parseFloat(Object.values(match)[0]);

    if (bestMatch > 0.0 && bestMatch < 1.0) {
      return a + 1;
    } else return a;
  }, 0);
  const NoMatch = fileHeaderMatches.reduce((a, match) => {
    const bestMatch = 1 - parseFloat(Object.values(match)[0]);

    if (bestMatch === 1.0) {
      return a + 1;
    } else return a;
  }, 0);

  const headerMatchChartData = [
    { name: "Full Match", value: fullMatch },
    { name: "Partial Match", value: partialMatch },
    { name: "No Match", value: NoMatch },
  ];
  //Initialize Row & Select options map
  const headerRowOptionsIndices = new Array(fileHeadersTableData.length).fill(
    0
  );

  const HeaderSelect = ({ rowIndex }) => {
    const fileHeaderMatches = useSelector(
      (state) => state.importReducer.fileHeadersMatch
    );
    const optionIndices = useSelector(
      (state) => state.importReducer.optionIndices
    );

    const matches = Object.keys(fileHeaderMatches[rowIndex]);
    const [header, setHeader] = React.useState(matches[0]);
    // const [header, setHeader] = React.useState(0);

    const handleSelectChange = (event) => {
      event.persist();

      const selectedHeader = event.target.value;
      // const currentRowIndex = parseInt(event.target.name);

      setHeader(selectedHeader);
      const optionIndex = matches.indexOf(selectedHeader);
      optionIndices[rowIndex] = optionIndex;

      dispatch(persistOptionIndicesAction(optionIndices));

      // event.nativeEvent.stopImmediatePropagation();
    };

    //rowIndex encapsulated in name
    //option index selected is fileHeaderMatches.indexOf(event.target.value)
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
    const fileHeaderMatches = useSelector(
      (state) => state.importReducer.fileHeadersMatch
    );
    const selectedHeaderRowIndex = useSelector(
      (state) => state.importReducer.selectedHeaderRowIndex
    );
    const selectedHeaderOptionIndex = useSelector(
      (state) => state.importReducer.selectedHeaderOptionIndex
    );
    const matchScores = Object.values(fileHeaderMatches[rowIndex]);
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
    // const [
    //   selectedAnchorMatchRowIndex,
    //   setSelectedAnchorMatchRowIndex,
    // ] = React.useState(0);

    const handleCheckboxChange = (event) => {
      event.persist();

      setCheckboxSelected(!checkboxSelected);
      // const selectedAnchorMatchRowIndex = event.target.name;
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

  //Generate table actions
  const tableActions = {
    actionName: "ACTIONS",
    width: 120,
    actionComponent: () => <TableAction />,
    actionMethods: {
      handleEditAction: handleEditAction,
      handleDeleteAction: handleDeleteAction,
      handlePickAction: handlePickAction,
    },
  };
  const TableActions = [];
  const { actionComponent, actionMethods } = tableActions;
  for (let i = 0; i < fileHeadersTableData.length; i++) {
    const action = React.cloneElement(actionComponent(), {
      i,
      ...actionMethods,
    });
    TableActions.push({ [tableActions.actionName]: action });
  }
  const addedColumnHeaders = [tableActions.actionName];

  //No table roles
  const TableRoles = undefined;

  const actualColumnHeaders = [
    "FILE HEADER",
    "APPLICATION HEADER",
    "MATCH",
    "ANCHOR MATCH",
  ];

  const cleanTableData = fileHeadersTableData.map((fileHeader, i) => {
    return {
      [actualColumnHeaders[0]]: fileHeader,
      [actualColumnHeaders[1]]: <HeaderSelect rowIndex={i} />,
      [actualColumnHeaders[2]]: <MatchScore rowIndex={i} />,
      [actualColumnHeaders[3]]: <AnchorMatch rowIndex={i} />,
    };
  });
  const tableColumnWidths = [40, tableActions.width, 300, 300, 120, 150];
  const tableWidth = generateTableWidth(tableColumnWidths);

  const { tableHeaders, tableData } = generateActualTable(
    addedColumnHeaders,
    TableActions,
    TableRoles,
    actualColumnHeaders,
    cleanTableData
  );

  React.useEffect(() => {
    dispatch(persistRowsOptionsIndicesMapAction(headerRowOptionsIndices));
    dispatch(persistFileHeadersMatchAction(fileHeaderMatches));

    // setTimeout(() => dispatch(hideSpinnerAction()), 4000);
    dispatch(hideSpinnerAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className={classes.rootMatchHeaders}>
      <div className={classes.chart}>
        <DoughnutChart data={headerMatchChartData} />
      </div>
      <div className={classes.table}>
        <ApexTable
          tableData={tableData}
          tableHeaders={tableHeaders}
          tableColumnWidths={tableColumnWidths}
          tableWidth={tableWidth}
        />
      </div>
    </div>
  );
}
