import { ValueType } from "react-select";
import {
  TDayFormatValues,
  TMonthFormatValues,
  TYearFormatValues,
} from "../../../Settings/UnitSettings/UnitSettingsTypes";
import generateSelectOptions from "./../../Utils/GenerateSelectOptions";
import { ISelectOption } from "./../Selects/SelectItemsType";

export type TDayOption = { value: TDayFormatValues; label: TDayFormatValues };
export type TMonthOption = {
  value: TMonthFormatValues;
  label: TMonthFormatValues;
};
export type TYearOption = {
  value: TYearFormatValues;
  label: TYearFormatValues;
};

export interface IDateFormatPicker {
  day: TDayOption;
  setDay: React.Dispatch<React.SetStateAction<TDayOption>>;
  month: TMonthOption;
  setMonth: React.Dispatch<React.SetStateAction<TMonthOption>>;
  year: TYearOption;
  setYear: React.Dispatch<React.SetStateAction<TYearOption>>;
  handleDateFormatChange: (option: ValueType<ISelectOption, false>) => void;
}

export const dayDateFormats = ["d", "do", "dd", "ddd"];
export const monthDateFormats = ["M", "Mo", "MM", "MMM", "MMMM"];
export const yearDateFormats = ["y", "yo", "yy", "yyyy"];

export const dayOptions = generateSelectOptions(["d", "do", "dd", "ddd"]);
export const monthOptions = generateSelectOptions([
  "M",
  "Mo",
  "MM",
  "MMM",
  "MMMM",
]);
export const yearOptions = generateSelectOptions(["y", "yo", "yy", "yyyy"]);

export type TDayOnlyRows = Record<string, { day: TDayOption }>;
export type TMonthOnlyRows = Record<string, { month: TMonthOption }>;
export type TYearOnlyRows = Record<string, { year: TYearOption }>;
