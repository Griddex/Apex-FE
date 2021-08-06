import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { SelectComponentsConfig, Styles, ValueType } from "react-select";

export interface ISelectOption<T = string | undefined, U = string> {
  value: T;
  label: U;
}

export type TSelectOptions = ISelectOption[];
export type TKeyedSelectOptions = Record<string, ISelectOption[]>;

export interface IExtendedSelectOption<T = string, U = string, V = string> {
  value: T | undefined;
  label: U;
  id?: V;
  unitId?: V;
  description?: V;
}

export type AppUnitSelectOptionsType = IExtendedSelectOption[];

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
  isClearable?: boolean;
  components?: SelectComponentsConfig<T, false>;
}
