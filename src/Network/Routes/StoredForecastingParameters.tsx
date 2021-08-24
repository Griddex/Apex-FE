import { makeStyles, Typography, useTheme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
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
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../Application/Components/Export/ExcelExportTable";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import { ApexGrid } from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { ReducersType } from "../../Application/Components/Workflows/WorkflowTypes";
import { deleteDataByIdRequestAction } from "../../Application/Redux/Actions/ApplicationActions";
import { showDialogAction } from "../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import getBaseForecastUrl from "../../Application/Services/BaseUrlService";
import { IStoredDataProps } from "../../Application/Types/ApplicationTypes";
import formatDate from "../../Application/Utils/FormatDate";
import ForecastParametersMoreActionsPopover from "../../Forecast/Components/Popovers/ForecastParametersMoreActionsPopover";
import { confirmationDialogParameters } from "../../Import/Components/DialogParameters/ConfirmationDialogParameters";
import { IUnitSettingsData } from "../../Settings/Redux/State/UnitSettingsStateTypes";
import DoughnutChart from "../../Visualytics/Components/Charts/DoughnutChart";
import { extrudeForecastParametersDPs } from "../Components/DialogParameters/EditForecastParametersDialogParameters";
import { extrudeDialogParameters } from "../Components/DialogParameters/ShowPrioritizationDialogParameters";
import { IForecastParametersStoredRow } from "../Components/Dialogs/StoredNetworksDialogTypes";
import DeclineParametersType from "../Components/Indicators/DeclineParametersType";
import CreateForecastParametersButton from "../Components/Menus/CreateForecastParametersButton";
import {
  fetchStoredForecastingParametersRequestAction,
  getDeclineParametersByIdRequestAction,
  getProductionPrioritizationByIdRequestAction,
  updateNetworkParameterAction,
} from "../Redux/Actions/NetworkActions";
import {
  forecastingParametersToStored,
  storedToForecastingParameters,
} from "../Utils/TransformForecastingParameters";

const useStyles = makeStyles((theme) => ({
  rootStoredData: {
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
  { id: "Group A", value: 5, color: "red" },
  { id: "Group B", value: 8, color: "blue" },
  { id: "Group C", value: 2, color: "green" },
];

export default function StoredForecastingParameters({
  showChart, isAllForecastParameters
}: IStoredDataProps) {
  const { currentProjectId } = useSelector(
    (state: RootState) => state.projectReducer
  );

  const { selectedForecastInputDeckId, selectedForecastInputDeckTitle } =
    useSelector((state: RootState) => state.inputReducer);

  const reducer = "networkReducer";
  const mainUrl = `${getBaseForecastUrl()}/forecast-parameters`;

  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();

  const wc = "storedDataWorkflows";
  const wp = "forecastingParametersStored";

  const componentRef = React.useRef();

  const [selectedRows, setSelectedRows] = React.useState(new Set<React.Key>());
  const [sRow, setSRow] = React.useState(-1);

  const { dayFormat, monthFormat, yearFormat } = useSelector(
    (state: RootState) => state.unitSettingsReducer
  ) as IUnitSettingsData;

  const { selectedNetworkId } = useSelector(
    (state: RootState) => state.networkReducer
  );
  const { forecastingParametersStored, networkStored } = useSelector(
    (state: RootState) => state.networkReducer[wc]
  );
  console.log(
    "Logged output --> ~ file: StoredForecastingParameters.tsx ~ line 139 ~ forecastingParametersStored",
    forecastingParametersStored
  );

const selectedNetwork = networkStored.find((row:any) => {
  if(row.id == selectedNetworkId){
    return row;
  }
});

let forecastingParametersFiltered:any = [];

console.log("isAllForecastParameters: ", isAllForecastParameters);

if(isAllForecastParameters  == true){
  forecastingParametersFiltered = forecastingParametersStored.map((row:any) => {
    return row;
  });
}else{
  console.log("filter seen")
  forecastingParametersFiltered = forecastingParametersStored.filter((row:any) => {
    if(selectedNetwork  != undefined){
      if(row.forecastInputDeckId == selectedNetwork.forecastInputDeckId) {
        return row;
      }
    }
  });
}

console.log("forecastingParametersFiltered: ", forecastingParametersFiltered);

  const snTransStoredData = storedToForecastingParameters(
    forecastingParametersFiltered,
    dayFormat,
    monthFormat,
    yearFormat
  );


  const newRow = {
    forecastInputDeckId: selectedForecastInputDeckId,
    forecastInputdeckTitle: selectedForecastInputDeckTitle,
    title: "",
    description: "",
    type: "User",
    wellDeclineParameterId: "",
    wellPrioritizationId: "",
    wellDeclineParameterTitle: "",
    wellPrioritizationTitle: "",
    targetFluid: "",
    timeFrequency: "",
    isDefered: "",
    realtimeResults: "",
    startForecast: "", //TODO use selectedforecastid to retrieve from forecasting parameters array
    //but there's no forecastid at the moment
    endForecast: "",
  } as IForecastParametersStoredRow;

  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const handleCheckboxChange = (row: IForecastParametersStoredRow) => {
    dispatch(
      updateNetworkParameterAction(
        "selectedForecastingParametersId",
        row.forecastingParametersId
      )
    );

    dispatch(
      updateNetworkParameterAction(
        "selectedForecastingParametersTitle",
        row.title
      )
    );

    setCheckboxSelected(!checkboxSelected);
  };

  const ApexGridCheckboxColumn = apexGridCheckbox({
    shouldExecute: true,
    shouldDispatch: false,
    apexGridCheckboxFxn: handleCheckboxChange,
  });

  const generateColumns = () => {
    const columns: Column<IForecastParametersStoredRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      ApexGridCheckboxColumn,
      {
        key: "actions",
        name: "ACTIONS",
        editable: false,
        formatter: ({ row }) => {
          const { sn } = row;
          const currentSN = sn as number;
          const currentRow = rows[currentSN - 1];

          const title = row.title as string;
          const id = row.forecastingParametersId as string;
          const deleteUrl = `${mainUrl}/${id}`;

          const importMoreActionsData = [
            {
              title: "Clone",
              action: () => {
                const currentRow = rows[currentSN - 1];
                const clonedRow = forecastingParametersToStored(
                  currentRow,
                  rows.length
                );
                console.log(
                  "Logged output --> ~ file: StoredForecastingParameters.tsx ~ line 324 ~ generateColumns ~ clonedRow",
                  clonedRow
                );

                const newRows = [...forecastingParametersStored, clonedRow];
                dispatch(
                  updateNetworkParameterAction(
                    "storedDataWorkflows.forecastingParametersStored",
                    newRows
                  )
                );
              },
            },
          ];

          const style =
            title.toLowerCase() === "default"
              ? {
                  pointerEvents: "none",
                  color: theme.palette.grey[200],
                  backgroundColor: theme.palette.grey[400],
                }
              : {};

          return (
            <ApexFlexContainer>
              <EditOutlinedIcon
                style={style as CSSProperties}
                onClick={() => {
                  console.log("currentRow: ", currentRow);
                  dispatch(
                    showDialogAction(
                      extrudeForecastParametersDPs(
                        "Edit Forecast Parameters",
                        currentRow,
                        currentSN - 1,
                        "editForecastingParametersWorkflow"
                      )
                    )
                  );


                  dispatch(
                    updateNetworkParameterAction(
                      "selectedDeclineParametersId",
                      currentRow.wellDeclineParameterId
                    )
                  );

                  dispatch(
                    updateNetworkParameterAction(
                      "selectedDeclineParametersTitle",
                      currentRow.wellDeclineParameterTitle
                    )
                  );

                  dispatch(
                    updateNetworkParameterAction(
                      "selectedProductionPrioritizationId",
                      currentRow.wellPrioritizationId
                    )
                  );

                  dispatch(
                    updateNetworkParameterAction(
                      "selectedProductionPrioritizationTitle",
                      currentRow.wellPrioritizationTitle
                    )
                  );

                  dispatch(
                    updateNetworkParameterAction(
                      "selectedForecastingParametersId",
                      row.forecastingParametersId
                    )
                  );
                }}
              />
              <DeleteOutlinedIcon
                style={style as CSSProperties}
                onClick={() => {
                  dispatch(
                    showDialogAction(
                      confirmationDialogParameters(
                        "Delete_Table_Data_Dialog",
                        `Delete ${title}`,
                        "deleteDataDialog",
                        "",
                        false,
                        true,
                        () =>
                          deleteDataByIdRequestAction(
                            reducer as ReducersType,
                            deleteUrl as string,
                            title as string,
                            () =>
                              fetchStoredForecastingParametersRequestAction(
                                currentProjectId,
                                false
                              )
                          ),
                        "Delete",
                        "deleteOutlined",
                        "delete",
                        title
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
        key: "status",
        name: "STATUS",
        editable: false,
        resizable: true,
        width: 100,
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
          const { wellDeclineParameterTitle, sn } = row;
          const isCreateOrEdit = false;
          const currentSN = sn as number;
          const currentRow = row;

          return (
            <div className={classes.dcaOrPrtznTable}>
              <Typography>{wellDeclineParameterTitle}</Typography>
              <VisibilityOutlinedIcon
                className={classes.visibilityOutlinedIcon}
                onClick={() => {
                  console.log("currentRow DCA from Forecast Parameter: ", currentRow);
                  const wellDeclineParamtersId = currentRow.wellDeclineParameterId;
                  const wellDeclineParamtersTitle = currentRow.wellDeclineParameterTitle;
                  dispatch(
                    getDeclineParametersByIdRequestAction(
                      reducer,
                      isCreateOrEdit as boolean,
                      wellDeclineParamtersId as string,
                      wellDeclineParamtersTitle as string,
                      currentSN,
                      currentRow
                    )
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
          const { sn, wellPrioritizationId, wellPrioritizationTitle } = row;
          const selectedRowIndex = (sn as number) - 1;

          return (
            <div className={classes.dcaOrPrtznTable}>
              <Typography>{wellPrioritizationTitle}</Typography>
              <VisibilityOutlinedIcon
                className={classes.visibilityOutlinedIcon}
                onClick={() => {
                  dispatch(
                    getProductionPrioritizationByIdRequestAction(
                      wellPrioritizationId,
                      wellPrioritizationTitle,
                      selectedRowIndex,
                      reducer,
                      false as boolean
                    )
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
  const [rows, setRows] = React.useState(snTransStoredData);

  const exportColumns = columns
    .filter(
      (column) =>
        !["actions", "select_control_key"].includes(column.key.toLowerCase())
    )
    .map((column) => ({
      label: column.name,
      value: column.key,
    })) as IExcelSheetData<IForecastParametersStoredRow>["columns"];

  const exportTableProps = {
    fileName: "CostsAndRevenuesTemplate",
    tableData: {
      Template: {
        data: rows,
        columns: exportColumns,
      },
    },
  } as IExcelExportTable<IForecastParametersStoredRow>;

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <div>
        <CreateForecastParametersButton
          currentRow={newRow}
          forecastParametersIndex={snTransStoredData.length}
        />
        <ExcelExportTable<IForecastParametersStoredRow> {...exportTableProps} />
      </div>
    ),
    componentRef,
  };

  React.useEffect(() => {
    const updatedStoredData = storedToForecastingParameters(
      forecastingParametersFiltered,
      dayFormat,
      monthFormat,
      yearFormat
    );

    setRows(updatedStoredData);
  }, [forecastingParametersStored.length]);

  return (
    <div className={classes.rootStoredData}>
      {/* {showChart && (
        <div className={classes.chart}>
          <DoughnutChart data={chartData} willUseThemeColor={false} />
        </div>
      )} */}
      <div className={classes.table}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => (
            <ApexGrid<IForecastParametersStoredRow, ITableButtonsProps>
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
