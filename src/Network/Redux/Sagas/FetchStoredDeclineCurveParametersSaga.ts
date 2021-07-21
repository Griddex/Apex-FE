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
import { persistFormTitlesAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredDeclineCurveParametersDialogParameters";
import {
  STORED_DECLINEPARAMETERS_REQUEST,
  fetchStoredDeclineCurveParametersFailureAction,
  fetchStoredDeclineCurveParametersSuccessAction,
} from "../Actions/NetworkActions";

export default function* watchFetchStoredDeclineCurveParametersSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const storedDeclineParametersChan = yield actionChannel(
    STORED_DECLINEPARAMETERS_REQUEST
  );
  yield takeLeading(
    storedDeclineParametersChan,
    fetchStoredDeclineCurveParametersSaga
  );
}

type AxiosPromise = ReturnType<typeof fetchStoredDeclineCurveParametersAPI>;

const config = {};
const fetchStoredDeclineCurveParametersAPI = (url: string) =>
  authService.get(url, config);

function* fetchStoredDeclineCurveParametersSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<any>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<IAction>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  const { projectId } = payload;

  const declineParametersUrl = `${getBaseForecastUrl()}/well-decline-parameters/light/${projectId}`;

  try {
    const result = yield call<(url: string) => AxiosPromise>(
      fetchStoredDeclineCurveParametersAPI,
      declineParametersUrl
    );

    const {
      data: { data: declineParametersStored },
    } = result;

    const successAction = fetchStoredDeclineCurveParametersSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        declineParametersStored,
      },
    });

    yield put(
      persistFormTitlesAction(
        "declineParametersTitles",
        declineParametersStored.map((o: any) => o.title)
      )
    );
  } catch (errors) {
    const failureAction = fetchStoredDeclineCurveParametersFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
    yield put(hideSpinnerAction());
  }
}
