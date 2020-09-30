import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./../Reducers/RootReducer";
import createSagaMiddleware from "redux-saga";
import watchLoginSaga from "../Sagas/LoginSaga";
import watchRegisterSaga from "../Sagas/RegisterSaga";
import watchConnectDatabaseSaga from "../../../Import/Redux/Sagas/connectDatabaseSaga";
import { spawn } from "redux-saga/effects";
import authMiddleware from "./../Middlewares/AuthMiddleware";
import uiSpinnerMiddleware from "./../Middlewares/UISpinnerMiddleware";

function* rootSaga() {
  yield spawn(watchLoginSaga);
  yield spawn(watchRegisterSaga);
  yield spawn(watchConnectDatabaseSaga);
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
