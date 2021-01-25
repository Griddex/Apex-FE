export const RUN_FORECAST_REQUEST = "RUN_FORECAST_REQUEST";
export const RUN_FORECAST_SUCCESS = "RUN_FORECAST_SUCCESS";
export const RUN_FORECAST_FAILURE = "RUN_FORECAST_FAILURE";
export const SAVE_FORECASTPARAMETERS_REQUEST =
  "SAVE_FORECASTPARAMETERS_REQUEST";
export const SAVE_FORECASTPARAMETERS_SUCCESS =
  "SAVE_FORECASTPARAMETERS_SUCCESS";
export const SAVE_FORECASTPARAMETERS_FAILURE =
  "SAVE_FORECASTPARAMETERS_FAILURE";
export const PERSIST_FORECASTPARAMETERS = "PERSIST_FORECASTPARAMETERS";

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
      statusCode: 0,
      data: [],
    },
  };
};

export const runForecastFailureAction = () => {
  return {
    type: RUN_FORECAST_FAILURE,
    payload: {
      statusCode: 0,
      errors: { message: "" },
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
      statusCode: 0,
      data: [],
    },
  };
};

export const saveForecastParametersFailureAction = () => {
  return {
    type: SAVE_FORECASTPARAMETERS_FAILURE,
    payload: {
      statusCode: 0,
      errors: { message: "" },
    },
  };
};

export const persistForecastParametersAction = (
  payload: Record<string, React.Key | Date>
) => {
  return {
    type: PERSIST_FORECASTPARAMETERS,
    payload: { ...payload },
    meta: { showSpinner: true, message: "" },
  };
};
