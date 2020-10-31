import { FlowElement } from "react-flow-renderer";

export const SET_CURRENTELEMENT = "SET_CURRENTELEMENT";

export const setCurrentElementAction = (currentElement: FlowElement) => {
  return {
    type: SET_CURRENTELEMENT,
    payload: {
      currentElement,
    },
  };
};
