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
import { IExistingDataProps } from "../../../Application/Types/ApplicationTypes";
import { failureDialogParameters } from "../../Components/DialogParameters/ExistingDataDialogParameters";
import {
  EXISTINGDATA_REQUEST,
  fetchExistingDataFailureAction,
  fetchExistingDataSuccessAction,
} from "../Actions/ExistingDataActions";

export default function* watchFetchExistingDataSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const existingDataChan = yield actionChannel(EXISTINGDATA_REQUEST);
  yield takeLeading(existingDataChan, fetchExistingDataSaga);
}

const config = { withCredentials: false };
const fetchExistingDataAPI = (url: string) => authService.get(url, config);

function* fetchExistingDataSaga(action: IAction): Generator<
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
      call(fetchExistingDataAPI, facilitiesUrl),
      call(fetchExistingDataAPI, forecastUrl),
    ]);

    const {
      data: { data: facilitiesInputDeckExisting },
    } = facilitiesResult;

    const {
      data: { data: forecastInputDeckExisting },
    } = forecastResults;

    const successAction = fetchExistingDataSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        facilitiesInputDeckExisting,
        forecastInputDeckExisting,
      },
    });

    yield put(
      persistFormTitlesAction(
        "facilitiesTitles",
        facilitiesInputDeckExisting.map((o: any) => o.title)
      )
    );
    yield put(
      persistFormTitlesAction(
        "forecastTitles",
        forecastInputDeckExisting.map((o: any) => o.title)
      )
    );
  } catch (errors) {
    const failureAction = fetchExistingDataFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters));
    yield put(hideSpinnerAction());
  }
}
