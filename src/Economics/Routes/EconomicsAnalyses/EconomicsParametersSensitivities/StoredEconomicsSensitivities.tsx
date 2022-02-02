import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { Column } from "react-data-griddex";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import Author from "../../../../Application/Components/Author/Author";
import apexGridCheckbox from "../../../../Application/Components/Checkboxes/ApexGridCheckbox";
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
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import ApexGrid from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ISize } from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import {
  ReducersType,
  TAllWorkflowProcesses,
} from "../../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../../Application/Redux/Actions/ActionTypes";
import {
  deleteDataByIdRequestAction,
  getTableDataByIdRequestAction,
  updateDataByIdRequestAction,
} from "../../../../Application/Redux/Actions/ApplicationActions";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { getBaseEconomicsUrl } from "../../../../Application/Services/BaseUrlService";
import { IApplicationStoredDataRow } from "../../../../Application/Types/ApplicationTypes";
import formatDate from "../../../../Application/Utils/FormatDate";
import { confirmationDialogParameters } from "../../../../Import/Components/DialogParameters/ConfirmationDialogParameters";
import {
  fetchStoredEconomicsSensitivitiesRequestAction,
  updateEconomicsParameterAction,
} from "../../../Redux/Actions/EconomicsActions";
import { IStoredEconomicsSensitivitiesRow } from "./EconomicsParametersSensitivitiesTypes";

const useStyles = makeStyles((theme) => ({
  rootStoredData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",
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

const wc = "storedDataWorkflows";
const wp = "economicsSensitivitiesStored";

const economicsSensitivitiesStoredSelector = createDeepEqualSelector(
  (state: RootState) =>
    state.economicsReducer[wc]["economicsSensitivitiesStored"],
  (data) => data
);

export default function StoredEconomicsSensitivities() {
  const currentProjectId = useSelector(currentProjectIdSelector);

  const dayFormat = useSelector(dayFormatSelector);
  const monthFormat = useSelector(monthFormatSelector);
  const yearFormat = useSelector(yearFormatSelector);

  const reducer = "economicsReducer";
  const mainUrl = `${getBaseEconomicsUrl()}/sensitivities`;
  const collectionName = "";

  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = React.useState(new Set<React.Key>());
  const [sRow, setSRow] = React.useState(-1);

  const economicsSensitivitiesStored = useSelector(
    economicsSensitivitiesStoredSelector
  );

  const [storedEconomicsSensitivities, setStoredEconomicsSensitivities] =
    React.useState(economicsSensitivitiesStored);

  const transStoredSensitivitiesData = (
    storedEconomicsSensitivities as IApplicationStoredDataRow[]
  ).map((row, i) => ({
    sn: i + 1,
    economicsSensitivitiesId: row.id,
    approval: "Not Started",
    title: row.title,
    analysisName: row.analysisName,
    description: row.description,
    author: { avatarUrl: "", name: "None" },
    createdOn: row.createdAt,
    modifiedOn: row.createdAt,
  })) as IStoredEconomicsSensitivitiesRow[];

  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const handleCheckboxChange = (row: IStoredEconomicsSensitivitiesRow) => {
    const name = "selectedEconomicsSensitivitiesId";
    const value = row.economicsSensitivitiesId;

    dispatch(updateEconomicsParameterAction(name, value));
    setCheckboxSelected(!checkboxSelected);
  };

  const fetchStoredRequestAction = () =>
    fetchStoredEconomicsSensitivitiesRequestAction(currentProjectId, false);

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
                  reducer as ReducersType,
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

  const columns: Column<IStoredEconomicsSensitivitiesRow>[] = [
    { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
    ApexGridCheckboxColumn,
    {
      key: "actions",
      name: "ACTIONS",
      editable: false,
      formatter: ({ row }) => {
        const sn = row.sn as number;
        const title = row.economicsSensitivitiesTitle as string;
        const id = row.economicsSensitivitiesId as string;
        const deleteUrl = `${mainUrl}/${id}`;

        const editedRow = rows[sn - 1];
        const editorData = [
          {
            name: "title",
            title: "ECONOMICS SENSITIVITIES TITLE",
            value: row["economicsSensitivitiesTitle"],
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
                  actionsList: (titleDesc: Record<string, string>) =>
                    DialogOneCancelButtons(
                      [true, true],
                      [true, false],
                      [
                        unloadDialogsAction,
                        () => updateTableActionConfirmation(id)(titleDesc),
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
                            fetchStoredEconomicsSensitivitiesRequestAction(
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
                    row.economicsSensitivitiesTitle as string,
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
      key: "title",
      name: "SENSITIVITY TITLE",
      editable: false,
      resizable: true,
      width: 250,
    },
    // {
    //   key: "analysisName",
    //   name: "ANALYSIS TITLE",
    //   editable: false,
    //   resizable: true,
    //   formatter: ({ row }) => {
    //     const analysisName = row.analysisName as TEconomicsAnalysesNames;
    //     const analysisTitle = economicsAnalysesNameTitlesObj[analysisName];

    //     return <ApexFlexContainer>{analysisTitle}</ApexFlexContainer>;
    //   },
    //   width: 150,
    // },
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
            )}
          </div>
        );
      },
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
            )}
          </div>
        );
      },
    },
  ];

  const exportColumns = columns
    .filter(
      (column) =>
        !["actions", "select_control_key"].includes(column.key.toLowerCase())
    )
    .map((column) => ({
      label: column.name,
      value: column.key,
    })) as IExcelSheetData<IStoredEconomicsSensitivitiesRow>["columns"];

  const [rows, setRows] = React.useState(transStoredSensitivitiesData);

  const exportTableProps = {
    fileName: "EconomicsSensitivities",
    tableData: {
      Template: {
        data: rows,
        columns: exportColumns,
      },
    },
  } as IExcelExportTable<IStoredEconomicsSensitivitiesRow>;

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <ExcelExportTable<IStoredEconomicsSensitivitiesRow>
        {...exportTableProps}
      />
    ),
  };

  React.useEffect(() => {
    setStoredEconomicsSensitivities(economicsSensitivitiesStored);
  }, [JSON.stringify(economicsSensitivitiesStored)]);

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
      <div className={classes.table}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => <ApexGrid apexGridProps={getApexGridProps(size)} />}
        </SizeMe>
      </div>
    </div>
  );
}
