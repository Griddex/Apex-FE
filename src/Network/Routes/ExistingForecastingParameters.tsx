import { Checkbox, makeStyles, Typography } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import Author from "../../Application/Components/Author/Author";
import apexCheckbox from "../../Application/Components/Checkboxes/ApexCheckbox";
import { ApexGrid } from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { showDialogAction } from "../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { IExistingDataProps } from "../../Application/Types/ApplicationTypes";
import DoughnutChart from "../../Visualytics/Components/DoughnutChart";
import { deleteDialogParameters } from "../Components/DialogParameters/DeleteForecastParametersDialogParameters";
import { extrudeDialogParameters } from "../Components/DialogParameters/ShowDeclineCurveDialogParameters";
import {
  IForecastingParametersGroup,
  IForecastingParametersRow,
  IForecastParametersRoot,
} from "../Components/Dialogs/ExistingNetworksDialogTypes";
import DeclineParametersType from "../Components/Indicators/DeclineParametersType";
import NewForecastParametersButton from "../Components/Menus/NewForecastParametersButton";
import { updateNetworkParameterAction } from "../Redux/Actions/NetworkActions";
import formatDate from "./../../Application/Utils/FormatDate";

const useStyles = makeStyles((theme) => ({
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
  dcaTable: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
  },
  visibilityOutlinedIcon: {
    "&:hover": {
      color: theme.palette.primary.main,
    },
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
}: IExistingDataProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = React.useState(new Set<React.Key>());
  const [sRow, setSRow] = React.useState(-1);

  const wc = "existingDataWorkflows";
  const wp = "forecastingParametersServer";

  const existingData = useSelector(
    (state: RootState) => state.networkReducer[wc][wp]
  ) as IForecastParametersRoot[];

  const transExistingData = existingData.map((row: IForecastParametersRoot) => {
    const {
      id,
      forecastInputDeckId,
      forecastInputdeckTitle,
      forecastingParametersGroupList,
    } = row;

    const arrExistingData = forecastingParametersGroupList.map(
      (row: IForecastingParametersGroup) => {
        const {
          _id,
          title,
          description,
          type,
          createdAt,
          declineParameters,
          parametersEntity,
        } = row;

        const {
          timeFrequency,
          targetFluid,
          isDefered,
          stopDay,
          stopMonth,
          stopYear,
        } = parametersEntity;

        return {
          forecastingParametersRootId: id,
          forecastingParametersGroupId: _id,
          forecastInputDeckId,
          forecastInputDeckTitle: forecastInputdeckTitle,
          declineParameters,
          type,
          title,
          description,
          targetFluid,
          timeFrequency,
          // isDefered: isDefered === 0 ? "No Deferment" : "Add Deferment", //Referred, Realtime not yet
          isDefered, //Referred, Realtime not yet
          realtimeResults: "Yes",
          endForecast: formatDate(new Date(stopYear, stopMonth, stopDay)),
          author: { avatarUrl: "", name: "" },
          createdOn: createdAt,
          modifiedOn: createdAt,
        };
      }
    );

    return arrExistingData;
  });

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => <NewForecastParametersButton />,
  };

  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const handleCheckboxChange = (row: IForecastingParametersRow) => {
    const name = "selectedForecastingParametersId";
    const value = row.forecastingParametersGroupId;

    dispatch(updateNetworkParameterAction(name, value));
    setCheckboxSelected(!checkboxSelected);
  };

  const ApexCheckboxColumn = apexCheckbox({
    shouldExecute: true,
    shouldDispatch: false,
    apexCheckboxAction: handleCheckboxChange,
  });

  const generateColumns = () => {
    const columns: Column<IForecastingParametersRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      ApexCheckboxColumn,
      {
        key: "actions",
        name: "ACTIONS",
        editable: false,
        formatter: ({ row }) => {
          const { sn } = row;
          const selectedRowIndex = (sn as number) - 1;

          return (
            <div
              style={{
                display: "flex",
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <EditOutlinedIcon
                onClick={() => {
                  // alert(`Edit Row is:${row}`);
                  dispatch(
                    showDialogAction(extrudeDialogParameters(selectedRowIndex))
                  );
                }}
              />
              <DeleteOutlinedIcon
                onClick={() => {
                  dispatch(
                    showDialogAction(deleteDialogParameters(selectedRowIndex))
                  );
                }}
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
            <div className={classes.dcaTable}>
              <VisibilityOutlinedIcon
                className={classes.visibilityOutlinedIcon}
                onClick={() => {
                  dispatch(
                    showDialogAction(extrudeDialogParameters(selectedRowIndex))
                  );
                  dispatch(
                    updateNetworkParameterAction(
                      "selectedForecastingParametersRootId",
                      row.forecastingParametersRootId
                    )
                  );
                }}
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
        key: "forecastInputDeckTitle",
        name: "FORECAST INPUTDECK TITLE",
        editable: false,
        resizable: true,
        width: 300,
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
  const columns = React.useMemo(() => generateColumns(), [generateColumns]);

  const snTransExistingData: IForecastingParametersRow[] = [];
  let i = 0;
  for (const forecastParametersTable of transExistingData) {
    for (const row of forecastParametersTable) {
      const {
        title,
        description,
        forecastingParametersRootId,
        forecastingParametersGroupId,
        forecastInputDeckId,
        forecastInputDeckTitle,
        declineParameters,
        targetFluid,
        timeFrequency,
        isDefered,
        endForecast,
        type,
        author,
        createdOn,
        modifiedOn,
      } = row;

      snTransExistingData.push({
        sn: i + 1,
        title,
        description,
        forecastingParametersRootId,
        forecastingParametersGroupId,
        forecastInputDeckId,
        forecastInputDeckTitle,
        declineParameters,
        targetFluid,
        timeFrequency,
        isDefered,
        endForecast,
        type,
        author,
        createdOn,
        modifiedOn,
      });

      i = i + 1;
    }
  }

  const tableRows = React.useRef<IForecastingParametersRow[]>(
    snTransExistingData
  );
  const currentRows = tableRows.current;
  const [rows, setRows] = React.useState(currentRows);

  React.useEffect(() => {
    dispatch(
      updateNetworkParameterAction("forecastingParametersExisting", rows)
    );
    dispatch(hideSpinnerAction());
  }, [dispatch, rows]);

  return (
    <div className={classes.rootExistingData}>
      {showChart && (
        <div className={classes.chart}>
          <DoughnutChart data={chartData} />
        </div>
      )}
      <div className={classes.table}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => (
            <ApexGrid<IForecastingParametersRow, ITableButtonsProps>
              columns={columns}
              rows={rows}
              tableButtons={tableButtons}
              newTableRowHeight={35}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              selectedRow={sRow}
              onSelectedRowChange={setSRow}
              onRowsChange={setRows}
              size={size}
            />
          )}
        </SizeMe>
      </div>
    </div>
  );
}
