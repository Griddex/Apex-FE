import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React from "react";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import ApexChartGridAxes from "../ChartGridAxes/ApexChartGridAxes";
import { IApexChartFormatProps } from "../Charts/ChartTypes";
import ApexLineChartGeneral from "../General/ApexLineChartGeneral";
import ApexLegends from "../Legends/ApexLegends";
import ApexChartPointers from "../Pointers/ApexChartPoints";

const LineChartFormatAggregator = ({
  workflowProcess,
  updateParameterAction,
  chartType,
  apexChartGridData,
  apexChartAxesData,
  apexMultiAccordionsData,
  apexLegendsData,
  apexPointersData,
  apexLineChartGeneralData,
}: IApexChartFormatProps) => {
  const [perspective, setPerspective] = React.useState("line");

  const handleChange = (_: React.ChangeEvent<any>, newPerspective: string) => {
    setPerspective(newPerspective);
  };

  const apexChartProps = {
    workflowProcess,
    updateParameterAction,
    chartType,
  };
  const apexGridAxesProps = {
    workflowProcess,
    updateParameterAction,
    chartType,
    apexChartGridData,
    apexChartAxesData,
    apexMultiAccordionsData,
  };

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
        return <div>Plot</div>;

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
