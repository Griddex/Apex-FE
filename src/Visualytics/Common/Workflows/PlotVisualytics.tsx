import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { ControlPosition } from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import IconButtonWithTooltip from "../../../Application/Components/IconButtons/IconButtonWithTooltip";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import { showContextDrawerAction } from "../../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { TChartStory, TChartTypes } from "../../Components/Charts/ChartTypes";
import ChartButtons from "../../Components/Menus/ChartButtons";
import { IChartButtonsProps } from "../../Components/Menus/ChartButtonsTypes";
import ChartSelectionMenu from "../../Components/Menus/ChartSelectionMenu";
import VisualyticsChartTitlePlaque from "../../Components/TitlePlaques/VisualyticsChartTitlePlaque";
import {
  putSelectChartOptionAction,
  updateVisualyticsParameterAction,
} from "../../Redux/Actions/VisualyticsActions";
import NoSelectionPlaceholder from "../../../Application/Components/PlaceHolders/NoSelectionPlaceholder";
import { SizeMe } from "react-sizeme";
import VisualyticsContext from "../../Components/ContextDrawers/VisualyticsContext";
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
  chartPanel: {
    display: "flex",
    alignSelf: "flex-start",
    height: "100%",
    width: (props: ControlPosition) => {
      return props.x;
    },
    minWidth: 300,
    border: `1px solid ${theme.palette.grey[200]}`,
    backgroundColor: "#FFF",
    padding: 5,
  },
  chartContent: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 5,
    height: "100%",
    width: (props: ControlPosition) => {
      return `calc(100% - ${props.x}px)`;
    },
    backgroundColor: "#FFF",
    border: `1px solid ${theme.palette.grey[200]}`,
    maxWidth: "90%",
  },
  selectChart: {
    height: `calc(100% - 50px)`,
  },
  plotChart: {
    height: "100%",
    width: "100%",
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
  const theme = useTheme();
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

  const panelRef = React.useRef<HTMLDivElement>(null);
  const moveDivRef = React.useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = React.useState<ControlPosition>({
    x: 300,
    y: 0,
  });

  const classes = useStyles(mousePosition);

  const handler = React.useCallback(() => {
    function onMouseMove(e: MouseEvent) {
      setMousePosition((currentSize) => {
        return {
          x: currentSize.x + e.movementX,
          y: currentSize.y,
        };
      });
    }

    function onMouseUp() {
      moveDivRef?.current?.removeEventListener("mousemove", onMouseMove);
      moveDivRef?.current?.removeEventListener("mouseup", onMouseUp);
    }

    moveDivRef?.current?.addEventListener("mousemove", onMouseMove);
    moveDivRef?.current?.addEventListener("mouseup", onMouseUp);
  }, []);

  React.useEffect(() => {
    dispatch(showContextDrawerAction());
    setMousePosition({ x: panelRef.current?.offsetWidth as number, y: 0 });
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <div className={classes.chartBody}>
        <div className={classes.chartPanel} ref={panelRef}>
          <VisualyticsChartDataPanel
            selectedZ={selectedZ}
            setSelectedZ={setSelectedZ}
          />
        </div>
        <div
          ref={moveDivRef}
          style={{
            width: 5,
            height: "100%",
            cursor: "ew-resize",
            backgroundColor: theme.palette.grey[200],
          }}
          onMouseDown={handler}
          draggable={true}
        />

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
