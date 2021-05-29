import { IApexMultiAccordion } from "../../../Application/Components/Accordions/ApexMultiAccordions";
import { IAllWorkflows } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { IApexSlider } from "../Sliders/ApexSlider";

export type TChartTypes =
  | "stackedAreaChart"
  | "lineChart"
  | "doughnutChart"
  | "barChart";

export interface IApexChartGrid {
  gridName: string;
  gridTitle: string;
  storeGridEnabled: boolean;
  gridValuesName?: string;
  storeGridValues?: Array<number | string | Date>;
}
export interface IApexLinePlotStyle {
  margin: { top: number; right: number; bottom: number; left: number };
  xScale: string;
  xFormat: string;
  yScale: string;
  yFormat: string;
}

export interface IApexChartAxis {
  axisCaption: string;
  axisEnabled: boolean;
  enableName: string;
  axisName: string;
  storeAxisTitle: string;
  storeAxisTitleOffset: Partial<IApexSlider>;
  storeAxisTickSize: Partial<IApexSlider>;
  storeAxisTickPadding: Partial<IApexSlider>;
  storeAxisTickRotation: Partial<IApexSlider>;
  storeTitlePosition: "start" | "middle" | "end";
  enableAction?: () => void;
}
export interface IApexLegends {
  enableLegend: boolean;
  anchor: string;
  direction: string;
  justify: boolean;
  itemDirection: string;
  symbolShape: string;
  symbolBorderColor: string;
  storeTranslateX: Partial<IApexSlider>;
  storeTranslateY: Partial<IApexSlider>;
  storeItemsSpacing: Partial<IApexSlider>;
  storeItemWidth: Partial<IApexSlider>;
  storeItemHeight: Partial<IApexSlider>;
  storeItemOpacity: Partial<IApexSlider>;
  storeSymbolSize: Partial<IApexSlider>;
  axisCaption: string;
  axisEnabled: boolean;
  enableName: string;
  axisName: string;
  storeAxisTitle: string;
  storeAxisTitleOffset: Partial<IApexSlider>;
  storeAxisTickSize: Partial<IApexSlider>;
  storeAxisTickPadding: Partial<IApexSlider>;
  storeAxisTickRotation: Partial<IApexSlider>;
  storeTitlePosition: "start" | "middle" | "end";
  enableAction?: () => void;
}

export interface IApexChartPointers {
  enablePointers: boolean;
  enablePointLabel: boolean;
  pointLabel: string;
  storePointColor: Partial<IApexSlider>;
  storePointSize: Partial<IApexSlider>;
  storePointBorderWidth: Partial<IApexSlider>;
  storePointBorderColor: Partial<IApexSlider>;
  storePointLabelYOffset: Partial<IApexSlider>;
}
export interface IApexLineChartGeneral {
  curve: string;
  colors: string;
  storeLineWidth: Partial<IApexSlider>;
  enableArea: boolean;
  areaBlendMode: string;
  storeAreaBaselineValue: Partial<IApexSlider>;
  storeAreaOpacity: Partial<IApexSlider>;
}

export interface IApexChartFormatProps {
  workflowProcess: IAllWorkflows["wrkflwPrcss"];
  chartType: TChartTypes;
  updateParameterAction: (path: string, value: any) => IAction;
  apexChartGridData: IApexChartGrid[];
  apexChartAxesData: IApexChartAxis[];
  apexMultiAccordionsData: IApexMultiAccordion[];
  apexLegendsData?: any;
  apexPointersData?: any;
  apexLineChartGeneralData?: any;
  apexLineChartPlotData?: any;
}
