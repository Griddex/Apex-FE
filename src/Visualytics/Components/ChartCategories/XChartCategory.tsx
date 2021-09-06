import React from "react";
import CartesianChartCategory from "./CartesianChartCategory";
import { IChartCategories } from "./ChartCategoryTypes";

const XChartCategory = ({
  categoryOptionTitle,
  updateAction,
  removeAction,
  disable,
}: IChartCategories) => {
  return (
    <CartesianChartCategory
      categoryTitle={"X Category"}
      categoryOptionTitle={categoryOptionTitle}
      updateAction={updateAction}
      removeAction={removeAction}
      disable={disable}
    />
  );
};
export default XChartCategory;
