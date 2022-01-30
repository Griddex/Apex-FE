import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import makeStyles from "@mui/styles/makeStyles";
import { Resizable } from "re-resizable";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import { createSelectorCreator, defaultMemoize } from "reselect";
import IconButtonWithTooltip from "../../../../Application/Components/IconButtons/IconButtonWithTooltip";
import NoSelectionPlaceholder from "../../../../Application/Components/PlaceHolders/NoSelectionPlaceholder";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import { showContextDrawerAction } from "../../../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import {
  TChartStory,
  TChartTypes,
} from "../../../../Visualytics/Components/Charts/ChartTypes";
import ChartButtons from "../../../../Visualytics/Components/Menus/ChartButtons";
import { IChartButtonsProps } from "../../../../Visualytics/Components/Menus/ChartButtonsTypes";
import ChartSelectionMenu from "../../../../Visualytics/Components/Menus/ChartSelectionMenu";
import { putSelectChartOptionAction } from "../../../../Visualytics/Redux/Actions/VisualyticsActions";
import EconomicsChartTitlePlaque from "../../../Components/TitlePlaques/EconomicsChartTitlePlaque";
import {
  economicsPlotChartsOptions,
  economicsSecondaryPlotChartsOptions,
} from "../../../Data/EconomicsData";
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
  chartContent: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 5,
    height: "100%",
    width: "100%",
    backgroundColor: "#FFF",
    border: `1px solid ${theme.palette.grey[200]}`,
    maxWidth: "90%",
  },
  plotChart: {
    height: "100%",
    width: "100%",
    position: "relative",
  },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
const currentChartStorySelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.currentChartStory,
  (data) => data
);

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
const selectedEconomicsPlotChartOptionSelector = createDeepEqualSelector(
  (state: RootState) => state.economicsReducer.selectedEconomicsPlotChartOption,
  (data) => data
);

const EconomicsPlotChartsVisualytics = () => {
  const reducer = "economicsReducer";
  const wc = "economicsChartsWorkflows";
  const wp = "economicsPlotCharts";

  const dispatch = useDispatch();
  const classes = useStyles();
  const componentRef = React.useRef();

  const [selectedZ, setSelectedZ] = React.useState("");
  const [openContextWindow, setOpenContextWindow] = React.useState(false);

  const currentChartStory = useSelector(currentChartStorySelector);

  const showContextDrawer = useSelector(showContextDrawerSelector);
  const plotChartsResults = useSelector(plotChartsResultsSelector);
  const xValueCategories = useSelector(xValueCategoriesSelector);

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
          reducer={reducer}
          chartStory="primary"
          secondaryChartStory="secondary"
          chartOptions={economicsPlotChartsOptions}
          chartSecondaryOptions={economicsSecondaryPlotChartsOptions}
          initialChartIndex={1}
          initialSecondaryChartIndex={2}
          putChartOptionAction={
            plotChartsResults.length > 0
              ? (chartOption: ISelectOption) => {
                  const payload = {
                    reducer: "economicsReducer",
                    workflowCategory: wc,
                    chartOption,
                    chartType: chartOption.value,
                    chartStory: "primary",
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
          putChartSecondaryOptionAction={
            plotChartsResults.length > 0
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
                      "selectedEconomicsPlotSecondaryChartOption",
                    collateBy: "yValue",
                  };

                  dispatch(putSelectChartOptionAction(payload));
                }
              : (chartOption: ISelectOption) => {
                  dispatch(
                    updateEconomicsParameterAction(
                      "selectedEconomicsPlotSecondaryChartOption",
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

    dispatch(
      updateEconomicsParameterAction(
        "economicsChartsWorkflows.commonChartProps.axisLeft.legend",
        ""
      )
    );

    dispatch(
      updateEconomicsParameterAction(
        "economicsChartsWorkflows.commonChartProps.axisBottom.legend",
        ""
      )
    );
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
          <EconomicsPlotChartsDataPanel
            selectedZ={selectedZ}
            setSelectedZ={React.useCallback(setSelectedZ, [])}
            chartStory={currentChartStory}
          />
        </Resizable>

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
              return chartType !== "Select Chart..." ? (
                <div className={classes.plotChart}>
                  <EconomicsPlotChartsSelectChart
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
          currentThresholdTitle={"plotChartsHeatMapThresholdData"}
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
