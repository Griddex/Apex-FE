import { SetStateAction } from "react";
import { XYPosition } from "react-flow-renderer";
import { TUseState } from "../../../Application/Types/ApplicationTypes";

export interface IContextMenuProps {
  position?: XYPosition;
  children?: JSX.Element;
  setOpenTooltip?: SetStateAction<any>;
  component?: React.FC<any>;
  componentElement?: React.ReactElement;
  data?: any;

  open?: boolean;
  setOpen?: TUseState<boolean>;
  handleClose?: () => void;
}
