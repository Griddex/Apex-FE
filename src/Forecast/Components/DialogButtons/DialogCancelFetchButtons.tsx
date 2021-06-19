import { Button } from "@material-ui/core";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import DetailsOutlinedIcon from "@material-ui/icons/DetailsOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { ButtonProps } from "../../../Application/Components/Dialogs/DialogTypes";
import { IButtonsConfigProps } from "../../../Application/Layout/LayoutTypes";
import {
  hideDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";

const DialogCancelFetchButtons = (
  shouldExecute: IButtonsConfigProps["shouldExecute"],
  shouldDispatch: IButtonsConfigProps["shouldDispatch"],
  finalActions: IButtonsConfigProps["finalActions"]
) => {
  const dispatch = useDispatch();
  const buttonsData: ButtonProps[] = [
    {
      title: "Cancel",
      variant: "contained",
      color: "secondary",
      startIcon: <ClearOutlinedIcon />,
      handleAction: () => dispatch(hideDialogAction()),
    },
    {
      title: "Fetch",
      variant: "contained",
      color: "primary",
      startIcon: <DetailsOutlinedIcon />,
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

export default DialogCancelFetchButtons;
