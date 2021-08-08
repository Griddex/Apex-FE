import { OptionProps } from "react-select";
import { CommonProps, PropsWithStyles } from "react-select/src/types";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { IExtendedSelectOption } from "./../../../Application/Components/Selects/SelectItemsType";
import { FormatSpecifierObject } from "d3-format";

type IsMulti = true | false;
type prospswithstyleUnion = keyof PropsWithStyles;
type commonPropsUnion = keyof CommonProps<IExtendedSelectOption, IsMulti>;

export type TCustomOptions = Omit<
  OptionProps<IExtendedSelectOption, IsMulti>,
  prospswithstyleUnion | commonPropsUnion
>;

interface IFormatValue {
  format: string;
  enabled: boolean;
}

export interface IChartValueFormatters {
  basePath: string;
  intialFormatValue: IFormatValue;
  plotRef: React.MutableRefObject<any>;
  updateParameterAction: (path: string, value: any) => IAction;
  axisFormat: string;
}

export interface IChartSelectSubFormatters {
  title: string;
  name: keyof FormatSpecifierObject;
  valueOptions: IExtendedSelectOption[];
  handleChange: (option: IExtendedSelectOption) => void;
}

export interface IChartInputSubFormatters {
  title: string;
  name: keyof FormatSpecifierObject;
  handleChange: (event: React.ChangeEvent<any>) => void;
}
export interface IChartSwitchSubFormatters {
  title: string;
  name: string;
  value: boolean;
  handleChange: (event: React.ChangeEvent<any>, flag?: boolean) => void;
}
