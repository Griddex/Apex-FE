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
import * as authService from "../../../Application/Services/AuthService";
import getBaseUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/AutoGenerateFailureDialogParameters";
import {
  generateNetworkBySelectionFailureAction,
  generateNetworkBySelectionSuccessAction,
  GENERATENETWORKBYSELECTION_REQUEST,
} from "../Actions/NetworkActions";

export default function* watchGenerateNetworkBySelectionSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const generateNetworkBySelectionChan = yield actionChannel(
    GENERATENETWORKBYSELECTION_REQUEST
  );
  yield takeLeading(
    generateNetworkBySelectionChan,
    generateNetworkBySelectionSaga
  );
}

const config = { withCredentials: true };
const generateNetworkBySelectionAPI = (url: string) =>
  authService.get(url, config);
type AxiosPromise = ReturnType<typeof generateNetworkBySelectionAPI>;

export function* generateNetworkBySelectionSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<AxiosPromise>>
  | CallEffect<EventChannel<any>>
  | TakeEffect
  | PutEffect<{ payload: any; type: string }>
  | SelectEffect,
  void,
  any
> {
  const { payload, meta } = action;
  const message = meta && meta.message ? meta.message : "";
  const { selectedNetworkId } = yield select((state) => state.networkReducer);
  const url = `${getBaseUrl()}/network/${selectedNetworkId}`;

  yield put(showSpinnerAction(message));

  try {
    const chan = yield call(updateNodesAndEdges, url);

    while (true) {
      const flowElement = yield take(chan);
      console.log(
        "Logged output --> ~ file: GenerateNetworkBySelectionSaga.ts ~ line 68 ~ flowElement",
        flowElement
      );

      let isNode = false;
      const successAction = generateNetworkBySelectionSuccessAction();

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
      // else if (Object.keys(flowElement)[0] === "properties") {
      //   yield "properties"
      // }
    }
  } catch (errors) {
    const failureAction = generateNetworkBySelectionFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters()));
  } finally {
    yield put(hideSpinnerAction());
  }
}

function updateNodesAndEdges(url: string) {
  return eventChannel((emitter) => {
    jsonpipe.flow(url, {
      method: "GET",
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
