import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";

const WellheadContextMenu = ({ children, position }) => {
  const [open, setOpen] = React.useState(false);
  const [nodePosition, setNodePosition] = React.useState(position);

  const handleOpenContextMenu = (event) => {
    event.preventDefault();
    event.persist();
    // setNodePosition(nodePosition);
    setNodePosition({
      x: event.clientX,
      y: event.clientY,
    });
    setOpen(true);
    console.log(
      "Logged output --> ~ file: WellheadContextMenu.jsx ~ line 12 ~ handleOpenContextMenu ~ event",
      event
    );
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
        <MenuItem onClick={handleClose}>Show Details</MenuItem>
        {/* <MenuItem onClick={handleClose}>Print</MenuItem>
        <MenuItem onClick={handleClose}>Highlight</MenuItem>
        <MenuItem onClick={handleClose}>Email</MenuItem> */}
      </Menu>
    </div>
  );
};

export default WellheadContextMenu;
