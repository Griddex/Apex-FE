import { AxiosResponse } from "axios";
import {
  actionChannel,
  ActionChannelEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  SelectEffect,
  takeLeading,
} from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { getTableDataByIdSuccessAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { hideSpinnerAction } from "../../../Application/Redux/Actions/UISpinnerActions";
import * as authService from "../../../Application/Services/AuthService";
import { getBaseEconomicsUrl } from "../../../Application/Services/BaseUrlService";
//import { failureDialogParameters } from "../../Components/DialogParameters/StoredDeclineCurveParametersDialogParameters";
import { GET_ECONOMICSPARAMETERSBYID_REQUEST } from "../Actions/EconomicsActions";

export default function* watchGetEconomicsParametersByIdSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const getEconomicsParametersByIdChan = yield actionChannel(
    GET_ECONOMICSPARAMETERSBYID_REQUEST
  );
  yield takeLeading(
    getEconomicsParametersByIdChan,
    getEconomicsParametersByIdSaga
  );
}

const config = { withCredentials: false };
const getEconomicsParametersByIdAPI = (url: string) =>
  authService.get(url, config);

function* getEconomicsParametersByIdSaga(action: IAction): Generator<
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
  const { selectedEconomicsParametersId, isCreateOrEdit } = payload;
  const wc = "storedDataWorkflows";
  const reducer = "networkReducer";

  const economicsParametersUrl = `${getBaseEconomicsUrl()}/parameter/${selectedEconomicsParametersId}`;

  try {
    const economicsParametersResults = yield call(
      getEconomicsParametersByIdAPI,
      economicsParametersUrl
    );

    const {
      data: { data },
    } = economicsParametersResults;

    const commercialTechnical = data["commercialTechnical"];
    const fiscal = data["fiscal"];
    const flarePenalty = data["flarePenalty"];
    const gasRoyalty = data["gasRoyalty"];
    const oilRoyalty = data["oilRoyalty"];
    const ppt = data["ppt"];

    const createInitialRows = (): any[] => {
      const fakeRows = [];

      let numberOfRows = commercialTechnical.length;
      for (let i = 0; i < numberOfRows; i++) {
        const fakeRow = {
          sn: i + 1,
          parameter: commercialTechnical[i].variableName,
          type: "Single",
          value: "",
          unit: commercialTechnical[i].value,
          remark: "",
        };

        fakeRows.push(fakeRow);
      }

      numberOfRows = fiscal.length;
      for (let i = 0; i < numberOfRows; i++) {
        const fakeRow = {
          sn: i + 1,
          parameter: fiscal[i].variableName,
          type: "Single",
          value: "",
          unit: fiscal[i].value,
          remark: "",
        };

        fakeRows.push(fakeRow);
      }

      numberOfRows = flarePenalty.length;
      for (let i = 0; i < numberOfRows; i++) {
        const fakeRow = {
          sn: i + 1,
          parameter: flarePenalty[i].variableName,
          type: "Single",
          value: "",
          unit: flarePenalty[i].value,
          remark: "",
        };

        fakeRows.push(fakeRow);
      }

      numberOfRows = gasRoyalty.length;
      for (let i = 0; i < numberOfRows; i++) {
        const fakeRow = {
          sn: i + 1,
          parameter: gasRoyalty[i].variableName,
          type: "Single",
          value: "",
          unit: gasRoyalty[i].value,
          remark: "",
        };

        fakeRows.push(fakeRow);
      }

      numberOfRows = oilRoyalty.length;
      for (let i = 0; i < numberOfRows; i++) {
        const fakeRow = {
          sn: i + 1,
          parameter: oilRoyalty[i].variableName,
          type: "Single",
          value: "",
          unit: oilRoyalty[i].value,
          remark: "",
        };

        fakeRows.push(fakeRow);
      }

      numberOfRows = ppt.length;
      for (let i = 0; i < numberOfRows; i++) {
        const fakeRow = {
          sn: i + 1,
          parameter: ppt[i].variableName,
          type: "Single",
          value: "",
          unit: ppt[i].value,
          remark: "",
        };

        fakeRows.push(fakeRow);
      }

      return fakeRows;
    };

    const selectedTableData = createInitialRows();

    const successAction = getTableDataByIdSuccessAction();
    console.log("ans: ", {
      ...successAction,
      payload: {
        ...payload,
        reducer,
        selectedTableData,
      },
    });

    yield put({
      ...successAction,
      payload: {
        ...payload,
        reducer,
        selectedTableData,
      },
    });

    /*  const dialogParameters: DialogStuff = {
        name: "Display_Table_Data_Dialog",
        title: wellDeclineParameterTitle,
        type: "tableDataDialog",
        show: true,
        exclusive: true,
        maxWidth: "xl",
        iconType: "information",
        actionsList: () => DialogCancelButton(),
        dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
        reducer,
      };

      yield put(showDialogAction(dialogParameters)); */
  } catch (errors) {
    /* const failureAction = getDeclineParametersByIdFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, errors },
    });

    yield put(showDialogAction(failureDialogParameters)); */
    console.log("GetEconomicsParametersByIdSaga failed");
  } finally {
    yield put(hideSpinnerAction());
  }
}
