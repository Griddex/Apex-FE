import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import allReducers from "../Reducers/AllReducers";
import createSagaMiddleware from "redux-saga";
import watchLoginSaga from "../Sagas/LoginSaga";
import watchCreateNewProjectSaga from "../../../Project/Redux/Sagas/CreateProjectSaga";
import watchRegisterSaga from "../../../Administration/Redux/Sagas/RegisterSaga";
import watchConnectDatabaseSaga from "../../../Import/Redux/Sagas/ConnectDatabaseSaga";
import { spawn } from "redux-saga/effects";
import authMiddleware from "../Middlewares/AuthMiddleware";
import uiSpinnerMiddleware from "../Middlewares/UISpinnerMiddleware";
import watchRunForecastSaga from "../../../Network/Redux/Sagas/RunForecastSaga";
import rootReducer from "../Reducers/RootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import watchOpenRecentProjectSaga from "../../../Project/Redux/Sagas/OpenRecentProjectSaga";
import watchFetchStoredInputDeckSaga from "../../../Import/Redux/Sagas/FetchStoredInputDeckSaga";
import watchSaveInputDeckSaga from "../../../Import/Redux/Sagas/SaveInputDeckSaga";
import watchAutogenerateNetworkSaga from "../../../Network/Redux/Sagas/AutogenerateNetworkSaga";
import watchSaveForecastParametersSaga from "../../../Network/Redux/Sagas/SaveForecastParametersSaga";
import watchSaveNetworkSaga from "../../../Network/Redux/Sagas/SaveNetworkSaga";
import watchFetchUnitSettingsSaga from "../../../Settings/Redux/Sagas/Sagas/UnitSettingsSaga";
import watchFetchApplicationHeadersSaga from "../../../Import/Redux/Sagas/FetchApplicationHeadersSaga";
import watchAndSaveAutogenerateNetworkSaga from "../../../Network/Redux/Sagas/SaveAndAutogenerateNetworkSaga";
import watchFetchStoredNetworkDataSaga from "../../../Network/Redux/Sagas/FetchStoredNetworkDataSaga";
import watchUpdateForecastParametersSaga from "../../../Network/Redux/Sagas/UpdateForecastParametersSaga";
import watchSaveForecastSaga from "../../../Network/Redux/Sagas/SaveForecastSaga";
import watchFetchUserDetailsSaga from "../Sagas/FetchUserDetailsSaga";
import watchFetchStoredForecastingResultsSaga from "../../../Forecast/Redux/Sagas/FetchStoredForecastingResultsSaga";
import watchFetchStoredProjectsSaga from "../../../Project/Redux/Sagas/FetchStoredProjectsSaga";
import watchDisplayNetworkBySelectionSaga from "../../../Network/Redux/Sagas/DisplayNetworkBySelectionSaga";
import watchFetchMatchObjectSaga from "../Sagas/FetchMatchObjectSaga";
import watchGetSelectedForecastDataByIdSaga from "../../../Forecast/Redux/Sagas/GetSelectedForecastDataByIdSaga";
import watchGetForecastResultsChartDataSaga from "../../../Forecast/Redux/Sagas/GetForecastResultsChartDataSaga";
import watchSaveEconomicsParametersSaga from "../../../Economics/Redux/Sagas/SaveEconomicsParametersSaga";
import watchSaveCostsRevenuesSaga from "../../../Economics/Redux/Sagas/SaveCostsRevenuesSaga";
import watchFetchStoredEconomicsDataSaga from "../../../Economics/Redux/Sagas/FetchStoredEconomicsDataSaga";
import watchFetchStoredEconomicsSensitivitiesSaga from "../../../Economics/Redux/Sagas/FetchStoredEconomicsSensitivitiesSaga";
import watchGetEconomicsSensitivitiesByIdSaga from "../../../Economics/Redux/Sagas/GetEconomicsSensitivitiesByIdSaga";
import watchSaveEconomicsSensitivitiesSaga from "../../../Economics/Redux/Sagas/SaveEconomicsSensitivitiesSaga";
import watchRunEconomicsAnalysisSaga from "../../../Economics/Redux/Sagas/RunEconomicsAnalysisSaga";
import economicsMiddleware from "../../../Economics/Redux/Middleware/EconomicsMiddleware";
import watchRunForecastEconomicsAggregationSaga from "../../../Forecast/Redux/Sagas/RunForecastEconomicsAggregationSaga";
import watchCalculateHeatMapDataSaga from "../../../Economics/Redux/Sagas/CalculateHeatMapDataSaga";
import watchGetTableDataByIdSaga from "../Sagas/GetTableDataByIdSaga";
import watchFetchStoredDeclineCurveParametersSaga from "../../../Network/Redux/Sagas/FetchStoredDeclineCurveParametersSaga";
import watchFetchStoredProductionPrioritizationSaga from "../../../Network/Redux/Sagas/FetchStoredProductionPrioritizationSaga";
import watchGetDeclineParametersByIdSaga from "../../../Network/Redux/Sagas/GetDeclineParametersByIdSaga";
import watchGetProductionPrioritizationByIdSaga from "../../../Network/Redux/Sagas/GetProductionPrioritizationByIdSaga";
import watchFetchStoredForecastParametersSaga from "../../../Network/Redux/Sagas/FetchStoredForecastParametersSaga";
import watchFetchStoredEconomicsResultsSaga from "../../../Economics/Redux/Sagas/FetchStoredEconomicsResultsSaga";
import watchSaveEconomicsResultsSaga from "../../../Economics/Redux/Sagas/SaveEconomicsResultsSaga";
import watchGetEconomicsResultsByIdSaga from "../../../Economics/Redux/Sagas/GetEconomicsResultsByIdSaga";
import watchDeleteDataByIdSaga from "../Sagas/DeleteDataByIdSaga";
import watchFetchEconomicsTreeviewKeysSaga from "../../../Economics/Redux/Sagas/FetchEconomicsTreeviewKeysSaga";
import watchFetchForecastTreeviewKeysSaga from "../../../Forecast/Redux/Sagas/FetchForecastTreeviewKeysSaga";

