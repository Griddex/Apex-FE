import { Checkbox, makeStyles } from "@material-ui/core";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch } from "react-redux";
import Approvers from "../../../Application/Components/Approvers/Approvers";
import Author from "../../../Application/Components/Author/Author";
import Status from "../../../Application/Components/Status/Status";
import { ApexGrid } from "../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableIconsOptions } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import formatDate from "../../../Application/Utils/FormatDate";
import {
  shirleyImg,
  anitaImg,
  glenImg,
  kerryImg,
  johnImg,
} from "../../../Import/Utils/iconImages";
import DoughnutChart from "../../../Visualytics/Components/DoughnutChart";
import { INetworkDetail } from "./ExistingNetworksDialogTypes";

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

//TODO: API saga to get entire units object from server
const networkDiagramsList: INetworkDetail[] = [
  {
    status: "Approved",
    networkName: "ARPR_NETWORK DIAGRAM 2020",
    networkDescription: "ARPR_NETWORK DIAGRAM 2020",
    author: { imgUrl: shirleyImg, name: "Shirley Fraser" },
    approvers: [
      { imgUrl: anitaImg, name: "Anita Stragan" },
      { imgUrl: glenImg, name: "Glen Moore John III" },
      { imgUrl: kerryImg, name: "Kerry Schwarzenegger" },
    ],
    createdOn: formatDate(new Date(2019, 9, 23)),
    modifiedOn: formatDate(new Date(2019, 11, 23)),
  },
  {
    status: "Pending",
    networkName: "ARPR_NETWORK DIAGRAM 2019",
    networkDescription: "ARPR_NETWORK DIAGRAM 2019",
    author: { imgUrl: shirleyImg, name: "Shirley Fraser" },
    approvers: [
      { imgUrl: anitaImg, name: "Anita Stragan" },
      { imgUrl: glenImg, name: "Glen Moore John III" },
      { imgUrl: kerryImg, name: "Kerry Schwarzenegger" },
    ],
    createdOn: formatDate(new Date(2019, 9, 23)),
    modifiedOn: formatDate(new Date(2019, 11, 23)),
  },
  {
    status: "Returned",
    networkName: "ARPR_NETWORK DIAGRAM 2018",
    networkDescription: "ARPR_NETWORK DIAGRAM 2018",
    author: { imgUrl: johnImg, name: "John Bravo" },
    approvers: [
      { imgUrl: anitaImg, name: "Anita Stragan" },
      { imgUrl: glenImg, name: "Glen Moore John III" },
      { imgUrl: kerryImg, name: "Kerry Schwarzenegger" },
    ],
    createdOn: formatDate(new Date(2019, 9, 23)),
    modifiedOn: formatDate(new Date(2019, 11, 23)),
  },
];

//TODO: Calculate classification data from collection
const existingData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function ExistingNetworksDialog() {
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

  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const handleCheckboxChange = (
    row: INetworkDetail,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.persist();
    alert(row);
    setCheckboxSelected(!checkboxSelected);
  };
  const generateColumns = () => {
    const columns: Column<INetworkDetail>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      {
        key: "selectNetwork",
        name: "",
        editable: true,
        resizable: true,
        formatter: ({ row }) => (
          <Checkbox
            onClick={(event) => handleCheckboxChange(row, event)}
            checked={checkboxSelected}
          />
        ),
        width: 300,
      },

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
        key: "networkName",
        name: "NETWORK NAME",
        editable: false,
        resizable: true,
        width: 300,
      },
      {
        key: "networkDescription",
        name: "NETWORK DESCRIPTION",
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

  const snNetworkDiagramList = networkDiagramsList.map((row, i: number) => ({
    sn: i + 1,
    ...row,
  }));
  const tableRows = React.useRef<INetworkDetail[]>(snNetworkDiagramList);
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
        <ApexGrid<INetworkDetail, ITableIconsOptions>
          columns={columns}
          rows={rows}
          options={tableOptions}
          newTableRowHeight={80}
        />
      </div>
    </div>
  );
}
