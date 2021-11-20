import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CalendarViewDayOutlinedIcon from "@mui/icons-material/CalendarViewDayOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import StorageIcon from "@mui/icons-material/Storage";
import {
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import React, { ChangeEvent, CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import DialogOneCancelButtons from "../../../Application/Components/DialogButtons/DialogOneCancelButtons";
import DialogRemoveNetworkCancelButtons from "../../../Application/Components/DialogButtons/DialogRemoveNetworkCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import {
  displayNetworkByIdRequestAction,
  removeCurrentNetworkAction,
  updateNetworkParameterAction,
} from "../../Redux/Actions/NetworkActions";
import { getDisabledStyle } from "../../../Application/Styles/disabledStyles";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const isNetworkAutoSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.isNetworkAuto,
  (isAuto) => isAuto
);
const selectedNetworkIdSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.selectedNetworkId,
  (data) => data
);

const nodeElementsSelector = createDeepEqualSelector(
  (state: RootState) => state.networkReducer.nodeElements,
  (data) => data
);

const NetworkButtonsMenu = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const isNetworkAuto = useSelector(isNetworkAutoSelector);
  const selectedNetworkId = useSelector(selectedNetworkIdSelector);
  const nodeElements = useSelector(nodeElementsSelector);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: ChangeEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const generateNetwork = () => {
    const dialogParameters: DialogStuff = {
      name: "Generate_Network_Dialog",
      title: "Generate Network",
      type: "generateNetworkWorkflowDialog",
      show: true,
      exclusive: true,
      maxWidth: "lg",
      iconType: "network",
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const saveNetwork = () => {
    const dialogParameters: DialogStuff = {
      name: "Save_Network_Dialog",
      title: "Save Network",
      type: "saveNetworkDialog",
      show: true,
      exclusive: true,
      maxWidth: "sm",
      iconType: "save",
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const storedNetworks = () => {
    const networkDisplayConfirmation = () => {
      const dialogParameters: DialogStuff = {
        name: "Stored_Network_Dialog",
        title: "Confirm Network Display",
        type: "textDialog",
        show: true,
        exclusive: false,
        maxWidth: "xs",
        iconType: "confirmation",
        dialogText: `Do you want to display the 
        currently selected  production network diagram?`,
        actionsList: () =>
          DialogOneCancelButtons(
            [true, true],
            [true, true],
            [unloadDialogsAction, displayNetworkByIdRequestAction],
            "Display",
            "displayOutlined",
            false,
            "All"
          ),
        dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      };

      dispatch(showDialogAction(dialogParameters));
    };

    const dialogParameters: DialogStuff = {
      name: "Stored_Network_Dialog",
      title: "Production Networks",
      type: "storedNetworksDialog",
      show: true,
      exclusive: false,
      maxWidth: "lg",
      iconType: "table",
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, false],
          [unloadDialogsAction, networkDisplayConfirmation],
          "Display",
          "displayOutlined",
          false,
          "None"
        ),
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const removeNetwork = () => {
    const dialogParameters: DialogStuff = {
      name: "Remove_Network_Dialog",
      title: "Remove Network",
      type: "textDialog",
      show: true,
      exclusive: true,
      maxWidth: "xs",
      iconType: "remove",
      dialogText:
        "Do you want to remove the currently displayed production network?",
      actionsList: () =>
        DialogRemoveNetworkCancelButtons(
          [true, true],
          [true, false],
          [
            unloadDialogsAction,
            () => {
              const path = "isNetworkDisplayed";
              const value = false;

              dispatch(updateNetworkParameterAction(path, value));
              dispatch(removeCurrentNetworkAction(false));
            },
          ]
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const buttons: { title: string; action: () => void; icon: JSX.Element }[] = [
    {
      title: "Generate Network",
      action: generateNetwork,
      icon: <CalendarViewDayOutlinedIcon color="primary" fontSize="small" />,
    },
    {
      title: "Save Network",
      action: saveNetwork,
      icon: <SaveOutlinedIcon color="primary" fontSize="small" />,
    },
    {
      title: "Stored Networks",
      action: storedNetworks,
      icon: <StorageIcon color="primary" fontSize="small" />,
    },
    {
      title: "Remove Network",
      action: removeNetwork,
      icon: <RemoveCircleIcon color="secondary" fontSize="small" />,
    },
  ];

  const getDisableStyle = (title: string) => {
    let style = {};

    if (!isNetworkAuto) {
      style = ["Generate Network", "Stored Networks"].includes(title)
        ? getDisabledStyle(theme)
        : {};
    } else {
      if (title === "Save Network") {
        if (nodeElements.length > 0 && selectedNetworkId === "") {
          style = {};
        } else {
          style = getDisabledStyle(theme);
        }
      } else {
        style = {};
      }
    }

    return style;
  };

  return (
    <div style={{ cursor: "context-menu", backgroundColor: "#F7F7F7" }}>
      <Button
        onClick={handleClick}
        startIcon={<AccountTreeIcon htmlColor={theme.palette.grey["800"]} />}
        endIcon={
          <KeyboardArrowDownIcon htmlColor={theme.palette.grey["800"]} />
        }
        style={{
          height: "28px",
          backgroundColor: theme.palette.primary.light,
          border: `1px solid ${theme.palette.primary.main}`,
          color: theme.palette.grey["800"],
        }}
      >
        {"Network"}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {buttons.map((row, i) => {
          const { title, action, icon } = row;

          return (
            <MenuItem
              style={getDisableStyle(title) as CSSProperties}
              key={i}
              onClick={() => {
                action();
                handleClose();
              }}
            >
              <ListItemIcon style={{ minWidth: 36 }}>{icon}</ListItemIcon>
              <Typography variant="inherit">{title}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default NetworkButtonsMenu;
