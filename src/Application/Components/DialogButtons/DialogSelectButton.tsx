import { Button } from "@mui/material";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { IAction } from "../../Redux/Actions/ActionTypes";
import { ButtonProps } from "../Dialogs/DialogTypes";

const DialogSelectButton = ({ action }: { action: () => IAction }) => {
  const dispatch = useDispatch();
  const buttonsData: ButtonProps[] = [
    {
      title: "Select",
      variant: "contained",
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

export default DialogSelectButton;
