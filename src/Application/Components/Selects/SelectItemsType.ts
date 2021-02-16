import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { Styles, ValueType } from "react-select";

export interface ISelectOptions {
  value: string;
  label: string;
}
export type SelectOptionsType = ISelectOptions[];
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
}

export interface IApexSelectRS {
  dataOptions: ISelectOptions[];
  handleSelect: (value: ValueType<ISelectOptions, false>) => void;
  colorStyles?: Styles<ISelectOptions, false>;
}
