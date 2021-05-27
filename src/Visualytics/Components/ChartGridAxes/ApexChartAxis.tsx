import { TextareaAutosize, TextField, useTheme } from "@material-ui/core";
import React from "react";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import AnalyticsTitle from "../../../Application/Components/Basic/AnalyticsTitle";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import { IApexChartAxis, IApexChartFormatProps } from "../Charts/ChartTypes";
import ApexSlider from "../Sliders/ApexSlider";
import { useDispatch } from "react-redux";

const ApexChartAxis = ({
  workflowProcess,
  updateParameterAction,
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
  const wp = workflowProcess;

  const [enabled, setEnabled] = React.useState(axisEnabled);
  const [axisTitle, setAxisTitle] = React.useState(storeAxisTitle);

  return (
    <div style={{ width: "100%" }}>
      {/* <AnalyticsTitle title={axisCaption} /> */}
      <ApexMuiSwitch
        name={enableName}
        handleChange={(event) => {
          const { checked } = event.target;
          setEnabled(checked);
          enableAction && enableAction();
          updateParameterAction &&
            dispatch(
              updateParameterAction(
                `economicsChartsWorkflows.${wp}.lineChart.${enableName}`,
                checked
              )
            );
        }}
        checked={enabled}
        checkedColor={theme.palette.success.main}
        notCheckedColor={theme.palette.common.white}
        hasLabels={true}
        leftLabel="Disable"
        rightLabel="Enable"
      />
      {enabled && (
        <>
          <AnalyticsComp
            title="Axis Title"
            direction="Vertical"
            containerStyle={{ marginTop: 20 }}
            content={
              <TextareaAutosize
                name={axisName}
                style={{ height: 50, width: "100%" }}
                rowsMin={4}
                value={axisTitle}
                onChange={(event) => {
                  const { value } = event.target;
                  setAxisTitle(value);
                  updateParameterAction &&
                    dispatch(
                      updateParameterAction(
                        `economicsChartsWorkflows.${wp}.lineChart.${axisName}.legend`,
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
                currentValue={storeAxisTitleOffset.value}
                step={storeAxisTitleOffset.step}
                min={storeAxisTitleOffset.min}
                max={storeAxisTitleOffset.max}
                action={() =>
                  updateParameterAction &&
                  dispatch(
                    updateParameterAction(
                      `economicsChartsWorkflows.${wp}.lineChart.${axisName}.legendOffset`,
                      storeAxisTitleOffset.value
                    )
                  )
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
                currentValue={storeAxisTitleOffset.value}
                step={storeAxisTitleOffset.step}
                min={storeAxisTitleOffset.min}
                max={storeAxisTitleOffset.max}
                action={() =>
                  updateParameterAction &&
                  dispatch(
                    updateParameterAction(
                      `economicsChartsWorkflows.${wp}.lineChart.${axisName}.legendPosition`,
                      storeAxisTitleOffset.value
                    )
                  )
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
                currentValue={storeAxisTickSize.value}
                step={storeAxisTickSize.step}
                min={storeAxisTickSize.min}
                max={storeAxisTickSize.max}
                action={() =>
                  updateParameterAction &&
                  dispatch(
                    updateParameterAction(
                      `economicsChartsWorkflows.${wp}.lineChart.${axisName}.tickSize`,
                      storeAxisTickSize.value
                    )
                  )
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
                currentValue={storeAxisTickPadding.value}
                step={storeAxisTickPadding.step}
                min={storeAxisTickPadding.min}
                max={storeAxisTickPadding.max}
                action={() =>
                  updateParameterAction &&
                  dispatch(
                    updateParameterAction(
                      `economicsChartsWorkflows.${wp}.lineChart.${axisName}.tickPadding`,
                      storeAxisTickPadding.value
                    )
                  )
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
                currentValue={storeAxisTickRotation.value}
                step={storeAxisTickRotation.step}
                min={storeAxisTickRotation.min}
                max={storeAxisTickRotation.max}
                action={() =>
                  updateParameterAction &&
                  dispatch(
                    updateParameterAction(
                      `economicsChartsWorkflows.${wp}.lineChart.${axisName}.tickRotation`,
                      storeAxisTickRotation.value
                    )
                  )
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
