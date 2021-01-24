import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import allReducers from "../Reducers/AllReducers";
import createSagaMiddleware from "redux-saga";
import watchLoginSaga from "../Sagas/LoginSaga";
import watchCreateNewProjectSaga from "../../../Project/Redux/Sagas/CreateNewProjectSaga";
import watchRegisterSaga from "../../../Administration/Redux/Sagas/RegisterSaga";
import watchConnectDatabaseSaga from "../../../Import/Redux/Sagas/ConnectDatabaseSaga";
import { spawn } from "redux-saga/effects";
import authMiddleware from "../Middlewares/AuthMiddleware";
import uiSpinnerMiddleware from "../Middlewares/UISpinnerMiddleware";
import watchRunForecastSaga from "../../../Network/Redux/Sagas/RunForecastSaga";
import rootReducer from "../Reducers/RootReducer";
import watchFetchRecentProjectsSaga from "../../../Project/Redux/Sagas/FetchRecentProjectsSaga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import watchOpenRecentProjectSaga from "../../../Project/Redux/Sagas/OpenRecentProjectSaga";

function* rootSaga() {
  yield spawn(watchLoginSaga);
  yield spawn(watchRegisterSaga);
  yield spawn(watchConnectDatabaseSaga);
  yield spawn(watchRunForecastSaga);
  yield spawn(watchCreateNewProjectSaga);
  yield spawn(watchFetchRecentProjectsSaga);
  yield spawn(watchOpenRecentProjectSaga);
}

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  // configuration object for redux-persist
  key: "root",
  storage, // define which storage to use
};
const persistedRootReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedRootReducer,
  composeWithDevTools(
    applyMiddleware(uiSpinnerMiddleware, authMiddleware, sagaMiddleware)
  )
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
