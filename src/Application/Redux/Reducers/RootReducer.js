import { combineReducers } from "redux";
import layoutReducer from "./LayoutReducer";
import loginReducer from "./LoginReducer";
import uiSpinnerReducer from "./UISpinnerReducer";
import importReducer from "./../../../Import/Redux/Reducers/ImportReducer";
import dialogsReducer from "./DialogsReducer";
import workflowReducer from "./WorkflowReducer";
import applicationReducer from "./ApplicationReducer";
import chartReducer from "./../../../Visualytics/Redux/ChartReducer/ChartReducer";

const rootReducer = combineReducers({
  loginReducer,
  layoutReducer,
  uiSpinnerReducer,
  dialogsReducer,
  workflowReducer,
  applicationReducer,
  importReducer,
  chartReducer,
});
export default rootReducer;
