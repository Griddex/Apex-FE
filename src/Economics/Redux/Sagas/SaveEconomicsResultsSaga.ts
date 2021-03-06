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
import {
  hideSpinnerAction,
  showSpinnerAction,
} from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseEconomicsUrl } from "../../../Application/Services/BaseUrlService";
import {
  failureDialogParameters,
  successDialogParameters,
} from "../../Components/DialogParameters/EconomicsSuccessFailureDialogParameters";
import {
  fetchStoredEconomicsResultsRequestAction,
  saveEconomicsResultsFailureAction,
  SAVE_ECONOMICSRESULTS_REQUEST,
  updateEconomicsParametersAction,
} from "../Actions/EconomicsActions";

export default function* watchSaveEconomicsResultsSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const saveEconomicsResultsChan = yield actionChannel(
    SAVE_ECONOMICSRESULTS_REQUEST
  );
  yield takeLeading(saveEconomicsResultsChan, saveEconomicsResultsSaga);
}

const authServAPI = (url: string) => authService.post("", {}, {});
type AxiosPromise = ReturnType<typeof authServAPI>;

function* saveEconomicsResultsSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<AxiosPromise>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<{ payload?: any; type: string }>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;
  const {
    titleDesc: { title, description },
  } = payload;

  const { currentProjectId } = yield select((state) => state.projectReducer);
  const data = {
    projectId: currentProjectId,
    title,
    description,
  };

  const config = { withCredentials: false };
  const saveEconomicsResultsAPI = (url: string) =>
    authService.post(url, data, config);

  try {
    yield put(showSpinnerAction("Saving economics results..."));

    const result = yield call(
      saveEconomicsResultsAPI,
      `${getBaseEconomicsUrl()}/analyses/analysisresults/save`
    );

    const {
      data: { data: economicsResultsId },
    } = result;

    yield put(
      updateEconomicsParametersAction({
        selectedEconomicsResultsId: economicsResultsId,
        selectedEconomicsResultsTitle: title,
        isEconomicsResultsSaved: true,
      })
    );

    yield put(
      fetchStoredEconomicsResultsRequestAction(currentProjectId, false)
    );

    yield put(
      showDialogAction(
        successDialogParameters(
          "Economics_Results_Success_Dialog",
          "Economics Results Save Success",
          true,
          `Economics Results save was successfully completed!`
        )
      )
    );
  } catch (errors) {
    const failureAction = saveEconomicsResultsFailureAction();

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
          (errors as any).message
        )
      )
    );
  } finally {
    yield put(hideSpinnerAction());
  }
}
