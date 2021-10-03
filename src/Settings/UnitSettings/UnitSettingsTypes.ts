import { CSSProperties } from "react";

export type UnitOptionsType = {
  value: string;
  label: string;
  group: "field" | "metric";
}[];

export type RSOptionsType = {
  value: string;
  label: string;
};

export interface TSelectOptions {
  [key: string]: [UnitOptionsType, UnitOptionsType];
}

export interface ISelectItem {
  currentItem: string;
  itemData: string[];
  handleChange: (event: React.ChangeEvent<any>) => void;
  label?: string;
  selectItemStyle?: CSSProperties;
}

export type TDayFormatValues = "d" | "do" | "dd" | "ddd";
export type TMonthFormatValues = "M" | "Mo" | "MM" | "MMM" | "MMMM";
export type TYearFormatValues = "y" | "yo" | "yy" | "yyyy";
