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
  | "link"
  | "navigation"
  | "category"
  | "finalize";

export type DialogIconsType = Record<IconNameType, JSX.Element>;
