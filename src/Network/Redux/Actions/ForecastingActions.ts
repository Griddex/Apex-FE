export const RUN_FORECAST_REQUEST = "RUN_FORECAST_REQUEST";
export const RUN_FORECAST_SUCCESS = "RUN_FORECAST_SUCCESS";
export const RUN_FORECAST_FAILURE = "RUN_FORECAST_FAILURE";
export const SAVE_FORECASTPARAMETERS_REQUEST =
  "SAVE_FORECASTPARAMETERS_REQUEST";
export const SAVE_FORECASTPARAMETERS_SUCCESS =
  "SAVE_FORECASTPARAMETERS_SUCCESS";
export const SAVE_FORECASTPARAMETERS_FAILURE =
  "SAVE_FORECASTPARAMETERS_FAILURE";
export const ADD_FORECASTPARAMETERS_REQUEST = "ADD_FORECASTPARAMETERS_REQUEST";
export const ADD_FORECASTPARAMETERS_SUCCESS = "ADD_FORECASTPARAMETERS_SUCCESS";
export const ADD_FORECASTPARAMETERS_FAILURE = "ADD_FORECASTPARAMETERS_FAILURE";

export const runForecastRequestAction = () => {
  return {
    type: RUN_FORECAST_REQUEST,
    meta: { showSpinner: true, message: "Running forecast..." },
  };
};

export const runForecastSuccessAction = () => {
  return {
    type: RUN_FORECAST_SUCCESS,
    payload: {
      statusCode: "",
      result: "",
    },
  };
};

export const runForecastFailureAction = () => {
  return {
    type: RUN_FORECAST_FAILURE,
    payload: {
      statusCode: "",
      errors: [],
    },
  };
};

export const saveForecastParametersRequestAction = () => {
  return {
    type: SAVE_FORECASTPARAMETERS_REQUEST,
    meta: { showSpinner: true, message: "Saving forecast..." },
  };
};

export const saveForecastParametersSuccessAction = () => {
  return {
    type: SAVE_FORECASTPARAMETERS_SUCCESS,
    payload: {
      statusCode: "",
      result: "",
    },
  };
};

export const saveForecastParametersFailureAction = () => {
  return {
    type: SAVE_FORECASTPARAMETERS_FAILURE,
    payload: {
      statusCode: "",
      errors: [],
    },
  };
};

export const addForecastParametersRequestAction = () => {
  return {
    type: ADD_FORECASTPARAMETERS_REQUEST,
    meta: { showSpinner: true, message: "Saving forecast..." },
  };
};

export const addForecastParametersSuccessAction = () => {
  return {
    type: ADD_FORECASTPARAMETERS_SUCCESS,
    payload: {
      statusCode: "",
      result: "",
    },
  };
};

export const addForecastParametersFailureAction = () => {
  return {
    type: ADD_FORECASTPARAMETERS_FAILURE,
    payload: {
      statusCode: "",
      errors: [],
    },
  };
};
