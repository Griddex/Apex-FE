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
import { pointLabelOptions } from "../../Data/VisualyticsData";
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

  const handlePointersSelect =
    (name: keyof IChart) => (option: ValueType<ISelectOption, false>) => {
      setChartProps((prev) => ({
        ...prev,
        [name]: (option as ISelectOption).value as string,
      }));

      updateParameterAction &&
        dispatch(
          updateParameterAction(`${basePath}.${name}`, {
            scheme: (option as ISelectOption).value,
          })
        );
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
          {/* <AnalyticsComp
            title="Point Symbol"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexLegendAnchor
                currentAnchor={anchor}
                anchorData={legendAchorData}
              />
            }
          /> */}
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
                  onChange={(_, newPerspective: string) =>
                    setPointColorPerspective(newPerspective)
                  }
                >
                  <ToggleButton value="inherit">{"Inherit"}</ToggleButton>
                  <ToggleButton value="custom">{"Custom"}</ToggleButton>
                </ToggleButtonGroup>
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
                    oneButtonAction={() =>
                      updateParameterAction &&
                      dispatch(
                        updateParameterAction(
                          `${basePath}.pointColor`,
                          pointColor as string
                        )
                      )
                    }
                    solidColor={chartProps["pointColor"] as string}
                    setSolidColor={setChartProps as TUseState<any>}
                    presetColors={presetColors}
                    setPresetColors={setPresetColors}
                    showButtons={false}
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
                setSliderValue={setChartProps}
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
                setSliderValue={setChartProps}
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
                  onChange={(_, newPerspective: string) =>
                    setBorderColorPerspective(newPerspective)
                  }
                >
                  <ToggleButton value="inherit">{"Inherit"}</ToggleButton>
                  <ToggleButton value="custom">{"Custom"}</ToggleButton>
                </ToggleButtonGroup>
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
                    oneButtonAction={() =>
                      updateParameterAction &&
                      dispatch(
                        updateParameterAction(
                          `${basePath}.pointBorderColor`,
                          pointBorderColor as string
                        )
                      )
                    }
                    solidColor={chartProps["pointBorderColor"] as string}
                    setSolidColor={setChartProps as TUseState<any>}
                    presetColors={presetColors}
                    setPresetColors={setPresetColors}
                    showButtons={false}
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
                    handleSelect={handlePointersSelect("pointLabel")}
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
