interface INetworkState {
  [key: string]: number | string | {};
}
const networkState: INetworkState = {
  currentElement: {},
};

export default networkState;
