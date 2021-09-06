import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import CartesianChartCategory from "./CartesianChartCategory";
import { IChartCategories } from "./ChartCategoryTypes";

const YChartCategory = ({
  categoryOptionTitle,
  updateAction,
  removeAction,
  disable,
}: IChartCategories) => {
  return (
    <CartesianChartCategory
      categoryTitle={"Y Category"}
      categoryOptionTitle={categoryOptionTitle}
      updateAction={updateAction}
      removeAction={removeAction}
      disable={disable}
    />
  );
};

export default YChartCategory;
