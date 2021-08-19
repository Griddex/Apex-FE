import { useTheme } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React from "react";
import { useDispatch } from "react-redux";
import { ValueType } from "react-select";
import ApexLegendAnchor from "../../../Application/Components/Anchors/ApexLegendAnchor";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
import { pointLabelOptions } from "../../Data/VisualyticsData";
import {
  IApexChartFormatProps,
  IApexChartPointers,
} from "../Charts/ChartTypes";
import ApexPickerExtruder from "../ColorPickers/ApexPickerExtruder";
import ApexSketchPicker from "../ColorPickers/ApexSketchPicker";
import ApexSlider from "../Sliders/ApexSlider";

const ApexChartPointers = ({
  cpBasePath,
  updateParameterAction,
  enablePointers,
  enablePointLabel,
  pointLabel,
  storePointColor,
  storePointSize,
  storePointBorderWidth,
  storePointBorderColor,
  storePointLabelYOffset,
}: IApexChartPointers & Partial<IApexChartFormatProps>) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const pointRef = React.useRef<HTMLDivElement>(null);
  const [pointColor, setPointColor] = React.useState(storePointColor);
  const [showPointColorPicker, setShowPointColorPicker] = React.useState(false);

  const [pointBorderColor, setPointBorderColor] = React.useState(
    storePointBorderColor
  );
  const [showPointBorderColorPicker, setShowPointBorderColorPicker] =
    React.useState(false);

  const [presetColors, setPresetColors] = React.useState([
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
  ]);

  const [pointColorPerspective, setPointColorPerspective] =
    React.useState("inherit");
  const [borderColorPerspective, setBorderColorPerspective] =
    React.useState("inherit");

  const basePath = `${cpBasePath}.specificProperties`;
  const pointLabelOption = pointLabelOptions.find(
    (option) => option.value === pointLabel
  );

  return (
    <div style={{ width: "100%", padding: 5 }}>
      <ApexMuiSwitch
        name={"pointersEnableName"}
        handleChange={(event) => {
          const { checked } = event.target;

          updateParameterAction &&
            dispatch(
              updateParameterAction(`${basePath}.enablePoints`, checked)
            );
        }}
        checked={enablePointers}
        checkedColor={theme.palette.success.main}
        notCheckedColor={theme.palette.common.white}
        hasLabels={true}
        leftLabel="Disable"
        rightLabel="Enable"
      />

      {enablePointers && (
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
                    solidColor={pointColor as string}
                    setSolidColor={setPointColor as TUseState<string>}
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
                currentValue={storePointSize.currentValue as number}
                step={storePointSize.step as number}
                min={storePointSize.min as number}
                max={storePointSize.max as number}
                actionPath={`${basePath}.pointSize`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
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
                currentValue={storePointBorderWidth.currentValue as number}
                step={storePointBorderWidth.step as number}
                min={storePointBorderWidth.min as number}
                max={storePointBorderWidth.max as number}
                actionPath={`${basePath}.pointBorderWidth`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
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
                    solidColor={pointBorderColor as string}
                    setSolidColor={setPointBorderColor as TUseState<string>}
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
                handleChange={(event) => {
                  const { checked } = event.target;

                  updateParameterAction &&
                    dispatch(
                      updateParameterAction(
                        `${basePath}.enablePointLabel`,
                        checked
                      )
                    );
                }}
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
                    handleSelect={(option: ValueType<ISelectOption, false>) => {
                      updateParameterAction &&
                        dispatch(
                          updateParameterAction(
                            `${basePath}.pointLabel`,
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
                title="Point Label YOffset"
                direction="Vertical"
                containerStyle={{ marginTop: 20 }}
                content={
                  <ApexSlider
                    name="titleOffset"
                    currentValue={storePointLabelYOffset.currentValue as number}
                    step={storePointLabelYOffset.step as number}
                    min={storePointLabelYOffset.min as number}
                    max={storePointLabelYOffset.max as number}
                    actionPath={`${basePath}.translateY`}
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
