import { CSSProperties } from "@material-ui/core/styles/withStyles";

export type UnitOptionsType = {
  value: string;
  label: string;
  group: "field" | "metric";
}[];

export type RSOptionsType = {
  value: string;
  label: string;
};

export interface SelectOptionsType {
  [key: string]: [UnitOptionsType, UnitOptionsType];
}

export interface ISelectItem {
  currentItem: string;
  itemData: string[];
  handleChange: (event: React.ChangeEvent<any>) => void;
  label?: string;
  selectItemStyle?: CSSProperties;
}
