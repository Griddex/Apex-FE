import { IApexMultiAccordion } from "../../../Application/Components/Accordions/ApexMultiAccordions";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { AxisProps } from "../ChartTypes";
import { IApexSlider } from "../Sliders/ApexSlider";

export type TChartTypes =
  | "stackedAreaChart"
  | "lineChart"
  | "scatterChart"
  | "doughnutChart"
  | "barChart"
  | "radarChart";

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

export interface IApexChartAxis extends AxisProps {
  axisCaption: string;
  axisEnabled?: boolean;
  enableName: string;
  axisName: string;
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
}

export interface IApexChartPointers {
  enablePointers: boolean;
  enablePointLabel: boolean;
  pointLabel: string;
}
export interface IApexLineChartGeneral {
  curve: string;
  colors: string;
  storeLineWidth: Partial<IApexSlider>;
  enableArea: boolean;
  areaBlendMode:
    | "normal"
    | "multiply"
    | "screen"
    | "overlay"
    | "lighten"
    | "darken"
    | "color-dodge"
    | "color-burn"
    | "hard-light"
    | "soft-light"
    | "difference"
    | "exclusion"
    | "hue"
    | "saturation"
    | "color"
    | "luminosity";
}

export interface IApexChartFormatProps {
  basePath: string;
  chartType: TChartTypes;
  updateParameterAction: (path: string, value: any) => IAction;
  apexChartGridData: IApexChartGrid[];
  apexChartAxesData: IApexChartAxis[];
  apexMultiAccordionsData: IApexMultiAccordion[];
}
