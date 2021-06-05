export type IconNameType =
  | "error"
  | "success"
  | "select"
  | "information"
  | "confirmation"
  | "edit"
  | "network";

export type DialogIconsType = Record<IconNameType, JSX.Element>;
