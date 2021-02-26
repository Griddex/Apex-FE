import { END, eventChannel, EventChannel } from "redux-saga";
import {
  actionChannel,
  AllEffect,
  call,
  CallEffect,
  put,
  PutEffect,
  select,
  SelectEffect,
  take,
  TakeEffect,
  takeLeading,
} from "redux-saga/effects";
import { Stream } from "stream";
import http from "stream-http";
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

export default function* watchGenerateNetworkBySelectionSaga() {
  const generateNetworkBySelectionChan = yield actionChannel(
    GENERATENETWORKBYSELECTION_REQUEST
  );
  yield takeLeading(
    generateNetworkBySelectionChan,
    generateNetworkBySelectionSaga
  );
}

const config = { headers: null };
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
  { selectedNetworkId: any } & [any, any]
> {
  const { payload, meta } = action;
  const message = meta && meta.message ? meta.message : "";
  const { selectedNetworkId } = yield select((state) => state.networkReducer);
  const url = `${getBaseUrl()}/network/${selectedNetworkId}`;

  yield put(showSpinnerAction(message));

  try {
    const chan = yield call(updateNodesAndEdges, url);
    const [nodeElements, edgeElements] = yield take(chan);

    const successAction = generateNetworkBySelectionSuccessAction();
    yield put({
      ...successAction,
      payload: { ...payload, nodeElements, edgeElements },
    });
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
  const decoder = new TextDecoder();

  return eventChannel((emitter) => {
    http.get(url, function (res: Stream) {
      let nodeElements: any = [];
      let edgeElements: any = [];

      res.on("data", function (chunk) {
        console.log(
          "Logged output --> ~ file: GenerateNetworkBySelectionSaga.ts ~ line 97 ~ chunk",
          chunk
        );
        const str = decoder.decode(chunk);
        const objs = JSON.parse(str);

        const splitData = objs.reduce(
          (acc: any, o: any) => {
            if (Array.isArray(o))
              return { ...acc, metadata: [...acc.metadata, o] };
            else {
              if (o.type && o.type.endsWith("Node"))
                return { ...acc, nodeElements: [...acc.nodeElements, o] };
              else return { ...acc, edgeElements: [...acc.edgeElements, o] };
            }
          },
          { metadata: [], edgeElements: [], nodeElements: [] }
        );

        nodeElements = [...nodeElements, ...splitData["nodeElements"]];
        edgeElements = [...edgeElements, ...splitData["edgeElements"]];

        emitter([nodeElements, edgeElements]);
      });
      res.on("end", function (chunk) {
        emitter(END);
      });
    });

    return () => {
      emitter(END);
    };
  });
}
