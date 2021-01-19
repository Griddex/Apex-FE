// import history from "../../Services/HistoryService";

import { Dispatch } from "redux";
import { IAction } from "../Actions/ActionTypes";

export const LayoutMiddleware = () => (next: Dispatch<IAction>) => (
  action: IAction
) => {
  //handle logout success and failure?
  //Clean up localstorage
  if (action.type === "") {
    //TODO what are we intercepting here?
  }
  return next(action);
};
