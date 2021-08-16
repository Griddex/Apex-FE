import { TextareaAutosize, useTheme } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import { IApexChartAxis, IApexChartFormatProps } from "../Charts/ChartTypes";
import ApexSlider from "../Sliders/ApexSlider";

const ApexChartAxis = ({
  workflowCategory,
  workflowProcess,
  updateParameterAction,
  chartType,
  axisCaption,
  axisEnabled,
  enableName,
  axisName,
  storeAxisTitle,
  storeAxisTitleOffset,
  storeAxisTickSize,
  storeAxisTickPadding,
  storeAxisTickRotation,
  enableAction,
}: IApexChartAxis & Partial<IApexChartFormatProps>) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const wc = workflowCategory;
  const wp = workflowProcess;

  return (
    <div style={{ width: "100%" }}>
      <ApexMuiSwitch
        name={enableName}
        handleChange={(event) => {
          const { checked } = event.target;
          enableAction && enableAction();

          updateParameterAction &&
            dispatch(
              updateParameterAction(
                `${wc}.${wp}.${chartType}.apexAxesEnabled.${axisName}`,
                checked
              )
            );
        }}
        checked={axisEnabled}
        checkedColor={theme.palette.success.main}
        notCheckedColor={theme.palette.common.white}
        hasLabels={true}
        leftLabel="Disable"
        rightLabel="Enable"
      />
      {axisEnabled && (
        <>
          <AnalyticsComp
            title="Axis Title"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <TextareaAutosize
                name={axisName}
                style={{ height: 50, width: "100%" }}
                minRows={4}
                value={storeAxisTitle}
                onChange={(event) => {
                  const { value } = event.target;

                  updateParameterAction &&
                    dispatch(
                      updateParameterAction(
                        `${wc}.${wp}.${chartType}.${axisName}.legend`,
                        value
                      )
                    );
                }}
              />
            }
          />

          <AnalyticsComp
            title="Title Offset"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="titleOffset"
                currentValue={storeAxisTitleOffset.currentValue as number}
                step={storeAxisTitleOffset.step as number}
                min={storeAxisTitleOffset.min as number}
                max={storeAxisTitleOffset.max as number}
                actionPath={`${wc}.${wp}.${chartType}.${axisName}.legendOffset`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
              />
            }
          />
          <AnalyticsComp
            title="Title Position"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="titlePosition"
                currentValue={storeAxisTitleOffset.currentValue as number}
                step={storeAxisTitleOffset.step as number}
                min={storeAxisTitleOffset.min as number}
                max={storeAxisTitleOffset.max as number}
                actionPath={`${wc}.${wp}.${chartType}.${axisName}.legendPosition`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
              />
            }
          />
          <AnalyticsComp
            title="Tick Size"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="tickSize"
                currentValue={storeAxisTickSize.currentValue as number}
                step={storeAxisTickSize.step as number}
                min={storeAxisTickSize.min as number}
                max={storeAxisTickSize.max as number}
                actionPath={`${wc}.${wp}.${chartType}.${axisName}.tickSize`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
              />
            }
          />
          <AnalyticsComp
            title="Tick Padding"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="tickPadding"
                currentValue={storeAxisTickPadding.currentValue as number}
                step={storeAxisTickPadding.step as number}
                min={storeAxisTickPadding.min as number}
                max={storeAxisTickPadding.max as number}
                actionPath={`${wc}.${wp}.${chartType}.${axisName}.tickPadding`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
              />
            }
          />
          <AnalyticsComp
            title="Tick Rotation"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <ApexSlider
                name="tickRotation"
                currentValue={storeAxisTickRotation.currentValue as number}
                step={storeAxisTickRotation.step as number}
                min={storeAxisTickRotation.min as number}
                max={storeAxisTickRotation.max as number}
                actionPath={`${wc}.${wp}.${chartType}.${axisName}.tickRotation`}
                action={(path, value) =>
                  updateParameterAction &&
                  dispatch(updateParameterAction(path, value))
                }
              />
            }
          />
        </>
      )}
    </div>
  );
};

export default ApexChartAxis;
