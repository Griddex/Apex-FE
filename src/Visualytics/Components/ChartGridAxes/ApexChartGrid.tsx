import { TextareaAutosize, useTheme } from "@material-ui/core";
import React from "react";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import { IApexChartFormatProps, IApexChartGrid } from "../Charts/ChartTypes";

const ApexGrid = ({
  workflowProcess,
  updateParameterAction,
  gridName,
  gridTitle,
  storeGridEnabled,
  gridValuesName,
  storeGridValues,
}: IApexChartGrid & Partial<IApexChartFormatProps>) => {
  const theme = useTheme();
  const [gridEnabled, setGridEnabled] = React.useState(storeGridEnabled);
  const [gridValues, setGridValues] = React.useState(storeGridValues);

  return (
    <div style={{ width: "100%" }}>
      <AnalyticsComp
        title={gridTitle}
        direction="Vertical"
        containerStyle={{ marginTop: 30 }}
        content={
          <ApexMuiSwitch
            name={gridName}
            handleChange={(event) => {
              const { checked } = event.target;
              setGridEnabled(checked);
            }}
            checked={gridEnabled}
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
        rowsMin={4}
        value={gridValues?.map((v) => v.toString())}
        onChange={(event) => {
          const { value } = event.target;
          setGridValues([value]);
        }}
      />
    </div>
  );
};

export default ApexGrid;
