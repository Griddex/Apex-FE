import { fade, makeStyles } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ApexTable from "../../../../Application/Components/Table/ApexTable";
import TableAction from "../../../../Application/Components/Table/TableAction";
import TableRole from "../../../../Application/Components/Table/TableRole";
import generateActualTable from "../../../../Application/Utils/GenerateActualTable";
import generateTableColumnWidths from "../../../../Application/Utils/GenerateTableColumnWidths";
import generateTableWidth from "../../../../Application/Utils/GenerateTableWidth";
import regenerateTableWithActualHeaders from "../../../../Application/Utils/RegenerateTableWithActualHeaders";
import { persistSelectedUnitRowOptionIndicesAction } from "../../../Redux/Actions/ImportActions";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";

const useStyles = makeStyles((theme) => ({
  rootPreviewSave: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "85%",
    height: "100%",
    border: "1px solid #A8A8A8",
    boxShadow: `${fade("#A8A8A8", 0.25)} 0 0 0 2px`,
    backgroundColor: "#FFF",
    padding: 20,
  },
  table: {
    width: "100%",
    height: "80%",
    padding: 20,
  },
  select: {
    top: 0,
    height: 30,
    width: "100%",
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

export default function PreviewSave() {
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

  React.useEffect(() => {
    setTimeout(() => dispatch(hideSpinnerAction()), 4000);
  }, []);

  //File Headers
  const noAddedColumnstableData = useSelector(
    (state) => state.importReducer.tableData
  );

  const UnitSelect = ({ columnIndex }) => {
    const unitMatchesUnique = useSelector(
      (state) => state.importReducer.fileUnitsMatch
    );
    const fileUnits = useSelector((state) => state.importReducer.fileUnits);
    const fileUnitsUnique = useSelector(
      (state) => state.importReducer.fileUnitsUnique
    );

    const unitMatches = fileUnits.map((unit, i) => {
      if (unit === "") return { None: "None" };
      else {
        const unitIndex = fileUnitsUnique.indexOf(unit);
        return unitMatchesUnique[unitIndex];
      }
    });

    const selectedUnitRowIndex = useSelector(
      (state) => state.importReducer.selectedUnitRowIndex
    );

    const matches = Object.keys(unitMatches[columnIndex]);
    console.log("Logged output -->: UnitSelect -> matches", matches);
    const [unit, setUnit] = React.useState(matches[selectedUnitRowIndex]);

    const handleSelectChange = (event) => {
      event.persist();

      const { nativeEvent } = event;
      const selectedUnit = event.target.value;

      setUnit(selectedUnit);
      const optionIndex = matches.indexOf(selectedUnit);
      dispatch(
        persistSelectedUnitRowOptionIndicesAction(columnIndex, optionIndex)
      );
      nativeEvent.stopImmediatePropagation();
    };

    return (
      <Select
        key={columnIndex}
        className={classes.select}
        name={columnIndex.toString()}
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

  //Grab indices that defines header, units and body rows
  const tableRoleIndicesInitial = useSelector(
    (state) => state.importReducer.tableRoleIndices
  );

  let headerRow = {};
  let tableRows = [];
  let tableRoleIndices = [];
  for (let i = 0; i < noAddedColumnstableData.length; i++) {
    const roleIndex = tableRoleIndicesInitial[i];
    switch (roleIndex) {
      case 0:
        headerRow = noAddedColumnstableData[i];

        break;
      case 2:
        tableRows.push(noAddedColumnstableData[i]);
        break;
      default:
        break;
    }
    if (i === 0) tableRoleIndices.push(1);
    else tableRoleIndices.push(2);
  }
  console.log("Logged output -->: tableRoleIndices", tableRoleIndices);

  const applicationHeaders = Object.values(headerRow);
  const interimHeaders = Object.keys(headerRow);
  const unitSelectRow = applicationHeaders.reduce((a, _, i) => {
    return {
      ...a,
      [interimHeaders[i]]: <UnitSelect columnIndex={i} />, //what header is this?
    };
  }, {});

  const aggregateTableData = [unitSelectRow, ...tableRows];

  //Regenerate Table with actual headers
  const cleanTableData = regenerateTableWithActualHeaders(
    aggregateTableData,
    applicationHeaders
  );
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
  for (let i = 0; i < cleanTableData.length; i++) {
    const action = React.cloneElement(actionComponent(), {
      i,
      ...actionMethods,
    });
    TableActions.push({ [tableActions.actionName]: action });
  }

  //Generate table roles
  const tableRoles = {
    roleName: "ROLES",
    width: 120,
    roleComponent: () => <TableRole />,
    roleNames: ["Headers", "Units", "Data", "-"],
    roleColors: ["#22BE34", "#DA1B57", "#2BB4C1", "#969498"],
  };
  const TableRoles = [];
  const { roleComponent, roleNames, roleColors } = tableRoles;
  for (let i = 0; i <= cleanTableData.length; i++) {
    const role = React.cloneElement(roleComponent(), {
      i,
      roleNames,
      roleColors,
      tableRoleIndices, //pass in disabled button prop here
    });
    TableRoles.push({ [tableRoles.roleName]: role });
  }

  const addedColumnHeaders = [tableActions.actionName, tableRoles.roleName];

  const [tableHeaders, noAddedColumnTableData, tableData] = generateActualTable(
    addedColumnHeaders,
    TableActions,
    TableRoles,
    applicationHeaders,
    cleanTableData
  );

  const tableColumnWidths = generateTableColumnWidths(
    tableData,
    tableActions.width,
    tableRoles.width
  );

  console.log("Logged output -->: tableColumnWidths", tableColumnWidths);
  const tableWidth = generateTableWidth(tableColumnWidths);
  console.log("Logged output -->: tableWidth", tableWidth);

  return (
    <div className={classes.rootPreviewSave}>
      <ApexTable
        tableData={tableData}
        tableHeaders={tableHeaders}
        tableColumnWidths={tableColumnWidths}
        tableWidth={tableWidth}
      />
    </div>
  );
}
