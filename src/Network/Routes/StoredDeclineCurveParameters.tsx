import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import React, { CSSProperties } from "react";
import { Column } from "react-data-griddex";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import Approval from "../../Application/Components/Approval/Approval";
import Approvers from "../../Application/Components/Approvers/Approvers";
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
import {
  IStoredDataProps,
  IStoredDataRow,
} from "../../Application/Types/ApplicationTypes";
import formatDate from "../../Application/Utils/FormatDate";
import generateDoughnutAnalyticsData from "../../Application/Utils/GenerateDoughnutAnalyticsData";
import { confirmationDialogParameters } from "../../Application/Components/DialogParameters/ConfirmationDialogParameters";
import { DoughnutChartAnalytics } from "../../Visualytics/Components/Charts/DoughnutChart";
import { IBackendDeclineParametersRow } from "../Components/Dialogs/StoredNetworksDialogTypes";
import {
  fetchStoredDeclineCurveParametersRequestAction,
  getDeclineParametersByIdRequestAction,
  updateNetworkParameterAction,
  updateNetworkParametersAction,
} from "../Redux/Actions/NetworkActions";
import {
  cloneDeclineParameter,
  declineParametersStoredWithSN,
} from "../Utils/TransformDeclineParameters";

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

const selectedForecastingParametersIdSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.selectedForecastingParametersId,
  (data) => data
);

const wc = "storedDataWorkflows";

const declineParametersStoredSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer[wc]["declineParametersStored"],
  (data) => data
);
const forecastingParametersStoredSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer[wc]["forecastingParametersStored"],
  (data) => data
);

