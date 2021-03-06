import { CSSProperties } from "react";
export interface IApexMuiSwitch {
  name: string;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    flag?: boolean
  ) => void;
  checked: boolean;
  checkedColor: string;
  notCheckedColor: string;
  hasLabels?: boolean;
  leftLabel?: string;
  rightLabel?: string;
  moreStyles?: CSSProperties;
}
