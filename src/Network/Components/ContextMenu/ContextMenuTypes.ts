import { SetStateAction } from "react";
import {
  TUseState,
  ApexXYPosition,
} from "../../../Application/Types/ApplicationTypes";

export interface IContextMenuProps {
  position?: ApexXYPosition;
  children?: JSX.Element;
  setOpenTooltip?: SetStateAction<any>;
  component?: React.FC<any>;
  componentElement?: React.ReactElement;
  data?: any;

  open?: boolean;
  setOpen?: TUseState<boolean>;
  handleClose?: () => void;
}
