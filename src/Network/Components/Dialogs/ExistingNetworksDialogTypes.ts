import { IUserDetails } from "../../../Application/Components/User/UserTypes";

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

export interface IForecastParametersDetail {
  sn?: number;
  declineParameters: IDeclineCurveParametersDetail[];
  type: "Default" | "User";
  title: string;
  description: string;
  targetFluid: string;
  timeFrequency: string;
  isDefered: number;
  endForecast: string;
  author: IUserDetails;
  createdOn: string;
  modifiedOn: string;
}

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
