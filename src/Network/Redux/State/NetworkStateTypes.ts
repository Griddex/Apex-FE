import { Node, Edge } from "react-flow-renderer";
import { FormikErrors, FormikTouched } from "formik";

//NetworkModel
export interface ISaveNetworkFormValues {
  networkName: string;
  networkDescription: string;
}

export interface ISaveNetworkFormProps extends ISaveNetworkFormValues {
  nodeElements?: Node[];
  edgeElements?: Edge[];
  activeStep?: number;
  errors?: FormikErrors<ISaveNetworkFormValues>;
  touched?: FormikTouched<ISaveNetworkFormValues>;
  isValid?: boolean;
  statusCode?: string;
  result?: string;
  handleChange?: (event: React.ChangeEvent<any>) => void;
  children?: (props: ISaveNetworkFormValues) => JSX.Element;
}

export interface ISaveNetworkProps {
  children?: (props: ISaveNetworkFormProps) => JSX.Element;
}

//ForecastParameters
export interface ISaveForecastParametersFormValues {
  forecastParametersName: string;
  forecastParametersDescription: string;
}

export interface ISaveForecastParametersFormProps
  extends ISaveForecastParametersFormValues {
  nodeElements?: Node[];
  edgeElements?: Edge[];
  activeStep?: number;
  errors?: FormikErrors<ISaveForecastParametersFormValues>;
  touched?: FormikTouched<ISaveForecastParametersFormValues>;
  isValid?: boolean;
  statusCode?: string;
  result?: string;
  handleChange?: (event: React.ChangeEvent<any>) => void;
  children?: (props: ISaveForecastParametersFormValues) => JSX.Element;
}

export interface ISaveForecastParametersProps {
  children?: (props: ISaveForecastParametersFormProps) => JSX.Element;
}

export interface INetworkState extends ISaveNetworkFormProps {
  currentElement: number | string | Record<string, unknown>;
  currentPopoverId: string;
  currentPopoverData: number | string | Record<string, unknown>[];
  showPopover: boolean;
  showNetworkElementDetails:
    | null
    | "showWellheadDetails"
    | "showManifoldDetails"
    | "showFlowstationDetails"
    | "showGasfacilityDetails"
    | "showTerminalDetails";
  showWellheadSummaryNodes: boolean;
  showWellheadSummaryEdges: boolean;
  // statusCode: string;
  // result: string;
  // errors: string[];
}
