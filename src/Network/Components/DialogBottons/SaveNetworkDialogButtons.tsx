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
import { IIsSaveNetworkValid } from "../Dialogs/SaveNetworkDialogTypes";
import { saveNetworkRequestAction } from "./../../Redux/Actions/NetworkActions";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";

const SaveNetworkDialogButtons = ({
  isSaveNetworkValid,
}: IIsSaveNetworkValid) => {
  const dispatch = useDispatch();

  const finalAction = () => {
    const confirmationDialogParameters: DialogStuff = {
      name: "Save_Network_Dialog",
      title: "Save Network Dialog",
      type: "textDialog",
      show: true,
      exclusive: false,
      maxWidth: "xs",
      dialogText: "Do you want to save the current network diagram?",
      iconType: "confirmation",
      actionsList: () =>
        DialogSaveCancelButtons(
          [true, true],
          [true, true],
          [saveNetworkRequestAction, unloadDialogsAction]
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
          disabled={button.title === "Save" ? isSaveNetworkValid : false}
        >
          {button.title}
        </Button>
      ))}
    </>
  );
};

export default SaveNetworkDialogButtons;
