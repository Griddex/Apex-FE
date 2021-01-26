import { Button } from "@material-ui/core";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { IFinalAction } from "../../Layout/LayoutTypes";
import { ButtonProps } from "../Dialogs/DialogTypes";

const DialogOkayButton = (
  executeFinalAction: IFinalAction["executeFinalAction"],
  finalAction: IFinalAction["finalAction"]
) => {
  const dispatch = useDispatch();
  const buttonsData: ButtonProps[] = [
    {
      title: "Okay",
      variant: "outlined",
      color: "primary",
      startIcon: <DoneOutlinedIcon />,
      handleAction: () => {
        // dispatch(hideDialogAction());
        executeFinalAction && dispatch(finalAction());
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

export default DialogOkayButton;
