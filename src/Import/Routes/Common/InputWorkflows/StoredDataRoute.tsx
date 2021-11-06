import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { ClickAwayListener, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import Approval from "../../../../Application/Components/Approval/Approval";
import Approvers from "../../../../Application/Components/Approvers/Approvers";
import Author from "../../../../Application/Components/Author/Author";
import apexGridCheckbox from "../../../../Application/Components/Checkboxes/ApexGridCheckbox";
import ApexGridMoreActionsContextMenu from "../../../../Application/Components/ContextMenus/ApexGridMoreActionsContextMenu";
import DialogOneCancelButtons from "../../../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../../../Application/Components/Dialogs/DialogTypes";
import { IApexEditorRow } from "../../../../Application/Components/Editors/ApexEditor";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../../../Application/Components/Export/ExcelExportTable";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import {
  ReducersType,
  TAllWorkflowProcesses,
} from "../../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../../Application/Redux/Actions/ActionTypes";
import {
  deleteDataByIdRequestAction,
  getTableDataByIdRequestAction,
} from "../../../../Application/Redux/Actions/ApplicationActions";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import {
  IStoredDataProps,
  IStoredDataRow,
} from "../../../../Application/Types/ApplicationTypes";
import formatDate from "../../../../Application/Utils/FormatDate";
import ForecastParametersMoreActionsPopover from "../../../../Forecast/Components/Popovers/ForecastParametersMoreActionsPopover";
import { updateNetworkParameterAction } from "../../../../Network/Redux/Actions/NetworkActions";
import { IUnitSettingsData } from "../../../../Settings/Redux/State/UnitSettingsStateTypes";
import { DoughnutChartAnalytics } from "../../../../Visualytics/Components/Charts/DoughnutChart";
import { IChartProps } from "../../../../Visualytics/Components/ChartTypes";
import { confirmationDialogParameters } from "../../../Components/DialogParameters/ConfirmationDialogParameters";
import ApexGrid from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";

//<IStoredDataRow, ITableButtonsProps>

const useStyles = makeStyles((theme) => ({
  rootStoredData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",
    boxShadow: theme.shadows[2],
    padding: 20,
  },
  workflowBody: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  chart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 150,
  },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const unitSettingsSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer,
  (redcuer) => redcuer
);

