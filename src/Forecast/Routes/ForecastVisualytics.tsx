import { makeStyles } from "@material-ui/core/styles";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContextDrawer from "../../Application/Components/Drawers/ContextDrawer";
import IconButtonWithTooltip from "../../Application/Components/IconButtons/IconButtonWithTooltip";
import NoData from "../../Application/Components/Visuals/NoData";
import { showContextDrawerAction } from "../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../Application/Redux/Reducers/AllReducers";
import { updateEconomicsParameterAction } from "../../Economics/Redux/Actions/EconomicsActions";
import { extrudeSaveForecastRun } from "../../Network/Components/DialogParameters/ExtrudeSaveForecastRun";
import { TChartTypes } from "../../Visualytics/Components/Charts/ChartTypes";
import ChartButtons from "../../Visualytics/Components/Menus/ChartButtons";
import { IChartButtonsProps } from "../../Visualytics/Components/Menus/ChartButtonsTypes";
import ChartSelectionMenu from "../../Visualytics/Components/Menus/ChartSelectionMenu";
import ForecastChartDataPanel from "../Common/ForecastChartDataPanel";
import ForecastSelectChart from "../Common/ForecastSelectChart";
import ForecastAggregationTypeButtonsMenu from "../Components/Menus/ForecastAggregationTypeButtonsMenu";
import ForecastVariableButtonsMenu from "../Components/Menus/ForecastVariableButtonsMenu";
import ForecastChartTitlePlaque from "../Components/TitlePlaques/ForecastChartTitlePlaque";
import {
  removeCurrentForecastAction,
  updateForecastResultsParameterAction,
} from "../Redux/Actions/ForecastActions";
import { IForecastRoutes } from "./ForecastRoutesTypes";

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

const ForecastVisualytics = ({ wrkflwCtgry, wrkflwPrcss }: IForecastRoutes) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const componentRef = React.useRef();

  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );
  const { isForecastResultsLoading } = useSelector(
    (state: RootState) => state.forecastReducer
  );

  const { selectedForecastChartOption } = useSelector(
    (state: RootState) => state.forecastReducer
  );

  const chartType = selectedForecastChartOption.value;
  const forecastPlotCharts = [
    {
      value: "Select Chart...",
      label: "Select Chart...",
    },
    {
      value: "stackedAreaChart",
      label: "Stacked Area",
    },
    {
      value: "lineChart",
      label: "Line",
    },
  ];
  const chartButtons: IChartButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <div style={{ display: "flex" }}>
        <ChartSelectionMenu
          chartOptions={forecastPlotCharts}
          selectedChartType={selectedForecastChartOption.value as string}
          updateAction={updateForecastResultsParameterAction}
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

  useEffect(() => {
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
        <ContextDrawer>{() => <div>Format</div>}</ContextDrawer>
      )}
    </div>
  );
};

export default React.memo(ForecastVisualytics);
