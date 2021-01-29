import { call, put, takeLatest } from "redux-saga/effects";
import { IImportWorkflowProcess } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { failureDialogParameters } from "../../../Project/Components/DialogParameters/ProjectSuccessFailureDialogsParameters";
import {
  fetchApplicationHeadersFailureAction,
  fetchApplicationHeadersSuccessAction,
  FETCHAPPLICATIONHEADERS_REQUEST,
} from "../Actions/ImportActions";
import getBaseUrl from "./../../../Application/Services/BaseUrlService";

export default function* watchFetchApplicationHeadersSaga() {
  yield takeLatest(
    FETCHAPPLICATIONHEADERS_REQUEST,
    fetchApplicationHeadersSaga
  );
}

function getHeadersType(
  workflowProcess: IImportWorkflowProcess["workflowProcess"]
) {
  switch (workflowProcess) {
    case "facilitiesInputDeckExcel":
      return "facilityInputHeaders";
    case "forecastInputDeckExcel":
      return "forecastInputHeaders";
    // case "economicsInputDataExisting":
    //   return "economicsInputHeaders";
    // case "productionInputDataExisting":
    //   return "productionHeaders";
    // case "networkExisting":
    //   return "NETWORK";
    default:
      break;
  }
}

function* fetchApplicationHeadersSaga(action: IAction) {
  const { payload } = action;
  const { workflowProcess } = payload;

  //use dataType to tell backend what data you are looking for
  const config = { headers: null };
  const fetchApplicationHeadersAPI = (url: string) =>
    authService.get(url, config);

  try {
    const result = yield call(
      fetchApplicationHeadersAPI,
      // `${getBaseUrl()}/global-variableunit/${getHeadersType(workflowProcess)}`
      `https://jsonplaceholder.typicode.com/posts`
    );

    const {
      data: { statusCode, data, succcess }, //prevent 2nd trip to server
    } = result;
    console.log(
      "Logged output --> ~ file: FetchApplicationHeadersSaga.ts ~ line 59 ~ function*fetchApplicationHeadersSaga ~ result",
      result
    );

    const successAction = fetchApplicationHeadersSuccessAction();
    const headerType = getHeadersType(workflowProcess) as string;
    yield put({
      ...successAction,
      payload: {
        ...payload,
        statusCode,
        headerType,
        [headerType]: data,
      },
    });
  } catch (errors) {
    const failureAction = fetchApplicationHeadersFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  }

  yield put(hideSpinnerAction());
}
