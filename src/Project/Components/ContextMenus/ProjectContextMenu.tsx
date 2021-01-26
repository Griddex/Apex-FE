import Menu from "@material-ui/core/Menu";
import React from "react";
import { XYPosition } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { IContextMenuProps } from "../../../Network/Components/ContextMenu/ContextMenuTypes";
import NewProjectPopover from "../Popovers/NewProjectPopover";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";

const ProjectContextMenu = ({ children }: IContextMenuProps) => {
  const { expandMainDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );

  const [open, setOpen] = React.useState(false);
  const nodePosition = {
    x: expandMainDrawer ? 95 : 40,
    y: 51,
  };
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // event.preventDefault();
    // event.persist();

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
      onMouseLeave={handleClose}
    >
      {children}
      <Menu
        keepMounted
        open={open}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
      >
        <NewProjectPopover />
      </Menu>
    </div>
  );
};

export default ProjectContextMenu;
