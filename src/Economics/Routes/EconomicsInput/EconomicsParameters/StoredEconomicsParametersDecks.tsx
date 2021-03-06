import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { CSSProperties } from "react";
import { Column } from "react-data-griddex";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import Approval from "../../../../Application/Components/Approval/Approval";
import Approvers from "../../../../Application/Components/Approvers/Approvers";
import Author from "../../../../Application/Components/Author/Author";
import apexGridCheckbox from "../../../../Application/Components/Checkboxes/ApexGridCheckbox";
import ApexGridMoreActionsContextMenu from "../../../../Application/Components/ContextMenus/ApexGridMoreActionsContextMenu";
import DialogOneCancelButtons from "../../../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../../../Application/Components/Dialogs/DialogTypes";
import {
  IApexEditor,
  IApexEditorRow,
} from "../../../../Application/Components/Editors/ApexEditor";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../../../Application/Components/Export/ExcelExportTable";
import MoreActionsPopover from "../../../../Application/Components/Popovers/MoreActionsPopover";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import ApexGrid from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ISize } from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import {
  TReducer,
  TAllWorkflowProcesses,
} from "../../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../../Application/Redux/Actions/ActionTypes";
import {
  deleteDataByIdRequestAction,
  getTableDataByIdRequestAction,
  persistSelectedIdTitleAction,
  updateDataByIdRequestAction,
} from "../../../../Application/Redux/Actions/ApplicationActions";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { getBaseEconomicsUrl } from "../../../../Application/Services/BaseUrlService";
import { getDisabledStyle } from "../../../../Application/Styles/disabledStyles";
import {
  IApplicationStoredDataRow,
  IStoredDataProps,
  IStoredDataRow,
} from "../../../../Application/Types/ApplicationTypes";
import formatDate from "../../../../Application/Utils/FormatDate";
import generateDoughnutAnalyticsData from "../../../../Application/Utils/GenerateDoughnutAnalyticsData";
import { confirmationDialogParameters } from "../../../../Application/Components/DialogParameters/ConfirmationDialogParameters";
import { fetchStoredForecastingParametersRequestAction } from "../../../../Network/Redux/Actions/NetworkActions";
import { DoughnutChartAnalytics } from "../../../../Visualytics/Components/Charts/DoughnutChart";
import {
  getEconomicsParametersByIdRequestAction,
  updateEconomicsParameterAction,
} from "../../../Redux/Actions/EconomicsActions";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const useStyles = makeStyles((theme) => ({
  rootStoredData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",
    boxShadow: theme.shadows[2],
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

export const cloneEconomicParameter = (
  currentRow: IStoredDataRow,
  noOfRows: number
) => {
  const { id, title, description, createdOn } = currentRow;

  const newRow = {
    createdAt: createdOn,
    description,
    id,
    projectId: "",
    title,
  };

  return newRow;
};

const formatEconomicsParameters = (
  economicsParametersDeckStored: IApplicationStoredDataRow[]
) => {
  const transStoredData = economicsParametersDeckStored.map(
    (row: IApplicationStoredDataRow) => {
      return {
        id: row.id,
        userId: row.userId,
        approval: "Not Started",
        title: row.title,
        description: row.description,
        author: { avatarUrl: "", name: "None" },
        approvers: [{ avatarUrl: "", name: "" }],
        createdOn: row.createdAt,
        modifiedOn: row.createdAt,
      };
    }
  ) as IStoredDataRow[];

  const snTransStoredData = transStoredData.map((row, i) => ({
    sn: i + 1,
    ...row,
  })) as IStoredDataRow[];

  return snTransStoredData;
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
const wp: NonNullable<IStoredDataProps["wkPs"]> =
  "economicsParametersDeckStored";

const economicsParametersDeckStoredSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.economicsReducer[wc]["economicsParametersDeckStored"],
  (data) => data
);

export default function StoredEconomicsParametersDecks({
  showChart,
}: IStoredDataProps) {
  const theme = useTheme();

  const classes = useStyles();
  const dispatch = useDispatch();
  const componentRef = React.useRef();

  const currentProjectId = useSelector(currentProjectIdSelector);

  const reducer = "economicsReducer";
  const tableTitle = "Economics Parameters Table";
  const mainUrl = `${getBaseEconomicsUrl()}/parameter`;
  const collectionName =
    "commercialTechnical-fiscal-flarePenalty-gasRoyalty-oilRoyalty";

  const economicsParametersDeckStored = useSelector(
    economicsParametersDeckStoredSelector
  );

  const dayFormat = useSelector(dayFormatSelector);
  const monthFormat = useSelector(monthFormatSelector);
  const yearFormat = useSelector(yearFormatSelector);

  const snTransStoredData: IStoredDataRow[] = formatEconomicsParameters(
    economicsParametersDeckStored
  );

  const storedDataTitlesString = snTransStoredData
    .map((row) => row.title)
    .join();
  const storedDataDescriptionsString = snTransStoredData
    .map((row) => row.description)
    .join();

  const [rows, setRows] = React.useState(snTransStoredData);
  const [selectedRows, setSelectedRows] = React.useState(new Set<React.Key>());
  const [sRow, setSRow] = React.useState(-1);

  const handleCheckboxChange = (row: any) => {
    const { id, title } = row;

    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction(reducer, {
          selectedEconomicsParametersInputDeckId: id,
          selectedEconomicsParametersInputDeckTitle: title,
        })
      );
  };

  const dividerPositions = [50];
  const isCustomComponent = false;

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

  const ApexGridCheckboxColumn = apexGridCheckbox({
    shouldExecute: true,
    shouldDispatch: false,
    apexGridCheckboxFxn: handleCheckboxChange,
  });

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

          const title = row.title as string;
          const id = row.id as string;
          const deleteUrl = `${mainUrl}/${id}`;

          const editedRow = rows[sn - 1];
          const editorData = [
            {
              name: "title",
              title: "ECONOMICS PARAMETERS TITLE",
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
                const currentRow = rows[sn - 1];
                const clonedRow = cloneEconomicParameter(
                  currentRow,
                  rows.length
                );

                const newRows = [...economicsParametersDeckStored, clonedRow];
                dispatch(
                  updateEconomicsParameterAction(
                    "storedDataWorkflows.economicsParametersDeckStored",
                    newRows
                  )
                );
              },
            },
          ];

          const style =
            title.toLowerCase() === "default" ? getDisabledStyle(theme) : {};

          const VisibilityOutlined = (
            <VisibilityOutlinedIcon
              onClick={() =>
                dispatch(
                  getTableDataByIdRequestAction(
                    reducer as TReducer,
                    `${mainUrl}/${row.id}`,
                    row.title as string,
                    wp as TAllWorkflowProcesses,
                    "table",
                    collectionName as string
                  )
                )
              }
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
              // onClick={() => {
              //   const isCreateOrEdit = true;

              //   dispatch(
              //     getEconomicsParametersByIdRequestAction(
              //       currentRow.id as string,
              //       "economicsReducer" as TReducer,
              //       isCreateOrEdit as boolean
              //     )
              //   );
              // }}
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
        key: "title",
        name: "ECONOMICS PARAMETERS TITLE",
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

  const rowsTitlesString = rows.map((row) => row.title).join();
  const rowsDescriptionsString = rows.map((row) => row.description).join();

  const columns = React.useMemo(
    () => generateColumns(),
    [rowsTitlesString, rowsDescriptionsString]
  );

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
    fileName: "StoredEconomicsParameters",
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
    generateDoughnutAnalyticsData(economicsParametersDeckStored, "approval")
  );

  React.useEffect(() => {
    const updatedStoredData = formatEconomicsParameters(
      economicsParametersDeckStored as IApplicationStoredDataRow[]
    );
    setRows(updatedStoredData);
  }, [
    economicsParametersDeckStored.length,
    storedDataTitlesString,
    storedDataDescriptionsString,
  ]);

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
