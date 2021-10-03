import { useTheme } from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {
  InheritedColorConfigFromContext,
  OrdinalColorScaleConfigScheme,
} from "@nivo/colors";
import React from "react";
import { useDispatch } from "react-redux";
import { ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import {
  blendModeOptions,
  colorsOptions,
  curveOptions,
  offsetTypeOptions,
  orderOptions,
  radarCurveOptions,
  visualyticsInheritOptions,
  visualyticsThemeOptions,
} from "../../Data/VisualyticsData";
import { IChart } from "../../Redux/State/VisualyticsStateTypes";
import {
  bar,
  bar_htm,
  dht,
  dht_bar,
  htm,
  lin,
  lin_sct_rad,
  rad,
  sct,
  stk,
  stk_dht_bar_rad,
  stk_rad,
} from "../../Utils/ChartFormatDiscriminators";
import { IApexChartFormatProps } from "../Charts/ChartTypes";
import ChartValueFormatters from "../ChartValueFormatters/ChartValueFormatters";
import ApexPickerExtruder from "../ColorPickers/ApexPickerExtruder";
import ApexSketchPicker from "../ColorPickers/ApexSketchPicker";
import { ChartFormatAggregatorContext } from "../Contexts/ChartFormatAggregatorContext";
import ApexSlider from "../Sliders/ApexSlider";

const ApexChartSeries = ({
  basePath,
  updateParameterAction,
  chartType,
}: Partial<IApexChartFormatProps>) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const chartTypeDefined = chartType as string;

  const generalRef = React.useRef<HTMLDivElement>(null);

  const { chartProps, setChartProps } = React.useContext(
    ChartFormatAggregatorContext
  );

  const modifiers = (
    chartProps["arcLabelsTextColor"] as InheritedColorConfigFromContext
  ).modifiers as NonNullable<InheritedColorConfigFromContext["modifiers"]>;

  const {
    offsetType,
    order,
    curve,
    colors,
    fillOpacity,
    borderWidth,
    lineWidth,
    borderColor,
    areaBlendMode,
    enableArea,
    areaBaselineValue,
    areaOpacity,
    valueFormat,
    startAngle,
    endAngle,
    fit,
    innerRadius,
    padAngle,
    cornerRadius,
    sortByValue,
    groupMode,
    layout,
    padding,
    innerPadding,
    blendMode,
    nodeSize,
    forceSquare,
    sizeVariation,
    cellOpacity,
    cellBorderWidth,
    cellBorderColor,
  } = chartProps;

  const [presetColors, setPresetColors] = React.useState([
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
  ]);

  const [showBorderColorPicker, setShowBorderColorPicker] =
    React.useState(false);

  const [borderColorPerspective, setBorderColorPerspective] =
    React.useState("inherit");

  const [showCellBorderColorPicker, setShowCellBorderColorPicker] =
    React.useState(false);
  const [cellBorderColorPerspective, setCellBorderColorPerspective] =
    React.useState("inherit");

  const [groupModePerspective, setGroupModePerspective] =
    React.useState(groupMode);

  const [layoutModePerspective, setLayoutModePerspective] =
    React.useState(layout);

  const offsetTypeOption = offsetTypeOptions.find(
    (option) => option.value === offsetType
  );
  const orderOption = orderOptions.find((option) => option.value === order);
  const curveOption = curveOptions.find((option) => option.value === curve);
  const radarCurveOption = radarCurveOptions.find(
    (option) => option.value === curve
  );
  const colorsOption = colorsOptions.find(
    (option) =>
      option.value === (colors as OrdinalColorScaleConfigScheme)["scheme"]
  );
  const areaBlendOption = blendModeOptions.find(
    (option) => option.value === areaBlendMode
  );
  const borderInheritOption = visualyticsInheritOptions.find(
    (option) => option.value === (borderColor as any)["from"]
  );
  const borderThemeOption = visualyticsThemeOptions.find(
    (option) => option.value === (borderColor as any)["theme"]
  );
  const blendModeOption = blendModeOptions.find(
    (option) => option.value === blendMode
  );

  const cellBorderInheritOption = visualyticsInheritOptions.find(
    (option) => option.value === (cellBorderColor as any)["from"]
  );
  const cellBorderThemeOption = visualyticsThemeOptions.find(
    (option) => option.value === (cellBorderColor as any)["theme"]
  );

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

  const handleSeriesSelect =
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

  const handleSeriesSwitch =
    (name: keyof IChart) => (event: React.ChangeEvent<any>) => {
      const { checked } = event.target;

      setChartProps((prev) => ({
        ...prev,
        [name]: checked,
      }));

      updateParameterAction &&
        dispatch(updateParameterAction(`${basePath}.${name}`, checked));
    };

  const initializeBorderColor = (obj: any) => {
    setChartProps((prev) => ({
      ...prev,
      borderColor: obj,
    }));

    updateParameterAction &&
      dispatch(updateParameterAction(`${basePath}.borderColor`, obj));
  };

  const initializeCellBorderColor = (obj: any) => {
    setChartProps((prev) => ({
      ...prev,
      cellBorderColor: obj,
    }));

    updateParameterAction &&
      dispatch(updateParameterAction(`${basePath}.cellBorderColor`, obj));
  };

  return (
    <div style={{ width: "100%", padding: 5 }}>
      {stk.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Offset Type"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSelectRS
              valueOption={offsetTypeOption as ISelectOption}
              data={offsetTypeOptions}
              handleSelect={handleSeriesSelect("offsetType", false)}
              menuPortalTarget={generalRef.current as HTMLDivElement}
              isSelectOptionType={true}
            />
          }
        />
      )}

      {stk.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Order"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSelectRS
              valueOption={orderOption as ISelectOption}
              data={orderOptions}
              handleSelect={handleSeriesSelect("order", false)}
              menuPortalTarget={generalRef.current as HTMLDivElement}
              isSelectOptionType={true}
            />
          }
        />
      )}

      {stk.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Curve"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSelectRS
              valueOption={curveOption as ISelectOption}
              data={curveOptions}
              handleSelect={handleSeriesSelect("curve", false)}
              menuPortalTarget={generalRef.current as HTMLDivElement}
              isSelectOptionType={true}
            />
          }
        />
      )}

      {rad.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Curve"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSelectRS
              valueOption={radarCurveOption as ISelectOption}
              data={radarCurveOptions}
              handleSelect={handleSeriesSelect("curve", false)}
              menuPortalTarget={generalRef.current as HTMLDivElement}
              isSelectOptionType={true}
            />
          }
        />
      )}

      <AnalyticsComp
        title="Colors"
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexSelectRS
            valueOption={colorsOption as ISelectOption}
            data={colorsOptions}
            handleSelect={handleSeriesSelect(
              "colors",
              true,
              { scheme: "category10" },
              "scheme"
            )}
            menuPortalTarget={generalRef.current as HTMLDivElement}
            isSelectOptionType={true}
          />
        }
      />

      {stk_rad.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Fill Opacity"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSlider
              name="fillOpacity"
              sliderValue={fillOpacity}
              setSliderValue={setChartProps}
              step={0.05}
              min={0}
              max={1}
              actionPath={`${basePath}.fillOpacity`}
              action={(path, value) =>
                updateParameterAction &&
                dispatch(updateParameterAction(path, value))
              }
              sliderContextFxn={(value: any) => {
                setChartProps((prev) => ({
                  ...prev,
                  fillOpacity: value,
                }));
              }}
            />
          }
        />
      )}

      {stk_dht_bar_rad.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Border Width"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSlider
              name="borderWidth"
              sliderValue={borderWidth}
              step={1}
              min={0}
              max={20}
              actionPath={`${basePath}.borderWidth`}
              action={(path, value) =>
                updateParameterAction &&
                dispatch(updateParameterAction(path, value))
              }
              sliderContextFxn={(value: any) => {
                setChartProps((prev) => ({
                  ...prev,
                  borderWidth: value,
                }));
              }}
            />
          }
        />
      )}

      {stk_dht_bar_rad.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Border Color"
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
                    initializeBorderColor({
                      from: "color",
                      modifiers: [],
                    });
                  } else if (value === "theme") {
                    initializeBorderColor({
                      theme: "background",
                    });
                  } else {
                    initializeBorderColor(theme.palette.grey["300"]);
                  }
                }}
              >
                <ToggleButton value="inherit">{"Inherit"}</ToggleButton>
                <ToggleButton value="theme">{"Theme"}</ToggleButton>
                <ToggleButton value="custom">{"Custom"}</ToggleButton>
              </ToggleButtonGroup>
              {borderColorPerspective === "inherit" && (
                <ApexSelectRS
                  valueOption={borderInheritOption as ISelectOption}
                  data={visualyticsInheritOptions}
                  handleSelect={handleSeriesSelect(
                    "borderColor",
                    true,
                    borderColor,
                    "from"
                  )}
                  menuPortalTarget={generalRef.current as HTMLDivElement}
                  isSelectOptionType={true}
                />
              )}
              {borderColorPerspective === "theme" && (
                <ApexSelectRS
                  valueOption={borderThemeOption as ISelectOption}
                  data={visualyticsThemeOptions}
                  handleSelect={handleSeriesSelect(
                    "borderColor",
                    true,
                    borderColor,
                    "theme"
                  )}
                  menuPortalTarget={generalRef.current as HTMLDivElement}
                  isSelectOptionType={true}
                />
              )}
              {borderColorPerspective === "custom" && (
                <ApexPickerExtruder
                  color={
                    typeof borderColor === "string"
                      ? borderColor
                      : theme.palette.primary.main
                  }
                  showPicker={showBorderColorPicker}
                  setShowPicker={setShowBorderColorPicker}
                  containerStyle={{ marginTop: 10, width: 70 }}
                />
              )}

              {showBorderColorPicker && (
                <ApexSketchPicker
                  solidColor={borderColor as string}
                  presetColors={presetColors}
                  setPresetColors={setPresetColors}
                  showButtons={false}
                  sketchPickerContextFxn={(value: any) => {
                    setChartProps((prev) => ({
                      ...prev,
                      borderColor: value,
                    }));

                    updateParameterAction &&
                      dispatch(
                        updateParameterAction(`${basePath}.borderColor`, value)
                      );
                  }}
                />
              )}
            </>
          }
        />
      )}

      {lin.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Line Width"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSlider
              name="lineWidth"
              sliderValue={lineWidth}
              step={1}
              min={0}
              max={20}
              actionPath={`${basePath}.lineWidth`}
              action={(path, value) =>
                updateParameterAction &&
                dispatch(updateParameterAction(path, value))
              }
              sliderContextFxn={(value: any) => {
                setChartProps((prev) => ({
                  ...prev,
                  lineWidth: value,
                }));
              }}
            />
          }
        />
      )}

      {lin.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Enable Area"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexMuiSwitch
              name={"generalEnableAreaName"}
              handleChange={handleSeriesSwitch("enableArea")}
              checked={enableArea}
              checkedColor={theme.palette.success.main}
              notCheckedColor={theme.palette.common.white}
              hasLabels={true}
              leftLabel="Off"
              rightLabel="On"
            />
          }
        />
      )}

      {lin.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Area Baseline"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSlider
              name="areaBaselineValue"
              sliderValue={areaBaselineValue}
              step={1}
              min={0}
              max={200}
              actionPath={`${basePath}.areaBaselineValue`}
              action={(path, value) =>
                updateParameterAction &&
                dispatch(updateParameterAction(path, value))
              }
              sliderContextFxn={(value: any) => {
                setChartProps((prev) => ({
                  ...prev,
                  areaBaselineValue: value,
                }));
              }}
            />
          }
        />
      )}

      {lin.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Area Opacity"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSlider
              name="areaOpacity"
              sliderValue={areaOpacity}
              step={0.1}
              min={0}
              max={1}
              actionPath={`${basePath}.areaOpacity`}
              action={(path, value) =>
                updateParameterAction &&
                dispatch(updateParameterAction(path, value))
              }
              sliderContextFxn={(value: any) => {
                setChartProps((prev) => ({
                  ...prev,
                  areaOpacity: value,
                }));
              }}
            />
          }
        />
      )}

      {lin.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Area Blend"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSelectRS
              valueOption={areaBlendOption as ISelectOption}
              data={blendModeOptions}
              handleSelect={handleSeriesSelect("areaBlendMode")}
              menuPortalTarget={generalRef.current as HTMLDivElement}
              isSelectOptionType={true}
            />
          }
        />
      )}

      {dht_bar.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Value Format"
          direction="Vertical"
          containerStyle={{
            marginTop: 20,
          }}
          content={
            <ChartValueFormatters
              basePath={basePath as string}
              intialFormatValue={{ format: valueFormat, enabled: false }}
              plotRef={generalRef}
              updateParameterAction={
                updateParameterAction as IApexChartFormatProps["updateParameterAction"]
              }
              axisFormatTitle="vFormat"
              setValueFormat={setChartProps}
            />
          }
        />
      )}

      {dht.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Start Angle"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSlider
              name="startAngle"
              sliderValue={startAngle}
              step={1}
              min={0}
              max={20}
              actionPath={`${basePath}.startAngle`}
              action={(path, value) =>
                updateParameterAction &&
                dispatch(updateParameterAction(path, value))
              }
              sliderContextFxn={(value: any) => {
                setChartProps((prev) => ({
                  ...prev,
                  startAngle: value,
                }));
              }}
            />
          }
        />
      )}

      {dht.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="End Angle"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSlider
              name="endAngle"
              sliderValue={endAngle}
              step={1}
              min={0}
              max={20}
              actionPath={`${basePath}.endAngle`}
              action={(path, value) =>
                updateParameterAction &&
                dispatch(updateParameterAction(path, value))
              }
              sliderContextFxn={(value: any) => {
                setChartProps((prev) => ({
                  ...prev,
                  endAngle: value,
                }));
              }}
            />
          }
        />
      )}

      {dht.includes(chartTypeDefined) && (
        <ApexMuiSwitch
          name={"fit"}
          handleChange={handleSeriesSwitch("fit")}
          checked={fit}
          checkedColor={theme.palette.success.main}
          notCheckedColor={theme.palette.common.white}
          hasLabels={true}
          leftLabel="Disable"
          rightLabel="Enable"
        />
      )}

      {dht.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Inner Radius"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSlider
              name="innerRadius"
              sliderValue={innerRadius}
              step={1}
              min={0}
              max={20}
              actionPath={`${basePath}.innerRadius`}
              action={(path, value) =>
                updateParameterAction &&
                dispatch(updateParameterAction(path, value))
              }
              sliderContextFxn={(value: any) => {
                setChartProps((prev) => ({
                  ...prev,
                  innerRadius: value,
                }));
              }}
            />
          }
        />
      )}

      {dht.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Pad Angle"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSlider
              name="padAngle"
              sliderValue={padAngle}
              step={1}
              min={0}
              max={20}
              actionPath={`${basePath}.padAngle`}
              action={(path, value) =>
                updateParameterAction &&
                dispatch(updateParameterAction(path, value))
              }
              sliderContextFxn={(value: any) => {
                setChartProps((prev) => ({
                  ...prev,
                  padAngle: value,
                }));
              }}
            />
          }
        />
      )}

      {dht.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Corner Radius"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSlider
              name="cornerRadius"
              sliderValue={cornerRadius}
              step={1}
              min={0}
              max={20}
              actionPath={`${basePath}.cornerRadius`}
              action={(path, value) =>
                updateParameterAction &&
                dispatch(updateParameterAction(path, value))
              }
              sliderContextFxn={(value: any) => {
                setChartProps((prev) => ({
                  ...prev,
                  cornerRadius: value,
                }));
              }}
            />
          }
        />
      )}

      {dht.includes(chartTypeDefined) && (
        <ApexMuiSwitch
          name={"sortByValue"}
          handleChange={handleSeriesSwitch("sortByValue")}
          checked={sortByValue}
          checkedColor={theme.palette.success.main}
          notCheckedColor={theme.palette.common.white}
          hasLabels={true}
          leftLabel="Disable"
          rightLabel="Enable"
        />
      )}

      {bar.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Group Mode"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <>
              <ToggleButtonGroup
                size="small"
                value={groupModePerspective}
                exclusive
                onChange={(_, value: any) => {
                  setGroupModePerspective(value);

                  updateParameterAction &&
                    dispatch(
                      updateParameterAction(`${basePath}.groupMode`, value)
                    );
                }}
              >
                <ToggleButton value="stacked">{"Stacked"}</ToggleButton>
                <ToggleButton value="grouped">{"Group"}</ToggleButton>
              </ToggleButtonGroup>
            </>
          }
        />
      )}

      {bar.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Layout Mode"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <>
              <ToggleButtonGroup
                size="small"
                value={layoutModePerspective}
                exclusive
                onChange={(_, value: any) => {
                  setLayoutModePerspective(value);

                  updateParameterAction &&
                    dispatch(
                      updateParameterAction(`${basePath}.layout`, value)
                    );
                }}
              >
                <ToggleButton value="horizontal">{"Horizontal"}</ToggleButton>
                <ToggleButton value="vartical">{"Vertical"}</ToggleButton>
              </ToggleButtonGroup>
            </>
          }
        />
      )}

      {bar_htm.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Padding"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSlider
              name="padding"
              sliderValue={padding}
              step={0.1}
              min={0}
              max={0.9}
              actionPath={`${basePath}.padding`}
              action={(path, value) =>
                updateParameterAction &&
                dispatch(updateParameterAction(path, value))
              }
              sliderContextFxn={(value: any) => {
                setChartProps((prev) => ({
                  ...prev,
                  padding: value,
                }));
              }}
            />
          }
        />
      )}

      {bar.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Inner Padding"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSlider
              name="innerPadding"
              sliderValue={innerPadding}
              step={1}
              min={0}
              max={10}
              actionPath={`${basePath}.innerPadding`}
              action={(path, value) =>
                updateParameterAction &&
                dispatch(updateParameterAction(path, value))
              }
              sliderContextFxn={(value: any) => {
                setChartProps((prev) => ({
                  ...prev,
                  innerPadding: value,
                }));
              }}
            />
          }
        />
      )}

      {lin_sct_rad.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Blend Mode"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSelectRS
              valueOption={blendModeOption as ISelectOption}
              data={blendModeOptions}
              handleSelect={handleSeriesSelect("blendMode", false)}
              menuPortalTarget={generalRef.current as HTMLDivElement}
              isSelectOptionType={true}
            />
          }
        />
      )}

      {sct.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Node Size"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSlider
              name="nodeSize"
              sliderValue={nodeSize}
              step={1}
              min={2}
              max={24}
              actionPath={`${basePath}.nodeSize`}
              action={(path, value) =>
                updateParameterAction &&
                dispatch(updateParameterAction(path, value))
              }
              sliderContextFxn={(value: any) => {
                setChartProps((prev) => ({
                  ...prev,
                  nodeSize: value,
                }));
              }}
            />
          }
        />
      )}

      {htm.includes(chartTypeDefined) && (
        <ApexMuiSwitch
          name={"forceSquare"}
          handleChange={handleSeriesSwitch("forceSquare")}
          checked={forceSquare}
          checkedColor={theme.palette.success.main}
          notCheckedColor={theme.palette.common.white}
          hasLabels={true}
          leftLabel="Disable"
          rightLabel="Enable"
        />
      )}

      {htm.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Size Variation"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSlider
              name="sizeVariation"
              sliderValue={sizeVariation}
              step={1}
              min={2}
              max={24}
              actionPath={`${basePath}.sizeVariation`}
              action={(path, value) =>
                updateParameterAction &&
                dispatch(updateParameterAction(path, value))
              }
              sliderContextFxn={(value: any) => {
                setChartProps((prev) => ({
                  ...prev,
                  sizeVariation: value,
                }));
              }}
            />
          }
        />
      )}

      {htm.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Cell Opacity"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSlider
              name="cellOpacity"
              sliderValue={cellOpacity}
              step={1}
              min={2}
              max={24}
              actionPath={`${basePath}.cellOpacity`}
              action={(path, value) =>
                updateParameterAction &&
                dispatch(updateParameterAction(path, value))
              }
              sliderContextFxn={(value: any) => {
                setChartProps((prev) => ({
                  ...prev,
                  cellOpacity: value,
                }));
              }}
            />
          }
        />
      )}

      {htm.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Cell Border Width"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <ApexSlider
              name="cellBorderWidth"
              sliderValue={cellBorderWidth}
              step={1}
              min={2}
              max={24}
              actionPath={`${basePath}.cellBorderWidth`}
              action={(path, value) =>
                updateParameterAction &&
                dispatch(updateParameterAction(path, value))
              }
              sliderContextFxn={(value: any) => {
                setChartProps((prev) => ({
                  ...prev,
                  cellBorderWidth: value,
                }));
              }}
            />
          }
        />
      )}

      {htm.includes(chartTypeDefined) && (
        <AnalyticsComp
          title="Cell Border Color"
          direction="Vertical"
          containerStyle={{ marginTop: 20 }}
          content={
            <>
              <ToggleButtonGroup
                size="small"
                value={cellBorderColorPerspective}
                exclusive
                onChange={(_, value: string) => {
                  setCellBorderColorPerspective(value);

                  if (value === "inherit") {
                    initializeCellBorderColor({
                      from: "color",
                      modifiers: [],
                    });
                  } else if (value === "theme") {
                    initializeCellBorderColor({
                      theme: "background",
                    });
                  } else {
                    initializeCellBorderColor(theme.palette.grey["300"]);
                  }
                }}
              >
                <ToggleButton value="inherit">{"Inherit"}</ToggleButton>
                <ToggleButton value="theme">{"Theme"}</ToggleButton>
                <ToggleButton value="custom">{"Custom"}</ToggleButton>
              </ToggleButtonGroup>
              {cellBorderColorPerspective === "inherit" && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <ApexSelectRS
                    valueOption={cellBorderInheritOption as ISelectOption}
                    data={visualyticsInheritOptions}
                    handleSelect={handleSeriesSelect(
                      "cellBorderColor",
                      true,
                      cellBorderColor,
                      "from"
                    )}
                    menuPortalTarget={generalRef.current as HTMLDivElement}
                    isSelectOptionType={true}
                  />
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <ApexSelectRS
                      valueOption={cellBorderInheritOption as ISelectOption}
                      data={visualyticsInheritOptions}
                      handleSelect={handleInheritColorModifiers(
                        "cellBorderColor"
                      )}
                      menuPortalTarget={generalRef.current as HTMLDivElement}
                      isSelectOptionType={true}
                      containerWidth={40}
                    />
                    <ApexSlider
                      name="mordifiers"
                      sliderValue={modifiers[0][1]}
                      step={1}
                      min={0}
                      max={20}
                      actionPath={`${basePath}.cellBorderColor`}
                      action={(path, value) =>
                        updateParameterAction &&
                        dispatch(updateParameterAction(path, value))
                      }
                      sliderContextFxn={handleInheritColorModifiersSlider(
                        "cellBorderColor"
                      )}
                    />
                  </div>
                </div>
              )}
              {cellBorderColorPerspective === "theme" && (
                <ApexSelectRS
                  valueOption={cellBorderThemeOption as ISelectOption}
                  data={visualyticsThemeOptions}
                  handleSelect={handleSeriesSelect(
                    "cellBorderColor",
                    true,
                    cellBorderColor,
                    "theme"
                  )}
                  menuPortalTarget={generalRef.current as HTMLDivElement}
                  isSelectOptionType={true}
                />
              )}

              {cellBorderColorPerspective === "custom" && (
                <ApexPickerExtruder
                  color={
                    typeof cellBorderColor === "string"
                      ? cellBorderColor
                      : theme.palette.primary.main
                  }
                  showPicker={showCellBorderColorPicker}
                  setShowPicker={setShowCellBorderColorPicker}
                  containerStyle={{ marginTop: 10, width: 70 }}
                />
              )}
              {showCellBorderColorPicker && (
                <ApexSketchPicker
                  solidColor={cellBorderColor as string}
                  presetColors={presetColors}
                  setPresetColors={setPresetColors}
                  showButtons={false}
                  sketchPickerContextFxn={(value: any) => {
                    setChartProps((prev) => ({
                      ...prev,
                      cellBorderColor: value,
                    }));

                    updateParameterAction &&
                      dispatch(
                        updateParameterAction(
                          `${basePath}.cellBorderColor`,
                          value
                        )
                      );
                  }}
                />
              )}
            </>
          }
        />
      )}
    </div>
  );
};

export default ApexChartSeries;
