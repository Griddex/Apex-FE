export const STORED_INPUTDECK_REQUEST = "STORED_INPUTDECK_REQUEST";
export const STORED_INPUTDECK_SUCCESS = "STORED_INPUTDECK_SUCCESS";
export const STORED_INPUTDECK_FAILURE = "STORED_INPUTDECK_FAILURE";

export const fetchStoredInputDeckRequestAction = (projectId: string) => {
  return {
    type: STORED_INPUTDECK_REQUEST,
    payload: { projectId },
    meta: { showSpinner: true, message: "Loading project data..." },
  };
};

export const fetchStoredInputDeckSuccessAction = () => {
  return {
    type: STORED_INPUTDECK_SUCCESS,
    payload: { facilitiesInputDeckStored: [], forecastInputDeckStored: [] },
  };
};

export const fetchStoredInputDeckFailureAction = () => {
  return {
    type: STORED_INPUTDECK_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};
