import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";
import { Column } from "react-data-griddex";
import CreateEconomicsParametersTableDialog from "../../../Economics/Components/Dialogs/CreateEconomicsParametersTableDialog";
import EconomicsParametersDialog from "../../../Economics/Components/Dialogs/EconomicsParametersDialog";
import EconomicsParametersSensitivitiesDialog from "../../../Economics/Components/Dialogs/EconomicsParametersSensitivitiesDialog";
import StoredEconomicsSensitivitiesDialog from "../../../Economics/Components/Dialogs/StoredEconomicsSensitivitiesDialog";
import SaveCostsRevenuesInputDeckDialog from "../../../Economics/Components/Dialogs/SaveCostsRevenuesInputDeckDialog";
import SaveEconomicsParametersInputDeckDialog from "../../../Economics/Components/Dialogs/SaveEconomicsParametersInputDeckDialog";
import SaveEconomicsResultsDialog from "../../../Economics/Components/Dialogs/SaveEconomicsResultsDialog";
import SaveEconomicsSensitivitiesDialog from "../../../Economics/Components/Dialogs/SaveEconomicsSensitivitiesDialog";
import SelectDevelopmentScenariosDialog from "../../../Economics/Components/Dialogs/SelectDevelopmentScenariosDialog";
import { IEconomicsParametersTable } from "../../../Economics/Components/Parameters/IParametersType";
import {
  IEconomicsAnalysis,
  TDevScenarioNames,
  TEconomicsAnalyses,
} from "../../../Economics/Routes/EconomicsAnalyses/EconomicsAnalysesTypes";
import FinalizeForecastInputDeckDialog from "../../../Import/Components/Dialogs/FinalizeForecastInputDeckDialog";
import SaveFacilitiesInputDeckDialog from "../../../Import/Components/Dialogs/SaveFacilitiesInputDeckDialog";
import SaveForecastInputDeckDialog from "../../../Import/Components/Dialogs/SaveForecastInputDeckDialog";
import SaveInputDeckGenerateNetworkWorkflowDialog from "../../../Import/Components/Dialogs/SaveInputDeckGenerateNetworkWorkflowDialog";
import StoredForecastingParametersDialog from "../../../Network/Components/Dialogs/StoredForecastingParametersDialog";
import StoredNetworksDialog from "../../../Network/Components/Dialogs/StoredNetworksDialog";
import GenerateNetworkWorkflowDialog from "../../../Network/Components/Dialogs/GenerateNetworkWorkflowDialog";
import RunForecastDialog from "../../../Network/Components/Dialogs/RunForecastDialog";
import RunForecastWorkflowDialog from "../../../Network/Components/Dialogs/RunForecastWorkflowDialog";
import SaveForecastDialog from "../../../Network/Components/Dialogs/SaveForecastDialog";
import SaveNetworkDialog from "../../../Network/Components/Dialogs/SaveNetworkDialog";
import StoredProjectsDialog from "../../../Project/Components/Dialogs/StoredProjectsDialog";
import { TUseState } from "../../Types/ApplicationTypes";
import { IApexEditor } from "../Editors/ApexEditor";
import { IconNameType } from "../Icons/DialogIconsTypes";
import { IRawRow } from "../Table/ReactDataGrid/ApexGridTypes";
import { IAllWorkflows, ReducersType } from "../Workflows/WorkflowTypes";
import DraggableDialog from "./DraggableDialog";
import ListDialog from "./ListDialog";
import NewProjectWorkflowDialog from "./NewProjectWorkflowDialog";
import SelectWorksheetDialog from "./SelectWorksheetDialog";
import TableDataDialog from "./TableDataDialog";
import TableEditorDialog from "./TableEditorDialog";
import TextDialog from "./TextDialog";
import EditOrCreateForecastingParametersWorkflowDialog from "../../../Network/Components/Dialogs/EditOrCreateForecastingParametersWorkflowDialog";
import EditOrCreateDeclineParametersWorkflowDialog from "../../../Network/Components/Dialogs/EditOrCreateDeclineParametersWorkflowDialog";
import DeclineCurveParametersDialog from "../../../Network/Components/Dialogs/DeclineCurveParametersDialog";
import ProductionStreamPrioritizationDialog from "../../../Network/Components/Dialogs/ProductionStreamPrioritizationDialog";
import StoredProductionStreamPrioritizationDialog from "../../../Network/Components/Dialogs/StoredProductionStreamPrioritizationDialog";
import StoredDeclineCurveParametersDialog from "../../../Network/Components/Dialogs/StoredDeclineCurveParametersDialog";
import DeleteDataDialog from "./DeleteDataDialog";
import SnapshotDialog from "./SnapshotDialog";
import NetworkWidgetDialog from "../../../Network/Components/Dialogs/NetworkWidgetDialog";

