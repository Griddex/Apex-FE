import { useTheme } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React from "react";
import { useDispatch } from "react-redux";
import { OnChangeValue } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import {
  dotLabelOptions,
  visualyticsInheritOptions,
  visualyticsThemeOptions,
} from "../../Data/VisualyticsData";
import { IChart } from "../../Redux/State/VisualyticsStateTypes";
import { IApexChartFormatProps } from "../Charts/ChartTypes";
import ApexPickerExtruder from "../ColorPickers/ApexPickerExtruder";
import ApexSketchPicker from "../ColorPickers/ApexSketchPicker";
import { ChartFormatAggregatorContext } from "../Contexts/ChartFormatAggregatorContext";
import ApexSlider from "../Sliders/ApexSlider";

const ApexChartDots = ({
  basePath,
  updateParameterAction,
}: Partial<IApexChartFormatProps>) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const dotRef = React.useRef<HTMLDivElement>(null);

  const { chartProps, setChartProps } = React.useContext(
    ChartFormatAggregatorContext
  );

  const {
    enableDots,
    dotSize,
    dotColor,
    dotBorderWidth,
    dotBorderColor,
    enableDotLabel,
    dotLabel,
    dotLabelYOffset,
  } = chartProps;

  const [presetColors, setPresetColors] = React.useState([
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
  ]);

  const [showDotColorPicker, setShowDotColorPicker] = React.useState(false);
  const [showDotBorderColorPicker, setShowDotBorderColorPicker] =
    React.useState(false);
  const [dotColorPerspective, setDotColorPerspective] =
    React.useState("inherit");
  const [borderColorPerspective, setBorderColorPerspective] =
    React.useState("inherit");

  const dotsInheritOption = visualyticsInheritOptions.find(
    (option) => option.value === (dotColor as any)["from"]
  );
  const dotsThemeOption = visualyticsThemeOptions.find(
    (option) => option.value === (dotColor as any)["theme"]
  );
  const dotsBorderInheritOption = visualyticsInheritOptions.find(
    (option) => option.value === (dotBorderColor as any)["from"]
  );
  const dotsBorderThemeOption = visualyticsThemeOptions.find(
    (option) => option.value === (dotBorderColor as any)["theme"]
  );
  const dotLabelOption = dotLabelOptions.find(
    (option) => option.value === dotLabel
  );

  const handleDotsSwitch =
    (name: keyof IChart) => (event: React.ChangeEvent<any>) => {
      const { checked } = event.target;

      setChartProps((prev) => ({
        ...prev,
        [name]: checked,
      }));

      updateParameterAction &&
        dispatch(updateParameterAction(`${basePath}.${name}`, checked));
    };

  const handleDotsSelect =
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

  const initializeDotColor = (obj: any) => {
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
        name={"enableDots"}
        handleChange={handleDotsSwitch("enableDots")}
        checked={enableDots}
        checkedColor={theme.palette.success.main}
        notCheckedColor={theme.palette.common.white}
        hasLabels={true}
        leftLabel="Disable"
        rightLabel="Enable"
      />

      {enableDots && (
        <>
          <AnalyticsComp
            title="Dot Size"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="dotSize"
                sliderValue={dotSize}
                step={1}
                min={2}
                max={20}
                actionPath={`${basePath}.dotSize`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    dotSize: value,
                  }));
                }}
              />
            }
          />
          <AnalyticsComp
            title="Dot Color"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <>
                <ToggleButtonGroup
                  size="small"
                  value={dotColorPerspective}
                  exclusive
                  onChange={(_, value: string) => {
                    setDotColorPerspective(value);

                    if (value === "inherit") {
                      initializeDotColor({
                        from: "color",
                        modifiers: [],
                      });
                    } else if (value === "theme") {
                      initializeDotColor({
                        theme: "background",
                      });
                    } else {
                      initializeDotColor("grey");
                    }
                  }}
                >
                  <ToggleButton value="inherit">{"Inherit"}</ToggleButton>
                  <ToggleButton value="theme">{"Theme"}</ToggleButton>
                  <ToggleButton value="custom">{"Custom"}</ToggleButton>
                </ToggleButtonGroup>
                {dotColorPerspective === "inherit" && (
                  <ApexSelectRS
                    valueOption={dotsInheritOption as ISelectOption}
                    data={visualyticsInheritOptions}
                    handleSelect={handleDotsSelect(
                      "dotColor",
                      true,
                      dotColor,
                      "from"
                    )}
                    menuPortalTarget={dotRef.current as HTMLDivElement}
                    isSelectOptionType={true}
                    containerHeight={40}
                  />
                )}
                {dotColorPerspective === "theme" && (
                  <ApexSelectRS
                    valueOption={dotsThemeOption as ISelectOption}
                    data={visualyticsThemeOptions}
                    handleSelect={handleDotsSelect(
                      "dotColor",
                      true,
                      dotColor,
                      "theme"
                    )}
                    menuPortalTarget={dotRef.current as HTMLDivElement}
                    isSelectOptionType={true}
                    containerHeight={40}
                  />
                )}
                {dotColorPerspective === "custom" && (
                  <ApexPickerExtruder
                    color={
                      typeof dotColor === "string"
                        ? dotColor
                        : theme.palette.primary.main
                    }
                    showPicker={showDotColorPicker}
                    setShowPicker={setShowDotColorPicker}
                    containerStyle={{ marginTop: 10, width: 70 }}
                  />
                )}

                {showDotColorPicker && (
                  <ApexSketchPicker
                    solidColor={dotColor as string}
                    presetColors={presetColors}
                    setPresetColors={setPresetColors}
                    showButtons={false}
                    sketchPickerContextFxn={(value: any) => {
                      setChartProps((prev) => ({
                        ...prev,
                        dotColor: value,
                      }));

                      updateParameterAction &&
                        dispatch(
                          updateParameterAction(`${basePath}.dotColor`, value)
                        );
                    }}
                  />
                )}
              </>
            }
          />
          <AnalyticsComp
            title="Dot BorderWidth"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="dotBorderWidth"
                sliderValue={dotBorderWidth}
                step={1}
                min={0}
                max={20}
                actionPath={`${basePath}.dotBorderWidth`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    dotBorderWidth: value,
                  }));
                }}
              />
            }
          />
          <AnalyticsComp
            title="Dot BorderColor"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <>
                <ToggleButtonGroup
                  size="small"
                  value={borderColorPerspective}
                  exclusive
                  onChange={(_, value: string) => {
                    setBorderColorPerspective(value);

                    if (value === "inherit") {
                      initializeDotColor({
                        from: "color",
                        modifiers: [],
                      });
                    } else if (value === "theme") {
                      initializeDotColor({
                        theme: "background",
                      });
                    } else {
                      initializeDotColor("grey");
                    }
                  }}
                >
                  <ToggleButton value="inherit">{"Inherit"}</ToggleButton>
                  <ToggleButton value="theme">{"Theme"}</ToggleButton>
                  <ToggleButton value="custom">{"Custom"}</ToggleButton>
                </ToggleButtonGroup>
                {borderColorPerspective === "inherit" && (
                  <ApexSelectRS
                    valueOption={dotsBorderInheritOption as ISelectOption}
                    data={visualyticsInheritOptions}
                    handleSelect={handleDotsSelect(
                      "dotBorderColor",
                      true,
                      dotBorderColor,
                      "from"
                    )}
                    menuPortalTarget={dotRef.current as HTMLDivElement}
                    isSelectOptionType={true}
                    containerHeight={40}
                  />
                )}
                {borderColorPerspective === "theme" && (
                  <ApexSelectRS
                    valueOption={dotsBorderThemeOption as ISelectOption}
                    data={visualyticsThemeOptions}
                    handleSelect={handleDotsSelect(
                      "dotBorderColor",
                      true,
                      dotBorderColor,
                      "theme"
                    )}
                    menuPortalTarget={dotRef.current as HTMLDivElement}
                    isSelectOptionType={true}
                    containerHeight={40}
                  />
                )}

                {borderColorPerspective === "custom" && (
                  <ApexPickerExtruder
                    color={
                      typeof dotBorderColor === "string"
                        ? dotBorderColor
                        : theme.palette.primary.main
                    }
                    showPicker={showDotBorderColorPicker}
                    setShowPicker={setShowDotBorderColorPicker}
                    containerStyle={{ marginTop: 10, width: 70 }}
                  />
                )}
                {showDotBorderColorPicker && (
                  <ApexSketchPicker
                    solidColor={dotBorderColor as string}
                    presetColors={presetColors}
                    setPresetColors={setPresetColors}
                    showButtons={false}
                    sketchPickerContextFxn={(value: any) => {
                      setChartProps((prev) => ({
                        ...prev,
                        dotBorderColor: value,
                      }));

                      updateParameterAction &&
                        dispatch(
                          updateParameterAction(
                            `${basePath}.dotBorderColor`,
                            value
                          )
                        );
                    }}
                  />
                )}
              </>
            }
          />

          <ApexMuiSwitch
            name={"enableDotLabel"}
            handleChange={handleDotsSwitch("enableDotLabel")}
            checked={enableDotLabel}
            checkedColor={theme.palette.success.main}
            notCheckedColor={theme.palette.common.white}
            hasLabels={true}
            leftLabel="Disable"
            rightLabel="Enable"
          />

          <AnalyticsComp
            title="Arc Label"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSelectRS
                valueOption={dotLabelOption as ISelectOption}
                data={dotLabelOptions}
                handleSelect={handleDotsSelect("dotLabel")}
                menuPortalTarget={dotRef.current as HTMLDivElement}
                isSelectOptionType={true}
                containerHeight={40}
              />
            }
          />

          <AnalyticsComp
            title="Dot LabelYOffset"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="dotLabelYOffset"
                sliderValue={dotLabelYOffset}
                step={1}
                min={0}
                max={20}
                actionPath={`${basePath}.dotLabelYOffset`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    dotLabelYOffset: value,
                  }));
                }}
              />
            }
          />
        </>
      )}
    </div>
  );
};

export default ApexChartDots;
