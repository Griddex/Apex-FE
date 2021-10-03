import { Button } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  hideDialogAction,
  showDialogAction,
} from "../../Redux/Actions/DialogsAction";
import { ButtonProps, DialogStuff } from "../Dialogs/DialogTypes";

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
      color: "inherit",
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
          onClick={() =>
            button?.handleAction && button?.handleAction(i as number)
          }
          startIcon={button.startIcon}
        >
          {button.title}
        </Button>
      ))}
    </>
  );
};

export default DialogViewSaveForecastCancelButtons;
