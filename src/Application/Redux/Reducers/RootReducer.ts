import { combineReducers } from "redux";
import importReducer from "../../../Import/Redux/Reducers/ImportReducer";
import chartReducer from "../../../Visualytics/Redux/ChartReducer/ChartReducer";
import networkReducer from "./../../../Network/Redux/Reducers/NetworkReducers";
import applicationReducer from "./ApplicationReducer";
import dialogsReducer from "./DialogsReducer";
import layoutReducer from "./LayoutReducer";
import loginReducer from "./LoginReducer";
import uiSpinnerReducer from "./UISpinnerReducer";
import workflowReducer from "./WorkflowReducer";

const rootReducer = combineReducers({
  loginReducer,
  layoutReducer,
  uiSpinnerReducer,
  dialogsReducer,
  workflowReducer,
  applicationReducer,
  importReducer,
  chartReducer,
  networkReducer,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
