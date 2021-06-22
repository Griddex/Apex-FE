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
import DialogCancelButton from "../../Components/DialogButtons/DialogCancelButton";
// import { failureDialogParameters } from "../../Components/DialogParameters/DeleteDataByIdFailureDialogParameters";
import { DialogStuff } from "../../Components/Dialogs/DialogTypes";
import * as authService from "../../Services/AuthService";
import { IAction } from "../Actions/ActionTypes";
import {
  deleteDataByIdFailureAction,
  deleteDataByIdSuccessAction,
  DELETE_DATABYID_REQUEST,
} from "../Actions/ApplicationActions";
import { showDialogAction } from "../Actions/DialogsAction";
import { hideSpinnerAction } from "../Actions/UISpinnerActions";

export default function* watchDeleteDataByIdSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const deleteDataByIdChan = yield actionChannel(DELETE_DATABYID_REQUEST);
  yield takeLeading(deleteDataByIdChan, deleteDataByIdSaga);
}

const config = { withCredentials: false };
const deleteDataByIdAPI = (url: string) => authService.deleteData(url, config);

function* deleteDataByIdSaga(action: IAction): Generator<
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
  const { reducer, tableDataUrl, tableTitle } = payload;
  console.log(
    "Logged output --> ~ file: DeleteDataByIdSaga.ts ~ line 51 ~ reducer",
    reducer
  );

  try {
    const results = yield call(deleteDataByIdAPI, tableDataUrl);
    console.log(
      "Logged output --> ~ file: DeleteDataByIdSaga.ts ~ line 58 ~ results",
      results
    );

    const {
      data: { success },
    } = results;

    const successAction = deleteDataByIdSuccessAction();
    yield put({
      ...successAction,
      payload: {
        ...payload,
        reducer,
      },
    });

    const dialogParameters: DialogStuff = {
      name: "Display_Table_Data_Dialog",
      title: tableTitle,
      type: "tableDataDialog",
      show: true,
      exclusive: true,
      maxWidth: "lg",
      iconType: "information",
      actionsList: () => DialogCancelButton(),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      reducer,
    };

    yield put(showDialogAction(dialogParameters));
  } catch (errors) {
    const failureAction = deleteDataByIdFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    // yield put(showDialogAction(failureDialogParameters()));
  } finally {
    yield put(hideSpinnerAction());
  }
}
