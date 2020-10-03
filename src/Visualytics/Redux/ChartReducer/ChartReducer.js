import { PERSIST_CHARTINDEX } from "../ChartActions/ChartActions";
import chartState from "../ChartState/ChartState";

const chartReducer = (state = chartState, action) => {
  switch (action.type) {
    case PERSIST_CHARTINDEX:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return { ...state };
  }
};

export default chartReducer;
