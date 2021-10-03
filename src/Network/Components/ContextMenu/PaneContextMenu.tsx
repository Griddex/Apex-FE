import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import CalendarViewDayOutlinedIcon from "@mui/icons-material/CalendarViewDayOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import ZoomOutMapOutlinedIcon from "@mui/icons-material/ZoomOutMapOutlined";
import ZoomOutOutlinedIcon from "@mui/icons-material/ZoomOutOutlined";
import React from "react";

export const ZoomInMenu = () => {
  return (
    <MenuItem
      onClick={() => {
        console.log("HELLO");
      }}
    >
      <ListItemIcon>
        <ZoomInOutlinedIcon fontSize="small" />
      </ListItemIcon>
      <Typography variant="inherit">Zoom In</Typography>
    </MenuItem>
  );
};

export const ZoomOutMenu = () => {
  return (
    <MenuItem
      onClick={() => {
        console.log("HELLO");
      }}
    >
      <ListItemIcon>
        <ZoomOutOutlinedIcon fontSize="small" />
      </ListItemIcon>
      <Typography variant="inherit">Zoom Out</Typography>
    </MenuItem>
  );
};

export const ZoomOutCompletelyMenu = () => {
  return (
    <MenuItem
      onClick={() => {
        console.log("HELLO");
      }}
    >
      <ListItemIcon>
        <ZoomOutMapOutlinedIcon fontSize="small" />
      </ListItemIcon>
      <Typography variant="inherit">Zoom Out 100%</Typography>
    </MenuItem>
  );
};

export const UndoMenu = () => {
  return (
    <MenuItem
      onClick={() => {
        console.log("HELLO");
      }}
    >
      <ListItemIcon>
        <UndoOutlinedIcon fontSize="small" />
      </ListItemIcon>
      <Typography variant="inherit">Undo</Typography>
    </MenuItem>
  );
};

export const RedoMenu = () => {
  return (
    <MenuItem
      onClick={() => {
        console.log("HELLO");
      }}
    >
      <ListItemIcon>
        <RedoOutlinedIcon fontSize="small" />
      </ListItemIcon>
      <Typography variant="inherit">Redo</Typography>
    </MenuItem>
  );
};

export const ShowNetworkDataMenu = () => {
  return (
    <MenuItem
      onClick={() => {
        console.log("HELLO");
      }}
    >
      <ListItemIcon>
        <CalendarViewDayOutlinedIcon fontSize="small" />
      </ListItemIcon>
      <Typography variant="inherit">Show Network Data</Typography>
    </MenuItem>
  );
};

export const RunForecastMenu = () => {
  return (
    <MenuItem
      onClick={() => {
        console.log("HELLO");
      }}
    >
      <ListItemIcon>
        <SubscriptionsOutlinedIcon fontSize="small" />
      </ListItemIcon>
      <Typography variant="inherit">Run Forecast</Typography>
    </MenuItem>
  );
};

interface IPaneContextMenuProps {
  elementName: string;
}

export const PaneContextMenu = React.forwardRef<
  HTMLDivElement,
  IPaneContextMenuProps
>(({ elementName }, ref) => {
  return (
    <div ref={ref}>
      <ZoomInMenu />
      <ZoomOutMenu />
      <ZoomOutCompletelyMenu />
      <hr />
      <UndoMenu />
      <RedoMenu />
      <hr />
      <ShowNetworkDataMenu />
      <RunForecastMenu />
    </div>
  );
});

export default PaneContextMenu;
