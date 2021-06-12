export interface IEconomicsResultsLanding {
  templateResults: JSX.Element;
  plotchartsTables: JSX.Element;
  storedResults: JSX.Element;
}

export type IdType = {
  dataInputId: keyof IEconomicsResultsLanding;
};
