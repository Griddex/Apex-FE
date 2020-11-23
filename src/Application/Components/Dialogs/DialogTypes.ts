import { ReactNode } from "react";
import ListDialog from "./ListDialog";
import TextDialog from "./TextDialog";
import SelectWorksheetDialog from "./SelectWorksheetDialog";
import FinalizeInputDialog from "./FinalizeInputDialog";

export interface IApplicationDialogs {
  listDialog: typeof ListDialog;
  textDialog: typeof TextDialog;
  selectWorksheetDialog: typeof SelectWorksheetDialog;
  finalizeInputDialog: typeof FinalizeInputDialog;
}

// export interface IDialogProps {
//   name: string;
//   title: string;
//   show: boolean;
//   exclusive: boolean;
//   maxWidth: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
//   dialogText: string;
//   content: () => ReactNode | ReactNode;
//   actions: () => ReactNode;
//   classes: Record<string, string>;
// }

// export type DialogPayloadProps = {
//   name: string;
//   title: string;
//   show: boolean;
//   exclusive: boolean;
//   maxWidth: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
//   iconType: "error" | "success" | "select";
// };

// export interface IDialogTitleProps {
//   iconType: "error" | "success" | "select";
//   iconColor: string;
//   onClose: () => unknown;
// }

// export type AllDialogProps = IDialogProps & IDialogTitleProps;
// export type ListDialogProps = Omit<AllDialogProps, "dialogText">;
// export type TextDialogProps = Omit<AllDialogProps, "content">;

// export type dialogType = "listDialog" | "textDialog";

// export interface IDialogStateProps {
//   dialogType?: dialogType;
//   dialogProps?: IDialogProps;
//   dialogTitleProps?: IDialogTitleProps;
// }

// export type dialogStore = Omit<IDialogStateProps, "dialogTitleProps">;
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

export interface DialogStuff {
  name?: string;
  title?: string;
  type?: "listDialog" | "textDialog";
  show?: boolean;
  exclusive?: boolean;
  maxWidth?: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  dialogText?: string;
  iconType?: "error" | "success" | "select";
  contentText?: string;
  contentList?: Record<string, any>;
  actionsList?: () => void;
  onClose?: () => unknown;
  classes?: Record<string, string>;
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
