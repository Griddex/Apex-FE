import { Button } from "@material-ui/core";
import React from "react";
import {
  ButtonProps,
  DialogStuff,
} from "../../../Application/Components/Dialogs/DialogTypes";
import { useDispatch } from "react-redux";
import {
  hideDialogAction,
  showDialogAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import { Dispatch } from "redux";

const saveNetworkActions = (dispatch: Dispatch<any>) => {
  const buttonsData: ButtonProps[] = [
    {
      title: "Cancel",
      variant: "contained",
      color: "secondary",
      startIcon: <CloseOutlinedIcon />,
      handleAction: () => dispatch(hideDialogAction()),
    },
    {
      title: "View Results",
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
          onClick={button.handleAction}
          startIcon={button.startIcon}
        >
          {button.title}
        </Button>
      ))}
    </>
  );
};

const saveNetworkExtrude = () => {
  const dispatch = useDispatch();

  const dialogParameters: DialogStuff = {
    name: "Save_Network_Dialog",
    title: "Save Network",
    type: "saveNetworkDialog",
    show: true,
    exclusive: true,
    maxWidth: "md",
    iconType: "select",
    actionsList: () => saveNetworkActions(dispatch),
  };

  dispatch(showDialogAction(dialogParameters));
};

export default saveNetworkExtrude;
