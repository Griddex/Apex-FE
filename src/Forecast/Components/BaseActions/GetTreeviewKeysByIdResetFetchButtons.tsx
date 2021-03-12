import { Button } from "@material-ui/core";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import {
  ButtonProps,
  DialogStuff,
} from "../../../Application/Components/Dialogs/DialogTypes";
import {
  hideDialogAction,
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { saveForecastRequestAction } from "../../../Network/Redux/Actions/NetworkActions";
import DialogCancelFetchButtons from "../DialogButtons/DialogCancelFetchButtons";

const GetTreeviewKeysByIdResetFetchButtons = () => {
  const dispatch = useDispatch();

  const extrudeGetTreeviewKeys = () => {
    const confirmationDialogParameters: DialogStuff = {
      name: "TreeviewKeys_Forecast_Results",
      title: "TreeviewKeys Forecast Run",
      type: "textDialog",
      show: true,
      exclusive: false,
      maxWidth: "sm",
      dialogText: "Do you want to retrieve the current forecast results?",
      iconType: "confirmation",
      actionsList: () =>
        DialogCancelFetchButtons(
          [true, true],
          [true, true],
          [saveForecastRequestAction, unloadDialogsAction]
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(confirmationDialogParameters));
  };

  const buttonsData: ButtonProps[] = [
    {
      title: "Reset",
      variant: "contained",
      color: "secondary",
      startIcon: <CloseOutlinedIcon />,
      handleAction: () => dispatch(hideDialogAction()),
    },
    {
      title: "Fetch",
      variant: "contained",
      color: "primary",
      startIcon: <SaveOutlinedIcon />,
      handleAction: () => {
        dispatch(hideDialogAction());
        extrudeGetTreeviewKeys();
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

export default GetTreeviewKeysByIdResetFetchButtons;
