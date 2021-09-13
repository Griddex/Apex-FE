import { makeStyles, useTheme } from "@material-ui/core/styles";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButtonWithTooltip from "../../Application/Components/IconButtons/IconButtonWithTooltip";
import NoSelectionPlaceholder from "../../Application/Components/PlaceHolders/NoSelectionPlaceholder";
import { showContextDrawerAction } from "../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
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
  removeCurrentForecastAction,
  updateForecastResultsParameterAction,
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
  },
}));

const ForecastVisualytics = () => {
  const reducer = "forecastReducer";
  const wc = "forecastChartsWorkflows";
  const ch = "stackedAreaChart";

  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();

  const componentRef = React.useRef();

  const [openContextWindow, setOpenContextWindow] = React.useState(false);

  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  const { isForecastResultsLoading, selectedForecastChartOption } = useSelector(
    (state: RootState) => state.forecastReducer
  );

  const chartType = selectedForecastChartOption.value;

  const { chartData } = useSelector(
    (state: RootState) => state.forecastReducer[wc][ch]
  );

  const { xValueCategories } = useSelector(
    (state: RootState) => state.forecastReducer
  );

  const chartButtons: IChartButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <div style={{ display: "flex" }}>
        <ChartSelectionMenu
          chartOptions={forecastPlotChartsOptions}
          putChartOptionAction={
            chartData.length > 0
              ? (chartOption: ISelectOption) => {
                  const payload = {
                    reducer: "forecastReducer",
                    workflowCategory: wc,
                    defaultChart: ch,
                    chartOption,
                    chartType: chartOption.value,
                    xValueCategories,
                    lineOrScatter:
                      chartOption.value === "lineChart" ? "line" : "scatter",
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
          toolTipTitle="Save Forecast"
          toolTipPlacement="bottom-end"
          icon={() => <SaveOutlinedIcon />}
          action={() => dispatch(extrudeSaveForecastRun())}
        />
        <IconButtonWithTooltip
          toolTipKey="removeToolTip"
          toolTipTitle="Remove Forecast"
          toolTipPlacement="bottom-end"
          icon={() => <RemoveOutlinedIcon />}
          action={() => dispatch(removeCurrentForecastAction)}
        />
      </div>
    ),
    componentRef,
  };

  const basePath = `${wc}.commonChartProps`;

  React.useEffect(() => {
    dispatch(showContextDrawerAction());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <div className={classes.chartBody}>
        <div className={classes.chartPanel}>
          <ForecastChartDataPanel />
        </div>
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
            {chartType === "Select Chart..." ? (
              <NoSelectionPlaceholder
                icon={<ArrowUpwardOutlinedIcon color="primary" />}
                text="Select a chart.."
              />
            ) : (
              <ForecastSelectChart />
            )}
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
