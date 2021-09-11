import { makeStyles, useTheme } from "@material-ui/core/styles";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import React from "react";
import { ControlPosition } from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import ContextDrawer from "../../../../Application/Components/Drawers/ContextDrawer";
import IconButtonWithTooltip from "../../../../Application/Components/IconButtons/IconButtonWithTooltip";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import NoData from "../../../../Application/Components/Visuals/NoData";
import { showContextDrawerAction } from "../../../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import XYChartCategories from "../../../../Visualytics/Components/ChartCategories/XYChartCategories";
import { TChartTypes } from "../../../../Visualytics/Components/Charts/ChartTypes";
import { ChartFormatAggregatorContextProvider } from "../../../../Visualytics/Components/Contexts/ChartFormatAggregatorContext";
import ChartFormatAggregator from "../../../../Visualytics/Components/FormatAggregators/ChartFormatAggregator";
import ChartButtons from "../../../../Visualytics/Components/Menus/ChartButtons";
import { IChartButtonsProps } from "../../../../Visualytics/Components/Menus/ChartButtonsTypes";
import ChartSelectionMenu from "../../../../Visualytics/Components/Menus/ChartSelectionMenu";
import { putSelectChartOptionAction } from "../../../../Visualytics/Redux/Actions/VisualyticsActions";
import EconomicsChartTitlePlaque from "../../../Components/TitlePlaques/EconomicsChartTitlePlaque";
import { economicsPlotChartsOptions } from "../../../Data/EconomicsData";
import {
  removeEconomicsChartCategoryAction,
  updateEconomicsChartCategoryAction,
  updateEconomicsParameterAction,
} from "../../../Redux/Actions/EconomicsActions";
import EconomicsPlotChartsDataPanel from "./EconomicsPlotChartsDataPanel";
import EconomicsPlotChartsSelectChart from "./EconomicsPlotChartsSelectChart";

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

const EconomicsPlotChartsVisualytics = () => {
  const reducer = "economicsReducer";
  const wc = "economicsChartsWorkflows";
  const wp = "economicsResultsPlotCharts";
  const ch = "stackedAreaChart";

  const dispatch = useDispatch();
  const theme = useTheme();

  const componentRef = React.useRef();

  const { showContextDrawer, expandContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  const {
    xValueCategories,
    showPlotChartsCategories,
    selectedEconomicsPlotChartOption,
  } = useSelector((state: RootState) => state.economicsReducer);

  const [showCategories, setShowCategories] = React.useState(
    showPlotChartsCategories
  );

  const chartType = selectedEconomicsPlotChartOption.value;

  const { chartData } = useSelector(
    (state: RootState) => state.economicsReducer[wc][ch]
  );

  const chartButtons: IChartButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <div style={{ display: "flex" }}>
        <ChartSelectionMenu
          chartOptions={economicsPlotChartsOptions}
          putChartOptionAction={
            chartData.length > 0
              ? (chartOption: ISelectOption) => {
                  const payload = {
                    reducer: "economicsReducer",
                    workflowCategory: wc,
                    defaultChart: ch,
                    chartOption,
                    chartType: chartOption.value,
                    xValueCategories,
                    lineOrScatter:
                      chartOption.value === "lineChart" ? "line" : "scatter",
                    isYear: true,
                    selectedChartOptionTitle:
                      "selectedEconomicsPlotChartOption",
                  };

                  dispatch(putSelectChartOptionAction(payload));
                }
              : (chartOption: ISelectOption) => {
                  dispatch(
                    updateEconomicsParameterAction(
                      "selectedEconomicsPlotChartOption",
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
    // x: panelRef.current?.offsetWidth as number,
    x: 300,
    y: 0,
  });

  const classes = useStyles(mousePosition);

  const handler = React.useCallback(() => {
    function onMouseMove(e: MouseEvent) {
      console.log(
        "Logged output --> ~ file: EconomicsPlotChartsVisualytics.tsx ~ line 120 ~ onMouseMove ~ e",
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

  const basePath = `${wc}.commonChartProps`;

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
          <EconomicsPlotChartsDataPanel />
        </div>
        {showCategories && (
          <XYChartCategories
            xCategoryOptionTitle="plotChartsVariableXOptions"
            yCategoryOptionTitle="plotChartsVariableYOptions"
            disableX={false}
            disableY={false}
            updateAction={updateEconomicsChartCategoryAction}
            removeAction={removeEconomicsChartCategoryAction}
          />
        )}

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
            <EconomicsChartTitlePlaque />
            <ChartButtons {...chartButtons} />
          </div>
          {chartType === "Select Chart..." ? (
            <NoData />
          ) : (
            <EconomicsPlotChartsSelectChart />
          )}
        </div>
      </div>
      {showContextDrawer && (
        <ContextDrawer>
          {() =>
            expandContextDrawer ? (
              <ChartFormatAggregatorContextProvider reducer={reducer}>
                <ChartFormatAggregator
                  basePath={basePath}
                  updateParameterAction={updateEconomicsParameterAction}
                  chartType={chartType as TChartTypes}
                />
              </ChartFormatAggregatorContextProvider>
            ) : (
              <div />
            )
          }
        </ContextDrawer>
      )}
    </div>
  );
};

export default EconomicsPlotChartsVisualytics;
