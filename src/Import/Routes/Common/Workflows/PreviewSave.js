import { makeStyles } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ApexTable from "../../../../Application/Components/Table/ApexTable";
import TableAction from "../../../../Application/Components/Table/TableAction";
import TableRole from "../../../../Application/Components/Table/TableRole";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import generateActualTable from "../../../../Application/Utils/GenerateActualTable";
import generateTableColumnWidths from "../../../../Application/Utils/GenerateTableColumnWidths";
import generateTableWidth from "../../../../Application/Utils/GenerateTableWidth";
import regenerateTableWithActualHeaders from "../../../../Application/Utils/RegenerateTableWithActualHeaders";
import { persistSelectedUnitRowOptionIndicesAction } from "../../../Redux/Actions/ImportActions";
import { persistTableRolesIndicesAction } from "./../../../Redux/Actions/ImportActions";

const useStyles = makeStyles((theme) => ({
  rootPreviewSave: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
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
  };
  const handleDeleteAction = (event, i) => {
    event.persist();
  };
  const handlePickAction = (event, i) => {
    event.persist();
  };

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
  const tableRoleIndices = useSelector(
    (state) => state.importReducer.tableRoleIndices
  );

  let headerRow = {};
  let tableRows = [];
  let newtableRoleIndices = [];
  for (let i = 0; i < noAddedColumnstableData.length; i++) {
    const roleNumber = tableRoleIndices[i];
    switch (roleNumber) {
      case 0:
        headerRow = noAddedColumnstableData[i];
        break;
      case 2:
        tableRows.push(noAddedColumnstableData[i]);
        break;
      default:
        break;
    }
    if (i === 0) newtableRoleIndices.push(1);
    else newtableRoleIndices.push(2);
  }

  //Define headers
  const applicationHeaders = Object.values(headerRow);
  const interimHeaders = Object.keys(headerRow);

  //Define units row
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

  const tableWidth = generateTableWidth(tableColumnWidths);

  React.useEffect(() => {
    // setTimeout(() => dispatch(hideSpinnerAction()), 4000);
    dispatch(hideSpinnerAction());
    dispatch(persistTableRolesIndicesAction(newtableRoleIndices));
  }, [dispatch]);

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