function* rootSaga() {
  yield spawn(watchLoginSaga);
  yield spawn(watchRegisterSaga);
  yield spawn(watchConnectDatabaseSaga);
  yield spawn(watchCreateNewProjectSaga);
  yield spawn(watchFetchStoredProjectsSaga);
  yield spawn(watchFetchUnitSettingsSaga);
  yield spawn(watchOpenRecentProjectSaga);
  yield spawn(watchFetchStoredInputDeckSaga);
  yield spawn(watchSaveInputDeckSaga);
  yield spawn(watchAutogenerateNetworkSaga);
  yield spawn(watchAndSaveAutogenerateNetworkSaga);
  yield spawn(watchRunForecastSaga);
  yield spawn(watchSaveForecastParametersSaga);
  yield spawn(watchUpdateForecastParametersSaga);
  yield spawn(watchSaveNetworkSaga);
  yield spawn(watchFetchApplicationHeadersSaga);
  yield spawn(watchFetchStoredNetworkDataSaga);
  yield spawn(watchFetchStoredForecastParametersSaga);
  yield spawn(watchDisplayNetworkBySelectionSaga);
  yield spawn(watchSaveForecastSaga);
  yield spawn(watchFetchUserDetailsSaga);
  yield spawn(watchFetchStoredForecastingResultsSaga);
  yield spawn(watchFetchForecastTreeviewKeysSaga);
  yield spawn(watchGetForecastResultsChartDataSaga);
  yield spawn(watchFetchMatchObjectSaga);
  yield spawn(watchGetSelectedForecastDataByIdSaga);
  yield spawn(watchSaveCostsRevenuesSaga);
  yield spawn(watchSaveEconomicsParametersSaga);
  yield spawn(watchFetchStoredEconomicsDataSaga);
  yield spawn(watchSaveEconomicsSensitivitiesSaga);
  yield spawn(watchFetchStoredEconomicsSensitivitiesSaga);
  yield spawn(watchGetEconomicsSensitivitiesByIdSaga);
  yield spawn(watchRunEconomicsAnalysisSaga);
  yield spawn(watchRunForecastEconomicsAggregationSaga);
  yield spawn(watchCalculateHeatMapDataSaga);
  yield spawn(watchGetTableDataByIdSaga);
  yield spawn(watchFetchStoredProductionPrioritizationSaga);
  yield spawn(watchFetchStoredDeclineCurveParametersSaga);
  yield spawn(watchGetProductionPrioritizationByIdSaga);
  yield spawn(watchGetDeclineParametersByIdSaga);
  yield spawn(watchFetchStoredEconomicsResultsSaga);
  yield spawn(watchSaveEconomicsResultsSaga);
  yield spawn(watchGetEconomicsResultsByIdSaga);
  yield spawn(watchDeleteDataByIdSaga);
  yield spawn(watchFetchEconomicsTreeviewKeysSaga);
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
    applyMiddleware(
      uiSpinnerMiddleware,
      // authMiddleware,
      economicsMiddleware,
      sagaMiddleware
    )
  )
);

// const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

// export { store, persistor };
export { store };
