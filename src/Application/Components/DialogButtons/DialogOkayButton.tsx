import { Button } from "@mui/material";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { IButtonsConfigProps } from "../../Layout/LayoutTypes";
import { unloadDialogsAction } from "../../Redux/Actions/DialogsAction";
import { ButtonProps } from "../Dialogs/DialogTypes";

const DialogOkayButton = (
  shouldExecute: IButtonsConfigProps["shouldExecute"],
  shouldDispatch: IButtonsConfigProps["shouldDispatch"],
  finalActions: IButtonsConfigProps["finalActions"]
) => {
  const dispatch = useDispatch();
  const buttonsData: ButtonProps[] = [
    {
      title: "Okay",
      variant: "contained",
      color: "primary",
      startIcon: <DoneOutlinedIcon />,
      handleAction: (i?: number) => {
        const iDefined = i as number;
        const sExecute = shouldExecute[iDefined];
        const action = finalActions[iDefined];
        const sDispatch = shouldDispatch[iDefined];

        if (sExecute) {
          if (sDispatch) dispatch(action());
          else action();

          dispatch(unloadDialogsAction());
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

export default DialogOkayButton;
