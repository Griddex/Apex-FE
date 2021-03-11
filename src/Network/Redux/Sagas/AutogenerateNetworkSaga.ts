import jsonpipe from "jsonpipe";
import { END, eventChannel, EventChannel } from "redux-saga";

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
  take,
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
import getBaseUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/AutoGenerateFailureDialogParameters";
import {
  autoGenerateNetworkFailureAction,
  autoGenerateNetworkSuccessAction,
  AUTOGENERATENETWORK_REQUEST,
} from "../Actions/NetworkActions";
import history from "../../../Application/Services/HistoryService";

export default function* watchAutogenerateNetworkSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const autoGenerateNetworkChan = yield actionChannel(
    AUTOGENERATENETWORK_REQUEST
  );
  yield takeLeading(autoGenerateNetworkChan, autoGenerateNetworkSaga);
}

export function* autoGenerateNetworkSaga(
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
  const { payload, meta } = action;
  const message = meta && meta.message ? meta.message : "";

  const { userId } = yield select((state) => state.loginReducer);
  const { forecastInputDeckId, facilitiesInputDeckId } = yield select(
    (state) => state.inputReducer
  );
  const { showWellheadSummaryNodes, showWellheadSummaryEdges } = yield select(
    (state) => state.networkReducer
  );

  const reqPayload = {
    userId,
    facilitiesInputDeckId,
    forecastInputDeckId,
    showWellheadSummaryNodes,
    showWellheadSummaryEdges,
  };

  const url = `${getBaseUrl()}/network/generate`;

  yield put(showSpinnerAction(message));

  try {
    const chan = yield call(updateNodesAndEdges, url, reqPayload);

    while (true) {
      const flowElement = yield take(chan);
      console.log(
        "Logged output --> ~ file: GenerateNetworkBySelectionSaga.ts ~ line 68 ~ flowElement",
        flowElement
      );

      let isNode = false;
      const successAction = autoGenerateNetworkSuccessAction();

      if (Object.keys(flowElement)[0] === "nodes") {
        isNode = true;
        const { nodeElements } = yield select((state) => state.networkReducer);
        const newFlowElements = [...nodeElements, flowElement["nodes"]];

        yield put({
          ...successAction,
          payload: { ...payload, isNode, newFlowElements },
        });
      } else if (Object.keys(flowElement)[0] === "edges") {
        isNode = false;
        const { edgeElements } = yield select((state) => state.networkReducer);
        const newFlowElements = [...edgeElements, flowElement["edges"]];

        yield put({
          ...successAction,
          payload: { ...payload, isNode, newFlowElements },
        });
      }
    }
  } catch (errors) {
    const failureAction = autoGenerateNetworkFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters()));
  } finally {
    yield put(hideSpinnerAction());
  }
}

function updateNodesAndEdges(url: string, reqPayload: any) {
  return eventChannel((emitter) => {
    jsonpipe.flow(url, {
      method: "POST",
      data: JSON.stringify(reqPayload),
      headers: { "Content-Type": "application/json; charset=utf-8" },
      disableContentType: true,
      withCredentials: false,
      success: function (chunk) {
        emitter(chunk);
      },
      error: function (chunk) {
        emitter(END);
      },
      complete: function (chunk) {
        emitter(END);
      },
    });

    return () => {
      emitter(END);
    };
  });
}
