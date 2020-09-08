import { combineReducers } from "redux";
import layoutReducer from "./LayoutReducer";
import loginReducer from "./LoginReducer";
import snackbarReducer from "./SnackbarReducer";
import uiSpinnerReducer from "./UISpinnerReducer";
import importReducer from "./../../../Import/Redux/Reducers/ImportReducer";
import dialogsReducer from "./DialogsReducer";
import workflowReducer from "./WorkflowReducer";
import applicationReducer from "./ApplicationReducer";

const rootReducer = combineReducers({
  loginReducer,
  layoutReducer,
  uiSpinnerReducer,
  dialogsReducer,
  snackbarReducer,
  workflowReducer,
  applicationReducer,
  importReducer,
});
export default rootReducer;
