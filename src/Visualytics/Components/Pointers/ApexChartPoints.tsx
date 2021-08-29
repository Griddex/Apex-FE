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
import { TUseState } from "../../../Application/Types/ApplicationTypes";
import {
  pointLabelOptions,
  pointsInheritOptions,
  pointsThemeOptions,
} from "../../Data/VisualyticsData";
import { IChart } from "../../Redux/VisualyticsState/VisualyticsStateTypes";
import { IApexChartFormatProps } from "../Charts/ChartTypes";
import ApexPickerExtruder from "../ColorPickers/ApexPickerExtruder";
import ApexSketchPicker from "../ColorPickers/ApexSketchPicker";
import { ChartFormatAggregatorContext } from "../Contexts/ChartFormatAggregatorContext";
import ApexSlider from "../Sliders/ApexSlider";

const ApexChartPointers = ({
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
    enablePoints,
    pointSize,
    pointColor,
    pointBorderWidth,
    pointBorderColor,
    enablePointLabel,
    pointLabel,
    pointLabelYOffset,
  } = chartProps;

  const [presetColors, setPresetColors] = React.useState([
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
  ]);

  const [showPointColorPicker, setShowPointColorPicker] = React.useState(false);
  const [showPointBorderColorPicker, setShowPointBorderColorPicker] =
    React.useState(false);
  const [pointColorPerspective, setPointColorPerspective] =
    React.useState("inherit");
  const [borderColorPerspective, setBorderColorPerspective] =
    React.useState("inherit");

  const pointLabelOption = pointLabelOptions.find(
    (option) => option.value === pointLabel
  );
  const pointsInheritOption = pointsInheritOptions.find(
    (option) => option.value === (pointColor as any)["from"]
  );
  const pointsThemeOption = pointsThemeOptions.find(
    (option) => option.value === (pointColor as any)["theme"]
  );
  const pointsBorderInheritOption = pointsInheritOptions.find(
    (option) => option.value === (pointBorderColor as any)["from"]
  );
  const pointsBorderThemeOption = pointsThemeOptions.find(
    (option) => option.value === (pointBorderColor as any)["theme"]
  );

  const handlePointsSwitch =
    (name: keyof IChart) => (event: React.ChangeEvent<any>) => {
      const { checked } = event.target;

      setChartProps((prev) => ({
        ...prev,
        [name]: checked,
      }));

      updateParameterAction &&
        dispatch(updateParameterAction(`${basePath}.${name}`, checked));
    };

  const handlePointsSelect =
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

  const initializePointColor = (obj: any) => {
    setChartProps((prev) => ({
      ...prev,
      pointColor: obj,
    }));

    updateParameterAction &&
      dispatch(updateParameterAction(`${basePath}.pointColor`, obj));
  };

  return (
    <div style={{ width: "100%", padding: 5 }}>
      <ApexMuiSwitch
        name={"pointersEnableName"}
        handleChange={handlePointsSwitch("enablePoints")}
        checked={enablePoints}
        checkedColor={theme.palette.success.main}
        notCheckedColor={theme.palette.common.white}
        hasLabels={true}
        leftLabel="Disable"
        rightLabel="Enable"
      />

      {enablePoints && (
        <>
          <AnalyticsComp
            title="Point Color"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <>
                <ToggleButtonGroup
                  size="small"
                  value={pointColorPerspective}
                  exclusive
                  onChange={(_, value: string) => {
                    setPointColorPerspective(value);

                    if (value === "inherit") {
                      initializePointColor({
                        from: value,
                        modifiers: [],
                      });
                    } else if (value === "theme") {
                      initializePointColor({
                        theme: value,
                      });
                    } else {
                      initializePointColor(showPointColorPicker);
                    }
                  }}
                >
                  <ToggleButton value="inherit">{"Inherit"}</ToggleButton>
                  <ToggleButton value="theme">{"Theme"}</ToggleButton>
                  <ToggleButton value="custom">{"Custom"}</ToggleButton>
                </ToggleButtonGroup>
                {pointColorPerspective === "inherit" && (
                  <ApexSelectRS
                    valueOption={pointsInheritOption as ISelectOption}
                    data={pointsInheritOptions}
                    handleSelect={handlePointsSelect(
                      "pointColor",
                      true,
                      pointColor,
                      "from"
                    )}
                    menuPortalTarget={pointRef.current as HTMLDivElement}
                    isSelectOptionType={true}
                  />
                )}
                {pointColorPerspective === "theme" && (
                  <ApexSelectRS
                    valueOption={pointsThemeOption as ISelectOption}
                    data={pointsThemeOptions}
                    handleSelect={handlePointsSelect(
                      "pointColor",
                      true,
                      pointColor,
                      "theme"
                    )}
                    menuPortalTarget={pointRef.current as HTMLDivElement}
                    isSelectOptionType={true}
                  />
                )}
                {pointColorPerspective === "custom" && (
                  <ApexPickerExtruder
                    color={
                      typeof pointColor === "string"
                        ? pointColor
                        : theme.palette.primary.main
                    }
                    showPicker={showPointColorPicker}
                    setShowPicker={setShowPointColorPicker}
                    containerStyle={{ marginTop: 10, width: 70 }}
                  />
                )}

                {showPointColorPicker && (
                  <ApexSketchPicker
                    solidColor={pointColor as string}
                    presetColors={presetColors}
                    setPresetColors={setPresetColors}
                    showButtons={false}
                    sketchPickerContextFxn={(value: any) => {
                      setChartProps((prev) => ({
                        ...prev,
                        pointColor: value,
                      }));

                      updateParameterAction &&
                        dispatch(
                          updateParameterAction(`${basePath}.pointColor`, value)
                        );
                    }}
                  />
                )}
              </>
            }
          />
          <AnalyticsComp
            title="Point Size"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="pointSize"
                sliderValue={pointSize}
                step={1}
                min={2}
                max={20}
                actionPath={`${basePath}.pointSize`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    pointSize: value,
                  }));
                }}
              />
            }
          />
          <AnalyticsComp
            title="Point BorderWidth"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="pointBorderWidth"
                sliderValue={pointBorderWidth}
                step={1}
                min={0}
                max={20}
                actionPath={`${basePath}.pointBorderWidth`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    pointBorderWidth: value,
                  }));
                }}
              />
            }
          />
          <AnalyticsComp
            title="Point BorderColor"
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
                      initializePointColor({
                        from: value,
                        modifiers: [],
                      });
                    } else if (value === "theme") {
                      initializePointColor({
                        theme: value,
                      });
                    } else {
                      initializePointColor(pointBorderColor);
                    }
                  }}
                >
                  <ToggleButton value="inherit">{"Inherit"}</ToggleButton>
                  <ToggleButton value="theme">{"Theme"}</ToggleButton>
                  <ToggleButton value="custom">{"Custom"}</ToggleButton>
                </ToggleButtonGroup>
                {borderColorPerspective === "inherit" && (
                  <ApexSelectRS
                    valueOption={pointsBorderInheritOption as ISelectOption}
                    data={pointsInheritOptions}
                    handleSelect={handlePointsSelect(
                      "pointBorderColor",
                      true,
                      pointBorderColor,
                      "from"
                    )}
                    menuPortalTarget={pointRef.current as HTMLDivElement}
                    isSelectOptionType={true}
                  />
                )}
                {borderColorPerspective === "theme" && (
                  <ApexSelectRS
                    valueOption={pointsBorderThemeOption as ISelectOption}
                    data={pointsThemeOptions}
                    handleSelect={handlePointsSelect(
                      "pointBorderColor",
                      true,
                      pointBorderColor,
                      "theme"
                    )}
                    menuPortalTarget={pointRef.current as HTMLDivElement}
                    isSelectOptionType={true}
                  />
                )}

                {borderColorPerspective === "custom" && (
                  <ApexPickerExtruder
                    color={
                      typeof pointBorderColor === "string"
                        ? pointBorderColor
                        : theme.palette.primary.main
                    }
                    showPicker={showPointBorderColorPicker}
                    setShowPicker={setShowPointBorderColorPicker}
                    containerStyle={{ marginTop: 10, width: 70 }}
                  />
                )}
                {showPointBorderColorPicker && (
                  <ApexSketchPicker
                    solidColor={pointBorderColor as string}
                    presetColors={presetColors}
                    setPresetColors={setPresetColors}
                    showButtons={false}
                    sketchPickerContextFxn={(value: any) => {
                      setChartProps((prev) => ({
                        ...prev,
                        pointBorderColor: value,
                      }));

                      updateParameterAction &&
                        dispatch(
                          updateParameterAction(
                            `${basePath}.pointBorderColor`,
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
            title="Enable Point Label"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexMuiSwitch
                name={"pointersLabelEnableName"}
                handleChange={handlePointsSwitch("enablePointLabel")}
                checked={enablePointLabel}
                checkedColor={theme.palette.success.main}
                notCheckedColor={theme.palette.common.white}
                hasLabels={true}
                leftLabel="Off"
                rightLabel="On"
              />
            }
          />
          {enablePointLabel && (
            <>
              <AnalyticsComp
                title="Point Label"
                direction="Vertical"
                containerStyle={{ marginTop: 20 }}
                content={
                  <ApexSelectRS
                    valueOption={pointLabelOption as ISelectOption}
                    data={pointLabelOptions}
                    handleSelect={handlePointsSelect("pointLabel")}
                    menuPortalTarget={pointRef.current as HTMLDivElement}
                    isSelectOptionType={true}
                  />
                }
              />
              <AnalyticsComp
                title="Point Label YOffset"
                direction="Vertical"
                containerStyle={{ marginTop: 20 }}
                content={
                  <ApexSlider
                    name="pointLabelYOffset"
                    sliderValue={pointLabelYOffset}
                    step={1}
                    min={0}
                    max={20}
                    actionPath={`${basePath}.pointLabelYOffset`}
                    action={(path, value) =>
                      updateParameterAction &&
                      dispatch(updateParameterAction(path, value))
                    }
                    sliderContextFxn={(value: any) => {
                      setChartProps((prev) => ({
                        ...prev,
                        pointLabelYOffset: value,
                      }));
                    }}
                  />
                }
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ApexChartPointers;
