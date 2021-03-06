import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Typography, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { CSSProperties } from "react";
import { Column } from "react-data-griddex";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import Author from "../../Application/Components/Author/Author";
import apexGridCheckbox from "../../Application/Components/Checkboxes/ApexGridCheckbox";
import ApexGridMoreActionsContextMenu from "../../Application/Components/ContextMenus/ApexGridMoreActionsContextMenu";
import DialogOneCancelButtons from "../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import { IApexEditorRow } from "../../Application/Components/Editors/ApexEditor";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../Application/Components/Export/ExcelExportTable";
import MoreActionsPopover from "../../Application/Components/Popovers/MoreActionsPopover";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import ApexGrid from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ISize } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { TReducer } from "../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../Application/Redux/Actions/ActionTypes";
import {
  deleteDataByIdRequestAction,
  updateDataByIdRequestAction,
} from "../../Application/Redux/Actions/ApplicationActions";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { getBaseForecastUrl } from "../../Application/Services/BaseUrlService";
import { getDisabledStyle } from "../../Application/Styles/disabledStyles";
import { IStoredDataProps } from "../../Application/Types/ApplicationTypes";
import formatDate from "../../Application/Utils/FormatDate";
import generateDoughnutAnalyticsData from "../../Application/Utils/GenerateDoughnutAnalyticsData";
import { confirmationDialogParameters } from "../../Application/Components/DialogParameters/ConfirmationDialogParameters";
import { DoughnutChartAnalytics } from "../../Visualytics/Components/Charts/DoughnutChart";
import { extrudeForecastParametersDPs } from "../Components/DialogParameters/EditForecastParametersDialogParameters";
import { IForecastParametersStoredRow } from "../Components/Dialogs/StoredNetworksDialogTypes";
import DeclineParametersType from "../Components/Indicators/DeclineParametersType";
import {
  fetchStoredForecastingParametersRequestAction,
  getDeclineParametersByIdRequestAction,
  getProductionPrioritizationByIdRequestAction,
  updateNetworkParameterAction,
  updateNetworkParametersAction,
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
  author: {
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

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const selectedForecastInputDeckIdSelector = createDeepEqualSelector(
  (state: RootState) => state.inputReducer.selectedForecastInputDeckId,
  (id) => id
);
const selectedForecastInputDeckTitleSelector = createDeepEqualSelector(
  (state: RootState) => state.inputReducer.selectedForecastInputDeckTitle,
  (id) => id
);
const currentProjectIdSelector = createDeepEqualSelector(
  (state: RootState) => state.projectReducer.currentProjectId,
  (id) => id
);
const dayFormatSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer.dayFormat,
  (data) => data
);
const monthFormatSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer.monthFormat,
  (data) => data
);
const yearFormatSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer.yearFormat,
  (data) => data
);
const selectedNetworkIdSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.selectedNetworkId,
  (data) => data
);

const wc = "storedDataWorkflows";

const networkStoredSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer[wc]["networkStored"],
  (data) => data
);
const forecastingParametersStoredSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer[wc]["forecastingParametersStored"],
  (data) => data
);

