import React from "react";
import CartesianChartCategory from "./CartesianChartCategory";
import { IChartCategories } from "./ChartCategoryTypes";

const XChartCategory = ({
  chartStory,
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
      chartStory={chartStory}
      chartType={chartType}
      reducer={reducer}
      categoryTitle={"X Category"}
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
export default React.memo(XChartCategory);
