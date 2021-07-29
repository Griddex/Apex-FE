import { FormikErrors, FormikTouched } from "formik";
import { Edge, Node } from "react-flow-renderer";
import { IStoredDataRow } from "../../../Application/Types/ApplicationTypes";
import {
  IDeclineCurveParametersDetail,
  IForecastParametersStoredRow,
} from "../../Components/Dialogs/StoredNetworksDialogTypes";

//NetworkModel
export interface ISaveNetworkFormValues {
  networkTitle: string;
  networkDescription: string;
}

export interface ISaveNetworkFormProps extends ISaveNetworkFormValues {
  nodeElements?: Node[];
  edgeElements?: Edge[];
  nodeElementsManual?: Node[];
  edgeElementsManual?: Edge[];
  activeStep?: number;
  errors?: FormikErrors<ISaveNetworkFormValues>;
  touched?: FormikTouched<ISaveNetworkFormValues>;
  isValid?: boolean;
  status?: number;
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
  targetFluid: string;
  timeFrequency: string;
  defermentDecision: string;
  realtimeResults: string;
  endForecastDate: Date;
}

export interface ICreateForecastParametersFormProps
  extends ISaveForecastParametersFormValues {
  errors?: FormikErrors<ISaveForecastParametersFormValues>;
  touched?: FormikTouched<ISaveForecastParametersFormValues>;
  isValid?: boolean;
  handleChange?: (event: React.ChangeEvent<any>) => void;
}

export interface ISaveForecastParametersProps {
  children?: (props: ICreateForecastParametersFormProps) => JSX.Element;
}
export interface IRunForecastParametersFormValues {
  forecastParametersTitle: string;
  forecastParametersDescription: string;
  targetFluid: string;
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

export type NetworkWorkflowProcessesType = "networkStored";

export interface INetworkState extends ISaveNetworkFormProps {
  currentElement: number | string | Record<string, React.Key>;
  currentPopoverId: string;
  currentPopoverData: ICurrentPopoverData;
  showPopover: boolean;
  showNetworkElementDetails:
    | null
    | "showDrainagePointDetails"
    | "showManifoldDetails"
    | "showFlowstationDetails"
    | "showGasfacilityDetails"
    | "showTerminalDetails";
  showDrainagePointSummaryNodes: boolean;
  showDrainagePointSummaryEdges: boolean;

  isNetworkSaved: boolean;
  isNetworkChanged: boolean;
  isNetworkDisplayed: boolean;
  isNetworkAuto: boolean;

  networkId: string;
  status: number;
  message: string;
  error: { message: string };
  success: false;

  forecastParametersTitle: string;
  forecastParametersDescription: string;

  parameterEntries: ISaveForecastParametersFormValues;
  declineParameters: IDeclineCurveParametersDetail[];

  selectedTableData: any[];

  selectedForecastingParametersId: string;
  selectedForecastingParametersTitle: string;
  selectedForecastingParametersDescription: string;
  selectedDeclineParametersId: string;
  selectedDeclineParametersTitle: string;
  selectedDeclineParametersDescription: string;
  selectedProductionPrioritizationId: string;
  selectedProductionPrioritizationTitle: string;
  selectedProductionPrioritizationDescription: string;

  selectedNetworkId: string;
  selectedNetworkTitle: string;

  loadNetworkGenerationWorkflow: boolean;

  storedDataWorkflows: {
    networkStored: IStoredDataRow[];
    forecastingParametersStored: IForecastParametersStoredRow[];
    declineParametersStored: IForecastParametersStoredRow[];
    productionPrioritizationStored: IForecastParametersStoredRow[];
  };

  selectedDeclineParametersData: IDeclineCurveParametersDetail[];
  currentProductionPrioritization: any[];

  prioritizationPerspective: string;
  selectedStreamPrioritization: string;
  useSecondaryFacility: string;
}
