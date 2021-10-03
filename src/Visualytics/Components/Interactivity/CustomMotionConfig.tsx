import { useTheme } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { SpringConfig } from "react-spring";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import { IChart } from "../../Redux/State/VisualyticsStateTypes";
import { IApexChartFormatProps } from "../Charts/ChartTypes";
import { ChartFormatAggregatorContext } from "../Contexts/ChartFormatAggregatorContext";
import ApexSlider from "../Sliders/ApexSlider";

const CustomMotionConfig = ({
  basePath,
  updateParameterAction,
}: Partial<IApexChartFormatProps>) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const legendRef = React.useRef<HTMLDivElement>(null);

  const { chartProps, setChartProps } = React.useContext(
    ChartFormatAggregatorContext
  );

  const { motionConfig } = chartProps;
  const motionConfigDefined = motionConfig as SpringConfig;
  const { mass, friction, tension, clamp } = motionConfigDefined;

  const handleMotionSwitch =
    (
      name: keyof IChart,
      isObj?: boolean,
      obj?: any,
      objKey?: keyof SpringConfig
    ) =>
    (event: React.ChangeEvent<any>) => {
      const { checked } = event.target;

      let value: any;
      if (isObj) {
        value = [{ ...obj, [objKey as string]: checked }];
      } else {
        value = checked;
      }

      setChartProps((prev) => ({
        ...prev,
        [name]: value,
      }));

      updateParameterAction &&
        dispatch(updateParameterAction(`${basePath}.${name}`, value));
    };

  return (
    <div>
      <AnalyticsComp
        title="Mass"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSlider
            name="mass"
            sliderValue={mass as number}
            step={1}
            min={-200}
            max={200}
            actionPath={`${basePath}.motionConfig`}
            action={(path, value) =>
              updateParameterAction &&
              dispatch(
                updateParameterAction(path, {
                  ...motionConfigDefined,
                  mass: value,
                })
              )
            }
            sliderContextFxn={(value: any) => {
              setChartProps((prev) => ({
                ...prev,
                motionConfig: {
                  ...(prev["motionConfig"] as SpringConfig),
                  mass: value,
                },
              }));
            }}
          />
        }
      />
      <AnalyticsComp
        title="Tension"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSlider
            name="translateX"
            sliderValue={tension as number}
            step={1}
            min={-200}
            max={200}
            actionPath={`${basePath}.motionConfig`}
            action={(path, value) =>
              updateParameterAction &&
              dispatch(
                updateParameterAction(path, {
                  ...motionConfigDefined,
                  tension: value,
                })
              )
            }
            sliderContextFxn={(value: any) => {
              setChartProps((prev) => ({
                ...prev,
                motionConfig: {
                  ...(prev["motionConfig"] as SpringConfig),
                  tension: value,
                },
              }));
            }}
          />
        }
      />
      <AnalyticsComp
        title="Friction"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSlider
            name="translateX"
            sliderValue={friction as number}
            step={1}
            min={-200}
            max={200}
            actionPath={`${basePath}.motionConfig`}
            action={(path, value) =>
              updateParameterAction &&
              dispatch(
                updateParameterAction(path, {
                  ...motionConfigDefined,
                  friction: value,
                })
              )
            }
            sliderContextFxn={(value: any) => {
              setChartProps((prev) => ({
                ...prev,
                motionConfig: {
                  ...(prev["motionConfig"] as SpringConfig),
                  friction: value,
                },
              }));
            }}
          />
        }
      />

      <AnalyticsComp
        title="Clamp"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexMuiSwitch
            name={"clamp"}
            handleChange={handleMotionSwitch(
              "motionConfig",
              true,
              motionConfig,
              "clamp"
            )}
            checked={clamp as boolean}
            checkedColor={theme.palette.success.main}
            notCheckedColor={theme.palette.common.white}
            hasLabels={true}
            leftLabel="Disable"
            rightLabel="Enable"
          />
        }
      />
    </div>
  );
};

export default CustomMotionConfig;
