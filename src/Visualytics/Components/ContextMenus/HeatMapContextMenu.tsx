import Menu from "@mui/material/Menu";
import React from "react";
import { IContextMenuProps } from "../../../Network/Components/ContextMenu/ContextMenuTypes";

const HeatMapContextMenu = ({
  children,
  componentElement,
}: IContextMenuProps) => {
  const Component = componentElement as NonNullable<
    IContextMenuProps["componentElement"]
  >;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: React.ChangeEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      onClick={handleClick}
      style={{ cursor: "context-menu" }}
      onMouseLeave={handleClose}
    >
      {children}
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {Component}
      </Menu>
    </div>
  );
};

export default HeatMapContextMenu;
