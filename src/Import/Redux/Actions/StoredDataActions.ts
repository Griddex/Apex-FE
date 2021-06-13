export const STORED_DATA_REQUEST = "STORED_DATA_REQUEST";
export const STORED_DATA_SUCCESS = "STORED_DATA_SUCCESS";
export const STORED_DATA_FAILURE = "STORED_DATA_FAILURE";

export const fetchStoredDataRequestAction = (projectId: string) => {
  return {
    type: STORED_DATA_REQUEST,
    payload: { projectId },
    meta: { showSpinner: true, message: "Loading project data..." },
  };
};

export const fetchStoredDataSuccessAction = () => {
  return {
    type: STORED_DATA_SUCCESS,
    payload: { facilitiesInputDeckStored: [], forecastInputDeckStored: [] },
  };
};

export const fetchStoredDataFailureAction = () => {
  return {
    type: STORED_DATA_FAILURE,
    payload: {
      status: 0,
      errors: { message: "" },
    },
  };
};
