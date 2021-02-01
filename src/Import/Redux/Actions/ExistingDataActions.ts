import { IExistingDataProps } from "../../../Application/Types/ApplicationTypes";

export const EXISTINGDATA_REQUEST = "EXISTINGDATA_REQUEST";
export const EXISTINGDATA_SUCCESS = "EXISTINGDATA_SUCCESS";
export const EXISTINGDATA_FAILURE = "EXISTINGDATA_FAILURE";

export const fetchExistingDataRequestAction = (projectId: string) => {
  return {
    type: EXISTINGDATA_REQUEST,
    payload: { projectId },
    meta: { showSpinner: true, message: "Loading project data..." },
  };
};

export const fetchExistingDataSuccessAction = () => {
  return {
    type: EXISTINGDATA_SUCCESS,
    payload: { facilitiesInputDeckExisting: [], forecastInputDeckExisting: [] },
  };
};

export const fetchExistingDataFailureAction = () => {
  return {
    type: EXISTINGDATA_FAILURE,
    payload: {
      statusCode: 0,
      errors: { message: "" },
    },
  };
};
