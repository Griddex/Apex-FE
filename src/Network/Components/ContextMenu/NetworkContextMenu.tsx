import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CalendarViewDayOutlinedIcon from "@mui/icons-material/CalendarViewDayOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import DetailsOutlinedIcon from "@mui/icons-material/DetailsOutlined";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import ZoomOutMapOutlinedIcon from "@mui/icons-material/ZoomOutMapOutlined";
import React from "react";
import { XYPosition } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import DialogOneCancelButtons from "../../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import DrainagePoint from "../../Images/DrainagePoint.svg";
import Flowstation from "../../Images/Flowstation.svg";
import GasFacility from "../../Images/GasFacility.svg";
import GatheringCenter from "../../Images/GatheringCenter.svg";
import Manifold from "../../Images/Manifold.svg";
import Terminal from "../../Images/Terminal.svg";
import addNetworkNodeToCanvas from "../../Utils/AddNetworkNodeToCanvas";
import NetworkContextMenuItem from "./NetworkContextMenuItem";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

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
      title: "Drainage Point",
      icon: DrainagePoint,
      action: () =>
        addNetworkNodeToCanvas(dispatch, nodePosition, "drainagePoint"),
    },
    {
      title: "Manifold",
      icon: Manifold,
      action: () => addNetworkNodeToCanvas(dispatch, nodePosition, "manifold"),
    },
    {
      title: "Flowstation",
      icon: Flowstation,
      action: () =>
        addNetworkNodeToCanvas(dispatch, nodePosition, "flowstation"),
    },
    {
      title: "Gas Facility",
      icon: GasFacility,
      action: () =>
        addNetworkNodeToCanvas(dispatch, nodePosition, "gasFacility"),
    },
    {
      title: "Gathering Center",
      icon: GatheringCenter,
      action: () =>
        addNetworkNodeToCanvas(dispatch, nodePosition, "gatheringCenter"),
    },
    {
      title: "Terminal",
      icon: Terminal,
      action: () => addNetworkNodeToCanvas(dispatch, nodePosition, "terminal"),
    },
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
          const { title, icon, action } = element;

          return (
            <MenuItem key={i} onClick={action}>
              <ListItemIcon>
                <img src={icon} width={24} height={24} />
              </ListItemIcon>
              <Typography variant="inherit">{title}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export const AddAssetMenu = () => {
  return (
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
  );
};

interface INetworkContextMenuProps {
  elementName: string;
}

const isNetworkAutoSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.isNetworkAuto,
  (isAuto) => isAuto
);

export const NetworkContextMenu = React.forwardRef<
  HTMLDivElement,
  INetworkContextMenuProps
>(({ elementName }, ref) => {
  const dispatch = useDispatch();
  const isNetworkAuto = useSelector(isNetworkAutoSelector);

  const getMenuItems = (element: string) => [
    {
      action: () => {},
      icon: <AddOutlinedIcon fontSize="small" />,
      title: "Add Node",
      hasSubMenu: false,
      element,
    },
    {
      action: () => {},
      icon: <AddOutlinedIcon fontSize="small" />,
      title: "Add Asset",
      hasSubMenu: true,
      subMenu: AddAssetMenu,
    },
    {
      action: () => {},
      icon: <ZoomOutMapOutlinedIcon fontSize="small" />,
      title: "Rename",
      hasSubMenu: false,
    },
    {
      action: () => {
        const dialogParameters: DialogStuff = {
          name: "Link_Deck_Dialog",
          title: "Link Deck",
          type: "linkInputDeckDialog",
          show: true,
          exclusive: true,
          maxWidth: "lg",
          iconType: "link",
          actionsList: (titleDesc?: Record<string, string>) =>
            DialogOneCancelButtons(
              [true, true],
              [true, false],
              [unloadDialogsAction, () => {}],
              "Update",
              "updateOutlined",
              false,
              "All"
            ),
          dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
        };

        dispatch(showDialogAction(dialogParameters));
      },
      icon: <LinkOutlinedIcon fontSize="small" />,
      title: "Link Data",
      hasSubMenu: false,
    },
    {
      action: () => {},
      icon: <AddOutlinedIcon fontSize="small" />,
      title: "Show Details",
      hasSubMenu: false,
    },
    {
      action: () => {},
      icon: <FileCopyOutlinedIcon fontSize="small" />,
      title: "Copy",
      hasSubMenu: false,
    },
    {
      action: () => {},
      icon: <DetailsOutlinedIcon fontSize="small" />,
      title: "Cut",
      hasSubMenu: false,
    },
    {
      action: () => {},
      icon: <AssignmentOutlinedIcon fontSize="small" />,
      title: "Paste",
      hasSubMenu: false,
    },
    {
      action: () => {},
      icon: <UndoOutlinedIcon fontSize="small" />,
      title: "Undo",
      hasSubMenu: false,
    },
    {
      action: () => {},
      icon: <RedoOutlinedIcon fontSize="small" />,
      title: "Redo",
      hasSubMenu: false,
    },
    {
      action: () => {},
      icon: <CalendarViewDayOutlinedIcon fontSize="small" />,
      title: "Show Network Data",
      hasSubMenu: false,
    },
    {
      action: () => {},
      icon: <SubscriptionsOutlinedIcon fontSize="small" />,
      title: "Run Forecast",
      hasSubMenu: false,
    },
  ];

  const networkManualItems = getMenuItems(elementName).filter((o) =>
    [
      "Add Node",
      "Add Asset",
      "Show Details",
      "Link Data",
      "Run Forecast",
    ].includes(o.title)
  );

  const networkAutoItems = getMenuItems(elementName).filter((o) =>
    ["Show Details", "Run Forecast"].includes(o.title)
  );

  return (
    <div ref={ref}>
      {!isNetworkAuto
        ? networkManualItems.map((props, i) => {
            return <NetworkContextMenuItem key={i} {...props} />;
          })
        : networkAutoItems.map((props, i) => {
            return <NetworkContextMenuItem key={i} {...props} />;
          })}
    </div>
  );
});

export default NetworkContextMenu;
