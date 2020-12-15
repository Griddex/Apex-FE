import { makeStyles } from "@material-ui/core";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch } from "react-redux";
import { ApexGrid } from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
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
import faker from "faker";
import ApexTable from "../../Application/Components/Table/ApexTable";

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

  // const createRawTableData() = useSelector(
  //   (state: RootState) => state.importReducer.selectedWorksheetData
  // );
  type IRawRow = Record<string, React.Key>;
  type IRawTable = IRawRow[];

  const createRawTableData = (numberOfRows: number): IRawTable => {
    const fakeRows = [];
    for (let i = 0; i < numberOfRows; i++) {
      const fakeRow = {
        year: faker.random.number({ min: 2000, max: 2020 }),
        oilRate: faker.random.number({ min: 600, max: 10000 }),
        gasRate: faker.random.number({ min: 30, max: 160 }),
        seismicCost: faker.random.number({ min: 10, max: 15 }),
        explApprCost: faker.random.number({ min: 5, max: 10 }),
        facilitiesCost: faker.random.number({ min: 50, max: 250 }),
        tangWellCost: faker.random.number({ min: 20, max: 80 }),
        intangWellCost: faker.random.number({ min: 10, max: 50 }),
        abandCost: faker.random.number({ min: 10, max: 50 }),
        directCost: faker.random.number({ min: 5, max: 20 }),
        cha: faker.random.number({ min: 5, max: 50 }),
        terminalCost: faker.random.number({ min: 10, max: 20 }),
      };

      fakeRows.push(fakeRow);
    }
    return fakeRows;
  }; //Generate actual ColumnHeaders

  const rawTableData = createRawTableData(100);
  // const rawTableData = React.useRef<IRawTable>(createRawTableData(100));
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

  type DataType = Record<string, React.Key | boolean>;
  type PayloadType = {
    fromRow: number;
    toRow: number;
    updated: Record<string, React.Key | boolean>;
  };
  interface IAction {
    type: string;
    payload: PayloadType;
  }

  const columns: Column<IRawRow>[] = [
    { key: "sn", name: "SN", editable: false },
    { key: "year", name: "year", editable: true },
    { key: "oilRate", name: "Oil Rate", editable: true },
    { key: "gasRate", name: "Gas Rate", editable: true },
    { key: "seismicCost", name: "Seismic Cost", editable: true },
    { key: "explApprCost", name: "Exploration/Appraisal Cost", editable: true },
    { key: "facilitiesCost", name: "Facilities Cost", editable: true },
    { key: "tangWellCost", name: "Tangible WellCost", editable: true },
    { key: "intangWellCost", name: "Intangible WellCost", editable: true },
    { key: "abandCost", name: "Abandonment Cost", editable: true },
    { key: "directCost", name: "Direct Cost", editable: true },
    { key: "cha", name: "CHA", editable: true },
    { key: "terminalCost", name: "Terminal Cost", editable: true },
  ];

  // const rowsReducer = (rows: DataType[], action: IAction): DataType[] => {
  //   switch (action.type) {
  //     case "GRIDROWS_UPDATED": {
  //       const { fromRow, toRow, updated } = action.payload;

  //       const rowsData = rows.slice();
  //       for (let i: number = fromRow; i <= toRow; i++) {
  //         rowsData[i] = { ...rowsData[i], ...updated };
  //       }
  //       return rowsData;
  //     }

  //     default:
  //       return rowsData;
  //   }
  // };
  // const [rowsData, localDispatch] = React.useReducer(rowsReducer, rows);

  // const onGridRowsUpdated = ({
  //   fromRow,
  //   toRow,
  //   updated,
  // }: {
  //   fromRow: number;
  //   toRow: number;
  //   updated: Record<string, React.Key>;
  // }) => {
  //   localDispatch({
  //     type: "GRIDROWS_UPDATED",
  //     payload: { fromRow, toRow, updated },
  //   });
  // };

  return (
    <div className={classes.rootParseTable}>
      <ApexGrid<IRawRow>
        columns={columns}
        rows={rawTableData}
        sortColumn="year"
        // sortColumnType="year" set based on current column selected to be sorted
        sortDirection="NONE"
      />
    </div>
    // <div className={classes.rootParseTable}>
    //   <ApexTable
    //     tableData={tableData}
    //     tableHeaders={tableHeaders}
    //     tableColumnWidths={tableColumnWidths}
    //     tableWidth={tableWidth}
    //   />
    // </div>
  );
}
