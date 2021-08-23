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
import {
  legendAnchorPositions,
  legendItemsDirectionOptions,
  legendSymbolShapeOptions,
} from "../../Data/VisualyticsData";
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

  const {
    enableLegend,
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
  } = chartProps["legends"];

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
    (name: string) => (option: ValueType<ISelectOption, false>) => {
      setChartProps((prev) => ({
        ...prev,
        [name]: (option as ISelectOption).value as string,
      }));

      updateParameterAction &&
        dispatch(
          updateParameterAction(`${basePath}.legends[0].${name}`, {
            scheme: (option as ISelectOption).value,
          })
        );
    };

  const legendAnchorData = legendAnchorPositions.map((rowArr) => {
    const optionsArr = rowArr.map((opt) => ({
      ...opt,
      action: () => {
        setChartProps((prev) => ({
          ...prev,
          legends: opt.value,
        }));

        updateParameterAction &&
          dispatch(
            updateParameterAction(`${basePath}.legends[0].anchor`, opt.value)
          );
      },
    }));

    return optionsArr;
  });

  return (
    <div style={{ width: "100%", padding: 5 }}>
      <ApexMuiSwitch
        name={"legendEnableName"}
        handleChange={(event) => {
          const { checked } = event.target;
          setChartProps((prev) => ({
            ...prev,
            enableLegend: checked,
          }));

          updateParameterAction &&
            dispatch(
              updateParameterAction(`${basePath}.enableLegend`, checked)
            );
        }}
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
                currentAnchor={anchor}
                anchorData={legendAnchorData}
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
                    legends: value,
                  }));
                  updateParameterAction &&
                    dispatch(
                      updateParameterAction(
                        `${basePath}.legends[0].direction`,
                        value
                      )
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
                handleChange={(event) => {
                  const { checked } = event.target;
                  setChartProps((prev) => ({
                    ...prev,
                    enableLegend: checked,
                  }));

                  updateParameterAction &&
                    dispatch(
                      updateParameterAction(
                        `${basePath}.legends[0].justify`,
                        checked
                      )
                    );
                }}
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
                actionPath={`${basePath}.legends[0].translateX`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
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
                actionPath={`${basePath}.legends[0].translateY`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
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
                actionPath={`${basePath}.legends[0].itemsSpacing`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
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
                actionPath={`${basePath}.legends[0].itemWidth`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
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
                actionPath={`${basePath}.legends[0].itemHeight`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
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
                step={1}
                min={0}
                max={10}
                actionPath={`${basePath}.legends[0].itemOpacity`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
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
                handleSelect={handleLegendSelect("itemDirection")}
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
                actionPath={`${basePath}.legends[0].symbolSize`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
              />
            }
          />
          <AnalyticsComp
            title="Symbol Border Color"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSketchPicker
                oneButtonAction={() => {}}
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
                handleSelect={handleLegendSelect("symbolShape")}
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
