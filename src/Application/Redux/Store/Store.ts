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
import watchFetchExistingNetworkDataSaga from "../../../Network/Redux/Sagas/FetchExistingNetworkDataSaga";
import watchUpdateForecastParametersSaga from "../../../Network/Redux/Sagas/UpdateForecastParametersSaga";
import watchSaveForecastSaga from "../../../Network/Redux/Sagas/SaveForecastSaga";
import watchFetchUserDetailsSaga from "../Sagas/FetchUserDetailsSaga";
import watchFetchExistingForecastingResultsSaga from "../../../Forecast/Redux/Sagas/FetchExistingForecastingResultsSaga";
import watchFetchTreeviewKeysSaga from "../../../Forecast/Redux/Sagas/FetchTreeviewKeysSaga";
import watchFetchExistingProjectsSaga from "../../../Project/Redux/Sagas/FetchExistingProjectsSaga";
import watchDisplayNetworkBySelectionSaga from "../../../Network/Redux/Sagas/DisplayNetworkBySelectionSaga";
import watchFetchMatchObjectSaga from "../Sagas/FetchMatchObjectSaga";
import watchGetSelectedForecastDataByIdSaga from "../../../Forecast/Redux/Sagas/GetSelectedForecastDataByIdSaga";
import watchGetForecastResultsChartDataSaga from "../../../Forecast/Redux/Sagas/GetForecastResultsChartDataSaga";
import watchSaveEconomicsParametersSaga from "../../../Economics/Redux/Sagas/SaveEconomicsParametersSaga";
import watchSaveCostsRevenuesSaga from "../../../Economics/Redux/Sagas/SaveCostsRevenuesSaga";
import watchFetchExistingEconomicsDataSaga from "../../../Economics/Redux/Sagas/FetchExistingEconomicsDataSaga";
import watchFetchExistingEconomicsSensitivitiesSaga from "../../../Economics/Redux/Sagas/FetchExistingEconomicsSensitivitiesSaga";
import watchGetEconomicsSensitivitiesByIdSaga from "../../../Economics/Redux/Sagas/GetEconomicsSensitivitiesByIdSaga";
import watchSaveEconomicsSensitivitiesSaga from "../../../Economics/Redux/Sagas/SaveEconomicsSensitivitiesSaga";
import watchRunEconomicsAnalysisSaga from "../../../Economics/Redux/Sagas/RunEconomicsAnalysisSaga";
import economicsMiddleware from "../../../Economics/Redux/Middleware/EconomicsMiddleware";
import watchRunForecastResultAggregationSaga from "../../../Forecast/Redux/Sagas/RunForecastResultAggregationSaga";
import watchCalculateHeatMapDataSaga from "../../../Economics/Redux/Sagas/CalculateHeatMapDataSaga";
import watchGetTableDataByIdSaga from "../Sagas/GetTableDataByIdSaga";
import watchFetchExistingDeclineParametersSaga from "../../../Network/Redux/Sagas/FetchExistingDeclineParametersSaga";
import watchFetchExistingProductionPrioritizationSaga from "../../../Network/Redux/Sagas/FetchExistingProductionPrioritizationSaga";
import watchGetDeclineParametersByIdSaga from "../../../Network/Redux/Sagas/GetDeclineParametersByIdSaga";
import watchGetProductionPrioritizationByIdSaga from "../../../Network/Redux/Sagas/GetProductionPrioritizationByIdSaga";
import watchFetchExistingForecastParametersSaga from "../../../Network/Redux/Sagas/FetchExistingForecastParametersSaga";
import watchFetchExistingEconomicsResultsSaga from "../../../Economics/Redux/Sagas/FetchExistingEconomicsResultsSaga";
import watchSaveEconomicsResultsSaga from "../../../Economics/Redux/Sagas/SaveEconomicsResultsSaga";
import watchGetEconomicsResultsByIdSaga from "../../../Economics/Redux/Sagas/GetEconomicsResultsByIdSaga";

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
  yield spawn(watchFetchUserDetailsSaga);
  yield spawn(watchFetchExistingForecastingResultsSaga);
  yield spawn(watchFetchTreeviewKeysSaga);
  yield spawn(watchGetForecastResultsChartDataSaga);
  yield spawn(watchFetchMatchObjectSaga);
  yield spawn(watchGetSelectedForecastDataByIdSaga);
  yield spawn(watchSaveCostsRevenuesSaga);
  yield spawn(watchSaveEconomicsParametersSaga);
  yield spawn(watchFetchExistingEconomicsDataSaga);
  yield spawn(watchSaveEconomicsSensitivitiesSaga);
  yield spawn(watchFetchExistingEconomicsSensitivitiesSaga);
  yield spawn(watchGetEconomicsSensitivitiesByIdSaga);
  yield spawn(watchRunEconomicsAnalysisSaga);
  yield spawn(watchRunForecastResultAggregationSaga);
  yield spawn(watchCalculateHeatMapDataSaga);
  yield spawn(watchGetTableDataByIdSaga);
  yield spawn(watchFetchExistingProductionPrioritizationSaga);
  yield spawn(watchFetchExistingDeclineParametersSaga);
  yield spawn(watchGetProductionPrioritizationByIdSaga);
  yield spawn(watchGetDeclineParametersByIdSaga);
  yield spawn(watchFetchExistingEconomicsResultsSaga);
  yield spawn(watchSaveEconomicsResultsSaga);
  yield spawn(watchGetEconomicsResultsByIdSaga);
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
    // applyMiddleware(authMiddleware, sagaMiddleware)
    applyMiddleware(uiSpinnerMiddleware, economicsMiddleware, sagaMiddleware)
  )
);

// const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

// export { store, persistor };
// listenMongoDb();
export { store };
