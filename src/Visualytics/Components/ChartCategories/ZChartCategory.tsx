import React from "react";
import CartesianChartCategory from "./CartesianChartCategory";
import { IChartCategories } from "./ChartCategoryTypes";

const ZChartCategory = ({
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
  showCategoryZMembers,
}: IChartCategories) => {
  return (
    <CartesianChartCategory
      chartStory={chartStory}
      chartType={chartType}
      reducer={reducer}
      categoryTitle={"Z Category"}
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
      showCategoryZMembers={showCategoryZMembers}
    />
  );
};

export default React.memo(ZChartCategory);
