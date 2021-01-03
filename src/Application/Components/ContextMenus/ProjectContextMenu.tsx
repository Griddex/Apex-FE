import Menu from "@material-ui/core/Menu";
import React from "react";
import { XYPosition } from "react-flow-renderer";
import { IContextMenuProps } from "../../../Network/Components/ContextMenu/ContextMenuTypes";
import NewProjectPopover from "../Popovers/NewProjectPopover";

const ProjectContextMenu = ({
  children,
  setOpenTooltip,
}: IContextMenuProps) => {
  const [open, setOpen] = React.useState(false);
  const [nodePosition] = React.useState({ x: 40, y: 51 });
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.persist();

    setOpenTooltip(false);
    setOpen(true);
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
        <NewProjectPopover name="Name" />
      </Menu>
    </div>
  );
};

export default ProjectContextMenu;
