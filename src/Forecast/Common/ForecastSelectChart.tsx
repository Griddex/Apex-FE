import React from "react";
import SelectChart from "../../Visualytics/Common/SelectChart";

export type TForecastSelectChart = {
  height: number;
  width: number;
  indexBy: string;
};

const ForecastSelectChart = ({
  width,
  height,
  indexBy,
}: TForecastSelectChart) => {
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
        indexBy={indexBy}
        chartStory="primary"
      />
    </div>
  );
};

export default ForecastSelectChart;
