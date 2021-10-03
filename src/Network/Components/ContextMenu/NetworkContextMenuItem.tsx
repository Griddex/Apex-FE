import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import React from "react";
import { networkIcons } from "../../Data/NetworkData";

export interface INetworkContextMenuItem {
  action: () => void;
  icon: JSX.Element;
  title: string;
  hasSubMenu: boolean;
  subMenu?: React.FC;
  element?: string;
}

export const NetworkContextMenuItem = ({
  action,
  icon,
  title,
  hasSubMenu,
  subMenu,
  element,
}: INetworkContextMenuItem) => {
  const SubMenu = subMenu as React.FC;

  return (
    <MenuItem
      onClick={action}
      style={{
        display: "flex",
        padding: 4,
        justifyContent: "flex-start",
        width: "100%",
      }}
    >
      {element ? (
        <>
          <ListItemIcon>
            <img
              src={networkIcons[element as string]}
              alt={element}
              height={24}
              width={24}
            />
          </ListItemIcon>
          <Typography variant="inherit">{`Add ${element}`}</Typography>
        </>
      ) : (
        <>
          <ListItemIcon style={{ minWidth: "30px" }}>{icon}</ListItemIcon>
          <Typography variant="inherit">{title}</Typography>
          {hasSubMenu && <SubMenu />}
        </>
      )}
    </MenuItem>
  );
};

export default NetworkContextMenuItem;
