import { ClickAwayListener, makeStyles, useTheme } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
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
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
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
import CreateStoredDataButton from "../../../Menus/CreateStoredDataButton";

const useStyles = makeStyles((theme) => ({
  rootStoredData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "98%",
    height: "90%",
    backgroundColor: "#FFF",
    boxShadow: theme.shadows[3],
    padding: 10,
  },
  workflowBody: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "97%",
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
      buttonToolTip,
      butttonTitle,
      dialogTitle,
      isDataVisibility,
      isCloning,
      wcc,
    },
    ref
  ) => {
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();

    const buttonToolTipCopy = buttonToolTip == null ? "" : buttonToolTip;
    const butttonTitleCopy = butttonTitle == null ? "" : butttonTitle;
    const dialogTitleCopy = dialogTitle == null ? "" : dialogTitle;
    const wc = wcc == null ? "" : wcc;

    const { dayFormat, monthFormat, yearFormat } = useSelector(
      (state: RootState) => state.unitSettingsReducer
    ) as IUnitSettingsData;

    const [selectedRows, setSelectedRows] = React.useState(
      new Set<React.Key>()
    );
    const [sRow, setSRow] = React.useState(-1);

    const snStoredDataCopy = snStoredData as IStoredDataRow[];
    const currentRows = snStoredData as IStoredDataRow[];
    const rowIndex: number = currentRows.length;
    let currentStoredDataRow = {} as IStoredDataRow;
    if (rowIndex > 0) {
      currentStoredDataRow = currentRows[rowIndex - 1];
    }

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

    const cloneSelectedRow = (currentRow: IStoredDataRow, noOfRows: number) => {
      const {
        approval,
        approvers,
        author,
        createdOn,
        description,
        id,
        modifiedOn,
        sn,
        title,
      } = currentRow;

      const newRow = {
        approval,
        approvers,
        author,
        createdOn,
        description,
        id,
        modifiedOn,
        sn: noOfRows + 1,
        title,
      } as IStoredDataRow;

      return newRow;
    };

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
            console.log("row: ", row);
            const sn = row.sn as number;
            const currentSN = sn as number;
            const currentRow = rows[currentSN - 1];
            console.log("currentRow 1", currentRow);

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
                  console.log("rows: ", rows);
                  console.log("currentRow: ", currentRow);
                  const clonedRow = cloneSelectedRow(currentRow, rows.length);
                  console.log(
                    "Logged output --> ~ file: StoredData.tsx ~ line 324 ~ generateColumns ~ clonedRow",
                    clonedRow
                  );

                  const newRows = [...snStoredDataCopy, clonedRow];
                  //setRows(newRows);

                  dispatch(updateNetworkParameterAction(wc, newRows));
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

            console.log("currentRow 2", currentRow);

            return (
              <ApexFlexContainer>
                <EditOutlinedIcon
                  onClick={() => {
                    const dialogParameters: DialogStuff = {
                      name: "Edit_Table_Dialog",
                      title: "Edit Table",
                      type: "tableEditorDialog",
                      show: true,
                      exclusive: true,
                      maxWidth: isCustomComponent ? "lg" : "sm",
                      iconType: "edit",
                      isCustomComponent,
                      apexEditorProps: {
                        editorData,
                        editedRow,
                        dividerPositions,
                      },
                      actionsList: (shouldUpdateAction: () => void) =>
                        DialogOneCancelButtons(
                          [true, true],
                          [true, false],
                          [unloadDialogsAction, shouldUpdateAction],
                          "Update",
                          "updateOutlined",
                          false,
                          "All"
                        ),
                    };

                    /*  dispatch(showDialogAction(extrudeStoredDataDPs(
                      dialogTitleCopy,
                    currentRow,
                    currentSN - 1,
                    "createForecastingParametersWorkflow" 
                  ))) */
                  }}
                />
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
                {VisibilityOutlined}
                {ApexGridMoreActionsContext}
              </ApexFlexContainer>
            );
          },
          width: 100,
        },
        {
          key: "status",
          name: "STATUS",
          editable: false,
          resizable: true,
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

    const addCreateButton = false;
    const createBtn = (
      <CreateStoredDataButton
        currentRow={currentStoredDataRow}
        storedDataIndex={rowIndex}
        buttonToolTip={buttonToolTipCopy}
        butttonTitle={butttonTitleCopy}
        dialogTitle={dialogTitleCopy}
      />
    );

    const tableButtons: ITableButtonsProps = {
      showExtraButtons: true,
      extraButtons: () => (
        <div>
          <ExcelExportTable<IStoredDataRow> {...exportTableProps} />
        </div>
      ),
    };

    React.useEffect(() => {
      dispatch(hideSpinnerAction());
    }, [dispatch]);

    const updatedStoredData = snStoredData as IStoredDataRow[];
    React.useEffect(() => {
      setRows(updatedStoredData);
    }, [updatedStoredData.length]);

    console.log("rows: ", rows);

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
                <ApexGrid<IStoredDataRow, ITableButtonsProps>
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
