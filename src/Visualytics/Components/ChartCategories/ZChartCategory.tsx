import React from "react";
import CartesianChartCategory from "./CartesianChartCategory";
import { IChartCategories } from "./ChartCategoryTypes";

const ZChartCategory = ({
  categoryOptionTitle,
  updateAction,
  removeAction,
  disable,
}: IChartCategories) => {
  return (
    <CartesianChartCategory
      categoryTitle={"Z Category"}
      categoryOptionTitle={categoryOptionTitle}
      updateAction={updateAction}
      removeAction={removeAction}
      disable={disable}
    />
  );
};

export default ZChartCategory;
