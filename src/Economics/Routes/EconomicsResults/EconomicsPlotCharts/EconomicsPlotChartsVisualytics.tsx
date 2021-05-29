import { makeStyles, useTheme } from "@material-ui/core/styles";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import React from "react";
import { ControlPosition } from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import ContextDrawer from "../../../../Application/Components/Drawers/ContextDrawer";
import IconButtonWithTooltip from "../../../../Application/Components/IconButtons/IconButtonWithTooltip";
import ApexFlexStyle from "../../../../Application/Components/Styles/ApexFlexStyle";
import { showContextDrawerAction } from "../../../../Application/Redux/Actions/LayoutActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import ChartCategories from "../../../../Visualytics/Components/ChartCategories/ChartCategories";
import LineChartFormatAggregator from "../../../../Visualytics/Components/FormatAggregators/LineChartFormatAggregator";
import ChartButtons from "../../../../Visualytics/Components/Menus/ChartButtons";
import { IChartButtonsProps } from "../../../../Visualytics/Components/Menus/ChartButtonsTypes";
import {
  axisNameTitlesObj,
  TAxisType,
} from "../../../../Visualytics/Data/VisualyticsData";
import EconomicsChartSelectionMenu from "../../../Components/Menus/EconomicsChartSelectionMenu";
import EconomicsChartTitlePlaque from "../../../Components/TitlePlaques/EconomicsChartTitlePlaque";
import { TChartTypeNames } from "../../../Data/EconomicsData";
import { updateEconomicsParameterAction } from "../../../Redux/Actions/EconomicsActions";
import EconomicsPlotChartsDataPanel from "./EconomicsPlotChartsDataPanel";
import EconomicsPlotChartsSelectCharts from "./EconomicsPlotChartsSelectCharts";

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
    marginLeft: (props: any) => (props.showHeatMapCategories ? -295 : 5),
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
  const dispatch = useDispatch();
  const theme = useTheme();
  const wc = "economicsChartsWorkflows";
  const wp = "economicsResultsPlotCharts";

  const { showContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  const allEconomicsPlotCharts = useSelector(
    (state: RootState) => state.economicsReducer[wc][wp]
  );

  const { showPlotChartsCategories, selectedEconomicsPlotChartOption } =
    useSelector((state: RootState) => state.economicsReducer);

  const chartValue = selectedEconomicsPlotChartOption.value as TChartTypeNames;

  const chartButtons: IChartButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <div style={{ display: "flex" }}>
        <EconomicsChartSelectionMenu />
        <IconButtonWithTooltip
          toolTipKey="printToolTip"
          toolTipTitle="Print table"
          toolTipPlacement="bottom-end"
          icon={() => <SaveOutlinedIcon />}
          action={() => alert("Print")}
        />
        <IconButtonWithTooltip
          toolTipKey="printToolTip"
          toolTipTitle="Print table"
          toolTipPlacement="bottom-end"
          icon={() => <RemoveOutlinedIcon />}
          action={() => alert("Print")}
        />
      </div>
    ),
  };

  const ChartCategoriesData = React.useRef([
    {
      categoryTitle: "X Category",
      persistAction: (name: string, title: string) =>
        dispatch(
          updateEconomicsParameterAction("plotChartsVariableXOption", {
            value: name,
            label: title,
          })
        ),
      removeAction: () => {
        dispatch(
          updateEconomicsParameterAction("plotChartsVariableXOption", null)
        );
        //TODO before dispatching, check if is empty
        dispatch(updateEconomicsParameterAction("plotChartsData", {}));
        dispatch(updateEconomicsParameterAction("plotChartsDataTrans", []));
      },
    },
    {
      categoryTitle: "Y Category [Primary]",
      persistAction: (name: string, title: string) =>
        dispatch(
          updateEconomicsParameterAction("plotChartsVariableYPriOption", {
            value: name,
            label: title,
          })
        ),
      removeAction: () => {
        dispatch(
          updateEconomicsParameterAction("plotChartsVariableYPriOption", null)
        );
        dispatch(updateEconomicsParameterAction("plotChartsData", {}));
        dispatch(updateEconomicsParameterAction("plotChartsDataTrans", []));
      },
    },
    {
      categoryTitle: "Y Category [Secondary]",
      persistAction: (name: string, title: string) => {
        dispatch(
          updateEconomicsParameterAction("plotChartsVariableZOption", {
            value: name,
            label: title,
          })
        );
      },
      removeAction: () => {
        dispatch(
          updateEconomicsParameterAction("plotChartsVariableYOption", null)
        );
        dispatch(updateEconomicsParameterAction("plotChartsData", {}));
        dispatch(updateEconomicsParameterAction("plotChartsDataTrans", []));
      },
    },
  ]);

  const panelRef = React.useRef<HTMLDivElement>(null);
  const moveDivRef = React.useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = React.useState<ControlPosition>({
    // x: panelRef.current?.offsetWidth as number,
    x: 300,
    y: 0,
  });

  const classes = useStyles(mousePosition);

  React.useEffect(() => {
    dispatch(showContextDrawerAction());
    setMousePosition({ x: panelRef.current?.offsetWidth as number, y: 0 });
  }, [dispatch]);

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
        {showPlotChartsCategories && (
          <ChartCategories
            categoriesTitle={selectedEconomicsPlotChartOption.label}
            ChartCategoriesData={ChartCategoriesData.current}
            showCategories={showPlotChartsCategories}
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
          <EconomicsPlotChartsSelectCharts />
        </div>
      </div>
      {showContextDrawer && (
        <ContextDrawer>
          {() => {
            if (chartValue === "stackedArea") {
              return <div>StackedArea</div>;
            } else if (chartValue === "line") {
              const lineChart = allEconomicsPlotCharts["lineChart"];

              //GENERAL
              const {
                curve,
                colors,
                lineWidth,
                enableArea,
                areaBaselineValue,
                areaOpacity,
              } = lineChart;

              const lineChartGeneralData = {
                curve: curve ? curve : "linear",
                colors: colors ? colors.scheme : { scheme: "category10" },
                storeLineWidth: {
                  currentValue: lineWidth ? lineWidth : 1,
                  step: 1,
                  min: 0,
                  max: 20,
                },
                enableArea,
                storeAreaBaselineValue: {
                  currentValue: areaBaselineValue,
                  step: 1,
                  min: 0,
                  max: 200,
                },
                storeAreaOpacity: {
                  currentValue: areaOpacity,
                  step: 1,
                  min: 0,
                  max: 1,
                },
              };

              //PLOT
              const { margin, xScale, xFormat, yScale, yFormat } = lineChart;
              const lineChartPlotData = {
                margin,
                colors: colors ? colors.scheme : { scheme: "category10" },
                xScale,
                xFormat,
                yScale,
                yFormat,
              };

              //GRID DATA
              const { enableGridX, enableGridY, gridXValues, gridYValues } =
                lineChart;
              const lineGridData = [
                {
                  gridName: "gridX",
                  gridTitle: "Horizontal Grid",
                  storeGridEnabled: enableGridX,
                  gridValuesName: "gridXValues",
                  storeGridValues: gridXValues,
                },
                {
                  gridName: "gridY",
                  gridTitle: "Vertical Grid",
                  storeGridEnabled: enableGridY,
                  gridValuesName: "gridYValues",
                  storeGridValues: gridYValues,
                },
              ];

              //AXES DATA
              const apexAxesEnabled = lineChart["apexAxesEnabled"];
              const lineAxesData = Object.keys(axisNameTitlesObj).reduce(
                (acc: any, name) => {
                  if (lineChart[name]) {
                    const {
                      tickSize,
                      tickPadding,
                      tickRotation,
                      legend,
                      legendOffset,
                      legendPosition,
                    } = lineChart[name];

                    return [
                      ...acc,
                      {
                        axisName: name,
                        axisEnabled: apexAxesEnabled[name],
                        axisCaption: "Chart Axes",
                        enableName: `${name}Enable`,
                        storeAxisTitle: legend,
                        storeAxisTitleOffset: {
                          currentValue: legendOffset,
                          step: 1,
                          min: -60,
                          max: 60,
                        },
                        storeAxisTickSize: {
                          currentValue: tickSize,
                          step: 1,
                          min: 0,
                          max: 20,
                        },
                        storeAxisTickPadding: {
                          currentValue: tickPadding,
                          step: 1,
                          min: 0,
                          max: 20,
                        },
                        storeAxisTickRotation: {
                          currentValue: tickRotation,
                          step: 1,
                          min: -90,
                          max: 90,
                        },
                        storeTitlePosition: legendPosition,
                      },
                    ];
                  } else
                    return [
                      ...acc,
                      {
                        axisName: name,
                        axisEnabled: apexAxesEnabled[name],
                        axisCaption: "Chart Axes",
                        enableName: `${name}Enable`,
                        storeAxisTitle: "",
                        storeAxisTitleOffset: {
                          currentValue: -40,
                          step: 1,
                          min: -60,
                          max: 60,
                        },
                        storeAxisTickSize: {
                          currentValue: 5,
                          step: 1,
                          min: 0,
                          max: 20,
                        },
                        storeAxisTickPadding: {
                          currentValue: 5,
                          step: 1,
                          min: 0,
                          max: 20,
                        },
                        storeAxisTickRotation: {
                          currentValue: 0,
                          step: 1,
                          min: -90,
                          max: 90,
                        },
                        storeTitlePosition: "middle",
                      },
                    ];
                },
                []
              );
              const lineAccordionsData = Object.keys(axisNameTitlesObj).map(
                (name) => ({
                  name: `${name}Accordion`,
                  title: axisNameTitlesObj[name as TAxisType],
                  content: <ApexFlexStyle>No Content</ApexFlexStyle>,
                })
              );

              //LEGENDS
              const { enableLegend } = lineChart;
              const {
                anchor,
                direction,
                justify,
                translateX,
                translateY,
                itemsSpacing,
                itemDirection,
                itemWidth,
                itemHeight,
                itemOpacity,
                symbolSize,
                symbolShape,
                symbolBorderColor,
              } = lineChart["legends"][0];

              const lineLegendsData = {
                enableLegend,
                anchor,
                direction,
                justify,
                storeTranslateX: {
                  currentValue: translateX,
                  step: 1,
                  min: -200,
                  max: 200,
                },
                storeTranslateY: {
                  currentValue: translateY,
                  step: 1,
                  min: -200,
                  max: 200,
                },
                storeItemsSpacing: {
                  currentValue: itemsSpacing,
                  step: 1,
                  min: 0,
                  max: 60,
                },
                itemDirection,
                storeItemWidth: {
                  currentValue: itemWidth,
                  step: 1,
                  min: 10,
                  max: 200,
                },
                storeItemHeight: {
                  currentValue: itemHeight,
                  step: 1,
                  min: 10,
                  max: 200,
                },
                storeItemOpacity: {
                  currentValue: itemOpacity,
                  step: 1,
                  min: 0,
                  max: 10,
                },
                storeSymbolSize: {
                  currentValue: symbolSize,
                  step: 1,
                  min: 2,
                  max: 60,
                },
                symbolShape,
                symbolBorderColor,
              };

              //POINTERS
              const {
                enablePoints,
                enablePointLabel,
                pointLabel,
                pointColor,
                pointSize,
                pointBorderColor,
                pointBorderWidth,
                pointLabelYOffset,
              } = lineChart;

              const linePointersData = {
                enablePointers: enablePoints,
                enablePointLabel: enablePointLabel ? enablePointLabel : false,
                pointLabel: pointLabel ? pointLabel : "yFormatted",
                storePointColor: pointColor,
                storePointSize: {
                  currentValue: pointSize,
                  step: 1,
                  min: 2,
                  max: 20,
                },
                storePointBorderWidth: {
                  currentValue: pointBorderWidth,
                  step: 1,
                  min: 0,
                  max: 20,
                },
                storePointBorderColor: pointBorderColor,
                storePointLabelYOffset: {
                  currentValue: pointLabelYOffset,
                  step: 1,
                  min: -24,
                  max: 24,
                },
              };

              return (
                <LineChartFormatAggregator
                  workflowProcess={wp}
                  updateParameterAction={updateEconomicsParameterAction}
                  chartType={"lineChart"}
                  apexChartAxesData={lineAxesData}
                  apexChartGridData={lineGridData}
                  apexMultiAccordionsData={lineAccordionsData}
                  apexLegendsData={lineLegendsData}
                  apexPointersData={linePointersData}
                  apexLineChartGeneralData={lineChartGeneralData}
                  apexLineChartPlotData={lineChartPlotData}
                />
              );
            } else {
              return <div>No Format</div>;
            }
          }}
        </ContextDrawer>
      )}
    </div>
  );
};

export default EconomicsPlotChartsVisualytics;
