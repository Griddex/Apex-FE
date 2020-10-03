export const PERSIST_CHARTINDEX = "PERSIST_CHARTINDEX";

export const persistChartIndexAction = (currentChartIndex) => {
  return {
    type: PERSIST_CHARTINDEX,
    payload: {
      currentChartIndex,
    },
  };
};
