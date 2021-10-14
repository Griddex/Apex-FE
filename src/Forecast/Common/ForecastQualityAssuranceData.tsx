import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import { ClickAwayListener, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
import BaseButtons from "../../Application/Components/BaseButtons/BaseButtons";
import ExcelExportTable, {
  IExcelExportTable,
  IExcelSheetData,
} from "../../Application/Components/Export/ExcelExportTable";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import { ApexGrid } from "../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { ITableButtonsProps } from "../../Application/Components/Table/TableButtonsTypes";
import { persistSelectedIdTitleAction } from "../../Application/Redux/Actions/ApplicationActions";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { getBaseForecastUrl } from "../../Application/Services/BaseUrlService";
import { IStoredDataProps } from "../../Application/Types/ApplicationTypes";
import { updateNetworkParameterAction } from "../../Network/Redux/Actions/NetworkActions";
import { DoughnutChartAnalytics } from "../../Visualytics/Components/Charts/DoughnutChart";
import ForecastAggregationLevelButtonsMenu from "../Components/Menus/ForecastAggregationLevelButtonsMenu";
import ForecastAggregationTypeButtonsMenu from "../Components/Menus/ForecastAggregationTypeButtonsMenu";
import ForecastVariableButtonsMenu from "../Components/Menus/ForecastVariableButtonsMenu";
import {
  fetchForecastTreeviewKeysRequestAction,
  getForecastDataByIdRequestAction,
  updateForecastResultsParameterAction,
} from "../Redux/Actions/ForecastActions";
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

const qualityAssuranceResultsSelector = createDeepEqualSelector(
  (state: RootState) => state.forecastReducer.qualityAssuranceResults,
  (workflow) => workflow
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

  const rows = qualityAssuranceResults.map((row: any, i: number) => ({
    ...row,
  })) as any[];

  let columnKeys = ["SN"];
  if (rows.length > 0) columnKeys = Object.keys(rows[0]);

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
    })) as IExcelSheetData<IStoredForecastResultsRow>["columns"];

  const exportTableProps = {
    fileName: "QualityAssuranceResults",
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
    console.log("seen");
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
