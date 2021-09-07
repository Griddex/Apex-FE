import jsonpipe from "jsonpipe";
import { END, eventChannel } from "redux-saga";
import {
  actionChannel,
  ActionChannelEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
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
import { getBaseVisualyticsUrl } from "../../../Application/Services/BaseUrlService";
import { failureDialogParameters } from "../../Components/DialogParameters/SaveVisualyticsSuccessFailureDialogParameters";
import {
  fetchVisualyticsTreeviewKeysFailureAction,
  fetchVisualyticsTreeviewKeysSuccessAction,
  VISUALYTICS_TREEVIEWKEYS_REQUEST,
} from "../Actions/VisualyticsActions";

export default function* watchFetchVisualyticsTreeviewKeysSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const treeviewKeysChan = yield actionChannel(
    VISUALYTICS_TREEVIEWKEYS_REQUEST
  );
  yield takeLeading(treeviewKeysChan, fetchVisualyticsTreeviewKeysSaga);
}

function* fetchVisualyticsTreeviewKeysSaga(action: IAction): Generator<
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
  const { idTitleDescIsSaved } = payload;
  const visualyticsId = idTitleDescIsSaved.selectedVisualyticsId;

  const url = `${getBaseVisualyticsUrl()}/visualyticsTree/${visualyticsId}`;

  const message = "Loading visualytics chart data...";

  try {
    yield put(showSpinnerAction(message));

    const chan = yield call(updateTreeAndKeys, url);

    while (true) {
      const data = yield take(chan);

      const successAction = fetchVisualyticsTreeviewKeysSuccessAction();
      const key = Object.keys(data)[0];

      if (key === "tree") {
        const visualyticsTree = data["tree"];

        yield put({
          ...successAction,
          payload: {
            ...payload,
            keyVar: "visualyticsTree",
            visualyticsTree,
          },
        });
      } else if (key == "xValueCategories") {
        const xValueCategories = data["xValueCategories"];

        yield put({
          ...successAction,
          payload: {
            ...payload,
            keyVar: "xValueCategories",
            xValueCategories,
          },
        });
      }
    }
  } catch (errors) {
    const failureAction = fetchVisualyticsTreeviewKeysFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters()));
  } finally {
    yield put(hideSpinnerAction());
  }
}

function updateTreeAndKeys(url: string) {
  return eventChannel((emitter) => {
    jsonpipe.flow(url, {
      method: "GET",
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
