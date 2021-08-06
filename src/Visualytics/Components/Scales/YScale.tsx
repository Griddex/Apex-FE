import { useTheme } from "@material-ui/core";
import React from "react";
import { ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import ApexSlider from "../Sliders/ApexSlider";

export interface IYScale<T = any> {
  yScaleOption: ISelectOption;
  scaleOptions: ISelectOption[];
  action: (value: any) => void;
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
  const { yScaleOption, scaleOptions, action } = props;
  const theme = useTheme();

  const [yScaleState, setYScaleState] = React.useState<IYScaleState>({
    type: "linear",
    min: "auto",
    max: "auto",
    stacked: false,
    reverse: false,
  });

  const [yMinMax, setYMinMax] = React.useState({ min: true, max: true });

  const [minValue, setMinValue] = React.useState(0);
  const [maxValue, setMaxValue] = React.useState(1000);

  React.useEffect(() => {
    action(yScaleState);
  }, [yScaleState]);

  return (
    <ApexFlexContainer>
      <ApexSelectRS
        valueOption={yScaleOption as ISelectOption}
        data={scaleOptions}
        handleSelect={(option: ValueType<ISelectOption, false>) => {
          setYScaleState((prev) => ({
            ...prev,
            type: option ? (option.value as string) : "linear",
          }));
        }}
        // menuPortalTarget={ref. as HTMLDivElement}
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
            name={"pointersLabelEnableName"}
            handleChange={(event) => {
              const { checked } = event.target;
              setYScaleState((prev) => ({ ...prev, stacked: checked }));
            }}
            checked={yScaleState.stacked}
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
            name={"minEnableName"}
            handleChange={(event) => {
              const { checked } = event.target;
              setYMinMax((prev) => ({ ...prev, min: checked }));
              setYScaleState((prev) => ({
                ...prev,
                min: checked ? "auto" : minValue,
              }));
            }}
            checked={yMinMax.min}
            checkedColor={theme.palette.success.main}
            notCheckedColor={theme.palette.common.white}
            hasLabels={true}
            leftLabel="Manual"
            rightLabel="Auto"
          />
        }
      />
      {yScaleState.min === "manual" && (
        <ApexSlider
          name="minValue"
          currentValue={minValue as number}
          step={1}
          min={-2000}
          max={2000}
          setSliderValue={setMinValue}
        />
      )}

      <AnalyticsComp
        title="Maximum"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexMuiSwitch
            name={"minEnableName"}
            handleChange={(event) => {
              const { checked } = event.target;
              setYMinMax((prev) => ({ ...prev, max: checked }));
              setYScaleState((prev) => ({
                ...prev,
                max: checked ? "auto" : maxValue,
              }));
            }}
            checked={yMinMax.max}
            checkedColor={theme.palette.success.main}
            notCheckedColor={theme.palette.common.white}
            hasLabels={true}
            leftLabel="Manual"
            rightLabel="Auto"
          />
        }
      />
      {yScaleState.max === "manual" && (
        <ApexSlider
          name="maxValue"
          currentValue={maxValue as number}
          step={1}
          min={-2000}
          max={2000}
          setSliderValue={setMaxValue}
        />
      )}
    </ApexFlexContainer>
  );
});

export default YScale;
