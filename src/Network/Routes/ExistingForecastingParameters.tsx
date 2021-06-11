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
import apexGridCheckbox from "../../Application/Components/Checkboxes/ApexGridCheckbox";
import ApexGridMoreActionsContextMenu from "../../Application/Components/ContextMenus/ApexGridMoreActionsContextMenu";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import { ApexGrid } from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { showDialogAction } from "../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { IExistingDataProps } from "../../Application/Types/ApplicationTypes";
import ForecastParametersMoreActionsPopover from "../../Forecast/Components/Popovers/ForecastParametersMoreActionsPopover";
import { IUnitSettingsData } from "../../Settings/Redux/State/UnitSettingsStateTypes";
import DoughnutChart from "../../Visualytics/Components/Charts/DoughnutChart";
import { deleteDialogParameters } from "../Components/DialogParameters/DeleteForecastParametersDialogParameters";
import { extrudeDialogParameters } from "../Components/DialogParameters/ShowDeclineCurveDialogParameters";
import { extrudeForecastParametersDPs } from "../Components/DialogParameters/EditForecastParametersDialogParameters";
import {
  IBackendForecastingParametersRow,
  IForecastParametersExistingRow,
} from "../Components/Dialogs/ExistingNetworksDialogTypes";
import DeclineParametersType from "../Components/Indicators/DeclineParametersType";
import CreateNewForecastParametersButton from "../Components/Menus/CreateNewForecastParametersButton";
import { updateNetworkParameterAction } from "../Redux/Actions/NetworkActions";
import formatDate from "./../../Application/Utils/FormatDate";
import OtherForecastingParameters from "./OtherForecastingParameters";

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
  dcaOrPrtznTable: {
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
  const wp = "forecastingParametersExisting";

  const { dayFormat, monthFormat, yearFormat } = useSelector(
    (state: RootState) => state.unitSettingsReducer
  ) as IUnitSettingsData;

  const existingData = useSelector(
    (state: RootState) => state.networkReducer[wc][wp]
  ) as IBackendForecastingParametersRow[];

  const transExistingData = existingData.map(
    (row: IBackendForecastingParametersRow) => {
      const {
        forecastingParametersId,
        forecastInputDeckId,
        forecastInputdeckTitle,
        title,
        description,
        type,
        createdAt,
        wellPrioritizationTitle,
        wellDeclineParameterTitle,
        parametersEntity,
      } = row;

      const {
        timeFrequency,
        targetFluid,
        isDefered,
        startDay,
        startMonth,
        startYear,
        stopDay,
        stopMonth,
        stopYear,
      } = parametersEntity;

      return {
        forecastingParametersId,
        forecastInputDeckId,
        forecastInputdeckTitle,
        title,
        description,
        type,
        wellDeclineParameterTitle,
        wellPrioritizationTitle,
        targetFluid,
        timeFrequency,
        isDefered: isDefered === 0 ? "No Deferment" : "Add Deferment",
        realtimeResults: "Yes",
        startForecast: formatDate(
          new Date(startYear, startMonth, startDay),
          dayFormat,
          monthFormat,
          yearFormat
        ),
        endForecast: formatDate(
          new Date(stopYear, stopMonth, stopDay),
          dayFormat,
          monthFormat,
          yearFormat
        ),
        author: { avatarUrl: "", name: "None" },
        createdOn: createdAt,
        modifiedOn: createdAt,
      };
    }
  ) as IForecastParametersExistingRow[];

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => <CreateNewForecastParametersButton />,
  };

  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const handleCheckboxChange = (row: IForecastParametersExistingRow) => {
    const name = "selectedForecastingParametersId";
    const value = row.forecastingParametersId;

    dispatch(updateNetworkParameterAction(name, value));
    setCheckboxSelected(!checkboxSelected);
  };

  const ApexGridCheckboxColumn = apexGridCheckbox({
    shouldExecute: true,
    shouldDispatch: false,
    apexGridCheckboxFxn: handleCheckboxChange,
  });

  const generateColumns = () => {
    const columns: Column<IForecastParametersExistingRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      ApexGridCheckboxColumn,
      {
        key: "actions",
        name: "ACTIONS",
        editable: false,
        formatter: ({ row }) => {
          const { sn } = row;
          const currentSN = sn as number;

          const importMoreActionsData = [
            {
              title: "Clone",
              action: () => {
                const currentRow = rows[currentSN - 1];
                const clonedRow = {
                  ...currentRow,
                  title: "New Title",
                  type: "User",
                } as IForecastParametersExistingRow;

                setRows(rows.concat(clonedRow));
              },
            },
          ];

          return (
            <ApexFlexContainer>
              <EditOutlinedIcon
                onClick={() => {
                  dispatch(
                    showDialogAction(
                      extrudeForecastParametersDPs(
                        currentSN - 1,
                        OtherForecastingParameters
                      )
                    )
                  );
                }}
              />
              <DeleteOutlinedIcon
                onClick={() => {
                  dispatch(
                    showDialogAction(
                      deleteDialogParameters(currentSN - 1, () =>
                        alert("Deleted")
                      )
                    )
                  );
                }}
              />
              <ApexGridMoreActionsContextMenu
                component={ForecastParametersMoreActionsPopover}
                data={importMoreActionsData}
              >
                <MenuOpenOutlinedIcon />
              </ApexGridMoreActionsContextMenu>
            </ApexFlexContainer>
          );
        },
        width: 120,
      },
      {
        key: "title",
        name: "FORECAST PARAMETERS TITLE",
        editable: false,
        resizable: true,
        width: 300,
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
        key: "forecastInputdeckTitle",
        name: "FORECAST INPUTDECK TITLE",
        editable: false,
        resizable: true,
        width: 300,
      },
      {
        key: "dcaParameters",
        name: "DCA TABLE",
        editable: false,
        resizable: true,
        width: 120,
        formatter: ({ row }) => {
          const { sn, wellDeclineParameterTitle } = row;
          const selectedRowIndex = (sn as number) - 1;

          return (
            <div className={classes.dcaOrPrtznTable}>
              <Typography>{wellDeclineParameterTitle}</Typography>
              <VisibilityOutlinedIcon
                className={classes.visibilityOutlinedIcon}
                onClick={() => {
                  dispatch(
                    showDialogAction(extrudeDialogParameters(selectedRowIndex))
                  );
                  dispatch(
                    updateNetworkParameterAction(
                      "selectedForecastingParametersId",
                      row.forecastingParametersId
                    )
                  );
                }}
              />
            </div>
          );
        },
      },
      {
        key: "targetFluid",
        name: "PRIORITIZATION",
        editable: false,
        resizable: true,
        width: 150,
        formatter: ({ row }) => {
          const { sn, wellPrioritizationTitle } = row;
          const selectedRowIndex = (sn as number) - 1;

          return (
            <div className={classes.dcaOrPrtznTable}>
              <Typography>{wellPrioritizationTitle}</Typography>
              <VisibilityOutlinedIcon
                className={classes.visibilityOutlinedIcon}
                onClick={() => {
                  dispatch(
                    showDialogAction(extrudeDialogParameters(selectedRowIndex))
                  );
                  dispatch(
                    updateNetworkParameterAction(
                      "selectedForecastingParametersId",
                      row.forecastingParametersId
                    )
                  );
                }}
              />
            </div>
          );
        },
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
        key: "startForecast",
        name: "START FORECAST",
        editable: false,
        resizable: true,
        width: 200,
      },
      {
        key: "endForecast",
        name: "END FORECAST",
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
          return (
            <div>
              {formatDate(
                new Date(row.createdOn),
                dayFormat,
                monthFormat,
                yearFormat
              )}
            </div>
          );
        },
        width: 200,
      },
      {
        key: "modifiedOn",
        name: "MODIFIED",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          return (
            <div>
              {formatDate(
                new Date(row.modifiedOn),
                dayFormat,
                monthFormat,
                yearFormat
              )}
            </div>
          );
        },
        width: 200,
      },
    ];

    return columns;
  };
  const columns = React.useMemo(() => generateColumns(), [generateColumns]);

  const snTransExistingData = transExistingData.map((row, i) => ({
    sn: i + 1,
    ...row,
  })) as IForecastParametersExistingRow[];

  const [rows, setRows] = React.useState(snTransExistingData);

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
          <DoughnutChart data={chartData} willUseThemeColor={false} />
        </div>
      )}
      <div className={classes.table}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => (
            <ApexGrid<IForecastParametersExistingRow, ITableButtonsProps>
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
              autoAdjustTableDim={true}
              showTableHeader={true}
              showTablePagination={true}
            />
          )}
        </SizeMe>
      </div>
    </div>
  );
}
