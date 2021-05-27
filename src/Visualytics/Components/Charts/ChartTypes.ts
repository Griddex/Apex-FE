import { IApexMultiAccordion } from "../../../Application/Components/Accordions/ApexMultiAccordions";
import { IAllWorkflows } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";

export interface IApexChartGrid {
  gridName: string;
  gridTitle: string;
  storeGridEnabled: boolean;
  gridValuesName?: string;
  storeGridValues?: Array<number | string | Date>;
}

export interface IApexChartAxis {
  axisCaption: string;
  axisEnabled: boolean;
  enableName: string;
  axisName: string;
  storeAxisTitle: string;
  storeAxisTitleOffset: {
    value: number;
    step: number;
    min: number;
    max: number;
  };
  storeAxisTickSize: { value: number; step: number; min: number; max: number };
  storeAxisTickPadding: {
    value: number;
    step: number;
    min: number;
    max: number;
  };
  storeAxisTickRotation: {
    value: number;
    step: number;
    min: number;
    max: number;
  };
  storeTitlePosition: "start" | "middle" | "end";
  enableAction?: () => void;
}

export interface IApexChartFormatProps {
  workflowProcess: IAllWorkflows["wrkflwPrcss"];
  updateParameterAction: (path: string, value: any) => IAction;
  apexChartGridData: IApexChartGrid[];
  apexChartAxesData: IApexChartAxis[];
  apexMultiAccordionsData: IApexMultiAccordion[];
}
