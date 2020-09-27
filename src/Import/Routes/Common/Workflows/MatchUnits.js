import { fade, makeStyles } from "@material-ui/core";
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
import generateActualTable from "../../../../Application/Utils/GenerateActualTable";
import generateTableWidth from "../../../../Application/Utils/GenerateTableWidth";
import DoughnutChart from "../../../../Visualytics/Components/DoughnutChart";
import {
  persistFileUnitsMatchAction,
  persistSelectedUnitRowOptionIndicesAction,
} from "../../../Redux/Actions/ImportActions";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";

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
  unitClassification: {
    top: 0,
    height: 30,
    width: 170,
    fontSize: 14,
  },
  score: { fontSize: 14 },
}));

const getApplicationUnits = () => {
  return [
    "(scf/stb)/(stb/scf)",
    "(stb/d)/(MMscf/d)",
    "1/psi",
    "acre",
    "barrel",
    "Bscf",
    "cp",
    "dd/mm/yyyy",
    "fraction",
    "ft",
    "int. Year / fraction",
    "mD",
    "MMscf",
    "MMscf/d",
    "MMstb",
    "psi",
  ];
};

export default function MatchUnits() {
  const classes = useStyles();
  const dispatch = useDispatch();

  //Actions
  const handleEditAction = (event, i) => {
    event.persist();
    console.log("Logged output -->: handleEditAction -> i", i);
    console.log(
      "Logged output -->: handleEditAction -> event.target.name",
      event.target.name
    );
  };
  const handleDeleteAction = (event, i) => {
    event.persist();
    console.log("Logged output -->: handleDeleteAction -> i", i);
    console.log(
      "Logged output -->: handleDeleteAction -> event.target.name",
      event.target.name
    );
  };
  const handlePickAction = (event, i) => {
    event.persist();
    console.log("Logged output -->: handlePickAction -> i", i);
    console.log(
      "Logged output -->: handlePickAction -> event.target.name",
      event.target.name
    );
  };

  //File Headers

  const fileUnitsUnique = useSelector(
    (state) => state.importReducer.fileUnitsUnique
  );

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
  const unitMatches = fileUnitsUnique.map((fileUnit) => {
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
      event.persist();

      const { nativeEvent } = event;
      const selectedUnit = event.target.value;

      setUnit(selectedUnit);
      const optionIndex = matches.indexOf(selectedUnit);
      dispatch(
        persistSelectedUnitRowOptionIndicesAction(rowIndex, optionIndex)
      );
      nativeEvent.stopImmediatePropagation();
    };

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
    const unitClassifications = ["SI", "FIELD", "MIXED"];

    //Unit matches done on server
    //Attached to matches will be unit classification
    // const unitMatches = useSelector(
    //   (state) => state.importReducer.fileUnitsMatch
    // );
    const selectedUnitRowIndex = useSelector(
      (state) => state.importReducer.selectedUnitRowIndex
    );
    // const selectedUnitOptionIndex = useSelector(
    //   (state) => state.importReducer.selectedUnitOptionIndex
    // );
    // const matches = Object.keys(unitMatches[rowIndex]);
    // const [unit, setUnit] = React.useState(matches[selectedUnitRowIndex]);
    const unitClassification =
      selectedUnitRowIndex === rowIndex
        ? unitClassifications[1]
        : unitClassifications[0];

    return (
      <Select
        key={rowIndex}
        className={classes.unitClassification}
        name={rowIndex.toString()}
        value={unitClassification}
        label=""
        size="small"
      >
        {unitClassifications.map((unitClassification, i) => (
          <MenuItem key={i} value={unitClassification}>
            {unitClassification}
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
  for (let i = 0; i < fileUnitsUnique.length; i++) {
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
    "FILE UNIT",
    "APPLICATION UNIT",
    "UNIT CLASSIFICATION",
    "MATCH",
    "ANCHOR MATCH",
  ];
  const cleanTableData = fileUnitsUnique.map((fileUnit, i) => {
    return {
      [actualColumnHeaders[0]]: fileUnit,
      [actualColumnHeaders[1]]: <UnitSelect rowIndex={i} />,
      [actualColumnHeaders[2]]: <UnitClassificationSelect rowIndex={i} />,
      [actualColumnHeaders[3]]: <MatchScore rowIndex={i} />,
      [actualColumnHeaders[4]]: <AnchorMatch rowIndex={i} />,
    };
  });
  const tableColumnWidths = [40, tableActions.width, 300, 300, 200, 120, 180];
  const tableWidth = generateTableWidth(tableColumnWidths);

  const [tableHeaders, noAddedColumnTableData, tableData] = generateActualTable(
    addedColumnHeaders,
    TableActions,
    TableRoles,
    actualColumnHeaders,
    cleanTableData
  );

  React.useEffect(() => {
    dispatch(persistFileUnitsMatchAction(unitMatches));

    // setTimeout(() => dispatch(hideSpinnerAction()), 4000);
    dispatch(hideSpinnerAction());
  }, []);

  return (
    <div className={classes.rootMatchUnits}>
      <div className={classes.chart}>
        <DoughnutChart />
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
