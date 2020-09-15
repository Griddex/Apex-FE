import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ApexTable from "./../../../../Application/Components/ApexTable";
import RowActions from "./../../../../Application/Components/RowActions";
import Roles from "./../../../../Application/Components/Roles";
// import { persistTableRowsRolesAction } from "./../../../Redux/Actions/ImportActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "98%",
    height: "95%",
    border: "1px solid #707070",
    backgroundColor: "#FFF",
  },
}));

export default function ImportExcelParseTable() {
  const classes = useStyles();
  // const dispatch = useDispatch();

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

  const rawTableData = useSelector(
    (state) => state.importReducer.selectedWorksheetData
  );
  const addedColumnsHeaders = ["ACTIONS", "ROLES"];
  const addedColumns = {
    ACTIONS: () => <RowActions />,
    ROLES: () => <Roles />,
  };
  const addedColumnsWidths = 100;
  const actionsColumnProps = {
    handleEditAction: handleEditAction,
    handleDeleteAction: handleDeleteAction,
    handlePickAction: handlePickAction,
    // handleEditAction: () => handleEditAction(),
    // handleDeleteAction: () => handleDeleteAction(),
    // handlePickAction: () => handlePickAction(),
  };

  const rolesColumnProps = {
    roles: ["#22BE34", "#DA1B57", "#2BB4C1", "#969498"],
    texts: ["Headers", "Units", "Data", "-"],
  };

  return (
    <div className={classes.root}>
      <ApexTable
        rawTableData={rawTableData}
        addedColumnsHeaders={addedColumnsHeaders}
        addedColumns={addedColumns}
        addedColumnsWidths={addedColumnsWidths}
        actionsColumnProps={actionsColumnProps}
        rolesColumnProps={rolesColumnProps}
      />
    </div>
  );
}
