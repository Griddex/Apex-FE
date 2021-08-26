import { useTheme } from "@material-ui/core";
import React from "react";
import { ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import { ScaleLinearSpec } from "../ChartTypes";
import ApexSlider from "../Sliders/ApexSlider";

export interface IYScale<T = any> {
  basePath: string;
  yScale: ScaleLinearSpec;
  scaleOptions: ISelectOption[];
  actionPath: string;
  action: (path: string, value: any) => void;
  yScaleContextFxn: (value: any, name?: keyof ScaleLinearSpec) => void;
  ref: React.MutableRefObject<T>;
}

export interface IYScaleState {
  type: string;
  min: string | number;
  max: string | number;
  stacked: boolean;
  reverse: boolean;
}

const YScale = React.forwardRef<HTMLDivElement, IYScale>((props, ref) => {
  const theme = useTheme();
  const {
    basePath,
    yScale,
    scaleOptions,
    action,
    actionPath,
    yScaleContextFxn,
  } = props;

  const yScaleOption = scaleOptions.find(
    (option) => option.value === yScale.type
  );

  const { min, max, stacked, reverse } = yScale;

  const minAutoValue = min === "auto" ? true : false;
  const minNumberValue = typeof min === "number" ? (min as number) : 0;
  const maxAutoValue = max === "auto" ? true : false;
  const maxNumberValue = typeof max === "number" ? (max as number) : 1200;

  const [minValue, setMinValue] = React.useState({
    auto: minAutoValue,
    minNumber: minNumberValue,
  });
  const [maxValue, setMaxValue] = React.useState({
    auto: maxAutoValue,
    maxNumber: maxNumberValue,
  });

  return (
    <ApexFlexContainer
      moreStyles={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      <ApexSelectRS
        valueOption={yScaleOption as ISelectOption}
        data={scaleOptions}
        handleSelect={(option: ValueType<ISelectOption, false>) => {
          const value = option?.value;

          yScaleContextFxn(value, "type");
          action && action(actionPath as string, { ...yScale, type: value });
        }}
        menuPortalTarget={
          (ref as React.MutableRefObject<HTMLDivElement>).current
        }
        isSelectOptionType={true}
      />

      <AnalyticsComp
        title="Stacked"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexMuiSwitch
            name="stacked"
            handleChange={(event) => {
              const { checked } = event.target;

              yScaleContextFxn(checked, "stacked");
              action &&
                action(actionPath as string, { ...yScale, stacked: checked });
            }}
            checked={stacked as boolean}
            checkedColor={theme.palette.success.main}
            notCheckedColor={theme.palette.common.white}
            hasLabels={true}
            leftLabel="Off"
            rightLabel="On"
          />
        }
      />

      <AnalyticsComp
        title="Minimum"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexMuiSwitch
            name="Minimum"
            handleChange={(event) => {
              const { checked } = event.target;

              setMinValue((prev) => ({ ...prev, auto: checked }));
              yScaleContextFxn("auto", "min");
              if (checked) {
                action &&
                  action(actionPath as string, { ...yScale, min: checked });
              } else {
                action &&
                  action(actionPath as string, {
                    ...yScale,
                    min: minValue.minNumber,
                  });
              }
            }}
            checked={minValue.auto}
            checkedColor={theme.palette.success.main}
            notCheckedColor={theme.palette.common.white}
            hasLabels={true}
            leftLabel="Manual"
            rightLabel="Auto"
          />
        }
      />
      {!minValue.auto && (
        <ApexSlider
          name="min"
          sliderValue={minValue.minNumber}
          step={1}
          min={-2000}
          max={2000}
          actionPath={`${basePath}.yScale.min`}
          action={action}
          sliderContextFxn={yScaleContextFxn}
        />
      )}

      <AnalyticsComp
        title="Maximum"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexMuiSwitch
            name="Maximum"
            handleChange={(event) => {
              const { checked } = event.target;

              setMaxValue((prev) => ({ ...prev, auto: checked }));
              yScaleContextFxn("auto", "max");
              if (checked) {
                action &&
                  action(actionPath as string, { ...yScale, max: checked });
              } else {
                action &&
                  action(actionPath as string, {
                    ...yScale,
                    max: maxValue.maxNumber,
                  });
              }
            }}
            checked={maxValue.auto}
            checkedColor={theme.palette.success.main}
            notCheckedColor={theme.palette.common.white}
            hasLabels={true}
            leftLabel="Manual"
            rightLabel="Auto"
          />
        }
      />
      {!maxValue.auto && (
        <ApexSlider
          name="max"
          sliderValue={maxValue.maxNumber}
          step={1}
          min={-2000}
          max={2000}
          actionPath={`${basePath}.yScale.max`}
          action={action}
          sliderContextFxn={yScaleContextFxn}
        />
      )}

      <AnalyticsComp
        title="Reverse"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexMuiSwitch
            name="reverse"
            handleChange={(event) => {
              const { checked } = event.target;

              yScaleContextFxn(checked, "reverse");
              action &&
                action(actionPath as string, { ...yScale, reverse: checked });
            }}
            checked={reverse as boolean}
            checkedColor={theme.palette.success.main}
            notCheckedColor={theme.palette.common.white}
            hasLabels={true}
            leftLabel="Off"
            rightLabel="On"
          />
        }
      />
    </ApexFlexContainer>
  );
});

export default YScale;
