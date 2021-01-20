import { makeStyles } from "@material-ui/core";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch } from "react-redux";
import Approvers from "../../../../Application/Components/Approvers/Approvers";
import Author from "../../../../Application/Components/Author/Author";
import Status from "../../../../Application/Components/Status/Status";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableIconsOptions } from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { IUserDetails } from "../../../../Application/Components/User/UserTypes";
import { IWorkflowProcess } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import formatDate from "../../../../Application/Utils/FormatDate";
import DoughnutChart from "../../../../Visualytics/Components/DoughnutChart";
import {
  anitaImg,
  glenImg,
  johnImg,
  kerryImg,
  shirleyImg,
} from "../../../Utils/iconImages";

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

interface IForecastDeckRow {
  status: string;
  forecastDeck: string;
  author: IUserDetails;
  approvers: IUserDetails[];
  createdOn: string;
  modifiedOn: string;
}

//TODO: API saga to get entire units object from server
const forecastDeckList: IForecastDeckRow[] = [
  {
    status: "Approved",
    forecastDeck: "ARPR_FORECAST_DECK 2020",
    author: { avatarUrl: shirleyImg, name: "Shirley Fraser" },
    approvers: [
      { avatarUrl: anitaImg, name: "Anita Stragan" },
      { avatarUrl: glenImg, name: "Glen Moore John III" },
      { avatarUrl: kerryImg, name: "Kerry Schwarzenegger" },
    ],
    createdOn: formatDate(new Date(2019, 9, 23)),
    modifiedOn: formatDate(new Date(2019, 11, 23)),
  },
  {
    status: "Pending",
    forecastDeck: "ARPR_FORECAST_DECK 2019",
    author: { avatarUrl: shirleyImg, name: "Shirley Fraser" },
    approvers: [
      { avatarUrl: anitaImg, name: "Anita Stragan" },
      { avatarUrl: glenImg, name: "Glen Moore John III" },
      { avatarUrl: kerryImg, name: "Kerry Schwarzenegger" },
    ],
    createdOn: formatDate(new Date(2019, 9, 23)),
    modifiedOn: formatDate(new Date(2019, 11, 23)),
  },
  {
    status: "Returned",
    forecastDeck: "ARPR_FORECAST_DECK 2018",
    author: { avatarUrl: johnImg, name: "John Bravo" },
    approvers: [
      { avatarUrl: anitaImg, name: "Anita Stragan" },
      { avatarUrl: glenImg, name: "Glen Moore John III" },
      { avatarUrl: kerryImg, name: "Kerry Schwarzenegger" },
    ],
    createdOn: formatDate(new Date(2019, 9, 23)),
    modifiedOn: formatDate(new Date(2019, 11, 23)),
  },
];

export default function ExistingDataWorkflow({
  workflowProcess,
}: IWorkflowProcess) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const tableOptions: ITableIconsOptions = {
    sort: {
      show: true,
    },
    filter: {
      show: true,
    },
    save: {
      show: true,
      action: () => {
        alert("Save table icon");
      },
    },
  };

  //TODO: Calculate classification data from collection
  const existingData = [
    { name: "Group A", value: 2400 },
    { name: "Group B", value: 4567 },
    { name: "Group C", value: 1398 },
    { name: "Group D", value: 9800 },
    { name: "Group E", value: 3908 },
    { name: "Group F", value: 4800 },
  ];

  const generateColumns = () => {
    const columns: Column<IForecastDeckRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      {
        key: "status",
        name: "STATUS",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          return <Status statusText={row.status} />;
        },
        width: 100,
      },
      {
        key: "forecastDeck",
        name: "FORECAST DECK",
        editable: false,
        resizable: true,
        width: 300,
      },
      {
        key: "author",
        name: "AUTHOR",
        editable: true,
        resizable: true,
        formatter: ({ row }) => {
          return <Author author={row.author} />;
        },
        width: 300,
      },
      {
        key: "approvers",
        name: "APPROVERS",
        editable: true,
        resizable: true,
        formatter: ({ row }) => {
          return <Approvers approvers={row.approvers} />;
        },
        width: 300,
      },
      {
        key: "createdOn",
        name: "CREATED ON",
        editable: true,
        resizable: true,
        formatter: ({ row }) => {
          return <div>{row.createdOn}</div>;
        },
        // width: 200,
      },
      {
        key: "modifiedOn",
        name: "MODIFIED ON",
        editable: true,
        resizable: true,
        formatter: ({ row }) => {
          return <div>{row.modifiedOn}</div>;
        },
        // width: 200,
      },
    ];

    return columns;
  };
  const columns = React.useMemo(() => generateColumns(), []);

  const snForecastDeckList = forecastDeckList.map((row, i: number) => ({
    sn: i + 1,
    ...row,
  }));
  const tableRows = React.useRef<IForecastDeckRow[]>(snForecastDeckList);
  const rows = tableRows.current;

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
        <ApexGrid<IForecastDeckRow, ITableIconsOptions>
          columns={columns}
          rows={rows}
          options={tableOptions}
          newTableRowHeight={80}
        />
      </div>
    </div>
  );
}
