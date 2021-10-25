import React from "react";
import { TSize } from "../../Application/Types/ApplicationTypes";

const SelectChart = React.lazy(
  () => import("../../Visualytics/Common/SelectChart")
);

const ForecastSelectChart = ({ width, height }: TSize) => {
  const reducer = "forecastReducer";
  const wc = "forecastChartsWorkflows";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: width,
        height: height,
      }}
    >
      <SelectChart
        workflowCategory={wc}
        reducer={reducer}
        selectedChartOptionTitle="selectedForecastChartOption"
      />
    </div>
  );
};

export default ForecastSelectChart;
