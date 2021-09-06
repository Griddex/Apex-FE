import { useTheme } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React from "react";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { axisNameTitlesObj, TAxisType } from "../../Data/VisualyticsData";
import {
  bar_htm,
  dht,
  lin,
  rad,
  stk_lin_bar_sct_htm,
  stk_rad,
} from "../../Utils/ChartFormatDiscriminators";
import ApexArcLabels from "../ArcLabels/ApexArcLabels";
import ApexArcLinkLabels from "../ArcLabels/ApexArcLinkLabels";
import ApexChartGridAxes from "../ChartGridAxes/ApexChartGridAxes";
import { TAxisName } from "../ChartTypes";
import { ChartFormatAggregatorContext } from "../Contexts/ChartFormatAggregatorContext";
import ApexChartDots from "../Dots/ApexChartDots";
import ApexRadarGrid from "../Grids/ApexRadarGrid";
import ApexChartInteractivity from "../Interactivity/ApexChartInteractivity";
import ApexLabels from "../Labels/ApexLabels";
import ApexLegends from "../Legends/ApexLegends";
import ApexPlotStyle from "../PlotStyle/ApexPlotStyle";
import ApexChartPointers from "../Pointers/ApexChartPoints";
import ApexChartSeries from "../Series/ApexChartSeries";
import { IApexFormatAggregator } from "./FormatAggregatorTypes";

const ChartFormatAggregator = ({
  basePath,
  updateParameterAction,
  chartType,
}: IApexFormatAggregator) => {
  const chartTypeDefined = chartType as string;

  const { chartProps } = React.useContext(ChartFormatAggregatorContext);

  const { enableApexAxes, enableGridX, enableGridY, gridXValues, gridYValues } =
    chartProps;

  const [perspective, setPerspective] = React.useState("series");

  const handleChange = (_: React.ChangeEvent<any>, value: string) => {
    setPerspective(value);
  };

  const apexChartGridData = [
    {
      gridName: "gridX",
      gridTitle: "Horizontal Grid",
      enableGrid: enableGridX,
      gridValuesName: "gridXValues",
      gridValues: gridXValues,
    },
    {
      gridName: "gridY",
      gridTitle: "Vertical Grid",
      enableGrid: enableGridY,
      gridValuesName: "gridYValues",
      gridValues: gridYValues,
    },
  ];

  const apexChartAxesData = Object.keys(axisNameTitlesObj).map((name) => ({
    axisName: name,
    axisCaption: "Chart Axes",
    enableName: `${name}Enable`,
    axisEnabled: enableApexAxes[name as TAxisName],
  }));

  const apexMultiAccordionsData = Object.keys(axisNameTitlesObj).map(
    (name) => ({
      name: `${name}Accordion`,
      title: axisNameTitlesObj[name as TAxisType],
      content: <ApexFlexContainer>No Content</ApexFlexContainer>,
    })
  );

  const apexChartProps = {
    basePath,
    updateParameterAction,
    chartType,
  };

  const apexGridAxesProps = {
    basePath,
    updateParameterAction,
    chartType,
    apexChartGridData,
    apexChartAxesData,
    apexMultiAccordionsData,
  };

  const renderFormatPerspective = () => {
    switch (perspective) {
      case "series":
        return <ApexChartSeries {...apexChartProps} />;

      case "plot":
        return <ApexPlotStyle {...apexChartProps} />;

      case "gridAxes":
        return <ApexChartGridAxes {...apexGridAxesProps} />;

      case "radarGrid":
        return <ApexRadarGrid {...apexGridAxesProps} />;

      case "labels": //bar & htm
        return <ApexLabels {...apexChartProps} />;

      case "points": //line
        return <ApexChartPointers {...apexChartProps} />;

      case "dots": //stk & rad
        return <ApexChartDots {...apexChartProps} />;

      case "arcLabels": //dht
        return <ApexArcLabels {...apexChartProps} />;

      case "arcLinkLabels": //dht
        return <ApexArcLinkLabels {...apexChartProps} />;

      case "legends":
        return <ApexLegends {...apexChartProps} />;

      case "interactivity":
        return <ApexChartInteractivity {...apexChartProps} />;

      default:
        break;
    }
  };

  return (
    <ApexFlexContainer
      flexDirection="column"
      moreStyles={{ flexWrap: "wrap", width: 305 }}
    >
      <ToggleButtonGroup
        size="small"
        value={perspective}
        onChange={handleChange}
        style={{ width: "100%" }}
        exclusive
      >
        <ToggleButton value="series">{"Series"}</ToggleButton>
        <ToggleButton value="plot">{"Plot"}</ToggleButton>
        {stk_lin_bar_sct_htm.includes(chartTypeDefined) && (
          <ToggleButton value="gridAxes">{"Grids & Axes"}</ToggleButton>
        )}
        {rad.includes(chartTypeDefined) && (
          <ToggleButton value="radarGrid">{"Radar Grid"}</ToggleButton>
        )}
        {lin.includes(chartTypeDefined) && (
          <ToggleButton value="points">{"Points"}</ToggleButton>
        )}
        {stk_rad.includes(chartTypeDefined) && (
          <ToggleButton value="dots">{"Dots"}</ToggleButton>
        )}
        {bar_htm.includes(chartTypeDefined) && (
          <ToggleButton value="labels">{"Labels"}</ToggleButton>
        )}
        {dht.includes(chartTypeDefined) && (
          <ToggleButton value="arcLabels">{"Arc labels"}</ToggleButton>
        )}
        {dht.includes(chartTypeDefined) && (
          <ToggleButton value="arcLinkLabels">{"Arc Link Labels"}</ToggleButton>
        )}
        <ToggleButton value="legends">{"Legends"}</ToggleButton>
        <ToggleButton value="interactivity">{"Interactivity"}</ToggleButton>
      </ToggleButtonGroup>
      {renderFormatPerspective()}
    </ApexFlexContainer>
  );
};

export default ChartFormatAggregator;
