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
  statusCode?: number;
  data?: any[];
  handleChange?: (event: React.ChangeEvent<any>) => void;
  children?: (props: ISaveNetworkFormValues) => JSX.Element;
  isValids?: { saveNetworkExtrudeIsValid: boolean };
}

export interface ISaveNetworkProps {
  children?: (props: ISaveNetworkFormProps) => JSX.Element;
}

//ForecastParameters
export interface ISaveForecastParametersFormValues {
  forecastParametersName: string;
  forecastParametersDescription: string;
  hSPName: string;
  timeFrequency: string;
  realtimeResults: string;
  endForecastDate: Date;
}

export interface ISaveForecastParametersFormProps
  extends ISaveForecastParametersFormValues {
  errors?: FormikErrors<ISaveForecastParametersFormValues>;
  touched?: FormikTouched<ISaveForecastParametersFormValues>;
  isValid?: boolean;
  statusCode?: string;
  data?: string;
  handleChange?: (event: React.ChangeEvent<any>) => void;
}

export interface ISaveForecastParametersProps {
  children?: (props: ISaveForecastParametersFormProps) => JSX.Element;
}

export interface ICurrentPopoverData {
  data:
    | number
    | string
    | Record<string, React.Key>
    | Record<string, React.Key>[];
}
export interface INetworkState extends ISaveNetworkFormProps {
  currentElement: number | string | Record<string, React.Key>;
  currentPopoverId: string;
  currentPopoverData: ICurrentPopoverData;
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
  // data: string;
  // errors: string[];
  saveForecastParameters: ISaveForecastParametersFormValues;
}
