import { fade, makeStyles } from "@material-ui/core";
import uniq from "lodash.uniq";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ApexTable from "../../../../Application/Components/Table/ApexTable";
import TableAction from "../../../../Application/Components/Table/TableAction";
import TableRole from "../../../../Application/Components/Table/TableRole";
import cleanTableData from "../../../../Application/Utils/CleanTableData";
import generateInterimTable from "../../../../Application/Utils/GenerateInterimTable";
import generateTableColumnWidths from "../../../../Application/Utils/GenerateTableColumnWidths";
import generatelTableRolesIndices from "../../../../Application/Utils/GenerateTableRolesIndices";
import generateTableWidth from "../../../../Application/Utils/GenerateTableWidth";
import getTableHeaders from "../../../../Application/Utils/GetTableHeaders";
import {
  persistFileHeadersAction,
  persistFileUnitsAction,
  persistTableDataAction,
  persistTableRolesIndicesAction,
} from "../../../Redux/Actions/ImportActions";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";

const useStyles = makeStyles((theme) => ({
  rootParseTable: {
    display: "flex",
    flexDirection: "column",
    width: "98%",
    height: "95%",
    border: "1px solid #A8A8A8",
    boxShadow: `${fade("#A8A8A8", 0.25)} 0 0 0 2px`,
    backgroundColor: "#FFF",
    padding: 20,
  },
}));

export default function SelectHeaderUnitData() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleEditAction = (event, i) => {
    event.persist();
    console.log("Logged output -->: handleEditAction -> event", event);
  };
  const handleDeleteAction = (event, i) => {
    event.persist();
    console.log("Logged output -->: handleDeleteAction -> event", event);
  };
  const handlePickAction = (event, i) => {
    event.persist();
    console.log("Logged output -->: handlePickAction -> event", event);
  };

  React.useEffect(() => {
    const initialHeaders = Object.values(noAddedColumnTableData[0]);
    const fileUnits = Object.values(noAddedColumnTableData[1]);
    const fileUnitsUnique = uniq(fileUnits).filter((unit) => unit !== "");

    dispatch(persistFileHeadersAction(initialHeaders));
    dispatch(persistFileUnitsAction(fileUnits, fileUnitsUnique));
    dispatch(persistTableRolesIndicesAction(tableRoleIndices));
    dispatch(persistTableDataAction(noAddedColumnTableData));

    setTimeout(() => dispatch(hideSpinnerAction()), 4000);
  }, []);

  const rawTableData = useSelector(
    (state) => state.importReducer.selectedWorksheetData
  );

  //Generate actual ColumnHeaders
  const rawTableHeaders = getTableHeaders(rawTableData);

  //Fill in blank spaces in table data
  const cleanedTableData = cleanTableData(rawTableData, rawTableHeaders);

  const noOfRows = cleanedTableData.length;

  //Initial table roles
  const tableRoleIndices = generatelTableRolesIndices(noOfRows);

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
  for (let i = 0; i <= cleanedTableData.length; i++) {
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
  for (let i = 0; i <= cleanedTableData.length; i++) {
    const role = React.cloneElement(roleComponent(), {
      i,
      roleNames,
      roleColors,
      tableRoleIndices,
    });
    TableRoles.push({ [tableRoles.roleName]: role });
  }

  const [
    tableHeaders,
    noAddedColumnTableData,
    tableData,
  ] = generateInterimTable(
    rawTableHeaders,
    [tableActions.actionName, tableRoles.roleName],
    TableActions,
    TableRoles,
    cleanedTableData
  );

  const tableColumnWidths = generateTableColumnWidths(
    tableData,
    tableActions.width,
    tableRoles.width
  );
  const tableWidth = generateTableWidth(tableColumnWidths);

  return (
    <div className={classes.rootParseTable}>
      <ApexTable
        tableData={tableData}
        tableHeaders={tableHeaders}
        tableColumnWidths={tableColumnWidths}
        tableWidth={tableWidth}
      />
    </div>
  );
}
