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
  apexChartGridData,
  apexChartAxesData,
  apexMultiAccordionsData,
}: IApexChartFormatProps & Partial<IApexChartFormatProps>) => {
  const apexAxesComponents = apexChartAxesData.map((obj, i) => (
    <ApexChartAxis
      key={i}
      {...obj}
      updateParameterAction={updateParameterAction}
      workflowProcess={workflowProcess}
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
            updateParameterAction={updateParameterAction}
            workflowProcess={workflowProcess}
          />
        );
      })}
      <AnalyticsComp
        title="Axes"
        direction="Vertical"
        containerStyle={{ marginTop: 30 }}
        content={
          <ApexMultiAccordions apexMultiAccordionsData={updatedAcordionsData} />
        }
      />
    </ApexFlexStyle>
  );
};

export default ApexChartGridAxes;
