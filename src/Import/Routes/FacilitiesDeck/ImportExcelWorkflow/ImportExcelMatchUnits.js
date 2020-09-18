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
  persistFileUnitsAction,
  persistFileUnitsMatchAction,
  persistSelectedUnitRowIndexAction,
  persistSelectedUnitOptionIndexAction,
} from "./../../../Redux/Actions/ImportActions";

const useStyles = makeStyles((theme) => ({
  rootMatchUnits: {
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

const getApplicationUnits = () => {
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

export default function ImportExcelMatchUnits() {
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
    const fileUnits = Object.values(tableData[0]);

    dispatch(persistFileUnitsAction(fileUnits));
    dispatch(persistFileUnitsMatchAction(unitMatches));
  }, []);

  //File Headers
  const fileUnits = useSelector((state) => state.importReducer.fileUnits);

  //Application headers
  const applicationUnits = getApplicationUnits();
  const options = {
    isCaseSensitive: false,
    includeScore: true,
    shouldSort: true,
    keys: [],
  };
  const fuse = new Fuse(applicationUnits, options);

  //Header matching in a useeffect - call backend api
  //Rematch button to call api with new matching method?
  //Replace empty matches with all headers in select control
  //set score to zero and red background
  //Monitor all currently selected to ensure no app header is
  //selected twice
  const unitMatches = fileUnits.map((fileUnit) => {
    const matchedUnits = fuse.search(fileUnit).map((match) => match["item"]);
    const matchedScores = fuse.search(fileUnit).map((match) => match["score"]);

    if (matchedUnits.length > 0) {
      const cleanedMatchedScores = matchedScores.map((score) =>
        isNaN(score) ? 0 : score
      );
      return zipobject(matchedUnits, cleanedMatchedScores);
    } else {
      const zeroScores = new Array(applicationUnits.length).fill(0);
      return zipobject(applicationUnits, zeroScores);
    }
  });

  const UnitSelect = ({ rowIndex }) => {
    const unitMatches = useSelector(
      (state) => state.importReducer.fileUnitsMatch
    );

    const selectedUnitRowIndex = useSelector(
      (state) => state.importReducer.selectedUnitRowIndex
    );
    const matches = Object.keys(unitMatches[rowIndex]);
    const [unit, setUnit] = React.useState(matches[selectedUnitRowIndex]);

    const handleSelectChange = (event) => {
      const { nativeEvent } = event;
      event.persist();

      dispatch(persistSelectedUnitRowIndexAction(rowIndex));
      const selectedUnit = event.target.value;
      setUnit(selectedUnit);
      const optionIndex = matches.indexOf(selectedUnit);
      dispatch(persistSelectedUnitOptionIndexAction(optionIndex));
      nativeEvent.stopImmediatePropagation();
    };

    //rowIndex encapsulated in name
    //option index selected is unitMatches.indexOf(event.target.value)
    //persist both above in redux store
    //use both numbers to access scores and change it
    return (
      <Select
        key={rowIndex}
        className={classes.select}
        name={rowIndex.toString()}
        value={unit}
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

  const UnitClassificationSelect = ({ rowIndex }) => {
    const unitMatches = useSelector(
      (state) => state.importReducer.fileUnitsMatch
    );

    const selectedUnitRowIndex = useSelector(
      (state) => state.importReducer.selectedUnitRowIndex
    );
    const matches = Object.keys(unitMatches[rowIndex]);
    const [unit, setUnit] = React.useState(matches[selectedUnitRowIndex]);

    const handleSelectChange = (event) => {
      const { nativeEvent } = event;
      event.persist();

      dispatch(persistSelectedUnitRowIndexAction(rowIndex));
      const selectedUnit = event.target.value;
      setUnit(selectedUnit);
      const optionIndex = matches.indexOf(selectedUnit);
      dispatch(persistSelectedUnitOptionIndexAction(optionIndex));
      nativeEvent.stopImmediatePropagation();
    };

    //rowIndex encapsulated in name
    //option index selected is unitMatches.indexOf(event.target.value)
    //persist both above in redux store
    //use both numbers to access scores and change it
    return (
      <Select
        key={rowIndex}
        className={classes.select}
        name={rowIndex.toString()}
        value={unit}
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
    const unitMatches = useSelector(
      (state) => state.importReducer.fileUnitsMatch
    );
    const selectedUnitRowIndex = useSelector(
      (state) => state.importReducer.selectedUnitRowIndex
    );
    const selectedUnitOptionIndex = useSelector(
      (state) => state.importReducer.selectedUnitOptionIndex
    );
    const matchScores = Object.values(unitMatches[rowIndex]);
    const score =
      selectedUnitRowIndex === rowIndex
        ? matchScores[selectedUnitOptionIndex]
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
    "FILE UNIT",
    "APPLICATION UNIT",
    "UNIT CLASSIFICATION",
    "MATCH",
    "ANCHOR MATCH",
  ];
  const rawTableData = fileUnits.map((fileUnit, i) => {
    return {
      [rawTableHeaders[0]]: fileUnit,
      [rawTableHeaders[1]]: <UnitSelect rowIndex={i} />,
      [rawTableHeaders[2]]: <UnitClassificationSelect rowIndex={i} />,
      [rawTableHeaders[3]]: <MatchScore rowIndex={i} />,
      [rawTableHeaders[4]]: <AnchorMatch rowIndex={i} />,
    };
  });
  const definedWidths = [39, 100, 150, 150, 120, 120, 180];

  return (
    <div className={classes.rootMatchUnits}>
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
