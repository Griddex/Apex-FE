import jsonpipe from "jsonpipe";
import { END, eventChannel } from "redux-saga";
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
  take,
  TakeEffect,
  takeLeading,
} from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import {
  hideSpinnerAction,
  showSpinnerAction,
} from "../../../Application/Redux/Actions/UISpinnerActions";
import authHeaders from "../../../Application/Services/AuthHeaders";
import { getBaseForecastUrl } from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/AutoGenerateFailureDialogParameters";
import {
  autoGenerateNetworkFailureAction,
  autoGenerateNetworkSuccessAction,
  AUTOGENERATENETWORK_REQUEST,
  removeCurrentNetworkAction,
  updateNetworkParameterAction,
} from "../Actions/NetworkActions";

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
  | PutEffect<{ type: string; payload?: any }>
  | SelectEffect,
  void,
  any
> {
  const { payload, meta } = action;
  const message = meta && meta.message ? meta.message : "";

  const { userId } = yield select((state) => state.loginReducer);
  const { selectedForecastInputDeckId, selectedFacilitiesInputDeckId } =
    yield select((state) => state.inputReducer);
  const { showDrainagePointSummaryNodes, showDrainagePointSummaryEdges } =
    yield select((state) => state.networkReducer);

  const reqPayload = {
    userId,
    facilitiesInputDeckId: selectedFacilitiesInputDeckId,
    forecastInputDeckId: selectedForecastInputDeckId,
    showDrainagePointSummaryNodes,
    showDrainagePointSummaryEdges,
  };

  const url = `${getBaseForecastUrl()}/network/generate`;

  try {
    yield put(showSpinnerAction(message));
    yield put(removeCurrentNetworkAction(false));

    const chan = yield call(updateNodesAndEdges, url, reqPayload);

    while (true) {
      const flowElement = yield take(chan);

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

    const path = "isNetworkDisplayed";
    const value = true;
    yield put(updateNetworkParameterAction(path, value));
  } catch (errors) {
    const failureAction = autoGenerateNetworkFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    const errorMessages = (errors as any)["errors"]
      .map((row: any) => row.message)
      .join(",");

    yield put(showDialogAction(failureDialogParameters(errorMessages)));
  } finally {
    yield put(hideSpinnerAction());
  }
}

function updateNodesAndEdges(url: string, reqPayload: any) {
  return eventChannel((emitter) => {
    jsonpipe.flow(url, {
      method: "POST",
      data: JSON.stringify(reqPayload),
      headers: authHeaders(),
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
