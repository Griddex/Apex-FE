export const PERSIST_NETWORKELEMENTS = "PERSIST_NETWORKELEMENTS";

export const persistNetworkElementsAction = (networkElements) => {
  return {
    type: PERSIST_NETWORKELEMENTS,
    payload: {
      networkElements,
    },
    meta: { showSpinner: false, message: "Persisting to store..." },
  };
};
