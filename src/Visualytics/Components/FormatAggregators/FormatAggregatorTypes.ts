import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { THeatMapThreshold } from "../../../Economics/Components/ApexHeatMapThreshold/ApexHeatMapThreshold";
import { TChartTypes } from "../Charts/ChartTypes";

export interface IApexFormatAggregator {
  currentThresholdTitle?: THeatMapThreshold;
  basePath: string;
  updateParameterAction: (path: string, value: any) => IAction;
  chartType: TChartTypes;
}
