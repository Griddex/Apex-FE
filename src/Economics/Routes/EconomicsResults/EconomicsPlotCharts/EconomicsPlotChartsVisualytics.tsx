import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { ControlPosition } from "react-draggable";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import IconButtonWithTooltip from "../../../../Application/Components/IconButtons/IconButtonWithTooltip";
import NoSelectionPlaceholder from "../../../../Application/Components/PlaceHolders/NoSelectionPlaceholder";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import { showContextDrawerAction } from "../../../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import { TChartTypes } from "../../../../Visualytics/Components/Charts/ChartTypes";
import ChartButtons from "../../../../Visualytics/Components/Menus/ChartButtons";
import { IChartButtonsProps } from "../../../../Visualytics/Components/Menus/ChartButtonsTypes";
import ChartSelectionMenu from "../../../../Visualytics/Components/Menus/ChartSelectionMenu";
import { putSelectChartOptionAction } from "../../../../Visualytics/Redux/Actions/VisualyticsActions";
import EconomicsChartTitlePlaque from "../../../Components/TitlePlaques/EconomicsChartTitlePlaque";
import { economicsPlotChartsOptions } from "../../../Data/EconomicsData";
import { updateEconomicsParameterAction } from "../../../Redux/Actions/EconomicsActions";

const VisualyticsContext = React.lazy(
  () =>
    import(
      "../../../../Visualytics/Components/ContextDrawers/VisualyticsContext"
    )
);
const EconomicsPlotChartsDataPanel = React.lazy(
  () => import("./EconomicsPlotChartsDataPanel")
);
const EconomicsPlotChartsSelectChart = React.lazy(
  () => import("./EconomicsPlotChartsSelectChart")
);

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
  selectChart: {
    height: `calc(100% - 50px)`,
    width: "100%",
  },
  plotChart: {
    height: "100%",
    width: "100%",
  },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const showContextDrawerSelector = createDeepEqualSelector(
  (state: RootState) => state.layoutReducer.showContextDrawer,
  (drawer) => drawer
);
const plotChartsResultsSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.plotChartsResults,
  (data) => data
);
const xValueCategoriesSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.xValueCategories,
  (data) => data
);
const showPlotChartsCategoriesSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.showPlotChartsCategories,
  (data) => data
);
const selectedEconomicsPlotChartOptionSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.selectedEconomicsPlotChartOption,
  (data) => data
);

const EconomicsPlotChartsVisualytics = () => {
  const reducer = "economicsReducer";
  const wc = "economicsChartsWorkflows";
  const wp = "economicsPlotCharts";

  const dispatch = useDispatch();
  const theme = useTheme();
  const componentRef = React.useRef();

  const [selectedZ, setSelectedZ] = React.useState("");
  const [openContextWindow, setOpenContextWindow] = React.useState(false);

  const showContextDrawer = useSelector(showContextDrawerSelector);
  const plotChartsResults = useSelector(plotChartsResultsSelector);
  const xValueCategories = useSelector(xValueCategoriesSelector);
  const showPlotChartsCategories = useSelector(
    showPlotChartsCategoriesSelector
  );
  const selectedEconomicsPlotChartOption = useSelector(
    selectedEconomicsPlotChartOptionSelector
  );

  const chartType = selectedEconomicsPlotChartOption.value;

  const basePath = `${wc}.commonChartProps`;

  const chartButtons: IChartButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <div style={{ display: "flex" }}>
        <ChartSelectionMenu
          chartOptions={economicsPlotChartsOptions}
          initialChartIndex={2}
          putChartOptionAction={
            plotChartsResults.length > 0
              ? (chartOption: ISelectOption) => {
                  const payload = {
                    reducer: "economicsReducer",
                    workflowCategory: wc,
                    chartOption,
                    chartType: chartOption.value,
                    xValueCategories,
                    lineOrScatter:
                      chartOption.value === "lineChart"
                        ? "lineChart"
                        : "scatterChart",
                    isYear: true,
                    selectedChartOptionTitle:
                      "selectedEconomicsPlotChartOption",
                    collateBy: "yValue",
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
          <EconomicsPlotChartsDataPanel
            selectedZ={selectedZ}
            setSelectedZ={React.useCallback(setSelectedZ, [])}
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
              marginTop: 2,
              marginRight: 40,
            }}
          >
            <EconomicsChartTitlePlaque />
            <ChartButtons {...chartButtons} />
          </div>
          <SizeMe monitorHeight refreshRate={32}>
            {({ size }) => {
              return chartType === "Select Chart..." ? (
                <NoSelectionPlaceholder
                  icon={<ArrowUpwardOutlinedIcon color="primary" />}
                  text="Select chart.."
                />
              ) : (
                <div className={classes.plotChart}>
                  <EconomicsPlotChartsSelectChart
                    width={size.width as number}
                    height={size.height as number}
                  />
                </div>
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
          updateParameterAction={React.useCallback(
            updateEconomicsParameterAction,
            []
          )}
          openContextWindow={openContextWindow}
          setOpenContextWindow={React.useCallback(setOpenContextWindow, [])}
        />
      )}
    </div>
  );
};

export default EconomicsPlotChartsVisualytics;
