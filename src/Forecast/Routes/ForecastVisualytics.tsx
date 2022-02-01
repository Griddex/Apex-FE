import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import makeStyles from "@mui/styles/makeStyles";
import { Resizable } from "re-resizable";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import IconButtonWithTooltip from "../../Application/Components/IconButtons/IconButtonWithTooltip";
import NoSelectionPlaceholder from "../../Application/Components/PlaceHolders/NoSelectionPlaceholder";
import { showDialogAction } from "../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { confirmationDialogParameters } from "../../Import/Components/DialogParameters/ConfirmationDialogParameters";
import { extrudeSaveForecastRun } from "../../Network/Components/DialogParameters/ExtrudeSaveForecastRun";
import { TChartTypes } from "../../Visualytics/Components/Charts/ChartTypes";
import VisualyticsContext from "../../Visualytics/Components/ContextDrawers/VisualyticsContext";
import ChartButtons from "../../Visualytics/Components/Menus/ChartButtons";
import { IChartButtonsProps } from "../../Visualytics/Components/Menus/ChartButtonsTypes";
import ChartSelectionMenu from "../../Visualytics/Components/Menus/ChartSelectionMenu";
import { putSelectChartOptionAction } from "../../Visualytics/Redux/Actions/VisualyticsActions";
import ForecastChartDataPanel from "../Common/ForecastChartDataPanel";
import ForecastSelectChart from "../Common/ForecastSelectChart";
import ForecastVariableButtonsMenu from "../Components/Menus/ForecastVariableButtonsMenu";
import ForecastChartTitlePlaque from "../Components/TitlePlaques/ForecastChartTitlePlaque";
import { forecastPlotChartsOptions } from "../Data/ForecastData";
import {
  updateForecastResultsParameterAction,
  updateForecastResultsParametersAction,
} from "../Redux/Actions/ForecastActions";
import { ISelectOption } from "./../../Application/Components/Selects/SelectItemsType";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: 0,
  },
  chartBody: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  chartPanel: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    height: "100%",
    width: 300,
    border: `1px solid ${theme.palette.grey[200]}`,
    backgroundColor: "#FFF",
    padding: 5,
  },
  chartContent: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 5,
    height: "100%",
    width: "90%",
    backgroundColor: "#FFF",
    border: `1px solid ${theme.palette.grey[200]}`,
    maxWidth: "90%",
    overflow: "auto",
  },
  plotChart: {
    height: "100%",
    width: "100%",
  },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const showContextDrawerSelector = createDeepEqualSelector(
  (state: RootState) => state.layoutReducer.showContextDrawer,
  (reducer) => reducer
);

const isForecastResultsLoadingSelector = createDeepEqualSelector(
  (state: RootState) => state.forecastReducer.isForecastResultsLoading,
  (data) => data
);

const isForecastResultsSavedSelector = createDeepEqualSelector(
  (state: RootState) => state.forecastReducer.isForecastResultsSaved,
  (data) => data
);

const selectedForecastChartOptionSelector = createDeepEqualSelector(
  (state: RootState) => state.forecastReducer.selectedForecastChartOption,
  (data) => data
);

const xValueCategoriesSelector = createDeepEqualSelector(
  (state: RootState) => state.forecastReducer.xValueCategories,
  (data) => data
);

const wc = "forecastChartsWorkflows";
const ch = "stackedAreaChart";

const chartSelector = createDeepEqualSelector(
  (state: RootState) => state.forecastReducer[wc]["primary"][ch]["chartData"],
  (chart) => chart
);

