import { makeStyles, Typography, useTheme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import Approval from "../../Application/Components/Approval/Approval";
import Approvers from "../../Application/Components/Approvers/Approvers";
import Author from "../../Application/Components/Author/Author";
import apexGridCheckbox from "../../Application/Components/Checkboxes/ApexGridCheckbox";
import ApexGridMoreActionsContextMenu from "../../Application/Components/ContextMenus/ApexGridMoreActionsContextMenu";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../Application/Components/Export/ExcelExportTable";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import { ApexGrid } from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { ReducersType } from "../../Application/Components/Workflows/WorkflowTypes";
import { deleteDataByIdRequestAction } from "../../Application/Redux/Actions/ApplicationActions";
import { showDialogAction } from "../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { getBaseForecastUrl } from "../../Application/Services/BaseUrlService";
import {
  IStoredDataProps,
  IStoredDataRow,
} from "../../Application/Types/ApplicationTypes";
import formatDate from "../../Application/Utils/FormatDate";
import ForecastParametersMoreActionsPopover from "../../Forecast/Components/Popovers/ForecastParametersMoreActionsPopover";
import { confirmationDialogParameters } from "../../Import/Components/DialogParameters/ConfirmationDialogParameters";
import { IUnitSettingsData } from "../../Settings/Redux/State/UnitSettingsStateTypes";
import DoughnutChart, {
  DoughnutChartAnalytics,
} from "../../Visualytics/Components/Charts/DoughnutChart";
import { extrudeForecastParametersDPs } from "../Components/DialogParameters/EditForecastParametersDialogParameters";
import { extrudeDialogParameters } from "../Components/DialogParameters/ShowPrioritizationDialogParameters";
import DeclineParametersType from "../Components/Indicators/DeclineParametersType";
import CreateForecastParametersButton from "../Components/Menus/CreateForecastParametersButton";
import {
  fetchStoredForecastingParametersRequestAction,
  getDeclineParametersByIdRequestAction,
  getProductionPrioritizationByIdRequestAction,
  updateNetworkParameterAction,
} from "../Redux/Actions/NetworkActions";
import {
  declineParametersStoredWithSN,
  cloneDeclineParameter,
} from "../Utils/TransformDeclineParameters";

import { extrudeStoredDataDPs } from "../Components/DialogParameters/EditDeclineParametersDialogParameters";
import { IBackendDeclineParametersRow } from "../Components/Dialogs/StoredNetworksDialogTypes";

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

export default function StoredDeclineCurveParameters({
  showChart,
  isAllDeclineParameters,
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
  const wp = "forecastingParametersStored";

  const componentRef = React.useRef();

  const { currentProjectId } = useSelector(
    (state: RootState) => state.projectReducer
  );

  console.log("isAllDeclineParameters: ", isAllDeclineParameters);

  const reducer = "networkReducer";
  const mainUrl = `${getBaseForecastUrl()}`; ///forecast-parameters
  const collectionName = "declineParameters";

  const [selectedRows, setSelectedRows] = React.useState(new Set<React.Key>());
  const [sRow, setSRow] = React.useState(-1);

  const { dayFormat, monthFormat, yearFormat } = useSelector(
    (state: RootState) => state.unitSettingsReducer
  ) as IUnitSettingsData;

  const { declineParametersStored, forecastingParametersStored } = useSelector(
    (state: RootState) => state.networkReducer[wc]
  );

  const { selectedForecastingParametersId } = useSelector(
    (state: RootState) => state.networkReducer
  );

  const selectedforecastingParametersStored = forecastingParametersStored.find(
    (row: any) => {
      if (row.id == selectedForecastingParametersId) {
        return row;
      }
    }
  );

  console.log(
    "selectedForecastingParametersId: ",
    selectedForecastingParametersId
  );
  console.log(
    "selectedforecastingParametersStored: ",
    selectedforecastingParametersStored
  );

  let declineParametersFiltered: any = [];

  if (isAllDeclineParameters == true) {
    declineParametersFiltered = declineParametersStored.map((row: any) => {
      return row;
    });
  } else {
    console.log("filter seen");
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

  console.log("declineParametersFiltered: ", declineParametersFiltered);

  const snTransStoredData = declineParametersStoredWithSN(
    declineParametersFiltered as IBackendDeclineParametersRow[]
  );

  //console.log("snTransStoredData: ", snTransStoredData);
  const { selectedForecastInputDeckId, selectedForecastInputDeckTitle } =
    useSelector((state: RootState) => state.inputReducer);

  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const handleCheckboxChange = (row: IStoredDataRow) => {
    dispatch(
      updateNetworkParameterAction("selectedDeclineParametersId", row.id)
    );

    dispatch(
      updateNetworkParameterAction("selectedDeclineParametersTitle", row.title)
    );

    setCheckboxSelected(!checkboxSelected);
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
          //console.log("row: ", row);
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
                const clonedRow = cloneDeclineParameter(
                  currentRow,
                  rows.length
                );
                /* console.log(
                  "Logged output --> ~ file: StoredDeclineCurveParameters.tsx ~ line 324 ~ generateColumns ~ clonedRow",
                  clonedRow
                ); */

                const newRows = [...declineParametersStored, clonedRow];
                dispatch(
                  updateNetworkParameterAction(
                    "storedDataWorkflows.declineParametersStored",
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
              component={ForecastParametersMoreActionsPopover}
              data={importMoreActionsData}
            >
              <MenuOpenOutlinedIcon />
            </ApexGridMoreActionsContextMenu>
          );

          const EditCommand = (
            <EditOutlinedIcon
              /* style={style as CSSProperties} */
              onClick={() => {
                const isCreateOrEdit = true;
                const wellDeclineParamtersId = currentRow.id;
                const wellDeclineParamtersTitle = currentRow.title;
                dispatch(
                  getDeclineParametersByIdRequestAction(
                    "inputReducer" as ReducersType,
                    isCreateOrEdit,
                    wellDeclineParamtersId as string,
                    wellDeclineParamtersTitle as string,
                    currentSN,
                    currentRow as any
                  )
                );
              }}
            />
          );

          const DeleteCommand = (
            <DeleteOutlinedIcon
              /* style={style as CSSProperties} */
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
        key: "status",
        name: "STATUS",
        editable: false,
        resizable: true,
        width: 100,
      },
      {
        key: "title",
        name: "DECLINE PARAMETERS TITLE",
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

  React.useEffect(() => {
    const updatedStoredData = declineParametersStoredWithSN(
      declineParametersFiltered as IBackendDeclineParametersRow[]
    );
    setRows(updatedStoredData);
  }, [declineParametersStored.length]);

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
            <ApexGrid<IStoredDataRow, ITableButtonsProps>
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
