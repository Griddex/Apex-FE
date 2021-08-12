import BarChart from "../Components/Charts/BarChart";
import NoData from "../../Application/Components/Visuals/NoData";
import DoughnutChart from "../Components/Charts/DoughnutChart";
import LineChart from "../Components/Charts/LineChart";
import StackedAreaChart from "../Components/Charts/StackedAreaChart";
import { IChartProps } from "../Components/ChartTypes";

const ChartSelector = ({ chartType, data, otherProperties }: IChartProps) => {
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

export default ChartSelector;
