import { IUserDetails } from "../../../Application/Components/User/UserTypes";

export interface INetworkDetail {
  sn?: number;
  status: string;
  networkName: string;
  networkDescription: string;
  author: IUserDetails;
  approvers: IUserDetails[];
  createdOn: string;
  modifiedOn: string;
}

export interface IForecastParametersDetail {
  sn?: number;
  forecastParametersName: string;
  forecastParametersDescription: string;
  author: IUserDetails;
  createdOn: string;
  modifiedOn: string;
}

export interface IDeclineCurveParametersDetail {
  sn?: number;
  module: string;
  drainagePoint: string;
  initialRate: number;
  declineType: string;
  declineRate: number;
  declineExponent: number;
}
