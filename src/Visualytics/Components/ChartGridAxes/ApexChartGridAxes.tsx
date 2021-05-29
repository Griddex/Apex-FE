import React from "react";
import ApexMultiAccordions from "../../../Application/Components/Accordions/ApexMultiAccordions";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexFlexStyle from "../../../Application/Components/Styles/ApexFlexStyle";
import { IApexChartFormatProps } from "../Charts/ChartTypes";
import ApexChartAxis from "./ApexChartAxis";
import ApexChartGrid from "./ApexChartGrid";

const ApexChartGridAxes = ({
  workflowProcess,
  updateParameterAction,
  chartType,
  apexChartGridData,
  apexChartAxesData,
  apexMultiAccordionsData,
}: IApexChartFormatProps & Partial<IApexChartFormatProps>) => {
  const apexAxesComponents = apexChartAxesData.map((obj, i) => (
    <ApexChartAxis
      key={i}
      {...obj}
      workflowProcess={workflowProcess}
      updateParameterAction={updateParameterAction}
      chartType={chartType}
    />
  ));

  const updatedAcordionsData = apexMultiAccordionsData.map((props, i) => ({
    ...props,
    content: apexAxesComponents[i],
  }));

  return (
    <ApexFlexStyle flexDirection="column">
      {apexChartGridData.map((obj, i) => {
        return (
          <ApexChartGrid
            key={i}
            {...obj}
            workflowProcess={workflowProcess}
            updateParameterAction={updateParameterAction}
            chartType={chartType}
          />
        );
      })}
      <AnalyticsComp
        title="Axes"
        direction="Vertical"
        containerStyle={{ marginTop: 30, width: "100%" }}
        content={
          <ApexMultiAccordions apexMultiAccordionsData={updatedAcordionsData} />
        }
      />
    </ApexFlexStyle>
  );
};

export default ApexChartGridAxes;
