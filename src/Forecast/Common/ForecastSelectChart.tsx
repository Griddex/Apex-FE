import React from "react";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";
import SelectChart from "../../Visualytics/Common/SelectChart";

const ForecastSelectChart = () => {
  const reducer = "forecastReducer";
  const wc = "forecastChartWorkflows";

  return (
    <ApexFlexContainer>
      <SelectChart
        workflowCategory={wc}
        reducer={reducer}
        selectedChartOptionTitle="selectedForecastChartOption"
      />
    </ApexFlexContainer>
  );
};

export default ForecastSelectChart;
