export interface ISubModuleData {
  facilitiesInputDeck: string;
  forecastInputDeck: string;
  productionData: string;
  economicsData: string;
}

export type storedDataId = string;
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
