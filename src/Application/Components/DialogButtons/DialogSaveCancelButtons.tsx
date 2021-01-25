import { Button } from "@material-ui/core";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { IAction } from "../../Redux/Actions/ActionTypes";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import { ButtonProps } from "../Dialogs/DialogTypes";

const DialogSaveCancelButtons = ({ action }: { action: () => IAction }) => {
  const dispatch = useDispatch();
  const buttonsData: ButtonProps[] = [
    {
      title: "Cancel",
      variant: "outlined",
      color: "secondary",
      startIcon: <DoneOutlinedIcon />,
      handleAction: () => dispatch(hideDialogAction()),
    },
    {
      title: "Save",
      variant: "outlined",
      color: "primary",
      startIcon: <DoneOutlinedIcon />,
      handleAction: () => dispatch(action()),
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

export default DialogSaveCancelButtons;
