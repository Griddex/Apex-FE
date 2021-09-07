import { AxiosResponse } from "axios";
import {
  actionChannel,
  ActionChannelEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  takeLeading,
} from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { persistFormTitlesAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseVisualyticsUrl } from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/SaveVisualyticsSuccessFailureDialogParameters";
import {
  fetchStoredVisualyticsDataFailureAction,
  fetchStoredVisualyticsDataSuccessAction,
  STORED_VISUALYTICSDATA_REQUEST,
} from "../Actions/VisualyticsActions";

export default function* watchFetchStoredVisualyticsDataSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const storedVisualyticsDataChan = yield actionChannel(
    STORED_VISUALYTICSDATA_REQUEST
  );
  yield takeLeading(storedVisualyticsDataChan, fetchStoredVisualyticsDataSaga);
}

const config = { withCredentials: false };
const fetchStoredVisualyticsDataAPI = (url: string) =>
  authService.get(url, config);

function* fetchStoredVisualyticsDataSaga(action: IAction): Generator<
  | CallEffect<AxiosResponse>
  | PutEffect<{
      payload: any;
      type: string;
    }>,
  void,
  any
> {
  const { payload } = action;
  const { projectId } = payload;

  const storedVisualyticsUrl = `${getBaseVisualyticsUrl()}/light/${projectId}`;

  try {
    const storedVisualyticsResults = yield call(
      fetchStoredVisualyticsDataAPI,
      storedVisualyticsUrl
    );

    const {
      data: { data: visualyticsDeckStored },
    } = storedVisualyticsResults;

    const successAction = fetchStoredVisualyticsDataSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        visualyticsDeckStored,
      },
    });

    yield put(
      persistFormTitlesAction(
        "storedVisualyticsTitles",
        visualyticsDeckStored.map((o: any) => o.title)
      )
    );
  } catch (errors) {
    const failureAction = fetchStoredVisualyticsDataFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters()));
    yield put(hideSpinnerAction());
  }
}
