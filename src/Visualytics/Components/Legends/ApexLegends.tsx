import { useTheme } from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { LegendProps } from "@nivo/legends";
import React from "react";
import { useDispatch } from "react-redux";
import { ValueType } from "react-select";
import ApexLegendAnchor from "../../../Application/Components/Anchors/ApexLegendAnchor";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import {
  legendAnchorPositions,
  legendItemsDirectionOptions,
  legendSymbolShapeOptions,
} from "../../Data/VisualyticsData";
import { IChart } from "../../Redux/State/VisualyticsStateTypes";
import { IApexChartFormatProps } from "../Charts/ChartTypes";
import ApexSketchPicker from "../ColorPickers/ApexSketchPicker";
import { ChartFormatAggregatorContext } from "../Contexts/ChartFormatAggregatorContext";
import ApexSlider from "../Sliders/ApexSlider";

const ApexLegends = ({
  basePath,
  updateParameterAction,
}: Partial<IApexChartFormatProps>) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const legendRef = React.useRef<HTMLDivElement>(null);

  const { chartProps, setChartProps } = React.useContext(
    ChartFormatAggregatorContext
  );

  const { enableLegend } = chartProps;
  const legends = chartProps["legends"][0];

  const {
    anchor,
    direction,
    justify,
    translateX,
    translateY,
    itemsSpacing,
    itemWidth,
    itemHeight,
    itemOpacity,
    itemDirection,
    symbolShape,
    symbolSize,
    symbolBorderColor,
  } = legends;

  const [solidColor, setSolidColor] = React.useState(symbolBorderColor);

  const [presetColors, setPresetColors] = React.useState([
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
  ]);

  const itemDirectionOption = legendItemsDirectionOptions.find(
    (option) => option.value === itemDirection
  );
  const symbolShapeOption = legendSymbolShapeOptions.find(
    (option) => option.value === symbolShape
  );

  const handleLegendSelect =
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

  const handleLegendSwitch =
    (
      name: keyof IChart,
      isObj?: boolean,
      obj?: any,
      objKey?: keyof LegendProps
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
    <div style={{ width: "100%", padding: 5 }}>
      <ApexMuiSwitch
        name={"legendEnableName"}
        handleChange={handleLegendSwitch("enableLegend")}
        checked={enableLegend}
        checkedColor={theme.palette.success.main}
        notCheckedColor={theme.palette.common.white}
        hasLabels={true}
        leftLabel="Disable"
        rightLabel="Enable"
      />

      {enableLegend && (
        <>
          <AnalyticsComp
            title="Anchor"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexLegendAnchor
                basePath={basePath as string}
                legends={legends}
                currentAnchor={anchor}
                setAnchor={setChartProps}
                updateParameterAction={
                  updateParameterAction as IApexChartFormatProps["updateParameterAction"]
                }
                anchorData={legendAnchorPositions}
              />
            }
          />
          <AnalyticsComp
            title="Flex Direction"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ToggleButtonGroup
                size="small"
                value={direction}
                exclusive
                onChange={(_, value) => {
                  setChartProps((prev) => ({
                    ...prev,
                    legends: [
                      { ...chartProps["legends"][0], direction: value },
                    ],
                  }));

                  updateParameterAction &&
                    dispatch(
                      updateParameterAction(`${basePath}.legends`, [
                        {
                          ...legends,
                          direction: value,
                        },
                      ])
                    );
                }}
              >
                <ToggleButton value="column">{"Column"}</ToggleButton>
                <ToggleButton value="row">{"Row"}</ToggleButton>
              </ToggleButtonGroup>
            }
          />
          <AnalyticsComp
            title="Justify"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexMuiSwitch
                name={"justifyEnableName"}
                handleChange={handleLegendSwitch(
                  "legends",
                  true,
                  legends,
                  "justify"
                )}
                checked={justify}
                checkedColor={theme.palette.success.main}
                notCheckedColor={theme.palette.common.white}
                hasLabels={true}
                leftLabel="Off"
                rightLabel="On"
              />
            }
          />
          <AnalyticsComp
            title="Translate X"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="translateX"
                sliderValue={translateX}
                step={1}
                min={-200}
                max={200}
                actionPath={`${basePath}.legends`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(
                    updateParameterAction(path, [
                      { ...legends, translateX: value },
                    ])
                  )
                }
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    legends: [{ ...prev["legends"][0], translateX: value }],
                  }));
                }}
              />
            }
          />
          <AnalyticsComp
            title="Translate Y"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="translateY"
                sliderValue={translateY}
                step={1}
                min={-200}
                max={200}
                actionPath={`${basePath}.legends`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(
                    updateParameterAction(path, [
                      { ...legends, translateY: value },
                    ])
                  )
                }
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    legends: [{ ...prev["legends"][0], translateY: value }],
                  }));
                }}
              />
            }
          />
          <AnalyticsComp
            title="Items Spacing"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="itemsSpacing"
                sliderValue={itemsSpacing}
                step={1}
                min={0}
                max={60}
                actionPath={`${basePath}.legends`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(
                    updateParameterAction(path, [
                      { ...legends, itemsSpacing: value },
                    ])
                  )
                }
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    legends: [{ ...prev["legends"][0], itemsSpacing: value }],
                  }));
                }}
              />
            }
          />
          <AnalyticsComp
            title="Item Width"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="itemWidth"
                sliderValue={itemWidth}
                step={1}
                min={10}
                max={200}
                actionPath={`${basePath}.legends`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(
                    updateParameterAction(path, [
                      { ...legends, itemWidth: value },
                    ])
                  )
                }
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    legends: [{ ...prev["legends"][0], itemWidth: value }],
                  }));
                }}
              />
            }
          />
          <AnalyticsComp
            title="Item Height"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="itemHeight"
                sliderValue={itemHeight}
                step={1}
                min={10}
                max={200}
                actionPath={`${basePath}.legends`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(
                    updateParameterAction(path, [
                      { ...legends, itemHeight: value },
                    ])
                  )
                }
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    legends: [{ ...prev["legends"][0], itemHeight: value }],
                  }));
                }}
              />
            }
          />
          <AnalyticsComp
            title="Item Opacity"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="itemOpacity"
                sliderValue={itemOpacity}
                step={0.1}
                min={0}
                max={1}
                actionPath={`${basePath}.legends`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(
                    updateParameterAction(path, [
                      { ...legends, itemOpacity: value },
                    ])
                  )
                }
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    legends: [{ ...prev["legends"][0], itemOpacity: value }],
                  }));
                }}
              />
            }
          />
          <AnalyticsComp
            title="Item Direction"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSelectRS
                valueOption={itemDirectionOption as ISelectOption}
                data={legendItemsDirectionOptions}
                handleSelect={handleLegendSelect(
                  "legends",
                  true,
                  legends,
                  "itemDirection"
                )}
                menuPortalTarget={legendRef.current as HTMLDivElement}
                isSelectOptionType={true}
              />
            }
          />
          <AnalyticsComp
            title="Symbol Size"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="symbolSize"
                sliderValue={symbolSize}
                step={1}
                min={2}
                max={60}
                actionPath={`${basePath}.legends`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(
                    updateParameterAction(path, [
                      { ...legends, symbolSize: value },
                    ])
                  )
                }
                sliderContextFxn={(value: any) => {
                  setChartProps((prev) => ({
                    ...prev,
                    legends: [{ ...prev["legends"][0], symbolSize: value }],
                  }));
                }}
              />
            }
          />
          <AnalyticsComp
            title="Symbol Border Color"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSketchPicker
                solidColor={solidColor}
                setSolidColor={setSolidColor}
                presetColors={presetColors}
                setPresetColors={setPresetColors}
                showButtons={false}
              />
            }
          />
          <AnalyticsComp
            title="Symbol Shape"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSelectRS
                valueOption={symbolShapeOption as ISelectOption}
                data={legendSymbolShapeOptions}
                handleSelect={handleLegendSelect(
                  "legends",
                  true,
                  legends,
                  "symbolShape"
                )}
                menuPortalTarget={legendRef.current as HTMLDivElement}
                isSelectOptionType={true}
              />
            }
          />
        </>
      )}
    </div>
  );
};

export default ApexLegends;
