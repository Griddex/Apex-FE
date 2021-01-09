import { ReactNode } from "react";
import { Column } from "react-data-griddex";
import EconomicsParametersDialog from "../../../Economics/Components/EconomicsParametersDialog";
import EconomicsParameterImportWorkflowDialog from "../../../Economics/Routes/EconomicsWorkflows/EconomicsParameterImportWorkflow";
import NewProjectDialogWorkflow from "../../../Project/Workflows/NewProjectDialogWorkflow";
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
export interface IDialogData {
  columns: readonly Column<ITableRow, unknown>[];
  rows: ITableRow[];
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
    | "newProjectDialogWorkflow";
  show?: boolean;
  exclusive?: boolean;
  maxWidth?: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  dialogText?: string;
  iconType?: "error" | "success" | "select";
  contentText?: string;
  contentList?: Record<string, any>;
  actionsList?: (() => JSX.Element) | (() => JSX.Element[]);
  onClose?: () => unknown;
  classes?: Record<string, string>;
  dialogData?: IDialogData;
  children?: JSX.Element | JSX.Element[];
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
