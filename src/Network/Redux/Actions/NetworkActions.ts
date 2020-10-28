export const SET_CURRENTELEMENT = "SET_CURRENTELEMENT";

export const setCurrentElementAction = (currentElement: {}) => {
  return {
    type: SET_CURRENTELEMENT,
    payload: {
      currentElement,
    },
  };
};
