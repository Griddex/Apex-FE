import {
  actionChannel,
  ActionChannelEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  SelectEffect,
  TakeEffect,
  takeLeading,
} from "redux-saga/effects";
import DialogOkayButton from "../../../Application/Components/DialogButtons/DialogOkayButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import {
  hideSpinnerAction,
  showSpinnerAction,
} from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseEconomicsUrl } from "../../../Application/Services/BaseUrlService";
import history from "../../../Application/Services/HistoryService";
import {
  economicsPerspectiveTreeMap,
  TEconomicsTreePerspective,
} from "../../Data/EconomicsData";
import {
  ECONOMICS_TREEVIEWKEYS_REQUEST,
  fetchEconomicsTreeviewKeysFailureAction,
  updateEconomicsParameterAction,
  updateEconomicsParametersAction,
} from "../Actions/EconomicsActions";

export default function* watchFetchEconomicsTreeviewKeysSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const treeviewKeysChan = yield actionChannel(ECONOMICS_TREEVIEWKEYS_REQUEST);
  yield takeLeading(treeviewKeysChan, fetchEconomicsTreeviewKeysSaga);
}

function* fetchEconomicsTreeviewKeysSaga(action: IAction): Generator<
  | CallEffect<any>
  | TakeEffect
  | PutEffect<{
      payload: any;
      type: string;
    }>
  | SelectEffect,
  void,
  any
> {
  const { payload } = action;

  const { willShowSuccessDialog, perspective, idTitleDescIsSaved } = payload;
  const {
    selectedEconomicsResultsId,
    selectedEconomicsResultsTitle,
    selectedEconomicsResultsDescription,
    isEconomicsResultsSaved,
  } = idTitleDescIsSaved;

  const url = `${getBaseEconomicsUrl()}/analyses/analysisResultTree/${selectedEconomicsResultsId}`;
  const config = { withCredentials: false };
  const fetchEconomicsTreeAPI = (url: string) => authService.get(url, config);

  const message = "Loading economics chart data...";

  try {
    yield put(showSpinnerAction(message));

    const result = yield call(fetchEconomicsTreeAPI, url);

    const {
      data: { data: economicsTree },
    } = result;

    const treeType = perspective as TEconomicsTreePerspective;

    yield put(
      updateEconomicsParametersAction({
        selectedEconomicsResultsId,
        selectedEconomicsResultsTitle,
        selectedEconomicsResultsDescription,
        isEconomicsResultsSaved,
        [economicsPerspectiveTreeMap["heatMapTree"]]:
          economicsTree["heatMapTree"],
        [economicsPerspectiveTreeMap["plotChartsTree"]]:
          economicsTree["plotChartsTree"],
        [economicsPerspectiveTreeMap["templatesTree"]]:
          economicsTree["templatesTree"],
        resultsAnalyisOptions: economicsTree["analysis"].map((row: any) => ({
          value: row["analysisName"],
          label: row["analysisTitle"],
        })),
        economicsRanking: economicsTree["economicsRanking"],
        sensitivitiesTable:
          economicsTree["economicsSensitivitiesResult"]["sensitivitiesTable"],
      })
    );

    let dialogParameters = {} as DialogStuff;
    if (willShowSuccessDialog) {
      dialogParameters = {
        name: "Get_Economics_Results_Success_Dialog",
        title: "Economics Results Success",
        type: "textDialog",
        show: true,
        exclusive: true,
        maxWidth: "xs",
        dialogText: `Economics_Results was successfully fetched!`,
        iconType: "success",
        actionsList: () => DialogOkayButton([true], [false], [() => {}]),
        dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      };

      yield put(showDialogAction(dialogParameters));
    }
  } catch (errors) {
    const failureAction = fetchEconomicsTreeviewKeysFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    // yield put(showDialogAction(failureDialogParameters("")));
  } finally {
    yield put(hideSpinnerAction());
  }
}

function forwardTo(routeUrl: string) {
  history.push(routeUrl);
}
