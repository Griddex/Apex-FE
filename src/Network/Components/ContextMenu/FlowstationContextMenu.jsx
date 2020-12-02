import Menu from "@material-ui/core/Menu";
import React from "react";
import NetworkContextMenu from "./NetworkContextMenu";

const FlowstationContextMenu = ({ children, position }) => {
  const [open, setOpen] = React.useState(false);
  const [nodePosition, setNodePosition] = React.useState(position);

  const handleOpenContextMenu = (event) => {
    event.preventDefault();
    event.persist();

    setNodePosition({
      x: event.clientX,
      y: event.clientY,
    });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      onContextMenu={handleOpenContextMenu}
      style={{ cursor: "context-menu" }}
    >
      {children}
      <Menu
        keepMounted
        open={open}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          nodePosition.y !== null && nodePosition.x !== null
            ? { top: nodePosition.y, left: nodePosition.x }
            : undefined
        }
      >
        <NetworkContextMenu elementName={"flowstation"} />
      </Menu>
    </div>
  );
};

export default FlowstationContextMenu;
