import {
  PERSIST_CHARTINDEX,
  PERSIST_CHARTITEM,
} from "../ChartActions/ChartActions";
import chartState from "../ChartState/ChartState";

const chartReducer = (state = chartState, action) => {
  switch (action.type) {
    case PERSIST_CHARTINDEX:
      return {
        ...state,
        ...action.payload,
      };

    case PERSIST_CHARTITEM:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return { ...state };
  }
};

export default chartReducer;
