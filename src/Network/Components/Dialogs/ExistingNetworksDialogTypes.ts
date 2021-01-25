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
  field: string;
  reservoir: string;
  initialRate: number; //1P,2P and 3P
  declineType: string;
  declineRate: number; //1P,2P and 3P
  declineExponent: number; //1P,2P and 3P
}
