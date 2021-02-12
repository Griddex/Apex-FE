import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { ButtonProps } from "../Dialogs/DialogTypes";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import { IFinalAction } from "../../Layout/LayoutTypes";

const DialogCancelButton = (
  shouldExecute: IFinalAction["shouldExecute"],
  shouldDispatch: IFinalAction["shouldDispatch"],
  finalActions: IFinalAction["finalActions"]
) => {
  const dispatch = useDispatch();

  const buttonsData: ButtonProps[] = [
    {
      title: "Cancel",
      variant: "outlined",
      color: "secondary",
      startIcon: <DoneOutlinedIcon />,
      handleAction: () => {
        let i = 0;
        for (const execute of shouldExecute) {
          if (execute) {
            const action = finalActions[i];
            if (shouldDispatch[i]) dispatch(action());
            else action();
          }
          i += 1;
        }
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
