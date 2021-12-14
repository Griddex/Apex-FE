import React from "react";
import CartesianChartCategory from "./CartesianChartCategory";
import { IChartCategories } from "./ChartCategoryTypes";

const YChartCategory = ({
  chartType,
  reducer,
  categoryOptionTitle,
  updateAction,
  removeAction,
  disable,
  showCategoryMembersSwitch,
  showCategoryMembersObj,
  devScenariosTitle,
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
      categoryTitle={
        categoryOptionTitle?.includes("Secondary")
          ? "Y Secondary Category"
          : "Y Category"
      }
      categoryOptionTitle={categoryOptionTitle}
      updateAction={updateAction}
      removeAction={removeAction}
      disable={disable}
      showCategoryMembersSwitch={showCategoryMembersSwitch}
      showCategoryMembersObj={showCategoryMembersObj}
      devScenariosTitle={devScenariosTitle}
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

export default React.memo(YChartCategory);
