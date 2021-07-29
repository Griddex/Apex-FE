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
import { useDispatch, useSelector } from "react-redux";
import Flowstation from "../../Images/Flowstation.svg";
import GasFacility from "../../Images/GasFacility.svg";
import GatheringCenter from "../../Images/GatheringCenter.svg";
import Manifold from "../../Images/Manifold.svg";
import Terminal from "../../Images/Terminal.svg";
import DrainagePoint from "../../Images/DrainagePoint.svg";
import {
  contextDrawerExpandAction,
  showContextDrawerAction,
} from "../../../Application/Redux/Actions/LayoutActions";
import { addNetworkElementAction } from "../../Redux/Actions/NetworkActions";
import GenerateNodeByPositionService from "../../Services/GenerateNodeByPositionService";
import { XYPosition } from "react-flow-renderer";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";

export const AddNetworkElementMenu = ({
  elementName,
}: {
  elementName: string;
}) => {
  const NetworkIcons: Record<string, string> = {
    drainagePoint: DrainagePoint,
    drainagePointSummary: DrainagePoint,
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

export const NetworkElementsMenu = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const dispatch = useDispatch();
  const initialPosition: XYPosition = {
    x: -1,
    y: -1,
  };
  const [open, setOpen] = React.useState(false);
  const [nodePosition, setNodePosition] =
    React.useState<XYPosition>(initialPosition);

  const elements = [
    {
      DrainagePoint: DrainagePoint,
      handleClick: () => {
        const newElementPosition = {
          x: nodePosition.x + 20,
          y: nodePosition.y + 20,
        };

        const newElement = GenerateNodeByPositionService(
          "drainagePoint",
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

  const handleOpenMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.persist();

    setNodePosition({
      x: event.clientX + 35,
      y: event.clientY - 7,
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
      onMouseEnter={(event) => {
        handleOpenMouseEnter(event);
        event.nativeEvent.stopImmediatePropagation();
      }}
      onMouseLeave={handleClose}
      style={{ cursor: "context-menu" }}
    >
      <div>{children}</div>
      <Menu
        keepMounted
        open={open}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
      >
        {elements.map((element, i) => {
          const nodeKey = Object.keys(element)[0];
          const nodeIcon = Object.values(element)[0] as string;

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
        dispatch(showContextDrawerAction());
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

interface INetworkContextMenuProps {
  elementName: string;
}

export const NetworkContextMenu = React.forwardRef<
  HTMLDivElement,
  INetworkContextMenuProps
>(({ elementName }, ref) => {
  const { isNetworkAuto } = useSelector(
    (state: RootState) => state.networkReducer
  );

  return (
    <div ref={ref}>
      {!isNetworkAuto && (
        <>
          <AddNetworkElementMenu elementName={elementName} />
          <AddAssetMenu />
          <hr />
        </>
      )}
      <ShowDetailsMenu />
      <RunForecastMenu />
      {/* <hr />
      <CopyMenu />
      <CutMenu />
      <PasteMenu />
      <hr />
      <UndoMenu />
      <RedoMenu />
      <hr />
      <ShowNetworkDataMenu />
      <RenameMenu /> */}
    </div>
  );
});

export default NetworkContextMenu;
