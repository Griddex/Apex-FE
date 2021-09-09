import { FormikErrors, FormikTouched } from "formik";
import { IRawRow } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { IUserDetails } from "../../../Application/Components/User/UserTypes";
import { ReducersType } from "../../../Application/Components/Workflows/WorkflowTypes";
import {
  IApplicationStoredDataRow,
  TApproval,
} from "../../../Application/Types/ApplicationTypes";
import {
  TVariableName,
  TVariableTitle,
} from "../../../Settings/Redux/State/UnitSettingsStateTypes";
import { RenderTree } from "../../../Visualytics/Components/TreeView/ApexTreeViewTypes";
import { TAllChartsDataAndSpecificProperties } from "../../../Visualytics/Redux/State/VisualyticsStateTypes";
import {
  IEconomicsAnalysis,
  TBackendDevScenarioTitles,
  TDevScenarioNames,
  TDevScenarioTitles,
  TEconomicsAnalysesNames,
  TEconomicsAnalysesTitles,
  TForecastScenario,
} from "../../Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import { IAggregateButtonProps } from "../../Routes/EconomicsInput/EconomicsCostsAndRevenues/EconomicsCostsAndRevenuesTypes";
import {
  INameTitleOption,
  ISelectOption,
} from "./../../../Application/Components/Selects/SelectItemsType";

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

  chosenAppHeadersWithNone: string[];
  chosenAppHeadersWithoutNone: string[];

  chosenApplicationUnitsWithoutNone: string[];
  fileUnitsWithoutNone: string[];

  appHeaderNameUnitsMap: Record<string, string>;
  matchHeadersTable: IRawRow[];
  matchUnitsTable: IRawRow[];

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
  | "createForecastingParametersWorkflow";

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
export interface INewEconomicsResultsFormValues {
  economicsResultsTitle: string;
  economicsResultsDescription: string;
}

export interface INewEconomicsResultsWorkflowProps
  extends Partial<INewEconomicsResultsFormValues> {
  activeStep?: number;
  errors?: FormikErrors<INewEconomicsResultsFormValues>;
  touched?: FormikTouched<INewEconomicsResultsFormValues>;
  isValid?: boolean;
  handleChange?: (event: React.ChangeEvent<any>) => void;
  handleBlur?: (event: React.ChangeEvent<any>) => void;
  children?: (
    props: INewEconomicsResultsWorkflowProps
  ) => JSX.Element | JSX.Element[];
  reducer?: ReducersType;
}

export interface IStoredEconomicsResultsRow {
  sn: number;
  id: string;
  userId?: string;
  approval: TApproval;
  title: string;
  description?: string;
  saved: "Saved" | "Not Saved";
  sensitivities: "Utilized" | "None";
  analysis: TEconomicsAnalysesNames | TEconomicsAnalysesNames[];
  devScenarios: TBackendDevScenarioTitles[];
  author: IUserDetails | string;
  approvers: IUserDetails[] | string;
  createdOn: string;
  modifiedOn: string;
}

export interface IEconomicsState
  extends INewCostsRevenuesInputDeckFormValues,
    INewEconomicsParametersInputDeckFormValues {
  currentWorkflowProcess: IEconomicsWorkflowProcessesType;
  loadCostsRevenueWorkflow: boolean;
  loadEconomicsParametersWorkflow: boolean;
  loadEconomicsAnalysesWorkflow: boolean;
  loadEconomicsSensitivitiesWorkflow: boolean;
  loadEconomicsResultsWorkflow: boolean;

  currentAppHeaderOptions: ISelectOption[];

  costsRevenuesAppHeaders: Record<TDevScenarioNames, unknown[]>;
  cstRevAppHeadersSelectOptions: Record<TDevScenarioNames, ISelectOption[]>;
  cstRevAppHeadersNameMaps: Record<
    TDevScenarioNames,
    Record<TVariableTitle, TVariableName>
  >;
  ecoParAppHeadersNameMap: Record<TVariableTitle, TVariableName>;
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
  fileAppHeaderExcludeWithNoneMap: Record<
    string,
    Record<string, React.Key | boolean>
  >;

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

  selectedTableData: any[];

  heatMapTreeByScenario: RenderTree;
  sensitivitiesHeatMapTree: RenderTree;
  sensitivitiesHeatMapData: any;
  sensitivitiesHeatMap1or2D: [];
  heatMapStylingData: {
    heatMapThresholdValue: null | number;
    heatMapThresholdColor: string;
    heatMapBackgroundColor: string;
    relationalOperatorOption: ISelectOption;
  };
  heatMapVariableXOptions: Record<string, INameTitleOption>;
  heatMapVariableYOptions: Record<string, INameTitleOption>;
  heatMapVariableZOptions: Record<string, INameTitleOption>;
  showHeatMapCategoryMembersObj: Record<string, boolean>;

  economicsPlotChartsTree: RenderTree;
  plotChartsData: null;
  plotChartsDataTrans: null;
  selectedEconomicsPlotChartOption: ISelectOption;
  showPlotChartsCategories: boolean;
  plotChartsVariableXOptions: Record<string, INameTitleOption>;
  plotChartsVariableYOptions: Record<string, INameTitleOption>;

  economicsTemplatesTree: RenderTree;

  resultsAnalyis: Record<TEconomicsAnalysesNames, TEconomicsAnalysesTitles>[];

  inputDataWorkflows: Record<string, IEconomicsImport>;
  storedDataWorkflows: Record<string, IApplicationStoredDataRow[]>;
  economicsAnalysisWorkflows: Record<
    TEconomicsAnalysesNames,
    IEconomicsAnalysis
  >;
  economicsChartsWorkflows: TAllChartsDataAndSpecificProperties;
}