export default function StoredDeclineCurveParameters({
  showChart,
  isAllDeclineParameters,
}: IStoredDataProps) {
  const reducer = "networkReducer";
  const mainUrl = `${getBaseForecastUrl()}/well-decline-parameters`;

  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const componentRef = React.useRef();

  const currentProjectId = useSelector(currentProjectIdSelector);
  const dayFormat = useSelector(dayFormatSelector);
  const monthFormat = useSelector(monthFormatSelector);
  const yearFormat = useSelector(yearFormatSelector);

  const selectedForecastingParametersId = useSelector(
    selectedForecastingParametersIdSelector
  );

  const forecastingParametersStored = useSelector(
    forecastingParametersStoredSelector
  );

  const selectedforecastingParametersStored = forecastingParametersStored.find(
    (row: any) => row.id === selectedForecastingParametersId
  );

  const declineParametersStoredInit = useSelector(
    declineParametersStoredSelector
  );

  const declineParametersStored = declineParametersStoredInit.map(
    (row: any) => {
      const id = row?.forecastInputDeckId as string;

      const forecastStoredRow = forecastingParametersStored.find(
        (row: any) => row.forecastInputDeckId === id
      );

      const forecastInputdeckTitle = forecastStoredRow?.forecastInputdeckTitle;

      return { ...row, forecastInputdeckTitle };
    }
  );

  let declineParametersFiltered: any = [];

  if (isAllDeclineParameters == true) {
    declineParametersFiltered = declineParametersStored;
  } else {
    declineParametersFiltered = declineParametersStored.filter((row: any) => {
      if (selectedforecastingParametersStored != undefined) {
        if (
          row.forecastInputDeckId ==
          selectedforecastingParametersStored.forecastInputDeckId
        ) {
          return row;
        }
      }
    });
  }

  const snTransStoredData = declineParametersStoredWithSN(
    declineParametersFiltered as IBackendDeclineParametersRow[]
  );

  const [sRow, setSRow] = React.useState(-1);
  const [rows, setRows] = React.useState(snTransStoredData);
  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const handleCheckboxChange = (row: IStoredDataRow) => {
    dispatch(
      updateNetworkParametersAction({
        selectedDeclineParametersId: row.id,
        selectedDeclineParametersTitle: row.title,
      })
    );

    setCheckboxSelected(!checkboxSelected);
  };

  const ApexGridCheckboxColumn = apexGridCheckbox({
    shouldExecute: true,
    shouldDispatch: false,
    apexGridCheckboxFxn: handleCheckboxChange,
  });

  const dividerPositions = [50];
  const isCustomComponent = false;

  const fetchStoredRequestAction = () =>
    fetchStoredDeclineCurveParametersRequestAction(currentProjectId);

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

  const rowsTitlesString = rows.map((row) => row.title).join();
  const rowsDescriptionsString = rows.map((row) => row.description).join();
  const generateColumns = () => {
    const columns: Column<IStoredDataRow>[] = [
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
          const id = row.id as string;
          const deleteUrl = `${mainUrl}/${id}`;

          const editedRow = rows[currentSN - 1];
          const editorData = [
            {
              name: "title",
              title: "Title",
              value: row["title"],
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

          const importMoreActionsData = [
            {
              title: "Clone",
              action: () => {
                const currentRow = rows[currentSN - 1];
                const clonedRow = cloneDeclineParameter(currentRow);

                const newRows = [...snTransStoredData];
                newRows.splice(currentSN, 0, clonedRow);

                dispatch(
                  updateNetworkParameterAction(
                    "storedDataWorkflows.declineParametersStored",
                    newRows
                  )
                );
              },
            },
            {
              title: "Modify",
              action: () => {
                const isCreateOrEdit = true;
                const wellDeclineParamtersId = currentRow.id;
                const wellDeclineParamtersTitle = currentRow.title;

                dispatch(
                  getDeclineParametersByIdRequestAction(
                    "inputReducer" as TReducer,
                    isCreateOrEdit,
                    wellDeclineParamtersId as string,
                    wellDeclineParamtersTitle as string,
                    currentSN,
                    currentRow as any
                  )
                );
              },
            },
          ];

          const style =
            title.toLowerCase() === "default" ? getDisabledStyle(theme) : {};

          const EditCommand = (
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
          );

          const DeleteCommand = (
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
                            fetchStoredDeclineCurveParametersRequestAction(
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
          );

          const VisibilityOutlined = (
            <VisibilityOutlinedIcon
              onClick={() => {
                const isCreateOrEdit = true;
                const wellDeclineParamtersId = currentRow.id;
                const wellDeclineParamtersTitle = currentRow.title;
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
              }}
            />
          );

          const ApexGridMoreActionsContext = (
            <ApexGridMoreActionsContextMenu
              component={MoreActionsPopover}
              data={importMoreActionsData}
            >
              <MenuOpenOutlinedIcon />
            </ApexGridMoreActionsContextMenu>
          );

          return (
            <ApexFlexContainer>
              {EditCommand}
              {DeleteCommand}
              {VisibilityOutlined}
              {ApexGridMoreActionsContext}
            </ApexFlexContainer>
          );
        },
        width: 120,
      },
      {
        key: "title",
        name: "DECLINE PARAMETERS TITLE",
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
        key: "author",
        name: "AUTHOR",
        resizable: true,
        formatter: ({ row }) => {
          return <Author author={row.author} />;
        },
        width: 200,
      },
      {
        key: "approvers",
        name: "APPROVERS",
        resizable: true,
        formatter: ({ row }) => {
          return <Approvers approvers={row.approvers} />;
        },
        width: 200,
      },
      {
        key: "createdOn",
        name: "CREATED",
        resizable: true,
        formatter: ({ row }) => {
          return (
            <div>
              {formatDate(
                new Date(row.createdOn as string),
                dayFormat,
                monthFormat,
                yearFormat
              ).toString()}
            </div>
          );
        },
        minWidth: 200,
      },
      {
        key: "modifiedOn",
        name: "MODIFIED",
        resizable: true,
        formatter: ({ row }) => {
          return (
            <div>
              {formatDate(
                new Date(row.modifiedOn as string),
                dayFormat,
                monthFormat,
                yearFormat
              ).toString()}
            </div>
          );
        },
        minWidth: 200,
      },
    ];

    return columns;
  };
  const columns = React.useMemo(() => generateColumns(), []);

  const exportColumns = columns
    .filter(
      (column) =>
        !["actions", "select_control_key"].includes(column.key.toLowerCase())
    )
    .map((column) => ({
      label: column.name,
      value: column.key,
    })) as IExcelSheetData<IStoredDataRow>["columns"];

  const exportTableProps = {
    fileName: "CostsAndRevenuesTemplate",
    tableData: {
      Template: {
        data: rows,
        columns: exportColumns,
      },
    },
  } as IExcelExportTable<IStoredDataRow>;

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <div>
        <ExcelExportTable<IStoredDataRow> {...exportTableProps} />
      </div>
    ),
    componentRef,
  };

  const chartData = React.useRef(
    generateDoughnutAnalyticsData(rows, "approval")
  );

  React.useEffect(() => {
    setRows(snTransStoredData);
  }, [
    declineParametersStored.length,
    rowsTitlesString,
    rowsDescriptionsString,
  ]);

  const getApexGridProps = (size: ISize) => ({
    columns: columns,
    rows: rows,
    tableButtons: tableButtons,
    newTableRowHeight: 35,
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
