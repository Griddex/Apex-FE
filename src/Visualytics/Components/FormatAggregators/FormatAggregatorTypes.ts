import {
  TAllWorkflowCategories,
  TOnlyWorkflowProcesses,
} from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { TChartTypes } from "../Charts/ChartTypes";

export interface IApexFormatAggregator {
  workflowCategory: TAllWorkflowCategories;
  workflowProcess: TOnlyWorkflowProcesses;
  chartType: TChartTypes;
  updateParameterAction: (path: string, value: any) => IAction;
}
