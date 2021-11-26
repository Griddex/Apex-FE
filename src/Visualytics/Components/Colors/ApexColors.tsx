import {
  colorInterpolatorIds,
  colorInterpolators,
  colorSchemeIds,
  colorSchemes,
} from "@nivo/colors";
import range from "lodash/range";
import React from "react";
import {
  components,
  OptionProps,
  SingleValueProps,
  OnChangeValue,
  GroupBase,
} from "react-select";
import { IExtendedSelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexColorsItem from "./ApexColorsItem";
import Select from "react-select";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { useDispatch } from "react-redux";
import { IApexColors } from "./ApexColorsTypes";

const colors = colorSchemeIds.map((id) => ({
  id,
  colors: colorSchemes[id],
}));

const sequentialColors = colorInterpolatorIds.map((id) => ({
  id: `seq:${id}`,
  colors: range(0, 1, 0.05).map((t) => colorInterpolators[id](t)),
}));

const SingleValue = (
  props: any
  // props: SingleValueProps<
  //   IExtendedSelectOption,
  //   boolean,
  //   GroupBase<IExtendedSelectOption>
  // >
) => {
  return (
    <components.SingleValue {...props}>
      <ApexColorsItem
        id={props.data.label}
        colors={props.data.colors as string[]}
      />
    </components.SingleValue>
  );
};

const Option = (props: OptionProps<IExtendedSelectOption, false>) => {
  return (
    <components.Option {...props}>
      <ApexColorsItem
        id={props.label as string}
        colors={props.data.colors as string[]}
      />
    </components.Option>
  );
};

const ColorsControl = ({
  basePath,
  updateParameterAction,
  plotRef,
  intialColorValue,
}: IApexColors) => {
  const dispatch = useDispatch();
  const [colorValue, setColorValue] = React.useState(intialColorValue);

  const options = [...colors, ...sequentialColors].map(({ id, colors }) => ({
    label: id,
    value: id,
    colors,
  })) as IExtendedSelectOption[];
  const selectedOption = options.find((o) => o.value === colorValue);

  return (
    <ApexSelectRS
      valueOption={selectedOption as IExtendedSelectOption}
      data={options}
      handleSelect={(option: OnChangeValue<IExtendedSelectOption, false>) => {
        updateParameterAction &&
          dispatch(
            updateParameterAction(`${basePath}.colors`, {
              type: (option as IExtendedSelectOption).value,
            })
          );

        setColorValue(option?.value as string);
      }}
      menuPortalTarget={plotRef.current as HTMLDivElement}
      isSearchable={true}
      components={{ SingleValue, Option }}
      isSelectOptionType={true}
      containerHeight={40}
    />
  );
};

export default ColorsControl;
