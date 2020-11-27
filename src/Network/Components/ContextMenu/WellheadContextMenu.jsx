import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  contextDrawerShowAction,
  contextDrawerExpandAction,
} from "./../../../Application/Redux/Actions/LayoutActions";
import { showContextMenuAction } from "./../../Redux/Actions/NetworkActions";

const WellheadContextMenu = ({ children, position, forecastData }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [nodePosition, setNodePosition] = React.useState(position);
  const { showContextDrawer, expandContextDrawer } = useSelector(
    (state) => state.layoutReducer
  );
  const { showContextMenu } = useSelector((state) => state.networkReducer);

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
        <MenuItem
          onClick={() => {
            showContextMenu || dispatch(showContextMenuAction());
            showContextDrawer || dispatch(contextDrawerShowAction());
            expandContextDrawer || dispatch(contextDrawerExpandAction());
          }}
        >
          Show Details
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>Print</MenuItem>
        <MenuItem onClick={handleClose}>Highlight</MenuItem>
        <MenuItem onClick={handleClose}>Email</MenuItem> */}
      </Menu>
    </div>
  );
};

export default WellheadContextMenu;
