import { SetStateAction } from "react";
import { XYPosition } from "react-flow-renderer";

export interface IContextMenuProps {
  position?: XYPosition;
  children?: JSX.Element;
  setOpenTooltip?: SetStateAction<any>;
  component?: React.FC<any>;
  componentElement?: React.ReactElement;
  data?: any;
}
