export interface IProductionDataLandingWorkflows {
  excel: JSX.Element;
  database: JSX.Element;
  approvedData: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IProductionDataLandingWorkflows;
};
