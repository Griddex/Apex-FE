import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { TChartTypes } from "../Charts/ChartTypes";

export interface IApexFormatAggregator {
  updateParameterAction: (path: string, value: any) => IAction;
  basePath: string;
  chartType: TChartTypes;
}
