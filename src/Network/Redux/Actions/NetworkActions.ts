import { FlowElement } from "@griddex/react-flow-updated";

export const SET_CURRENTELEMENT = "SET_CURRENTELEMENT";

export const setCurrentElementAction = (currentElement: FlowElement) => {
  return {
    type: SET_CURRENTELEMENT,
    payload: {
      currentElement,
    },
  };
};
