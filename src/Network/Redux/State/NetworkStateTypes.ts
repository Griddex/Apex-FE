import { FormikErrors, FormikTouched } from "formik";
import { Edge, Node } from "react-flow-renderer";
import { IExistingDataRow } from "../../../Application/Types/ApplicationTypes";
import { IForecastParametersDetail } from "../../Components/Dialogs/ExistingNetworksDialogTypes";

//NetworkModel
export interface ISaveNetworkFormValues {
  networkTitle: string;
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
  forecastParametersTitle: string;
  forecastParametersDescription: string;
  targetFluidTitle: string;
  timeFrequency: string;
  realtimeResults: string;
  endForecastDate: Date;
}

export interface ISaveForecastParametersFormProps
  extends ISaveForecastParametersFormValues {
  errors?: FormikErrors<ISaveForecastParametersFormValues>;
  touched?: FormikTouched<ISaveForecastParametersFormValues>;
  isValid?: boolean;
  handleChange?: (event: React.ChangeEvent<any>) => void;
}

export interface ISaveForecastParametersProps {
  children?: (props: ISaveForecastParametersFormProps) => JSX.Element;
}
export interface IRunForecastParametersFormValues {
  forecastParametersTitle: string;
  forecastParametersDescription: string;
  targetFluidTitle: string;
  timeFrequency: string;
  realtimeResults: string;
  endForecastDate: Date;
}

export interface IRunForecastParametersFormProps
  extends IRunForecastParametersFormValues {
  errors?: FormikErrors<IRunForecastParametersFormValues>;
  touched?: FormikTouched<IRunForecastParametersFormValues>;
  isValid?: boolean;
  handleChange?: (event: React.ChangeEvent<any>) => void;
}

export interface IRunForecastParametersProps {
  children?: (props: IRunForecastParametersFormProps) => JSX.Element;
}

export interface ICurrentPopoverData {
  data:
    | number
    | string
    | Record<string, React.Key>
    | Record<string, React.Key>[];
}

export type NetworkWorkflowProcessesType = "networkExisting";

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

  isNetworkSaved: boolean;
  isNetworkChanged: boolean;
  networkId: string;
  statusCode: number;
  message: string;
  error: { message: string };
  success: false;

  saveForecastParameters: ISaveForecastParametersFormValues;

  existingDataWorkflows: {
    networkExisting: IExistingDataRow[];
    forecastingParametersExisting: IForecastParametersDetail[];
  };
}
