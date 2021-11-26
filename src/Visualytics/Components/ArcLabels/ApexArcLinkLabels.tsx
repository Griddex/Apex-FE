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
  arcLinkLabelOptions,
  colorModifierOptions,
  visualyticsInheritOptions,
  visualyticsThemeOptions,
} from "../../Data/VisualyticsData";
import { IChart } from "../../Redux/State/VisualyticsStateTypes";
import { IApexChartFormatProps } from "../Charts/ChartTypes";
import ApexPickerExtruder from "../ColorPickers/ApexPickerExtruder";
import ApexSketchPicker from "../ColorPickers/ApexSketchPicker";
import { ChartFormatAggregatorContext } from "../Contexts/ChartFormatAggregatorContext";
import ApexSlider from "../Sliders/ApexSlider";

const ApexArcLinkLabels = ({
  basePath,
  updateParameterAction,
}: Partial<IApexChartFormatProps>) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const arcLinkLabelRef = React.useRef<HTMLDivElement>(null);

  const { chartProps, setChartProps } = React.useContext(
    ChartFormatAggregatorContext
  );

  const modifiers = (
    chartProps["arcLinkLabelsTextColor"] as InheritedColorConfigFromContext
  ).modifiers as NonNullable<InheritedColorConfigFromContext["modifiers"]>;

  const {
    enableArcLinkLabels,
    arcLinkLabel,
    arcLinkLabelsOffset,
    arcLinkLabelsDiagonalLength,
    arcLinkLabelsStraightLength,
    arcLinkLabelsTextOffset,
    arcLinkLabelsSkipAngle,
    arcLinkLabelsTextColor,
    arcLinkLabelsThickness,
    arcLinkLabelsColor,
  } = chartProps;

  const [presetColors, setPresetColors] = React.useState([
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
  ]);

  const [showArcLinkLabelTextColorPicker, setShowArcLinkLabelTextColorPicker] =
    React.useState(false);
  const [
    arcLinkLabelTextColorPerspective,
    setArcLinkLabelTextColorPerspective,
  ] = React.useState("inherit");

  const [showArcLinkLabelColorPicker, setShowArcLinkLabelColorPicker] =
    React.useState(false);
  const [arcLinkLabelColorPerspective, setArcLinkLabelColorPerspective] =
    React.useState("inherit");

  const arcLinkLabelOption = arcLinkLabelOptions.find(
    (option) => option.value === arcLinkLabel
  );
  const arcLinkLabelInheritOption = visualyticsInheritOptions.find(
    (option) => option.value === (arcLinkLabelsTextColor as any)["from"]
  );
  const colorModifierOption = colorModifierOptions.find(
    (option) => option.value === (arcLinkLabelsTextColor as any)["from"]
  );
  const arcLinkLabelThemeOption = visualyticsThemeOptions.find(
    (option) => option.value === (arcLinkLabelsTextColor as any)["theme"]
  );

  const handleArcLinkLabelsSwitch =
    (name: keyof IChart) => (event: React.ChangeEvent<any>) => {
      const { checked } = event.target;

      setChartProps((prev) => ({
        ...prev,
        [name]: checked,
      }));

      updateParameterAction &&
        dispatch(updateParameterAction(`${basePath}.${name}`, checked));
    };

  const handleArcLinkLabelSelect =
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

  const initializeArcLinkLabelTextColor = (obj: any) => {
    setChartProps((prev) => ({
      ...prev,
      dotColor: obj,
    }));

    updateParameterAction &&
      dispatch(
        updateParameterAction(`${basePath}.arcLinkLabelsTextColor`, obj)
      );
  };

  const initializeArcLinkLabelColor = (obj: any) => {
    setChartProps((prev) => ({
      ...prev,
      dotColor: obj,
    }));

    updateParameterAction &&
      dispatch(updateParameterAction(`${basePath}.arcLinkLabelsColor`, obj));
  };

  return (
    <div style={{ width: "100%", padding: 5 }}>
      <ApexMuiSwitch
        name={"enableArcLinkLabels"}
        handleChange={handleArcLinkLabelsSwitch("enableArcLinkLabels")}
        checked={enableArcLinkLabels}
        checkedColor={theme.palette.success.main}
        notCheckedColor={theme.palette.common.white}
        hasLabels={true}
        leftLabel="Disable"
        rightLabel="Enable"
      />

      {enableArcLinkLabels && (
        <>
          <AnalyticsComp
            title="Arc Link Label"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSelectRS
                valueOption={arcLinkLabelOption as ISelectOption}
                data={arcLinkLabelOptions}
                handleSelect={handleArcLinkLabelSelect("arcLinkLabel")}
                menuPortalTarget={arcLinkLabelRef.current as HTMLDivElement}
                isSelectOptionType={true}
                containerHeight={40}
              />
            }
          />

          <AnalyticsComp
            title="Arc Link Labels Skip Angle"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="arcLinkLabelsSkipAngle"
                sliderValue={arcLinkLabelsSkipAngle}
                step={1}
                min={0}
                max={20}
                actionPath={`${basePath}.arcLinkLabelsSkipAngle`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    arcLinkLabelsSkipAngle: value,
                  }));
                }}
              />
            }
          />

          <AnalyticsComp
            title="Arc Link Label  Offset"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="arcLinkLabelsOffset"
                sliderValue={arcLinkLabelsOffset}
                step={1}
                min={2}
                max={20}
                actionPath={`${basePath}.arcLinkLabelsOffset`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    arcLinkLabelsOffset: value,
                  }));
                }}
              />
            }
          />

          <AnalyticsComp
            title="Arc Link Labels Diagonal Length"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="arcLinkLabelsDiagonalLength"
                sliderValue={arcLinkLabelsDiagonalLength}
                step={1}
                min={2}
                max={20}
                actionPath={`${basePath}.arcLinkLabelsDiagonalLength`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    arcLinkLabelsDiagonalLength: value,
                  }));
                }}
              />
            }
          />

          <AnalyticsComp
            title="Arc Link Labels Straight Length"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="arcLinkLabelsStraightLength"
                sliderValue={arcLinkLabelsStraightLength}
                step={1}
                min={2}
                max={20}
                actionPath={`${basePath}.arcLinkLabelsStraightLength`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    arcLinkLabelsStraightLength: value,
                  }));
                }}
              />
            }
          />

          <AnalyticsComp
            title="Arc Link Labels Text Offset"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="arcLinkLabelsTextOffset"
                sliderValue={arcLinkLabelsTextOffset}
                step={1}
                min={2}
                max={20}
                actionPath={`${basePath}.arcLinkLabelsTextOffset`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    arcLinkLabelsTextOffset: value,
                  }));
                }}
              />
            }
          />

          <AnalyticsComp
            title="Arc Link Labels Thickness"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="arcLinkLabelsThickness"
                sliderValue={arcLinkLabelsThickness}
                step={1}
                min={2}
                max={20}
                actionPath={`${basePath}.arcLinkLabelsThickness`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    arcLinkLabelsThickness: value,
                  }));
                }}
              />
            }
          />

          <AnalyticsComp
            title="Arc Link Labels Text Color"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <>
                <ToggleButtonGroup
                  size="small"
                  value={arcLinkLabelTextColorPerspective}
                  exclusive
                  onChange={(_, value: string) => {
                    setArcLinkLabelTextColorPerspective(value);

                    if (value === "inherit") {
                      initializeArcLinkLabelTextColor({
                        from: "color",
                        modifiers: [],
                      });
                    } else if (value === "theme") {
                      initializeArcLinkLabelTextColor({
                        theme: "background",
                      });
                    } else {
                      initializeArcLinkLabelTextColor("grey");
                    }
                  }}
                >
                  <ToggleButton value="inherit">{"Inherit"}</ToggleButton>
                  <ToggleButton value="theme">{"Theme"}</ToggleButton>
                  <ToggleButton value="custom">{"Custom"}</ToggleButton>
                </ToggleButtonGroup>
                {arcLinkLabelTextColorPerspective === "inherit" && (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <ApexSelectRS
                      valueOption={arcLinkLabelInheritOption as ISelectOption}
                      data={visualyticsInheritOptions}
                      handleSelect={handleArcLinkLabelSelect(
                        "arcLinkLabelsTextColor",
                        true,
                        arcLinkLabelsTextColor,
                        "from"
                      )}
                      menuPortalTarget={
                        arcLinkLabelRef.current as HTMLDivElement
                      }
                      isSelectOptionType={true}
                      containerHeight={40}
                    />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <ApexSelectRS
                        valueOption={colorModifierOption as ISelectOption}
                        data={colorModifierOptions}
                        handleSelect={handleInheritColorModifiers(
                          "arcLinkLabelsTextColor"
                        )}
                        menuPortalTarget={
                          arcLinkLabelRef.current as HTMLDivElement
                        }
                        isSelectOptionType={true}
                        containerWidth={40}
                        containerHeight={40}
                      />
                      <ApexSlider
                        name="modifiers"
                        sliderValue={modifiers[0][1]}
                        step={1}
                        min={0}
                        max={20}
                        actionPath={`${basePath}.arcLinkLabelsTextColor`}
                        action={(path, value) =>
                          updateParameterAction &&
                          dispatch(updateParameterAction(path, value))
                        }
                        sliderContextFxn={handleInheritColorModifiersSlider(
                          "arcLinkLabelsTextColor"
                        )}
                      />
                    </div>
                  </div>
                )}
                {arcLinkLabelTextColorPerspective === "theme" && (
                  <ApexSelectRS
                    valueOption={arcLinkLabelThemeOption as ISelectOption}
                    data={visualyticsThemeOptions}
                    handleSelect={handleArcLinkLabelSelect(
                      "arcLinkLabelsTextColor",
                      true,
                      arcLinkLabelsTextColor,
                      "theme"
                    )}
                    menuPortalTarget={arcLinkLabelRef.current as HTMLDivElement}
                    isSelectOptionType={true}
                    containerHeight={40}
                  />
                )}

                {arcLinkLabelTextColorPerspective === "custom" && (
                  <ApexPickerExtruder
                    color={
                      typeof arcLinkLabelsTextColor === "string"
                        ? arcLinkLabelsTextColor
                        : theme.palette.primary.main
                    }
                    showPicker={showArcLinkLabelTextColorPicker}
                    setShowPicker={setShowArcLinkLabelTextColorPicker}
                    containerStyle={{ marginTop: 10, width: 70 }}
                  />
                )}
                {showArcLinkLabelTextColorPicker && (
                  <ApexSketchPicker
                    solidColor={arcLinkLabelsTextColor as string}
                    presetColors={presetColors}
                    setPresetColors={setPresetColors}
                    showButtons={false}
                    sketchPickerContextFxn={(value: any) => {
                      setChartProps((prev) => ({
                        ...prev,
                        arcLinkLabelsTextColor: value,
                      }));

                      updateParameterAction &&
                        dispatch(
                          updateParameterAction(
                            `${basePath}.arcLinkLabelsTextColor`,
                            value
                          )
                        );
                    }}
                  />
                )}
              </>
            }
          />

          <AnalyticsComp
            title="Arc Link Labels Color"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <>
                <ToggleButtonGroup
                  size="small"
                  value={arcLinkLabelColorPerspective}
                  exclusive
                  onChange={(_, value: string) => {
                    setArcLinkLabelColorPerspective(value);

                    if (value === "inherit") {
                      initializeArcLinkLabelColor({
                        from: "color",
                        modifiers: [],
                      });
                    } else if (value === "theme") {
                      initializeArcLinkLabelColor({
                        theme: "background",
                      });
                    } else {
                      initializeArcLinkLabelColor("grey");
                    }
                  }}
                >
                  <ToggleButton value="inherit">{"Inherit"}</ToggleButton>
                  <ToggleButton value="theme">{"Theme"}</ToggleButton>
                  <ToggleButton value="custom">{"Custom"}</ToggleButton>
                </ToggleButtonGroup>
                {arcLinkLabelColorPerspective === "inherit" && (
                  <ApexSelectRS
                    valueOption={arcLinkLabelInheritOption as ISelectOption}
                    data={visualyticsInheritOptions}
                    handleSelect={handleArcLinkLabelSelect(
                      "arcLinkLabelsColor",
                      true,
                      arcLinkLabelsColor,
                      "from"
                    )}
                    menuPortalTarget={arcLinkLabelRef.current as HTMLDivElement}
                    isSelectOptionType={true}
                    containerHeight={40}
                  />
                )}
                {arcLinkLabelColorPerspective === "theme" && (
                  <ApexSelectRS
                    valueOption={arcLinkLabelThemeOption as ISelectOption}
                    data={visualyticsThemeOptions}
                    handleSelect={handleArcLinkLabelSelect(
                      "arcLinkLabelsColor",
                      true,
                      arcLinkLabelsColor,
                      "theme"
                    )}
                    menuPortalTarget={arcLinkLabelRef.current as HTMLDivElement}
                    isSelectOptionType={true}
                    containerHeight={40}
                  />
                )}

                {arcLinkLabelColorPerspective === "custom" && (
                  <ApexPickerExtruder
                    color={
                      typeof arcLinkLabelsColor === "string"
                        ? arcLinkLabelsColor
                        : theme.palette.primary.main
                    }
                    showPicker={showArcLinkLabelColorPicker}
                    setShowPicker={setShowArcLinkLabelColorPicker}
                    containerStyle={{ marginTop: 10, width: 70 }}
                  />
                )}
                {showArcLinkLabelColorPicker && (
                  <ApexSketchPicker
                    solidColor={arcLinkLabelsColor as string}
                    presetColors={presetColors}
                    setPresetColors={setPresetColors}
                    showButtons={false}
                    sketchPickerContextFxn={(value: any) => {
                      setChartProps((prev) => ({
                        ...prev,
                        arcLinkLabelsColor: value,
                      }));

                      updateParameterAction &&
                        dispatch(
                          updateParameterAction(
                            `${basePath}.arcLinkLabelsColor`,
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

export default ApexArcLinkLabels;
