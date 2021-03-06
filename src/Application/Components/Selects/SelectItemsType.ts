import { CSSProperties } from "react";
import {
  SelectComponentsConfig,
  OnChangeValue,
  StylesConfig,
  GroupBase,
} from "react-select";
import { SelectComponents } from "react-select/dist/declarations/src/components";

export interface ISelectOption<T = string | undefined, U = string> {
  value: T;
  label: U;
}
export interface ISelectOptionDefined<T = string, U = string> {
  value: T;
  label: U;
}

export type TSelectOptions = ISelectOption[];
export type TKeyedSelectOptions = Record<string, ISelectOption[]>;

export interface IExtendedSelectOption<T = string, U = string, V = string> {
  value: T | undefined;
  label: U;
  id?: V;
  title?: V;
  description?: V;
  unitId?: V;
  colors?: string[];
  handleCheck?: () => void;
  yAxis?: "primary" | "secondary";
}

export interface IIdNameTitlePathOption {
  id?: string;
  name: string;
  title: string;
  path?: string;
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
  handleSelect: (value: OnChangeValue<T, false>) => void;
  RSStyles?: StylesConfig<T, false>;
  menuPortalTarget: HTMLElement;
  isSelectOptionType: boolean;
  className?: string;
  containerWidth?: React.Key;
  containerHeight?: React.Key;
  isDisabled?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  components?: SelectComponentsConfig<T, false, GroupBase<T>>;
  // components?: Partial<SelectComponents<T, false, GroupBase<T>>>;
}
