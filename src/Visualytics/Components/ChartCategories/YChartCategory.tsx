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
  categoryDragItem,
  categoryDropped,
  categoryDragItemsTitle,
  categoryHasDroppedTitle,
  resultsTitle,
}: IChartCategories) => {
  return (
    <CartesianChartCategory
      categoryTitle={
        categoryOptionTitle?.includes("Secondary")
          ? "Y Secondary Category"
          : "Y Primary Category"
      }
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
      categoryDragItemsTitle={categoryDragItemsTitle}
      categoryHasDroppedTitle={categoryHasDroppedTitle}
      resultsTitle={resultsTitle}
    />
  );
};

export default YChartCategory;
