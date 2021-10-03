import { useTheme } from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { InheritedColorConfigFromContext } from "@nivo/colors";
import React from "react";
import { useDispatch } from "react-redux";
import { ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import {
  labelOptions,
  visualyticsInheritOptions,
  visualyticsThemeOptions,
} from "../../Data/VisualyticsData";
import { IChart } from "../../Redux/State/VisualyticsStateTypes";
import { IApexChartFormatProps } from "../Charts/ChartTypes";
import ApexPickerExtruder from "../ColorPickers/ApexPickerExtruder";
import ApexSketchPicker from "../ColorPickers/ApexSketchPicker";
import { ChartFormatAggregatorContext } from "../Contexts/ChartFormatAggregatorContext";
import ApexSlider from "../Sliders/ApexSlider";

const ApexLabels = ({
  basePath,
  updateParameterAction,
}: Partial<IApexChartFormatProps>) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const LabelRef = React.useRef<HTMLDivElement>(null);

  const { chartProps, setChartProps } = React.useContext(
    ChartFormatAggregatorContext
  );

  const modifiers = (
    chartProps["labelTextColor"] as InheritedColorConfigFromContext
  ).modifiers as NonNullable<InheritedColorConfigFromContext["modifiers"]>;

  const {
    enableLabel,
    label,
    labelSkipWidth,
    labelSkipHeight,
    labelTextColor,
  } = chartProps;

  const [presetColors, setPresetColors] = React.useState([
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
  ]);

  const [showDotLabelTextColorPicker, setShowDotLabelTextColorPicker] =
    React.useState(false);
  const [LabelTextColorPerspective, setLabelTextColorPerspective] =
    React.useState("inherit");

  const labelOption = labelOptions.find((option) => option.value === label);

  const LabelInheritOption = visualyticsInheritOptions.find(
    (option) => option.value === (labelTextColor as any)["from"]
  );
  const LabelThemeOption = visualyticsThemeOptions.find(
    (option) => option.value === (labelTextColor as any)["theme"]
  );

  const handleLabelsSwitch =
    (name: keyof IChart) => (event: React.ChangeEvent<any>) => {
      const { checked } = event.target;

      setChartProps((prev) => ({
        ...prev,
        [name]: checked,
      }));

      updateParameterAction &&
        dispatch(updateParameterAction(`${basePath}.${name}`, checked));
    };

  const handleLabelSelect =
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

  const handleInheritColorModifiers =
    (name: keyof IChart) => (option: ValueType<ISelectOption, false>) => {
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

  const initializeLabelTextColor = (obj: any) => {
    setChartProps((prev) => ({
      ...prev,
      dotColor: obj,
    }));

    updateParameterAction &&
      dispatch(updateParameterAction(`${basePath}.dotColor`, obj));
  };

  return (
    <div style={{ width: "100%", padding: 5 }}>
      <ApexMuiSwitch
        name={"enableLabel"}
        handleChange={handleLabelsSwitch("enableLabel")}
        checked={enableLabel}
        checkedColor={theme.palette.success.main}
        notCheckedColor={theme.palette.common.white}
        hasLabels={true}
        leftLabel="Disable"
        rightLabel="Enable"
      />

      {enableLabel && (
        <>
          <AnalyticsComp
            title="Label"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSelectRS
                valueOption={labelOption as ISelectOption}
                data={labelOptions}
                handleSelect={handleLabelSelect("label")}
                menuPortalTarget={LabelRef.current as HTMLDivElement}
                isSelectOptionType={true}
              />
            }
          />

          <AnalyticsComp
            title="Label Skip Width"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="labelSkipWidth"
                sliderValue={labelSkipWidth}
                step={1}
                min={2}
                max={20}
                actionPath={`${basePath}.labelSkipWidth`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    labelSkipWidth: value,
                  }));
                }}
              />
            }
          />

          <AnalyticsComp
            title="Label Skip Height"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="labelSkipHeight"
                sliderValue={labelSkipHeight}
                step={1}
                min={2}
                max={20}
                actionPath={`${basePath}.labelSkipHeight`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    labelSkipHeight: value,
                  }));
                }}
              />
            }
          />

          <AnalyticsComp
            title="Labels Text Color"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <>
                <ToggleButtonGroup
                  size="small"
                  value={LabelTextColorPerspective}
                  exclusive
                  onChange={(_, value: string) => {
                    setLabelTextColorPerspective(value);

                    if (value === "inherit") {
                      initializeLabelTextColor({
                        from: "color",
                        modifiers: [],
                      });
                    } else if (value === "theme") {
                      initializeLabelTextColor({
                        theme: "background",
                      });
                    } else {
                      initializeLabelTextColor("grey");
                    }
                  }}
                >
                  <ToggleButton value="inherit">{"Inherit"}</ToggleButton>
                  <ToggleButton value="theme">{"Theme"}</ToggleButton>
                  <ToggleButton value="custom">{"Custom"}</ToggleButton>
                </ToggleButtonGroup>
                {LabelTextColorPerspective === "inherit" && (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <ApexSelectRS
                      valueOption={LabelInheritOption as ISelectOption}
                      data={visualyticsInheritOptions}
                      handleSelect={handleLabelSelect(
                        "labelTextColor",
                        true,
                        labelTextColor,
                        "from"
                      )}
                      menuPortalTarget={LabelRef.current as HTMLDivElement}
                      isSelectOptionType={true}
                    />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <ApexSelectRS
                        valueOption={LabelInheritOption as ISelectOption}
                        data={visualyticsInheritOptions}
                        handleSelect={handleInheritColorModifiers(
                          "labelTextColor"
                        )}
                        menuPortalTarget={LabelRef.current as HTMLDivElement}
                        isSelectOptionType={true}
                        containerWidth={40}
                      />
                      <ApexSlider
                        name="mordifiers"
                        sliderValue={modifiers[0][1]}
                        step={1}
                        min={0}
                        max={20}
                        actionPath={`${basePath}.labelTextColor`}
                        action={(path, value) =>
                          updateParameterAction &&
                          dispatch(updateParameterAction(path, value))
                        }
                        sliderContextFxn={handleInheritColorModifiersSlider(
                          "labelTextColor"
                        )}
                      />
                    </div>
                  </div>
                )}
                {LabelTextColorPerspective === "theme" && (
                  <ApexSelectRS
                    valueOption={LabelThemeOption as ISelectOption}
                    data={visualyticsThemeOptions}
                    handleSelect={handleLabelSelect(
                      "labelTextColor",
                      true,
                      labelTextColor,
                      "theme"
                    )}
                    menuPortalTarget={LabelRef.current as HTMLDivElement}
                    isSelectOptionType={true}
                  />
                )}

                {LabelTextColorPerspective === "custom" && (
                  <ApexPickerExtruder
                    color={
                      typeof labelTextColor === "string"
                        ? labelTextColor
                        : theme.palette.primary.main
                    }
                    showPicker={showDotLabelTextColorPicker}
                    setShowPicker={setShowDotLabelTextColorPicker}
                    containerStyle={{ marginTop: 10, width: 70 }}
                  />
                )}
                {showDotLabelTextColorPicker && (
                  <ApexSketchPicker
                    solidColor={labelTextColor as string}
                    presetColors={presetColors}
                    setPresetColors={setPresetColors}
                    showButtons={false}
                    sketchPickerContextFxn={(value: any) => {
                      setChartProps((prev) => ({
                        ...prev,
                        labelTextColor: value,
                      }));

                      updateParameterAction &&
                        dispatch(
                          updateParameterAction(
                            `${basePath}.labelTextColor`,
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

export default ApexLabels;
