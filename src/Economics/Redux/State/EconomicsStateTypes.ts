import { FormikErrors, FormikTouched } from "formik";
import { IRawRow } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { IUserDetails } from "../../../Application/Components/User/UserTypes";
import { TReducer } from "../../../Application/Components/Workflows/WorkflowTypes";
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
  IEconomicsSensitivities,
  TBackendDevScenarioTitles,
  TDevScenarioNames,
  TDevScenarioTitles,
  TEconomicsAnalysesNames,
  TEconomicsAnalysesTitles,
  TEconomicsResultsCase,
  TForecastScenario,
} from "../../Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import { IAggregateButtonProps } from "../../Routes/EconomicsInput/EconomicsCostsAndRevenues/EconomicsCostsAndRevenuesTypes";
import { IDragItem } from "./../../../Visualytics/Components/ChartCategories/ChartCategoryTypes";
import {
  IIdNameTitlePathOption,
  ISelectOption,
} from "./../../../Application/Components/Selects/SelectItemsType";
import { TChartStory } from "../../../Visualytics/Components/Charts/ChartTypes";

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
  basedOnVariables: Record<string, string>;

  chosenAppHeadersWithNone: string[];
  chosenAppHeadersWithoutNone: string[];

  chosenApplicationUnitsWithoutNone: string[];
  fileUnitsWithoutNone: string[];

  appHeaderNameUnitIdsMap: Record<string, string>;
  appHeaderNameUnitTitlesMap: Record<string, string>;
  matchHeadersRows: IRawRow[];
  matchUnitsRows: IRawRow[];

  currentDevOption: { value: TDevScenarioNames; label: TDevScenarioTitles };
  developmentScenarios: TDevScenarioNames[];
  developmentScenariosCompleted: TDevScenarioNames[];
  costsRevenues: Record<TDevScenarioNames, []>;
  costRevenuesButtons: IAggregateButtonProps[];
  forecastCase: TForecastScenario;

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
  | "forecastParametersCreate";

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
  reducer?: TReducer;
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
  reducer?: TReducer;
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
  reducer?: TReducer;
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
  reducer?: TReducer;
}

export interface IStoredEconomicsResultsRow {
  sn: number;
  id: string;
  economicsResultsId: string;
  userId?: string;
  approval: TApproval;
  title: string;
  description?: string;
  saved: "Saved" | "Not Saved";
  sensitivities: "Utilized" | "None";
  analysisNames: TEconomicsAnalysesNames[];
  devScenarios: TBackendDevScenarioTitles[];
  author: IUserDetails | string;
  approvers: IUserDetails[] | string;
  createdOn: string;
  modifiedOn: string;
}

export interface IEconomicsState
  extends INewCostsRevenuesInputDeckFormValues,
    INewEconomicsParametersInputDeckFormValues {
  currentChartStory: TChartStory;
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

  createSensitivitiesIsDialog: boolean;

  economicsResultsId: string;
  economicsResultsTitle: string;
  economicsResultsDescription: string;
  selectedEconomicsResultsId: string;
  selectedEconomicsResultsTitle: string;

  sensitivitiesTablePresent: boolean;

  allDevRows: Record<TDevScenarioNames, IRawRow[]>;
  selectedTableData: any[];
  analysisOption: ISelectOption;

  heatMapTreeByScenario: RenderTree;
  sensitivitiesHeatMapTree: Record<string, RenderTree>;
  sensitivitiesHeatMapData: any;
  sensitivitiesHeatMap1or2D: [];
  sensitivitiesHeatMapThresholdData: {
    heatMapThresholdValue: null | number;
    heatMapThresholdColor: string;
    heatMapBackgroundColor: string;
    relationalOperatorOption: ISelectOption;
  };

  heatMapVariableXOptions: Record<string, IIdNameTitlePathOption>;
  heatMapVariableYOptions: Record<string, IIdNameTitlePathOption>;
  heatMapVariableZOptions: Record<string, IIdNameTitlePathOption>;

  selectedZ: string;

  showHeatMapCategoryMembersObj: Record<string, boolean>;
  heatMapCategoryDragItems: Record<string, Record<string, IDragItem>>;
  heatMapCategoryHasDropped: Record<string, Record<string, true>>;

  showCategoryZMembers: boolean;

  xValueCategories: string[];
  economicsPlotChartsTree: Record<string, RenderTree>;
  plotChartsResults: any[];
  plotChartsData: null;
  plotChartsDataTrans: null;
  selectedEconomicsPlotChartOption: ISelectOption;
  selectedEconomicsPlotSecondaryChartOption: ISelectOption;

  plotChartsVariableXOptions: Record<string, IIdNameTitlePathOption>;
  plotChartsVariableYOptions: Record<string, IIdNameTitlePathOption>;
  plotChartsSecondaryVariableYOptions: Record<string, IIdNameTitlePathOption>;
  plotChartsVariableZOptions: Record<string, IIdNameTitlePathOption>;
  plotChartsVariableROptions: Record<string, IIdNameTitlePathOption>;

  showPlotChartsCategoryMembersObj: Record<string, boolean>;
  plotChartsCategoryDragItems: Record<string, Record<string, IDragItem>>;
  plotChartsCategoryHasDropped: Record<string, Record<string, true>>;
  plotChartsHeatMapThresholdData: {
    heatMapThresholdValue: null | number;
    heatMapThresholdColor: string;
    heatMapBackgroundColor: string;
    relationalOperatorOption: ISelectOption;
  };

  economicsTemplatesTree: Record<string, RenderTree>;

  economicsRanking: any[];
  sensitivitiesTable: any[];

  economicsResultsCase: TEconomicsResultsCase;
  resultsAnalyisOptions: ISelectOption[];

  forecastEconomicsAggregated: Record<string, any[]>;

  inputDataWorkflows: Record<string, IEconomicsImport>;
  storedDataWorkflows: Record<string, IApplicationStoredDataRow[]>;
  economicsAnalysisWorkflows: Record<
    TEconomicsAnalysesNames,
    IEconomicsAnalysis
  > &
    IEconomicsSensitivities;
  economicsChartsWorkflows: TAllChartsDataAndSpecificProperties;
}
