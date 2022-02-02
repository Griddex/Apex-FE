import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import makeStyles from "@mui/styles/makeStyles";
import { Resizable } from "re-resizable";
import React from "react";
import { ControlPosition } from "react-draggable";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import IconButtonWithTooltip from "../../../Application/Components/IconButtons/IconButtonWithTooltip";
import NoSelectionPlaceholder from "../../../Application/Components/PlaceHolders/NoSelectionPlaceholder";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import { showContextDrawerAction } from "../../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { TChartStory, TChartTypes } from "../../Components/Charts/ChartTypes";
import VisualyticsContext from "../../Components/ContextDrawers/VisualyticsContext";
import ChartButtons from "../../Components/Menus/ChartButtons";
import { IChartButtonsProps } from "../../Components/Menus/ChartButtonsTypes";
import ChartSelectionMenu from "../../Components/Menus/ChartSelectionMenu";
import VisualyticsChartTitlePlaque from "../../Components/TitlePlaques/VisualyticsChartTitlePlaque";
import {
  putSelectChartOptionAction,
  updateVisualyticsParameterAction,
} from "../../Redux/Actions/VisualyticsActions";
import VisualyticsChartDataPanel from "../VisualyticsChartDataPanel";
import VisualyticsSelectChart from "../VisualyticsSelectChart";

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
    overflow: "auto",
  },
  chartContent: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 5,
    height: "100%",
    width: "100%",
    backgroundColor: "#FFF",
    border: `1px solid ${theme.palette.grey[200]}`,
    maxWidth: "90%",
    overflow: "auto",
  },
  plotChart: {
    height: "100%",
    width: "100%",
    position: "relative",
  },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const currentChartStorySelector = createDeepEqualSelector(
  (state: RootState) => state.visualyticsReducer.currentChartStory,
  (data) => data
);

const showContextDrawerSelector = createDeepEqualSelector(
  (state: RootState) => state.layoutReducer.showContextDrawer,
  (data) => data
);

const visualyticsSelector = createDeepEqualSelector(
  (state: RootState) => state.visualyticsReducer,
  (reducer) => reducer
);

