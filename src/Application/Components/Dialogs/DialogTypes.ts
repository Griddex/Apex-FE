import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";
import { Column } from "react-data-griddex";
import CreateEconomicsParametersTableDialog from "../../../Economics/Components/Dialogs/CreateEconomicsParametersTableDialog";
import EconomicsParametersDialog from "../../../Economics/Components/Dialogs/EconomicsParametersDialog";
import EconomicsParametersSensitivitiesDialog from "../../../Economics/Components/Dialogs/EconomicsParametersSensitivitiesDialog";
import ExistingEconomicsSensitivitiesDialog from "../../../Economics/Components/Dialogs/ExistingEconomicsSensitivitiesDialog";
import SaveCostsRevenuesInputDeckDialog from "../../../Economics/Components/Dialogs/SaveCostsRevenuesInputDeckDialog";
import SaveEconomicsParametersInputDeckDialog from "../../../Economics/Components/Dialogs/SaveEconomicsParametersInputDeckDialog";
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
import {
  default as DeclineCurveParametersDialog,
  default as CreateNewForecastingParametersWorkflowDialog,
} from "../../../Network/Components/Dialogs/DeclineCurveParametersDialog";
import ExistingForecastingParametersDialog from "../../../Network/Components/Dialogs/ExistingForecastingParametersDialog";
import ExistingNetworksDialog from "../../../Network/Components/Dialogs/ExistingNetworksDialog";
import GenerateNetworkWorkflowDialog from "../../../Network/Components/Dialogs/GenerateNetworkWorkflowDialog";
import RunForecastDialog from "../../../Network/Components/Dialogs/RunForecastDialog";
import RunForecastWorkflowDialog from "../../../Network/Components/Dialogs/RunForecastWorkflowDialog";
import SaveForecastDialog from "../../../Network/Components/Dialogs/SaveForecastDialog";
import SaveNetworkDialog from "../../../Network/Components/Dialogs/SaveNetworkDialog";
import ExistingProjectsDialog from "../../../Project/Components/Dialogs/ExistingProjectsDialog";
import { TUseState } from "../../Types/ApplicationTypes";
import { IApexEditor } from "../Editors/ApexEditor";
import { IconNameType } from "../Icons/DialogIconsTypes";
import { IRawRow } from "../Table/ReactDataGrid/ApexGridTypes";
import { IAllWorkflows, ReducersType } from "../Workflows/WorkflowTypes";
import ListDialog from "./ListDialog";
import NewProjectWorkflowDialog from "./NewProjectWorkflowDialog";
import SelectWorksheetDialog from "./SelectWorksheetDialog";
import TableDataDialog from "./TableDataDialog";
import TableEditorDialog from "./TableEditorDialog";
import TextDialog from "./TextDialog";

export interface IApplicationDialogs {
  listDialog: typeof ListDialog;
  textDialog: typeof TextDialog;
  existingProjectsDialog: typeof ExistingProjectsDialog;
  selectWorksheetDialog: typeof SelectWorksheetDialog;
  finalizeForecastInputDeckDialog: typeof FinalizeForecastInputDeckDialog;
  saveFacilitiesInputDeckDialog: typeof SaveFacilitiesInputDeckDialog;
  saveForecastInputDeckDialog: typeof SaveForecastInputDeckDialog;
  saveInputDeckGenerateNetworkWorkflowDialog: typeof SaveInputDeckGenerateNetworkWorkflowDialog;
  economicsParametersDialog: typeof EconomicsParametersDialog;
  newProjectWorkflowDialog: typeof NewProjectWorkflowDialog;
  saveNetworkDialog: typeof SaveNetworkDialog;
  existingNetworksDialog: typeof ExistingNetworksDialog;
  generateNetworkWorkflowDialog: typeof GenerateNetworkWorkflowDialog;
  existingForecastingParametersDialog: typeof ExistingForecastingParametersDialog;
  createNewForecastingParametersWorkflowDialog: typeof CreateNewForecastingParametersWorkflowDialog;

  declineCurveParametersDialog: typeof DeclineCurveParametersDialog;
  productionStreamPrioritizationDialog: typeof DeclineCurveParametersDialog;

  runForecastDialog: typeof RunForecastDialog;
  runForecastWorkflowDialog: typeof RunForecastWorkflowDialog;
  saveForecastDialog: typeof SaveForecastDialog;
  saveCostsRevenuesInputDeckDialog: typeof SaveCostsRevenuesInputDeckDialog;
  saveEconomicsParametersInputDeckDialog: typeof SaveEconomicsParametersInputDeckDialog;
  createEconomicsParametersTableDialog: typeof CreateEconomicsParametersTableDialog;
  economicsParametersSensitivitiesDialog: typeof EconomicsParametersSensitivitiesDialog;
  saveEconomicsSensitivitiesDialog: typeof SaveEconomicsSensitivitiesDialog;
  existingEconomicsSensitivitiesDialog: typeof ExistingEconomicsSensitivitiesDialog;
  selectDevelopmentScenariosDialog: typeof SelectDevelopmentScenariosDialog;
  tableDataDialog: typeof TableDataDialog;
  tableEditorDialog: typeof TableEditorDialog;
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
export interface DialogStuff {
  name?: string;
  title?: string;
  type?:
    | "listDialog"
    | "textDialog"
    | "existingProjectsDialog"
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
    | "existingNetworksDialog"
    | "generateNetworkWorkflowDialog"
    | "existingForecastingParametersDialog"
    | "createNewForecastingParametersWorkflowDialog"
    | "declineCurveParametersDialog"
    | "productionStreamPrioritizationDialog"
    | "saveCostsRevenuesInputDeckDialog"
    | "saveEconomicsParametersInputDeckDialog"
    | "createEconomicsParametersTableDialog"
    | "economicsParametersSensitivitiesDialog"
    | "saveEconomicsSensitivitiesDialog"
    | "existingEconomicsSensitivitiesDialog"
    | "selectDevelopmentScenariosDialog"
    | "tableDataDialog"
    | "tableEditorDialog";
  show?: boolean;
  exclusive?: boolean;
  maxWidth?: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  dialogText?: string;
  iconType?: IconNameType;
  contentText?: string;
  contentList?: Record<string, any>;
  actionsList?: (par?: any) => JSX.Element | JSX.Element[];
  onClose?: () => void;
  classes?: Record<string, string>;
  dialogData?: IDialogData<IRawRow>;
  children?: JSX.Element | JSX.Element[];
  dialogContentStyle?: CSSProperties;
  dialogActionsStyle?: CSSProperties;
  selectedRowIndex?: number;
  workflowProcess?: IAllWorkflows["wrkflwPrcss"];
  workflowCategory?: IAllWorkflows["wrkflwCtgry"];
  reducer?: ReducersType;
  economicsTableData?: IEconomicsParametersTable;
  economicsAnalyses?: TEconomicsAnalyses;
  selectedAnalysis?: IEconomicsAnalysis;
  rows?: IRawRow[];
  columns?: Column<IRawRow>[];
  setRows?: TUseState<any>;
  apexEditorProps?: IApexEditor;
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
  handleAction?: () => { type: string } | void;
  handleRemove?: () => void;
}
