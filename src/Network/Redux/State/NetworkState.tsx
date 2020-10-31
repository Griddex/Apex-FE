interface INetworkState {
  [key: string]: number | string | Record<string, unknown>;
}
const networkState: INetworkState = {
  currentElement: {},
};

export default networkState;
