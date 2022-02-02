import Menu from "@mui/material/Menu";
import React from "react";
import NetworkContextMenu from "./NetworkContextMenu";
import { IContextMenuProps } from "./ContextMenuTypes";
import { ApexXYPosition } from "../../../Application/Types/ApplicationTypes";

const FlowstationContextMenu = ({ children, position }: IContextMenuProps) => {
  const [open, setOpen] = React.useState(false);
  const [nodePosition, setNodePosition] = React.useState(position);

  const handleOpenContextMenu = (event: {
    preventDefault: () => void;
    persist: () => void;
    clientX: any;
    clientY: any;
  }) => {
    event.preventDefault();
    event.persist();

    setNodePosition({
      x: event.clientX,
      y: event.clientY,
    } as ApexXYPosition);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const pos = nodePosition as ApexXYPosition;
  const anchorPosition =
    pos.y !== null && pos.x !== null ? { top: pos.y, left: pos.x } : undefined;

  return (
    <div
      onContextMenu={handleOpenContextMenu}
      onMouseLeave={handleClose}
      style={{ cursor: "context-menu" }}
    >
      {children}
      <Menu
        open={open}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
      >
        <NetworkContextMenu elementName={"flowstation"} />
      </Menu>
    </div>
  );
};

export default FlowstationContextMenu;
