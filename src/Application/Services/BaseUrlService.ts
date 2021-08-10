export const getBaseAuthUrl = () => {
  return "http://localhost:5017/api/auth";
};

export const getBaseUnitUrl = () => {
  return "http://localhost:5017/api/unit-system";
};

export const getBaseEconomicsUrl = () => {
  return "http://localhost:5016/api/economics";
};

const getBaseForecastUrl = () => {
  return "http://localhost:5015/api/forecast";
};

export default getBaseForecastUrl;
