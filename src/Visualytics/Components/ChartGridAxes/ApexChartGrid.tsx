import { TextareaAutosize, useTheme } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import { IApexChartFormatProps, IApexChartGrid } from "../Charts/ChartTypes";

const ApexChartGrid = ({
  workflowProcess,
  updateParameterAction,
  chartType,
  gridName,
  gridTitle,
  storeGridEnabled,
  gridValuesName,
  storeGridValues,
}: IApexChartGrid & Partial<IApexChartFormatProps>) => {
  const wp = workflowProcess;

  const theme = useTheme();
  const dispatch = useDispatch();

  // const [gridEnabled, setGridEnabled] = React.useState(storeGridEnabled);
  // const [gridValues, setGridValues] = React.useState(storeGridValues);

  const currentGridEnabled = gridName.endsWith("X")
    ? "enableGridX"
    : "enableGridY";

  return (
    <div style={{ width: "100%" }}>
      <AnalyticsComp
        title={gridTitle}
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexMuiSwitch
            name={gridName}
            handleChange={(event) => {
              const { checked } = event.target;
              // setGridEnabled(checked);

              updateParameterAction &&
                dispatch(
                  updateParameterAction(
                    `economicsChartsWorkflows.${wp}.${chartType}.${currentGridEnabled}`,
                    checked
                  )
                );
            }}
            checked={storeGridEnabled}
            checkedColor={theme.palette.success.main}
            notCheckedColor={theme.palette.common.white}
            hasLabels={true}
            leftLabel="Disable"
            rightLabel="Enable"
          />
        }
      />

      <TextareaAutosize
        name={gridValuesName}
        style={{ height: 30, width: "100%" }}
        minRows={4}
        value={storeGridValues?.join(", ")}
        onChange={(event) => {
          const { value } = event.target;
          // setGridValues([value]);

          updateParameterAction &&
            dispatch(
              updateParameterAction(
                `economicsChartsWorkflows.${wp}.${chartType}.${gridValuesName}`,
                value.split(", ")
              )
            );
        }}
      />
    </div>
  );
};

export default ApexChartGrid;
