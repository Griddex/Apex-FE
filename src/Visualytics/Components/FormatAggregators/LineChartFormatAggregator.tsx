import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React from "react";
import { useSelector } from "react-redux";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { axisNameTitlesObj, TAxisType } from "../../Data/VisualyticsData";
import ApexChartGridAxes from "../ChartGridAxes/ApexChartGridAxes";
import ApexLineChartGeneral from "../General/ApexLineChartGeneral";
import ApexLegends from "../Legends/ApexLegends";
import ApexLinePlotStyle from "../PlotStyle/ApexLinePlotSyle";
import ApexChartPointers from "../Pointers/ApexChartPoints";
import { IApexFormatAggregator } from "./FormatAggregatorTypes";

const LineChartFormatAggregator = ({
  workflowCategory,
  workflowProcess,
  chartType,
  updateParameterAction,
}: IApexFormatAggregator) => {
  const wc = workflowCategory;

  const { economicsResultsPlotCharts } = useSelector(
    (state: RootState) => state.economicsReducer[wc]
  );

  const [perspective, setPerspective] = React.useState("line");

  const handleChange = (_: React.ChangeEvent<any>, newPerspective: string) => {
    setPerspective(newPerspective);
  };

  const lineChart = economicsResultsPlotCharts["lineChart"];

  //GENERAL
  const {
    curve,
    colors,
    lineWidth,
    enableArea,
    areaBlendMode,
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
    areaBlendMode: areaBlendMode ? areaBlendMode : "normal",
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
  const { enableGridX, enableGridY, gridXValues, gridYValues } = lineChart;
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
  const lineAccordionsData = Object.keys(axisNameTitlesObj).map((name) => ({
    name: `${name}Accordion`,
    title: axisNameTitlesObj[name as TAxisType],
    content: <ApexFlexContainer>No Content</ApexFlexContainer>,
  }));

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

  const apexChartProps = {
    workflowCategory,
    workflowProcess,
    updateParameterAction,
    chartType,
  };

  const apexGridAxesProps = {
    workflowCategory,
    workflowProcess,
    updateParameterAction,
    chartType,
    apexChartGridData: lineGridData,
    apexChartAxesData: lineAxesData,
    apexMultiAccordionsData: lineAccordionsData,
  };

  const apexLineChartGeneralData = lineChartGeneralData;
  const apexPlotData = lineChartPlotData;
  const apexLegendsData = lineLegendsData;
  const apexPointersData = linePointersData;

  const renderFormatPerspective = () => {
    switch (perspective) {
      case "general":
        return (
          <ApexLineChartGeneral
            {...apexChartProps}
            {...apexLineChartGeneralData}
          />
        );

      case "plot":
        return <ApexLinePlotStyle {...apexPlotData} />;

      case "gridAxes":
        return <ApexChartGridAxes {...apexGridAxesProps} />;

      case "legends":
        return <ApexLegends {...apexChartProps} {...apexLegendsData} />;

      case "points":
        return <ApexChartPointers {...apexChartProps} {...apexPointersData} />;

      default:
        break;
    }
  };

  return (
    <ApexFlexContainer flexDirection="column">
      <ToggleButtonGroup
        size="small"
        value={perspective}
        exclusive
        onChange={handleChange}
        style={{ width: "100%" }}
      >
        <ToggleButton value="general">{"General"}</ToggleButton>
        <ToggleButton value="plot">{"Plot"}</ToggleButton>
        <ToggleButton value="gridAxes">{"Grid/Axes"}</ToggleButton>
        <ToggleButton value="legends">{"Legends"}</ToggleButton>
        <ToggleButton value="points">{"Points"}</ToggleButton>
      </ToggleButtonGroup>
      {renderFormatPerspective()}
    </ApexFlexContainer>
  );
};

export default LineChartFormatAggregator;
