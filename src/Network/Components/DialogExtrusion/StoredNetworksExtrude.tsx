import { Button } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import React from "react";
import { Dispatch } from "redux";
import {
  ButtonProps,
  DialogStuff,
} from "../../../Application/Components/Dialogs/DialogTypes";
import {
  hideDialogAction,
  showDialogAction,
} from "../../../Application/Redux/Actions/DialogsAction";

const storedNetworksActions = (dispatch: Dispatch<any>) => {
  const buttonsData: ButtonProps[] = [
    {
      title: "Cancel",
      variant: "contained",
      color: "secondary",
      startIcon: <CloseOutlinedIcon />,
      handleAction: () => dispatch(hideDialogAction()),
    },
    {
      title: "Load Network",
      variant: "contained",
      color: "primary",
      startIcon: <DoneOutlinedIcon />,
      handleAction: () => {
        console.log("View Results");
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

const storedNetworksExtrude = (dispatch: Dispatch<any>) => {
  const dialogParameters: DialogStuff = {
    name: "Stored_Network_Dialog",
    title: "Stored Production Networks",
    type: "storedNetworksDialog",
    show: true,
    exclusive: false,
    maxWidth: "md",
    iconType: "table",
    actionsList: () => storedNetworksActions(dispatch),
  };

  dispatch(showDialogAction(dialogParameters));
};

export default storedNetworksExtrude;
