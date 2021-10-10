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
import authHeaders from "../../../Application/Services/AuthHeaders";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseForecastUrl } from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/AutoGenerateFailureDialogParameters";
import {
  displayNetworkByIdFailureAction,
  displayNetworkByIdSuccessAction,
  DISPLAY_NETWORKBYID_REQUEST,
  removeCurrentNetworkAction,
  updateNetworkParameterAction,
} from "../Actions/NetworkActions";

export default function* watchDisplayNetworkBySelectionSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const displayNetworkBySelectionChan = yield actionChannel(
    DISPLAY_NETWORKBYID_REQUEST
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
    yield put(removeCurrentNetworkAction(false));

    const chan = yield call(updateNodesAndEdges, url);

    while (true) {
      const flowElement = yield take(chan);

      let categoryType;
      const successAction = displayNetworkByIdSuccessAction();

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
    const failureAction = displayNetworkByIdFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters()));
  } finally {
    //TODO: Remove from here.
    //Should be in success case only
    const path = "isNetworkDisplayed";
    const value = true;

    yield put(updateNetworkParameterAction(path, value));
    yield put(hideSpinnerAction());
  }
}

function updateNodesAndEdges(url: string) {
  return eventChannel((emitter) => {
    jsonpipe.flow(url, {
      method: "GET",
      headers: authHeaders(),
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
