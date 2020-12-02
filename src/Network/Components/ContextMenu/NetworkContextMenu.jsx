import ListItemIcon from "@material-ui/core/ListItemIcon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import CalendarViewDayOutlinedIcon from "@material-ui/icons/CalendarViewDayOutlined";
import ChevronRightOutlinedIcon from "@material-ui/icons/ChevronRightOutlined";
import DetailsOutlinedIcon from "@material-ui/icons/DetailsOutlined";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import RedoOutlinedIcon from "@material-ui/icons/RedoOutlined";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";
import UndoOutlinedIcon from "@material-ui/icons/UndoOutlined";
import ZoomOutMapOutlinedIcon from "@material-ui/icons/ZoomOutMapOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import Flowstation from "../../Images/Flowstation.svg";
import GasFacility from "../../Images/GasFacility.svg";
import GatheringCenter from "../../Images/GatheringCenter.svg";
import Manifold from "../../Images/Manifold.svg";
import Terminal from "../../Images/Terminal.svg";
import Wellhead from "../../Images/Wellhead.svg";
import {
  contextDrawerExpandAction,
  contextDrawerShowAction,
} from "./../../../Application/Redux/Actions/LayoutActions";
import { addNetworkElementAction } from "./../../Redux/Actions/NetworkActions";
import GenerateNodeByPositionService from "./../../Services/GenerateNodeByPositionService";

export const AddNetworkElementMenu = ({ elementName }) => {
  const NetworkIcons = {
    wellhead: Wellhead,
    manifold: Manifold,
    flowstation: Flowstation,
    gasFacility: GasFacility,
    gatheringCenter: GatheringCenter,
    terminal: Terminal,
  };

  return (
    <MenuItem
      onClick={() => {
        console.log("HELLO");
      }}
    >
      <ListItemIcon>
        <ListItemIcon>
          <img
            src={NetworkIcons[elementName]}
            alt="Network logos"
            height={24}
            width={24}
          />
        </ListItemIcon>
      </ListItemIcon>
      <Typography variant="inherit">{`Add ${elementName}`}</Typography>
    </MenuItem>
  );
};

export const NetworkElementsMenu = ({ children }) => {
  const dispatch = useDispatch();
  const initialPosition = {
    x: null,
    y: null,
  };
  const [open, setOpen] = React.useState(false);
  const [nodePosition, setNodePosition] = React.useState(initialPosition);

  const elements = [
    {
      Wellhead: Wellhead,
      handleClick: () => {
        const newElementPosition = {
          x: nodePosition.x + 20,
          y: nodePosition.y + 20,
        };

        const newElement = GenerateNodeByPositionService(
          "wellhead",
          newElementPosition
        );

        dispatch(addNetworkElementAction(newElement));
      },
    },
    { Manifold: Manifold },
    { Flowstation: Flowstation },
    { GasFacility: GasFacility },
    { GatheringCenter: GatheringCenter },
    { Terminal: Terminal },
  ];

  const handleOpenMouseOver = (event) => {
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
    // setNodePosition(initialPosition);
  };

  return (
    <div
      onMouseOver={handleOpenMouseOver}
      onMouseLeave={handleClose}
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
        {elements.map((element, i) => {
          const nodeKey = Object.keys(element)[0];
          const nodeIcon = Object.values(element)[0];

          return (
            <MenuItem
              key={i}
              onClick={() => {
                console.log("HELLO");
              }}
            >
              <ListItemIcon>
                <img src={nodeIcon} width={24} height={24} />
              </ListItemIcon>
              <Typography variant="inherit">{`${nodeKey}`}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export const AddAssetMenu = () => {
  return (
    <MenuItem
      onClick={() => {
        console.log("HELLO");
      }}
      style={{
        display: "flex",
        padding: "5px",
        justifyContent: "space-around",
      }}
    >
      <ListItemIcon style={{ minWidth: "30px" }}>
        <AddOutlinedIcon fontSize="small" />
      </ListItemIcon>
      <Typography variant="inherit">Add Asset</Typography>
      <ListItemIcon
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <NetworkElementsMenu>
          <ChevronRightOutlinedIcon fontSize="small" />
        </NetworkElementsMenu>
      </ListItemIcon>
    </MenuItem>
  );
};

export const RenameMenu = () => {
  return (
    <MenuItem
      onClick={() => {
        console.log("HELLO");
      }}
    >
      <ListItemIcon>
        <ZoomOutMapOutlinedIcon fontSize="small" />
      </ListItemIcon>
      <Typography variant="inherit">Rename</Typography>
    </MenuItem>
  );
};

export const ShowDetailsMenu = () => {
  const dispatch = useDispatch();
  return (
    <MenuItem
      onClick={() => {
        dispatch(contextDrawerShowAction());
        dispatch(contextDrawerExpandAction());
      }}
    >
      <ListItemIcon>
        <ZoomOutMapOutlinedIcon fontSize="small" />
      </ListItemIcon>
      <Typography variant="inherit">Show Details</Typography>
    </MenuItem>
  );
};

export const CopyMenu = () => {
  return (
    <MenuItem
      onClick={() => {
        console.log("HELLO");
      }}
    >
      <ListItemIcon>
        <FileCopyOutlinedIcon fontSize="small" />
      </ListItemIcon>
      <Typography variant="inherit">Copy</Typography>
    </MenuItem>
  );
};

export const CutMenu = () => {
  return (
    <MenuItem
      onClick={() => {
        console.log("HELLO");
      }}
    >
      <ListItemIcon>
        <DetailsOutlinedIcon fontSize="small" />
      </ListItemIcon>
      <Typography variant="inherit">Cut</Typography>
    </MenuItem>
  );
};

export const PasteMenu = () => {
  return (
    <MenuItem
      onClick={() => {
        console.log("HELLO");
      }}
    >
      <ListItemIcon>
        <AssignmentOutlinedIcon fontSize="small" />
      </ListItemIcon>
      <Typography variant="inherit">Paste</Typography>
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

export const NetworkContextMenu = React.forwardRef(({ elementName }, ref) => {
  return (
    <div ref={ref}>
      <AddNetworkElementMenu elementName={elementName} />
      <AddAssetMenu />
      <hr />
      <RenameMenu />
      <ShowDetailsMenu />
      <hr />
      <CopyMenu />
      <CutMenu />
      <PasteMenu />
      <hr />
      <UndoMenu />
      <RedoMenu />
      <hr />
      <ShowNetworkDataMenu />
      <RunForecastMenu />
    </div>
  );
});

export default NetworkContextMenu;
