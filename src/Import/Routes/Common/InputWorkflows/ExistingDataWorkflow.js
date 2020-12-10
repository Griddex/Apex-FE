import { makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import ApexTable from "../../../../Application/Components/Table/ApexTable";
import TableAction from "../../../../Application/Components/Table/TableAction";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import generateActualTable from "../../../../Application/Utils/GenerateActualTable";
import generateTableWidth from "../../../../Application/Utils/GenerateTableWidth";
import DoughnutChart from "../../../../Visualytics/Components/DoughnutChart";
import formatDate from "./../../../../Application/Utils/FormatDate";
import {
  anitaImg,
  glenImg,
  johnImg,
  kerryImg,
  shirleyImg,
} from "./../../../Utils/iconImages";
import Status from "../../../../Application/Components/Status/Status";
import Author from "../../../../Application/Components/Author/Author";
import Approvers from "../../../../Application/Components/Approvers/Approvers";

const useStyles = makeStyles(() => ({
  rootExistingData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
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
  status: {
    height: "100%",
    width: "100%",
    fontSize: 14,
  },
  image: { height: 30, width: 30 },
  author: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  approvers: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
}));

export default function ExistingDataWorkflow() {
  const classes = useStyles();
  const dispatch = useDispatch();

  //Actions
  const handleEditAction = (event) => {
    event.persist();
  };
  const handleDeleteAction = (event) => {
    event.persist();
  };
  const handlePickAction = (event) => {
    event.persist();
  };

  //File Headers
  //Table data to be fetched fropm server

  const fileHeadersTableData = [
    {
      status: "Approved",
      forecastDeck: "ARPR_FORECAST_DECK 2020",
      author: { imgURL: shirleyImg, name: "Shirley Fraser" },
      approvers: [
        { imgURL: anitaImg, name: "Anita Stragan" },
        { imgURL: glenImg, name: "Glen Moore John III" },
        { imgURL: kerryImg, name: "Kerry Schwarzenegger" },
      ],
      createdOn: formatDate(new Date(2019, 9, 23)),
      modifiedOn: formatDate(new Date(2019, 11, 23)),
    },
    {
      status: "Pending",
      forecastDeck: "ARPR_FORECAST_DECK 2019",
      author: { imgURL: shirleyImg, name: "Shirley Fraser" },
      approvers: [
        { imgURL: anitaImg, name: "Anita Stragan" },
        { imgURL: glenImg, name: "Glen Moore John III" },
        { imgURL: kerryImg, name: "Kerry Schwarzenegger" },
      ],
      createdOn: formatDate(new Date(2019, 9, 23)),
      modifiedOn: formatDate(new Date(2019, 11, 23)),
    },
    {
      status: "Returned",
      forecastDeck: "ARPR_FORECAST_DECK 2018",
      author: { imgURL: johnImg, name: "John Bravo" },
      approvers: [
        { imgURL: anitaImg, name: "Anita Stragan" },
        { imgURL: glenImg, name: "Glen Moore John III" },
        { imgURL: kerryImg, name: "Kerry Schwarzenegger" },
      ],
      createdOn: formatDate(new Date(2019, 9, 23)),
      modifiedOn: formatDate(new Date(2019, 11, 23)),
    },
  ];

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
  for (let i = 0; i < fileHeadersTableData.length; i++) {
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
    "STATUS",
    "FORECAST DECK",
    "AUTHOR",
    "APPROVERS",
    "CREATED ON",
    "MODIFIED ON",
  ];

  const cleanTableData = fileHeadersTableData.map((row, i) => {
    return {
      [actualColumnHeaders[0]]: <Status rowIndex={i} statusText={row.status} />,
      [actualColumnHeaders[1]]: row.forecastDeck,
      [actualColumnHeaders[2]]: <Author rowIndex={i} author={row.author} />,
      [actualColumnHeaders[3]]: (
        <Approvers rowIndex={i} approvers={row.approvers} />
      ),
      [actualColumnHeaders[4]]: row.createdOn,
      [actualColumnHeaders[5]]: row.modifiedOn,
    };
  });
  const tableColumnWidths = [
    40,
    tableActions.width,
    100,
    300,
    200,
    200,
    200,
    200,
  ];
  const tableWidth = generateTableWidth(tableColumnWidths);

  const { tableHeaders, tableData } = generateActualTable(
    addedColumnHeaders,
    TableActions,
    TableRoles,
    actualColumnHeaders,
    cleanTableData
  );

  const existingData = [
    { name: "Group A", value: 2400 },
    { name: "Group B", value: 4567 },
    { name: "Group C", value: 1398 },
    { name: "Group D", value: 9800 },
    { name: "Group E", value: 3908 },
    { name: "Group F", value: 4800 },
  ];

  React.useEffect(() => {
    // setTimeout(() => dispatch(hideSpinnerAction()), 4000);
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  return (
    <div className={classes.rootExistingData}>
      <div className={classes.chart}>
        <DoughnutChart data={existingData} />
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
