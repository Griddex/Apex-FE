import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import { ClickAwayListener } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import startCase from "lodash.startcase";
import React from "react";
import { Column } from "react-data-griddex";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import Approval from "../../../Application/Components/Approval/Approval";
import Author from "../../../Application/Components/Author/Author";
import BaseButtons from "../../../Application/Components/BaseButtons/BaseButtons";
import apexGridCheckbox from "../../../Application/Components/Checkboxes/ApexGridCheckbox";
import DialogOneCancelButtons from "../../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import {
  IApexEditor,
  IApexEditorRow,
} from "../../../Application/Components/Editors/ApexEditor";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../../Application/Components/Export/ExcelExportTable";
import Saved from "../../../Application/Components/Saved/Saved";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import ApexGrid from "../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ISize } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../Application/Components/Table/TableButtonsTypes";
import {
  TReducer,
  TAllWorkflowProcesses,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  deleteDataByIdRequestAction,
  getTableDataByIdRequestAction,
  persistSelectedIdTitleAction,
  updateDataByIdRequestAction,
} from "../../../Application/Redux/Actions/ApplicationActions";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { getBaseEconomicsUrl } from "../../../Application/Services/BaseUrlService";
import {
  IApplicationStoredEconomicsResultsRow,
  IStoredDataProps,
} from "../../../Application/Types/ApplicationTypes";
import formatDate from "../../../Application/Utils/FormatDate";
import generateDoughnutAnalyticsData from "../../../Application/Utils/GenerateDoughnutAnalyticsData";
import { updateForecastResultsParameterAction } from "../../../Forecast/Redux/Actions/ForecastActions";
import { confirmationDialogParameters } from "../../../Application/Components/DialogParameters/ConfirmationDialogParameters";
import { DoughnutChartAnalytics } from "../../../Visualytics/Components/Charts/DoughnutChart";
import {
  fetchEconomicsTreeviewKeysRequestAction,
  fetchStoredEconomicsResultsRequestAction,
  getEconomicsResultsByIdRequestAction,
} from "../../Redux/Actions/EconomicsActions";
import { IStoredEconomicsResultsRow } from "../../Redux/State/EconomicsStateTypes";

