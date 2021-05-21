import React from "react";
import ApexFlexStyle from "../../../Application/Components/Styles/ApexFlexStyle";
import ChartCategory from "./ChartCategory";
import { IChartCategoriesData } from "./ChartCategoryTypes";

const ChartCategories = ({
  categoriesTitle,
  ChartCategoriesData,
}: IChartCategoriesData) => {
  return (
    <ApexFlexStyle flexDirection="column" width={300}>
      <label>{categoriesTitle}</label>
      {ChartCategoriesData.map((props, i) => (
        <ChartCategory key={i} {...props} />
      ))}
    </ApexFlexStyle>
  );
};

export default ChartCategories;
