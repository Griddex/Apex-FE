import { makeStyles, useTheme } from "@material-ui/core/styles";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import React from "react";
import { ControlPosition } from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import ContextDrawer from "../../../Application/Components/Drawers/ContextDrawer";
import IconButtonWithTooltip from "../../../Application/Components/IconButtons/IconButtonWithTooltip";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import NoData from "../../../Application/Components/Visuals/NoData";
import { showContextDrawerAction } from "../../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { TChartTypes } from "../../Components/Charts/ChartTypes";
import { ChartFormatAggregatorContextProvider } from "../../Components/Contexts/ChartFormatAggregatorContext";
import ChartFormatAggregator from "../../Components/FormatAggregators/ChartFormatAggregator";
import ChartButtons from "../../Components/Menus/ChartButtons";
import { IChartButtonsProps } from "../../Components/Menus/ChartButtonsTypes";
import ChartSelectionMenu from "../../Components/Menus/ChartSelectionMenu";
import VisualyticsChartTitlePlaque from "../../Components/TitlePlaques/VisualyticsChartTitlePlaque";
import {
  putSelectChartOptionAction,
  updateVisualyticsParameterAction,
} from "../../Redux/Actions/VisualyticsActions";
import PlotChartsSelectChart from "../PlotChartsSelectChart";
import VisualyticsChartDataPanel from "../VisualyticsChartDataPanel";

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
}));

const PlotChartsVisualytics = () => {
  const reducer = "visualyticsReducer";
  const wc = "visualyticsChartsWorkflows";
  const wp = "visualyticsResultsPlotCharts";
  const ch = "stackedAreaChart";

  const dispatch = useDispatch();
  const theme = useTheme();

  const componentRef = React.useRef();

  const { expandContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  const {
    visualyticsResults,
    xValueCategories,
    showPlotChartsCategories,
    selectedVisualyticsOption,
  } = useSelector((state: RootState) => state.visualyticsReducer);

  const [showCategories, setShowCategories] = React.useState(
    showPlotChartsCategories
  );

  const chartType = selectedVisualyticsOption.value;
  const visualyticsPlotCharts = [
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

  const basePath = `${wc}.commonChartProps`;

  const chartButtons: IChartButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <div style={{ display: "flex" }}>
        <ChartSelectionMenu
          chartOptions={visualyticsPlotCharts}
          putChartOptionAction={
            visualyticsResults.length > 0
              ? (chartOption: ISelectOption) => {
                  const payload = {
                    reducer: "visualyticsReducer",
                    chartType: chartOption.value,
                    xValueCategories: [1, 2, 3, 4].map((_, i) => i + 2020),
                    lineOrScatter:
                      chartType === "lineChart" ? "line" : "scatter",
                    isYear: true,
                    selectedChartOptionTitle: "selectedVisualyticsChartOption",
                    defaultChart: ch,
                    workflowCategory: wc,
                  };

                  dispatch(putSelectChartOptionAction(payload));
                }
              : (chartOption: ISelectOption) => {}
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
    // x: panelRef.current?.offsetWidth as number,
    x: 300,
    y: 0,
  });

  const classes = useStyles(mousePosition);

  const handler = React.useCallback(() => {
    function onMouseMove(e: MouseEvent) {
      console.log(
        "Logged output --> ~ file: PlotChartsVisualytics.tsx ~ line 120 ~ onMouseMove ~ e",
        e
      );
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
        <div
          className={classes.chartPanel}
          // style={{ width: mousePosition.x, left: mousePosition.x }}
          ref={panelRef}
        >
          <VisualyticsChartDataPanel />
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
          {chartType === "Select Chart..." ? (
            <NoData />
          ) : (
            <PlotChartsSelectChart />
          )}
        </div>
      </div>
      {expandContextDrawer && (
        <ContextDrawer>
          {() => (
            <ChartFormatAggregatorContextProvider reducer={reducer}>
              <ChartFormatAggregator
                basePath={basePath}
                updateParameterAction={updateVisualyticsParameterAction}
                chartType={chartType as TChartTypes}
              />
            </ChartFormatAggregatorContextProvider>
          )}
        </ContextDrawer>
      )}
    </div>
  );
};

export default PlotChartsVisualytics;
