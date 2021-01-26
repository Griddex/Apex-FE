import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { ButtonProps } from "../Dialogs/DialogTypes";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import { IFinalAction } from "../../Layout/LayoutTypes";

const DialogCancelButton = (
  executeFinalAction: IFinalAction["executeFinalAction"],
  finalAction: IFinalAction["finalAction"]
) => {
  const dispatch = useDispatch();
  console.log("Im in dialog cancel");
  const buttonsData: ButtonProps[] = [
    {
      title: "Cancel",
      variant: "outlined",
      color: "secondary",
      startIcon: <DoneOutlinedIcon />,
      handleAction: () => {
        dispatch(hideDialogAction());
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

export default DialogCancelButton;
