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
import ZoomInOutlinedIcon from "@material-ui/icons/ZoomInOutlined";
import ZoomOutMapOutlinedIcon from "@material-ui/icons/ZoomOutMapOutlined";
import ZoomOutOutlinedIcon from "@material-ui/icons/ZoomOutOutlined";
import React from "react";
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
import {
  addNetworkElementAction,
  showNetworkElementContextMenuAction,
} from "./../../Redux/Actions/NetworkActions";
import { useDispatch, useSelector } from "react-redux";
import GenerateNodeByPositionService from "./../../Services/GenerateNodeByPositionService";

const NetworkContextMenu = ({ elementName }) => {
  const dispatch = useDispatch();

  const NetworkElementsMenu = ({ children }) => {
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
      setNodePosition(initialPosition);
    };

    return (
      <div onMouseOver={handleOpenMouseOver} style={{ cursor: "context-menu" }}>
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

  const AddAssetMenu = () => {
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

  const AddNetworkElementMenu = ({ elementName }) => {
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

  const ZoomInMenu = () => {
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

  const ZoomOutMenu = () => {
    return (
      <MenuItem
        onClick={() => {
          console.log("HELLO");
        }}
      >
        <ListItemIcon>
          <ZoomOutOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Zoom In</Typography>
      </MenuItem>
    );
  };

  const ZoomOutCompletelyMenu = () => {
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

  const RenameMenu = () => {
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

  const ShowDetailsMenu = () => {
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

  const CopyMenu = () => {
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

  const CutMenu = () => {
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

  const PasteMenu = () => {
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

  const UndoMenu = () => {
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

  const RedoMenu = () => {
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

  const ShowNetworkDataMenu = () => {
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

  const RunForecastMenu = () => {
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

  return (
    <>
      <AddNetworkElementMenu elementName={elementName} />
      <AddAssetMenu />
      <hr />
      <ZoomInMenu />
      <ZoomOutMenu />
      <ZoomOutCompletelyMenu />
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
    </>
  );
};

export default NetworkContextMenu;