const PlotVisualytics = () => {
  console.log("Plotvisualyticssssssssssssssssssssssss");

  const reducer = "visualyticsReducer";
  const wc = "visualyticsChartsWorkflows";
  const wp = "visualyticsResultsPlotCharts";

  const dispatch = useDispatch();
  const classes = useStyles();
  const componentRef = React.useRef();

  const [selectedZ, setSelectedZ] = React.useState("");
  const [openContextWindow, setOpenContextWindow] = React.useState(false);

  const currentChartStory = useSelector(currentChartStorySelector);
  const showContextDrawer = useSelector(showContextDrawerSelector);

  const {
    visualyticsResults,
    xValueCategories,
    selectedVisualyticsChartOption,
  } = useSelector(visualyticsSelector);

  const chartType = selectedVisualyticsChartOption.value;
  const visualyticsPlotCharts = [
    {
      value: "stackedAreaChart",
      label: "Stacked Area",
    },
    {
      value: "lineChart",
      label: "Line",
    },
    {
      value: "doughnutChart",
      label: "Doughnut",
    },
    {
      value: "barChart",
      label: "Bar",
    },
    {
      value: "scatterChart",
      label: "Scatter",
    },
    {
      value: "radarChart",
      label: "Radar",
    },
    {
      value: "heatMapChart",
      label: "Heatmap",
    },
  ];

  const visualyticsSecondaryPlotCharts = [
    {
      value: "stackedAreaChart",
      label: "Stacked Area",
    },
    {
      value: "lineChart",
      label: "Line",
    },
    {
      value: "barChart",
      label: "Bar",
    },
    {
      value: "scatterChart",
      label: "Scatter",
    },
  ];

  const basePath = `${wc}.commonChartProps`;

  const chartButtons: IChartButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <div style={{ display: "flex" }}>
        <ChartSelectionMenu
          reducer={reducer}
          chartStory="primary"
          secondaryChartStory="secondary"
          chartOptions={visualyticsPlotCharts}
          chartSecondaryOptions={visualyticsSecondaryPlotCharts}
          initialChartIndex={1}
          initialSecondaryChartIndex={1}
          putChartOptionAction={
            visualyticsResults.length > 0
              ? (chartOption: ISelectOption) => {
                  const payload = {
                    reducer: "visualyticsReducer",
                    workflowCategory: wc,
                    chartOption,
                    chartType: chartOption.value,
                    chartStory: "primary",
                    xValueCategories,
                    lineOrScatter:
                      chartOption.value === "lineChart"
                        ? "lineChart"
                        : "scatterChart",
                    selectedChartOptionTitle: "selectedVisualyticsChartOption",
                    collateBy: "yValue",
                  };

                  dispatch(putSelectChartOptionAction(payload));
                }
              : (chartOption: ISelectOption) => {
                  dispatch(
                    updateVisualyticsParameterAction(
                      "selectedVisualyticsChartOption",
                      chartOption
                    )
                  );
                }
          }
          putChartSecondaryOptionAction={
            visualyticsResults.length > 0
              ? (chartOption: ISelectOption) => {
                  const payload = {
                    reducer: "visualyticsReducer",
                    workflowCategory: wc,
                    chartOption,
                    chartType: chartOption.value,
                    chartStory: "secondary",
                    xValueCategories,
                    lineOrScatter:
                      chartOption.value === "lineChart"
                        ? "lineChart"
                        : "scatterChart",
                    selectedChartOptionTitle:
                      "selectedVisualyticsSecondaryChartOption",
                    collateBy: "yValue",
                  };

                  dispatch(putSelectChartOptionAction(payload));
                }
              : (chartOption: ISelectOption) => {
                  dispatch(
                    updateVisualyticsParameterAction(
                      "selectedVisualyticsSecondaryChartOption",
                      chartOption
                    )
                  );
                }
          }
        />
        <IconButtonWithTooltip
          toolTipKey="saveToolTip"
          toolTipTitle="Save"
          toolTipPlacement="bottom-end"
          icon={() => <SaveOutlinedIcon />}
        />
        <IconButtonWithTooltip
          toolTipKey="removeToolTip"
          toolTipTitle="Remove"
          toolTipPlacement="bottom-end"
          icon={() => <RemoveOutlinedIcon />}
        />
      </div>
    ),
    componentRef,
  };

  React.useEffect(() => {
    dispatch(showContextDrawerAction());
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.chartBody}>
        <Resizable
          defaultSize={{
            width: 300,
            height: "100%",
          }}
        >
          <VisualyticsChartDataPanel
            selectedZ={selectedZ}
            setSelectedZ={setSelectedZ}
            chartStory={currentChartStory}
          />
        </Resizable>

        <div className={classes.chartContent}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              height: 50,
              marginTop: 2,
              marginRight: 40,
            }}
          >
            <VisualyticsChartTitlePlaque />
            <ChartButtons {...chartButtons} />
          </div>

          <SizeMe monitorHeight refreshRate={32}>
            {({ size }) => {
              return chartType !== "Select Chart..." ? (
                <div className={classes.plotChart}>
                  <VisualyticsSelectChart
                    width={size.width as number}
                    height={size.height as number}
                    chartStory={currentChartStory as TChartStory}
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
      </div>
      {showContextDrawer && (
        <VisualyticsContext
          reducer={reducer}
          chartType={chartType as TChartTypes}
          basePath={basePath}
          updateParameterAction={updateVisualyticsParameterAction}
          openContextWindow={openContextWindow}
          setOpenContextWindow={setOpenContextWindow}
        />
      )}
    </div>
  );
};

export default PlotVisualytics;
