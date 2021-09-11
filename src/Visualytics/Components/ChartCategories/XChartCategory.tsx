import React from "react";
import CartesianChartCategory from "./CartesianChartCategory";
import { IChartCategories } from "./ChartCategoryTypes";

const XChartCategory = ({
  categoryOptionTitle,
  updateAction,
  removeAction,
  disable,
  showCategoryMembersSwitch,
  showCategoryMembersObj,
  path,
  updateParameterAction,
  categoryDragItem,
  categoryDropped,
}: IChartCategories) => {
  return (
    <CartesianChartCategory
      categoryTitle={"X Category"}
      categoryOptionTitle={categoryOptionTitle}
      updateAction={updateAction}
      removeAction={removeAction}
      disable={disable}
      showCategoryMembersSwitch={showCategoryMembersSwitch}
      showCategoryMembersObj={showCategoryMembersObj}
      path={path}
      updateParameterAction={updateParameterAction}
      categoryDragItem={categoryDragItem}
      categoryDropped={categoryDropped}
    />
  );
};
export default XChartCategory;
