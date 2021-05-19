import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexFlexStyle from "../../../Application/Components/Styles/ApexFlexStyle";
import { IChartCategoriesData } from "../../../Economics/Routes/EconomicsResults/EconomicsSensitivitiesHeatMap/SensitivitiesHeatMapVisualytics";
import ChartCategory from "./ChartCategory";

const ChartCategories = ({
  ChartCategoriesData,
}: {
  ChartCategoriesData: IChartCategoriesData;
}) => {
  return (
    <ApexFlexStyle flexDirection="column" width={300}>
      {ChartCategoriesData.map((props, i) => (
        <ChartCategory key={i} {...props} />
      ))}
    </ApexFlexStyle>
  );
};

export default ChartCategories;
