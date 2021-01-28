import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { ReactNode } from "react";
import { Column } from "react-data-griddex";
import EconomicsParametersDialog from "../../../Economics/Components/EconomicsParametersDialog";
import EconomicsParameterImportWorkflowDialog from "../../../Economics/Routes/EconomicsWorkflows/EconomicsParameterImportWorkflow";
import ExistingForecastingParametersDialog from "../../../Network/Components/Dialogs/ExistingForecastingParametersDialog";
import ExistingNetworksDialog from "../../../Network/Components/Dialogs/ExistingNetworksDialog";
import RunForecastDialog from "../../../Network/Components/Dialogs/RunForecastDialog";
import SaveForecastingParametersDialog from "../../../Network/Components/Dialogs/SaveForecastingParametersDialog";
import SaveNetworkDialog from "../../../Network/Components/Dialogs/SaveNetworkDialog";
import GenerateNetworkDialogWorkflow from "../../../Network/Workflows/GenerateNetworkDialogWorkflow";
import NewProjectDialogWorkflow from "../../../Project/Workflows/NewProjectDialogWorkflow";
import { IconNameType } from "../Icons/DialogIconsTypes";
import { IRawRow } from "../Table/ReactDataGrid/ApexGridTypes";
import { IAllWorkflowProcesses } from "../Workflows/WorkflowTypes";
import FinalizeInputDialog from "./FinalizeInputDialog";
import ListDialog from "./ListDialog";
import SelectWorksheetDialog from "./SelectWorksheetDialog";
import TextDialog from "./TextDialog";

export interface IApplicationDialogs {
  listDialog: typeof ListDialog;
  textDialog: typeof TextDialog;
  selectWorksheetDialog: typeof SelectWorksheetDialog;
  finalizeInputDialog: typeof FinalizeInputDialog;
  economicsParametersDialog: typeof EconomicsParametersDialog;
  economicsParameterImportDialogWorkflow: typeof EconomicsParameterImportWorkflowDialog;
  newProjectDialogWorkflow: typeof NewProjectDialogWorkflow;
  saveNetworkDialog: typeof SaveNetworkDialog;
  existingNetworksDialog: typeof ExistingNetworksDialog;
  networkGenerationDialogWorkflow: typeof GenerateNetworkDialogWorkflow;
  existingForecastingParametersDialog: typeof ExistingForecastingParametersDialog;
  saveForecastingParametersDialog: typeof SaveForecastingParametersDialog;
  runForecastDialog: typeof RunForecastDialog;
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
    | "selectWorksheetDialog"
    | "finalizeInputDialog"
    | "economicsParametersDialog"
    | "economicsParameterImportDialogWorkflow"
    | "newProjectDialogWorkflow"
    | "saveNetworkDialog"
    | "existingNetworksDialog"
    | "networkGenerationDialogWorkflow"
    | "existingForecastingParametersDialog"
    | "saveForecastingParametersDialog";
  show?: boolean;
  exclusive?: boolean;
  maxWidth?: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  dialogText?: string;
  iconType?: IconNameType;
  contentText?: string;
  contentList?: Record<string, any>;
  actionsList?: (() => JSX.Element) | (() => JSX.Element[]);
  onClose?: () => unknown;
  classes?: Record<string, string>;
  dialogData?: IDialogData<IRawRow>;
  children?: JSX.Element | JSX.Element[];
  dialogContentStyle?: CSSProperties;
  dialogActionsStyle?: CSSProperties;
  workflowProcess?: IAllWorkflowProcesses["workflowProcess"];
  workflowCategory?: IAllWorkflowProcesses["workflowCategory"];
}
export interface IDialogState<T> {
  dialogs: T[] | [];
}

export interface ButtonProps {
  title?: string;
  type?: "button" | "submit" | "reset" | undefined;
  variant?: "text" | "outlined" | "contained";
  color?: "inherit" | "primary" | "secondary" | "default";
  startIcon: ReactNode;
  handleAction?: () => { type: string } | void;
}
