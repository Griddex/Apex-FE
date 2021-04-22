import { FormikErrors, FormikTouched } from "formik";
import { IApplicationExistingData } from "../../../Application/Types/ApplicationTypes";

export interface IEconomicsState {
  id: string;
  userId?: string;
  title: string;
  description: string;
  createdAt: string;
}

export type IEconomicsWorkflowProcessesType =
  | "economicsAnalyses"
  | "economicsParameterImportWorkflow"
  | "economicsParameters"
  | "netCashAnalysisWorkflow"
  | "saveForecastingParametersWorkflowDialog";

export interface EconomicsStateType
  extends INewCostsRevenuesInputDeckFormValues {
  //Remove from here
  forecastRun: string;
  currentWorkflowProcess: IEconomicsWorkflowProcessesType;
  loadCostsRevenueWorkflow: boolean;
  loadParametersWorkflow: boolean;

  costsRevenuesInputDeckId: string;
  costsRevenuesInputHeaders: Record<string, string>[];
  selectedCostsRevenuesInputDeckId: string;
  selectedCostsRevenuesInputDeckTitle: string;

  parametersInputDeckId: string;
  parametersInputHeaders: Record<string, string>[];
  selectedParametersInputDeckId: string;
  selectedParametersInputDeckTitle: string;

  selectedEconomicsResultsId: string;
  selectedEconomicsResultsTitle: string;

  inputDataWorkflows: Record<string, IApplicationExistingData>;
  existingDataWorkflows: Record<string, IApplicationExistingData[]>;
}

export interface INewCostsRevenuesInputDeckFormValues {
  costsRevenuesInputDeckTitle: string;
  costsRevenuesInputDeckDescription: string;
}

export interface INewCostsRevenuesInputDeckWorkflowProps
  extends Partial<INewCostsRevenuesInputDeckFormValues> {
  activeStep?: number;
  errors?: FormikErrors<INewCostsRevenuesInputDeckFormValues>;
  touched?: FormikTouched<INewCostsRevenuesInputDeckFormValues>;
  isValid?: boolean;
  handleChange?: (event: React.ChangeEvent<any>) => void;
  handleBlur?: (event: React.ChangeEvent<any>) => void;
  children?: (
    props: INewCostsRevenuesInputDeckWorkflowProps
  ) => JSX.Element | JSX.Element[];
}
