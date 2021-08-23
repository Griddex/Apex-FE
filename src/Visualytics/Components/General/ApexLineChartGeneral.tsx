import { useTheme } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import {
  areaBlendOptions,
  colorsOptions,
  curveOptions,
} from "../../Data/VisualyticsData";
import { IChart } from "../../Redux/VisualyticsState/VisualyticsStateTypes";
import { IApexChartFormatProps } from "../Charts/ChartTypes";
import { ChartFormatAggregatorContext } from "../Contexts/ChartFormatAggregatorContext";
import ApexSlider from "../Sliders/ApexSlider";

const ApexLineChartGeneral = ({
  basePath,
  updateParameterAction,
}: Partial<IApexChartFormatProps>) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const pointRef = React.useRef<HTMLDivElement>(null);

  const { chartProps, setChartProps } = React.useContext(
    ChartFormatAggregatorContext
  );

  const {
    curve,
    colors,
    areaBlendMode,
    enableArea,
    lineWidth,
    areaBaselineValue,
    areaOpacity,
  } = chartProps;

  const curveOption = curveOptions.find((option) => option.value === curve);
  const colorsOption = colorsOptions.find((option) => option.value === colors);
  const areaBlendOption = areaBlendOptions.find(
    (option) => option.value === areaBlendMode
  );

  const handleGeneralSelect =
    (name: keyof IChart) => (option: ValueType<ISelectOption, false>) => {
      setChartProps((prev) => ({
        ...prev,
        [name]: (option as ISelectOption).value as string,
      }));

      updateParameterAction &&
        dispatch(
          updateParameterAction(`${basePath}.${name}`, {
            scheme: (option as ISelectOption).value,
          })
        );
    };

  const handleGeneralSwitch =
    (name: keyof IChart) => (event: React.ChangeEvent<any>) => {
      const { checked } = event.target;

      setChartProps((prev) => ({
        ...prev,
        [name]: checked,
      }));

      updateParameterAction &&
        dispatch(updateParameterAction(`${basePath}.${name}`, checked));
    };

  return (
    <div style={{ width: "100%", padding: 5 }}>
      <AnalyticsComp
        title="Curve"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSelectRS
            valueOption={curveOption as ISelectOption}
            data={curveOptions}
            handleSelect={handleGeneralSelect("curve")}
            menuPortalTarget={pointRef.current as HTMLDivElement}
            isSelectOptionType={true}
          />
        }
      />

      <AnalyticsComp
        title="Colors"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSelectRS
            valueOption={colorsOption as ISelectOption}
            data={colorsOptions}
            handleSelect={handleGeneralSelect("colors")}
            menuPortalTarget={pointRef.current as HTMLDivElement}
            isSelectOptionType={true}
          />
        }
      />

      <AnalyticsComp
        title="Line Width"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSlider
            name="lineWidth"
            sliderValue={lineWidth}
            step={1}
            min={0}
            max={20}
            actionPath={`${basePath}.lineWidth`}
            action={(path, value) =>
              updateParameterAction &&
              dispatch(updateParameterAction(path, value))
            }
            setSliderValue={setChartProps}
          />
        }
      />

      <AnalyticsComp
        title="Enable Area"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexMuiSwitch
            name={"generalEnableAreaName"}
            handleChange={handleGeneralSwitch("enableArea")}
            checked={enableArea}
            checkedColor={theme.palette.success.main}
            notCheckedColor={theme.palette.common.white}
            hasLabels={true}
            leftLabel="Off"
            rightLabel="On"
          />
        }
      />

      <AnalyticsComp
        title="Area Baseline"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSlider
            name="areaBaselineValue"
            sliderValue={areaBaselineValue}
            step={1}
            min={0}
            max={200}
            actionPath={`${basePath}.areaBaselineValue`}
            action={(path, value) =>
              updateParameterAction &&
              dispatch(updateParameterAction(path, value))
            }
            setSliderValue={setChartProps}
          />
        }
      />
      <AnalyticsComp
        title="Area Opacity"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSlider
            name="areaOpacity"
            sliderValue={areaOpacity}
            step={0.1}
            min={0}
            max={1}
            actionPath={`${basePath}.areaOpacity`}
            action={(path, value) =>
              updateParameterAction &&
              dispatch(updateParameterAction(path, value))
            }
          />
        }
      />

      <AnalyticsComp
        title="Area Blend"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSelectRS
            valueOption={areaBlendOption as ISelectOption}
            data={areaBlendOptions}
            handleSelect={handleGeneralSelect("areaBlendMode")}
            menuPortalTarget={pointRef.current as HTMLDivElement}
            isSelectOptionType={true}
          />
        }
      />
    </div>
  );
};

export default ApexLineChartGeneral;
