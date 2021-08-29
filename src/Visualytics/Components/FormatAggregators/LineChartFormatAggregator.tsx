import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React from "react";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { axisNameTitlesObj, TAxisType } from "../../Data/VisualyticsData";
import ApexChartGridAxes from "../ChartGridAxes/ApexChartGridAxes";
import { TAxisName } from "../ChartTypes";
import { ChartFormatAggregatorContext } from "../Contexts/ChartFormatAggregatorContext";
import ApexLineChartGeneral from "../General/ApexLineChartGeneral";
import ApexLegends from "../Legends/ApexLegends";
import ApexLinePlotStyle from "../PlotStyle/ApexLinePlotSyle";
import ApexChartPointers from "../Pointers/ApexChartPoints";
import { IApexFormatAggregator } from "./FormatAggregatorTypes";

const LineChartFormatAggregator = ({
  basePath,
  updateParameterAction,
  chartType,
}: IApexFormatAggregator) => {
  const { chartProps } = React.useContext(ChartFormatAggregatorContext);

  const {
    enableApexAxes,
    axisBottom,
    axisLeft,
    axisRight,
    axisTop,
    enableGridX,
    enableGridY,
    gridXValues,
    gridYValues,
  } = chartProps;

  const [perspective, setPerspective] = React.useState("general");

  const handleChange = (_: React.ChangeEvent<any>, newPerspective: string) => {
    setPerspective(newPerspective);
  };

  const lineGridData = [
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

  const lineAxesData = Object.keys(axisNameTitlesObj).map((name) => ({
    axisName: name,
    axisCaption: "Chart Axes",
    enableName: `${name}Enable`,
    axisEnabled: enableApexAxes[name as TAxisName],
  }));

  const lineAccordionsData = Object.keys(axisNameTitlesObj).map((name) => ({
    name: `${name}Accordion`,
    title: axisNameTitlesObj[name as TAxisType],
    content: <ApexFlexContainer>No Content</ApexFlexContainer>,
  }));

  const apexChartProps = {
    basePath,
    updateParameterAction,
    chartType,
  };

  const apexGridAxesProps = {
    basePath,
    updateParameterAction,
    chartType,
    apexChartGridData: lineGridData,
    apexChartAxesData: lineAxesData,
    apexMultiAccordionsData: lineAccordionsData,
  };

  const renderFormatPerspective = () => {
    switch (perspective) {
      case "general":
        return <ApexLineChartGeneral {...apexChartProps} />;

      case "plot":
        return <ApexLinePlotStyle {...apexChartProps} />;

      case "gridAxes":
        return <ApexChartGridAxes {...apexGridAxesProps} />;

      case "legends":
        return <ApexLegends {...apexChartProps} />;

      case "points":
        return <ApexChartPointers {...apexChartProps} />;

      default:
        break;
    }
  };

  return (
    <ApexFlexContainer flexDirection="column">
      <ToggleButtonGroup
        size="small"
        value={perspective}
        onChange={handleChange}
        style={{ width: "100%" }}
        exclusive
      >
        <ToggleButton value="general">{"General"}</ToggleButton>
        <ToggleButton value="plot">{"Plot"}</ToggleButton>
        <ToggleButton value="gridAxes">{"Grid & Axes"}</ToggleButton>
        <ToggleButton value="legends">{"Legends"}</ToggleButton>
        <ToggleButton value="points">{"Points"}</ToggleButton>
        <ToggleButton value="interactivity">{"Interactivity"}</ToggleButton>
      </ToggleButtonGroup>
      {renderFormatPerspective()}
    </ApexFlexContainer>
  );
};

export default LineChartFormatAggregator;
