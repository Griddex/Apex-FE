import { useTheme } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import {
  curveOptions,
  colorsOptions,
  areaBlendOptions,
} from "../../Data/VisualyticsData";
import {
  IApexChartFormatProps,
  IApexLineChartGeneral,
} from "../Charts/ChartTypes";
import ApexSlider from "../Sliders/ApexSlider";

const ApexLineChartGeneral = ({
  workflowCategory,
  workflowProcess,
  updateParameterAction,
  chartType,
  curve,
  colors,
  storeLineWidth,
  enableArea,
  areaBlendMode,
  storeAreaBaselineValue,
  storeAreaOpacity,
}: IApexLineChartGeneral & Partial<IApexChartFormatProps>) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const wc = workflowCategory;
  const wp = workflowProcess;

  const pointRef = React.useRef<HTMLDivElement>(null);

  const basePath = `${wc}.${wp}.${chartType}.otherProperties`;
  const curveOption = curveOptions.find((option) => option.value === curve);
  const colorsOption = colorsOptions.find((option) => option.value === colors);
  const areaBlendOption = areaBlendOptions.find(
    (option) => option.value === areaBlendMode
  );

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
            handleSelect={(option: ValueType<ISelectOption, false>) => {
              updateParameterAction &&
                dispatch(
                  updateParameterAction(
                    `${basePath}.curve`,
                    (option as ISelectOption).value
                  )
                );
            }}
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
            handleSelect={(option: ValueType<ISelectOption, false>) => {
              updateParameterAction &&
                dispatch(
                  updateParameterAction(`${basePath}.colors`, {
                    scheme: (option as ISelectOption).value,
                  })
                );
            }}
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
            name="pointSize"
            currentValue={storeLineWidth.currentValue as number}
            step={storeLineWidth.step as number}
            min={storeLineWidth.min as number}
            max={storeLineWidth.max as number}
            actionPath={`${basePath}.lineWidth`}
            action={(path, value) =>
              updateParameterAction &&
              dispatch(updateParameterAction(path, value))
            }
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
            handleChange={(event) => {
              const { checked } = event.target;

              updateParameterAction &&
                dispatch(
                  updateParameterAction(`${basePath}.enableArea`, checked)
                );
            }}
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
            name="pointBorderWidth"
            currentValue={storeAreaBaselineValue.currentValue as number}
            step={storeAreaBaselineValue.step as number}
            min={storeAreaBaselineValue.min as number}
            max={storeAreaBaselineValue.max as number}
            actionPath={`${basePath}.areaBaseLineValue`}
            action={(path, value) =>
              updateParameterAction &&
              dispatch(updateParameterAction(path, value))
            }
          />
        }
      />
      <AnalyticsComp
        title="Area Opacity"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSlider
            name="pointBorderWidth"
            currentValue={storeAreaOpacity.currentValue as number}
            step={storeAreaOpacity.step as number}
            min={storeAreaOpacity.min as number}
            max={storeAreaOpacity.max as number}
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
            handleSelect={(option: ValueType<ISelectOption, false>) => {
              updateParameterAction &&
                dispatch(
                  updateParameterAction(
                    `${basePath}.areaBlendMode`,
                    (option as ISelectOption).value
                  )
                );
            }}
            menuPortalTarget={pointRef.current as HTMLDivElement}
            isSelectOptionType={true}
          />
        }
      />
    </div>
  );
};

export default ApexLineChartGeneral;
