export interface IProductionDataLandingWorkflows {
  excel: JSX.Element;
  database: JSX.Element;
  approveddata: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IProductionDataLandingWorkflows;
};
