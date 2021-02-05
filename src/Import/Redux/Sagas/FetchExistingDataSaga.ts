import {
  all,
  AllEffect,
  call,
  CallEffect,
  put,
  PutEffect,
  takeLeading,
} from "redux-saga/effects";
import { IAllWorkflowProcesses } from "../../../Application/Components/Workflows/WorkflowTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseUrl from "../../../Application/Services/BaseUrlService";
import {
  IExistingDataProps,
  IExistingDataRow,
} from "../../../Application/Types/ApplicationTypes";
import formatDate from "../../../Application/Utils/FormatDate";
import { failureDialogParameters } from "../../Components/DialogParameters/ExistingDataDialogParameters";
import {
  anitaImg,
  glenImg,
  johnImg,
  kerryImg,
  shirleyImg,
} from "../../Utils/iconImages";
import {
  EXISTINGDATA_REQUEST,
  fetchExistingDataFailureAction,
  fetchExistingDataSuccessAction,
} from "../Actions/ExistingDataActions";

export default function* watchFetchExistingDataSaga() {
  yield takeLeading(EXISTINGDATA_REQUEST, fetchExistingDataSaga);
}

function getInsert(workflowProcess: IExistingDataProps["wkPs"]) {
  switch (workflowProcess) {
    case "facilitiesInputDeckExisting":
      return "FACILITIES";
    case "forecastInputDeckExisting":
      return "FORECAST";
    case "economicsInputDataExisting":
      return "ECONOMICS";
    case "productionInputDataExisting":
      return "PRODUCTION";
    case "networkExisting":
      return "NETWORK";
    default:
      break;
  }
}

type AxiosPromise = ReturnType<typeof fetchExistingDataAPI>;

const config = { headers: null };
const fetchExistingDataAPI = (url: string) => authService.get(url, config);

function* fetchExistingDataSaga(
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
  const { projectId } = payload;
  const facilitiesUrl = `${getBaseUrl()}/facilities-inputdeck/light/${projectId}`;
  const forecastUrl = `${getBaseUrl()}/forecast-inputdeck/light/${projectId}`;

  try {
    const [facilitiesResult, forecastResult] = yield all<
      CallEffect<AxiosPromise>
    >([
      call<(url: string) => AxiosPromise>(fetchExistingDataAPI, facilitiesUrl),
      call<(url: string) => AxiosPromise>(fetchExistingDataAPI, forecastUrl),
    ]);

    const {
      data: { data: facilitiesInputDeckExisting }, //prevent 2nd trip to server
    } = facilitiesResult;

    const {
      data: { data: forecastInputDeckExisting }, //prevent 2nd trip to server
    } = forecastResult;

    const successAction = fetchExistingDataSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        facilitiesInputDeckExisting,
        forecastInputDeckExisting,
      },
    });
  } catch (errors) {
    const failureAction = fetchExistingDataFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  }

  yield put(hideSpinnerAction());
}
