import omit from "lodash.omit";
import { TChartTypes } from "../../Visualytics/Components/Charts/ChartTypes";
import { IIdNameTitlePathOption } from "../Components/Selects/SelectItemsType";

const removeSeriesFromChart = (
  chartType: TChartTypes,
  chartVariableOption: IIdNameTitlePathOption,
  chartData: any
) => {
  switch (chartType) {
    case "stackedAreaChart": {
      const filteredChart = chartData.map((series: any) =>
        omit(series, [chartVariableOption.name])
      );
      return filteredChart;
    }
    case "doughnutChart":
    case "scatterChart":
    case "lineChart": {
      const filteredChart = chartData.filter(
        (series: any) => series.id !== chartVariableOption.name
      );
      return filteredChart;
    }
    case "barChart": {
      const filteredChart = chartData.map((series: any) =>
        omit(series, [
          chartVariableOption.name,
          `${chartVariableOption.name}Color`,
        ])
      );
      return filteredChart;
    }

    default:
      break;
  }
};

export default removeSeriesFromChart;
