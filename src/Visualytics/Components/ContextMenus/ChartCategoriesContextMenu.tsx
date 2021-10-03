import Menu from "@mui/material/Menu";
import React from "react";
import { XYPosition } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { IContextMenuProps } from "../../../Network/Components/ContextMenu/ContextMenuTypes";

const ChartCategoriesContextMenu = ({
  children,
  component,
}: IContextMenuProps) => {
  const { expandMainDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  const Component = component as NonNullable<IContextMenuProps["component"]>;

  const [open, setOpen] = React.useState(false);
  const nodePosition = {
    // x: expandMainDrawer ? 95 : 40,
    x: 334,
    y: 152,
  };
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const pos = nodePosition as XYPosition;
  const anchorPosition =
    pos.y !== null && pos.x !== null ? { top: pos.y, left: pos.x } : undefined;

  return (
    <div
      ref={anchorRef}
      onClick={handleClick}
      style={{ cursor: "context-menu" }}
      // onMouseLeave={handleClose}
    >
      {children}
      <Menu
        keepMounted
        open={open}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
      >
        <Component />
      </Menu>
    </div>
  );
};

export default ChartCategoriesContextMenu;
