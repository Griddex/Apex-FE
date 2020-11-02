import { ReactNode } from "react";
import ListDialog from "./ListDialog";
import TextDialog from "./TextDialog";

export interface IApexDialogs {
  listDialog: typeof ListDialog;
  textDialog: typeof TextDialog;
}

export interface IDialogProps {
  name: string;
  title: string;
  show: boolean;
  exclusive: boolean;
  maxWidth: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  dialogText: string;
  content: JSX.Element;
  actions: () => ReactNode;
  classes: Record<string, string>;
}

export type DialogPayloadProps = {
  name: string;
  title: string;
  show: boolean;
  exclusive: boolean;
  maxWidth: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  iconClass: "error" | "success" | "select";
};

export interface IDialogTitleProps {
  iconClass: "error" | "success" | "select";
  iconColor: string;
  icon: JSX.Element;
  onClose: () => unknown;
}

export type AllDialogProps = IDialogProps & IDialogTitleProps;
export type ListDialogProps = Omit<AllDialogProps, "dialogText">;
export type TextDialogProps = Omit<AllDialogProps, "content">;

export type dialogType = "listDialog" | "textDialog";

export interface IDialogStateProps {
  dialogType: dialogType;
  dialogProps: IDialogProps;
  dialogTitleProps: IDialogTitleProps;
}

export interface IDialogState<T> {
  dialogs: T[] | [];
}
