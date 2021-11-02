import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import DialogOneCancelButtons from "../../../Application/Components/DialogButtons/DialogOneCancelButtons";
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

const SaveNetworkDialogButtons = ({
  isSaveNetworkValid,
  titleDesc,
}: IIsSaveNetworkValid) => {
  const dispatch = useDispatch();

  const finalAction = (titleDesc: Record<string, string>) => {
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
        DialogOneCancelButtons(
          [true, true],
          [true, true],
          [unloadDialogsAction, () => saveNetworkRequestAction(titleDesc)],
          "Save",
          "saveOutlined",
          false,
          "All"
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
      handleAction: () => finalAction(titleDesc as Record<string, string>),
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
          // disabled={button.title === "Save" ? isSaveNetworkValid : false}
        >
          {button.title}
        </Button>
      ))}
    </>
  );
};

export default SaveNetworkDialogButtons;
