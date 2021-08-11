import React from "react";
import { useSelector } from "react-redux";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import NoData from "../../../../Application/Components/Visuals/NoData";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import BarChart from "../../../../Visualytics/Components/Charts/BarChart";
import { TChartTypes } from "../../../../Visualytics/Components/Charts/ChartTypes";
import DoughnutChart from "../../../../Visualytics/Components/Charts/DoughnutChart";
import LineChart from "../../../../Visualytics/Components/Charts/LineChart";
import StackedAreaChart from "../../../../Visualytics/Components/Charts/StackedAreaChart";
import { IChartProps } from "../../../../Visualytics/Components/ChartTypes";

const EconomicsPlotCharts = ({
  chartType,
  data,
  otherProperties,
}: IChartProps) => {
  switch (chartType) {
    case "stackedArea":
      return <StackedAreaChart data={data} otherProperties={otherProperties} />;
    case "line":
      return <LineChart data={data} otherProperties={otherProperties} />;
    case "doughnut":
      return <DoughnutChart data={data} otherProperties={otherProperties} />;
    case "bar":
      return <BarChart data={data} otherProperties={otherProperties} />;
    default:
      return <NoData />;
  }
};

const EconomicsPlotChartsSelectCharts = () => {
  const wc = "economicsChartsWorkflows";

  const { selectedEconomicsPlotChartOption } = useSelector(
    (state: RootState) => state.economicsReducer
  );

  const chartType = selectedEconomicsPlotChartOption.value as TChartTypes;
  const economicsChartsObj = useSelector(
    (state: RootState) => state.economicsReducer[wc]
  );
  const { data, otherProperties } = economicsChartsObj[chartType];

  return (
    <ApexFlexContainer>
      <EconomicsPlotCharts
        chartType={chartType}
        data={data}
        otherProperties={otherProperties}
      />
    </ApexFlexContainer>
  );
};

export default EconomicsPlotChartsSelectCharts;