const useStyles = makeStyles(() => ({
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
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const currentProjectIdSelector = createDeepEqualSelector(
  (state: RootState) => state.projectReducer.currentProjectId,
  (id) => id
);

const wc = "storedDataWorkflows";
const wp = "economicsResultsStored" as NonNullable<IStoredDataProps["wkPs"]>;

const economicsResultsStoredSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer[wc]["economicsResultsStored"],
  (data) => data
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

//TODO: Calculate classification data from collection
export default function StoredEcoResults({
  showChart,
  showBaseButtons,
  collectionName,
}: IStoredDataProps) {
  const reducer = "economicsReducer";
  const mainUrl = `${getBaseEconomicsUrl()}/analyses`;

  const classes = useStyles();
  const dispatch = useDispatch();

  const currentProjectId = useSelector(currentProjectIdSelector);

  const dayFormat = useSelector(dayFormatSelector);
  const monthFormat = useSelector(monthFormatSelector);
  const yearFormat = useSelector(yearFormatSelector);

  const economicsResultsStored = useSelector(economicsResultsStoredSelector);

  const [checkboxSelected, setCheckboxSelected] = React.useState(false);

  const handleCheckboxChange = (row: IStoredEconomicsResultsRow) => {
    const id = row.id as string;
    const title = row.title as string;
    const saved = row.saved as string;
    const isSaved = saved === "Saved" ? true : false;

    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("economicsReducer", {
          selectedEconomicsResultsId: id,
          selectedEconomicsResultsTitle: title,
        })
      );

    dispatch(
      updateForecastResultsParameterAction("isEconomicsResultsSaved", isSaved)
    );

    setCheckboxSelected(!checkboxSelected);
  };

  const clickAwayAction = () => {
    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("economicsReducer", {
          selectedEconomicsResultsId: "",
          selectedEconomicsResultsTitle: "",
        })
      );
  };

  const [selectedRows, setSelectedRows] = React.useState(
    () => new Set<React.Key>()
  );

  const fetchStoredRequestAction = () =>
    fetchStoredEconomicsResultsRequestAction(currentProjectId, false);

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

  const dividerPositions = [50];
  const isCustomComponent = false;

  const columns: Column<IStoredEconomicsResultsRow>[] = [
    { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
    ApexGridCheckboxColumn,
    {
      key: "actions",
      name: "ACTIONS",
      editable: false,
      formatter: ({ row }) => {
        const sn = row.sn as number;
        const title = row.title as string;
        const id = row.economicsResultsId as string;
        const deleteUrl = `${mainUrl}/${id}`;

        const editedRow = rows[sn - 1];
        const editorData = [
          {
            name: "title",
            title: "ECONOMICS RESULTS TITLE",
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

        return (
          <ApexFlexContainer>
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
                            fetchStoredEconomicsResultsRequestAction(
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
                )
              }
            />
            <MenuOpenOutlinedIcon
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
    // {
    //   key: "saved",
    //   name: "STATUS",
    //   editable: false,
    //   resizable: true,
    //   formatter: ({ row }) => {
    //     return <Saved savedText={row.saved} />;
    //   },
    //   width: 100,
    // },
    {
      key: "title",
      name: "ECONOMICS RESULTS TITLE",
      editable: false,
      resizable: true,
      width: 300,
    },
    {
      key: "analyis",
      name: "ANALYSIS",
      editable: false,
      resizable: true,
      formatter: ({ row }) => {
        let analysisTitle = "";
        if (Array.isArray(row.analysis)) {
          analysisTitle = row.analysis.map((a) => startCase(a)).join(", ");
        } else {
          analysisTitle = startCase(row.analysis);
        }
        return (
          <ApexFlexContainer justifyContent="flex-start">
            {analysisTitle}
          </ApexFlexContainer>
        );
      },
      width: 200,
    },
    {
      key: "devScenarios",
      name: "DEVELOPMENT SCENARIOS",
      editable: false,
      resizable: true,
      formatter: ({ row }) => {
        return (
          <ApexFlexContainer justifyContent="flex-start">
            {row.devScenarios?.join(", ")}
          </ApexFlexContainer>
        );
      },
      width: 250,
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

  const snStoredData = economicsResultsStored.map(
    (row: IApplicationStoredEconomicsResultsRow, i: number) => ({
      sn: i + 1,
      economicsResultsId: row.id,
      title: row.title,
      description: row.description,
      devScenarios: row.developmentScenariosAnalysis,
      analysis: row.analysisName,
      saved: row.saved,
      sensitivities: row.hasSensitivities ? "Utilized" : "None",
      approval: "Not Started",
      author: { avatarUrl: "", name: "None" },
      approvers: [{ avatarUrl: "", name: "" }],
      createdOn: row.createdAt,
      modifiedOn: row.createdAt,
    })
  ) as IStoredEconomicsResultsRow[];

  const [rows, setRows] = React.useState(snStoredData);

  const rowsTitlesString = rows.map((row) => row.title).join();
  const rowsDescriptionsString = rows.map((row) => row.description).join();

  const exportColumns = columns
    .filter(
      (column) =>
        !["actions", "select_control_key"].includes(column.key.toLowerCase())
    )
    .map((column) => ({
      label: column.name,
      value: column.key,
    })) as IExcelSheetData<IStoredEconomicsResultsRow>["columns"];

  const exportTableProps = {
    fileName: "StoredForecastResults",
    tableData: {
      Template: {
        data: rows,
        columns: exportColumns,
      },
    },
  } as IExcelExportTable<IStoredEconomicsResultsRow>;

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <ExcelExportTable<IStoredEconomicsResultsRow> {...exportTableProps} />
    ),
  };

  const chartData = React.useRef(
    generateDoughnutAnalyticsData(rows, "approval")
  );

  React.useEffect(() => {
    setRows(snStoredData);
  }, [snStoredData.length, rowsTitlesString, rowsDescriptionsString]);

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
                  getEconomicsResultsByIdRequestAction(
                    true,
                    "/apex/economics/viewresults/plotchartsTables"
                  )
                );
              },
              () =>
                dispatch(
                  fetchEconomicsTreeviewKeysRequestAction(
                    false,
                    "plotChartsTree"
                  )
                ),
            ]}
          />
        </ApexFlexContainer>
      )}
    </div>
  );
}
