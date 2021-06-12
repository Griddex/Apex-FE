export const STOREDDATA_REQUEST = "STOREDDATA_REQUEST";
export const STOREDDATA_SUCCESS = "STOREDDATA_SUCCESS";
export const STOREDDATA_FAILURE = "STOREDDATA_FAILURE";

export const fetchStoredDataRequestAction = (projectId: string) => {
  return {
    type: STOREDDATA_REQUEST,
    payload: { projectId },
    meta: { showSpinner: true, message: "Loading project data..." },
  };
};

export const fetchStoredDataSuccessAction = () => {
  return {
    type: STOREDDATA_SUCCESS,
    payload: { facilitiesInputDeckStored: [], forecastInputDeckStored: [] },
  };
};

export const fetchStoredDataFailureAction = () => {
  return {
    type: STOREDDATA_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};
