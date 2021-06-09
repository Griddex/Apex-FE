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
import { failureDialogParameters } from "../../Components/DialogParameters/ExistingDeclineParametersDialogParameters";
import {
  EXISTING_DECLINEPARAMETERS_REQUEST,
  fetchExistingDeclineParametersFailureAction,
  fetchExistingDeclineParametersSuccessAction,
} from "../Actions/NetworkActions";

export default function* watchFetchExistingDeclineParametersSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const existingDeclineParametersChan = yield actionChannel(
    EXISTING_DECLINEPARAMETERS_REQUEST
  );
  yield takeLeading(
    existingDeclineParametersChan,
    fetchExistingDeclineParametersSaga
  );
}

type AxiosPromise = ReturnType<typeof fetchExistingDeclineParametersAPI>;

const config = { withCredentials: false };
const fetchExistingDeclineParametersAPI = (url: string) =>
  authService.get(url, config);

function* fetchExistingDeclineParametersSaga(
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
      fetchExistingDeclineParametersAPI,
      declineParametersUrl
    );

    const {
      data: { data: declineParameters },
    } = result;

    const successAction = fetchExistingDeclineParametersSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        declineParameters,
      },
    });
  } catch (errors) {
    const failureAction = fetchExistingDeclineParametersFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
    yield put(hideSpinnerAction());
  }
}
