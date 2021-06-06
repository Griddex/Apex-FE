import {
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  useTheme,
} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import CalendarViewDayOutlinedIcon from "@material-ui/icons/CalendarViewDayOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ListOutlinedIcon from "@material-ui/icons/ListOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogDisplayNetworkCancelButtons from "../../../Application/Components/DialogButtons/DialogDisplayNetworkCancelButtons";
import DialogRemoveNetworkCancelButtons from "../../../Application/Components/DialogButtons/DialogRemoveNetworkCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import {
  displayNetworkBySelectionRequestAction,
  removeCurrentNetworkAction,
  updateNetworkParameterAction,
} from "../../Redux/Actions/NetworkActions";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";

const NetworkButtonsMenu = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { isNetworkAuto } = useSelector(
    (state: RootState) => state.networkReducer
  );

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
      iconType: "select",
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const existingNetworks = () => {
    const networkDisplayConfirmation = () => {
      const dialogParameters: DialogStuff = {
        name: "Existing_Network_Dialog",
        title: "Confirm Network Display",
        type: "textDialog",
        show: true,
        exclusive: false,
        maxWidth: "xs",
        iconType: "confirmation",
        dialogText: `Do you want to display the 
        currently selected  production network diagram?`,
        actionsList: () =>
          DialogDisplayNetworkCancelButtons(
            [true, true],
            [true, true],
            [unloadDialogsAction, displayNetworkBySelectionRequestAction]
          ),
        dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
      };

      dispatch(showDialogAction(dialogParameters));
    };

    const dialogParameters: DialogStuff = {
      name: "Existing_Network_Dialog",
      title: "Production Networks",
      type: "existingNetworksDialog",
      show: true,
      exclusive: false,
      maxWidth: "lg",
      iconType: "select",
      actionsList: () =>
        DialogDisplayNetworkCancelButtons(
          [true, true],
          [true, false],
          [unloadDialogsAction, networkDisplayConfirmation]
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
      iconType: "select",
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
              const value = true;

              dispatch(updateNetworkParameterAction(path, value));
              dispatch(removeCurrentNetworkAction());
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
      title: "Network List",
      action: existingNetworks,
      icon: <ListOutlinedIcon color="primary" fontSize="small" />,
    },
    {
      title: "Remove Network",
      action: removeNetwork,
      icon: <CloseOutlinedIcon color="secondary" fontSize="small" />,
    },
  ];

  return (
    <div style={{ cursor: "context-menu", backgroundColor: "#F7F7F7" }}>
      <Button
        onClick={handleClick}
        startIcon={<AccountTreeIcon />}
        endIcon={<KeyboardArrowDownIcon />}
        style={{
          height: "28px",
          backgroundColor: theme.palette.primary.light,
          border: `1px solid ${theme.palette.primary.main}`,
        }}
      >
        {"Network"}
      </Button>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
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
          const style =
            !isNetworkAuto &&
            ["Generate Network", "Network List"].includes(title)
              ? {
                  pointerEvents: "none",
                  backgroundColor: theme.palette.grey[200],
                }
              : {};

          return (
            <MenuItem
              style={style as CSSProperties}
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