export default function StoredForecastingParameters({
  showChart,
  isAllForecastParameters,
  allWorkflowProcesses,
}: IStoredDataProps) {
  console.log(
    "???? ~ file: StoredForecastingParameters.tsx ~ line 153 ~ allWorkflowProcesses",
    allWorkflowProcesses
  );
  const reducer = "networkReducer";
  const mainUrl = `${getBaseForecastUrl()}/forecast-parameters`;

  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const componentRef = React.useRef();

  const currentProjectId = useSelector(currentProjectIdSelector);
  const selectedForecastInputDeckTitle = useSelector(
    selectedForecastInputDeckTitleSelector
  );
  const selectedForecastInputDeckId = useSelector(
    selectedForecastInputDeckIdSelector
  );
  const dayFormat = useSelector(dayFormatSelector);
  const monthFormat = useSelector(monthFormatSelector);
  const yearFormat = useSelector(yearFormatSelector);
  const selectedNetworkId = useSelector(selectedNetworkIdSelector);
  console.log(
    "???? ~ file: StoredForecastingParameters.tsx ~ line 171 ~ selectedNetworkId",
    selectedNetworkId
  );
  const networkStored = useSelector(networkStoredSelector);
  console.log(
    "???? ~ file: StoredForecastingParameters.tsx ~ line 173 ~ networkStored",
    networkStored
  );
  const forecastingParametersStored = useSelector(
    forecastingParametersStoredSelector
  );
  console.log(
    "???? ~ file: StoredForecastingParameters.tsx ~ line 177 ~ forecastingParametersStored",
    forecastingParametersStored
  );

  const [selectedRows, setSelectedRows] = React.useState(new Set<React.Key>());
  const [sRow, setSRow] = React.useState(-1);

  let forecastingParametersFiltered: any = [];
  const isForecastRun = allWorkflowProcesses === "runForecastWorkflow";
  if (isForecastRun) {
    const selectedNetwork = networkStored.find((row: any) => {
      if (row.id == selectedNetworkId) return row;
    });

    if (isAllForecastParameters == true) {
      forecastingParametersFiltered = forecastingParametersStored;
    } else {
      if (selectedNetwork != undefined) {
        forecastingParametersFiltered = forecastingParametersStored.filter(
          (row: any) => {
            if (row.forecastInputDeckId == selectedNetwork.forecastInputDeckId)
              return row;
          }
        );
      } else {
        forecastingParametersFiltered = forecastingParametersStored;
      }
    }
  } else {
    forecastingParametersFiltered = forecastingParametersStored;
  }

  const snTransStoredData = React.useMemo(
    () =>
      storedToForecastingParameters(
        forecastingParametersFiltered,
        dayFormat,
        monthFormat,
        yearFormat
      ),
    [selectedForecastInputDeckTitle]
  );

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

  const fetchStoredRequestAction = () =>
    fetchStoredForecastingParametersRequestAction(currentProjectId);

  const updateTableActionConfirmation =
    (id: string) => (titleDesc: Record<string, string>) => {
      const updateDataUrl = `${mainUrl}/${id}`;

      const confirmationDialogParameters: DialogStuff = {
        name: "Update_Data_Dialog_Confirmation",
        title: `Update Confirmation`,
        type: "textDialog",
        show: true,
        exclusive: false,
        maxWidth: "xs",
        dialogText: `Do you want to proceed with this update?`,
        iconType: "confirmation",
        actionsList: () =>
          DialogOneCancelButtons(
            [true, true],
            [true, true],
            [
              unloadDialogsAction,
              () =>
                updateDataByIdRequestAction(
                  reducer as TReducer,
                  updateDataUrl as string,
                  titleDesc,
                  fetchStoredRequestAction as () => IAction
                ),
            ],
            "Update",
            "updateOutlined",
            false,
            "All"
          ),
        dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      };

      dispatch(showDialogAction(confirmationDialogParameters));
    };

  const dividerPositions = [50];
  const isCustomComponent = false;

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
          const currentRow = row;

          const title = row.title as string;
          const id = row.forecastingParametersId as string;
          const deleteUrl = `${mainUrl}/${id}`;

          const editorData = [
            {
              name: "title",
              title: "Title",
              value: (row as IForecastParametersStoredRow)["title"],
              editorType: "input",
              width: "100%",
            },
            {
              name: "description",
              title: "Description",
              value: (row as IForecastParametersStoredRow)["description"],
              editorType: "textArea",
              width: "100%",
              height: "100%",
            },
          ] as IApexEditorRow[];

          const importMoreActionsData = [
            {
              id,
              title: "Clone",
              dataTitle: title,
              action: () => {
                const currentRow = rows[currentSN - 1];
                const clonedRow = forecastingParametersToStored(
                  currentRow,
                  rows.length
                );

                const newRows = [...forecastingParametersStored, clonedRow];

                setRows(newRows);
                dispatch(
                  updateNetworkParameterAction(
                    "storedDataWorkflows.forecastingParametersStored",
                    newRows
                  )
                );
              },
            },
            {
              id,
              title: "Modify",
              dataTitle: title,
              action: () => {
                dispatch(
                  showDialogAction(
                    extrudeForecastParametersDPs(
                      "Modify Forecast Parameters",
                      currentRow,
                      currentSN - 1,
                      "editForecastingParametersWorkflow",
                      "edit"
                    )
                  )
                );

                dispatch(
                  updateNetworkParametersAction({
                    selectedDeclineParametersId:
                      currentRow?.wellDeclineParameterId,
                    selectedDeclineParametersTitle:
                      currentRow?.wellDeclineParameterTitle,
                    selectedProductionPrioritizationId:
                      currentRow?.wellPrioritizationId,
                    selectedProductionPrioritizationTitle:
                      currentRow?.wellPrioritizationTitle,
                    selectedForecastingParametersId:
                      row.forecastingParametersId,
                  })
                );
              },
            },
          ];

          const style =
            title.toLowerCase() === "default" ? getDisabledStyle(theme) : {};

          return (
            <ApexFlexContainer>
              <EditOutlinedIcon
                style={style as CSSProperties}
                onClick={() => {
                  const dialogParameters: DialogStuff = {
                    name: "Edit_Table_Dialog",
                    title: "Edit Table",
                    type: "tableEditorDialog",
                    show: true,
                    exclusive: false,
                    maxWidth: isCustomComponent ? "lg" : "sm",
                    iconType: "edit",
                    isCustomComponent,
                    apexEditorProps: {
                      editorData,
                      editedRow: currentRow,
                      dividerPositions,
                    },
                    actionsList: (titleDesc: Record<string, string>) =>
                      DialogOneCancelButtons(
                        [true, true],
                        [true, false],
                        [
                          unloadDialogsAction,
                          () => updateTableActionConfirmation(id)(titleDesc),
                        ],
                        "Update",
                        "updateOutlined",
                        false,
                        "None"
                      ),
                  };

                  dispatch(showDialogAction(dialogParameters));
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
                            reducer as TReducer,
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

              {!isForecastRun && (
                <ApexGridMoreActionsContextMenu
                  component={MoreActionsPopover}
                  data={importMoreActionsData}
                >
                  <MenuOpenOutlinedIcon />
                </ApexGridMoreActionsContextMenu>
              )}
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
                  console.log(
                    "currentRow DCA from Forecast Parameter: ",
                    currentRow
                  );
                  const wellDeclineParamtersId =
                    currentRow.wellDeclineParameterId;
                  const wellDeclineParamtersTitle =
                    currentRow.wellDeclineParameterTitle;
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
        formatter: ({ row }) => {
          return (
            <ApexFlexContainer
              moreStyles={{ backgroundColor: theme.palette.primary.light }}
            >
              {row.startForecast}
            </ApexFlexContainer>
          );
        },
        width: 200,
      },
      {
        key: "endForecast",
        name: "END FORECAST",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          return (
            <ApexFlexContainer
              moreStyles={{ backgroundColor: theme.palette.success.light }}
            >
              {row.endForecast}
            </ApexFlexContainer>
          );
        },
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

  const columns = React.useMemo(() => generateColumns(), []);
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
    fileName: "storedForecastingParametersTemplate",
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
        <ExcelExportTable<IForecastParametersStoredRow> {...exportTableProps} />
      </div>
    ),
    componentRef,
  };

  const chartData = React.useRef(generateDoughnutAnalyticsData(rows, "title"));
  const fpdStoredStr = forecastingParametersStored
    .map((row: any) => row["forecastInputdeckTitle"])
    .join();

  React.useEffect(() => {
    const updatedStoredData = storedToForecastingParameters(
      forecastingParametersFiltered,
      dayFormat,
      monthFormat,
      yearFormat
    );

    setRows(updatedStoredData);
  }, [fpdStoredStr]);

  const getApexGridProps = (size: ISize) => ({
    columns: columns,
    rows: rows,
    tableButtons: tableButtons,
    newTableRowHeight: 35,
    selectedRows: selectedRows,
    setSelectedRows: setSelectedRows,
    selectedRow: sRow,
    onSelectedRowChange: setSRow,
    onRowsChange: setRows,
    size: size,
    autoAdjustTableDim: true,
    showTableHeader: true,
    showTablePagination: true,
  });

  return (
    <div className={classes.rootStoredData}>
      {showChart && (
        <div className={classes.chart}>
          <DoughnutChartAnalytics
            data={chartData.current}
            willUseThemeColor={false}
          />
        </div>
      )}
      <div className={classes.table}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => <ApexGrid apexGridProps={getApexGridProps(size)} />}
        </SizeMe>
      </div>
    </div>
  );
}
