export const PERSIST_CHARTINDEX = "PERSIST_CHARTINDEX";
export const PERSIST_CHARTITEM = "PERSIST_CHARTITEM";

export const persistChartIndexAction = (currentChartIndex) => {
  return {
    type: PERSIST_CHARTINDEX,
    payload: {
      currentChartIndex,
    },
  };
};

export const persistChartItemAction = (currentChartItem) => {
  return {
    type: PERSIST_CHARTITEM,
    payload: {
      currentChartItem,
    },
  };
};
