import { AxiosResponse } from "axios";
import {
  actionChannel,
  ActionChannelEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  select,
  SelectEffect,
  takeLeading,
} from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseEconomicsUrl } from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/EconomicsSuccessFailureDialogParameters";
import {
  EXISTING_ECONOMICSRESULTS_REQUEST,
  fetchExistingEconomicsResultsFailureAction,
  fetchExistingEconomicsResultsSuccessAction,
} from "../Actions/EconomicsActions";

export default function* watchFetchExistingEconomicsResultsSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const existingEconomicsResultsChan = yield actionChannel(
    EXISTING_ECONOMICSRESULTS_REQUEST
  );
  yield takeLeading(
    existingEconomicsResultsChan,
    fetchExistingEconomicsResultsSaga
  );
}

const config = { withCredentials: false };
const fetchExistingEconomicsResultsAPI = (url: string) =>
  authService.get(url, config);

function* fetchExistingEconomicsResultsSaga(action: IAction): Generator<
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
  const { projectId } = payload;

  const economicsResultsUrl = `${getBaseEconomicsUrl()}/analyses/analysisresults/light/${projectId}`;

  try {
    const economicsResultsResults = yield call(
      fetchExistingEconomicsResultsAPI,
      economicsResultsUrl
    );

    const {
      data: { data: economicsResultsExisting },
    } = economicsResultsResults;

    const successAction = fetchExistingEconomicsResultsSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        economicsResultsExisting,
      },
    });
  } catch (errors) {
    const failureAction = fetchExistingEconomicsResultsFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(
      showDialogAction(
        failureDialogParameters(
          "Economics_Results_Failure_Dialog",
          "Economics Results Save Failure",
          true,
          "Economics Results",
          errors.message
        )
      )
    );
    yield put(hideSpinnerAction());
  }
}
