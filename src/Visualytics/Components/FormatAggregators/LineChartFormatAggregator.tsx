import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React from "react";
import ApexFlexStyle from "../../../Application/Components/Styles/ApexFlexStyle";
import ApexChartGridAxes from "../ChartGridAxes/ApexChartGridAxes";
import { IApexChartFormatProps } from "../Charts/ChartTypes";

const LineChartFormatAggregator = ({
  workflowProcess,
  updateParameterAction,
  apexChartGridData,
  apexChartAxesData,
  apexMultiAccordionsData,
}: IApexChartFormatProps) => {
  const [perspective, setPerspective] = React.useState("line");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newPerspective: string
  ) => {
    setPerspective(newPerspective);
  };

  const apexGridAxesProps = {
    workflowProcess,
    updateParameterAction,
    apexChartGridData,
    apexChartAxesData,
    apexMultiAccordionsData,
  };

  const renderFormatPerspective = () => {
    switch (perspective) {
      case "line":
        return <div>Line</div>;

      case "gridAxes":
        return <ApexChartGridAxes {...apexGridAxesProps} />;

      default:
        break;
    }
  };

  return (
    <ApexFlexStyle flexDirection="column">
      <ToggleButtonGroup
        size="small"
        value={perspective}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="chart">{"Chart"}</ToggleButton>
        <ToggleButton value="line">{"Line"}</ToggleButton>
        <ToggleButton value="area">{"Area"}</ToggleButton>
        <ToggleButton value="gridAxes">{"Grid/Axes"}</ToggleButton>
        <ToggleButton value="legends">{"Legends"}</ToggleButton>
        <ToggleButton value="points">{"Points"}</ToggleButton>
      </ToggleButtonGroup>
      {renderFormatPerspective()}
    </ApexFlexStyle>
  );
};

export default LineChartFormatAggregator;
