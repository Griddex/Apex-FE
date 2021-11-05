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
  unloadDialogsAction,
} from "../../Redux/Actions/DialogsAction";
import { ButtonProps, DialogStuff } from "../Dialogs/DialogTypes";
import DialogOneCancelButtons from "./DialogOneCancelButtons";
import { saveForecastRequestAction } from "../../../Network/Redux/Actions/NetworkActions";

const DialogViewSaveForecastCancelButtons = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const extrudeSaveForecastRunConfirmation = (
    titleDesc: Record<string, string>
  ) => {
    const confirmationDialogParameters: DialogStuff = {
      name: "Save_Forecast_Results_Dialog",
      title: "Save Forecast Results Dialog",
      type: "textDialog",
      show: true,
      exclusive: false,
      maxWidth: "xs",
      dialogText: "Do you want to save the current forecast results?",
      iconType: "confirmation",
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, true],
          [unloadDialogsAction, () => saveForecastRequestAction(titleDesc)],
          "Save",
          "saveOutlined",
          false,
          "All"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(confirmationDialogParameters));
  };

  const extrudeSaveForecastRun = () => {
    const confirmationDialogParameters: DialogStuff = {
      name: "Save_Forecast_Dialog",
      title: "Save Forecast Run",
      type: "saveForecastDialog",
      show: true,
      exclusive: false,
      maxWidth: "sm",
      iconType: "save",
      actionsList: (titleDesc: Record<string, string>, flag?: boolean) =>
        DialogOneCancelButtons(
          [true, true],
          [true, false],
          [
            unloadDialogsAction,
            () => extrudeSaveForecastRunConfirmation(titleDesc),
          ],
          "Save",
          "saveOutlined",
          flag,
          "None"
        ),
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
