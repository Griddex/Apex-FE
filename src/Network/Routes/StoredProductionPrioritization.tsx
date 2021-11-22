import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
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
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { ReducersType } from "../../Application/Components/Workflows/WorkflowTypes";
import { deleteDataByIdRequestAction } from "../../Application/Redux/Actions/ApplicationActions";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { getBaseForecastUrl } from "../../Application/Services/BaseUrlService";
import {
  IStoredDataProps,
  IStoredDataRow,
} from "../../Application/Types/ApplicationTypes";
import formatDate from "../../Application/Utils/FormatDate";
import generateDoughnutAnalyticsData from "../../Application/Utils/GenerateDoughnutAnalyticsData";
import { confirmationDialogParameters } from "../../Import/Components/DialogParameters/ConfirmationDialogParameters";
import { DoughnutChartAnalytics } from "../../Visualytics/Components/Charts/DoughnutChart";
import {
  fetchStoredProductionPrioritizationRequestAction,
  getProductionPrioritizationByIdRequestAction,
  updateNetworkParameterAction,
  updateNetworkParametersAction,
} from "../Redux/Actions/NetworkActions";

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

export const productionPrioritizationStoredWithSN = (
  productionPrioritizationStored: any[]
) => {
  const transStoredData = productionPrioritizationStored.map((row: any) => {
    const {
      createdAt,
      title,
      description,
      forecastInputDeckId,
      id,
      projectId,
      userId,
      typeOfPrioritization,
      typeOfStream,
      useSecondaryFacility,
    } = row;

    return {
      id: id,
      userId: userId,
      title: title,
      approval: "Not Started",
      author: { avatarUrl: "", name: "None" },
      approvers: [{ avatarUrl: "", name: "" }],
      description: description,
      createdOn: createdAt,
      modifiedOn: createdAt,
    };
  }) as IStoredDataRow[];

  const snTransStoredData = transStoredData.map((row, i) => ({
    sn: i + 1,
    ...row,
  })) as IStoredDataRow[];

  return snTransStoredData;
};

export const cloneProductionPrioritizationRow = (
  currentRow: IStoredDataRow,
  noOfRows: number
) => {
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
    title: "User",
    userId: "Gabriel",
    typeOfPrioritization: "",
    typeOfStream: "",
    useSecondaryFacility: "",
  };

  return newRow;
};

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
const wp = "productionPrioritizationStored";

const selectedForecastingParametersIdSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer["selectedForecastingParametersId"],
  (data) => data
);
const productionPrioritizationStoredSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.networkReducer[wc]["productionPrioritizationStored"],
  (data) => data
);
const forecastingParametersStoredSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer[wc]["forecastingParametersStored"],
  (data) => data
);

export default function StoredProductionPrioritization({
  showChart,
  isAllWellPrioritization,
  updateTableActionConfirmation,
}: IStoredDataProps) {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();

  const updateTableActionConfirmationDefined =
    updateTableActionConfirmation as NonNullable<
      IStoredDataProps["updateTableActionConfirmation"]
    >;

  const componentRef = React.useRef();

  const currentProjectId = useSelector(currentProjectIdSelector);

  const reducer = "networkReducer";
  const mainUrl = `${getBaseForecastUrl()}/well-prioritization`;

  const [selectedRows, setSelectedRows] = React.useState(new Set<React.Key>());
  const [sRow, setSRow] = React.useState(-1);

  const dayFormat = useSelector(dayFormatSelector);
  const monthFormat = useSelector(monthFormatSelector);
  const yearFormat = useSelector(yearFormatSelector);

  const productionPrioritizationStored = useSelector(
    productionPrioritizationStoredSelector
  );

  const forecastingParametersStored = useSelector(
    forecastingParametersStoredSelector
  );

  const selectedForecastingParametersId = useSelector(
    selectedForecastingParametersIdSelector
  );

  const selectedforecastingParametersStored = forecastingParametersStored.find(
    (row: any) => row.id === selectedForecastingParametersId
  );

  let wellPrioritizationFiltered: any = [];

  if (isAllWellPrioritization == true) {
    wellPrioritizationFiltered = productionPrioritizationStored;
  } else {
    wellPrioritizationFiltered = productionPrioritizationStored.filter(
      (row: any) => {
        if (selectedforecastingParametersStored != undefined) {
          if (
            row.forecastInputDeckId ==
            selectedforecastingParametersStored.forecastInputDeckId
          ) {
            return row;
          }
        }
      }
    );
  }

  const snTransStoredData = productionPrioritizationStoredWithSN(
    wellPrioritizationFiltered
  );

  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const handleCheckboxChange = (row: IStoredDataRow) => {
    dispatch(
      updateNetworkParametersAction({
        selectedProductionPrioritizationId: row.id,
        selectedProductionPrioritizationTitle: row.title,
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
          const wellPrioritizationId = id;
          const wellPrioritizationTitle = title;
          const selectedRowIndex = currentSN - 1;

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
                const clonedRow = cloneProductionPrioritizationRow(
                  currentRow,
                  rows.length
                );

                const newRows = [...productionPrioritizationStored, clonedRow];
                dispatch(
                  updateNetworkParameterAction(
                    "storedDataWorkflows.productionPrioritizationStored",
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

                // dispatch(
                //   getDeclineParametersByIdRequestAction(
                //     "inputReducer" as ReducersType,
                //     isCreateOrEdit,
                //     wellDeclineParamtersId as string,
                //     wellDeclineParamtersTitle as string,
                //     currentSN,
                //     currentRow as any
                //   )
                // );

                dispatch(
                  getProductionPrioritizationByIdRequestAction(
                    id,
                    title,
                    selectedRowIndex,
                    "inputReducer" as ReducersType,
                    true as boolean
                  )
                );
              },
            },
          ];

          const VisibilityOutlined = (
            <VisibilityOutlinedIcon
              className={classes.visibilityOutlinedIcon}
              onClick={() => {
                dispatch(
                  getProductionPrioritizationByIdRequestAction(
                    wellPrioritizationId,
                    wellPrioritizationTitle,
                    selectedRowIndex,
                    reducer,
                    false
                  )
                );

                /* dispatch(
                    updateNetworkParameterAction(
                      "selectedForecastingParametersId",
                      row.forecastingParametersId
                    )
                  ); */
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

          const DeleteCommand = (
            <DeleteOutlinedIcon
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
                            fetchStoredProductionPrioritizationRequestAction(
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
        name: "WELL PRIORITIZATION TITLE",
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
    const updatedStoredData = productionPrioritizationStoredWithSN(
      wellPrioritizationFiltered
    );
    setRows(updatedStoredData);
  }, [productionPrioritizationStored.length]);

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
          {({ size }) => (
            <ApexGrid
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