const ForecastVisualytics = () => {
  const reducer = "forecastReducer";
  const classes = useStyles();
  const dispatch = useDispatch();

  const componentRef = React.useRef();

  const [openContextWindow, setOpenContextWindow] = React.useState(false);

  const showContextDrawer = useSelector(showContextDrawerSelector);

  const isForecastResultsLoading = useSelector(
    isForecastResultsLoadingSelector
  );
  const isForecastResultsSaved = useSelector(isForecastResultsSavedSelector);
  const selectedForecastChartOption = useSelector(
    selectedForecastChartOptionSelector
  );
  const xValueCategories = useSelector(xValueCategoriesSelector);

  const chartType = selectedForecastChartOption.value;

  const chartData = useSelector(chartSelector);

  const chartButtons: IChartButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <div style={{ display: "flex" }}>
        <ChartSelectionMenu
          reducer={reducer}
          chartStory="primary"
          secondaryChartStory="secondary"
          chartOptions={forecastPlotChartsOptions}
          initialChartIndex={1}
          putChartOptionAction={
            (chartData as any[]).length > 0
              ? (chartOption: ISelectOption) => {
                  const payload = {
                    reducer: "forecastReducer",
                    workflowCategory: wc,
                    defaultChart: ch,
                    chartOption,
                    chartType: chartOption.value,
                    xValueCategories,
                    lineOrScatter:
                      chartOption.value === "lineChart"
                        ? "lineChart"
                        : "scatterChart",
                    isYear: true,
                    selectedChartOptionTitle: "selectedForecastChartOption",
                  };

                  dispatch(putSelectChartOptionAction(payload));
                }
              : (chartOption: ISelectOption) => {
                  dispatch(
                    updateForecastResultsParameterAction(
                      "selectedForecastChartOption",
                      chartOption
                    )
                  );
                }
          }
        />
        <ForecastVariableButtonsMenu />
        <IconButtonWithTooltip
          toolTipKey="saveToolTip"
          toolTipTitle="Save"
          toolTipPlacement="bottom-end"
          icon={() => <SaveOutlinedIcon />}
          action={extrudeSaveForecastRun}
          isDisabled={isForecastResultsSaved}
        />
        <IconButtonWithTooltip
          toolTipKey="resetToolTip"
          toolTipTitle="Reset"
          toolTipPlacement="bottom-end"
          icon={() => <RotateLeftOutlinedIcon />}
          action={() => {
            const dialogParameters = confirmationDialogParameters(
              "ForecastCharts_Reset_Confirmation",
              "Reset Confirmation",
              "textDialog",
              `Do you want to reset current forecast chart results?`,
              true,
              false,
              () => {
                dispatch(
                  updateForecastResultsParametersAction({
                    selectedForecastingResultsId: "",
                    selectedForecastingResultsTitle: "Select...",
                    selectedForecastingResultsDescription: "",
                    isForecastResultsSaved: false,
                  })
                );
                dispatch(
                  updateForecastResultsParameterAction(
                    "forecastChartsWorkflows.commonChartProps.axisLeft.legend",
                    ""
                  )
                );
                dispatch(
                  updateForecastResultsParameterAction(
                    "forecastChartsWorkflows.commonChartProps.axisBottom.legend",
                    ""
                  )
                );
                dispatch(
                  updateForecastResultsParameterAction(
                    "qualityAssuranceResults",
                    []
                  )
                );
              },
              "Reset",
              "reset"
            );

            dispatch(showDialogAction(dialogParameters));
          }}
        />
      </div>
    ),
    componentRef,
  };

  const basePath = `${wc}.commonChartProps`;

  return (
    <div className={classes.root}>
      <div className={classes.chartBody}>
        {/* <div className={classes.chartPanel}> */}
        <Resizable
          // style={style}
          defaultSize={{
            width: 300,
            height: "100%",
          }}
        >
          <ForecastChartDataPanel />
        </Resizable>
        {/* </div> */}
        {isForecastResultsLoading ? (
          <div>Forecast results loading</div>
        ) : (
          <div className={classes.chartContent}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                marginTop: 2,
              }}
            >
              <ForecastChartTitlePlaque />
              <ChartButtons {...chartButtons} />
            </div>

            <SizeMe monitorHeight refreshRate={32}>
              {({ size }) => {
                return chartType !== "Select Chart..." ? (
                  <div className={classes.plotChart}>
                    <ForecastSelectChart
                      width={size.width as number}
                      height={size.height as number}
                      indexBy={"Year"}
                    />
                  </div>
                ) : (
                  <NoSelectionPlaceholder
                    icon={<ArrowUpwardOutlinedIcon color="primary" />}
                    text="Select chart.."
                  />
                );
              }}
            </SizeMe>
          </div>
        )}
      </div>
      {showContextDrawer && (
        <VisualyticsContext
          reducer={reducer}
          chartType={chartType as TChartTypes}
          basePath={basePath}
          updateParameterAction={updateForecastResultsParameterAction}
          openContextWindow={openContextWindow}
          setOpenContextWindow={setOpenContextWindow}
        />
      )}
    </div>
  );
};

export default React.memo(ForecastVisualytics);
