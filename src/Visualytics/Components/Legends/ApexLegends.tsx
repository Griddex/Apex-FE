import { TextareaAutosize, useTheme } from "@material-ui/core";
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
import { IApexLegends, IApexChartFormatProps } from "../Charts/ChartTypes";
import ApexSketchPicker from "../ColorPickers/ApexSketchPicker";
import ApexSlider from "../Sliders/ApexSlider";
import startCase from "lodash.startcase";
import {
  legendAnchorPositions,
  legendItemsDirectionOptions,
  legendSymbolShapeOptions,
} from "../../Data/VisualyticsData";

const ApexLegends = ({
  workflowCategory,
  workflowProcess,
  updateParameterAction,
  chartType,
  enableLegend,
  anchor,
  direction,
  justify,
  itemDirection,
  symbolShape,
  symbolBorderColor,

  storeTranslateX,
  storeTranslateY,
  storeItemsSpacing,
  storeItemWidth,
  storeItemHeight,
  storeItemOpacity,
  storeSymbolSize,
}: IApexLegends & Partial<IApexChartFormatProps>) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const wc = workflowCategory;
  const wp = workflowProcess;

  const legendRef = React.useRef<HTMLDivElement>(null);
  const [solidColor, setSolidColor] = React.useState(symbolBorderColor);

  const [presetColors, setPresetColors] = React.useState([
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
  ]);

  const basePath = `${wc}.${wp}.${chartType}.otherProperties`;
  const itemDirectionOption = legendItemsDirectionOptions.find(
    (option) => option.value === itemDirection
  );
  const symbolShapeOption = legendSymbolShapeOptions.find(
    (option) => option.value === symbolShape
  );

  const legendAnchorData = legendAnchorPositions.map((rowArr) => {
    const optionsArr = rowArr.map((opt) => ({
      ...opt,
      action: () => {
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

                  updateParameterAction &&
                    dispatch(
                      updateParameterAction(`${basePath}.justify`, checked)
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
                name="titleOffset"
                currentValue={storeTranslateX.currentValue as number}
                step={storeTranslateX.step as number}
                min={storeTranslateX.min as number}
                max={storeTranslateX.max as number}
                actionPath={`${basePath}.translateX`}
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
                name="titleOffset"
                currentValue={storeTranslateY.currentValue as number}
                step={storeTranslateY.step as number}
                min={storeTranslateY.min as number}
                max={storeTranslateY.max as number}
                actionPath={`${basePath}.translateY`}
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
                name="titlePosition"
                currentValue={storeItemsSpacing.currentValue as number}
                step={storeItemsSpacing.step as number}
                min={storeItemsSpacing.min as number}
                max={storeItemsSpacing.max as number}
                actionPath={`${basePath}.itemsSpacing`}
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
                currentValue={storeItemWidth.currentValue as number}
                step={storeItemWidth.step as number}
                min={storeItemWidth.min as number}
                max={storeItemWidth.max as number}
                actionPath={`${basePath}.itemWidth`}
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
                currentValue={storeItemHeight.currentValue as number}
                step={storeItemHeight.step as number}
                min={storeItemHeight.min as number}
                max={storeItemHeight.max as number}
                actionPath={`${basePath}.itemHeight`}
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
                currentValue={storeItemOpacity.currentValue as number}
                step={storeItemOpacity.step as number}
                min={storeItemOpacity.min as number}
                max={storeItemOpacity.max as number}
                actionPath={`${basePath}.itemOpacity`}
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
                handleSelect={(option: ValueType<ISelectOption, false>) => {
                  updateParameterAction &&
                    dispatch(
                      updateParameterAction(
                        `${basePath}.itemDirection`,
                        (option as ISelectOption).value
                      )
                    );
                }}
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
                currentValue={storeSymbolSize.currentValue as number}
                step={storeSymbolSize.step as number}
                min={storeSymbolSize.min as number}
                max={storeSymbolSize.max as number}
                actionPath={`${basePath}.symbolSize`}
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
                handleSelect={(option: ValueType<ISelectOption, false>) => {
                  updateParameterAction &&
                    dispatch(
                      updateParameterAction(
                        `${basePath}.symbolShape`,
                        (option as ISelectOption).value
                      )
                    );
                }}
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
