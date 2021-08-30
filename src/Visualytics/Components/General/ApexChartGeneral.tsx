import { useTheme } from "@material-ui/core";
import { OrdinalColorScaleConfigScheme } from "@nivo/colors";
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

const ApexChartGeneral = ({
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
  console.log(
    "Logged output --> ~ file: ApexChartGeneral.tsx ~ line 42 ~ chartProps",
    chartProps
  );

  const curveOption = curveOptions.find((option) => option.value === curve);
  const colorsOption = colorsOptions.find(
    (option) =>
      option.value === (colors as OrdinalColorScaleConfigScheme)["scheme"]
  );
  const areaBlendOption = areaBlendOptions.find(
    (option) => option.value === areaBlendMode
  );

  const handleGeneralSelect =
    (name: keyof IChart, isObj?: boolean, obj?: any, objKey?: string) =>
    (option: ValueType<ISelectOption, false>) => {
      const optionValue = (option as ISelectOption).value as string;

      let value: any;
      if (isObj) {
        value = { ...obj, [objKey as string]: optionValue };
      } else {
        value = optionValue;
      }

      setChartProps((prev) => ({
        ...prev,
        [name]: value,
      }));

      updateParameterAction &&
        dispatch(updateParameterAction(`${basePath}.${name}`, value));
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
            handleSelect={handleGeneralSelect("curve", false)}
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
            handleSelect={handleGeneralSelect(
              "colors",
              true,
              { scheme: "category10" },
              "scheme"
            )}
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
            sliderContextFxn={(value: any) => {
              setChartProps((prev) => ({
                ...prev,
                lineWidth: value,
              }));
            }}
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

      {enableArea && (
        <>
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
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    areaBaselineValue: value,
                  }));
                }}
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
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    areaOpacity: value,
                  }));
                }}
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
        </>
      )}
    </div>
  );
};

export default ApexChartGeneral;
