import {
  all,
  AllEffect,
  call,
  CallEffect,
  put,
  PutEffect,
  takeLatest,
} from "redux-saga/effects";
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
      return "facilitiesInputHeaders";
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

//use dataType to tell backend what data you are looking for
const config = { headers: null };
const fetchHeadersAPI = (url: string) => authService.get(url, config);
const facilitiesUrl = `${getBaseUrl()}/global-variableunit/${getHeadersType(
  "facilitiesInputDeckExcel"
)}`;
const forecastUrl = `${getBaseUrl()}/global-variableunit/${getHeadersType(
  "forecastInputDeckExcel"
)}`;

type AxiosPromise = ReturnType<typeof fetchHeadersAPI>;

function* fetchApplicationHeadersSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<AxiosPromise>>
  | PutEffect<{
      payload: any;
      type: string;
    }>,
  void,
  [any, any]
> {
  const { payload } = action;

  try {
    const [facilitiesResult, forecastResult] = yield all<
      CallEffect<AxiosPromise>
    >([
      call<(url: string) => AxiosPromise>(fetchHeadersAPI, facilitiesUrl),
      call<(url: string) => AxiosPromise>(fetchHeadersAPI, forecastUrl),
    ]);

    const {
      data: { data: facilitiesInputHeaders }, //prevent 2nd trip to server
    } = facilitiesResult;
    const {
      data: { data: forecastInputHeaders }, //prevent 2nd trip to server
    } = forecastResult;

    const successAction = fetchApplicationHeadersSuccessAction();
    // const headerType = getHeadersType(workflowProcess) as string;
    yield put({
      ...successAction,
      payload: {
        ...payload,
        facilitiesInputHeaders,
        forecastInputHeaders,
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
