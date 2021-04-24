import { FormikErrors, FormikTouched } from "formik";
import { ReducersType } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IApplicationExistingData } from "../../../Application/Types/ApplicationTypes";

export interface IEconomicsState {
  fileLastModified: string;
  filePath: string;
  fileType: string;
  fileName: string;
  fileSize: string;
  fileAuthor: string;
  fileCreated: string;

  fileAccepted: false;
  dnDDisabled: false;
  inputFile: any;

  workSheetNames: string[];
  selectedWorksheetName: string;
  selectedWorksheetData: Record<string, React.Key>[];

  tableHeaders: string[];
  fileHeaders: string[];
  fileHeadersMatch: [];
  selectedHeaderRowIndex: 0;
  selectedHeaderOptionIndex: 0;
  chosenApplicationHeadersIndices: [];
  headerRowOptionsIndices: [];

  fileUnits: string[];
  fileUniqueUnits: [];
  fileUnitsMatch: [];
  fileUnitsMatchUnique: [];
  selectedUnitRowIndex: 0;
  selectedUnitOptionIndex: 0;
  unitRowOptionsIndices: [];
  tableRoleNames: string[];
  optionIndices: number[];
  tableData: Record<string, React.Key>[];
  columnNameTableData: Record<string, React.Key>[];
  inputDeckData: Record<string, React.Key>[];
  selectedRow: Record<string, React.Key>;

  chosenApplicationHeadersWithNone: string[];
  chosenApplicationHeadersWithoutNone: string[];

  chosenApplicationUnitsWithoutNone: string[];
  fileUnitsWithoutNone: string[];

  variableUnits: Record<string, string>;

  title: string;
  description: string;
  inputDeckId: string;
  status: number;
  message: string;
  errors: { message: string };
  success: false;
}

export type IEconomicsWorkflowProcessesType =
  | "economicsAnalyses"
  | "economicsParameterImportWorkflow"
  | "economicsParameters"
  | "netCashAnalysisWorkflow"
  | "saveForecastingParametersWorkflowDialog";

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
  reducer?: ReducersType;
}
export interface INewEconomicsParametersInputDeckFormValues {
  economicsParametersInputDeckTitle: string;
  economicsParametersInputDeckDescription: string;
}

export interface INewEconomicsParametersInputDeckWorkflowProps
  extends Partial<INewEconomicsParametersInputDeckFormValues> {
  activeStep?: number;
  errors?: FormikErrors<INewEconomicsParametersInputDeckFormValues>;
  touched?: FormikTouched<INewEconomicsParametersInputDeckFormValues>;
  isValid?: boolean;
  handleChange?: (event: React.ChangeEvent<any>) => void;
  handleBlur?: (event: React.ChangeEvent<any>) => void;
  children?: (
    props: INewEconomicsParametersInputDeckWorkflowProps
  ) => JSX.Element | JSX.Element[];
  reducer?: ReducersType;
}

export interface EconomicsStateType
  extends INewCostsRevenuesInputDeckFormValues,
    INewEconomicsParametersInputDeckFormValues {
  //Remove from here
  forecastRun: string;
  currentWorkflowProcess: IEconomicsWorkflowProcessesType;
  loadCostsRevenueWorkflow: boolean;
  loadEconomicsParametersWorkflow: boolean;

  costsRevenuesAppHeaders: Record<string, string>[];
  costsRevenuesInputDeckId: string;
  costsRevenuesInputDeckTitle: string;
  costsRevenuesInputDeckDescription: string;

  selectedCostsRevenuesInputDeckId: string;
  selectedCostsRevenuesInputDeckTitle: string;

  economicsParametersAppHeaders: Record<string, string>[];
  economicsParametersInputDeckId: string;
  economicsParametersInputDeckTitle: string;
  economicsParametersInputDeckDescription: string;

  selectedEconomicsParametersInputDeckId: string;
  selectedEconomicsParametersInputDeckTitle: string;

  selectedEconomicsResultsId: string;
  selectedEconomicsResultsTitle: string;

  inputDataWorkflows: Record<string, IEconomicsState>;
  existingDataWorkflows: Record<string, IApplicationExistingData[]>;
}
