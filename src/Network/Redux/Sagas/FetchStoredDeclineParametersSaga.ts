import {
  actionChannel,
  ActionChannelEffect,
  AllEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  select,
  SelectEffect,
  TakeEffect,
  takeLeading,
} from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredDeclineParametersDialogParameters";
import {
  STORED_DECLINEPARAMETERS_REQUEST,
  fetchStoredDeclineParametersFailureAction,
  fetchStoredDeclineParametersSuccessAction,
} from "../Actions/NetworkActions";

export default function* watchFetchStoredDeclineParametersSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const storedDeclineParametersChan = yield actionChannel(
    STORED_DECLINEPARAMETERS_REQUEST
  );
  yield takeLeading(
    storedDeclineParametersChan,
    fetchStoredDeclineParametersSaga
  );
}

type AxiosPromise = ReturnType<typeof fetchStoredDeclineParametersAPI>;

const config = { withCredentials: false };
const fetchStoredDeclineParametersAPI = (url: string) =>
  authService.get(url, config);

function* fetchStoredDeclineParametersSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<any>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<{ payload: any; type: string }>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  const { projectId } = yield select((state) => state.projectReducer);

  const declineParametersUrl = `${getBaseForecastUrl()}/well-decline-parameters/light/${projectId}`;

  try {
    const result = yield call<(url: string) => AxiosPromise>(
      fetchStoredDeclineParametersAPI,
      declineParametersUrl
    );

    const {
      data: { data: declineParameters },
    } = result;

    const successAction = fetchStoredDeclineParametersSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        declineParameters,
      },
    });
  } catch (errors) {
    const failureAction = fetchStoredDeclineParametersFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
    yield put(hideSpinnerAction());
  }
}
