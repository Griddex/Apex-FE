export interface INetworkLayouts {
  background: JSX.Element;
  network: JSX.Element;
}

export type IdType = {
  networkId: keyof INetworkLayouts;
};
