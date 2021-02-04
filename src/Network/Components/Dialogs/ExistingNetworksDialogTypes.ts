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
  forecastParametersType: "Default" | "User";
  forecastParametersTitle: string;
  forecastParametersDescription: string;
  forecastParametershSPName: string;
  forecastParametersTimeFreq: string;
  forecastParametersRealtime: string;
  forecastParametersEndForecast: string;
  author: IUserDetails;
  createdOn: string;
  modifiedOn: string;
}

export interface IDeclineCurveParametersDetail {
  sn?: number;
  module: string;
  drainagePoint: string;
  field: string;
  reservoir: string;
  initialRate: number; //1P,2P and 3P
  declineType: string;
  declineRate: number; //1P,2P and 3P
  declineExponent: number; //1P,2P and 3P
}
