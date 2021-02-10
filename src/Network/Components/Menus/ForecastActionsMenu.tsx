import {
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  useTheme,
} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ListOutlinedIcon from "@material-ui/icons/ListOutlined";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import DialogOkayCancelButtons from "../../../Application/Components/DialogButtons/DialogOkayCancelButtons";
import DialogRunForecastCancelButtons from "../../../Application/Components/DialogButtons/DialogRunForecastCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { runForecastRequestAction } from "../../Redux/Actions/NetworkActions";

const ForecastActionsMenu = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: ChangeEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const runForecast = () => {
    const dialogParameters: DialogStuff = {
      name: "Run_Forecast_Dialog",
      title: "Run Forecast",
      type: "runForecastDialog",
      show: true,
      exclusive: false,
      maxWidth: "lg",
      iconType: "information",
      actionsList: () =>
        DialogRunForecastCancelButtons(
          [true, true],
          [true, true],
          [unloadDialogsAction, runForecastRequestAction]
        ),
      // dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const viewResults = () => {
    alert("View Results");
  };

  const existingForecastParameters = () => {
    const dialogParameters: DialogStuff = {
      name: "Existing_Forecast_Parameters_Dialog",
      title: "Forecasting Parameters Table",
      type: "existingForecastingParametersDialog",
      show: true,
      exclusive: false,
      maxWidth: "xl",
      iconType: "information",
      actionsList: () =>
        DialogOkayCancelButtons(
          [true, true],
          [true, true],
          [unloadDialogsAction, runForecastRequestAction]
        ),
      // dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const buttons: { title: string; action: () => void; icon: JSX.Element }[] = [
    {
      title: "Run Forecast",
      action: runForecast,
      icon: <PlayArrowIcon color="primary" fontSize="small" />,
    },
    {
      title: "View Results",
      action: viewResults,
      icon: <VisibilityOutlinedIcon color="primary" fontSize="small" />,
    },
    {
      title: "Parameters List",
      action: existingForecastParameters,
      icon: <ListOutlinedIcon color="primary" fontSize="small" />,
    },
  ];

  return (
    <div style={{ cursor: "context-menu" }}>
      <Button
        onClick={handleClick}
        startIcon={<TrendingUpOutlinedIcon />}
        endIcon={<KeyboardArrowDownIcon />}
        style={{
          height: "28px",
          backgroundColor: theme.palette.primary.light,
          border: `1px solid ${theme.palette.primary.main}`,
        }}
      >
        {"Forecast"}
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

          return (
            <MenuItem
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

export default ForecastActionsMenu;
