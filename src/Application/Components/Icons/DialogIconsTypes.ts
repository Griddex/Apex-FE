export type IconNameType =
  | "error"
  | "success"
  | "select"
  | "information"
  | "confirmation"
  | "edit"
  | "network"
  | "table"
  | "save"
  | "create"
  | "delete"
  | "run"
  | "remove"
  | "category";

export type DialogIconsType = Record<IconNameType, JSX.Element>;
