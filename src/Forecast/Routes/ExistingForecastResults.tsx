import { ClickAwayListener, makeStyles, useTheme } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import TableChartOutlinedIcon from "@material-ui/icons/TableChartOutlined";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SizeMe } from "react-sizeme";
import Approval from "../../Application/Components/Approval/Approval";
import Author from "../../Application/Components/Author/Author";
import BaseButtons from "../../Application/Components/BaseButtons/BaseButtons";
import apexGridCheckbox from "../../Application/Components/Checkboxes/ApexGridCheckbox";
import Saved from "../../Application/Components/Saved/Saved";
import { ApexGrid } from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { persistSelectedIdTitleAction } from "../../Application/Redux/Actions/ApplicationActions";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import {
  IApplicationExistingForecastResultsRow,
  IExistingDataProps,
} from "../../Application/Types/ApplicationTypes";
import formatDate from "../../Application/Utils/FormatDate";
import { updateNetworkParameterAction } from "../../Network/Redux/Actions/NetworkActions";
import { IUnitSettingsData } from "../../Settings/Redux/State/UnitSettingsStateTypes";
import DoughnutChart from "../../Visualytics/Components/Charts/DoughnutChart";
import {
  fetchTreeviewKeysRequestAction,
  getForecastDataByIdRequestAction,
  runForecastAggregationRequestAction,
  updateForecastResultsParameterAction,
} from "../Redux/Actions/ForecastActions";
import { IExistingForecastResultsRow } from "../Redux/ForecastState/ForecastStateTypes";

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

export default function ExistingForecastResults({
  showChart,
  showBaseButtons,
  shouldRunAggregation,
}: IExistingDataProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();

  const wc = "existingDataWorkflows";
  const wp = "forecastResultsExisting";

  const chartData = [
    { name: "Group A", value: 2400, color: theme.palette.primary.main },
    { name: "Group B", value: 4567, color: theme.palette.success.main },
    { name: "Group C", value: 1398, color: theme.palette.secondary.main },
  ];

  const { dayFormat, monthFormat, yearFormat } = useSelector(
    (state: RootState) => state.unitSettingsReducer
  ) as IUnitSettingsData;

  const existingData = useSelector(
    (state: RootState) => state.forecastReducer[wc][wp]
  ) as IApplicationExistingForecastResultsRow[];

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const handleCheckboxChange = (row: IExistingForecastResultsRow) => {
    const id = row.forecastResultsId as string;
    const title = row.forecastResultsTitle as string;
    const saved = row.saved as string;
    const isSaved = saved === "Saved" ? true : false;
    const networkId = row.networkId as string;

    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("forecastReducer", {
          selectedForecastingResultsId: id,
          selectedForecastingResultsTitle: title,
        })
      );

    dispatch(
      updateForecastResultsParameterAction("isForecastResultsSaved", isSaved)
    );
    dispatch(updateNetworkParameterAction("selectedNetworkId", networkId));

    if (shouldRunAggregation)
      dispatch(
        runForecastAggregationRequestAction(
          "economicsCostsRevenuesDeckApexForecast"
        )
      );

    setCheckboxSelected(!checkboxSelected);
  };

  const [selectedRows, setSelectedRows] = React.useState(
    () => new Set<React.Key>()
  );

  const ApexGridCheckboxColumn = apexGridCheckbox({
    shouldExecute: true,
    shouldDispatch: false,
    apexGridCheckboxFxn: handleCheckboxChange,
  });

  const generateColumns = () => {
    const columns: Column<IExistingForecastResultsRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      ApexGridCheckboxColumn,
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
                  alert(`Edit Row is:${row}`);
                  // dispatch(
                  //   showDialogAction(extrudeDialogParameters(selectedRowIndex))
                  // );
                }}
              />
              <DeleteOutlinedIcon
                onClick={() => {
                  alert(`Edit Row is:${row}`);
                  // dispatch(
                  //   showDialogAction(deleteDialogParameters(selectedRowIndex))
                  // );
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
        key: "approval",
        name: "APPROVAL",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          return <Approval approvalText={row.status} />;
        },
        width: 100,
      },
      {
        key: "saved",
        name: "SAVED",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          return <Saved savedText={row.saved} />;
        },
        width: 100,
      },
      {
        key: "forecastResultsTitle",
        name: "FORECAST RESULTS TITLE",
        editable: false,
        resizable: true,
        width: 300,
      },
      {
        key: "forecastInputdeckTitle",
        name: "FORECAST INPUTDECK TITLE",
        editable: false,
        resizable: true,
        width: 300,
      },
      {
        key: "forecastParametersTitle",
        name: "FORECAST PARAMETERS TITLE",
        editable: false,
        resizable: true,
        width: 300,
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

  const snExistingData = existingData.map(
    (row: IApplicationExistingForecastResultsRow, i: number) => ({
      sn: i + 1,
      forecastResultsId: row.id,
      forecastResultsTitle: row.title,
      description: row.description,
      saved: row.saved,
      status: "Not Started",
      networkId: row.networkId,
      forecastInputdeckTitle: row.forecastInputdeckTitle,
      forecastParametersTitle: row.forecastingParametersGroupTitle,
      author: { avatarUrl: "", name: "None" },
      approvers: "---",
      createdOn: row.createdAt,
      modifiedOn: row.createdAt,
    })
  ) as IExistingForecastResultsRow[];

  const tableRows = React.useRef<IExistingForecastResultsRow[]>(snExistingData);
  const currentRows = tableRows.current;
  const [rows, setRows] = React.useState(currentRows);

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, [dispatch, rows]);

  const [sRow, setSRow] = React.useState(-1);

  return (
    <div className={classes.rootExistingData}>
      {showChart && (
        <div className={classes.chart}>
          <DoughnutChart data={chartData} willUseThemeColor={false} />
        </div>
      )}
      <ClickAwayListener onClickAway={() => setSRow && setSRow(-1)}>
        <div className={classes.table}>
          <SizeMe monitorHeight refreshRate={32}>
            {({ size }) => (
              <ApexGrid<IExistingForecastResultsRow, ITableButtonsProps>
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
      </ClickAwayListener>
      {showBaseButtons && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 4,
            width: 270,
          }}
        >
          <BaseButtons
            buttonTexts={["View Table", "Plot Chart"]}
            variants={["contained", "contained"]}
            colors={["secondary", "primary"]}
            startIcons={[
              <TableChartOutlinedIcon key={1} />,
              <InsertPhotoOutlinedIcon key={2} />,
            ]}
            disableds={[sRow === -1, sRow === -1]}
            shouldExecute={[true, true]}
            shouldDispatch={[false, false]}
            finalActions={[
              () => {
                dispatch(getForecastDataByIdRequestAction());
              },
              () => dispatch(fetchTreeviewKeysRequestAction()),
            ]}
          />
        </div>
      )}
    </div>
  );
}
