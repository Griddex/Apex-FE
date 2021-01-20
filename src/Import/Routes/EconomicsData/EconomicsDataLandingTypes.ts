export interface IEconomicsDataLandingWorkflows {
  excel: JSX.Element;
  database: JSX.Element;
  manual: JSX.Element;
  approvedData: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IEconomicsDataLandingWorkflows;
};
