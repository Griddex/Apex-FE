export const SELECT_FORECASTRUN = "SELECT_FORECASTRUN";

export const selectForecastRunAction = (forecastRun: string) => {
  return {
    type: SELECT_FORECASTRUN,
    payload: {
      forecastRun,
    },
  };
};
