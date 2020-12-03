import Menu from "@material-ui/core/Menu";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NetworkContextMenu from "./NetworkContextMenu";

const WellheadSummaryContextMenu = ({ children, position }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [nodePosition, setNodePosition] = React.useState(position);
  const { showContextDrawer, expandContextDrawer } = useSelector(
    (state) => state.layoutReducer
  );
  const { showWellheadDetails } = useSelector((state) => state.networkReducer);

  // dispatch(showNetworkElementDetailsAction());

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
      style={{ cursor: "context-menu", width: "100%", height: "100%" }}
    >
      {children}
      <Menu
        keepMounted
        open={open}
        onClose={handleClose}
        onMouseLeave={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          nodePosition.y !== null && nodePosition.x !== null
            ? { top: nodePosition.y, left: nodePosition.x }
            : undefined
        }
      >
        <NetworkContextMenu elementName={"wellheadSummary"} />
      </Menu>
    </div>
  );
};

export default WellheadSummaryContextMenu;
