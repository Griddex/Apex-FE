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
import getBaseForecastUrl from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/AutoGenerateFailureDialogParameters";
import {
  displayNetworkBySelectionFailureAction,
  displayNetworkBySelectionSuccessAction,
  DISPLAYNETWORKBYSELECTION_REQUEST,
  removeCurrentNetworkAction,
} from "../Actions/NetworkActions";

export default function* watchDisplayNetworkBySelectionSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const displayNetworkBySelectionChan = yield actionChannel(
    DISPLAYNETWORKBYSELECTION_REQUEST
  );
  yield takeLeading(
    displayNetworkBySelectionChan,
    displayNetworkBySelectionSaga
  );
}

const config = { withCredentials: false };
const displayNetworkBySelectionAPI = (url: string) =>
  authService.get(url, config);
type AxiosPromise = ReturnType<typeof displayNetworkBySelectionAPI>;

export function* displayNetworkBySelectionSaga(
  action: IAction
): Generator<
  | AllEffect<CallEffect<AxiosPromise>>
  | CallEffect<EventChannel<any>>
  | TakeEffect
  | PutEffect<{ type: string; payload?: any }>
  | SelectEffect,
  void,
  any
> {
  const { payload, meta } = action;
  const message = meta && meta.message ? meta.message : "";
  const { selectedNetworkId } = yield select((state) => state.networkReducer);
  const url = `${getBaseForecastUrl()}/network/${selectedNetworkId}`;

  try {
    yield put(showSpinnerAction(message));
    yield put(removeCurrentNetworkAction());

    const chan = yield call(updateNodesAndEdges, url);

    while (true) {
      const flowElement = yield take(chan);

      let categoryType;
      const successAction = displayNetworkBySelectionSuccessAction();

      const category = Object.keys(flowElement)[0];

      if (category === "nodes") {
        categoryType = category;
        const { nodeElements } = yield select((state) => state.networkReducer);
        const newFlowElements = [...nodeElements, flowElement["nodes"]];

        yield put({
          ...successAction,
          payload: { ...payload, categoryType, newFlowElements },
        });
      } else if (category === "edges") {
        categoryType = category;
        const { edgeElements } = yield select((state) => state.networkReducer);
        const newFlowElements = [...edgeElements, flowElement["edges"]];

        yield put({
          ...successAction,
          payload: { ...payload, categoryType, newFlowElements },
        });
      } else if (category === "properties") {
        categoryType = category;
        const { title, id } = flowElement[category];
        console.log(
          "Logged output --> ~ file: DisplayNetworkBySelectionSaga.ts ~ line 105 ~ flowElement",
          flowElement
        );

        yield put({
          ...successAction,
          payload: {
            ...payload,
            categoryType,
            selectedNetworkTitle: title,
            selectedNetworkId: id,
          },
        });
      }
    }
  } catch (errors) {
    const failureAction = displayNetworkBySelectionFailureAction();

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
