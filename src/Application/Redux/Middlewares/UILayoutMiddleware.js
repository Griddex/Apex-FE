import history from "./../../Services/HistoryService";

export const UILayoutMiddleware = (store) => (next) => (action) => {
  //handle logout success and failure?
  //Clean up localstorage
  if (action.type === "") {
  }
  return next(action);
};
