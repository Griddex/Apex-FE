import Menu from "@material-ui/core/Menu";
import React from "react";
import { XYPosition } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { IContextMenuProps } from "./ContextMenuTypes";
import NetworkContextMenu from "./NetworkContextMenu";

const WellheadContextMenu = ({ children, position }: IContextMenuProps) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [nodePosition, setNodePosition] = React.useState(position);
  console.log(
    "Logged output --> ~ file: WellheadContextMenu.tsx ~ line 13 ~ WellheadContextMenu ~ position",
    position
  );
  const { showContextDrawer, expandContextDrawer } = useSelector(
    (state: RootState) => state.layoutReducer
  );
  const { showWellheadDetails } = useSelector(
    (state: RootState) => state.networkReducer
  );

  // dispatch(showNetworkElementDetailsAction());

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
    });

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
      onContextMenu={handleOpenContextMenu}
      style={{ cursor: "context-menu", width: "100%", height: "100%" }}
    >
      {children}
      <Menu
        keepMounted
        open={open}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
      >
        <NetworkContextMenu elementName={"wellhead"} />
      </Menu>
    </div>
  );
};

export default WellheadContextMenu;
