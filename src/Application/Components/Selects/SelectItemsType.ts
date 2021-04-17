import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { Styles, ValueType } from "react-select";

export interface ISelectOption {
  value: string;
  label: string;
}
export type SelectOptionsType = ISelectOption[];
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
  dataOptions: ISelectOption[];
  handleSelect: (value: ValueType<ISelectOption, false>) => void;
  RSStyles?: Styles<ISelectOption, false>;
}
