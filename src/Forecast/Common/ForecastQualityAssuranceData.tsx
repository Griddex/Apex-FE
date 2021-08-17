import { ClickAwayListener, makeStyles, useTheme } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import TableChartOutlinedIcon from "@material-ui/icons/TableChartOutlined";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import Approval from "../../Application/Components/Approval/Approval";
import Author from "../../Application/Components/Author/Author";
import BaseButtons from "../../Application/Components/BaseButtons/BaseButtons";
import apexGridCheckbox from "../../Application/Components/Checkboxes/ApexGridCheckbox";
import DialogOneCancelButtons from "../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import {
  IApexEditor,
  IApexEditorRow,
} from "../../Application/Components/Editors/ApexEditor";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../Application/Components/Export/ExcelExportTable";
import Saved from "../../Application/Components/Saved/Saved";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import { ApexGrid } from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import {
  ReducersType,
  TAllWorkflowProcesses,
} from "../../Application/Components/Workflows/WorkflowTypes";
import {
  deleteDataByIdRequestAction,
  getTableDataByIdRequestAction,
  persistSelectedIdTitleAction,
} from "../../Application/Redux/Actions/ApplicationActions";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import getBaseForecastUrl from "../../Application/Services/BaseUrlService";
import {
  IApplicationStoredForecastResultsRow,
  IStoredDataProps,
} from "../../Application/Types/ApplicationTypes";
import formatDate from "../../Application/Utils/FormatDate";
import { confirmationDialogParameters } from "../../Import/Components/DialogParameters/ConfirmationDialogParameters";
import { updateNetworkParameterAction } from "../../Network/Redux/Actions/NetworkActions";
import { IUnitSettingsData } from "../../Settings/Redux/State/UnitSettingsStateTypes";
import DoughnutChart from "../../Visualytics/Components/Charts/DoughnutChart";
import ForecastAggregationLevelButtonsMenu from "../Components/Menus/ForecastAggregationLevelButtonsMenu";
import ForecastAggregationTypeButtonsMenu from "../Components/Menus/ForecastAggregationTypeButtonsMenu";
import ForecastVariableButtonsMenu from "../Components/Menus/ForecastVariableButtonsMenu";
import {
  fetchForecastTreeviewKeysRequestAction,
  fetchStoredForecastingResultsRequestAction,
  getForecastDataByIdRequestAction,
  updateForecastResultsParameterAction,
} from "../Redux/Actions/ForecastActions";
import { IStoredForecastResultsRow } from "../Redux/ForecastState/ForecastStateTypes";
/*  import { IApexEditor } from "../../Application/Components/Editors/ApexEditor";
import ForecastAggregationLevelButtonsMenu from "../Components/Menus/ForecastAggregationLevelButtonsMenu";
import ForecastAggregationTypeButtonsMenu from "../Components/Menus/ForecastAggregationTypeButtonsMenu";
import ForecastVariableButtonsMenu from "../Components/Menus/ForecastVariableButtonsMenu"; */
import { kron, varianceDependencies } from "mathjs";


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
export default function ForecastQualityAssuranceData({
  showChart,
  showBaseButtons,
  collectionName,
}: IStoredDataProps) {
  const reducer = "forecastReducer";
  const mainUrl = `${getBaseForecastUrl()}`;

  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const componentRef = React.useRef();

  const wc = "storedDataWorkflows";
  const wp = "forecastResultsQualityAssurance";

  const { currentProjectId } = useSelector(
    (state: RootState) => state.projectReducer
  );

  const chartData = [
    { id: "A", value: 10, color: theme.palette.primary.main },
    { id: "B", value: 20, color: theme.palette.success.main },
    { id: "C", value: 30, color: theme.palette.secondary.main },
  ];

  const { dayFormat, monthFormat, yearFormat } = useSelector(
    (state: RootState) => state.unitSettingsReducer
  ) as IUnitSettingsData;

 /*  const { forecastResultsStored } = useSelector(
    (state: RootState) => state.forecastReducer[wc]
  ); */

  const { forecastResults, timeData } = useSelector(
    (state: RootState) => state.forecastReducer
  );

  console.log("forecastResults: ", forecastResults);
  console.log("timeData: ", timeData);

  const [storedforecastResults, setStoredforecastResults] = React.useState(
    forecastResults
  );

  const [shouldUpdate, setShouldUpdate] = React.useState(false);

  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const handleCheckboxChange = (row: IStoredForecastResultsRow) => {
    const id = row.forecastResultsId as string;
    const title = row.forecastResultsTitle as string;
    const saved = row.saved as string;
    const isSaved = saved === "Saved" ? true : false;
    const networkId = row.networkId as string;

    persistSelectedIdTitleAction &&
      dispatch(
        persistSelectedIdTitleAction("forecastReducer", {
          selectedForecastingResultsId: id,
          selectedForecastingResultsTitle: title,
        })
      );

    dispatch(
      updateForecastResultsParameterAction("isForecastResultsSaved", isSaved)
    );

    dispatch(updateNetworkParameterAction("selectedNetworkId", networkId));

    setCheckboxSelected(!checkboxSelected);
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
  const getForecastDate = (row:any, i:number) => {
    const keys = Object.keys(row);
    const rowData = timeData[i];
    const dateValues = rowData[keys[0]];
    //console.log("dateValues: ", dateValues);
    const forecastDate = `${dateValues.day}/${dateValues.month}/${dateValues.year}`;
    return forecastDate;
  };

  const forecastResultCount = forecastResults.length;

  const rowsReversed = forecastResults.map(
    (row: any, i: number) => ({
      sn: forecastResultCount - i,
      date: getForecastDate(row, i),
      ...row
    })
  ) as any[];

  const rows = rowsReversed.reverse();

  //const [rows, setRows] = React.useState(snStoredData);
  console.log("rows: ", rows);
  let columnKeys = ["SN"];
  if(rows.length > 0){
    const originalColumnKeys = Object.keys(rows[0]);
    columnKeys = [...originalColumnKeys];
  }
  
console.log("columnKeys: ", columnKeys);
  const columns = columnKeys.map((k) => {
    const column = {
      key: k,
      name: k,
      editable: false,
      resizable: true,
      width: k.toLowerCase().trim() === "sn" ? 50 : "auto",
    };
    return column;
  });

  //const columns = React.useMemo(() => generateColumns(), [generateColumns]);


  const exportColumns = columns
    .filter(
      (column) =>
        !["actions", "select_control_key"].includes(column.key.toLowerCase())
    )
    .map((column) => ({
      label: column.name,
      value: column.key,
    })) as IExcelSheetData<IStoredForecastResultsRow>["columns"];

  const exportTableProps = {
    fileName: "StoredForecastResults",
    tableData: {
      Template: {
        data: rows,
        columns: exportColumns,
      },
    },
  } as IExcelExportTable<IStoredForecastResultsRow>;

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <div style={{ display: "flex" }}>
        <ForecastAggregationLevelButtonsMenu />
        <ForecastAggregationTypeButtonsMenu />
        <ForecastVariableButtonsMenu />
        <ExcelExportTable<IStoredForecastResultsRow> {...exportTableProps} />
      </div>
    ),
    componentRef,
  };

  React.useEffect(() => {
    console.log("seen")
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  /* React.useEffect(() => {
    setStoredforecastResults(storedforecastResults);
    dispatch(
      updateForecastResultsParameterAction(
        "forecastResults",
        storedforecastResults
      )
    );
  }, [forecastResults]); */

  const [sRow, setSRow] = React.useState(-1);
  //onRowsChange={setRows}

  return (
    <div className={classes.rootStoredData}>
      {showChart && (
        <div className={classes.chart}>
          <DoughnutChart data={chartData} willUseThemeColor={false} />
        </div>
      )}
      <ClickAwayListener onClickAway={() => setSRow && setSRow(-1)}>
        <div className={classes.table}>
          <SizeMe monitorHeight refreshRate={32}>
            {({ size }) => (
              <ApexGrid<IStoredForecastResultsRow, ITableButtonsProps>
                columns={columns}
                rows={rows}
                tableButtons={tableButtons}
                newTableRowHeight={35}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                selectedRow={sRow}
                onSelectedRowChange={setSRow}
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
            buttonTexts={["Reset", "Display"]}
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
                  getForecastDataByIdRequestAction(
                    "forecastResultsVisualytics",
                    true,
                    "/apex/forecast/forecastdata"
                  )
                );
              },
              () =>
                dispatch(
                  fetchForecastTreeviewKeysRequestAction(
                    reducer,
                    "forecastAssurance"
                  )
                ),
            ]}
          />
        </ApexFlexContainer>
      )}
    </div>
  );
}
