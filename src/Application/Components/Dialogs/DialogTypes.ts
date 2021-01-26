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
import NewProjectDialogWorkflow from "../../../Project/Workflows/NewProjectDialogWorkflow";
import { IRawRow } from "../Table/ReactDataGrid/ApexGridTypes";
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
  economicsParameterImportWorkflowDialog: typeof EconomicsParameterImportWorkflowDialog;
  newProjectDialogWorkflow: typeof NewProjectDialogWorkflow;
  saveNetworkDialog: typeof SaveNetworkDialog;
  existingNetworksDialog: typeof ExistingNetworksDialog;
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
    | "economicsParameterImportWorkflowDialog"
    | "newProjectDialogWorkflow"
    | "saveNetworkDialog"
    | "existingNetworksDialog"
    | "existingForecastingParametersDialog"
    | "saveForecastingParametersDialog";
  show?: boolean;
  exclusive?: boolean;
  maxWidth?: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  dialogText?: string;
  iconType?: "error" | "success" | "select" | "information" | "confirmation";
  contentText?: string;
  contentList?: Record<string, any>;
  actionsList?: (() => JSX.Element) | (() => JSX.Element[]);
  onClose?: () => unknown;
  classes?: Record<string, string>;
  dialogData?: IDialogData<IRawRow>;
  children?: JSX.Element | JSX.Element[];
  workflowProcess?: string;
  dialogContentStyle?: CSSProperties;
  dialogActionsStyle?: CSSProperties;
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
