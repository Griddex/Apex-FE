import { ClickAwayListener, makeStyles, useTheme } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import TableChartOutlinedIcon from "@material-ui/icons/TableChartOutlined";
import startCase from "lodash.startcase";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
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
import { ApexGrid } from "../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableButtonsProps } from "../../../Application/Components/Table/TableButtonsTypes";
import {
  ReducersType,
  TAllWorkflowProcesses,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import {
  deleteDataByIdRequestAction,
  getTableDataByIdRequestAction,
  persistSelectedIdTitleAction,
} from "../../../Application/Redux/Actions/ApplicationActions";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { getBaseEconomicsUrl } from "../../../Application/Services/BaseUrlService";
import {
  IApplicationStoredEconomicsResultsRow,
  IStoredDataProps,
} from "../../../Application/Types/ApplicationTypes";
import formatDate from "../../../Application/Utils/FormatDate";
import { updateForecastResultsParameterAction } from "../../../Forecast/Redux/Actions/ForecastActions";
import { confirmationDialogParameters } from "../../../Import/Components/DialogParameters/ConfirmationDialogParameters";
import { IUnitSettingsData } from "../../../Settings/Redux/State/UnitSettingsStateTypes";
import DoughnutChart, {
  DoughnutChartAnalytics,
} from "../../../Visualytics/Components/Charts/DoughnutChart";
import {
  fetchEconomicsTreeviewKeysRequestAction,
  fetchStoredEconomicsResultsRequestAction,
  getEconomicsResultsByIdRequestAction,
} from "../../Redux/Actions/EconomicsActions";
import { IStoredEconomicsResultsRow } from "../../Redux/State/EconomicsStateTypes";

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

//TODO: Calculate classification data from collection
export default function StoredEcoResults({
  showChart,
  showBaseButtons,
  shouldRunAggregation,
  collectionName,
}: IStoredDataProps) {
  const reducer = "economicsReducer";
  const mainUrl = `${getBaseEconomicsUrl()}`;

  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  //TODO: Calculate classification data from collection
  const chartData = [
    {
      id: "A",
      label: "A",
      value: 2400,
      color: theme.palette.primary.main,
    },
    {
      id: "B",
      label: "B",
      value: 4567,
      color: theme.palette.success.main,
    },
    {
      id: "C",
      label: "C",
      value: 1398,
      color: theme.palette.secondary.main,
    },
  ];

  const wc = "storedDataWorkflows";
  const wp = "economicsResultsStored" as NonNullable<IStoredDataProps["wkPs"]>;

  const { currentProjectId } = useSelector(
    (state: RootState) => state.projectReducer
  );

  const componentRef = React.useRef();

  const { dayFormat, monthFormat, yearFormat } = useSelector(
    (state: RootState) => state.unitSettingsReducer
  ) as IUnitSettingsData;

  const { economicsResultsStored } = useSelector(
    (state: RootState) => state.economicsReducer[wc]
  );
  const [storedEconomicsResults, setStoredEconomicsResults] = React.useState(
    economicsResultsStored
  );
  const [shouldUpdate, setShouldUpdate] = React.useState(false);

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

  const ApexGridCheckboxColumn = apexGridCheckbox({
    shouldExecute: true,
    shouldDispatch: false,
    apexGridCheckboxFxn: handleCheckboxChange,
  });

  const dividerPositions = [50];

  const generateColumns = () => {
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
          const id = row.id as string;
          const deleteUrl = `${mainUrl}/${id}`;

          const editedRow = rows[sn - 1];
          const editorData = [
            {
              name: "title",
              title: "ECONOMICS RESULTS TITLE",
              value: row["title"],
              editorType: "input",
            },
            {
              name: "description",
              title: "Description",
              value: row["description"],
              editorType: "textArea",
            },
          ] as IApexEditorRow[];

          const apexEditorProps = {
            editorData,
            editedRow,
            dividerPositions,
          } as Partial<IApexEditor>;

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
                    maxWidth: "xs",
                    iconType: "edit",
                    apexEditorProps,
                    actionsList: () =>
                      DialogOneCancelButtons(
                        [true, true],
                        [true, false],
                        [
                          unloadDialogsAction,
                          //Captured variable
                          //solve with componentRef
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
                      reducer as ReducersType,
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

    return columns;
  };
  const columns = React.useMemo(() => generateColumns(), [generateColumns]);

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

  const exportColumns = generateColumns()
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

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  React.useEffect(() => {
    setStoredEconomicsResults(storedEconomicsResults);
  }, [storedEconomicsResults]);

  const [sRow, setSRow] = React.useState(-1);

  return (
    <div className={classes.rootStoredData}>
      {showChart && (
        <div className={classes.chart}>
          <DoughnutChartAnalytics data={chartData} willUseThemeColor={false} />
        </div>
      )}
      <ClickAwayListener onClickAway={() => setSRow && setSRow(-1)}>
        <div className={classes.table}>
          <SizeMe monitorHeight refreshRate={32}>
            {({ size }) => (
              <ApexGrid<IStoredEconomicsResultsRow, ITableButtonsProps>
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
