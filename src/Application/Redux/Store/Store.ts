import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import allReducers from "../Reducers/AllReducers";
import createSagaMiddleware from "redux-saga";
import watchLoginSaga from "../Sagas/LoginSaga";
import watchCreateNewProjectSaga from "../../../Project/Redux/Sagas/CreateNewProjectSaga";
import watchRegisterSaga from "../../../Administration/Redux/Sagas/RegisterSaga";
import watchConnectDatabaseSaga from "../../../Import/Redux/Sagas/connectDatabaseSaga";
import { spawn } from "redux-saga/effects";
import authMiddleware from "../Middlewares/AuthMiddleware";
import uiSpinnerMiddleware from "../Middlewares/UISpinnerMiddleware";
import watchRunForecastSaga from "../../../Network/Redux/Sagas/RunForecastSaga";
import rootReducer from "../Reducers/RootReducer";
import watchFetchRecentProjectsSaga from "../../../Project/Redux/Sagas/FetchRecentProjectsSaga";

function* rootSaga() {
  yield spawn(watchLoginSaga);
  yield spawn(watchRegisterSaga);
  yield spawn(watchConnectDatabaseSaga);
  yield spawn(watchRunForecastSaga);
  yield spawn(watchCreateNewProjectSaga);
  yield spawn(watchFetchRecentProjectsSaga);
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
