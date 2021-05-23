export interface INetworkLanding {
  networkManual: JSX.Element;
  networkAuto: JSX.Element;
}

export type IdType = {
  dataInputId: keyof INetworkLanding;
};

export interface INetworkProps {
  isNetworkAuto: boolean;
}
