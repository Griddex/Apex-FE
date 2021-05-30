import { FormikErrors, FormikTouched } from "formik";
import { ReducersType } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IApplicationExistingDataRow } from "../../../Application/Types/ApplicationTypes";
import {
  TVariableTitle,
  TVariableName,
} from "../../../Settings/Redux/State/UnitSettingsStateTypes";
import { RenderTree } from "../../../Visualytics/Components/TreeView/ApexTreeViewTypes";
import {
  IEconomicsAnalysis,
  TDevScenarioNames,
  TDevScenarioTitles,
  TEconomicsAnalysesNames,
  TForecastScenario,
} from "../../Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import { IAggregateButtonProps } from "../../Routes/EconomicsInput/EconomicsCostsAndRevenues/EconomicsCostsAndRevenuesTypes";
import { ISelectOption } from "./../../../Application/Components/Selects/SelectItemsType";

export interface IEconomicsImport {
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

  currentDevOption: { value: TDevScenarioNames; label: TDevScenarioTitles };
  developmentScenarios: TDevScenarioNames[];
  developmentScenariosCompleted: TDevScenarioNames[];
  costsRevenues: Record<TDevScenarioNames, []>;
  costRevenuesButtons: IAggregateButtonProps[];
  forecastScenario: TForecastScenario;

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
  | "saveForecastingParametersWorkflow";

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
export interface INewEconomicsSensitivitiesFormValues {
  economicsSensitivitiesTitle: string;
  economicsSensitivitiesDescription: string;
}

export interface INewEconomicsSensitivitiesWorkflowProps
  extends Partial<INewEconomicsSensitivitiesFormValues> {
  activeStep?: number;
  errors?: FormikErrors<INewEconomicsSensitivitiesFormValues>;
  touched?: FormikTouched<INewEconomicsSensitivitiesFormValues>;
  isValid?: boolean;
  handleChange?: (event: React.ChangeEvent<any>) => void;
  handleBlur?: (event: React.ChangeEvent<any>) => void;
  children?: (
    props: INewEconomicsSensitivitiesWorkflowProps
  ) => JSX.Element | JSX.Element[];
  reducer?: ReducersType;
}

export interface IEconomicsState
  extends INewCostsRevenuesInputDeckFormValues,
    INewEconomicsParametersInputDeckFormValues {
  //Remove from here
  forecastRun: string;
  currentWorkflowProcess: IEconomicsWorkflowProcessesType;
  loadCostsRevenueWorkflow: boolean;
  loadEconomicsParametersWorkflow: boolean;
  loadEconomicsAnalysesWorkflow: boolean;
  loadEconomicsSensitivitiesWorkflow: boolean;
  loadEconomicsResultsWorkflow: boolean;

  costsRevenuesAppHeaders: Record<TDevScenarioNames, unknown[]>;
  cstRevAppHeadersSelectOptions: Record<TDevScenarioNames, ISelectOption[]>;
  cstRevAppHeadersNameTitleMaps: Record<
    TDevScenarioNames,
    Record<TVariableTitle, TVariableName>
  >;
  costsRevenuesInputDeckId: string;
  costsRevenuesInputDeckTitle: string;
  costsRevenuesInputDeckDescription: string;

  selectedCostsRevenuesInputDeckId: string;
  selectedCostsRevenuesInputDeckTitle: string;

  economicsParametersAppHeaders: Record<string, string>[];
  ecoParAppHeadersSelectOptions: ISelectOption[];
  economicsParametersInputDeckId: string;
  economicsParametersInputDeckTitle: string;
  economicsParametersInputDeckDescription: string;

  selectedEconomicsParametersInputDeckId: string;
  selectedEconomicsParametersInputDeckTitle: string;
  selectedDevScenarioNamesCostsRevenues: TDevScenarioNames[];

  economicsSensitivitiesId: string;
  economicsSensitivitiesTitle: string;
  economicsSensitivitiesDescription: string;
  selectedEconomicsSensitivitiesId: string;
  selectedEconomicsSensitivitiesTitle: string;
  isEconomicsResultsSaved: boolean;

  noneColumnIndices: Record<number, boolean>;
  fileHeadersChosenAppHeadersWithNone: Record<string, string>[];

  selectedAnalysis: any; //type it properly?
  selectedAnalysesNames: TEconomicsAnalysesNames[];

  selectedSensitivitiesTable: any; //type it properly
  createSensitivitiesIsDialog: boolean;

  economicsResultsId: string;
  economicsResultsTitle: string;
  economicsResultsDescription: string;
  selectedEconomicsResultsId: string;
  selectedEconomicsResultsTitle: string;

  showSensitivitiesTable: boolean;

  sensitivitiesHeatMapTree: RenderTree;
  sensitivitiesHeatMapData: any;
  sensitivitiesHeatMap1or2D: [];
  heatMapStylingData: {
    heatMapThresholdValue: null | number;
    heatMapThresholdColor: string;
    heatMapBackgroundColor: string;
    relationalOperatorOption: ISelectOption;
  };
  showHeatMapCategories: boolean;
  heatMapVariableXOption: ISelectOption | null;
  heatMapVariableYOption: ISelectOption | null;
  heatMapVariableZOption: ISelectOption | null;

  economicsPlotChartsTree: RenderTree;
  plotChartsData: null;
  plotChartsDataTrans: null;
  selectedEconomicsPlotChartOption: ISelectOption;
  showPlotChartsCategories: boolean;
  plotChartsVariableXOption: ISelectOption | null;
  plotChartsVariableYPriOption: ISelectOption | null;
  plotChartsVariableYSecOption: ISelectOption | null;

  economicsTemplatesTree: RenderTree;

  inputDataWorkflows: Record<string, IEconomicsImport>;
  existingDataWorkflows: Record<string, IApplicationExistingDataRow[]>;
  economicsAnalysisWorkflows: Record<
    TEconomicsAnalysesNames,
    IEconomicsAnalysis
  >;
  economicsChartsWorkflows: Record<string, any>;
}
