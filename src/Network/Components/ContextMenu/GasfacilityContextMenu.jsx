import Menu from "@material-ui/core/Menu";
import React from "react";
import NetworkContextMenu from "./NetworkContextMenu";

const GasfacilityContextMenu = ({ children, position }) => {
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
    setNodePosition({
      x: null,
      y: null,
    });
  };

  return (
    <div
      onContextMenu={handleOpenContextMenu}
      style={{ cursor: "context-menu" }}
    >
      <div>{children}</div>
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

export default GasfacilityContextMenu;
