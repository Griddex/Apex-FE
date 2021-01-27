import { call, put, select, takeLatest } from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { failureDialogParameters } from "../../Components/DialogParameters/AutoGenerateFailureDialogParameters";
import {
  saveNetworkFailureAction,
  saveNetworkSuccessAction,
  SAVENETWORK_REQUEST,
} from "../Actions/NetworkActions";

export default function* watchSaveNetworkSaga() {
  yield takeLatest(SAVENETWORK_REQUEST, saveNetworkSaga);
}

function* saveNetworkSaga(action: IAction) {
  const { payload } = action;
  const { workflowProcess } = payload;
  const { userId } = yield select((state) => state.loginReducer);
  const { inputDeckId: facilitiesInputDeckId } = yield select((state) => {
    const facilitiesState = state.inputReducer;
    const facilitiesWorkflowNames = Object.keys(facilitiesState).filter((n) =>
      n.includes("facilities")
    );
    const currentFacilityWorkflow = facilitiesWorkflowNames.filter((n) => {
      const workflowState = facilitiesState[n];
      return workflowState["inputDeckId"] !== "";
    });

    return currentFacilityWorkflow[0];
  });
  const { inputDeckId: forecastInputDeckId } = yield select(
    (state) => state.inputReducer["importDataWorkflows"][workflowProcess]
  );

  const data = {
    userId,
    facilitiesInputDeckId,
    forecastInputDeckId,
  };

  const config = { headers: null };
  const saveNetworkAPI = (url: string) => authService.post(url, config, data);

  try {
    const response = yield call(
      saveNetworkAPI,
      "https://jsonplaceholder.typicode.com/posts"
      // "http://a4b6b400f0c6.ngrok.io/api/project"
    );

    const { statusCode, data } = response;

    const successAction = saveNetworkSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, statusCode, data },
    });
  } catch (errors) {
    const failureAction = saveNetworkFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters()));
  }

  yield put(hideSpinnerAction());
}
