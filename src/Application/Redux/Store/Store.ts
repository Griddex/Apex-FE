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
import watchFetchExistingDataSaga from "../../../Import/Redux/Sagas/FetchExistingDataSaga";
import watchSaveInputDeckSaga from "../../../Import/Redux/Sagas/SaveInputDeckSaga";
import watchAutogenerateNetworkSaga from "../../../Network/Redux/Sagas/AutogenerateNetworkSaga";
import watchSaveForecastParametersSaga from "../../../Network/Redux/Sagas/SaveForecastParametersSaga";
import watchSaveNetworkSaga from "../../../Network/Redux/Sagas/SaveNetworkSaga";
import watchFetchUnitSettingsSaga from "../../../Settings/Redux/Sagas/Sagas/UnitSettingsSaga";
import watchFetchApplicationHeadersSaga from "../../../Import/Redux/Sagas/FetchApplicationHeadersSaga";
import watchAndSaveAutogenerateNetworkSaga from "../../../Network/Redux/Sagas/SaveAndAutogenerateNetworkSaga";
import watchFetchExistingForecastParametersSaga from "../../../Network/Redux/Sagas/FetchExistingForecastParametersSaga";
import watchFetchExistingNetworkDataSaga from "../../../Network/Redux/Sagas/FetchExistingNetworkDataSaga";
import watchUpdateForecastParametersSaga from "../../../Network/Redux/Sagas/UpdateForecastParametersSaga";
import watchSaveForecastSaga from "../../../Network/Redux/Sagas/SaveForecastSaga";
import watchGetForecastResultsSaga from "../../../Forecast/Redux/Sagas/GetForecastResultsSaga";
import watchFetchUserDetailsSaga from "../Sagas/FetchUserDetailsSaga";
import watchFetchExistingForecastingResultsSaga from "../../../Forecast/Redux/Sagas/FetchExistingForecastingResultsSaga";
import watchFetchTreeviewKeysSaga from "../../../Forecast/Redux/Sagas/FetchTreeviewKeysSaga";
import watchFetchExistingProjectsSaga from "../../../Project/Redux/Sagas/FetchExistingProjectsSaga";
import watchDisplayNetworkBySelectionSaga from "../../../Network/Redux/Sagas/DisplayNetworkBySelectionSaga";

function* rootSaga() {
  yield spawn(watchLoginSaga);
  yield spawn(watchRegisterSaga);
  yield spawn(watchConnectDatabaseSaga);
  yield spawn(watchCreateNewProjectSaga);
  yield spawn(watchFetchExistingProjectsSaga);
  yield spawn(watchFetchRecentProjectsSaga);
  yield spawn(watchFetchUnitSettingsSaga);
  yield spawn(watchOpenRecentProjectSaga);
  yield spawn(watchFetchExistingDataSaga);
  yield spawn(watchSaveInputDeckSaga);
  yield spawn(watchAutogenerateNetworkSaga);
  yield spawn(watchAndSaveAutogenerateNetworkSaga);
  yield spawn(watchRunForecastSaga);
  yield spawn(watchSaveForecastParametersSaga);
  yield spawn(watchUpdateForecastParametersSaga);
  yield spawn(watchSaveNetworkSaga);
  yield spawn(watchFetchApplicationHeadersSaga);
  yield spawn(watchFetchExistingNetworkDataSaga);
  yield spawn(watchFetchExistingForecastParametersSaga);
  yield spawn(watchDisplayNetworkBySelectionSaga);
  yield spawn(watchSaveForecastSaga);
  yield spawn(watchGetForecastResultsSaga);
  yield spawn(watchFetchUserDetailsSaga);
  yield spawn(watchFetchExistingForecastingResultsSaga);
  yield spawn(watchFetchTreeviewKeysSaga);
}

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  // configuration object for redux-persist
  key: "root",
  storage, // define which storage to use
};
// const persistedRootReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  rootReducer,
  composeWithDevTools(
    // applyMiddleware(uiSpinnerMiddleware, authMiddleware, sagaMiddleware)
    applyMiddleware(authMiddleware, sagaMiddleware)
  )
);

// const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

// export { store, persistor };
// listenMongoDb();
export { store };
