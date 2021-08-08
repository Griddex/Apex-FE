import React from "react";
import ApexMultiAccordions from "../../../Application/Components/Accordions/ApexMultiAccordions";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { IApexChartFormatProps } from "../Charts/ChartTypes";
import ApexChartAxis from "./ApexChartAxis";
import ApexChartGrid from "./ApexChartGrid";

const ApexChartGridAxes = ({
  workflowCategory,
  workflowProcess,
  updateParameterAction,
  chartType,
  apexChartGridData,
  apexChartAxesData,
  apexMultiAccordionsData,
}: IApexChartFormatProps) => {
  const apexAxesComponents = apexChartAxesData.map((obj, i) => (
    <ApexChartAxis
      key={i}
      {...obj}
      workflowCategory={workflowCategory}
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
    <ApexFlexContainer flexDirection="column">
      {apexChartGridData.map((obj, i) => {
        return (
          <ApexChartGrid
            key={i}
            {...obj}
            workflowCategory={workflowCategory}
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
    </ApexFlexContainer>
  );
};

export default ApexChartGridAxes;
