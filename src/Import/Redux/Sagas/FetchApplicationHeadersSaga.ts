import { AxiosResponse } from "axios";
import {
  actionChannel,
  ActionChannelEffect,
  all,
  AllEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  takeLeading,
} from "redux-saga/effects";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import * as authService from "../../../Application/Services/AuthService";
import getBaseForecastUrl, {
  getBaseEconomicsUrl,
} from "../../../Application/Services/BaseUrlService";
import generateKeyValueMap from "../../../Application/Utils/GenerateKeyValueMap";
import {
  fetchStoredCostsRevenuesDataFailureAction,
  fetchStoredCostsRevenuesHeadersSuccessAction,
  fetchStoredEconomicsParametersDataFailureAction,
  fetchStoredEconomicsParametersHeadersSuccessAction,
} from "../../../Economics/Redux/Actions/EconomicsActions";
import { IEconomicsState } from "../../../Economics/Redux/State/EconomicsStateTypes";
import {
  fetchApplicationHeadersFailureAction,
  fetchApplicationHeadersSuccessAction,
  FETCH_APPLICATIONHEADERS_REQUEST,
} from "../Actions/InputActions";
import swapVariableNameTitleForISelectOption from "./../../../Application/Utils/SwapVariableNameTitleForISelectOption";
import uniqBy from "lodash.uniqby";
import { IVariableNameTitle } from "../../../Application/Types/ApplicationTypes";
import { updateApplicationParameterAction } from "../../../Application/Redux/Actions/ApplicationActions";

export default function* watchFetchApplicationHeadersSaga(): Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
> {
  const appHeadersChan = yield actionChannel(FETCH_APPLICATIONHEADERS_REQUEST);
  yield takeLeading(appHeadersChan, fetchApplicationHeadersSaga);
}

const config = { withCredentials: true };
const fetchHeadersAPI = (url: string) => authService.get(url, config);
const facilitiesUrl = `${getBaseForecastUrl()}/facilities-inputdeck/facilitiesInputHeaders`;
const forecastUrl = `${getBaseForecastUrl()}/forecast-inputdeck/forecastInputHeaders`;
const economicsParametersUrl = `${getBaseEconomicsUrl()}/variables/parameterHeaders`;
const costsRevenueUrl = `${getBaseEconomicsUrl()}/variables/costsRevenueHeaders`;

function* fetchApplicationHeadersSaga(action: IAction): Generator<
  | AllEffect<CallEffect<AxiosResponse<any>>>
  | PutEffect<{
      payload: any;
      type: string;
    }>,
  void,
  [any, any, any, any]
> {
  const { payload } = action;

  try {
    const [
      facilitiesResult,
      forecastResults,
      costsRevenueResults,
      economicsParametersResults,
    ] = yield all([
      call(fetchHeadersAPI, facilitiesUrl),
      call(fetchHeadersAPI, forecastUrl),
      call(fetchHeadersAPI, costsRevenueUrl),
      call(fetchHeadersAPI, economicsParametersUrl),
    ]);

    const {
      data: { data: facilitiesAppHeaders },
    } = facilitiesResult;
    const {
      data: { data: forecastAppHeaders },
    } = forecastResults;
    const {
      data: { data: costsRevenuesAppHeaders },
    } = costsRevenueResults;
    const {
      data: { data: economicsParametersAppHeaders },
    } = economicsParametersResults;

    const successAction1 = fetchApplicationHeadersSuccessAction();
    const successAction2 = fetchStoredCostsRevenuesHeadersSuccessAction();
    const successAction3 = fetchStoredEconomicsParametersHeadersSuccessAction();

    const facilitiesHeadersSelectOptions =
      swapVariableNameTitleForISelectOption(facilitiesAppHeaders);
    const facilitiesHeadersNameMap = generateKeyValueMap(
      "variableTitle",
      "variableName",
      facilitiesAppHeaders
    );

    const forecastHeadersSelectOptions =
      swapVariableNameTitleForISelectOption(forecastAppHeaders);
    const forecastHeadersNameMap = generateKeyValueMap(
      "variableTitle",
      "variableName",
      forecastAppHeaders
    );

    const cstRevAppHeadersSelectOptions = Object.keys(
      costsRevenuesAppHeaders as IEconomicsState["costsRevenuesAppHeaders"]
    ).reduce((acc: any, key) => {
      const appHeadersByScenario = costsRevenuesAppHeaders[key];
      const swappedHeaders =
        swapVariableNameTitleForISelectOption(appHeadersByScenario);

      return { ...acc, [key]: swappedHeaders };
    }, {});

    const cstRevAppHeadersNameMaps = Object.keys(
      costsRevenuesAppHeaders as IEconomicsState["costsRevenuesAppHeaders"]
    ).reduce((acc: any, key) => {
      const appHeadersByScenario = costsRevenuesAppHeaders[key];
      const swappedHeaders = generateKeyValueMap(
        "variableTitle",
        "variableName",
        appHeadersByScenario
      );

      return { ...acc, [key]: swappedHeaders };
    }, {});

    const ecoParAppHeadersSelectOptions = swapVariableNameTitleForISelectOption(
      economicsParametersAppHeaders
    );
    const ecoParAppHeadersNameMap = generateKeyValueMap(
      "variableTitle",
      "variableName",
      economicsParametersAppHeaders
    );

    const allHeadersNameTitleUniqueCollection = uniqBy(
      [
        ...facilitiesAppHeaders,
        ...forecastAppHeaders,
        ...costsRevenuesAppHeaders["oilDevelopment"],
        ...costsRevenuesAppHeaders["nagDevelopment"],
        ...costsRevenuesAppHeaders["oilNAGDevelopment"],
        ...economicsParametersAppHeaders,
      ],
      (o: IVariableNameTitle) => o.variableName
    );

    const allHeadersNameTitleUniqueMap = generateKeyValueMap(
      "variableName",
      "variableTitle",
      allHeadersNameTitleUniqueCollection
    );

    yield put({
      ...successAction1,
      payload: {
        ...payload,
        facilitiesAppHeaders,
        forecastAppHeaders,
        facilitiesHeadersSelectOptions,
        forecastHeadersSelectOptions,
        facilitiesHeadersNameMap,
        forecastHeadersNameMap,
      },
    });
    yield put({
      ...successAction2,
      payload: {
        ...payload,
        costsRevenuesAppHeaders,
        cstRevAppHeadersSelectOptions,
        cstRevAppHeadersNameMaps,
      },
    });
    yield put({
      ...successAction3,
      payload: {
        ...payload,
        economicsParametersAppHeaders,
        ecoParAppHeadersSelectOptions,
        ecoParAppHeadersNameMap,
      },
    });

    yield put(
      updateApplicationParameterAction(
        "allHeadersNameTitleUniqueMap",
        allHeadersNameTitleUniqueMap
      )
    );
  } catch (errors) {
    const failureAction1 = fetchApplicationHeadersFailureAction();
    const failureAction2 = fetchStoredCostsRevenuesDataFailureAction();
    const failureAction3 = fetchStoredEconomicsParametersDataFailureAction();

    yield put({
      ...failureAction1,
      payload: { ...payload, errors },
    });
    yield put({
      ...failureAction2,
      payload: { ...payload, errors },
    });
    yield put({
      ...failureAction3,
      payload: { ...payload, errors },
    });
  }
}
