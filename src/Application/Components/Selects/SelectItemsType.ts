import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { Styles, ValueType } from "react-select";

export interface ISelectOption<T = string, U = string> {
  value: T;
  label: U;
}
export type SelectOptionsType = ISelectOption[];

export interface IAppUnitSelectOption<T = string, U = string, V = string> {
  value: T;
  label: U;
  unitId?: V;
}
export type AppUnitSelectOptionsType = IAppUnitSelectOption[];

export interface ISelectItem {
  name: string;
  currentItem: string;
  itemData: string[];
  handleChange: (event: React.ChangeEvent<any>) => void;
  label?: string;
  selectItemStyle?: CSSProperties;
}

export interface IApexSelect {
  name: string;
  currentItem: string;
  itemData: string[];
  handleChange: (event: React.ChangeEvent<any>) => void;
  handleBlur: (event: React.ChangeEvent<any>) => void;
  label?: string;
  selectItemStyle?: CSSProperties;
  className?: string;
}

export interface IApexSelectRS<T extends ISelectOption> {
  valueOption: T;
  data: string[] | T[];
  handleSelect: (value: ValueType<T, false>) => void;
  RSStyles?: Styles<T, false>;
  menuPortalTarget: HTMLElement;
  isSelectOptionType: boolean;
  className?: string;
  containerWidth?: React.Key;
  containerHeight?: React.Key;
  isDisabled?: boolean;
}
