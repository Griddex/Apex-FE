import { combineReducers } from "redux";
import layoutReducer from "./LayoutReducer";
import loginReducer from "./LoginReducer";
import snackbarReducer from "./SnackbarReducer";
import uiSpinnerReducer from "./UISpinnerReducer";
import importReducer from "./../../../Import/Redux/Reducers/ImportReducer";
import dialogsReducer from "./DialogsReducer";

const rootReducer = combineReducers({
  loginReducer,
  layoutReducer,
  uiSpinnerReducer,
  dialogsReducer,
  snackbarReducer,
  importReducer,
});
export default rootReducer;
