export interface IEconomicsResultsLanding {
  templateResults: JSX.Element;
  plotchartsTables: JSX.Element;
  existingResults: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IEconomicsResultsLanding;
};
