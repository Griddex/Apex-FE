import React from "react";
import ApexFlexContainer from "../../Application/Components/Styles/ApexFlexContainer";

const SelectChart = React.lazy(
  () => import("../../Visualytics/Common/SelectChart")
);

const ForecastSelectChart = () => {
  const reducer = "forecastReducer";
  const wc = "forecastChartsWorkflows";

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
