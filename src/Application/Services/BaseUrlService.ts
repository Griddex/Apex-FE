export const getBaseAuthUrl = () => {
  // return "https://apex.syncware.io/auth";
  // return "http://0ed11b49334b.ngrok.io/api/forecast";
  // return "https://dev.syncware.io/auth";

  return "http://localhost:5015/api/forecast";
};

export const getBaseUnitUrl = () => {
  // return "https://apex.syncware.io/auth";
  // return "http://0ed11b49334b.ngrok.io/api/forecast";
  // return "https://dev.syncware.io/auth";

  return "http://localhost:5017/api/unit-system";
};

export const getBaseEconomicsUrl = () => {
  // return "https://apex.syncware.io/auth";
  // return "http://0ed11b49334b.ngrok.io/api/forecast";
  // return "https://dev.syncware.io/auth";

  return "http://localhost:5016/api/economics";
};

const getBaseForecastUrl = () => {
  // return "https://apex.syncware.io/forecast";
  // return "http://0ed11b49334b.ngrok.io/api/forecast";
  // return "https://dev.syncware.io/forecast";

  return "http://localhost:5015/api/forecast";
};

export default getBaseForecastUrl;
