import { AxiosResponse } from "axios";
import {
  actionChannel,
  ActionChannelEffect,
  all,
  AllEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  takeLeading,
} from "redux-saga/effects";
import { IInputWorkflowProcess } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { failureDialogParameters } from "../../../Project/Components/DialogParameters/ProjectSuccessFailureDialogsParameters";
import {
  fetchApplicationHeadersFailureAction,
  fetchApplicationHeadersSuccessAction,
  FETCHAPPLICATIONHEADERS_REQUEST,
} from "../Actions/InputActions";
import getBaseForecastUrl from "./../../../Application/Services/BaseUrlService";

export default function* watchFetchApplicationHeadersSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const appHeadersChan = yield actionChannel(FETCHAPPLICATIONHEADERS_REQUEST);
  yield takeLeading(appHeadersChan, fetchApplicationHeadersSaga);
}

function getHeadersType(workflowProcess: IInputWorkflowProcess["wkPs"]) {
  switch (workflowProcess) {
    case "facilitiesInputDeckExcel":
      return "facilitiesInputHeaders";
    case "forecastInputDeckExcel":
      return "forecastInputHeaders";
    default:
      break;
  }
}

const config = { withCredentials: false };
const fetchHeadersAPI = (url: string) => authService.get(url, config);
const facilitiesUrl = `${getBaseForecastUrl()}/global-variableunit/${getHeadersType(
  "facilitiesInputDeckExcel"
)}`;
const forecastUrl = `${getBaseForecastUrl()}/global-variableunit/${getHeadersType(
  "forecastInputDeckExcel"
)}`;

function* fetchApplicationHeadersSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<AxiosResponse<any>>>
  | PutEffect<{
      payload: any;
      type: string;
    }>,
  void,
  [any, any]
> {
  const { payload } = action;

  try {
    const [facilitiesResult, forecastResults] = yield all([
      call(fetchHeadersAPI, facilitiesUrl),
      call(fetchHeadersAPI, forecastUrl),
    ]);

    const {
      data: { data: facilitiesAppHeaders }, //prevent 2nd trip to server
    } = facilitiesResult;
    const {
      data: { data: forecastAppHeaders }, //prevent 2nd trip to server
    } = forecastResults;

    //Had to do this because Gift changed the data structure for
    // forecast input headers
    const foreHeaders = Object.keys(forecastAppHeaders).map((k) => ({
      variableName: k,
      variableTitle: forecastAppHeaders[k],
    }));

    const successAction = fetchApplicationHeadersSuccessAction();
    // const headerType = getHeadersType(workflowProcess) as string;
    yield put({
      ...successAction,
      payload: {
        ...payload,
        facilitiesAppHeaders,
        forecastAppHeaders: foreHeaders,
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
}
