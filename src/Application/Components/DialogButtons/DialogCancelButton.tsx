import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { ButtonProps } from "../Dialogs/DialogTypes";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";

const DialogCancelButton = () => {
  const dispatch = useDispatch();
  const buttonsData: ButtonProps[] = [
    {
      title: "Okay",
      variant: "outlined",
      color: "primary",
      startIcon: <DoneOutlinedIcon />,
      handleAction: () => dispatch(hideDialogAction()),
    },
  ];

  return buttonsData.map((button, i) => (
    <Button
      key={i}
      variant={button.variant}
      color={button.color}
      onClick={button.handleAction}
      startIcon={button.startIcon}
    >
      {button.title}
    </Button>
  ));
};

export default DialogCancelButton;
