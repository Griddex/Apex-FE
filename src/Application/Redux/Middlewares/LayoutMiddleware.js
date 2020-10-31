// import history from "../../Services/HistoryService";

export const LayoutMiddleware = (store) => (next) => (action) => {
  //handle logout success and failure?
  //Clean up localstorage
  if (action.type === "") {
    //TODO what are we intercepting here?
  }
  return next(action);
};
