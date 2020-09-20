import { makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ApexTable from "./../../../../Application/Components/ApexTable";
import TableRole from "./../../../../Application/Components/TableRole";
import TableAction from "./../../../../Application/Components/TableAction";
import getTableHeaders from "./../../../../Application/Utils/GetTableHeaders";
import cleanTableData from "./../../../../Application/Utils/CleanTableData";
import generateInitialTableRoles from "./../../../../Application/Utils/GenerateInitialTableRoles";
import generateInterimTable from "./../../../../Application/Utils/GenerateInterimTable";
import generateTableColumnWidths from "./../../../../Application/Utils/GenerateTableColumnWidths";
import generateTableWidth from "./../../../../Application/Utils/GenerateTableWidth";
import uniq from "lodash.uniq";
import {
  persistFileHeadersAction,
  persistFileUnitsAction,
  persistTableDataAction,
  persistTableRolesIndicesAction,
} from "./../../../Redux/Actions/ImportActions";

const useStyles = makeStyles((theme) => ({
  rootParseTable: {
    display: "flex",
    flexDirection: "column",
    width: "98%",
    height: "95%",
    border: "1px solid #A8A8A8",
    backgroundColor: "#FFF",
    padding: 20,
  },
}));

export default function ImportExcelParseTable() {
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
    console.log(
      "Logged output -->: ImportExcelParseTable -> initialHeaders",
      initialHeaders
    );
    const initialUnits = uniq(Object.values(noAddedColumnTableData[1])).filter(
      (unit) => unit !== ""
    );
    console.log(
      "Logged output -->: ImportExcelParseTable -> initialUnits",
      initialUnits
    );

    dispatch(persistFileHeadersAction(initialHeaders));
    dispatch(persistFileUnitsAction(initialUnits));
    dispatch(persistTableRolesIndicesAction(initialRolesIndices));
    dispatch(persistTableDataAction(noAddedColumnTableData));
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
  const initialRolesIndices = generateInitialTableRoles(noOfRows);
  console.log(
    "Logged output -->: ImportExcelParseTable -> initialRolesIndices",
    initialRolesIndices
  );

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
      initialRolesIndices,
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
