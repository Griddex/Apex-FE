import { IUserDetails } from "../../../Application/Components/User/UserTypes";

export interface ISubModuleData {
  facilitiesInputDeck: string;
  forecastInputDeck: string;
  productionData: string;
  economicsData: string;
}
export interface IExistingData {
  status: string;
  title: string;
  author: IUserDetails;
  approvers: IUserDetails[];
  createdOn: string;
  modifiedOn: string;

  statusCode?: number;
  message?: string;
  errors?: [];
}

export interface IInputLayoutData {
  facilitiesInputDeck: string;
  forecastInputDeck: string;
}

export interface IInputLanding {
  subModuleName: string;
  subModuleLabel: string;
}

export type IdType = {
  subNavbarId: keyof ISubModuleData;
};
