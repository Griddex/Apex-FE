import { AxiosResponse } from "axios";
import {
  actionChannel,
  ActionChannelEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  SelectEffect,
  takeLeading,
} from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredDeclineCurveParametersDialogParameters";
import {
  getDeclineParametersByIdFailureAction,
  getDeclineParametersByIdSuccessAction,
  GET_DECLINEPARAMETERSBYID_REQUEST,
} from "../Actions/NetworkActions";

export default function* watchGetDeclineParametersByIdSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const getDeclineParametersByIdChan = yield actionChannel(
    GET_DECLINEPARAMETERSBYID_REQUEST
  );
  yield takeLeading(getDeclineParametersByIdChan, getDeclineParametersByIdSaga);
}

const config = { withCredentials: false };
const getDeclineParametersByIdAPI = (url: string) =>
  authService.get(url, config);

function* getDeclineParametersByIdSaga(action: IAction): Generator<
  | CallEffect<AxiosResponse>
  | PutEffect<{
      payload: any;
      type: string;
    }>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  const { selectedDeclineParametersId } = payload;

  const declineParametersUrl = `${getBaseForecastUrl()}/well-decline-parameters/${selectedDeclineParametersId}`;

  try {
    const declineParametersResults = yield call(
      getDeclineParametersByIdAPI,
      declineParametersUrl
    );

    const {
      data: { data: selectedDeclineParametersData },
    } = declineParametersResults;

    const successAction = getDeclineParametersByIdSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        selectedDeclineParametersData,
      },
    });
  } catch (errors) {
    const failureAction = getDeclineParametersByIdFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
  } finally {
    yield put(hideSpinnerAction());
  }
}
