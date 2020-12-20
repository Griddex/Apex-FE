import { ReactNode } from "react";
import ListDialog from "./ListDialog";
import TextDialog from "./TextDialog";
import SelectWorksheetDialog from "./SelectWorksheetDialog";
import FinalizeInputDialog from "./FinalizeInputDialog";
import { Column } from "react-data-griddex";
import EconomicsParametersDialog from "../../../Economics/Components/EconomicsParametersDialog";

export interface IApplicationDialogs {
  listDialog: typeof ListDialog;
  textDialog: typeof TextDialog;
  selectWorksheetDialog: typeof SelectWorksheetDialog;
  finalizeInputDialog: typeof FinalizeInputDialog;
  economicsParametersDialog: typeof EconomicsParametersDialog;
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
  type?: "listDialog" | "textDialog" | "economicsParametersDialog";
  show?: boolean;
  exclusive?: boolean;
  maxWidth?: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  dialogText?: string;
  iconType?: "error" | "success" | "select";
  contentText?: string;
  contentList?: Record<string, any>;
  actionsList?: () => JSX.Element;
  onClose?: () => unknown;
  classes?: Record<string, string>;
  dialogData?: IDialogData;
}
export interface IDialogState<T> {
  dialogs: T[] | [];
}

export interface ButtonProps {
  title?: string;
  variant?: "text" | "outlined" | "contained";
  color?: "inherit" | "primary" | "secondary" | "default";
  startIcon: ReactNode;
  handleAction: () => { type: string } | void;
}
