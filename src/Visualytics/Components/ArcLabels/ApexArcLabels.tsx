import { useTheme } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { InheritedColorConfigFromContext } from "@nivo/colors";
import React from "react";
import { useDispatch } from "react-redux";
import { OnChangeValue } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import {
  arcLabelOptions,
  visualyticsInheritOptions,
  visualyticsThemeOptions,
} from "../../Data/VisualyticsData";
import { IChart } from "../../Redux/State/VisualyticsStateTypes";
import { IApexChartFormatProps } from "../Charts/ChartTypes";
import ApexPickerExtruder from "../ColorPickers/ApexPickerExtruder";
import ApexSketchPicker from "../ColorPickers/ApexSketchPicker";
import { ChartFormatAggregatorContext } from "../Contexts/ChartFormatAggregatorContext";
import ApexSlider from "../Sliders/ApexSlider";

const ApexArcLabels = ({
  basePath,
  updateParameterAction,
}: Partial<IApexChartFormatProps>) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const arcLabelRef = React.useRef<HTMLDivElement>(null);

  const { chartProps, setChartProps } = React.useContext(
    ChartFormatAggregatorContext
  );

  const modifiers = (
    chartProps["arcLabelsTextColor"] as InheritedColorConfigFromContext
  ).modifiers as NonNullable<InheritedColorConfigFromContext["modifiers"]>;

  const {
    enableArcLabels,
    arcLabel,
    arcLabelsRadiusOffset,
    arcLabelsSkipAngle,
    arcLabelsTextColor,
  } = chartProps;

  const [presetColors, setPresetColors] = React.useState([
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
  ]);

  const [showArcLabelTextColorPicker, setShowArcLabelTextColorPicker] =
    React.useState(false);
  const [arcLabelTextColorPerspective, setArcLabelTextColorPerspective] =
    React.useState("inherit");

  const arcLabelOption = arcLabelOptions.find(
    (option) => option.value === arcLabel
  );

  const arcLabelInheritOption = visualyticsInheritOptions.find(
    (option) => option.value === (arcLabelsTextColor as any)["from"]
  );
  const arcLabelThemeOption = visualyticsThemeOptions.find(
    (option) => option.value === (arcLabelsTextColor as any)["theme"]
  );

  const handleArcLabelsSwitch =
    (name: keyof IChart) => (event: React.ChangeEvent<any>) => {
      const { checked } = event.target;

      setChartProps((prev) => ({
        ...prev,
        [name]: checked,
      }));

      updateParameterAction &&
        dispatch(updateParameterAction(`${basePath}.${name}`, checked));
    };

  const handleArcLabelSelect =
    (name: keyof IChart, isObj?: boolean, obj?: any, objKey?: string) =>
    (option: OnChangeValue<ISelectOption, false>) => {
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

  const handleInheritColorModifiers =
    (name: keyof IChart) => (option: OnChangeValue<ISelectOption, false>) => {
      const optionValue = (option as ISelectOption).value as string;

      setChartProps((prev: any) => {
        const color = prev[
          name
        ] as NonNullable<InheritedColorConfigFromContext>;

        return {
          ...prev,
          [name]: {
            ...color,
            modifiers: [
              [
                optionValue,
                (
                  color.modifiers as NonNullable<
                    InheritedColorConfigFromContext["modifiers"]
                  >
                )[0][1],
              ],
            ],
          },
        };
      });

      const textColor = chartProps[name] as InheritedColorConfigFromContext;

      updateParameterAction &&
        dispatch(
          updateParameterAction(`${basePath}.${name}`, {
            ...textColor,
            modifiers: [
              [
                optionValue,
                (
                  textColor.modifiers as NonNullable<
                    InheritedColorConfigFromContext["modifiers"]
                  >
                )[0][1],
              ],
            ],
          })
        );
    };

  const handleInheritColorModifiersSlider =
    (name: keyof IChart) => (value: any) => {
      setChartProps((prev) => {
        const color = prev[
          name
        ] as NonNullable<InheritedColorConfigFromContext>;

        return {
          ...prev,
          [name]: {
            ...color,
            modifiers: [
              [
                value,
                (
                  color.modifiers as NonNullable<
                    InheritedColorConfigFromContext["modifiers"]
                  >
                )[0][1],
              ],
            ],
          },
        };
      });
    };

  const initializeArcLabelTextColor = (obj: any) => {
    setChartProps((prev) => ({
      ...prev,
      arcLabelTextColor: obj,
    }));

    updateParameterAction &&
      dispatch(updateParameterAction(`${basePath}.arcLabelTextColor`, obj));
  };

  return (
    <div style={{ width: "100%", padding: 5 }}>
      <ApexMuiSwitch
        name={"enableArcLabels"}
        handleChange={handleArcLabelsSwitch("enableArcLabels")}
        checked={enableArcLabels}
        checkedColor={theme.palette.success.main}
        notCheckedColor={theme.palette.common.white}
        hasLabels={true}
        leftLabel="Disable"
        rightLabel="Enable"
      />

      {enableArcLabels && (
        <>
          <AnalyticsComp
            title="Arc Label"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSelectRS
                valueOption={arcLabelOption as ISelectOption}
                data={arcLabelOptions}
                handleSelect={handleArcLabelSelect("arcLabel")}
                menuPortalTarget={arcLabelRef.current as HTMLDivElement}
                isSelectOptionType={true}
              />
            }
          />

          <AnalyticsComp
            title="Arc Label Radius Offset"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="arcLabelsRadiusOffset"
                sliderValue={arcLabelsRadiusOffset}
                step={1}
                min={2}
                max={20}
                actionPath={`${basePath}.arcLabelsRadiusOffset`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    arcLabelsRadiusOffset: value,
                  }));
                }}
              />
            }
          />

          <AnalyticsComp
            title="Arc Labels Skip Angle"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="arcLabelsSkipAngle"
                sliderValue={arcLabelsSkipAngle}
                step={1}
                min={0}
                max={20}
                actionPath={`${basePath}.arcLabelsSkipAngle`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    arcLabelsSkipAngle: value,
                  }));
                }}
              />
            }
          />

          <AnalyticsComp
            title="Arc Labels Text Color"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <>
                <ToggleButtonGroup
                  size="small"
                  value={arcLabelTextColorPerspective}
                  exclusive
                  onChange={(_, value: string) => {
                    setArcLabelTextColorPerspective(value);

                    if (value === "inherit") {
                      initializeArcLabelTextColor({
                        from: "color",
                        modifiers: [],
                      });
                    } else if (value === "theme") {
                      initializeArcLabelTextColor({
                        theme: "background",
                      });
                    } else {
                      initializeArcLabelTextColor("grey");
                    }
                  }}
                >
                  <ToggleButton value="inherit">{"Inherit"}</ToggleButton>
                  <ToggleButton value="theme">{"Theme"}</ToggleButton>
                  <ToggleButton value="custom">{"Custom"}</ToggleButton>
                </ToggleButtonGroup>
                {arcLabelTextColorPerspective === "inherit" && (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <ApexSelectRS
                      valueOption={arcLabelInheritOption as ISelectOption}
                      data={visualyticsInheritOptions}
                      handleSelect={handleArcLabelSelect(
                        "arcLabelsTextColor",
                        true,
                        arcLabelsTextColor,
                        "from"
                      )}
                      menuPortalTarget={arcLabelRef.current as HTMLDivElement}
                      isSelectOptionType={true}
                    />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <ApexSelectRS
                        valueOption={arcLabelInheritOption as ISelectOption}
                        data={visualyticsInheritOptions}
                        handleSelect={handleInheritColorModifiers(
                          "arcLabelsTextColor"
                        )}
                        menuPortalTarget={arcLabelRef.current as HTMLDivElement}
                        isSelectOptionType={true}
                        containerWidth={40}
                      />
                      <ApexSlider
                        name="mordifiers"
                        sliderValue={modifiers[0][1]}
                        step={1}
                        min={0}
                        max={20}
                        actionPath={`${basePath}.arcLabelsTextColor`}
                        action={(path, value) =>
                          updateParameterAction &&
                          dispatch(updateParameterAction(path, value))
                        }
                        sliderContextFxn={handleInheritColorModifiersSlider(
                          "arcLabelsTextColor"
                        )}
                      />
                    </div>
                  </div>
                )}
                {arcLabelTextColorPerspective === "theme" && (
                  <ApexSelectRS
                    valueOption={arcLabelThemeOption as ISelectOption}
                    data={visualyticsThemeOptions}
                    handleSelect={handleArcLabelSelect(
                      "arcLabelsTextColor",
                      true,
                      arcLabelsTextColor,
                      "theme"
                    )}
                    menuPortalTarget={arcLabelRef.current as HTMLDivElement}
                    isSelectOptionType={true}
                  />
                )}

                {arcLabelTextColorPerspective === "custom" && (
                  <ApexPickerExtruder
                    color={
                      typeof arcLabelsTextColor === "string"
                        ? arcLabelsTextColor
                        : theme.palette.primary.main
                    }
                    showPicker={showArcLabelTextColorPicker}
                    setShowPicker={setShowArcLabelTextColorPicker}
                    containerStyle={{ marginTop: 10, width: 70 }}
                  />
                )}
                {showArcLabelTextColorPicker && (
                  <ApexSketchPicker
                    solidColor={arcLabelsTextColor as string}
                    presetColors={presetColors}
                    setPresetColors={setPresetColors}
                    showButtons={false}
                    sketchPickerContextFxn={(value: any) => {
                      setChartProps((prev) => ({
                        ...prev,
                        arcLabelsTextColor: value,
                      }));

                      updateParameterAction &&
                        dispatch(
                          updateParameterAction(
                            `${basePath}.arcLabelsTextColor`,
                            value
                          )
                        );
                    }}
                  />
                )}
              </>
            }
          />
        </>
      )}
    </div>
  );
};

export default ApexArcLabels;
