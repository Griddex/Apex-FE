import { DatumValue, ValueFormat } from "@nivo/core";
import { FormatSpecifierObject } from "d3-format";
import { CommonProps, GroupBase, OptionProps } from "react-select";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
import { IExtendedSelectOption } from "./../../../Application/Components/Selects/SelectItemsType";

interface IFormatValue {
  format: ValueFormat<DatumValue>;
  enabled: boolean;
}

export interface IChartValueFormatters {
  basePath: string;
  intialFormatValue: IFormatValue;
  plotRef: React.MutableRefObject<any>;
  updateParameterAction: (path: string, value: any) => IAction;
  axisFormatTitle: string;
  setValueFormat: TUseState<any>;
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
