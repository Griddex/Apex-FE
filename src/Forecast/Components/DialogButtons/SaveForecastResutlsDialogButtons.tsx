import { Button } from "@material-ui/core";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import DialogSaveCancelButtons from "../../../Application/Components/DialogButtons/DialogSaveCancelButtons";
import {
  ButtonProps,
  DialogStuff,
} from "../../../Application/Components/Dialogs/DialogTypes";
import {
  hideDialogAction,
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { IIsSaveForecastResultsValid } from "../../../Network/Components/Dialogs/SaveNetworkDialogTypes";
import { saveForecastRequestAction } from "../../../Network/Redux/Actions/NetworkActions";

const SaveForecastResultsDialogButtons = ({
  isSaveForecastResultsValid,
}: IIsSaveForecastResultsValid) => {
  const dispatch = useDispatch();

  const finalAction = () => {
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
        DialogSaveCancelButtons(
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
      handleAction: finalAction,
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
          disabled={
            button.title === "Save" ? isSaveForecastResultsValid : false
          }
        >
          {button.title}
        </Button>
      ))}
    </>
  );
};

export default SaveForecastResultsDialogButtons;