export interface IApplicationDialogs {
  listDialog: typeof ListDialog;
  textDialog: typeof TextDialog;
  storedProjectsDialog: typeof StoredProjectsDialog;
  selectWorksheetDialog: typeof SelectWorksheetDialog;
  finalizeForecastInputDeckDialog: typeof FinalizeForecastInputDeckDialog;
  saveFacilitiesInputDeckDialog: typeof SaveFacilitiesInputDeckDialog;
  saveForecastInputDeckDialog: typeof SaveForecastInputDeckDialog;
  saveInputDeckGenerateNetworkWorkflowDialog: typeof SaveInputDeckGenerateNetworkWorkflowDialog;
  economicsParametersDialog: typeof EconomicsParametersDialog;
  newProjectWorkflowDialog: typeof NewProjectWorkflowDialog;
  saveNetworkDialog: typeof SaveNetworkDialog;
  storedNetworksDialog: typeof StoredNetworksDialog;
  generateNetworkWorkflowDialog: typeof GenerateNetworkWorkflowDialog;
  storedForecastingParametersDialog: typeof StoredForecastingParametersDialog;
  createForecastingParametersWorkflowDialog: typeof EditOrCreateForecastingParametersWorkflowDialog;
  createDeclineParametersWorkflowDialog: typeof EditOrCreateDeclineParametersWorkflowDialog;

  declineCurveParametersDialog: typeof DeclineCurveParametersDialog;
  productionStreamPrioritizationDialog: typeof ProductionStreamPrioritizationDialog;

  runForecastDialog: typeof RunForecastDialog;
  runForecastWorkflowDialog: typeof RunForecastWorkflowDialog;
  saveForecastDialog: typeof SaveForecastDialog;
  saveCostsRevenuesInputDeckDialog: typeof SaveCostsRevenuesInputDeckDialog;
  saveEconomicsParametersInputDeckDialog: typeof SaveEconomicsParametersInputDeckDialog;
  createEconomicsParametersTableDialog: typeof CreateEconomicsParametersTableDialog;
  economicsParametersSensitivitiesDialog: typeof EconomicsParametersSensitivitiesDialog;
  saveEconomicsSensitivitiesDialog: typeof SaveEconomicsSensitivitiesDialog;
  storedEconomicsSensitivitiesDialog: typeof StoredEconomicsSensitivitiesDialog;
  selectDevelopmentScenariosDialog: typeof SelectDevelopmentScenariosDialog;

  tableDataDialog: typeof TableDataDialog;
  tableEditorDialog: typeof TableEditorDialog;
  draggableDialog: typeof DraggableDialog;
  deleteDataDialog: typeof DeleteDataDialog;

  saveEconomicsResultsDialog: typeof SaveEconomicsResultsDialog;

  storedDeclineCurveParametersDialog: typeof StoredDeclineCurveParametersDialog;
  storedProductionStreamPrioritizationDialog: typeof StoredProductionStreamPrioritizationDialog;

  snapshotDialog: typeof SnapshotDialog;
  networkWidgetDialog: typeof NetworkWidgetDialog;
}

