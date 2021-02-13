import { Checkbox, makeStyles, Typography } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import Author from "../../Application/Components/Author/Author";
import { ApexGrid } from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { showDialogAction } from "../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import DoughnutChart from "../../Visualytics/Components/DoughnutChart";
import { extrudeDialogParameters } from "../Components/DialogParameters/ShowDeclineCurveDialogParameters";
import { IForecastParametersDetail } from "../Components/Dialogs/ExistingNetworksDialogTypes";
import DeclineParametersType from "../Components/Indicators/DeclineParametersType";
import NewForecastParametersButton from "../Components/Menus/NewForecastParametersButton";
import { updateNetworkParameterAction } from "../Redux/Actions/NetworkActions";
import formatDate from "./../../Application/Utils/FormatDate";
import { IExistingForcastParameters } from "./ExistingForecastParametersTypes";

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
    height: "100%",
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

//TODO: Calculate classification data from collection
const chartData = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
];

export default function ExistingForecastingParameters({
  showChart,
}: IExistingForcastParameters) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const wc = "existingDataWorkflows";
  const wp = "forecastingParametersExisting";

  const existingData = useSelector(
    (state: RootState) => state.networkReducer[wc][wp]
  );

  const { title, description } = existingData;
  const transExistingData = existingData["forecastingParametersGroupList"].map(
    (row: any) => {
      const { _id, type, createdAt, declineParameters } = row;

      const day = 12;
      const month = 9;
      const year = 2020;
      const timeFrequency = "Monthly";
      const targetFluid = "Oil";
      const isDefered = 0;

      return {
        forecastingParametersId: _id,
        declineParameters,
        type,
        title,
        description,
        targetFluid,
        timeFrequency,
        isDefered: isDefered === 0 ? "No Deferment" : "Add Deferment", //Referred, Realtime not yet
        realtimeResults: "Yes",
        endForecast: formatDate(new Date(year, month, day)),
        author: "---",
        createdOn: createdAt,
        modifiedOn: createdAt,
      };
    }
  );

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => <NewForecastParametersButton />,
  };

  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const handleCheckboxChange = (
    row: IForecastParametersDetail,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const name = "selectedForecastingParametersId";
    const value = row.forecastingParametersId;

    dispatch(updateNetworkParameterAction(name, value));
    setCheckboxSelected(!checkboxSelected);
  };

  const [, setRerender] = React.useState(false);

  const generateColumns = () => {
    const columns: Column<IForecastParametersDetail>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      {
        key: "selectNetwork",
        name: "SELECT",
        editable: false,
        resizable: true,
        formatter: ({ row }) => (
          <Checkbox
            onClick={(event) => handleCheckboxChange(row, event)}
            checked={checkboxSelected}
          />
        ),
        width: 50,
      },
      {
        key: "actions",
        name: "ACTIONS",
        editable: false,
        formatter: ({ row }) => {
          return (
            <div>
              <EditOutlinedIcon onClick={() => alert(`Edit Row is:${row}`)} />
              <DeleteOutlinedIcon
                onClick={() => alert(`Delete Row is:${row}`)}
              />
              <MenuOpenOutlinedIcon
                onClick={() => alert(`Menu Row is:${row}`)}
              />
            </div>
          );
        },
        width: 120,
      },
      {
        key: "dcaParameters",
        name: "DCA TABLE",
        editable: false,
        resizable: true,
        width: 150,
        formatter: ({ row }) => {
          const { sn } = row;
          const selectedRowIndex = (sn as number) - 1;
          return (
            <div
              style={{
                display: "flex",
                height: "100%",
                width: "100%",
                justifyContent: "space-evenly",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <VisibilityOutlinedIcon
                style={{ display: "flex", alignSelf: "center" }}
                onClick={() =>
                  dispatch(
                    showDialogAction(extrudeDialogParameters(selectedRowIndex))
                  )
                }
              />
              <Typography>View</Typography>
            </div>
          );
        },
      },
      {
        key: "type",
        name: "TYPE",
        editable: false,
        resizable: true,
        width: 150,
        formatter: ({ row }) => {
          const { type } = row;
          return (
            <div>
              <DeclineParametersType dpTypeText={type} />;
            </div>
          );
        },
      },
      {
        key: "title",
        name: "FORECAST PARAMETERS TITLE",
        editable: false,
        resizable: true,
        width: 300,
      },
      {
        key: "targetFluid",
        name: "TARGET FLUID",
        editable: false,
        resizable: true,
        width: 150,
      },
      {
        key: "timeFrequency",
        name: "TIME FREQUENCY",
        editable: false,
        resizable: true,
        width: 150,
      },
      {
        key: "isDefered",
        name: "DEFERMENT",
        editable: false,
        resizable: true,
        width: 150,
      },
      {
        key: "realtimeResults",
        name: "REALTIME RESULTS",
        editable: false,
        resizable: true,
        width: 150,
      },
      {
        key: "endForecast",
        name: "END FORECAST DATE",
        editable: false,
        resizable: true,
        width: 200,
      },
      {
        key: "author",
        name: "AUTHOR",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          return <Author author={row.author} />;
        },
        width: 200,
      },
      {
        key: "createdOn",
        name: "CREATED",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          return <div>{formatDate(new Date(row.createdOn))}</div>;
        },
        width: 200,
      },
      {
        key: "modifiedOn",
        name: "MODIFIED",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          return <div>{formatDate(new Date(row.modifiedOn))}</div>;
        },
        width: 200,
      },
    ];

    return columns;
  };
  const columns = React.useMemo(() => generateColumns(), []);

  const snTransExistingData = transExistingData.map(
    (row: IForecastParametersDetail, i: number) => ({
      sn: i + 1,
      ...row,
    })
  );
  const tableRows = React.useRef<IForecastParametersDetail[]>(
    snTransExistingData
  );
  const rows = tableRows.current;

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  return (
    <div className={classes.rootExistingData}>
      {showChart && (
        <div className={classes.chart}>
          <DoughnutChart data={chartData} />
        </div>
      )}
      <div className={classes.table}>
        <ApexGrid<IForecastParametersDetail, ITableButtonsProps>
          columns={columns}
          rows={rows}
          tableButtons={tableButtons}
          newTableRowHeight={35}
        />
      </div>
    </div>
  );
}
