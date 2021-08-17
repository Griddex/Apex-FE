import React from "react";
import BarChart from "../Components/Charts/BarChart";
import NoData from "../../Application/Components/Visuals/NoData";
import DoughnutChart from "../Components/Charts/DoughnutChart";
import LineChart from "../Components/Charts/LineChart";
import StackedAreaChart from "../Components/Charts/StackedAreaChart";
import { IChartProps } from "../Components/ChartTypes";

const ChartSelector = ({
  chartType,
  data,
  specificProperties,
  commonProperties,
}: IChartProps) => {
  console.log(
    "Logged output --> ~ file: ChartSelector.tsx ~ line 15 ~ chartType",
    chartType
  );
  switch (chartType) {
    case "stackedAreaChart":
      return (
        <StackedAreaChart
          data={data}
          specificProperties={specificProperties}
          commonProperties={commonProperties}
        />
      );
    case "lineChart":
      return (
        <LineChart
          data={data}
          specificProperties={specificProperties}
          commonProperties={commonProperties}
        />
      );
    case "doughnutChart":
      return (
        <DoughnutChart
          data={data}
          specificProperties={specificProperties}
          commonProperties={commonProperties}
        />
      );
    case "barChart":
      return (
        <BarChart
          data={data}
          specificProperties={specificProperties}
          commonProperties={commonProperties}
        />
      );
    default:
      return <NoData />;
  }
};

export default React.memo(ChartSelector);
