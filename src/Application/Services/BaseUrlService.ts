export const getBaseAuthUrl = () => {
  return "https://apex.syncware.io/auth";
  // return "http://localhost:5017/api/auth";
};

export const getBaseUnitUrl = () => {
  return "https://apex.syncware.io/units";
  // return "http://localhost:5017/api/unit-system";
};

export const getBaseEconomicsUrl = () => {
  return "https://apex.syncware.io/economics";
  // return "http://localhost:5016/api/economics";
};

const getBaseForecastUrl = () => {
  return "https://apex.syncware.io/forecast";
  // return "http://localhost:5015/api/forecast";
};

export default getBaseForecastUrl;
