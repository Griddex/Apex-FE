import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import CartesianChartCategory from "./CartesianChartCategory";
import { IChartCategories } from "./ChartCategoryTypes";

const YChartCategory = ({
  categoryOptionTitle,
  updateAction,
  removeAction,
  disable,
  showCategoryMembersSwitch,
  showCategoryMembersObj,
  path,
  updateParameterAction,
}: IChartCategories) => {
  return (
    <CartesianChartCategory
      categoryTitle={"Y Category"}
      categoryOptionTitle={categoryOptionTitle}
      updateAction={updateAction}
      removeAction={removeAction}
      disable={disable}
      showCategoryMembersSwitch={showCategoryMembersSwitch}
      showCategoryMembersObj={showCategoryMembersObj}
      path={path}
      updateParameterAction={updateParameterAction}
    />
  );
};

export default YChartCategory;
