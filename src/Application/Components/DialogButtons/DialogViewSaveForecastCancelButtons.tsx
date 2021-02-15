import { Button } from "@material-ui/core";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { saveForecastRequestAction } from "../../../Network/Redux/Actions/NetworkActions";
import {
  hideDialogAction,
  showDialogAction,
  unloadDialogsAction,
} from "../../Redux/Actions/DialogsAction";
import { ButtonProps, DialogStuff } from "../Dialogs/DialogTypes";
import DialogSaveCancelButtons from "./DialogSaveCancelButtons";

const DialogViewSaveForecastCancelButtons = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const extrudeSaveForecastRun = () => {
    const confirmationDialogParameters: DialogStuff = {
      name: "Save_Forecast_Dialog",
      title: "Save Forecast Run",
      type: "saveForecastDialog",
      show: true,
      exclusive: false,
      maxWidth: "sm",
      iconType: "confirmation",
    };

    dispatch(showDialogAction(confirmationDialogParameters));
  };

  const buttonsData: ButtonProps[] = [
    {
      title: "Cancel",
      variant: "contained",
      color: "secondary",
      startIcon: <CloseOutlinedIcon />,
      handleAction: () => dispatch(hideDialogAction()),
    },
    {
      title: "Save",
      variant: "contained",
      color: "primary",
      startIcon: <SaveOutlinedIcon />,
      handleAction: () => {
        dispatch(hideDialogAction());
        extrudeSaveForecastRun();
      },
    },
    {
      title: "View",
      variant: "contained",
      color: "default",
      startIcon: <VisibilityOutlinedIcon />,
      handleAction: () => {
        history.replace("/apex/forecast");
        dispatch(hideDialogAction());
      },
    },
  ];

  return (
    <>
      {buttonsData.map((button, i) => (
        <Button
          key={i}
          variant={button.variant}
          color={button.color}
          onClick={button.handleAction}
          startIcon={button.startIcon}
        >
          {button.title}
        </Button>
      ))}
    </>
  );
};

export default DialogViewSaveForecastCancelButtons;
