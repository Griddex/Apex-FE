import omit from "lodash.omit";
import { TChartTypes } from "../../Visualytics/Components/Charts/ChartTypes";

const updateChartData = (
  name: string,
  chartType: TChartTypes,
  chartData: any
) => {
  switch (chartType) {
    case "stackedAreaChart": {
      const updatedChartData = chartData.map((row: any) => omit(row, name));
      return updatedChartData;
    }
    case "lineChart": {
      const updatedChartData = [...chartData];
      const pos = chartData.findIndex((row: any) => row.id === name);

      return updatedChartData.splice(pos, 1);
    }
    case "scatterChart": {
      const updatedChartData = [...chartData];
      const pos = chartData.findIndex((row: any) => row.id === name);

      return updatedChartData.splice(pos, 1);
    }
    case "doughnutChart": {
      const updatedChartData = [...chartData];
      const pos = chartData.findIndex((row: any) => row.id === name);

      return updatedChartData.splice(pos, 1);
    }
    case "barChart": {
      const omitNames = Object.keys(chartData[0]).filter((k) =>
        k.startsWith(name)
      );
      const updatedChartData = chartData.map((row: any) =>
        omit(row, omitNames)
      );
      return updatedChartData;
    }
    default: {
      return chartData;
    }
  }
};

export default updateChartData;
