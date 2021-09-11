import React from "react";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import SelectChart from "../../../../Visualytics/Common/SelectChart";

const EconomicsPlotChartsSelectChart = () => {
  const reducer = "economicsReducer";
  const wc = "economicsChartsWorkflows";
  const wp = "economicsResultsPlotCharts";

  return (
    <ApexFlexContainer>
      <SelectChart
        workflowCategory={wc}
        reducer={reducer}
        selectedChartOptionTitle="selectedEconomicsPlotChartOption"
      />
    </ApexFlexContainer>
  );
};

export default EconomicsPlotChartsSelectChart;
