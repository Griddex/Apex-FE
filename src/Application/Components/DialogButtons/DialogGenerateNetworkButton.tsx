import { Button } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import React from "react";
import { useDispatch } from "react-redux";
import { IButtonsConfigProps } from "../../Layout/LayoutTypes";
import {
  hideDialogAction,
  unloadDialogsAction,
} from "../../Redux/Actions/DialogsAction";
import { ButtonProps } from "../Dialogs/DialogTypes";

const DialogGenerateNetworkButton = (
  shouldExecute: IButtonsConfigProps["shouldExecute"],
  shouldDispatch: IButtonsConfigProps["shouldDispatch"],
  finalActions: IButtonsConfigProps["finalActions"]
) => {
  const dispatch = useDispatch();
  const buttonsData: ButtonProps[] = [
    {
      title: "Generate",
      variant: "contained",
      color: "primary",
      startIcon: <AccountTreeIcon />,
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

export default DialogGenerateNetworkButton;
