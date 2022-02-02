import makeStyles from "@mui/styles/makeStyles";
import zipObject from "lodash.zipobject";
import React from "react";
import isEqual from "react-fast-compare";
import { useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../Application/Components/Export/ExcelExportTable";
import ApexGrid from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ISize } from "../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { IStoredDataProps } from "../../Application/Types/ApplicationTypes";
import generateDoughnutAnalyticsData from "../../Application/Utils/GenerateDoughnutAnalyticsData";
import { DoughnutChartAnalytics } from "../../Visualytics/Components/Charts/DoughnutChart";
import ForecastAggregationLevelButtonsMenu from "../Components/Menus/ForecastAggregationLevelButtonsMenu";
import ForecastAggregationTypeButtonsMenu from "../Components/Menus/ForecastAggregationTypeButtonsMenu";
import ForecastVariableButtonsMenu from "../Components/Menus/ForecastVariableButtonsMenu";
import { IStoredForecastResultsRow } from "../Redux/ForecastState/ForecastStateTypes";
import { forecastVariablesMap } from "../Utils/ForecastVariables";

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
}: IStoredDataProps) {
  const classes = useStyles();
  const componentRef = React.useRef();

  const qualityAssuranceResults = useSelector(qualityAssuranceResultsSelector);

  const [selectedRows, setSelectedRows] = React.useState(
    () => new Set<React.Key>()
  );

  let columnKeys = ["SN"];
  let forecastVariableTitle: string;
  if (qualityAssuranceResults.length > 0) {
    columnKeys = Object.keys(qualityAssuranceResults[0]).map((v) =>
      v.toUpperCase()
    );

    const qualityAssuranceResultsFirstRow = qualityAssuranceResults[0];
    const forecastVariableKey = Object.keys(
      qualityAssuranceResultsFirstRow
    ).find((k) => k.toLowerCase() === "variable") as string;

    const forecastVariableName =
      qualityAssuranceResultsFirstRow[forecastVariableKey];
    forecastVariableTitle = Object.keys(forecastVariablesMap).find(
      (k) =>
        forecastVariablesMap[k].toLowerCase() ===
        forecastVariableName.toLowerCase()
    ) as string;
  }

  const rows = qualityAssuranceResults.map((row) => {
    const updatedRow = { ...row, Variable: forecastVariableTitle };
    return zipObject(columnKeys, Object.values(updatedRow) as string[]);
  });

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

  const chartData = React.useRef(generateDoughnutAnalyticsData(rows, "field"));

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
