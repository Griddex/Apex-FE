export const EXISTINGDATA_REQUEST = "EXISTINGDATA_REQUEST";
export const EXISTINGDATA_SUCCESS = "EXISTINGDATA_SUCCESS";
export const EXISTINGDATA_FAILURE = "EXISTINGDATA_FAILURE";

export const fetchExistingDataRequestAction = (
  dataType: string,
  userId: string
) => {
  return {
    type: EXISTINGDATA_REQUEST,
    payload: {
      dataType,
      userId,
    },
    meta: { showSpinner: true, message: "Loading table..." },
  };
};

export const fetchExistingDataSuccessAction = () => {
  return {
    type: EXISTINGDATA_SUCCESS,
    payload: {
      statusCode: 0,
      existingData: [],
    },
  };
};

export const fetchExistingDataFailureAction = () => {
  return {
    type: EXISTINGDATA_FAILURE,
    payload: {
      statusCode: 0,
      errors: [],
    },
  };
};
