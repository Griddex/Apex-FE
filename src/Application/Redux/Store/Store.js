import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./../Reducers/RootReducer";
import createSagaMiddleware from "redux-saga";
import watchLoginSaga from "../Sagas/LoginSaga";
import watchNewProjectSaga from "../../../Project/Redux/Sagas/NewProjectSaga";
import watchRegisterSaga from "../Sagas/RegisterSaga";
import watchConnectDatabaseSaga from "../../../Import/Redux/Sagas/connectDatabaseSaga";
import { spawn } from "redux-saga/effects";
import authMiddleware from "./../Middlewares/AuthMiddleware";
import uiSpinnerMiddleware from "./../Middlewares/UISpinnerMiddleware";
import watchRunForecastSaga from "../../../Network/Redux/Sagas/RunForecastSaga";

function* rootSaga() {
  yield spawn(watchLoginSaga);
  yield spawn(watchRegisterSaga);
  yield spawn(watchConnectDatabaseSaga);
  yield spawn(watchRunForecastSaga);
  yield spawn(watchNewProjectSaga);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(uiSpinnerMiddleware, authMiddleware, sagaMiddleware)
  )
);

sagaMiddleware.run(rootSaga);

export default store;
