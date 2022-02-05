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
import { confirmationDialogParameters } from "../../Import/Components/DialogParameters/ConfirmationDialogParameters";
import { DoughnutChartAnalytics } from "../../Visualytics/Components/Charts/DoughnutChart";
import { extrudeForecastParametersDPs } from "../Components/DialogParameters/EditForecastParametersDialogParameters";
import { IForecastParametersStoredRow } from "../Components/Dialogs/StoredNetworksDialogTypes";
import DeclineParametersType from "../Components/Indicators/DeclineParametersType";
import CreateForecastParametersButton from "../Components/Menus/CreateForecastParametersButton";
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
}: IStoredDataProps) {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const componentRef = React.useRef();

  const currentProjectId = useSelector(currentProjectIdSelector);

  const { selectedForecastInputDeckId, selectedForecastInputDeckTitle } =
    useSelector((state: RootState) => state.inputReducer);

  const reducer = "networkReducer";
  const mainUrl = `${getBaseForecastUrl()}/forecast-parameters`;

  const [selectedRows, setSelectedRows] = React.useState(new Set<React.Key>());
  const [sRow, setSRow] = React.useState(-1);

  const dayFormat = useSelector(dayFormatSelector);
  const monthFormat = useSelector(monthFormatSelector);
  const yearFormat = useSelector(yearFormatSelector);

  const selectedNetworkId = useSelector(selectedNetworkIdSelector);

  const networkStored = useSelector(networkStoredSelector);

  const forecastingParametersStored = useSelector(
    forecastingParametersStoredSelector
  );

  const selectedNetwork = networkStored.find((row: any) => {
    if (row.id == selectedNetworkId) {
      return row;
    }
  });

  let forecastingParametersFiltered: any = [];

  if (isAllForecastParameters == true) {
    forecastingParametersFiltered = forecastingParametersStored.map(
      (row: any) => {
        return row;
      }
    );
  } else {
    forecastingParametersFiltered = forecastingParametersStored.filter(
      (row: any) => {
        if (selectedNetwork != undefined) {
          if (row.forecastInputDeckId == selectedNetwork.forecastInputDeckId) {
            return row;
          }
        }
      }
    );
  }

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
          const currentRow = rows[currentSN - 1];

          const title = row.title as string;
          const id = row.forecastingParametersId as string;
          const deleteUrl = `${mainUrl}/${id}`;

          const editedRow = rows[currentSN - 1];
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
              title: "Clone",
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
              title: "Modify",
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
                      currentRow.wellDeclineParameterId,
                    selectedDeclineParametersTitle:
                      currentRow.wellDeclineParameterTitle,
                    selectedProductionPrioritizationId:
                      currentRow.wellPrioritizationId,
                    selectedProductionPrioritizationTitle:
                      currentRow.wellPrioritizationTitle,
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
                      editedRow,
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
              <ApexGridMoreActionsContextMenu
                component={MoreActionsPopover}
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
        <CreateForecastParametersButton
          currentRow={newRow}
          forecastParametersIndex={snTransStoredData.length}
        />
        <ExcelExportTable<IForecastParametersStoredRow> {...exportTableProps} />
      </div>
    ),
    componentRef,
  };

  const chartData = React.useRef(generateDoughnutAnalyticsData(rows, "title"));

  React.useEffect(() => {
    const updatedStoredData = storedToForecastingParameters(
      forecastingParametersFiltered,
      dayFormat,
      monthFormat,
      yearFormat
    );

    setRows(updatedStoredData);
  }, [JSON.stringify(forecastingParametersStored)]);

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
