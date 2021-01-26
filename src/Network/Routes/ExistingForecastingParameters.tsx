import { Checkbox, makeStyles } from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch } from "react-redux";
import Author from "../../Application/Components/Author/Author";
import { ApexGrid } from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableIconsOptions } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import formatDate from "../../Application/Utils/FormatDate";
import { johnImg, shirleyImg } from "../../Import/Utils/iconImages";
import DoughnutChart from "../../Visualytics/Components/DoughnutChart";
import { IForecastParametersDetail } from "../Components/Dialogs/ExistingNetworksDialogTypes";

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
const forecastParametersList: IForecastParametersDetail[] = [
  {
    forecastParametershSPName: "Oil",
    forecastParametersTimeFreq: "Monthly",
    forecastParametersRealtime: "Yes",
    forecastParametersEndForecast: "December 2060",
    forecastParametersTitle: "ARPR_FORECAST PARAMETERS 2020",
    forecastParametersDescription: "ARPR_FORECAST PARAMETERS 2020",
    author: { avatarUrl: shirleyImg, name: "Shirley Fraser" },
    createdOn: formatDate(new Date(2019, 9, 23)),
    modifiedOn: formatDate(new Date(2019, 11, 23)),
  },
  {
    forecastParametershSPName: "Gas",
    forecastParametersTimeFreq: "Yearly",
    forecastParametersRealtime: "Yes",
    forecastParametersEndForecast: "December 2060",
    forecastParametersTitle: "ARPR_FORECAST PARAMETERS 2019",
    forecastParametersDescription: "ARPR_FORECAST PARAMETERS 2019",
    author: { avatarUrl: shirleyImg, name: "Shirley Fraser" },
    createdOn: formatDate(new Date(2019, 9, 23)),
    modifiedOn: formatDate(new Date(2019, 11, 23)),
  },
  {
    forecastParametershSPName: "Oil",
    forecastParametersTimeFreq: "Yearly",
    forecastParametersRealtime: "Yes",
    forecastParametersEndForecast: "December 2060",
    forecastParametersTitle: "ARPR_FORECAST PARAMETERS 2018",
    forecastParametersDescription: "ARPR_FORECAST PARAMETERS 2018",
    author: { avatarUrl: johnImg, name: "John Bravo" },
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

export default function ExistingForecastingParameters() {
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
    row: IForecastParametersDetail,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.persist();
    alert(row);
    setCheckboxSelected(!checkboxSelected);
  };

  const generateColumns = () => {
    const columns: Column<IForecastParametersDetail>[] = [
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
        key: "actions",
        name: "ACTIONS",
        editable: false,
        formatter: ({ row }) => (
          <div>
            <VisibilityOutlinedIcon
              onClick={() => alert(`View Row is:${row}`)}
            />
            <ArrowRightIcon
              onClick={() => alert(`Forecast run Row is:${row}`)}
            />
            <EditOutlinedIcon onClick={() => alert(`Edit Row is:${row}`)} />
            <DeleteOutlinedIcon onClick={() => alert(`Delete Row is:${row}`)} />
            <MenuOpenOutlinedIcon onClick={() => alert(`Menu Row is:${row}`)} />
          </div>
        ),
        width: 100,
      },
      {
        key: "forecastParametersTitle",
        name: "FORECAST PARAMETERS TITLE",
        editable: false,
        resizable: true,
        width: 300,
      },
      {
        key: "forecastParametersDCA",
        name: "DECLINE CURVE PARAMETERS",
        editable: false,
        resizable: true,
        width: 300,
      },
      {
        key: "forecastParametershSPName",
        name: "HYDROCARBON STREAM PRIORITIZATION",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          // return <DCAParametersStatus author={row.author} />;
          return <div>Default or User</div>;
        },
        width: 100,
      },
      {
        key: "forecastParametersTimeFreq",
        name: "TIME FREQUENCY",
        editable: false,
        resizable: true,
        width: 100,
      },
      {
        key: "forecastParametersRealtime",
        name: "REALTIME RESULTS",
        editable: false,
        resizable: true,
        width: 100,
      },
      {
        key: "forecastParametersEndForecast",
        name: "END FORECAST DATE",
        editable: false,
        resizable: true,
        width: 100,
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
        key: "createdOn",
        name: "CREATED",
        editable: true,
        resizable: true,
        formatter: ({ row }) => {
          return <div>{row.createdOn}</div>;
        },
        // width: 200,
      },
      {
        key: "modifiedOn",
        name: "MODIFIED",
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

  const snForecastParametersList = forecastParametersList.map(
    (row, i: number) => ({
      sn: i + 1,
      ...row,
    })
  );
  const tableRows = React.useRef<IForecastParametersDetail[]>(
    snForecastParametersList
  );
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
        <ApexGrid<IForecastParametersDetail, ITableIconsOptions>
          columns={columns}
          rows={rows}
          options={tableOptions}
          newTableRowHeight={80}
        />
      </div>
    </div>
  );
}