const StoredDataRoute = React.forwardRef<HTMLDivElement, IStoredDataProps>(
  (
    {
      snStoredData,
      dataKey,
      dataTitle,
      chartData,
      wkPs,
      showChart,
      containerStyle,
      handleCheckboxChange,
      reducer,
      collectionName,
      mainUrl,
      clickAwayAction,
      fetchStoredRequestAction,
      updateTableActionConfirmation,
      isDataVisibility,
      isCloning,
      wcc,
    },
    ref
  ) => {
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();

    const updateTableActionConfirmationDefined =
      updateTableActionConfirmation as NonNullable<
        IStoredDataProps["updateTableActionConfirmation"]
      >;
    const wc = wcc == null ? "" : wcc;

    const { dayFormat, monthFormat, yearFormat } = useSelector(
      unitSettingsSelector
    ) as IUnitSettingsData;

    const [selectedRows, setSelectedRows] = React.useState(
      new Set<React.Key>()
    );
    const [sRow, setSRow] = React.useState(-1);

    const snStoredDataCopy = snStoredData as IStoredDataRow[];
    const currentRows = snStoredData as IStoredDataRow[];

    const [rows, setRows] = React.useState(currentRows);

    const ApexGridCheckboxColumn = apexGridCheckbox({
      shouldExecute: true,
      shouldDispatch: false,
      apexGridCheckboxFxn: handleCheckboxChange as NonNullable<
        IStoredDataProps["handleCheckboxChange"]
      >,
    });

    const dividerPositions = [50];
    const isCustomComponent = false;

    const cloneSelectedRow = (
      currentRow: IStoredDataRow,
      noOfRows: number
    ) => ({ ...currentRow, sn: noOfRows + 1 });

    const generateColumns = () => {
      const columns: Column<IStoredDataRow>[] = [
        {
          key: "sn",
          name: "SN",
          editable: false,
          resizable: true,
          width: 50,
        },
        ApexGridCheckboxColumn,
        {
          key: "actions",
          name: "ACTIONS",
          editable: false,
          formatter: ({ row }) => {
            console.log(
              "🚀 ~ file: StoredDataRoute.tsx ~ line 171 ~ generateColumns ~ row",
              row
            );
            const sn = row.sn as number;
            const currentSN = sn as number;

            const title = row.title as string;
            const id = row.id as string;
            const deleteUrl = `${mainUrl}/${id}`;

            const editedRow = rows[sn - 1];
            const editorData = [
              {
                name: dataKey,
                title: "Title",
                value: (row as IStoredDataRow)[dataKey as keyof IStoredDataRow],
                editorType: "input",
                width: "100%",
              },
              {
                name: "description",
                title: "Description",
                value: (row as IStoredDataRow)["description"],
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
                  const clonedRow = cloneSelectedRow(currentRow, rows.length);

                  const newRows = [...snStoredDataCopy, clonedRow];

                  dispatch(updateNetworkParameterAction(wc, newRows));
                },
              },
            ];

            const editOutlined = (
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
                          () =>
                            updateTableActionConfirmationDefined(id)(titleDesc),
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

            const deleteOutlined = (
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
                            reducer as ReducersType,
                            deleteUrl as string,
                            title as string,
                            fetchStoredRequestAction as () => IAction
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

            const VisibilityOutlined =
              isDataVisibility == true ? (
                <VisibilityOutlinedIcon
                  onClick={() =>
                    dispatch(
                      getTableDataByIdRequestAction(
                        reducer as ReducersType,
                        `${mainUrl}/${row.id}`,
                        row.title as string,
                        wkPs as TAllWorkflowProcesses,
                        "table",
                        collectionName as string
                      )
                    )
                  }
                />
              ) : null;

            const ApexGridMoreActionsContext =
              isCloning == true ? (
                <ApexGridMoreActionsContextMenu
                  component={ForecastParametersMoreActionsPopover}
                  data={importMoreActionsData}
                >
                  <MenuOpenOutlinedIcon />
                </ApexGridMoreActionsContextMenu>
              ) : null;

            return (
              <ApexFlexContainer>
                {editOutlined}
                {deleteOutlined}
                {VisibilityOutlined}
                {ApexGridMoreActionsContext}
              </ApexFlexContainer>
            );
          },
          width: 100,
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
          key: `${dataKey}`,
          name: `${dataTitle}`,
          editable: false,
          resizable: true,
          width: 300,
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
    const columns = React.useMemo(() => generateColumns(), [selectedRows]);

    const exportColumns = columns
      .filter(
        (column) =>
          !["actions", "select_control_key"].includes(column.key.toLowerCase())
      )
      .map((column) => ({
        value: column.key,
        label: column.name,
      })) as IExcelSheetData<IStoredDataRow>["columns"];

    const exportTableProps = {
      fileName: wkPs,
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
    };

    const storedDataDefined = snStoredData as IStoredDataRow[];
    const storedDataTitlesString = storedDataDefined
      .map((row) => row.title)
      .join();
    const storedDataDescriptionsString = storedDataDefined
      .map((row) => row.description)
      .join();

    React.useEffect(() => {
      dispatch(hideSpinnerAction());
    }, [dispatch]);

    React.useEffect(() => {
      setRows(storedDataDefined);
    }, [
      storedDataDefined.length,
      storedDataTitlesString,
      storedDataDescriptionsString,
    ]);

    return (
      <div className={classes.rootStoredData} style={containerStyle}>
        {showChart && (
          <div className={classes.chart}>
            <DoughnutChartAnalytics
              data={chartData as IChartProps["data"]}
              willUseThemeColor={false}
            />
          </div>
        )}

        <ClickAwayListener
          onClickAway={() => {
            setSRow && setSRow(-1);
            clickAwayAction && clickAwayAction();
          }}
        >
          <div
            className={classes.workflowBody}
            ref={ref as React.RefObject<any>}
          >
            <SizeMe monitorHeight refreshRate={32}>
              {({ size }) => (
                <ApexGrid
                  columns={columns}
                  rows={rows}
                  tableButtons={tableButtons as ITableButtonsProps}
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
      </div>
    );
  }
);

export default StoredDataRoute;
