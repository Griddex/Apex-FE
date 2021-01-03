import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import CalendarViewDayOutlinedIcon from "@material-ui/icons/CalendarViewDayOutlined";
import RedoOutlinedIcon from "@material-ui/icons/RedoOutlined";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";
import UndoOutlinedIcon from "@material-ui/icons/UndoOutlined";
import ZoomInOutlinedIcon from "@material-ui/icons/ZoomInOutlined";
import ZoomOutMapOutlinedIcon from "@material-ui/icons/ZoomOutMapOutlined";
import ZoomOutOutlinedIcon from "@material-ui/icons/ZoomOutOutlined";
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
