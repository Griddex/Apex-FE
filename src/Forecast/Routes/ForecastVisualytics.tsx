import { makeStyles } from "@material-ui/core/styles";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ContextDrawer from "../../Application/Components/Drawers/ContextDrawer";
import IconButtonWithTooltip from "../../Application/Components/IconButtons/IconButtonWithTooltip";
import NoData from "../../Application/Components/Visuals/NoData";
import { showContextDrawerAction } from "../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { extrudeSaveForecastRun } from "../../Network/Components/DialogParameters/ExtrudeSaveForecastRun";
import { ChartFormatAggregatorContextProvider } from "../../Visualytics/Components/Contexts/ChartFormatAggregatorContext";
import LineChartFormatAggregator from "../../Visualytics/Components/FormatAggregators/LineChartFormatAggregator";
import ChartButtons from "../../Visualytics/Components/Menus/ChartButtons";
import { IChartButtonsProps } from "../../Visualytics/Components/Menus/ChartButtonsTypes";
import ChartSelectionMenu from "../../Visualytics/Components/Menus/ChartSelectionMenu";
import ForecastChartDataPanel from "../Common/ForecastChartDataPanel";
import ForecastSelectChart from "../Common/ForecastSelectChart";
import ForecastVariableButtonsMenu from "../Components/Menus/ForecastVariableButtonsMenu";
import ForecastChartTitlePlaque from "../Components/TitlePlaques/ForecastChartTitlePlaque";
import { forecastPlotChartsOptions } from "../Data/ForecastData";
import {
  putSelectChartOptionAction,
  removeCurrentForecastAction,
  transformForecastResultsChartDataAction,
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

  const classes = useStyles();
  const dispatch = useDispatch();

  const componentRef = React.useRef();

  const { showContextDrawer, expandContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  const { isForecastResultsLoading, selectedForecastChartOption } = useSelector(
    (state: RootState) => state.forecastReducer
  );

  const { data: forecastResults } = useSelector(
    (state: RootState) => state.forecastReducer[wc][ch]
  );

  const { xValueCategories } = useSelector(
    (state: RootState) => state.forecastReducer
  );

  //console.log("xValueCategories: ", xValueCategories);

  const chartType = selectedForecastChartOption.value;
//forecastResults.map((_, i) => i + 2020)
  const transformChartResultsPayload = {
    ...transformForecastResultsChartDataAction(),
    payload: {
      forecastResults,
      xValueCategories,
      lineOrScatter: chartType === "lineChart" ? "line" : "scatter",
      isYear: true,
    },
  };

  const chartButtons: IChartButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <div style={{ display: "flex" }}>
        <ChartSelectionMenu
          chartOptions={forecastPlotChartsOptions}
          selectedChartOptionTitle="selectedForecastChartOption"
          putChartOptionAction={
            forecastResults.length > 0
              ? (chartOption: ISelectOption) => {
                  const payload = {
                    ...transformChartResultsPayload,
                    payload: {
                      ...transformChartResultsPayload["payload"],
                      chartType: chartOption.value,
                    },
                  };

                  dispatch(
                    putSelectChartOptionAction(
                      reducer,
                      chartOption,
                      transformForecastResultsChartDataAction,
                      payload
                    )
                  );
                }
              : (chartOption: ISelectOption) => {}
          }
          transformChartResultsAction={transformForecastResultsChartDataAction}
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

  const renderChartFormatAggregator = (chartType: string) => {
    if (chartType === "stackedAreaChart") {
      return <div>StackedArea</div>;
    } else if (chartType === "lineChart") {
      return (
        <LineChartFormatAggregator
          basePath={basePath}
          updateParameterAction={updateForecastResultsParameterAction}
          chartType="lineChart"
        />
      );
    } else {
      return <div>No Format</div>;
    }
  };

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
              <NoData />
            ) : (
              <ForecastSelectChart />
            )}
          </div>
        )}
      </div>
      {showContextDrawer && (
        <ContextDrawer>
          {() => (
            <ChartFormatAggregatorContextProvider reducer={reducer}>
              {expandContextDrawer ? (
                renderChartFormatAggregator(chartType as string)
              ) : (
                <div />
              )}
            </ChartFormatAggregatorContextProvider>
          )}
        </ContextDrawer>
      )}
    </div>
  );
};

export default React.memo(ForecastVisualytics);
