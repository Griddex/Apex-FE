import React from "react";
import { IDragItem } from "../../Visualytics/Components/ChartCategories/ChartCategoryTypes";

export interface IUseDroppedIds {
  categoryDragItems: Record<string, Record<string, IDragItem>>;
  drgItems: string[];
}

const useDroppedIds = ({ categoryDragItems, drgItems }: IUseDroppedIds) => {
  const droppedIds = React.useMemo(() => {
    const allIds = [];
    const categories = Object.keys(categoryDragItems);

    for (const category of categories) {
      const categoryObj = categoryDragItems[category];
      const ids = Object.keys(categoryObj);

      allIds.push(...ids);
    }

    return allIds;
  }, [drgItems.join()]);

  return droppedIds;
};

export default useDroppedIds;
