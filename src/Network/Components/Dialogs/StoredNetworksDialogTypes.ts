import { IRawRow } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
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
  rateofChangeRate1P1C?: number;
  rateofChangeRate2P2C?: number;
  rateofChangeRate3P3C?: number;
  declineExponent1P1C: number;
  declineExponent2P2C: number;
  declineExponent3P3C: number;
  rateOfChangeGORCGR1P1C?: number;
  rateOfChangeGORCGR2P2C?: number;
  rateOfChangeGORCGR3P3C?: number;
  rateOfChangeBSWWGR1P1C?: number;
  rateOfChangeBSWWGR2P2C?: number;
  rateOfChangeBSWWGR3P3C?: number;
  declineMethod: string;
}

export interface IParametersEntity {
  targetFluid: string;
  timeFrequency: string;
  isDefered: number;
  endForecast: string;
  startDay: number;
  startMonth: number;
  startYear: number;
  stopDay: number;
  stopMonth: number;
  stopYear: number;
}

export interface IBackendForecastingParametersRow {
  sn?: number;
  id: string;
  forecastInputDeckId: string;
  forecastInputdeckTitle: string;
  title: string;
  description: string;
  type: "Default" | "User";
  createdAt: string;
  wellPrioritizationId: string;
  wellDeclineParameterId: string;
  declineParametersId: string;
  wellPrioritizationTitle: string;
  wellDeclineParameterTitle: string;
  parametersEntity: IParametersEntity;
  author: IUserDetails;
}
export interface IForecastParametersStoredRow {
  sn?: number;
  forecastingParametersId: string;
  forecastInputDeckId: string;
  forecastInputdeckTitle: string;
  title: string;
  description: string;
  type: "Default" | "User";
  wellDeclineParameterId: string;
  wellPrioritizationId: string;
  wellDeclineParameterTitle: string;
  wellPrioritizationTitle: string;
  targetFluid: string;
  timeFrequency: string;
  isDefered: string;
  realtimeResults: string;
  startForecast: string;
  endForecast: string;
  author: IUserDetails;
  createdOn: string;
  modifiedOn: string;
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
