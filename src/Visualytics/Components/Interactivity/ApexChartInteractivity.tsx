import { useTheme } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React from "react";
import { useDispatch } from "react-redux";
import { ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import {
  crosshairTypeOptions,
  enableSlicesOptions,
  hoverTargetOptions,
  motionConfigPresetOptions,
} from "../../Data/VisualyticsData";
import { IChart } from "../../Redux/State/VisualyticsStateTypes";
import { IApexChartFormatProps } from "../Charts/ChartTypes";
import { ChartFormatAggregatorContext } from "../Contexts/ChartFormatAggregatorContext";
import ApexSlider from "../Sliders/ApexSlider";
import CustomMotionConfig from "./CustomMotionConfig";

const ApexChartInteractivity = ({
  basePath,
  updateParameterAction,
}: Partial<IApexChartFormatProps>) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const interactivityRef = React.useRef<HTMLDivElement>(null);

  const { chartProps, setChartProps } = React.useContext(
    ChartFormatAggregatorContext
  );

  const {
    isInteractive,
    activeInnerRadiusOffset,
    activeOuterRadiusOffset,
    useMesh,
    enableSlices,
    enableStackTooltip,
    enableCrosshair,
    crosshairType,
    animate,
    motionConfig,
    hoverTarget,
    cellHoverOpacity,
    cellHoverOthersOpacity,
  } = chartProps;

  const [motionPerspective, setMotionPerspective] = React.useState("preset");

  const enableSlicesOption = enableSlicesOptions.find(
    (option) => option.value === enableSlices.toString()
  );
  const crosshairTypeOption = crosshairTypeOptions.find(
    (option) => option.value === crosshairType
  );
  const motionConfigPresetOption = motionConfigPresetOptions.find(
    (option) => option.value === motionConfig
  );
  const hoverTargetOption = hoverTargetOptions.find(
    (option) => option.value === hoverTarget
  );

  const handleInteractivitySwitch =
    (name: keyof IChart) => (event: React.ChangeEvent<any>) => {
      const { checked } = event.target;

      setChartProps((prev) => ({
        ...prev,
        [name]: checked,
      }));

      updateParameterAction &&
        dispatch(updateParameterAction(`${basePath}.${name}`, checked));
    };

  const handleInteractivitySelect =
    (name: keyof IChart, isObj?: boolean, obj?: any, objKey?: string) =>
    (option: ValueType<ISelectOption, false>) => {
      const optionValue = (option as ISelectOption).value as string;

      let value: any;
      if (isObj) {
        value = [{ ...obj, [objKey as string]: optionValue }];
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

  const initializeMotion = (obj: any) => {
    setChartProps((prev) => ({
      ...prev,
      pointColor: obj,
    }));

    updateParameterAction &&
      dispatch(updateParameterAction(`${basePath}.pointColor`, obj));
  };

  return (
    <div style={{ width: "100%", padding: 5 }}>
      <AnalyticsComp
        title="Interactivity"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexMuiSwitch
            name={"isInteractive"}
            handleChange={handleInteractivitySwitch("isInteractive")}
            checked={isInteractive}
            checkedColor={theme.palette.success.main}
            notCheckedColor={theme.palette.common.white}
            hasLabels={true}
            leftLabel="Disable"
            rightLabel="Enable"
          />
        }
      />

      <AnalyticsComp
        title="Active Inner Radius Offset"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSlider
            name="activeInnerRadiusOffset"
            sliderValue={activeInnerRadiusOffset}
            step={1}
            min={0}
            max={20}
            actionPath={`${basePath}.activeInnerRadiusOffset`}
            action={(path, value) =>
              updateParameterAction &&
              dispatch(updateParameterAction(path, value))
            }
            sliderContextFxn={(value: any) => {
              setChartProps((prev) => ({
                ...prev,
                activeInnerRadiusOffset: value,
              }));
            }}
          />
        }
      />

      <AnalyticsComp
        title="Active Outer Radius Offset"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSlider
            name="activeOuterRadiusOffset"
            sliderValue={activeOuterRadiusOffset}
            step={1}
            min={0}
            max={20}
            actionPath={`${basePath}.activeOuterRadiusOffset`}
            action={(path, value) =>
              updateParameterAction &&
              dispatch(updateParameterAction(path, value))
            }
            sliderContextFxn={(value: any) => {
              setChartProps((prev) => ({
                ...prev,
                activeOuterRadiusOffset: value,
              }));
            }}
          />
        }
      />

      <AnalyticsComp
        title="Enable StackTooltip"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexMuiSwitch
            name={"enableStackTooltip"}
            handleChange={handleInteractivitySwitch("enableStackTooltip")}
            checked={enableStackTooltip}
            checkedColor={theme.palette.success.main}
            notCheckedColor={theme.palette.common.white}
            hasLabels={true}
            leftLabel="Disable"
            rightLabel="Enable"
          />
        }
      />

      <AnalyticsComp
        title="Use Mesh"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexMuiSwitch
            name={"useMesh"}
            handleChange={handleInteractivitySwitch("useMesh")}
            checked={useMesh}
            checkedColor={theme.palette.success.main}
            notCheckedColor={theme.palette.common.white}
            hasLabels={true}
            leftLabel="Disable"
            rightLabel="Enable"
          />
        }
      />

      <AnalyticsComp
        title="Enable Slices"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSelectRS
            valueOption={enableSlicesOption as ISelectOption}
            data={enableSlicesOptions}
            handleSelect={handleInteractivitySelect("enableSlices")}
            menuPortalTarget={interactivityRef.current as HTMLDivElement}
            isSelectOptionType={true}
          />
        }
      />

      <AnalyticsComp
        title="Enable Crosshair"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexMuiSwitch
            name={"enableCrosshair"}
            handleChange={handleInteractivitySwitch("enableCrosshair")}
            checked={enableCrosshair as boolean}
            checkedColor={theme.palette.success.main}
            notCheckedColor={theme.palette.common.white}
            hasLabels={true}
            leftLabel="Disable"
            rightLabel="Enable"
          />
        }
      />

      {enableCrosshair && (
        <AnalyticsComp
          title="Crosshair Type"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSelectRS
              valueOption={crosshairTypeOption as ISelectOption}
              data={crosshairTypeOptions}
              handleSelect={handleInteractivitySelect("crosshairType")}
              menuPortalTarget={interactivityRef.current as HTMLDivElement}
              isSelectOptionType={true}
            />
          }
        />
      )}

      <AnalyticsComp
        title="Animate"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexMuiSwitch
            name={"animate"}
            handleChange={handleInteractivitySwitch("animate")}
            checked={animate as boolean}
            checkedColor={theme.palette.success.main}
            notCheckedColor={theme.palette.common.white}
            hasLabels={true}
            leftLabel="Disable"
            rightLabel="Enable"
          />
        }
      />

      {animate && (
        <AnalyticsComp
          title="Motion"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <>
              <ToggleButtonGroup
                size="small"
                value={motionPerspective}
                exclusive
                onChange={(_, value: string) => {
                  setMotionPerspective(value);

                  if (value === "preset") {
                    initializeMotion(motionConfig);
                  } else {
                    initializeMotion({
                      mass: 1,
                      tension: 170,
                      friction: 26,
                      clamp: false,
                      precision: 0.01,
                      velocity: 0,
                    });
                  }
                }}
              >
                <ToggleButton value="preset">{"Preset"}</ToggleButton>
                <ToggleButton value="custom">{"Custom"}</ToggleButton>
              </ToggleButtonGroup>
              {motionPerspective === "preset" && (
                <ApexSelectRS
                  valueOption={motionConfigPresetOption as ISelectOption}
                  data={motionConfigPresetOptions}
                  handleSelect={handleInteractivitySelect(
                    "motionConfig",
                    true,
                    motionConfig,
                    "from"
                  )}
                  menuPortalTarget={interactivityRef.current as HTMLDivElement}
                  isSelectOptionType={true}
                />
              )}
              {motionPerspective === "custom" && (
                <CustomMotionConfig
                  basePath={basePath}
                  updateParameterAction={updateParameterAction}
                />
              )}
            </>
          }
        />
      )}

      <AnalyticsComp
        title="Hover Target"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSelectRS
            valueOption={hoverTargetOption as ISelectOption}
            data={hoverTargetOptions}
            handleSelect={handleInteractivitySelect("hoverTarget")}
            menuPortalTarget={interactivityRef.current as HTMLDivElement}
            isSelectOptionType={true}
          />
        }
      />

      <AnalyticsComp
        title="Cell Hover Opacity"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSlider
            name="cellHoverOpacity"
            sliderValue={cellHoverOpacity}
            step={1}
            min={0}
            max={20}
            actionPath={`${basePath}.cellHoverOpacity`}
            action={(path, value) =>
              updateParameterAction &&
              dispatch(updateParameterAction(path, value))
            }
            sliderContextFxn={(value: any) => {
              setChartProps((prev) => ({
                ...prev,
                cellHoverOpacity: value,
              }));
            }}
          />
        }
      />

      <AnalyticsComp
        title="Cell Hover Others Opacity"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSlider
            name="cellHoverOthersOpacity"
            sliderValue={cellHoverOthersOpacity}
            step={1}
            min={0}
            max={20}
            actionPath={`${basePath}.cellHoverOthersOpacity`}
            action={(path, value) =>
              updateParameterAction &&
              dispatch(updateParameterAction(path, value))
            }
            sliderContextFxn={(value: any) => {
              setChartProps((prev) => ({
                ...prev,
                cellHoverOthersOpacity: value,
              }));
            }}
          />
        }
      />
    </div>
  );
};

export default ApexChartInteractivity;
