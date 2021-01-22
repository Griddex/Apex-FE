import { combineReducers } from "redux";
import importReducer from "../../../Import/Redux/Reducers/ImportReducer";
import chartReducer from "../../../Visualytics/Redux/ChartReducer/ChartReducer";
import networkReducer from "../../../Network/Redux/Reducers/NetworkReducers";
import applicationReducer from "./ApplicationReducer";
import dialogsReducer from "./DialogsReducer";
import layoutReducer from "./LayoutReducer";
import loginReducer from "./LoginReducer";
import uiSpinnerReducer from "./UISpinnerReducer";
import workflowReducer from "./WorkflowReducer";
import economicsReducer from "../../../Economics/Redux/Reducers/EconomicsReducers";
import projectReducer from "../../../Project/Redux/Reducers/ProjectReducer";
import unitSettingsReducer from "../../../Settings/Redux/Reducers/UnitSettingsReducer";
import adminReducer from "../../../Administration/Redux/Reducers/AdminReducer";

const allReducers = combineReducers({
  loginReducer,
  layoutReducer,
  adminReducer,
  uiSpinnerReducer,
  dialogsReducer,
  workflowReducer,
  applicationReducer,
  importReducer,
  chartReducer,
  networkReducer,
  economicsReducer,
  projectReducer,
  unitSettingsReducer,
});
export default allReducers;

export type RootState = ReturnType<typeof allReducers>;
