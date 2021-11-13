import { useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import zipObject from "lodash.zipobject";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../Application/Components/Export/ExcelExportTable";
import ApexGrid from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { getBaseForecastUrl } from "../../Application/Services/BaseUrlService";
import { IStoredDataProps } from "../../Application/Types/ApplicationTypes";
import { DoughnutChartAnalytics } from "../../Visualytics/Components/Charts/DoughnutChart";
import ForecastAggregationLevelButtonsMenu from "../Components/Menus/ForecastAggregationLevelButtonsMenu";
import ForecastAggregationTypeButtonsMenu from "../Components/Menus/ForecastAggregationTypeButtonsMenu";
import ForecastVariableButtonsMenu from "../Components/Menus/ForecastVariableButtonsMenu";
import { IStoredForecastResultsRow } from "../Redux/ForecastState/ForecastStateTypes";

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
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const qualityAssuranceResultsSelector = createDeepEqualSelector(
  (state: RootState) => state.forecastReducer.qualityAssuranceResults,
  (data) => data
);

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
  const componentRef = React.useRef();

  const wc = "storedDataWorkflows";
  const wp = "forecastResultsQualityAssurance";

  const qualityAssuranceResults = useSelector(qualityAssuranceResultsSelector);

  const [selectedRows, setSelectedRows] = React.useState(
    () => new Set<React.Key>()
  );

  let columnKeys = ["SN"];
  if (qualityAssuranceResults.length > 0)
    columnKeys = Object.keys(qualityAssuranceResults[0]).map((v) =>
      v.toUpperCase()
    );
  const rows = qualityAssuranceResults.map((row) =>
    zipObject(columnKeys, Object.values(row) as string[])
  );

  const columns = columnKeys.map((k) => {
    const column = {
      key: k,
      name: k,
      editable: false,
      resizable: true,
      width: "auto",
    };
    return column;
  });

  const exportColumns = columns
    .filter(
      (column) =>
        !["actions", "select_control_key"].includes(column.key.toLowerCase())
    )
    .map((column) => ({
      label: column.name,
      value: column.key,
    })) as IExcelSheetData<any>["columns"];

  const exportTableProps = {
    fileName: "QualityAssuranceResults",
    tableData: {
      Template: {
        data: rows,
        columns: exportColumns,
      },
    },
  } as IExcelExportTable<any>;

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
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  const [sRow, setSRow] = React.useState(-1);

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
