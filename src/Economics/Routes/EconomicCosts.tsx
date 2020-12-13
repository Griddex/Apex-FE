import { makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import ApexTable from "../../Application/Components/Table/ApexTable";
import TableAction from "../../Application/Components/Table/TableAction";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import AddSerialNumberToTable from "../../Application/Utils/AddSerialNumberToTable";
import cleanTableData from "../../Application/Utils/CleanTableData";
import generateActualTable from "../../Application/Utils/GenerateActualTable";
import generateTableWidth from "../../Application/Utils/GenerateTableWidth";
import getTableHeaders from "../../Application/Utils/GetTableHeaders";
import {
  persistCurrentTableHeadersAction,
  persistTableDataAction,
} from "../../Import/Redux/Actions/ImportActions";
import ReactDataGrid from "react-data-grid";

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

export default function EconomicCosts() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleEditAction = (event: { persist: () => void }) => {
    event.persist();
  };
  const handleDeleteAction = (event: { persist: () => void }) => {
    event.persist();
  };
  const handlePickAction = (event: { persist: () => void }) => {
    event.persist();
  };

  // const rawTableData = useSelector(
  //   (state: RootState) => state.importReducer.selectedWorksheetData
  // );

  const rawTableData = [
    {
      year: 2020,
      oilRate: 2000,
      gasRate: 26,
      seismicCost: 10,
      explApprCost: 5,
      facilitiesCost: 50,
      tangWellCost: 20,
      intangWellCost: 15,
      abandCost: 0,
      directCost: 0,
      cha: 0,
      terminalCost: 0,
    },
    {
      year: 2021,
      oilRate: 1300,
      gasRate: 76,
      seismicCost: 0,
      explApprCost: 0,
      facilitiesCost: 0,
      tangWellCost: 0,
      intangWellCost: 0,
      abandCost: 0,
      directCost: 0,
      cha: 0,
      terminalCost: 0,
    },
    {
      year: 2022,
      oilRate: 1000,
      gasRate: 76,
      seismicCost: 0,
      explApprCost: 0,
      facilitiesCost: 0,
      tangWellCost: 0,
      intangWellCost: 0,
      abandCost: 0,
      directCost: 0,
      cha: 0,
      terminalCost: 0,
    },
  ];

  //Generate actual ColumnHeaders
  const rawTableHeaders = getTableHeaders(rawTableData);

  //Fill in blank spaces in table data
  const cleanedTableData = cleanTableData(rawTableData, rawTableHeaders);

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

  const cleanedTableDataWithSN = AddSerialNumberToTable(cleanedTableData);

  const {
    tableHeaders,
    noAddedColumnTableData,
    tableData,
  } = generateActualTable(
    [tableActions.actionName],
    TableActions,
    null,
    rawTableHeaders,
    cleanedTableDataWithSN
  );
  console.log(
    "Logged output --> ~ file: EconomicCosts.tsx ~ line 122 ~ EconomicCosts ~ tableHeaders",
    tableHeaders
  );
  console.log(
    "Logged output --> ~ file: EconomicCosts.tsx ~ line 122 ~ EconomicCosts ~ tableData",
    tableData
  );

  const tableColumnWidths = [
    40,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
  ];
  const tableWidth = generateTableWidth(tableColumnWidths);
  console.log(
    "Logged output --> ~ file: EconomicCosts.tsx ~ line 149 ~ EconomicCosts ~ tableWidth",
    tableWidth
  );

  React.useEffect(() => {
    dispatch(persistTableDataAction(noAddedColumnTableData));
    dispatch(persistCurrentTableHeadersAction(rawTableHeaders));

    // setTimeout(() => dispatch(hideSpinnerAction()), 4000);
    dispatch(hideSpinnerAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    // <div className={classes.rootParseTable}>
    //   <ReactDataGrid
    //     columns={columns}
    //     rowGetter={i => this.state.rows[i]}
    //     rowsCount={3}
    //     onGridRowsUpdated={this.onGridRowsUpdated}
    //     enableCellSelect={true}
    //   />
    // </div>
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
