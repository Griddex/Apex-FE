import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { ClickAwayListener, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import Approval from "../../Application/Components/Approval/Approval";
import Author from "../../Application/Components/Author/Author";
import BaseButtons from "../../Application/Components/BaseButtons/BaseButtons";
import apexGridCheckbox from "../../Application/Components/Checkboxes/ApexGridCheckbox";
import DialogOneCancelButtons from "../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import { IApexEditorRow } from "../../Application/Components/Editors/ApexEditor";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../Application/Components/Export/ExcelExportTable";
import Saved from "../../Application/Components/Saved/Saved";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import {
  TReducer,
  TAllWorkflowProcesses,
} from "../../Application/Components/Workflows/WorkflowTypes";
import {
  deleteDataByIdRequestAction,
  getTableDataByIdRequestAction,
  persistSelectedIdTitleAction,
  updateDataByIdRequestAction,
} from "../../Application/Redux/Actions/ApplicationActions";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { getBaseForecastUrl } from "../../Application/Services/BaseUrlService";
import {
  IApplicationStoredForecastResultsRow,
  IStoredDataProps,
} from "../../Application/Types/ApplicationTypes";
import formatDate from "../../Application/Utils/FormatDate";
import { runEconomicsForecastAggregationRequestAction } from "../../Economics/Redux/Actions/EconomicsActions";
import { confirmationDialogParameters } from "../../Import/Components/DialogParameters/ConfirmationDialogParameters";
import { updateNetworkParameterAction } from "../../Network/Redux/Actions/NetworkActions";
import { IUnitSettingsData } from "../../Settings/Redux/State/UnitSettingsStateTypes";
import { DoughnutChartAnalytics } from "../../Visualytics/Components/Charts/DoughnutChart";
import {
  fetchForecastTreeviewKeysRequestAction,
  fetchStoredForecastingResultsRequestAction,
  getForecastDataByIdRequestAction,
  updateForecastResultsParameterAction,
} from "../Redux/Actions/ForecastActions";
import { IStoredForecastResultsRow } from "../Redux/ForecastState/ForecastStateTypes";
import { IApexEditor } from "./../../Application/Components/Editors/ApexEditor";
import ApexGrid from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import generateDoughnutAnalyticsData from "../../Application/Utils/GenerateDoughnutAnalyticsData";
import { ISize } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { IAction } from "../../Application/Redux/Actions/ActionTypes";

//<IStoredForecastResultsRow, ITableButtonsProps>

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
const wc = "storedDataWorkflows";
const wp = "forecastResultsStored";

const forecastResultsStoredSelector = createDeepEqualSelector(
  (state: RootState) => state.forecastReducer[wc]["forecastResultsStored"],
  (stored) => stored
);

export default function StoredForecastResults({
  showChart,
  showBaseButtons,
  willFetchForecast,
  allWorkflowProcesses,
  collectionName,
}: IStoredDataProps) {
  const reducer = "forecastReducer";
  const mainUrl = `${getBaseForecastUrl()}`;

  const classes = useStyles();
  const dispatch = useDispatch();

  const currentProjectId = useSelector(currentProjectIdSelector);
  const dayFormat = useSelector(dayFormatSelector);
  const monthFormat = useSelector(monthFormatSelector);
  const yearFormat = useSelector(yearFormatSelector);

  const forecastResultsStored = useSelector(forecastResultsStoredSelector);

  const [storedforecastResults, setStoredforecastResults] = React.useState(
    forecastResultsStored
  );

  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const handleCheckboxChange = (row: IStoredForecastResultsRow) => {
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

    setCheckboxSelected(!checkboxSelected);
  };

  const [selectedRows, setSelectedRows] = React.useState(
    () => new Set<React.Key>()
  );

  const ApexGridCheckboxColumn = apexGridCheckbox({
    shouldExecute: true,
    shouldDispatch: false,
    apexGridCheckboxFxn: willFetchForecast
      ? (row?: any, event?: React.ChangeEvent<any> | undefined) => {
          const confirmationDialogParameters: DialogStuff = {
            name: "Aggregated_Forecast_Dialog",
            title: "Aggregated Forecast",
            type: "textDialog",
            show: true,
            exclusive: false,
            maxWidth: "xs",
            dialogText: "Do you want to load the selected forecast results?",
            iconType: "confirmation",
            actionsList: () =>
              DialogOneCancelButtons(
                [true, true],
                [true, true],
                [
                  unloadDialogsAction,
                  () =>
                    runEconomicsForecastAggregationRequestAction(
                      allWorkflowProcesses as TAllWorkflowProcesses
                    ),
                ],
                "Load",
                "loadOutlined",
                false,
                "All"
              ),
            dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
          };

          dispatch(showDialogAction(confirmationDialogParameters));

          handleCheckboxChange(row);
        }
      : handleCheckboxChange,
  });

  const dividerPositions = [50];
  const isCustomComponent = false;

  const fetchStoredRequestAction = () =>
    fetchStoredForecastingResultsRequestAction(currentProjectId);

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
                  reducer,
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

  const columns: Column<IStoredForecastResultsRow>[] = [
    { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
    ApexGridCheckboxColumn,
    {
      key: "actions",
      name: "ACTIONS",
      editable: false,
      formatter: ({ row }) => {
        const sn = row.sn as number;
        const title = row.forecastResultsTitle as string;
        const id = row.forecastResultsId as string;
        const deleteUrl = `${mainUrl}/${id}`;

        const editedRow = rows[sn - 1];
        const editorData = [
          {
            name: "title",
            title: "FORECAST RESULTS TITLE",
            value: row["forecastResultsTitle"],
            editorType: "input",
            width: "100%",
          },
          {
            name: "description",
            title: "Description",
            value: row["description"],
            editorType: "textArea",
            width: "100%",
            height: "100%",
          },
        ] as IApexEditorRow[];

        const EditCommand = (
          <EditOutlinedIcon
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
                titleName: "forecastResultsTitle",
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
        );

        const DeleteCommand = (
          <DeleteOutlinedIcon
            onClick={() =>
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
                          fetchStoredForecastingResultsRequestAction(
                            currentProjectId
                          )
                      ),
                    "Delete",
                    "deleteOutlined",
                    "delete",
                    title
                  )
                )
              )
            }
          />
        );

        const VisibilityOutlined = (
          <VisibilityOutlinedIcon
            className={classes.visibilityOutlinedIcon}
            onClick={() =>
              dispatch(
                getTableDataByIdRequestAction(
                  reducer as TReducer,
                  `${mainUrl}/forecastResultData/${row.forecastResultsId}`,
                  row.forecastParametersTitle as string,
                  wp as TAllWorkflowProcesses,
                  "table",
                  collectionName as string
                )
              )
            }
          />
        );

        const MoreActionsCommand = (
          <MenuOpenOutlinedIcon
            onClick={() =>
              dispatch(
                getTableDataByIdRequestAction(
                  reducer as TReducer,
                  `${mainUrl}/${row.id}`,
                  row.forecastParametersTitle as string,
                  wp as TAllWorkflowProcesses,
                  "table",
                  collectionName as string
                )
              )
            }
          />
        );

        return (
          <ApexFlexContainer>
            {EditCommand}
            {DeleteCommand}
            {VisibilityOutlined}
          </ApexFlexContainer>
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
        return <Approval approvalText={row.approval} />;
      },
      width: 100,
    },
    {
      key: "saved",
      name: "STATUS",
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
      key: "forecastInputDeckTitle",
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

  const snStoredData = forecastResultsStored.map(
    (row: IApplicationStoredForecastResultsRow, i: number) => ({
      sn: i + 1,
      forecastResultsId: row.id,
      forecastResultsTitle: row.title,
      description: row.description,
      saved: row.saved,
      approval: "Not Started",
      networkId: row.networkId,
      forecastInputDeckTitle: row.forecastInputDeckTitle,
      forecastParametersTitle: row.forecastingParametersGroupTitle,
      author: { avatarUrl: "", name: "None" },
      approvers: [{ avatarUrl: "", name: "" }],
      createdOn: row.createdAt,
      modifiedOn: row.createdAt,
    })
  ) as IStoredForecastResultsRow[];

  const [rows, setRows] = React.useState(snStoredData);

  const exportColumns = columns
    .filter(
      (column) =>
        !["actions", "select_control_key"].includes(column.key.toLowerCase())
    )
    .map((column) => ({
      label: column.name,
      value: column.key,
    })) as IExcelSheetData<IStoredForecastResultsRow>["columns"];

  const exportTableProps = {
    fileName: "StoredForecastResults",
    tableData: {
      Template: {
        data: rows,
        columns: exportColumns,
      },
    },
  } as IExcelExportTable<IStoredForecastResultsRow>;

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <ExcelExportTable<IStoredForecastResultsRow> {...exportTableProps} />
    ),
  };

  const chartData = React.useRef(
    generateDoughnutAnalyticsData(rows, "approval")
  );

  React.useEffect(() => {
    setStoredforecastResults(storedforecastResults);
  }, [storedforecastResults]);

  const [sRow, setSRow] = React.useState(-1);

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
      <ClickAwayListener onClickAway={() => setSRow && setSRow(-1)}>
        <div className={classes.table}>
          <SizeMe monitorHeight refreshRate={32}>
            {({ size }) => <ApexGrid apexGridProps={getApexGridProps(size)} />}
          </SizeMe>
        </div>
      </ClickAwayListener>
      {showBaseButtons && (
        <ApexFlexContainer
          justifyContent="space-between"
          height={50}
          moreStyles={{ marginBottom: 4, width: 270 }}
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
                dispatch(
                  getForecastDataByIdRequestAction(
                    "forecastResultsVisualytics",
                    true,
                    "/apex/forecast/forecastdata"
                  )
                );
              },
              () =>
                dispatch(
                  fetchForecastTreeviewKeysRequestAction(
                    reducer,
                    "forecastChart"
                  )
                ),
            ]}
          />
        </ApexFlexContainer>
      )}
    </div>
  );
}
