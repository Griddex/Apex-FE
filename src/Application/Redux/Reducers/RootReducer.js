import { combineReducers } from "redux";
import layoutReducer from "./LayoutReducer";
import loginReducer from "./LoginReducer";
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
  workflowReducer,
  applicationReducer,
  importReducer,
});
export default rootReducer;
