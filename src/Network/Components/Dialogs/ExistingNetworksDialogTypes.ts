import { IUserDetails } from "../../../Application/Components/User/UserTypes";

export interface IDeclineCurveParametersDetail {
  sn?: number;
  forecastVersion: string;
  asset: string;
  field: string;
  reservoir: string;
  drainagePoint: string;
  string: string;
  module: string;
  initOilGasRate1P1C: number;
  initOilGasRate2P2C: number;
  initOilGasRate3P3C: number;
  rateofChangeRate1P1C: number;
  rateofChangeRate2P2C: number;
  rateofChangeRate3P3C: number;
  declineExponent1P1C: number;
  declineExponent2P2C: number;
  declineExponent3P3C: number;
  declineMethod: string;
}

export interface IParametersEntity {
  targetFluid: string;
  timeFrequency: string;
  isDefered: number;
  endForecast: string;
  stopDay: number;
  stopMonth: number;
  stopYear: number;
}

export interface IForecastingParametersGroup {
  _id: string;
  sn?: number;
  createdAt: string;
  title: string;
  description: string;
  forcastInputDeckTitle: string;
  declineParameters: IDeclineCurveParametersDetail[];
  parametersEntity: IParametersEntity;
  type: "Default" | "User";
  author: IUserDetails;
}
export interface IForecastingParametersRow {
  forecastingParametersRootId: string;
  forecastingParametersGroupId: string;
  sn?: number;
  title: string;
  description: string;
  forcastInputDeckTitle: string;
  declineParameters: IDeclineCurveParametersDetail[];
  targetFluid: string;
  timeFrequency: string;
  isDefered: number;
  endForecast: string;
  type: "Default" | "User";
  author: IUserDetails;
  createdOn: string;
  modifiedOn: string;
}

export interface IForecastParametersRoot {
  id: string;
  forcastInputDeckId: string;
  forecastInputdeckTitle: string;
  forecastingParametersGroupList: IForecastingParametersGroup[];
}

export interface INetworkDetail {
  sn?: number;
  status: string;
  networkTitle: string;
  networkDescription: string;
  author: IUserDetails;
  approvers: IUserDetails[];
  createdOn: string;
  modifiedOn: string;
}
