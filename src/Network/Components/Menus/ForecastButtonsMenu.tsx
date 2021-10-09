import {
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import DialogOneCancelButtons from "../../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import {
  runForecastRequestAction,
  updateNetworkParameterAction,
} from "../../Redux/Actions/NetworkActions";
import { extrudeSaveForecastRun } from "../DialogParameters/ExtrudeSaveForecastRun";

const ForecastButtonsMenu = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { selectedNetworkId, isNetworkDisplayed } = useSelector(
    (state: RootState) => state.networkReducer
  );

  const handleClick = (event: ChangeEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const runForecast = () => {
    const confirmRunForecast = () => {
      const confirmationDialogParameters: DialogStuff = {
        name: "Run_Forecast_Dialog",
        title: "Confirm Run Forecast",
        type: "textDialog",
        show: true,
        exclusive: false,
        maxWidth: "xs",
        dialogText: `Do you want to run the forecast using the current parameters?`,
        iconType: "confirmation",
        actionsList: () =>
          DialogOneCancelButtons(
            [true, true],
            [true, true],
            [unloadDialogsAction, runForecastRequestAction],
            "Run",
            "play",
            false,
            "All"
          ),
        dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
        isDialog: true,
      };

      dispatch(showDialogAction(confirmationDialogParameters));
    };

    const dialogParameters: DialogStuff = {
      name: "Run_Forecast_Dialog",
      title: "Run Forecast",
      type: "runForecastDialog",
      show: true,
      exclusive: false,
      maxWidth: "lg",
      iconType: "run",
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, false],
          [unloadDialogsAction, confirmRunForecast],
          "Run",
          "play",
          false,
          "None"
        ),
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const runForecastWorkflow = () => {
    const dialogParameters: DialogStuff = {
      name: "Run_Forecast_Dialog",
      title: "Run Forecast Workflow",
      type: "runForecastWorkflowDialog",
      show: true,
      exclusive: false,
      maxWidth: "lg",
      iconType: "run",
      isDialog: true,
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const viewResults = () => {
    history.push("/apex/forecast");
  };

  const storedForecastParameters = () => {
    const dialogParameters: DialogStuff = {
      name: "Stored_Forecast_Parameters_Dialog",
      title: "Forecasting Parameters",
      type: "storedForecastingParametersDialog",
      show: true,
      exclusive: false,
      maxWidth: "xl",
      iconType: "table",
      actionsList: () => DialogCancelButton(),
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const createForecastParameters = () => {
    const dialogParameters: DialogStuff = {
      name: "Stored_Forecast_Parameters_Dialog",
      title: "Create Forecast Parameters",
      type: "createForecastingParametersWorkflowDialog",
      show: true,
      exclusive: false,
      maxWidth: "xl",
      iconType: "create",
      actionsList: () => DialogCancelButton(),
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const buttons: {
    title: string;
    action: () => void;
    icon: JSX.Element;
    disable: boolean;
  }[] = [
    {
      title: "Run Forecast",
      action: isNetworkDisplayed ? runForecast : runForecastWorkflow,
      icon: <PlayArrowIcon color="primary" fontSize="small" />,
      disable: selectedNetworkId === "" ? true : false,
    },
    {
      title: "Save Results",
      action: () => dispatch(extrudeSaveForecastRun()),
      icon: <SaveOutlinedIcon color="primary" fontSize="small" />,
      disable: false,
    },
    {
      title: "View Results",
      action: viewResults,
      icon: <VisibilityOutlinedIcon color="primary" fontSize="small" />,
      disable: false,
    },
    {
      title: "View Parameters",
      action: storedForecastParameters,
      icon: <ListOutlinedIcon color="primary" fontSize="small" />,
      disable: false,
    },
    {
      title: "Create Parameters",
      action: createForecastParameters,
      icon: <AddOutlinedIcon color="primary" fontSize="small" />,
      disable: false,
    },
  ];

  return (
    <div style={{ cursor: "context-menu" }}>
      <Button
        onClick={handleClick}
        startIcon={
          <TrendingUpOutlinedIcon htmlColor={theme.palette.grey["800"]} />
        }
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
        {"Forecast"}
      </Button>
      <Menu
        keepMounted
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
          const { title, action, icon, disable } = row;

          return (
            <MenuItem
              // style={{disabled: disable}}
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

export default ForecastButtonsMenu;
