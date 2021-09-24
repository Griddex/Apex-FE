import { TUseState } from "../../../Application/Types/ApplicationTypes";

export interface INetworkDiagramIcons {
  showMiniMap: boolean;
  setShowMiniMap: TUseState<boolean>;
  showControls: boolean;
  setShowControls: TUseState<boolean>;
  componentRef?: React.MutableRefObject<any>;
}
