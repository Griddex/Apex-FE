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
  motionConfigPresetOptions,
} from "../../Data/VisualyticsData";
import { IChart } from "../../Redux/VisualyticsState/VisualyticsStateTypes";
import { IApexChartFormatProps } from "../Charts/ChartTypes";
import { ChartFormatAggregatorContext } from "../Contexts/ChartFormatAggregatorContext";
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
    useMesh,
    enableSlices,
    enableCrosshair,
    crosshairType,
    animate,
    motionConfig,
  } = chartProps;

  const [presetColors, setPresetColors] = React.useState([
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
  ]);

  const [motionPerspective, setMotionPerspective] = React.useState("preset");

  const enableSlicesOption = enableSlicesOptions.find(
    (option) => option.value === enableSlices
  );
  const crosshairTypeOption = crosshairTypeOptions.find(
    (option) => option.value === crosshairType
  );
  const motionConfigPresetOption = motionConfigPresetOptions.find(
    (option) => option.value === motionConfig
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

  const initializePointMotion = (obj: any) => {
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
        title="Point Color"
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

      <AnalyticsComp
        title="Crosshair Type"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSelectRS
            valueOption={crosshairTypeOption as ISelectOption}
            data={crosshairTypeOptions}
            handleSelect={handleInteractivitySelect("enableSlices")}
            menuPortalTarget={interactivityRef.current as HTMLDivElement}
            isSelectOptionType={true}
          />
        }
      />
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
                  initializePointMotion(motionConfig);
                } else {
                  initializePointMotion({
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
              <ToggleButton value="preset">{"Inherit"}</ToggleButton>
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
    </div>
  );
};

export default ApexChartInteractivity;
