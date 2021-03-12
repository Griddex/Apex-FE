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
import watchGenerateNetworkBySelectionSaga from "../../../Network/Redux/Sagas/GenerateNetworkBySelectionSaga";
import watchUpdateForecastParametersSaga from "../../../Network/Redux/Sagas/UpdateForecastParametersSaga";
import watchSaveForecastSaga from "../../../Network/Redux/Sagas/SaveForecastSaga";
import watchGetForecastResultsSaga from "../../../Forecast/Redux/Sagas/GetForecastResultsSaga";
import watchFetchUserDetailsSaga from "../Sagas/FetchUserDetailsSaga";
import watchFetchExistingForecastingResultsSaga from "../../../Forecast/Redux/Sagas/FetchExistingForecastingResultsSaga";
import watchFetchTreeviewKeysSaga from "../../../Forecast/Redux/Sagas/FetchTreeviewKeysSaga";

function* rootSaga() {
  yield spawn(watchLoginSaga);
  yield spawn(watchRegisterSaga);
  yield spawn(watchConnectDatabaseSaga);
  yield spawn(watchCreateNewProjectSaga);
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
  yield spawn(watchGenerateNetworkBySelectionSaga);
  yield spawn(watchSaveForecastSaga);
  yield spawn(watchGetForecastResultsSaga);
  yield spawn(watchFetchUserDetailsSaga);
  yield spawn(watchFetchExistingForecastingResultsSaga);
  yield spawn(watchFetchTreeviewKeysSaga);
}

// function listenMongoDb() {
//   try {
//     mongoose.connect(
//       "mongodb+srv://apex:Yv10NPk7c2WmgKt4@syncware-cluster.a69fi.mongodb.net/apex-db?retryWrites=true&w=majority"
//     );

//     const db = mongoose.connection;
//     const taskCollection = db.collection("datastreams");
//     const changeStream = taskCollection.watch();
//     changeStream.on("change", (change) => {
//       console.log("Changes made to DataStream");
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

function listenWebsocket() {
  // const socket = new WebSocket()
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
    applyMiddleware(uiSpinnerMiddleware, authMiddleware, sagaMiddleware)
  )
);

// const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

// export { store, persistor };
// listenMongoDb();
export { store };
