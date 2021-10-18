import { useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { CSSProperties } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import Approval from "../../../../Application/Components/Approval/Approval";
import Approvers from "../../../../Application/Components/Approvers/Approvers";
import Author from "../../../../Application/Components/Author/Author";
import apexGridCheckbox from "../../../../Application/Components/Checkboxes/ApexGridCheckbox";
import ApexGridMoreActionsContextMenu from "../../../../Application/Components/ContextMenus/ApexGridMoreActionsContextMenu";
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
import {
  deleteDataByIdRequestAction,
  getTableDataByIdRequestAction,
  persistSelectedIdTitleAction,
} from "../../../../Application/Redux/Actions/ApplicationActions";
import { showDialogAction } from "../../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { getBaseEconomicsUrl } from "../../../../Application/Services/BaseUrlService";
import {
  IApplicationStoredDataRow,
  IStoredDataProps,
  IStoredDataRow,
} from "../../../../Application/Types/ApplicationTypes";
import formatDate from "../../../../Application/Utils/FormatDate";
import { confirmationDialogParameters } from "../../../../Import/Components/DialogParameters/ConfirmationDialogParameters";
import { fetchStoredForecastingParametersRequestAction } from "../../../../Network/Redux/Actions/NetworkActions";
import { IUnitSettingsData } from "../../../../Settings/Redux/State/UnitSettingsStateTypes";
import { DoughnutChartAnalytics } from "../../../../Visualytics/Components/Charts/DoughnutChart";
import {
  getEconomicsParametersByIdRequestAction,
  updateEconomicsParameterAction,
} from "../../../Redux/Actions/EconomicsActions";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const ForecastParametersMoreActionsPopover = React.lazy(
  () =>
    import(
      "../../../../Forecast/Components/Popovers/ForecastParametersMoreActionsPopover"
    )
);
const ApexGrid = React.lazy(
  () =>
    import("../../../../Application/Components/Table/ReactDataGrid/ApexGrid")
);
//<IStoredDataRow, ITableButtonsProps>

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

const unitSettingsSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer,
  (reducer) => reducer
);

export default function StoredEconomicsParametersDecks({
  showChart,
}: IStoredDataProps) {
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
  const classes = useStyles();

  const dispatch = useDispatch();
  const wc = "storedDataWorkflows";
  const wp: NonNullable<IStoredDataProps["wkPs"]> =
    "economicsParametersDeckStored";

  const currentProjectId = useSelector(currentProjectIdSelector);

  const reducer = "economicsReducer";
  const tableTitle = "Economics Parameters Table";
  const mainUrl = `${getBaseEconomicsUrl()}/parameter`;
  const collectionName =
    "commercialTechnical-fiscal-flarePenalty-gasRoyalty-oilRoyalty";

  const economicsWCSelector = createDeepEqualSelector(
    (state: RootState) => state.economicsReducer[wc],
    (wc) => wc
  );

  const { economicsParametersDeckStored } = useSelector(economicsWCSelector);

  const { dayFormat, monthFormat, yearFormat } = useSelector(
    unitSettingsSelector
  ) as IUnitSettingsData;

  const snTransStoredData: IStoredDataRow[] = formatEconomicsParameters(
    economicsParametersDeckStored
  );

  const componentRef = React.useRef();

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
          const { sn } = row;
          const currentSN = sn as number;
          const currentRow = rows[currentSN - 1];

          const title = row.title as string;
          const id = row.id as string;
          const deleteUrl = `${mainUrl}/${id}`;

          const importMoreActionsData = [
            {
              title: "Clone",
              action: () => {
                const currentRow = rows[currentSN - 1];
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
            title.toLowerCase() === "default"
              ? {
                  pointerEvents: "none",
                  color: theme.palette.grey[200],
                  backgroundColor: theme.palette.grey[400],
                }
              : {};

          const VisibilityOutlined = (
            <VisibilityOutlinedIcon
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
          );

          const ApexGridMoreActionsContext = (
            <ApexGridMoreActionsContextMenu
              component={ForecastParametersMoreActionsPopover}
              data={importMoreActionsData}
            >
              <MenuOpenOutlinedIcon />
            </ApexGridMoreActionsContextMenu>
          );

          const EditCommand = (
            <EditOutlinedIcon
              style={style as CSSProperties}
              onClick={() => {
                const isCreateOrEdit = true;
                dispatch(
                  getEconomicsParametersByIdRequestAction(
                    currentRow.id as string,
                    "economicsReducer" as ReducersType,
                    isCreateOrEdit as boolean
                  )
                );
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
                          reducer as ReducersType,
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

  React.useEffect(() => {
    const updatedStoredData = formatEconomicsParameters(
      economicsParametersDeckStored as IApplicationStoredDataRow[]
    );
    setRows(updatedStoredData);
  }, [economicsParametersDeckStored.length]);

  return (
    <div className={classes.rootStoredData}>
      {showChart && (
        <div className={classes.chart}>
          <DoughnutChartAnalytics data={chartData} willUseThemeColor={false} />
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
