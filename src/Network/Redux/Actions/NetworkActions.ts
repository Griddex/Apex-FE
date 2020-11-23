import { FlowElement } from "@griddex/react-flow-updated";

export const SET_CURRENTELEMENT = "SET_CURRENTELEMENT";
export const PERSIST_NETWORKELEMENTS = "PERSIST_NETWORKELEMENTS";
export const PERSIST_EDGEELEMENTS = "PERSIST_EDGEELEMENTS";

export const setCurrentElementAction = (currentElement: FlowElement) => {
  return {
    type: SET_CURRENTELEMENT,
    payload: {
      currentElement,
    },
  };
};

export const persistNetworkElementsAction = (
  nodeElements: FlowElement[],
  edgeElements: FlowElement[]
) => {
  return {
    type: PERSIST_NETWORKELEMENTS,
    payload: {
      nodeElements,
      edgeElements,
    },
    meta: { showSpinner: false, message: "Persisting to store..." },
  };
};
