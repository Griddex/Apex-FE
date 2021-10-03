import Menu from "@mui/material/Menu";
import React from "react";
import { XYPosition } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { IContextMenuProps } from "../../../Network/Components/ContextMenu/ContextMenuTypes";
import ProjectPopover from "../Popovers/ProjectPopover";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";

const ProjectContextMenu = ({
  children,
  open,
  setOpen,
  handleClose,
}: IContextMenuProps) => {
  const { expandMainDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  const nodePosition = {
    x: expandMainDrawer ? 95 : 40,
    y: 51,
  };
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setOpen && setOpen(!open);
  };

  const pos = nodePosition as XYPosition;
  const anchorPosition =
    pos.y !== null && pos.x !== null ? { top: pos.y, left: pos.x } : undefined;

  return (
    <div
      ref={anchorRef}
      onClick={handleClick}
      style={{ cursor: "context-menu" }}
      onMouseLeave={handleClose}
    >
      {children}
      <Menu
        keepMounted
        open={open as boolean}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
      >
        <ProjectPopover />
      </Menu>
    </div>
  );
};

export default ProjectContextMenu;
