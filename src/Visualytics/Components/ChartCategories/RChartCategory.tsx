import React from "react";
import CartesianChartCategory from "./CartesianChartCategory";
import { IChartCategories } from "./ChartCategoryTypes";

const RChartCategory = ({
  chartType,
  reducer,
  categoryOptionTitle,
  updateAction,
  removeAction,
  disable,
  showCategoryMembersSwitch,
  showCategoryMembersObj,
  path,
  updateParameterAction,
  updateDragItemsAction,
  updateHasDroppedAction,
  categoryDragItem,
  categoryDropped,
  categoryDragItemsTitle,
  categoryHasDroppedTitle,
  resultsTitle,
}: IChartCategories) => {
  return (
    <CartesianChartCategory
      chartType={chartType}
      reducer={reducer}
      categoryTitle={"R Category"}
      categoryOptionTitle={categoryOptionTitle}
      updateAction={updateAction}
      removeAction={removeAction}
      disable={disable}
      showCategoryMembersSwitch={showCategoryMembersSwitch}
      showCategoryMembersObj={showCategoryMembersObj}
      path={path}
      updateParameterAction={updateParameterAction}
      updateDragItemsAction={updateDragItemsAction}
      updateHasDroppedAction={updateHasDroppedAction}
      categoryDragItem={categoryDragItem}
      categoryDropped={categoryDropped}
      categoryDragItemsTitle={categoryDragItemsTitle}
      categoryHasDroppedTitle={categoryHasDroppedTitle}
      resultsTitle={resultsTitle}
    />
  );
};

export default RChartCategory;
