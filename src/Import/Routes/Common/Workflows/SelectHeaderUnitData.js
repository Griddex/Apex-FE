import { makeStyles } from "@material-ui/core";
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
  persistCurrentTableHeadersAction,
  persistOptionIndicesAction,
} from "../../../Redux/Actions/ImportActions";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import generateOptionIndices from "./../../../../Application/Utils/GenerateOptionIndices";

const useStyles = makeStyles(() => ({
  rootParseTable: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",
    padding: 20,
  },
}));

export default function SelectHeaderUnitData() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleEditAction = (event) => {
    event.persist();
  };
  const handleDeleteAction = (event) => {
    event.persist();
  };
  const handlePickAction = (event) => {
    event.persist();
  };

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
    });
    TableRoles.push({ [tableRoles.roleName]: role });
  }

  const [
    interimTableHeaders,
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

  const optionIndices = generateOptionIndices(noOfRows);

  React.useEffect(() => {
    const initialHeaders = Object.values(noAddedColumnTableData[0]);
    const fileUnits = Object.values(noAddedColumnTableData[1]);
    const fileUnitsUnique = uniq(fileUnits).filter((unit) => unit !== "");

    dispatch(persistFileHeadersAction(initialHeaders));
    dispatch(persistFileUnitsAction(fileUnits, fileUnitsUnique));
    dispatch(persistTableRolesIndicesAction(tableRoleIndices));
    dispatch(persistTableDataAction(noAddedColumnTableData));
    dispatch(persistOptionIndicesAction(optionIndices));

    dispatch(persistCurrentTableHeadersAction(interimTableHeaders));

    // setTimeout(() => dispatch(hideSpinnerAction()), 4000);
    dispatch(hideSpinnerAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
