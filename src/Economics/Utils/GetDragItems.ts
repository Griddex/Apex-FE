import { IDragItem } from "../../Visualytics/Components/ChartCategories/ChartCategoryTypes";

const getDragItems = (
  categoryDragItems: Record<string, Record<string, IDragItem>>
) => {
  return Object.values(categoryDragItems).reduce(
    (acc: string[], item: Record<string, IDragItem>) => {
      const categoryObjs = Object.values(item);
      const categoryNames = categoryObjs.map((o) => o?.name);

      return [...acc, ...categoryNames];
    },
    []
  );
};

export default getDragItems;
