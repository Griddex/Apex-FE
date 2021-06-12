import { ClickAwayListener, makeStyles } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch } from "react-redux";
import { SizeMe } from "react-sizeme";
import Approval from "../../../../Application/Components/Approval/Approval";
import Approvers from "../../../../Application/Components/Approvers/Approvers";
import Author from "../../../../Application/Components/Author/Author";
import DialogOneCancelButtons from "../../../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../../../Application/Components/Dialogs/DialogTypes";
import { IApexEditorRow } from "../../../../Application/Components/Editors/ApexEditor";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { IRawRow } from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { ReducersType } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { getTableDataByIdRequestAction } from "../../../../Application/Redux/Actions/ApplicationActions";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import {
  IStoredDataProps,
  IStoredDataRow,
} from "../../../../Application/Types/ApplicationTypes";
import DoughnutChart from "../../../../Visualytics/Components/Charts/DoughnutChart";
import { IChartProps } from "../../../../Visualytics/Components/ChartTypes";
import { confirmationDialogParameters } from "../../../Components/DialogParameters/ConfirmationDialogParameters";
import apexGridCheckbox from "../../../../Application/Components/Checkboxes/ApexGridCheckbox";

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
    justifyContent: "center", //around, between
  },
  chart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "20%",
  },
}));

export default function StoredDataRoute<
  TRow extends IStoredDataRow = IStoredDataRow
>({
  snStoredData,
  dataKey,
  dataTitle,
  chartData,
  tableButtons,
  wkPs,
  showChart,
  containerStyle,
  handleCheckboxChange,
  reducer,
  mainUrl,
  tableTitle,
}: IStoredDataProps) {
  console.log(
    "Logged output --> ~ file: StoredDataRoute.tsx ~ line 69 ~ reducer",
    reducer
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const wp = wkPs as NonNullable<IStoredDataProps["wkPs"]>;

  const [selectedRows, setSelectedRows] = React.useState(new Set<React.Key>());
  const [sRow, setSRow] = React.useState(-1);
  const [shouldUpdate, setShouldUpdate] = React.useState(false);

  const currentRows = snStoredData as IStoredDataRow[];

  const [rows, setRows] = React.useState(currentRows);
  // console.log(
  //   "Logged output --> ~ file: StoredDataRoute.tsx ~ line 96 ~ rows",
  //   rows
  // );

  const ApexGridCheckboxColumn = apexGridCheckbox({
    shouldExecute: true,
    shouldDispatch: false,
    apexGridCheckboxFxn: handleCheckboxChange as NonNullable<
      IStoredDataProps["handleCheckboxChange"]
    >,
  });

  const dividerPositions = [50];

  const generateColumns = () => {
    const columns: Column<IStoredDataRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      ApexGridCheckboxColumn,
      {
        key: "actions",
        name: "ACTIONS",
        editable: false,
        formatter: ({ row }) => {
          const sn = row.sn as number;
          const editedRow = rows[sn - 1];
          const editorData = [
            {
              name: dataKey,
              title: dataTitle,
              value: (row as IStoredDataRow)[dataKey as keyof IStoredDataRow],
              editorType: "input",
            },
            {
              name: "description",
              title: "Description",
              value: (row as IStoredDataRow)["description"],
              editorType: "textArea",
            },
          ] as IApexEditorRow[];

          return (
            <div>
              <EditOutlinedIcon
                onClick={() => {
                  const dialogParameters: DialogStuff = {
                    name: "Edit_Table_Dialog",
                    title: "Edit Table",
                    type: "tableEditorDialog",
                    show: true,
                    exclusive: true,
                    maxWidth: "xs",
                    iconType: "edit",
                    apexEditorProps: {
                      editorData,
                      editedRow,
                      dividerPositions,
                      rows,
                      setRows,
                      shouldUpdate,
                    },
                    actionsList: () =>
                      DialogOneCancelButtons(
                        [true, true],
                        [true, false],
                        [
                          unloadDialogsAction,
                          //Captured variable
                          //solve with ref
                          () => setShouldUpdate(!shouldUpdate),
                        ],
                        "Update",
                        "updateOutlined"
                      ),
                  };

                  dispatch(showDialogAction(dialogParameters));
                }}
              />
              <DeleteOutlinedIcon
                onClick={() =>
                  dispatch(
                    showDialogAction(
                      confirmationDialogParameters(
                        "Delete_Table",
                        "Confirm Table Deletion",
                        `This action will permanently delete this data item.
  
  Proceed?`,
                        true,
                        false,
                        () => {
                          const sn = row.sn as number;
                          const remainingRows = rows.splice(sn - 1, 1);

                          setRows(remainingRows);
                          // tableRows.current = remainingRows;
                        },
                        "Proceed",
                        "proceedOutlined"
                      )
                    )
                  )
                }
              />
              <VisibilityOutlinedIcon
                onClick={() =>
                  dispatch(
                    getTableDataByIdRequestAction(
                      reducer as ReducersType,
                      `${mainUrl}/${row.id}`,
                      row.title as string
                    )
                  )
                }
              />
            </div>
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
          return <Approval approvalText={row.status} />;
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
          return <div>{row.createdOn}</div>;
        },
        // width: 200,
      },
      {
        key: "modifiedOn",
        name: "MODIFIED",
        resizable: true,
        formatter: ({ row }) => {
          return <div>{row.modifiedOn}</div>;
        },
        // width: 200,
      },
    ];

    return columns;
  };
  const columns = React.useMemo(() => generateColumns(), [selectedRows]);

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  return (
    <div className={classes.rootStoredData} style={containerStyle}>
      {showChart && (
        <div className={classes.chart}>
          <DoughnutChart
            data={chartData as IChartProps["data"]}
            willUseThemeColor={false}
          />
        </div>
      )}

      <ClickAwayListener onClickAway={() => setSRow && setSRow(-1)}>
        <div className={classes.workflowBody}>
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