export interface IDialogsServiceProps {
  contentName: string;
  actionsName: string;
  workSheetNames: string[];
  selectedWorksheetName: string;
  inputFile: Record<string, number | string | Element>[];
  skipped: Set<string>;
  isStepSkipped: boolean;
  activeStep: number;
  steps: string[];
}

export type ITableRow = Record<string, React.Key>;
export interface IDialogData<T> {
  columns: Column<T>[];
  rows: T[];
}
export interface DialogStuff<TRow = IRawRow> {
  name?: string;
  title?: string;
  type?:
    | "listDialog"
    | "textDialog"
    | "storedProjectsDialog"
    | "selectWorksheetDialog"
    | "finalizeForecastInputDeckDialog"
    | "saveFacilitiesInputDeckDialog"
    | "saveForecastInputDeckDialog"
    | "saveInputDeckGenerateNetworkWorkflowDialog"
    | "runForecastDialog"
    | "runForecastWorkflowDialog"
    | "saveForecastDialog"
    | "economicsParametersDialog"
    | "newProjectWorkflowDialog"
    | "saveNetworkDialog"
    | "storedNetworksDialog"
    | "generateNetworkWorkflowDialog"
    | "storedForecastingParametersDialog"
    | "createForecastingParametersWorkflowDialog"
    | "declineCurveParametersDialog"
    | "productionStreamPrioritizationDialog"
    | "saveCostsRevenuesInputDeckDialog"
    | "saveEconomicsParametersInputDeckDialog"
    | "createEconomicsParametersTableDialog"
    | "economicsParametersSensitivitiesDialog"
    | "saveEconomicsSensitivitiesDialog"
    | "storedEconomicsSensitivitiesDialog"
    | "selectDevelopmentScenariosDialog"
    | "tableDataDialog"
    | "tableEditorDialog"
    | "draggableDialog"
    | "deleteDataDialog"
    | "saveEconomicsResultsDialog"
    | "storedDeclineCurveParametersDialog"
    | "storedProductionStreamPrioritizationDialog"
    | "snapshotDialog"
    | "networkWidgetDialog"
    | "createDeclineParametersWorkflowDialog";
  show?: boolean;
  exclusive?: boolean;
  maxWidth?: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  dialogText?: string;
  iconType?: IconNameType;
  contentText?: string;
  contentList?: Record<string, any>;
  actionsList?: (arg?: any) => JSX.Element | JSX.Element[];
  onClose?: () => void;
  classes?: Record<string, string>;
  dialogData?: IDialogData<TRow>;
  children?: JSX.Element | JSX.Element[];
  dialogContentStyle?: CSSProperties;
  dialogActionsStyle?: CSSProperties;
  selectedRowIndex?: number;
  workflowProcess?: IAllWorkflows["wrkflwPrcss"];
  workflowCategory?: IAllWorkflows["wrkflwCtgry"];
  reducer?: ReducersType;
  selectedTableData?: any[];
  economicsTableData?: IEconomicsParametersTable;
  economicsAnalyses?: TEconomicsAnalyses;
  selectedAnalysis?: IEconomicsAnalysis;
  currentRow?: TRow;
  rows?: TRow[];
  columns?: Column<TRow>[];
  setRows?: TUseState<any>;
  showCategories?: boolean;
  setShowCategories?: TUseState<boolean>;
  apexEditorProps?: Partial<IApexEditor>;
  apexEditorComponent?: React.FC<any>;
  isCustomComponent?: boolean;
  forecastParametersIndex?: number;
  initialState?: any;
  deleteTitle?: string;
  snapshot?: any;
  widgetComponent?: React.FC<any>;
}
export interface IDialogState<T> {
  dialogs: T[] | [];
}

export interface ButtonProps {
  title?: string;
  name?: TDevScenarioNames | string;
  type?: "button" | "submit" | "reset" | undefined;
  variant?: "text" | "outlined" | "contained";
  color?: "inherit" | "primary" | "secondary" | "default";
  startIcon?: JSX.Element;
  handleAction?: (i?: number) => { type: string } | void;
  handleRemove?: () => void;
}
