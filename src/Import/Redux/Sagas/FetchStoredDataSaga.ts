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
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { persistFormTitlesAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import { IStoredDataProps } from "../../../Application/Types/ApplicationTypes";
import { failureDialogParameters } from "../../Components/DialogParameters/StoredDataDialogParameters";
import {
  STORED_DATA_REQUEST,
  fetchStoredDataFailureAction,
  fetchStoredDataSuccessAction,
} from "../Actions/StoredDataActions";

export default function* watchFetchStoredDataSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const storedDataChan = yield actionChannel(STORED_DATA_REQUEST);
  yield takeLeading(storedDataChan, fetchStoredDataSaga);
}

const config = { withCredentials: false };
const fetchStoredDataAPI = (url: string) => authService.get(url, config);

function* fetchStoredDataSaga(action: IAction): Generator<
  | AllEffect<CallEffect<AxiosResponse>>
  | PutEffect<{
      payload: any;
      type: string;
    }>,
  void,
  [any, any]
> {
  const { payload } = action;
  const { projectId } = payload;
  const facilitiesUrl = `${getBaseForecastUrl()}/facilities-inputdeck/light/${projectId}`;
  const forecastUrl = `${getBaseForecastUrl()}/forecast-inputdeck/light/${projectId}`;

  try {
    const [facilitiesResult, forecastResults] = yield all([
      call(fetchStoredDataAPI, facilitiesUrl),
      call(fetchStoredDataAPI, forecastUrl),
    ]);

    const {
      data: { data: facilitiesInputDeckStored },
    } = facilitiesResult;

    const {
      data: { data: forecastInputDeckStored },
    } = forecastResults;

    const successAction = fetchStoredDataSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        facilitiesInputDeckStored,
        forecastInputDeckStored,
      },
    });

    yield put(
      persistFormTitlesAction(
        "facilitiesTitles",
        facilitiesInputDeckStored.map((o: any) => o.title)
      )
    );
    yield put(
      persistFormTitlesAction(
        "forecastTitles",
        forecastInputDeckStored.map((o: any) => o.title)
      )
    );
  } catch (errors) {
    const failureAction = fetchStoredDataFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
    yield put(hideSpinnerAction());
  }
}
